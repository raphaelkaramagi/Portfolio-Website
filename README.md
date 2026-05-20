# Raphael Karamagi — Portfolio

Personal portfolio built with React 19, Tailwind CSS v3, GSAP 3, and Vite. Deployed on Vercel.

## Dev

```bash
npm install
npm run dev       # localhost:5173
npm run build     # production build → dist/
npm run preview   # preview dist/ locally
```

## Structure

```
src/
├── App.jsx                   # routing, AuroraBackground mount
├── index.css                 # Tailwind, CSS tokens, keyframes, glass utilities
├── main.jsx                  # entry point
├── components/
│   ├── AuroraBackground.jsx  # fixed animated gradient layer (sitewide)
│   ├── Navbar.jsx            # floating pill navbar, mobile drawer
│   ├── Hero.jsx              # hero section, intro GSAP timeline
│   ├── AboutSection.jsx      # bio card, experience carousel, skills grid
│   ├── ProjectArchive.jsx    # scroll-blur project card stack
│   ├── ProjectPage.jsx       # individual project detail page
│   └── Footer.jsx
├── data/
│   └── projects.js           # single source of truth for all project content
└── lib/
    ├── animationState.js     # intro-played flag (skip on revisit)
    ├── useCursorVars.js      # writes --mx/--my CSS vars on pointermove
    ├── useMagnetic.js        # subtle cursor-attract on CTAs
    └── useTilt.js            # 3D tilt on hover for cards
```

## Adding a project

Edit `src/data/projects.js` only. The archive and project page pick up new entries automatically.

```js
{
  number: '09',
  slug: 'my-project',
  title: '',
  status: 'Completed' | 'Ongoing' | 'Planned',
  client: '',           // optional — renders violet "Client Project" badge
  stack: [],
  description: '',      // one-liner shown on archive card
  longDescription: '',  // full prose, shown on project page
  repoUrl: '',
  demoUrl: '',          // optional
  images: [],           // paths relative to /public/
}
```

Ordering convention: within each status group, most recent first.

## Deployment

Vercel. Push to `main` triggers a production deploy automatically.
