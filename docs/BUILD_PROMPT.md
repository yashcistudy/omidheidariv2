# Codex execution prompt — Omid Heidari portfolio v0.2

Use this prompt as the implementation brief for the next editing pass. It is intentionally written as an execution contract, not as a brainstorming request.

---

## Role and mission

You are Codex acting as Yas Dastan’s senior product-design and frontend partner. Edit the existing static portfolio prototype for Omid Heidari into version 0.2.

The result must feel like a genuine Yas-made digital experience about Omid: strategic, human, playful, a little unpredictable, and professionally credible. It must also remain an excellent conventional portfolio for visitors who do not want to play.

Do the work in the files. Do not stop at recommendations, wireframes, or a code sample. Preserve the existing version and make a new editable v0.2 copy.

### Working source

- Existing editable source: `/workspace/scratch/963beed32d7f/work/claude-result-v0.1/omid-portfolio-v0.1/`
- Published reference: `https://yashcistudy.github.io/omidheidari/`
- Existing source ZIP: `/workspace/scratch/963beed32d7f/upload/omid-portfolio-v0.1.zip`
- Omid portrait, CV PDF, interview poster, dice assets, content data, and review-mode code already exist in the source tree.
- Previous strategy/materials are under `/workspace/scratch/963beed32d7f/deliverables/omid-portfolio-claude-kit/`.

Create the edited site in a new folder named `omid-portfolio-v0.2`. Do not overwrite the uploaded ZIP or v0.1 source. At handoff, also create:

1. `omid-portfolio-v0.2.zip`
2. `CHANGELOG-v0.2.md`
3. `OPEN-QUESTIONS-FOR-OMID.md`
4. a short `README.md` with local preview and GitHub Pages instructions

The whole site must stay editable as plain HTML, CSS, JavaScript, SVG/PNG/WebP, and PDF. It must work on GitHub Pages with relative URLs and no build step.

---

## Product truth

This is not a portfolio decorated with game objects. It is an all-in-one recruitment and business-development surface with two equally legitimate ways in:

1. A fast conventional route for a recruiter, executive, client, or impatient visitor: view the readable CV page, download the PDF, scan experience and evidence, and contact Omid.
2. An optional board-game-inspired route that demonstrates how Omid thinks: choose a real goal, place attention on a territory, inspect decisions and proof, and reach the most relevant action.

The experience must help visitors do one of these things:

- recruit Omid for an executive or strategic role;
- hire Omid and/or his team for a project;
- book gamification, a workshop, facilitation, or an event;
- invite him to speak, teach, mentor, or collaborate;
- understand his work and contact him.

Every visible object must contribute to identity, orientation, proof, choice, progress, or conversion. Remove or redesign anything that exists only to announce “this is gamified.”

The mini-game is the one deliberate exception: it may simply be a satisfying optional puzzle because Omid enjoys challenging people with interesting problems. It must never gate portfolio content or imply a judgment of the visitor.

---

## What v0.1 already gets right — preserve these foundations

- Four clear static routes: `index.html`, `experience.html`, `cv.html`, and `minigame.html`.
- A visible first-touch choice between the experience, the readable CV, and the downloadable CV.
- A real portrait and a coherent dark indigo / ivory / orange identity.
- Centralized Persian content in `content/content.fa.js`.
- An evidence-status model that avoids publishing unsupported claims as facts.
- Progressive disclosure from territory card to quick view to detail dialog.
- An optional dice-net mini-game with the correct opposite-face rule.
- Keyboard-oriented controls, visible focus, reduced-motion support, skip link, and native dialogs.
- A private review mode using `?review=1`, local storage, copy, and JSON export.
- Yas Dastan’s credit in the footer.
- No framework, no build step, and relative URLs suitable for GitHub Pages.

Do not throw these away in a fashionable rebuild. Improve the system around them.

---

## Live audit: what the current experience lacks

### P0 — conversion is not complete

The site currently explains what a visitor could do but cannot complete the main business actions. In `content/content.fa.js`, all three contact routes have empty `href` values. The public experience therefore ends in placeholders instead of a real next step.

