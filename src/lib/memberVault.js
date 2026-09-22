/**
 * Decrypts the member resources payload in the browser.
 *
 * The built site ships only ciphertext — no password, no links. There is
 * nothing useful to read in the source; the payload only exists after someone
 * types the right password. Uses the browser's built-in Web Crypto, so this
 * adds no dependencies and no page weight.
 *
 * Must match scripts/resources.mjs: PBKDF2-HMAC-SHA256 -> AES-256-GCM.
 */

function fromBase64(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * @returns the decrypted payload, or null if the password is wrong.
 * @throws if the browser has no Web Crypto (non-HTTPS context).
 */
export async function unlock(password, blob) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('This browser cannot decrypt here. Open the site over https.');
  }

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: fromBase64(blob.salt),
      iterations: blob.iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );

  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(blob.iv) },
      key,
      fromBase64(blob.data),
    );
    return JSON.parse(new TextDecoder().decode(plaintext));
  } catch {
    // AES-GCM authentication failed: wrong password.
    return null;
  }
}
