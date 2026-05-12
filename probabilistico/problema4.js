// ═══════════════════════════════════════════════════════
// PROBLEMA 4: Suma esperada de n dados con indicadoras
// ═══════════════════════════════════════════════════════
// E[Xᵢ] = (1+2+3+4+5+6)/6 = 3.5
// E[X] = n · 3.5  (linealidad de la esperanza)

function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function expectedSum(n) {
  const E_dado = (1 + 2 + 3 + 4 + 5 + 6) / 6;
  return n * E_dado;
}

function simularNDados(n, trials) {
  let total = 0;
  for (let t = 0; t < trials; t++) {
    let suma = 0;
    for (let i = 0; i < n; i++) suma += lanzarDado();
    total += suma;
  }
  return total / trials;
}

console.log('Verificando E[suma] = 3.5·n:\n');
for (const n of [1, 2, 5, 10, 20, 100]) {
  const teorico = expectedSum(n);
  const simulado = simularNDados(n, 20000);
  console.log(`n=${String(n).padStart(3)}: teórico=${teorico.toFixed(1).padStart(6)}, simulado=${simulado.toFixed(3).padStart(8)}`);
}
console.log('\nPoder de la linealidad:');
console.log('E[X₁+X₂] = E[X₁]+E[X₂] = 3.5+3.5 = 7');
console.log('Funciona SIN importar si las variables son independientes o no.');
