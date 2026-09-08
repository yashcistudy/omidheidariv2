# Design QA — Omid Portfolio v0.3

## Visual target

- Selected direction: a mature, top-down strategy board on a walnut table
- Reference: `docs/selected-reference.png`
- Comparison artifact: `qa-compare-final.png`
- Primary desktop browser check: 1363 × 936
- Mobile rules reviewed at the 900 px and 650 px breakpoints

## Results

| Area | Result | Evidence |
|---|---|---|
| Reference fidelity | Passed | The three-part tabletop composition, portrait dossier, central board, path pieces and physical dice language remain intact |
| RTL hierarchy | Passed | Desktop order is profile on the right, board in the middle and selected-path dossier on the left |
| Mobile path choice | Passed | The die sits before the route cards; choosing a route opens its bottom-sheet dossier immediately and locks background scrolling |
| Route-card fit | Passed | Desktop pieces use shorter copy, internal padding, line clamping and an anchored number; mobile cards remove the clip path and reveal the complete summary |
| Dice purpose | Passed | One real die now selects a meaningful route: ۱–۵ map to the five paths and ۶ returns the choice to the visitor |
| Copy voice | Passed | Public copy is addressed directly from Omid's first-person perspective; no public use of «آدم‌ها» or labels such as «وجه ۳» remains |
| Project proof | Passed | Three supplied project box images and four supplied organization/brand marks render with explicit leadership and team credit |
| Contact path | Passed | Email, LinkedIn, Instagram and GitHub are present; the Formspree form stays visibly disabled until its endpoint is configured |
| Puzzle | Passed | The optional puzzle generates a new three-number code, accepts five attempts and returns exact-position versus wrong-position feedback |
| Accessibility basics | Passed | Skip link, semantic controls, dialog labels, keyboard close, focus styles, reduced-motion support and alt text are present |
| GitHub Pages readiness | Passed | The Vite build uses the repository base dynamically; the Pages workflow uploads `dist/client` |
| Runtime health | Passed | Production build and four packaging tests pass; browser interactions produce no application-origin errors |

## Intentional placeholders

- `formspreeEndpoint` in `src/content.fa.js` is empty until Yas adds the approved Formspree endpoint.
- Claims without supplied public evidence remain carefully phrased rather than presented as verified metrics.

**final result: passed**
