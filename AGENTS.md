# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Omid portfolio direction

- Source visual: selected board-game direction `generated_images/exec-a1209947-f390-4be6-a402-659cf2c54901.png`.
- The experience must feel like a premium strategy board game laid on a real table, with believable paper, wood, fabric, recessed wells, tokens, cards, lighting, depth, and physically correct dice.
- Never make the work childish, toy-like, cartoony, glossy-mobile-game-like, or generically "gamified".
- The board layer must serve recruitment and booking decisions. Every component needs a content, navigation, evidence, or conversion purpose.
- Keep the readable CV route and PDF download obvious from the first screen.
- Voice: polite but unpredictable; professional but creative; friendly natural Persian without bureaucratic stiffness or forced slang.
- Keep the mini-game optional. It must never block access to the portfolio or contact actions.
- Preserve evidence status and avoid publishing unsupported claims as facts.
- Credit Yas Dastan / یاس دستان in a visible but quiet location with an editable portfolio URL.