Requirements:

- Keep honest placeholders if Omid has not supplied final destinations, but make the missing information unmistakable in review mode and collect one destination per outcome.
- When real destinations are supplied, support `mailto:`, `tel:`, WhatsApp/Telegram, calendar/booking, LinkedIn, or a normal URL.
- Route each territory CTA to its matching contact outcome, not to the generic contact section only.
- Add a persistent but quiet contact/action affordance after the visitor has explored a territory.
- Do not invent contact data.

### P0 — Yas credit is visibly broken

`meta.creditUrl` is still `YAS_PORTFOLIO_URL`. Replace it only when Yas’s real URL is provided. Until then, do not output a broken link: render the credit as text with a `data-missing-url` marker in review mode, or link to a safe supplied URL. The credit must remain visible but not compete with Omid’s conversion actions.

Preferred label:

`طراحی تجربه و روایت: یاس دستان`

### P0 — review-mode URL handling is incorrect for hash links

The current `href(path)` appends `?review=1` after a hash for paths such as `index.html#contact`, producing `index.html#contact?review=1`. Fix this with the `URL` API or explicit parsing so the correct form is `index.html?review=1#contact`.

Also ensure the PDF download URL is not unnecessarily modified by review mode unless the query is intentional.

### P0 — the challenge die’s visible face can disagree with its state

`js/board.js` currently maps faces 1–4 to one 3D pose and uses a separate tiny face token to indicate the active result. A visitor can be told “face 3” while the large die visually shows another face.

Requirements:

- Implement one deterministic orientation per face, 1 through 6.
- Maintain standard opposite pairs: 1↔6, 2↔5, 3↔4.
- A rolled or assigned result must visibly match its accessible label and the target territory.
- Never use AI-generated dice imagery with malformed or inconsistent pips.
- Prefer deterministic geometry or a controlled, correctly rendered image/sprite set. The dice must remain responsive and crisp.

### P1 — the board looks like a dashboard, not an actual board game

The published `experience.html` is visually a stack of bordered panels labeled PHASE 1, PHASE 2, and PHASE 3. The five territories are handsome information cards, but they sit in a responsive card grid. The interaction works; the spatial metaphor does not.

Redesign the board layer so it reads at a glance as a tabletop system:

- create one bounded board surface with a clear physical edge, central hub, connected regions, and a route or placement logic;
- place the visitor’s “brief” or intent as the starting piece;
- use a dice tray or dice pool with several accurate dice, where every die has a meaning;
- turn the five territories into board spaces, rooms, departments, or stations around the hub rather than generic dashboard cards;
- use small tokens for people/team, proof, and decision only where those concepts occur;
- let the selected die/intent create a visible path to the recommended territory;
- reveal the quick view adjacent to or anchored to the selected territory on large screens;
- on mobile, translate the same spatial logic into a vertical route without horizontal panning or hidden content;
- keep all territories directly selectable. Randomness may recommend; it must never lock or conceal content.

The inspiration from Dice Hospital should be structural and tactile—dice as state, placement, allocation, adjacency, tray, and satisfying resolution—not a copy of its hospital theme, illustrations, names, iconography, board layout, or trade dress.

The core loop should be understandable without a tutorial:

`choose why you came → receive or roll a meaningful die → see a recommended territory → inspect role / problem / decision / result / evidence → take the relevant action`

The “rulebook” should be available, but the interface must not depend on it.

### P1 — the visual language needs more physical hierarchy

The current color palette is distinctive, but most of the experience is flat navy panels plus ivory cards. Improve material cues without making the page skeuomorphic or childish.

Use:

- the existing deep indigo as the table/box interior;
- warm ivory as card stock and CV paper;
- orange for the single next-best action;
- yellow for selection/focus/decision;
- teal for resolved/progress/evidence;
- violet for exploration/game state;
- magenta only as a rare creative interruption;
- Omid green for reflective or personal voice.

