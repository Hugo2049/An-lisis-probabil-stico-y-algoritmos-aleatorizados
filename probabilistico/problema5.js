// ═══════════════════════════════════════════════════════
// PROBLEMA 5: Número esperado de inversiones
// ═══════════════════════════════════════════════════════
// Xᵢⱼ = 1 si A[i]>A[j] con i<j
// P(Xᵢⱼ=1) = 1/2  (en permutación aleatoria uniforme)
// E[inversiones] = C(n,2) · 1/2 = n(n-1)/4

function countInversions(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) count++;
  return count;
}

function expectedInversions(n) {
  return n * (n - 1) / 4;
}

function verifyExperimentally(n, trials) {
  let totalInv = 0;
  for (let t = 0; t < trials; t++) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    totalInv += countInversions(arr);
  }
  return totalInv / trials;
}

console.log('Verificando E[inversiones] = n(n−1)/4:\n');
console.log('  n  | Teórico n(n-1)/4 | Simulado (10k) | ¿Coinciden?');
console.log('  ---|-----------------|----------------|------------');
for (const n of [3, 4, 5, 6, 8, 10]) {
  const teorico = expectedInversions(n);
  const simulado = verifyExperimentally(n, 10000);
  const ok = Math.abs(simulado - teorico) < 0.15 * teorico ? '✓' : '✗';
  console.log(`  ${String(n).padEnd(2)} | ${String(teorico).padEnd(16)}| ${simulado.toFixed(3).padEnd(15)}| ${ok}`);
}

console.log('\nMáximo de inversiones (arreglo invertido) = C(n,2):');
for (const n of [4, 5, 6]) {
  const reversed = Array.from({ length: n }, (_, i) => n - i);
  console.log(`  n=${n}: ${reversed.join(',')} → ${countInversions(reversed)} inversiones (max C(${n},2)=${n*(n-1)/2})`);
}
