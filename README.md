# uwlavin.com

The website for the [Lavin Entrepreneurship Program](https://uwlavin.com) at the University of Washington, run through the UW Buerk Center for Entrepreneurship.

React + Vite + Tailwind. Deployed to GitHub Pages automatically on every push to `main`.

---

## Running it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
git clone https://github.com/uw-lavin/uw-lavin.github.io.git
cd uw-lavin.github.io
npm install
npm run dev
```

That serves the site at **http://localhost:5173**. Edits appear immediately — no need to restart.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` to check it before pushing |
| `npm run lint` | ESLint. Must pass — CI runs it |
| `npm run resources:decrypt` | Decrypt member resources for editing |
| `npm run resources:encrypt` | Re-encrypt them after editing |

---

## Making a change

Most updates are content, not code. Here is where things live.

### Events

Everything lives in [`src/data/events.js`](src/data/events.js). Add, edit, or delete an entry:

```js
{
  date: '2026-09-25',
  start: '17:00',        // 24-hour, Pacific time
  end: '18:30',          // required -- calendars need an end time
  title: 'Founder Panel + Q&A',
  location: 'Peek Forum',
  desc: 'Current Lavin students and alumni founders on their startups.',
},
```

Write times as plain Pacific wall-clock times. There are no offsets to get right; daylight saving is handled for you. The weekday and the "5:00 – 6:30 PM" label are worked out from these, so they can't drift out of sync.

Publish the time the event actually runs — not the room booking window or setup time.

**Past events archive themselves.** Once an event's end time passes, the Events page moves it from the upcoming list to a small "Past events" log at the bottom. Don't delete old entries — that log is the record.

**Add-to-calendar buttons** appear on every upcoming event:

- **Google Calendar** — a pre-filled link. Google does not let a website set reminders, so it uses the person's own default alert.
- **Apple / Outlook** — an `.ics` file with two alerts, a day before and an hour before. Apple Calendar keeps both; Outlook keeps one.

**Adding an event is the whole process.** The buttons and the `.ics` file are created from `events.js` automatically — by a small plugin in [`vite.config.js`](vite.config.js) — both in the local preview (no restart needed) and on the live site. There are no generated files to edit or commit.

Every entry is checked when you save and again at deploy. A mistake such as `start: '5 PM'` or an end time before the start prints a clear message, and **the deploy refuses to go out**, so the live site stays on the last good version. The message says exactly which event and which field to fix.

**`location` is a room name only.** The building and the campus-map link come from [`src/lib/locations.js`](src/lib/locations.js), so `'Peek Forum'` renders as "Peek Forum, Founders Hall" linked to the UW interactive map.

To add a venue, register it there:

```js
const ROOMS = {
  'Peek Forum': 'Founders Hall',
};
```

If the building is not already in `BUILDINGS`, add it with its UW facility code — find the building on [the UW map](https://www.washington.edu/maps/) and read the code off its panel (PACCAR Hall is `PCAR`, Founders Hall is `FNDR`, Dempsey Hall is `DEM`).

An unregistered venue still renders fine, just as plain text with no link — so off-campus locations need nothing special.

### Executive board

The `executiveBoard` array in [`src/pages/ExecutiveBoard.jsx`](src/pages/ExecutiveBoard.jsx). Each entry is a name, role, cohort, email, and LinkedIn URL. **Order does not matter** — the page sorts by last name automatically.

Photos are optional. Without one, the card shows the person's initials. To add one, put the image in `src/assets/profilePics/`, import it at the top of the file, and set `photo` on that person's entry. It displays as a small square, so a centred head-and-shoulders crop works best. (Ananya Tripathi's and Sreshta's photos from last year are already in that folder.)

Update the year in the page heading each fall.

### Alumni startups

The `alumniStartups` array in [`src/pages/Home.jsx`](src/pages/Home.jsx). Link to the company's YC profile if it has one, otherwise its own site.

### Recruitment dates and the "applications open" chip

[`src/pages/Recruitment.jsx`](src/pages/Recruitment.jsx) holds the timeline and both apply buttons. The gold "Applications open now" chip appears there and on the home page — when applications close, remove it from both.

### Internal resources

The member resources are **encrypted**. The built site ships only ciphertext — no password, no links — so there is nothing useful to read in the repo or in devtools. The password decrypts them in the browser.

To change a link:

```bash
npm run resources:decrypt   # asks for the password, writes resources.json
# edit resources.json
npm run resources:encrypt   # writes src/data/resources.enc.json
```

Commit `src/data/resources.enc.json`. **Never commit `resources.json`** — it is gitignored for that reason.

To change the password, decrypt with the old one and encrypt with the new one.

How it works: PBKDF2-HMAC-SHA256 (310,000 iterations) derives a key from the password, and AES-256-GCM encrypts the payload. Both sides use the browser's and Node's built-in crypto, so there is no dependency and no page weight. Unlocking takes well under a tenth of a second.

> **Worth knowing:** this is real encryption, not a fake gate, but the password is the weak link — a short, guessable one can be attacked offline by anyone who downloads the file. Keep genuinely sensitive documents restricted through Google's own sharing settings (for example "UW accounts only") as well. Losing the password means the content can only be recovered from git history.

### Photos

Drop files in `src/assets/Gallery Images/` and add them to the `images` array in [`src/pages/Gallery.jsx`](src/pages/Gallery.jsx). **Resize before committing** — several existing photos are 2–5 MB each, which is far larger than the page needs. Roughly 1600px wide is plenty.

---

## Design

Two typefaces, nothing else:

- **Encode Sans** (`font-display`) — headings and small uppercase labels. This is the typeface in the Lavin logo.
- **Open Sans** (`font-sans`) — body copy.

Both load from Google Fonts. `src/assets/Encode Sans/` holds the Black weight as a `.ttf`; it is not used by the site at runtime, only kept so the favicons in `public/` can be regenerated from the real logo typeface.

Colors currently live as hex values in the components:

| | |
| --- | --- |
| `#0f0f0f` | near-black, text |
| `#f8f7f4` | cream page background |
| `#a69041` | gold — the DISRUPT full stop and the applications-open chip |
| `#3b2c5a` | purple accent |
| `#0d6e5e` | green, recruitment timeline |
| `#e0ddd8` | hairline rules |

Layout rules worth knowing:

- `App.jsx` already pads `main` to clear the fixed navbar. Do not add your own top padding to a page's first section, or you get a large gap.
- Check any change at phone width. Real content has broken the layout there before.

---

## Deploying

Push to `main` and it goes live in about two minutes. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) installs, lints, builds, and publishes to GitHub Pages.

Pull requests run the same install, lint, and build, but **do not** deploy.

The custom domain is set by the `CNAME` file. Do not delete it.

---

## Project layout

```
index.html              Page shell, favicons, social preview tags
public/                 Copied to the site root as-is (icons, 404 page)
src/
  main.jsx              Entry point
  App.jsx               Routes and page shell
  index.css             Fonts, Tailwind, shared classes
  pages/                One file per route
  components/layout/    Navbar, Footer
  components/ui/        CountUp, InfoCard, LogoMarquee, MapLink
  hooks/                useScrollToTop
  lib/                  Animation variants, locations, event times + calendar export, vault
  data/                 Events list, encrypted member resources
scripts/                Member-resources encrypt/decrypt
  assets/               Images and fonts
```

Routing uses `HashRouter`, so URLs look like `uwlavin.com/#/events`. Any other path is redirected to the homepage by `public/404.html`.

---

## Questions

Email [lavin.entrepreneurship@gmail.com](mailto:lavin.entrepreneurship@gmail.com), or the Buerk Center at [uwbuerk@uw.edu](mailto:uwbuerk@uw.edu).
