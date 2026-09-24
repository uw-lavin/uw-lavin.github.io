# uwlavin.com

The website for the [Lavin Entrepreneurship Program](https://uwlavin.com) at the University of Washington, run through the UW Buerk Center for Entrepreneurship.

React + Vite + Tailwind, deployed to GitHub Pages on every push to `main`. **Events are edited through a no-code admin** — see [Events](#events) below.

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

---

## Making a change

### Events

Anyone on the board can add or change events at **[app.pagescms.org](https://app.pagescms.org)**:

1. Go to app.pagescms.org, enter your email, and click the sign-in link it emails you.
2. Open **Events** and add a new one (or click an existing event to change it).
3. Fill in the title, date, times, location, and description.
4. Click **Save**. The site updates in about 2 minutes.

The building, a campus-map link, and add-to-calendar buttons are added automatically. For a location not in the list, choose **"Somewhere else"** and type it in. Past events move to a "Past events" log on their own — don't delete them.

Publish the time an event actually runs, not the room booking or setup window.

**If a change hasn't appeared after five minutes,** that event had a problem and was skipped. Check that the end time is after the start, and that a location is typed in if you chose "Somewhere else".

#### Giving people access (once a year)

When the new board starts each fall:

1. Sign in at app.pagescms.org with a GitHub account that has access to this repository. Only those accounts can manage editors.
2. Open the repository's **Collaborators** settings, add each new board member's email, and remove anyone who has left.

Each person only needs inviting once. Keep at least two people with GitHub access to the repo so this never depends on one person.

#### For developers

Each event is a JSON file in [`src/content/events/`](src/content/events/), and the admin form is defined in [`.pages.yml`](.pages.yml). Pages CMS drops any key that isn't declared there when it saves, so add a field to `.pages.yml` before the site reads it.

**Adding a venue** takes two edits: the room in `ROOMS` in [`src/lib/locations.js`](src/lib/locations.js), and the same room in the location dropdown in `.pages.yml` (between the `rooms:start` and `rooms:end` markers). A new building also goes in `BUILDINGS` with its facility code from [the UW map](https://www.washington.edu/maps/). The build fails if the two room lists disagree.

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
.pages.yml              The events admin form (Pages CMS)
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
scripts/                Member-resources encrypt/decrypt
```

Routing uses `HashRouter`, so URLs look like `uwlavin.com/#/events`.

---

## Questions

Rishabh Goenka — [rishabhlgoenka@gmail.com](mailto:rishabhlgoenka@gmail.com) or [rish9@uw.edu](mailto:rish9@uw.edu).
