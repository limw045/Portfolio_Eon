# Cinema Noir Portfolio Design

## Intent

Cinema Noir is a fully directed second stage for the portfolio, not a palette swap. It reuses the same biography, education, interests, skills, workflow, tools, and contact information as the IDE stage while replacing the workspace metaphor with a private screening room.

The visitor moves through a title sequence, three reels, an intermission, and end credits. The experience remains fast enough for recruiters: cinematic framing is concentrated in entrances and transitions, while interactive content remains stable and scannable.

## Visual Direction

- Coal black, smoke, aged ivory, muted silver, and oxidized red only.
- Playfair Display for title cards, Archivo Narrow for reel metadata, and Outfit for readable content.
- Square editorial surfaces and hairline rules instead of glass cards and rounded IDE windows.
- Four local architectural stills: rainy brutalist threshold, three-light staircase, bright cinema corridor, and city network grid.
- No people, detective costumes, weapons, neon, HUD graphics, black-and-gold luxury styling, or literal noir props.
- Motion behaves like a camera: masked title reveals, restrained push-ins, projector light, and a short curtain transition. Reduced-motion users receive a static cut.

## Experience Structure

1. **Origin / Title Sequence** — “Full-Stack After Dark” with the rainy architectural threshold.
2. **Education / Reel One** — the academic journey as three acts over the staircase still.
3. **Culture / Intermission** — the only bright scene, presenting football, music, science fiction, and competitive play as a programme wall.
4. **Skills / Reel Two** — a projection console retaining language selection and simulated execution.
5. **Workflow / Reel Three** — n8n becomes a cue sheet with staged nodes and generated output.
6. **Tools / End Credits** — interactive visual controls and the portfolio build credits.
7. **Contact / Post-Credits** — the existing accessible contact dialog restyled as a meeting invitation.

## Architecture and Behaviour

- The existing IDE stage and new Cinema stage remain on the same route. Only one is active; the inactive stage is `hidden` and `inert`.
- `data-section-key` maps equivalent sections. Theme switches capture the active semantic section, close a 450ms curtain, activate the new stage, restore shared values, and reveal the mapped section.
- Theme preference is applied in the document head before first paint. IDE remains the default.
- Code language/output, workflow prompt/result, selected soundtrack, and micro-tool values synchronize when switching stages.
- Football, Swiss, and Travel remain visible WIP previews and continue to use the IDE stage.
- The site becomes English-only. The language control, translation dictionaries, translation attributes, and language preference are removed.
- Sound is opt-in. Cinema feedback is synthesized with Web Audio; it never autoplays, and music always requires a direct user action.
- Image failure falls back to CSS lighting. Mobile disables parallax; reduced motion disables cinematic transitions. Focus moves to the mapped heading after switching.

## Acceptance

- Cinema contains no IDE window, file-tab, line-number, terminal, or source-tree metaphor.
- All major content areas and interactions remain available in both stages.
- Theme persistence does not flash the wrong stage.
- Keyboard navigation, focus visibility, escape handling, contrast, responsive layout, and reduced-motion behaviour remain usable.
- All Cinema media is local, compressed, and optional to understanding the content.
