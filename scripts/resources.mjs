#!/usr/bin/env node
/**
 * Encrypt / decrypt the member resources payload.
 *
 *   npm run resources:decrypt   ciphertext -> resources.json   (to edit)
 *   npm run resources:encrypt   resources.json -> ciphertext   (to publish)
 *
 * resources.json is gitignored and never ships. Only the encrypted blob is
 * committed, so the links are not readable in the repo or in the built site.
 *
 * Scheme: PBKDF2-HMAC-SHA256 (310,000 iterations) derives a 256-bit key from
 * the password; AES-256-GCM encrypts the payload and authenticates it. Salt
 * and IV are random per run. This matches what the browser does in
 * src/lib/memberVault.js.
 */
import { randomBytes, pbkdf2Sync, createCipheriv, createDecipheriv } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';

const PLAIN = 'resources.json';
const ENCRYPTED = 'src/data/resources.enc.json';
const ITERATIONS = 310_000;
const DIGEST = 'sha256';

function deriveKey(password, salt) {
  return pbkdf2Sync(password, salt, ITERATIONS, 32, DIGEST);
}

function encrypt(password, payload) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', deriveKey(password, salt), iv);
  const ct = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  return {
    v: 1,
    kdf: 'PBKDF2-HMAC-SHA256',
    iterations: ITERATIONS,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    // GCM auth tag appended to the ciphertext, which is what WebCrypto expects.
    data: Buffer.concat([ct, cipher.getAuthTag()]).toString('base64'),
  };
}

function decrypt(password, blob) {
  const raw = Buffer.from(blob.data, 'base64');
  const tag = raw.subarray(raw.length - 16);
  const ct = raw.subarray(0, raw.length - 16);
  const decipher = createDecipheriv(
    'aes-256-gcm',
    pbkdf2Sync(password, Buffer.from(blob.salt, 'base64'), blob.iterations, 32, DIGEST),
    Buffer.from(blob.iv, 'base64'),
  );
  decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(ct), decipher.final()]).toString('utf8'));
}

function askPassword() {
  // Piped input (CI, scripting) reads straight from stdin.
  if (!process.stdin.isTTY) {
    return new Promise((resolve) => {
      let buf = '';
      process.stdin.on('data', (d) => (buf += d));
      process.stdin.on('end', () => resolve(buf.trim()));
    });
  }
  // Interactive: prompt without echoing the password.
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write('Member password: ');
    rl.output.write = () => {};
    rl.question('', (answer) => {
      process.stdout.write('\n');
      rl.close();
      resolve(answer.trim());
    });
  });
}

const mode = process.argv[2];
const password = await askPassword();

if (!password) {
  console.error('No password given. Aborted.');
  process.exit(1);
}

if (mode === 'encrypt') {
  if (!existsSync(PLAIN)) {
    console.error(`${PLAIN} not found. Run "npm run resources:decrypt" first to create it.`);
    process.exit(1);
  }
  const payload = JSON.parse(readFileSync(PLAIN, 'utf8'));
  writeFileSync(ENCRYPTED, JSON.stringify(encrypt(password, payload), null, 2) + '\n');
  console.log(`Encrypted ${PLAIN} -> ${ENCRYPTED}`);
  console.log('Commit the encrypted file. Do not commit resources.json.');
} else if (mode === 'decrypt') {
  const blob = JSON.parse(readFileSync(ENCRYPTED, 'utf8'));
  let payload;
  try {
    payload = decrypt(password, blob);
  } catch {
    console.error('Wrong password (or the file is corrupt).');
    process.exit(1);
  }
  writeFileSync(PLAIN, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Decrypted ${ENCRYPTED} -> ${PLAIN}`);
  console.log('Edit it, then run "npm run resources:encrypt".');
} else {
  console.error('Usage: node scripts/resources.mjs <encrypt|decrypt>');
  process.exit(1);
}
