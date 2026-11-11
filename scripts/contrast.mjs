// Checks WCAG contrast for every text/background pair used on the site.
// Run with `node scripts/contrast.mjs`. Keep the values in step with global.css.
const themes = {
  light: { bg: '#ffffff', surface: '#f8fafc', text: '#0f172a', muted: '#475569', accent: '#2563eb', accentHover: '#1d4ed8', onAccent: '#ffffff' },
  dark: { bg: '#0b1120', surface: '#111a2e', text: '#e2e8f0', muted: '#94a3b8', accent: '#60a5fa', accentHover: '#93c5fd', onAccent: '#0b1120' },
};

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum] (4.5 for text, 3 for focus ring/UI)
const pairs = [
  ['text', 'bg', 4.5], ['text', 'surface', 4.5],
  ['muted', 'bg', 4.5], ['muted', 'surface', 4.5],
  ['accent', 'bg', 4.5], ['accent', 'surface', 4.5],
  ['accentHover', 'bg', 4.5],
  ['onAccent', 'accent', 4.5], ['onAccent', 'accentHover', 4.5],
  ['accent', 'bg', 3], // focus ring
];

let failed = false;
for (const [name, t] of Object.entries(themes)) {
  console.log(`\n${name}`);
  for (const [fg, bg, min] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    failed ||= !ok;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${fg} on ${bg}: ${r.toFixed(2)}:1 (needs ${min})`);
  }
}
process.exit(failed ? 1 : 0);
