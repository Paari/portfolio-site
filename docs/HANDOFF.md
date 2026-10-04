# Handoff — decisions & open tasks

Context for the next agent picking up the personal site. Read
[CONCEPT.md](CONCEPT.md) first for the "why"; this file is the "what to do."

## Decisions already made

1. **Branch.** Work happens on `feat/concept-hairline` (off `main`). Nothing is
   merged yet.
2. **Dependency added.** `@lucasmarkes/hairline@0.2.0` is installed
   (`package.json` + lockfile updated). Zero runtime deps, ESM only.
3. **No React.** Astro is staying zero-JS-by-default. Use Hairline's **vanilla
   DOM API** from Astro `<script>` tags, not the `/react` entry. Do **not** add
   `@astrojs/react` just for this.
4. **Visual language is set and kept:** light `#fafafa` surface, ink `#1a1a1a`,
   RGB accents (`#d64545` / `#2e9e5b` / `#4a5bd0`), pixel-grid motif, Lato type.
   The existing hero wordmark, logo "Believe" interaction, and pixel/RGB canvas
   stay.
5. **Content is curated, not a résumé dump.** Keep: generalist voice,
   storytelling, productivity-hacker personality, and three flagship projects
   (Scrappi, E-Hallpass, ISM). Drop: the employment timeline, exhaustive skills
   lists, phone/address, and most "other projects."
6. **Illustration strategy.** One Hairline figure per section, max. Figures are
   accents, not a gallery. See the figure→section map in CONCEPT.md.
7. **Placeholder projects get replaced.** The current `src/pages/index.astro`
   lists unrelated repos (Chrome Reader, Fitbit Explorer, Conventional Commit
   CLI, DoRemember). Replace the "Projects" grid with the three flagship
   stories. A couple of personal OSS repos can live in a small secondary list if
   desired, but they are not the headline.

## Open tasks (suggested order)

- [ ] **Rewrite `index.astro` content** to the structure in CONCEPT.md §4
      (Hero → About → Selected work → Beyond the work → Footer).
- [ ] **Add a reusable figure holder.** A small `HairlineFigure.astro` component
      that renders `<div class="hairline-figure" id={id} aria-hidden>` plus the
      mount script, taking the figure name + options as props. Keep one shared
      `<script>` pattern so all figures share Hairline's single rAF loop.
- [ ] **Mount figures:** `phosphor` in the hero; `branches` on Scrappi;
      `exploded` or `phone` on E-Hallpass; `patch` or `cabinet` on ISM;
      `terminal` in "Beyond the work."
- [ ] **Theme the figures** with the `--hairline-*` custom properties mapped to
      the RGB palette (snippet in CONCEPT.md §3). Remember
      `--hairline-plate` must equal the page background (`#fafafa`).
- [ ] **Accessibility pass:** give every figure a meaningful `label`; confirm
      contrast on the light background; verify `prefers-reduced-motion` behaves.
- [ ] **Write the copy** for About + three project blurbs (2–3 sentences each,
      outcome-focused, pulled/condensed from the résumé — do not paste it).
- [ ] **Fix deploy config if needed.** `astro.config.mjs` has
      `base: 'portfolio-site'` (no leading slash) with `site: paari.github.io`.
      Confirm this matches the actual GitHub Pages repo/path before shipping.
- [ ] **Run `npm run build`** (includes `astro check`) and resolve any type/lint
      issues before opening a PR.

## Hairline quick reference

- Import figures from `@lucasmarkes/hairline`. Available:
  `riffle, terrain, exploded, phosphor, slow, turntable, keyboard, elevator,
  phone, laptop, terminal, cabinet, branches, vault, lockers, padlock, patch,
  dish, router`.
- Call signature: `figure(el, options?) → { update(options), destroy() }`.
- Options: `intensity` (0–1, default 0.5), `theme` (`auto|light|dark`),
  `label` (accessible name), `onRead(text)` (caption callback).
- The figure fills its parent at a **5:4 aspect ratio** — size the holder, not
  the figure.
- SSR-safe: on the server the component/holder is an empty box; mount in a
  client script after the element exists.

## Gotchas

- Figures are **filled plates**, not transparent. If the background isn't pure
  white or `#08090a`, set `--hairline-plate` to that exact background or you'll
  see a mismatched rectangle.
- Keep imports inside Astro `<script>` tags so Vite bundles them client-side;
  don't import Hairline in the component frontmatter (that runs on the server).
- There is a `hairline-create` agent skill (`npx skills add lucasmarkes/hairline`)
  if a bespoke figure is ever wanted — not needed for the current plan.
