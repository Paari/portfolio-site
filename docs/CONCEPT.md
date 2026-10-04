# Site Concept — Paritosh Pundir

> A personal site for a generalist. Light, quiet, and precise, with just enough
> motion to feel alive. The whole thing reads like a well-lit workshop: pixels,
> RGB, and hand-drawn machines that answer the pointer.

## 1. Positioning

Paritosh is a **designer-developer generalist** — 15 years across hands-on
build and leading teams, but the throughline is _solving problems through
design_ and _storytelling_. The site should feel like him: curious, tidy,
productivity-obsessed, a little playful.

We deliberately **do not reproduce the résumé.** The site is a curated story,
not a CV. We pull a few cues and leave the rest.

| From the résumé | On the site |
| --- | --- |
| Generalist, storytelling, productivity hacker | Keep — this is the core voice |
| Scrappi, E-Hallpass, ISM | Keep — three flagship stories, no more |
| Full employment history (Rubico, DoRemember, Paary) | Drop the timeline; fold the best bits into prose |
| Exhaustive skills lists | Reduce to a short, honest set |
| Hindi topper, state cricket, neoVim ritual | Keep 2–3 as personality, lightly |
| Phone number, address detail | Drop; use email + social only |

## 2. Visual language

The existing theme already nails the direction — keep and extend it:

- **RGB as the accent system.** Red `#d64545`, green `#2e9e5b`, blue `#4a5bd0`.
  Used sparingly: the animated underline, the pixel dot, hover states.
- **Pixels.** A faint grid background and a few floating "pixels." The pixel is
  the site's recurring motif.
- **Light, paper-like surface.** `#fafafa` base, near-black ink `#1a1a1a`.
- **Typography.** Lato is in place. Keep it; it's clean and unfussy.

## 3. The new ingredient — Hairline line drawings

`@lucasmarkes/hairline` gives us **interactive isometric line figures** that
respond to the pointer. They are line-art, zero-dependency, and theme-able —
which lets them sit inside the RGB/pixel world instead of fighting it.

### Why it fits

- **Line drawings over stock art** keeps the site light and "built, not
  decorated."
- The **`phosphor`** figure is literally a 7×7 dot matrix that fades like a CRT
  — a perfect echo of the pixel motif.
- Each figure is a tiny _machine_, which matches the workshop tone.

### Figure → section mapping

| Section | Figure | Why |
| --- | --- | --- |
| Hero | `phosphor` | Dot matrix = pixels; glows where you point |
| Scrappi (bookmarking / graph) | `branches` | A commit graph that rises with history |
| E-Hallpass (SaaS, iPad-first) | `exploded` _or_ `phone` | App window / device in layers |
| ISM (dense forms & data) | `patch` _or_ `cabinet` | Ports / blades = structured data |
| "Beyond the work" (neoVim ritual) | `terminal` | A terminal that scrolls its history |

Use **one figure per section at most.** They are accents, not a gallery.

### Theming the figures to RGB

Hairline exposes six CSS custom properties. Map them onto the site palette so
the figures read as part of the page, and set the plate to the page background
(it is a light, non-white surface):

```css
.hairline-figure {
  --hairline-plate: #fafafa;  /* must match the page background */
  --hairline-hi: #1a1a1a;     /* lit strokes = ink */
  --hairline-edge: #4a5bd0;   /* silhouettes = blue */
  --hairline-mid: #2e9e5b;    /* secondary strokes = green */
  --hairline-lo: #d64545;     /* receding strokes = red */
  --hairline-stroke: 1;
}
```

This literally renders the line machines in R/G/B. Tune per figure if a single
accent reads cleaner than all three.

## 4. Page structure (single page)

1. **Header** — tiny logo + "Believe" tag (keep existing interaction).
2. **Hero** — name wordmark, one-line tagline, `phosphor` figure to the side.
3. **About** — 2 short paragraphs. Generalist + storytelling + productivity.
4. **Selected work** — Scrappi, E-Hallpass, ISM. Each: title, one-line role,
   2–3 sentences of outcome, one hairline figure.
5. **Beyond the work** — 2–3 personality lines (neoVim, cricket, Hindi topper).
6. **Footer** — email, GitHub, LinkedIn, Dribbble.

## 5. Principles

- **Restraint.** Motion is a seasoning. Respect `prefers-reduced-motion`
  (Hairline already does).
- **One idea per section.** Don't crowd.
- **Accessible.** Give every figure a `label`. Keep contrast on the light bg.
- **Fast.** Hairline is zero-dep and shares one animation loop; keep it that way
  (no heavy imagery).
