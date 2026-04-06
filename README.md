# Yousef Osama — Portfolio

Personal portfolio built with React + Vite + Framer Motion.
Minimal, dark, fast — inspired by [bkhmsi.github.io](https://bkhmsi.github.io).

**Live →** [youssefosama.dev](https://youssefosama.dev)

---

## File structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Auto-deploy on push to main
├── public/
│   └── cv.pdf                ← Your CV (replace this file)
├── src/
│   ├── main.tsx              ← Entry point
│   ├── App.tsx               ← Router + page transitions + ⌘K
│   ├── styles/
│   │   └── theme.css         ← CSS variables, fonts, badges
│   ├── data/
│   │   └── portfolio.ts      ← ✏️  ALL your content lives here
│   ├── components/
│   │   ├── Navbar.tsx        ← Tab navigation + mobile menu
│   │   ├── Sidebar.tsx       ← Sticky left sidebar (Home)
│   │   ├── CommandPalette.tsx← ⌘K command palette
│   │   ├── ScrollProgress.tsx← Golden top progress bar
│   │   └── PageReveal.tsx    ← Scroll-triggered animations
│   └── pages/
│       ├── Home.tsx          ← Bio + featured cards
│       ├── Projects.tsx      ← All projects + filter
│       ├── Writing.tsx       ← Articles + filter
│       └── About.tsx         ← Timeline, skills, stats, contact
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## Updating content

**All content is in one file: `src/data/portfolio.ts`**

| Object | What to edit |
|---|---|
| `profile` | Name, bio, location, links, available status |
| `projects` | Your projects — title, stack, description, URLs |
| `articles` | Your articles — title, date, platform, language |
| `timeline` | Career milestones |
| `skills` | Your skills + level |
| `stats` | Numbers on the About page |

---

## Local development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → opens at http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

> **On Android (Codespaces / Termux)?**
> Open this repo in GitHub Codespaces — `npm run dev` works out of the box.
> Codespaces forwards port 5173 automatically.

---

## Deployment

### Auto-deploy (recommended)

Every `git push` to `main` triggers GitHub Actions, which:
1. Runs `npm run build`
2. Pushes `dist/` to the `gh-pages` branch
3. GitHub Pages serves it automatically

**One-time setup:**
1. Go to **Settings → Pages** in your repo
2. Set source to **Deploy from branch → gh-pages**
3. Push any commit to `main`

That's it. Every future push auto-deploys.

### Manual deploy

```bash
npm run build
# Upload contents of dist/ to your hosting
```

---

## Custom domain

1. Add your domain in **Settings → Pages → Custom domain**
2. Update `cname:` in `.github/workflows/deploy.yml`
3. Add a `CNAME` file in `public/` with your domain:
   ```
   youssefosama.dev
   ```
4. Configure DNS:
   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   CNAME www youssefosama.github.io
   ```

---

## Tech used

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Styling | Tailwind CSS + CSS variables |
| Fonts | IBM Plex Mono · Newsreader · Cairo |
| Deploy | GitHub Actions → GitHub Pages |

---

## Features

- **⌘K command palette** — keyboard-navigable, search across all pages and links
- **Scroll progress bar** — golden gradient at the top
- **Page transitions** — smooth fade between routes
- **Scroll-triggered reveals** — staggered entrance animations
- **Responsive** — sidebar collapses on mobile, hamburger menu
- **Arabic support** — Cairo font, RTL text for Arabic content
- **Lazy-loaded pages** — fast initial load

---

## License

MIT — feel free to fork and use as a template.
If you do, a GitHub star is appreciated ⭐
