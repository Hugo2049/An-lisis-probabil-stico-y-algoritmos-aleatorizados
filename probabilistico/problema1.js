// ═══════════════════════════════════════════════════════
// PROBLEMA 1: Generador uniforme usando bits aleatorios
// ═══════════════════════════════════════════════════════
function random01() {
  return Math.random() < 0.5 ? 0 : 1;
}

function random(a, b) {
  const range = b - a + 1;
  const k = Math.ceil(Math.log2(range));
  while (true) {
    let r = 0;
    for (let i = 0; i < k; i++) r = r * 2 + random01();
    if (r < range) return a + r;
  }
}

const [A, B] = [1, 6];
const N = 10000;
const counts = {};
for (let i = 0; i < N; i++) {
  const v = random(A, B);
  counts[v] = (counts[v] || 0) + 1;
}
console.log(`random(${A}, ${B}) — ${N} llamadas:`);
for (let v = A; v <= B; v++) {
  const pct = ((counts[v] || 0) / N * 100).toFixed(1);
  const bar = '█'.repeat(Math.round((counts[v] || 0) / N * 30));
  console.log(`  ${v}: ${bar} ${pct}%`);
}
const k = Math.ceil(Math.log2(B - A + 1));
const p = (B - A + 1) / Math.pow(2, k);
console.log(`\nAnálisis:`);
console.log(`  k = ⌈log₂(${B - A + 1})⌉ = ${k} bits`);
console.log(`  P(éxito por intento) = ${B - A + 1}/2^${k} = ${p.toFixed(4)}`);
console.log(`  E[intentos] = 1/p = ${(1 / p).toFixed(4)}`);
console.log(`  → T(n) ∈ O(1) en tiempo esperado`);
