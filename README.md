# uwlavin.com

The website for the [Lavin Entrepreneurship Program](https://uwlavin.com) at the University of Washington, run through the UW Buerk Center for Entrepreneurship.

React + Vite + Tailwind, deployed to GitHub Pages on every push to `main`. **Events come from a shared Google Calendar** — see [Events](#events) below.

---

## Running it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
git clone https://github.com/uw-lavin/uw-lavin.github.io.git
cd uw-lavin.github.io
npm install
npm run dev
```

That serves the site at **http://localhost:5173**.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the build to check it before pushing |
| `npm run lint` | ESLint. Must pass — CI runs it |
| `npm run resources:decrypt` | Decrypt member resources for editing |
| `npm run resources:encrypt` | Re-encrypt them after editing |
| `npm run calendar:sync` | Pull events from Google Calendar now |

---

## Making a change

### Events

Events live in the **Lavin Events** Google Calendar, owned by the Lavin Gmail. Add, edit, or delete an event there — from Google Calendar or Apple Calendar — and the website usually follows within 15 to 60 minutes. (GitHub runs the check on a best-effort schedule, so it's occasionally slower. Anyone with GitHub access can update the site immediately: repo → **Actions** → **Build and Deploy** → **Run workflow**.)

- The title, time, location, and description come straight from the calendar event. A known room like "Peek Forum" gets its building and a campus-map link; any other location shows as typed.
- Only timed, single-day events appear. All-day and multi-day events, and events marked private, are left off the site.
- Past events move to a "Past events" log on their own — don't delete them.
- Publish the time an event actually runs. Setup times and room bookings go on the **Lavin Exec** calendar, which never appears on the site.

Visitors can subscribe from the Events page to get every event on their own calendar.

#### Giving people access (once a year)

When the new board starts each fall, sign in to the Lavin Gmail and, for **both** Lavin Events and Lavin Exec, open the calendar's settings → **Share with specific people** → add each new board member with **Make changes to events**, and remove anyone who has left.

On an iPhone, shared calendars only appear after you add your Google account to Apple Calendar (Settings → Calendar → Accounts) and tick them at [calendar.google.com/calendar/syncselect](https://calendar.google.com/calendar/syncselect).

#### For developers

A scheduled job in [`deploy.yml`](.github/workflows/deploy.yml) runs [`scripts/sync-calendar.mjs`](scripts/sync-calendar.mjs), asking for every 15 minutes; GitHub treats schedules as best effort and often runs them less often. It reads the calendar's public iCal address from [`src/content/calendar.json`](src/content/calendar.json), rewrites [`src/content/events/`](src/content/events/) to match, and commits and deploys only when something changed. 
- `src/content/events/` is generated — edit the calendar, not these files.
- The sync never wipes the site: if the calendar can't be fetched, or comes back empty while the site has events, it changes nothing and the job fails.
- Only ever put the calendar's **public** address in `calendar.json`, never the secret one — this repository is public. The sync refuses a secret address.
- To add a venue, add the room to `ROOMS` in [`src/lib/locations.js`](src/lib/locations.js), and a new building to `BUILDINGS` with its facility code from [the UW map](https://www.washington.edu/maps/).

### Executive board

One JSON file per person in [`src/content/leadership/`](src/content/leadership/):

```json
{
  "name": "Rishabh Goenka",
  "role": "Director of Community Development + Web Development",
  "cohort": 2024,
  "email": "rish9@uw.edu",
  "linkedin": "https://www.linkedin.com/in/rishabh-goenkx/",
  "website": "",
  "photo": ""
}
```

The page sorts by last name, so order doesn't matter. `linkedin`, `website`, and `photo` are optional.

For a photo, put the image in [`src/content/media/leadership/`](src/content/media/leadership/) and set `"photo": "/src/content/media/leadership/rishabh-goenka.jpg"`. Without one, the card shows initials.

Update the year in the page heading each fall.

### Memories

Photos live in [`src/content/media/gallery/`](src/content/media/gallery/), and [`src/content/gallery.json`](src/content/gallery.json) lists them in display order. To add one, drop the file in the folder and add its path to the list.

Upload photos as they are — they're resized automatically. Use JPG, PNG, or WebP, not iPhone HEIC.

### Alumni startups

The `alumniStartups` array in [`src/pages/Home.jsx`](src/pages/Home.jsx). Link to the company's YC profile if it has one, otherwise its own site.

### Recruitment dates and the "applications open" chip

[`src/pages/Recruitment.jsx`](src/pages/Recruitment.jsx) holds the timeline and both apply buttons. The gold "Applications open now" chip appears there and on the home page — remove it from both when applications close.

### Internal resources

The member resources are encrypted, and the password unlocks them in the browser. To change a link:

```bash
npm run resources:decrypt   # asks for the password, writes resources.json
# edit resources.json
npm run resources:encrypt   # writes src/data/resources.enc.json
```

Commit `src/data/resources.enc.json`. **Never commit `resources.json`.**

To change the password, decrypt with the old one and encrypt with the new one. Don't lose it — the content can only be recovered from git history. Keep anything genuinely sensitive restricted in Google's own sharing settings too.

---

## Design

Two typefaces: **Encode Sans** (`font-display`, the logo typeface) for headings and labels, and **Open Sans** (`font-sans`) for body copy. Both load from Google Fonts. The `.ttf` in `src/assets/Encode Sans/` is only used to regenerate the favicons.

| Color | Use |
| --- | --- |
| `#0f0f0f` | text |
| `#f8f7f4` | page background |
| `#a69041` | gold — the DISRUPT full stop and the applications-open chip |
| `#3b2c5a` | purple accent |
| `#0d6e5e` | green, recruitment timeline |
| `#e0ddd8` | hairline rules |

- `App.jsx` already pads the page to clear the fixed navbar. Don't add top padding to a page's first section.
- Check changes at phone width.

---

## Deploying

Push to `main` and it goes live in about two minutes via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Pull requests are built and checked but not deployed.

The custom domain is set by the `CNAME` file. Don't delete it.

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
  components/           Navbar, Footer, and small UI pieces
  hooks/                useScrollToTop
  lib/                  Event times, calendar files, locations, images, encryption
  content/              Events, leadership, gallery, and their photos
  data/                 Encrypted member resources
  assets/               Logo, fonts, fixed page images
scripts/                Calendar sync, member-resources encrypt/decrypt
```

Routing uses `HashRouter`, so URLs look like `uwlavin.com/#/events`.

---

## Questions

Rishabh Goenka — [rishabhlgoenka@gmail.com](mailto:rishabhlgoenka@gmail.com) or [rish9@uw.edu](mailto:rish9@uw.edu).