Introduce a disciplined set of tactile materials: board edge, paper card, recessed slot, dice tray, proof chip, player aid. Keep corners mostly sharp or lightly cut. Avoid generic soft SaaS cards, excessive rounded pills, floating gradients, glassmorphism, glowing blobs, arbitrary shadows, and equal-weight rainbow color use.

Use original or supplied assets. Do not use decorative placeholder boxes, emoji, malformed AI dice, or random generated illustrations. If a new texture or physical asset is needed, create it deliberately at the dimensions and crop required by the component.

### P1 — first-touch copy is not yet Omid’s voice

The copy is competent but often sounds like interface copy written about Omid rather than Omid welcoming someone to his table. Phrases such as `وارد تجربه شو` and repeated singular imperatives create a register mismatch.

Voice target:

- polite but unpredictable;
- professional without sounding institutional;
- friendly without forced slang;
- formal enough to trust, creative enough to feel like Omid;
- direct and natural in Persian, with a calm first beat and an occasional surprising second beat;
- use polite `شما` when direct address is necessary, but prefer pronoun-free labels where possible;
- allow one-line wit; do not turn every heading into a joke.

Avoid bureaucratic Persian such as `در راستای`، `بدین منظور`، `مبادرت به`، and translated corporate filler. Also avoid overcompensating with phrases such as `بزن بریم`.

Use this approved opening idea as the tonal anchor, preserving its conversational rhythm:

> نمی‌تونستم همه‌ی این‌ها رو به یک فایل پی‌دی‌اف محدود کنم.  
> اما تلاشم رو کردم.  
> پیشنهادم نسخه‌ی کامل این تجربه برای آغاز همکاری و مشارکتی رو به پیشرفت و سرشار از خلاقیته.

Use Omid’s actual line once, in a meaningful reflective or mini-game context:

> عمر کوتاهه، بیشتر بازی کنید!

Possible direction for route labels—not mandatory final wording:

- `وقت کم است؟ رزومه همین‌جاست.`
- `اگر کنجکاوید، میز بازی آماده است.`
- `رزومه را ببینید`
- `نسخه‌ی کامل را تجربه کنید`
- `رزومه‌ی PDF`

Rewrite all visible copy in `content/content.fa.js` as one consistent voice pass. Do not rewrite facts, claims, dates, titles, or evidence statuses without a source.

### P1 — the hero is memorable but too much text competes at once

The current first viewport contains a large headline, role paragraph, three actions, an aside, portrait, decorative board geometry, two dice, and a “double six” explanation. The identity is present, but the hierarchy is busy.

Requirements:

- Keep Omid’s portrait, name, role, and the two primary paths visible without scrolling.
- Preserve three destinations: full experience, readable CV, PDF download.
- Make only one action visually primary. The second route should still be obvious, not demoted to a text link.
- Shorten the deck and move supporting explanation below the fold or into a player-aid strip.
- Keep multiple dice, but group them in a believable tray or pool with a role in the experience.
- Give the portrait more human presence than the geometric frame around it.
- Do not let the prototype-review banner dominate the public identity. In public mode, make it quieter or remove it; in review mode, keep version status clear.

### P1 — the experience does not accumulate meaningful progress

Selecting an intent changes a question and highlights a territory, but the visitor’s action does not visibly build toward a result. Add a lightweight state model:

- current intent;
- current die face;
- recommended territory;
- visited territories;
- evidence inspected;
- resulting recommended CTA.

Represent this as a small player aid or progress rail, not points, badges, XP, or a completion percentage. The outcome should be “you now know where to go next,” not “you scored well.”

Do not persist ordinary visitor state unless it clearly improves the experience. Review answers may remain in local storage.

### P1 — review mode is comprehensive but exhausting

The review dialog contains many excellent questions, but it opens as one very long form. Omid is likely to skim, postpone, or answer only the first section.

Refactor it into progressive sections:

1. Fast pulse: identity score, strongest/weakest part, top desired outcome, tone.
2. Content accuracy: corrections, dates, missing projects, private items.
3. Proof and conversion: documents, metrics, testimonials, contact destinations.
4. Board and visual direction: starting territory, dice amount, what feels authentic, what feels decorative.

