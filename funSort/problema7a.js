// ═══════════════════════════════════════════════════════
// PROBLEMA 7a: guess-sort vs bozo-sort⁺_opt
// ═══════════════════════════════════════════════════════
//
// bozo-sort⁺_opt: elige (i,j) al azar. Si par malo → swap. Si no → desperdiciado.
// guess-sort: busca par malo ANTES de swapear. Cada paso garantiza un swap útil.

function countBadPairs(arr) {
  let bad = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) bad++;
  return bad;
}

function bozoSortOptStep(arr) {
  const n = arr.length;
  const i = Math.floor(Math.random() * n);
  const j = Math.floor(Math.random() * n);
  if (i < j && arr[i] > arr[j]) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return true;
  }
  return false;
}

function guessSortStep(arr) {
  const n = arr.length;
  let comparisons = 0;
  while (true) {
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    comparisons++;
    if (i < j && arr[i] > arr[j]) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return comparisons;
    }
  }
}

const original = [8, 3, 7, 1, 5, 4, 6, 2];
const MAX_STEPS = 1000000;

function runBozo(input) {
  const arr = [...input];
  let steps = 0, swaps = 0;
  while (countBadPairs(arr) > 0 && steps < MAX_STEPS) {
    if (bozoSortOptStep(arr)) swaps++;
    steps++;
  }
  return { steps, swaps };
}

function runGuess(input) {
  const arr = [...input];
  let comparisons = 0, swaps = 0;
  while (countBadPairs(arr) > 0) {
    comparisons += guessSortStep(arr);
    swaps++;
  }
  return { comparisons, swaps };
}

const n = original.length;
const maxInversions = n * (n - 1) / 2;
let bozoTotal = { steps: 0, swaps: 0 };
let guessTotal = { comparisons: 0, swaps: 0 };

for (let t = 0; t < 100; t++) {
  const b = runBozo(original);
  const g = runGuess(original);
  bozoTotal.steps += b.steps;
  bozoTotal.swaps += b.swaps;
  guessTotal.comparisons += g.comparisons;
  guessTotal.swaps += g.swaps;
}

const avgSteps = bozoTotal.steps / 100;
const avgSwaps = bozoTotal.swaps / 100;
console.log('Comparación (promedio de 100 ensayos):');
console.log(`bozo-sort+_opt: ${avgSteps.toFixed(0)} pasos, ${avgSwaps.toFixed(0)} intercambios`);
console.log(`guess-sort:     ${(guessTotal.comparisons / 100).toFixed(0)} comparaciones, ${(guessTotal.swaps / 100).toFixed(0)} intercambios`);
console.log(`C(n,2) = ${maxInversions} — máximo de inversiones posibles`);
console.log(`\nPasos desperdiciados bozo-sort: ${(avgSteps - avgSwaps).toFixed(0)} de ${avgSteps.toFixed(0)} (${((avgSteps - avgSwaps) / avgSteps * 100).toFixed(0)}%)`);
console.log('¿Por qué guess-sort mejora? Siempre intercambia pares malos — swaps/pasos ≈ 1.');
