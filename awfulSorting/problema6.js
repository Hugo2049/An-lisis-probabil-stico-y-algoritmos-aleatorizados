// ═══════════════════════════════════════════════════════
// PROBLEMA 6c: Iteraciones de bogo-sort ~ Geom(1/n!)
// ═══════════════════════════════════════════════════════
//
// IDEA:
//   Cada iteración = verificar si está ordenado + (si no) hacer shuffle.
//   P(éxito por iteración) = P(shuffle produce arreglo ordenado) = 1/n!
//   Iteraciones independientes → I ~ Geom(1/n!)
//   E[I] = 1/p = n!
//   E[swaps por shuffle] = n-1 → E[swaps totales] = (n-1)·n!

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

function shuffle(arr) {
  let swaps = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    swaps++;
  }
  return swaps;
}

function bogoSortIterations(n, maxIter = 100000) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  shuffle(arr);
  let iterations = 0;
  let swaps = 0;
  while (!isSorted(arr)) {
    swaps += shuffle(arr);
    iterations++;
    if (iterations > maxIter) {
      return { iterations, swaps, timedOut: true };
    }
  }
  return { iterations, swaps, timedOut: false };
}

const n = 4;
const TRIALS = 5000;
let totalIter = 0, totalSwaps = 0, timedOut = 0;

for (let t = 0; t < TRIALS; t++) {
  const r = bogoSortIterations(n);
  if (r.timedOut) timedOut++;
  else { totalIter += r.iterations; totalSwaps += r.swaps; }
}

const validTrials = TRIALS - timedOut;
console.log(`n=${n} (n!=${factorial(n)}), ${TRIALS} ensayos:`);
console.log(`  E[iteraciones] simulado : ${(totalIter / validTrials).toFixed(2)}`);
console.log(`  E[iteraciones] teórico  : n! = ${factorial(n)}`);
console.log(`  E[swaps] simulado       : ${(totalSwaps / validTrials).toFixed(2)}`);
console.log(`  E[swaps] teórico        : (n-1)·n! = ${(n - 1) * factorial(n)}`);
if (timedOut > 0) console.log(`  Timeouts: ${timedOut}`);
console.log('\n→ El histograma de iteraciones cae exponencialmente: firma geométrica.');