Requirements:

- show section navigation and progress by answered required questions, not by total fields;
- autosave as now;
- make sections collapsible or step-based, with no data loss;
- show a compact summary before copy/download;
- allow “skip for now” on nonessential questions;
- validate rank inputs so the same priority number cannot be assigned to multiple choices;
- retain copy and JSON download;
- never send the answers to a server;
- do not submit or delete anything without a clear action and confirmation.

### P2 — the CV route is the strongest page; refine, do not redesign it

The current `cv.html` is readable and credible. Preserve its editorial two-column structure and warm paper surface.

Improve only what helps scanning and conversion:

- keep role, portrait, PDF download, and “full experience” invitation at the top;
- add a clear contact action once a real destination exists;
- clarify overlapping roles and conflicting titles only after Omid confirms them;
- place evidence links or document badges next to claims when public proof exists;
- do not expose internal statuses in public mode;
- ensure print styles produce a clean conventional page;
- ensure the PDF link downloads the supplied CV reliably on GitHub Pages.

### P2 — the mini-game is good; polish its delight and state clarity

Keep the dice-net puzzle. It is one of the most coherent parts of v0.1.

Improve it carefully:

- keep the rule and correct opposite pairs exact;
- after a choice, use actual `disabled` attributes on all option buttons, not only `aria-disabled`;
- make feedback appear without leaving the visitor disoriented at a scrolled position;
- use a short, satisfying fold/highlight animation only when reduced motion is not requested;
- show why the impossible net fails with a clear adjacency/opposite-face highlight;
- keep “this does not measure intelligence or employability” in friendly language;
- offer “another puzzle,” “back to Omid,” and “view CV” after resolution;
- use `عمر کوتاهه، بیشتر بازی کنید!` as a closing wink if it fits naturally.

### P2 — trust needs more visible structure

The evidence system exists mostly as tiny chips and review-only labels. Make trust readable without showing internal editorial machinery.

Public experience:

- show verified/supported evidence as links or concise source labels;
- phrase self-reported material honestly;
- hide conflicts, private items, and unsupported numbers;
- distinguish responsibility, decision, output, and measured result;
- never turn a responsibility into a quantified result.

Review mode:

- show internal status, the missing item, and exactly what Omid should provide;
- support a future `evidenceUrl`, `evidenceType`, `issuer`, `date`, and `permissionToPublish` field;
- preserve all current claim IDs.

### P2 — information architecture needs a conversion spine

The normal page currently reads like a long collection of sections. Reorder or tighten it into this narrative:

1. Who Omid is and the two ways to view him.
2. What he can be trusted to lead/build/design.
3. A small number of selected proof-backed stories or territories.
4. How he approaches a problem.
5. Work with Omid / work with the team / book a game-based experience.
6. CV, interview, and contact.

Do not duplicate every territory detail on the home page. The normal route should be complete but scannable; the board route should provide the richer spatial exploration.

---

## Detailed interaction direction for the board

Build one coherent board, not a collection of board-themed widgets.

Suggested composition on desktop:

- Top: compact identity/player card with Omid portrait, title, CV shortcut, and leave-board action.
- One side: “why are you here?” brief tiles.
- Center: a tactile dice tray/pool and current challenge die.
- Around the center: five connected territory spaces.
- Along one edge: Omid’s ten-stage gamification method as a printed player aid, not a score track.
- Adjacent to the selected territory: a quick-view card.
- Bottom/edge: the action that matches the chosen intent.

Suggested meaningful dice system:

- one large active d6 = the current visitor question;
- five smaller territory dice = stable identifiers for Lead, Build, Play, Gather, Together;
- optional proof dice or markers only if they encode a real evidence state;
- a small pool/tray may contain several dice so the table feels abundant, but every die must either be selectable, assigned, or labeled by meaning;
- decorative dice may exist only as part of the coherent physical tray—not scattered around sections.

Interaction behavior:

