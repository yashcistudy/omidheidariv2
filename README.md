# Omid Heidari Portfolio — v0.2

An editable Persian/RTL portfolio prototype built as a premium strategy board laid on a real table. The visitor can immediately choose the full experience, a conventional readable CV, or the downloadable PDF.

## What is working

- First-touch choice screen with Omid's identity visible before any route decision
- Five selectable collaboration territories: leadership, building, play, gathering people, and working with the team
- Functional dice mechanic with a physical three-die selection history
- Evidence-aware case files and focused recruitment/booking calls to action
- Readable CV route and direct PDF download
- Optional dice puzzle that never blocks the professional content
- Compact review drawer that autosaves Omid's answers and exports them as JSON
- Responsive Persian/RTL layouts for desktop, tablet, and mobile

## Edit the prototype

| What you want to change | File |
|---|---|
| Persian copy, claims, roles, case files, URLs | `src/content.fa.js` |
| Page structure and interactions | `src/App.jsx` |
| Dice behavior and rendered die assets | `src/Dice3D.jsx`, `public/assets/dice/` |
| Colors, materials, spacing, responsive layout | `src/styles.css` |
| Portrait, interview still, CV PDF | `public/assets/` |
| Durable creative direction | `AGENTS.md` |

The visual system deliberately avoids childish game UI. Keep future additions grounded in real materials, restrained motion, adult strategy-game typography, exact dice geometry, and a clear visitor action.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run test:sites
```

The static GitHub Pages site is generated in `dist/client/`. Asset paths are relative, so the build works under a repository subfolder as well as a custom domain.

## Publish on GitHub Pages

1. Put these files at the root of the `omidheidari` repository and push to `main`.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included `.github/workflows/deploy.yml` builds and publishes `dist/client/` on every push to `main`.

## Confirm before calling it final

- Replace the temporary LinkedIn-only contact path with Omid's approved email, booking link, or form.
- Add the documents, certificates, and public evidence that support claims currently marked as pending.
- Confirm the overlapping employment dates and exact job title noted in the CV route.
- Replace the creator URL in `src/content.fa.js` if Yas's final portfolio URL changes.

