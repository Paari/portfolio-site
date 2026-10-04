/**
 * Shared pixel engine for the site.
 *
 * Every lit pixel is drawn as three channel squares (red, green, blue).
 * In light mode they are composited with `multiply`, so when the three
 * channels line up they print as ink black (like misregistered print that
 * finally lands). In dark mode they are composited additively (`lighter`),
 * so the same three channels resolve to white, the way a screen does.
 */

export type RGB = [number, number, number];

export interface Palette {
    channels: [RGB, RGB, RGB];
    ink: RGB;
    dark: boolean;
    blend: GlobalCompositeOperation;
}

const parseTriplet = (raw: string): RGB => {
    const parts = raw.trim().split(/[\s,]+/).map(Number);
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
};

export const readPalette = (): Palette => {
    const css = getComputedStyle(document.documentElement);
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return {
        channels: [
            parseTriplet(css.getPropertyValue('--r')),
            parseTriplet(css.getPropertyValue('--g')),
            parseTriplet(css.getPropertyValue('--b')),
        ],
        ink: parseTriplet(css.getPropertyValue('--ink-rgb')),
        dark,
        blend: dark ? 'lighter' : 'multiply',
    };
};

export const rgba = ([r, g, b]: RGB, a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`;

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (e0: number, e1: number, x: number) => {
    const t = clamp((x - e0) / (e1 - e0));
    return t * t * (3 - 2 * t);
};
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Size a canvas for crisp rendering and return its 2D context. */
export const fitCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
};

/** Deterministic pseudo-random so scatter patterns are stable between frames. */
export const hash = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};

/* ------------------------------------------------------------------ */
/* 5x7 bitmap glyphs for the wordmark                                  */
/* ------------------------------------------------------------------ */

const GLYPHS: Record<string, string[]> = {
    A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
    H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    I: ['###', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
    N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
    O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
    R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
    S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
    T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
    U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
};

export interface Bitmap {
    cells: { x: number; y: number }[];
    cols: number;
    rows: number;
}

/** Lay out lines of text as a set of lit grid cells. */
export const textBitmap = (lines: string[], lineGap = 2): Bitmap => {
    const cells: Bitmap['cells'] = [];
    let cols = 0;
    lines.forEach((line, li) => {
        let x = 0;
        const top = li * (7 + lineGap);
        [...line.toUpperCase()].forEach((ch, ci) => {
            const glyph = GLYPHS[ch];
            if (!glyph) {
                x += 3;
                return;
            }
            glyph.forEach((row, gy) => {
                [...row].forEach((px, gx) => {
                    if (px === '#') cells.push({ x: x + gx, y: top + gy });
                });
            });
            const glyphW = glyph[0] ? glyph[0].length : 5;
            x += glyphW + (ci < line.length - 1 ? 1 : 0);
        });
        cols = Math.max(cols, x);
    });
    return { cells, cols, rows: lines.length * 7 + (lines.length - 1) * lineGap };
};

/** Parse a hand-drawn bitmap ('#' = lit). */
export const artBitmap = (rows: string[]): Bitmap => {
    const cells: Bitmap['cells'] = [];
    rows.forEach((row, y) => [...row].forEach((px, x) => px === '#' && cells.push({ x, y })));
    return { cells, cols: Math.max(...rows.map((r) => r.length)), rows: rows.length };
};
