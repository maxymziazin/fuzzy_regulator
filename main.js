//! Функции принадлежности

// Линейная z-образная
function f_ZL(x, up, a, b) {
  if (x <= a) {
    return up;
  } else if (x > a && x < b) {
    return (b - x) / (b - a);
  } else {
    return 0;
  }
}

// Трапециевидная
function f_T(x, up, a, b, c, d) {
  if (x <= a) {
    return 0;
  } else if (x >= a && x <= b) {
    return (x - a) / (b - a);
  } else if (x >= b && x <= c) {
    return up;
  } else if (x >= c && x <= d) {
    return (d - x) / (d - c);
  } else {
    return 0;
  }
}

// Линейная s-образная
function f_SL(x, up, a, b) {
  if (x <= a) {
    return 0;
  } else if (x > a && x < b) {
    return (x - a) / (b - a);
  } else {
    return up;
  }
}

/*
Логически:
term1: if "Температура = Низкая" and "Давление = Низкое" : "Энергия = +"
term2: if "Температура = Средняя" or "Давление = Низкое" : "Энергия = -"
term3: if "Температура = Высокая" and "Давление = Высокое" : "Энергия = -"

Математически:
term1: if x1->[0; 20] and x2->[0; 60] : y->[0; 50]
term2: if x1->[15; 65] or x2->[0; 60] : y->[40; 100]
term3: if x1->[60; 100] and x2->[40; 100] : y->[40; 100]
*/

//! Параметры

// Температура
let a1_ZL = 10;
let b1_ZL = 20;
let a1_T = 15;
let b1_T = 20;
let c1_T = 60;
let d1_T = 65;
let a1_SL = 60;
let b1_SL = 80;

// Давление
let a2_ZL = 25;
let b2_ZL = 60;
let a2_SL = 40;
let b2_SL = 80;

// Энергия
let a3_ZL = 30;
let b3_ZL = 50;
let a3_SL = 40;
let b3_SL = 70;

// let x1 = 18; // температура на вход
// let x2 = 50; // давление на вход

let x1 = +localStorage.getItem("key1"); // температура на вход
let x2 = +localStorage.getItem("key2"); // давление на вход

//! Проверка термов:

// term1:

let t1x1 = f_ZL(x1, 1, a1_ZL, b1_ZL);
let t1x2 = f_ZL(x2, 1, a2_ZL, b2_ZL);

let t1x1xZL = b3_ZL - t1x1 * (b3_ZL - a3_ZL);
let t1x2xZL = b3_ZL - t1x2 * (b3_ZL - a3_ZL);

let t1xMin = Math.max(t1x1xZL, t1x2xZL);
let t1 = Math.min(t1x1, t1x2);

// term2:

let t2x1 = f_T(x1, 1, a1_T, b1_T, c1_T, d1_T);
let t2x2 = f_ZL(x2, 1, a2_ZL, b2_ZL);

let t2x1xSL = t2x1 * (b3_SL - a3_SL) + a3_SL;
let t2x2xSL = t2x2 * (b3_SL - a3_SL) + a3_SL;

let t2xMax = Math.max(t2x1xSL, t2x2xSL);
let t2 = Math.max(t2x1, t2x2);

// term3:

let t3x1 = f_SL(x1, 1, a1_SL, b1_SL);
let t3x2 = f_SL(x2, 1, a2_SL, b2_SL);

let t3x1xSL = t3x1 * (b3_SL - a3_SL) + a3_SL;
let t3x2xSL = t3x2 * (b3_SL - a3_SL) + a3_SL;

let t3xMin = Math.min(t3x1xSL, t3x2xSL);
let t3 = Math.min(t3x1, t3x2);

//! Срезы для функций принадлежности энергии

let arrResult = [[t1], [t2, t3]];
arrResult = [[Math.max(...arrResult[0])], [Math.max(...arrResult[1])]];

let xZL = b3_ZL - arrResult[0][0] * (b3_ZL - a3_ZL); // пересечение с первой функцией
let xSL = arrResult[1][0] * (b3_SL - a3_SL) + a3_SL; // пересечение со второй функцией

//! Нахождение центров тяжести

let start = 0;
let end = 100;
let h = 0.01; // <= 1
let r = Math.abs(Math.log10(h));
let n = (end - start) / h + 1;
let x = [];

for (let i = 0; i < n; i++) {
  x[i] = (i * h).toFixed(r);
}

let fi1 = 0;
let fi2 = 0;
let psi1 = 0;
let psi2 = 0;

for (let i = 0; i < n; i++) {
  fi1 += x[i] * f_ZL(x[i], arrResult[0][0], xZL, b3_ZL);
  fi2 += x[i] * f_SL(x[i], arrResult[1][0], a3_SL, xSL);
  psi1 += f_ZL(x[i], arrResult[0][0], xZL, b3_ZL);
  psi2 += f_SL(x[i], arrResult[1][0], a3_SL, xSL);
}

let c1;
let c2;
let y;

if (fi1 === 0 || psi1 === 0) {
  c1 = 0;
} else {
  c1 = fi1 / psi1;
}

if (fi2 === 0 || psi2 === 0) {
  c2 = 0;
} else {
  c2 = fi2 / psi2;
}

if (c1 === 0 && c2 === 0) {
  y = 0;
} else {
  y = (psi1 * c1 + psi2 * c2) / (psi1 + psi2);
  // y = (fi1 + fi2) / (psi1 + psi2);
}

console.log(`y = ${y}`);

localStorage.setItem("key3", y);
