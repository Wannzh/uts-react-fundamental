// Simple WCAG contrast checker for selected color pairs
// Usage: node scripts/contrast-check.js

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(h => h + h).join('');
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function srgbToLinear(v) {
  v = v / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1, hex2) {
  const L1 = relativeLuminance(hex1);
  const L2 = relativeLuminance(hex2);
  const light = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return (light + 0.05) / (dark + 0.05);
}

const pairs = [
  { fg: '#0f172a', bg: '#f8fafc', name: 'Primary text (slate-900) on drawer (slate-50)' },
  { fg: '#475569', bg: '#f8fafc', name: 'Secondary text (slate-600) on drawer (slate-50)' },
  { fg: '#ffffff', bg: '#1d4ed8', name: 'Button text white on checkout (blue-700)' },
  { fg: '#0f172a', bg: '#ffffff', name: 'Primary text on pure white (sanity)' }
];

console.log('WCAG contrast check results (target: AA >= 4.5 for normal text, >= 3.0 for large text)');
console.log('-------------------------------------------------------------------');
let allPass = true;
for (const p of pairs) {
  const ratio = contrastRatio(p.fg, p.bg);
  const passAA = ratio >= 4.5;
  const passLarge = ratio >= 3.0;
  console.log(`${p.name}: ${p.fg} on ${p.bg} -> ratio ${ratio.toFixed(2)} :1 | AA normal: ${passAA ? 'PASS' : 'FAIL'} | AA large: ${passLarge ? 'PASS' : 'FAIL'}`);
  if (!passAA) allPass = false;
}

if (allPass) console.log('\nAll checked pairs meet WCAG AA for normal text (>=4.5:1).');
else console.log('\nSome pairs did NOT meet WCAG AA for normal text. Consider adjusting colors.');