- Choosing an intent assigns the correct face and animates the active die into the recommended route.
- Rolling is optional. It may suggest a different question/territory, but never override the visitor’s explicit intent.
- Selecting a territory moves a visible focus token and opens the quick view in context.
- Opening details uses an accessible dialog/sheet and returns focus on close.
- The final CTA changes label and destination based on the selected intent and territory.
- A visitor can jump to CV or exit the board at any time.

On mobile:

- preserve the same sequence as a vertical board path;
- keep the active die, selected intent, and next action visible near each other;
- do not reduce it to a generic stack of unrelated cards;
- do not require drag-and-drop, precision movement, hover, device motion, sound, or landscape orientation.

---

## Content and tone rules

1. Write Persian first. Do not translate English interface idioms literally.
2. Use one voice across navigation, buttons, board labels, empty states, dialogs, the mini-game, and review mode.
3. Keep sentences short enough to scan on cards.
4. Use humor sparingly and specifically.
5. Keep all professional claims source-aware.
6. Preserve the difference between Omid personally and Omid’s team.
7. Name collaborators when Omid gives permission; do not make the experience a lone-hero story.
8. Do not use game jargon where a visitor would need to decode it before acting.
9. Avoid “AI portfolio” signals: generic inspirational copy, repetitive headline formulas, vague superlatives, overly symmetrical feature grids, decorative gradient blobs, excessive pills, fake metrics, stock icons without purpose, and uniformly polished but contextless microcopy.
10. Let one or two elements be surprisingly human: a short aside, a question, a dry line, or an unexpected but helpful label.

---

## File-by-file implementation map

### `content/content.fa.js`

- Perform the complete voice pass.
- Update hero, actions, intent labels, rulebook, contact copy, mini-game copy, and review questions.
- Keep facts and evidence statuses stable unless supported by supplied documents.
- Extend CTA/contact objects so each outcome can have a distinct URL and channel.
- Add content keys needed for player aid/progress without hard-coding Persian in JS.
- Add future-ready evidence metadata while preserving existing IDs.

### `index.html`, `js/app.js`, `css/hero.css`, `css/components.css`, `css/base.css`

- Simplify first-touch hierarchy.
- Preserve all three entry actions.
- Make public and review prototype messaging visually distinct.
- Fix URL/hash/review handling.
- Render Yas credit safely when its URL is missing.
- Tighten the conventional portfolio narrative and contact spine.
- Add print and small-screen refinements.

### `experience.html`, `js/board.js`, `css/board.css`

- Replace the stacked phase/dashboard composition with the spatial board described above.
- Create deterministic die orientations for all six faces.
- Add visitor state, focus token, meaningful progress/player aid, contextual quick view, and intent-specific final CTA.
- Preserve direct territory access, progressive disclosure, keyboard support, and reduced motion.
- Do not hard-code copy that belongs in `content.fa.js`.

### `minigame.html`, `js/minigame.js`, `css/minigame.css`

- Preserve the correct puzzle logic.
- Make answer controls truly disabled after selection.
- Improve result positioning, explanation, and restrained delight.

### `js/review.js`, `css/review.css`

- Refactor the form into four manageable sections.
- Keep autosave/copy/JSON.
- Validate unique ranking.
- Add summary and missing-data prompts.
- Maintain focus behavior and clear destructive-action confirmation.

### `assets/`

- Reuse Omid’s supplied portrait, CV, and interview image.
- Optimize image formats/sizes without degrading the portrait.
- Keep dice exact. If replacing the current CSS dice, use deterministic rendered geometry or a verified physical reference, not generative dice.
- Add only assets used by a named interface component.

### `README.md`

- Keep editing guidance concise and accurate.
- Document where tone, URLs, claims, dice mapping, colors, and review questions live.
- Include GitHub Pages deployment instructions.

---

## Accessibility and resilience requirements

