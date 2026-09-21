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

---

## Making a change

Most updates are content, not code. Here is where things live.

### Events

Everything is the `events` array at the top of [`src/pages/Events.jsx`](src/pages/Events.jsx). Add, edit, or delete an entry:

```js
{
  month: 'SEP',
  day: '23',
  weekday: 'Wednesday',
  title: 'Lavin Kickoff Mixer',
  time: '3:30 – 5:00 PM',
  location: 'Hogan Terrace, PACCAR Hall',
  desc: 'A casual outdoor drop-in to meet the Lavin community.',
},
```

Publish the time the event actually runs — not the room booking window or setup time.

Past events do not disappear on their own. Delete them when they are over.

### Executive board

The `executiveBoard` array in [`src/pages/ExecutiveBoard.jsx`](src/pages/ExecutiveBoard.jsx). Put the photo in `src/assets/profilePics/` and import it at the top of the file. Portraits are cropped to 4:5, so upload something roughly that shape.

### Alumni startups

The `alumniStartups` array in [`src/pages/Home.jsx`](src/pages/Home.jsx). Link to the company's YC profile if it has one, otherwise its own site.

### Recruitment dates and the "applications open" chip

[`src/pages/Recruitment.jsx`](src/pages/Recruitment.jsx) holds the timeline and both apply buttons. The gold "Applications open now" chip appears there and on the home page — when applications close, remove it from both.

### Internal resources

The `resourceSections` array in [`src/pages/Resources.jsx`](src/pages/Resources.jsx).

> **Note:** the password on that page is in the JavaScript that ships to the browser, so anyone who looks can find it. Treat that page as public. Do not put anything genuinely private behind it.

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
  components/ui/        CountUp, InfoCard, LogoMarquee
  hooks/                useScrollToTop
  lib/                  Shared animation variants
  assets/               Images and fonts
```

Routing uses `HashRouter`, so URLs look like `uwlavin.com/#/events`. Any other path is redirected to the homepage by `public/404.html`.

---

## Questions

Email [lavin.entrepreneurship@gmail.com](mailto:lavin.entrepreneurship@gmail.com), or the Buerk Center at [uwbuerk@uw.edu](mailto:uwbuerk@uw.edu).
