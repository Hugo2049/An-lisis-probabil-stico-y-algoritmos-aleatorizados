// ═══════════════════════════════════════════════════════
// PROBLEMA 2: Generador sin sesgo usando uno con sesgo
// ═══════════════════════════════════════════════════════
// TRUCO DE VON NEUMANN:
//   Par (1,0) → devuelve 1  | prob p(1-p)
//   Par (0,1) → devuelve 0  | prob (1-p)p  → ambas iguales → 50/50
//   Par (0,0) o (1,1) → DESCARTA y repite
// E[llamadas] = 1/(p(1-p))

function biasedRandom(p) {
  return Math.random() < p ? 1 : 0;
}

function unbiasedRandom(p) {
  let calls = 0;
  while (true) {
    const a = biasedRandom(p); calls++;
    const b = biasedRandom(p); calls++;
    if (a === 1 && b === 0) return { bit: 1, calls };
    if (a === 0 && b === 1) return { bit: 0, calls };
  }
}

const valores_de_p = [0.1, 0.3, 0.5, 0.7, 0.9];
const N = 5000;
for (const p of valores_de_p) {
  let unos = 0, totalCalls = 0;
  for (let i = 0; i < N; i++) {
    const { bit, calls } = unbiasedRandom(p);
    if (bit === 1) unos++;
    totalCalls += calls;
  }
  const pctUnos = (unos / N * 100).toFixed(1);
  const avgCalls = (totalCalls / N).toFixed(2);
  const teorico = (1 / (p * (1 - p))).toFixed(2);
  console.log(`p=${p.toFixed(1)}: salida=${pctUnos}% unos | E[calls] simulado=${avgCalls} | teórico=1/(p(1-p))=${teorico}`);
}
console.log('\n¿La salida siempre es ~50%? ¿Las llamadas crecen cuando p→0 o p→1?');
