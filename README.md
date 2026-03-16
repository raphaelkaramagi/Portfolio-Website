# Raphael Karamagi — Portfolio

A minimal, animated developer portfolio with scroll-driven interactions, interactive domain cards, and sticky-stacking project archive.

Built with **React 19**, **Tailwind CSS**, **GSAP 3**, and **Vite**.

## Quickstart

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
```

Production output in `dist/`. Preview locally with `npm run preview`.

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Routing and layout
├── index.css             # Tailwind + global styles
├── data/
│   └── projects.js       # All project data (edit here to add/update projects)
└── components/
    ├── Navbar.jsx         # Floating pill navbar with scroll morph
    ├── Hero.jsx           # Landing section
    ├── Domains.jsx        # Interactive "What I Build" cards
    ├── ProjectArchive.jsx # Sticky-stacking project cards
    ├── ProjectPage.jsx    # Individual project detail page
    └── Footer.jsx         # Footer with status indicator
```


