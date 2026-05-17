# TANXOS — Portfolio OS

A portfolio that looks like an operating system. Built out of curiosity while learning web development.

It started as me wondering *"what if a portfolio looked like a real desktop?"* — and it kind of got out of hand from there. Ended up showcasing it at a college event too.

---

## What's inside

Two interfaces, same content:

**Desktop OS** — a draggable window manager. Has a dock, app launcher, theme switcher, boot sequence, power controls (suspend/shutdown/restart), and a system info terminal.

**Mobile OS** — an iOS-style interface that shows up on phones. Same apps, different layout — full-screen app transitions, a home grid, and a dock.

Apps available:
- Terminal (with a fake but functional shell)
- Projects (pulls live from GitHub API)
- Skills
- Music Player
- Contacts / Network
- About

---

## Stack

- **Next.js 15** (static export)
- **Framer Motion** for animations
- **Tailwind CSS**
- **TypeScript**
- Deployed on **Cloudflare Pages**

---

## Setup

Clone it and run it locally in about a minute.

```bash
git clone https://github.com/TANISHX1/portfolio.git
cd portfolio
npm install
npm run dev
```

Open `http://localhost:3000` — that's it.

To point it at your own GitHub, edit `src/app/page.tsx` and change the `username` prop:

```tsx
<Desktop username="your-github-username" />
```

Your profile info and repos will load automatically from the GitHub API.

---

## Customization

Most of the personal data lives in `src/data/`:

| File | What it controls |
|------|-----------------|
| `profile.ts` | Name, bio, links, skills |
| `projects.ts` | Manually curated project list |
| `friends.ts` | The network/contacts section |
| `desktop.ts` | App icons and their order |

Avatars go in `public/avatars/`.

---

## Build & Deploy

```bash
npm run build
```

Outputs a static site to `out/`. Drop it anywhere — Cloudflare Pages, Vercel, Netlify, GitHub Pages.

---

Made by [Tanish Shivhare](https://github.com/TANISHX1)
