// ═══════════════════════════════════════════════════════
// PROBLEMA 3: Hiring Problem
// ═══════════════════════════════════════════════════════
// P(Xᵢ = 1) = 1/i  →  E[contrataciones] = Hₙ ≈ ln(n)
// Best-case (1 hire): P = 1/n
// Worst-case (n hires): P = 1/n!

function hiringAlgorithm(candidates) {
  let best = -Infinity, hires = 0;
  const hired = [];
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i] > best) {
      best = candidates[i];
      hires++;
      hired.push(i);
    }
  }
  return { hires, hired };
}

const test = [3, 7, 2, 9, 1, 8, 5, 4];
const r = hiringAlgorithm(test);
console.log('Candidatos:', test.join(', '));
console.log('Contrataciones:', r.hires, '— índices:', r.hired.join(', '));
console.log('Calificaciones contratadas:', r.hired.map(i => test[i]).join(', '));

const n = 8;
const TRIALS = 100000;
const Hn = Array.from({ length: n }, (_, i) => 1 / (i + 1)).reduce((a, b) => a + b, 0);
const factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];
let totalHires = 0, bestCaseCount = 0, worstCaseCount = 0;

for (let t = 0; t < TRIALS; t++) {
  const perm = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  const result = hiringAlgorithm(perm);
  totalHires += result.hires;
  if (result.hires === 1) bestCaseCount++;
  if (result.hires === n) worstCaseCount++;
}

console.log(`\nSimulación (n=${n}, ${TRIALS} ensayos):`);
console.log(`  E[contrataciones] simulado : ${(totalHires / TRIALS).toFixed(4)}`);
console.log(`  Hₙ (valor teórico)         : ${Hn.toFixed(4)}`);
console.log(`  ln(n) ≈                    : ${Math.log(n).toFixed(4)}  (Hₙ es el exacto)`);
console.log(`\n  P(best-case) simulado : ${(bestCaseCount / TRIALS).toFixed(4)}`);
console.log(`  P(best-case) 1/n      : ${(1 / n).toFixed(4)}`);
console.log(`\n  P(worst-case) simulado : ${(worstCaseCount / TRIALS).toFixed(6)}`);
console.log(`  P(worst-case) 1/n!     : ${(1 / factorials[n]).toFixed(6)}`);
console.log(`  (1/8!=0.0000248 — con 100k ensayos pueden salir 0-5 casos)`);
