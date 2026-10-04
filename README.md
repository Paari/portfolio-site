# Paritosh Pundir — Personal Site

A single-page personal site built with [Astro](https://astro.build). Light,
pixel-and-RGB visual language with interactive line-drawing illustrations from
[`@lucasmarkes/hairline`](https://hairline.lucasmarkes.com/).

## Concept

The site is a curated story, not a résumé: a generalist designer-developer, told
through a quiet light interface, an RGB accent system, a recurring pixel motif,
and a few hand-drawn isometric "machines" that answer the pointer.

- Design direction and decisions: [docs/CONCEPT.md](docs/CONCEPT.md)
- Build plan and open tasks: [docs/HANDOFF.md](docs/HANDOFF.md)

## Tech

- **Astro** — static site, zero-JS by default.
- **@lucasmarkes/hairline** — interactive isometric line figures (ESM, zero
  dependencies). Used via its vanilla DOM API inside Astro client scripts.
- **Lato** — typography.

## Project structure

```text
/
├── docs/
│   ├── CONCEPT.md      # visual + content concept
│   └── HANDOFF.md      # decisions and tasks for the next agent
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
└── package.json
```

## Commands

All commands run from the project root:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build to `./dist/` (`astro check` runs first) |
| `npm run preview` | Preview the production build locally         |

## Using Hairline

Hairline is ESM and needs a DOM, so mount figures in an Astro client `<script>`
after the target element exists:

```astro
<div id="hero-figure" class="hairline-figure" aria-hidden="true"></div>

<script>
  import { phosphor } from '@lucasmarkes/hairline';
  const el = document.getElementById('hero-figure');
  if (el) phosphor(el, { intensity: 0.6, label: 'A glowing dot matrix' });
</script>
```

Theme the figures to the RGB palette with the `--hairline-*` custom properties —
see [docs/CONCEPT.md](docs/CONCEPT.md).
