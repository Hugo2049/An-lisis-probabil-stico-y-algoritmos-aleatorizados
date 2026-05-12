// ═══════════════════════════════════════════════════════
// PROBLEMA 7b: Fun-Sort
// ═══════════════════════════════════════════════════════
//
// Insertion sort donde la posición de inserción se encuentra
// con binary search sobre el prefijo ya ordenado.
//
// Comparaciones: O(n log n)
// Swaps:         O(n + F)  donde F = inversiones iniciales
//
// Teorema 6: Fun-Sort supera a merge-sort cuando F = o(n²/log n)

function funSort(input) {
    const a = [...input];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 1; i < n; i++) {
        const x = a[i];
        let lo = 0, hi = i;

        // Binary search en el prefijo ordenado a[0..i-1]
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            comparisons++;
            if (x < a[mid]) hi = mid;
            else lo = mid + 1;
        }

        // Desplaza e inserta
        for (let j = i; j > lo; j--) {
            a[j] = a[j - 1];
            swaps++;
        }
        a[lo] = x;
    }

    return { sorted: a, comparisons, swaps };
}

function countInversions(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++)
            if (arr[i] > arr[j]) inv++;
    return inv;
}

const tests = [
    { arr: [3, 1, 4, 1, 5, 9, 2, 6], label: 'aleatorio' },
    { arr: [1, 2, 3, 4, 5, 6, 7, 8], label: 'ya ordenado (F=0)' },
    { arr: [8, 7, 6, 5, 4, 3, 2, 1], label: 'invertido (F=C(n,2))' },
];

console.log('Verificando Fun-Sort:\n');
for (const { arr, label } of tests) {
    const F = countInversions(arr);
    const result = funSort(arr);
    const n = arr.length;
    const bound = (n + F) * Math.log2(n);
    console.log(`[${label}]`);
    console.log(`  Input:    [${arr}]`);
    console.log(`  Ordenado: [${result.sorted}]`);
    console.log(`  F=${F}, comparaciones=${result.comparisons}, swaps=${result.swaps}`);
    console.log(`  Cota O((n+F)logn)=${bound.toFixed(0)}, comparaciones ≤ cota: ${result.comparisons <= bound ? '✓' : '✗'}`);
    console.log('');
}

// Análisis Teorema 6
const n = 8;
let totalF = 0;
for (let t = 0; t < 10000; t++) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    totalF += countInversions(arr);
}
const umbral = n * n / Math.log2(n);
console.log(`Umbral del Teorema 6 para n=${n}:`);
console.log(`  Umbral n²/log₂(n)     = ${umbral.toFixed(2)}`);
console.log(`  E[F] teórico n(n-1)/4 = ${n * (n - 1) / 4}`);
console.log(`  E[F] simulado         = ${(totalF / 10000).toFixed(2)}`);
console.log(`  E[F] < umbral: ${(totalF / 10000) < umbral ? '✓ Fun-Sort gana en promedio' : '✗'}`);