- Correct `lang="fa"` and `dir="rtl"`.
- Logical DOM/reading order that remains sensible without CSS.
- Keyboard access for every action; no drag-only interaction.
- Visible focus with at least 3:1 contrast against adjacent colors.
- Minimum 44×44 CSS-pixel touch targets for primary interactive controls.
- Headings in a meaningful hierarchy.
- Status changes announced without excessive verbosity.
- Dice visual state duplicated in text; never rely only on pips or color.
- Native buttons/links for actions; do not make generic divs clickable.
- Dialogs close with Escape, contain focus, and return focus to the trigger.
- Respect `prefers-reduced-motion` and provide no essential timed interaction.
- No autoplay audio or video.
- Body text should remain readable at 200% zoom.
- No horizontal overflow at 320 CSS pixels.
- Good contrast for ivory-on-indigo text, muted text, chips, borders, and focus states.
- Do not claim WCAG compliance without testing; fix evident risks and document remaining checks.
- Keep content and navigation usable if JavaScript fails; retain `noscript` fallbacks where practical.

---

## Technical corrections and quality bar

- Use the `URL` API for internal URL mutation and preserve query before hash.
- Keep all GitHub Pages paths relative and case-correct.
- Do not add a framework, package manager, CDN dependency, analytics, cookies, or backend.
- Avoid remote fonts unless there is a local fallback and the site remains legible offline.
- No console errors, missing assets, placeholder URLs presented as working links, or dead CTAs.
- Preserve source comments that help Yas edit the site; remove misleading comments.
- Keep content centralized and avoid duplicating copy across HTML files.
- Do not expose private evidence or internal review notes in public mode.
- Do not rewrite the supplied PDF.

---

## Verification plan — complete before handoff

### Functional routes

1. Open `index.html` directly from the filesystem.
2. Open it through a local static server.
3. Test `experience.html`, `cv.html`, and `minigame.html`.
4. Test all three first-touch actions.
5. Test every intent and all five territories.
6. Test roll behavior and verify the visual face equals the announced face.
7. Test quick views, detail dialogs, CTA routing, close behavior, and focus return.
8. Test correct and incorrect mini-game choices, replay, CV, and back links.
9. Test `?review=1` on every route and with `#contact`.
10. Test review autosave, section navigation, unique ranking validation, copy, JSON download, and reset confirmation.
11. Test the CV PDF link from normal and review routes.
12. Confirm Yas credit is not a broken link.

### Viewports

- Desktop: 1440×900 and 1280×800.
- Tablet: 768×1024.
- Mobile: 390×844 and 320×568.
- Test at 200% browser zoom.

### Visual QA

- Capture and inspect screenshots of the entry, board start, intent selected, territory quick view, detail dialog, CV, mini-game result, review fast pulse, and mobile board.
- Check portrait crop, Persian shaping, line wrapping, spacing, board edge, dice pips/orientation, dialog position, sticky elements, and footer credit.
- Make sure the board reads as one physical spatial system before reading labels.

### Code QA

- Run syntax checks on all JavaScript.
- Check all local HTML/CSS/JS/image/PDF references for missing files.
- Check duplicate IDs and basic semantic structure.
- Confirm no public placeholder text is accidentally presented as a claim or action.

---

## Definition of done

Version 0.2 is done only when:

- the first screen unmistakably belongs to Omid and offers the full experience, readable CV, and PDF;
- a busy recruiter can reach useful CV information in one action;
- a curious visitor can understand and use the board without reading the rulebook;
- the board feels spatial and tactile rather than like a card dashboard;
- multiple dice are visible, accurate, and meaningful;
- every selected die face matches its text and target;
- the normal site remains complete, readable, and responsive;
- the mini-game is optional, correct, and satisfying;
- the review mode is fast enough to complete and detailed enough to guide the next content pass;
- unsupported claims remain hidden or honestly labeled;
- primary business actions lead somewhere real once Omid supplies the destinations;
- Yas’s credit is visible and never a broken placeholder link;
- the site works on GitHub Pages with no build step;
- all output remains easy for Yas to edit by hand.

At handoff, lead with the working v0.2 preview and a short explanation of the most important changes. Then provide the edited folder/ZIP, changelog, and the smallest set of unresolved questions for Omid. Do not describe the work as complete if live contact destinations or evidence are still missing; name those as content blockers, not implementation failures.

