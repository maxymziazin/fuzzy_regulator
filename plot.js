//! Функции для отрисовки

// Оси
function drawAxes(ctx) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(20, 180);
  ctx.lineTo(380, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(30, 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(10, 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(380, 180);
  ctx.lineTo(370, 190);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(380, 180);
  ctx.lineTo(370, 170);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.font = "bold 15px Arial";

  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(56 + i * 36, 185);
    ctx.lineTo(56 + i * 36, 175);
    ctx.stroke();
    ctx.fillText((i + 1) * 10, 56 + i * 36, 200);
  }

  ctx.fillText(0, 10, 195);
  ctx.fillText(100, 380, 200);

  ctx.font = "bold 11px Arial";

  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(25, 164 - i * 16);
    ctx.lineTo(15, 164 - i * 16);
    ctx.stroke();
    ctx.fillText((i + 1) / 10, 7, 168 - i * 16);
  }

  ctx.fillText(1, 7, 26);
}

// Линейная z-образная
function drawLinearZ(ctx, start, a, b, up) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "blue";

  up = 1 - up;
  up *= ky;
  up += 20;

  start *= kx;
  a *= kx;
  b *= kx;
  start += 20;
  a += 20;
  b += 20;

  ctx.beginPath();
  ctx.moveTo(start, up);
  ctx.lineTo(a, up);
  ctx.lineTo(b, 180);
  ctx.stroke();

  ctx.setLineDash([7]);

  ctx.beginPath();
  ctx.moveTo(a, up);
  ctx.lineTo(a, 180);
  ctx.stroke();

  ctx.setLineDash([0]);
}

// Трапециевидная
function drawTrap(ctx, start, a, b, end, up) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "green";

  up = 1 - up;
  up *= ky;
  up += 20;

  a *= kx;
  b *= kx;
  start *= kx;
  end *= kx;
  start += 20;
  a += 20;
  b += 20;
  end += 20;

  ctx.beginPath();
  ctx.moveTo(start, 180);
  ctx.lineTo(a, up);
  ctx.lineTo(b, up);
  ctx.lineTo(end, 180);
  ctx.stroke();

  ctx.setLineDash([7]);

  ctx.beginPath();
  ctx.moveTo(a, up);
  ctx.lineTo(a, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(b, up);
  ctx.lineTo(b, 180);
  ctx.stroke();

  ctx.setLineDash([0]);
}

// Линейная s-образная
function drawLinearS(ctx, start, a, b, up) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "orange";

  up = 1 - up;
  up *= ky;
  up += 20;

  start *= kx;
  a *= kx;
  b *= kx;
  start += 20;
  a += 20;
  b += 20;

  ctx.beginPath();
  ctx.moveTo(start, 180);
  ctx.lineTo(a, up);
  ctx.lineTo(b, up);
  ctx.stroke();

  ctx.setLineDash([7]);

  ctx.beginPath();
  ctx.moveTo(a, up);
  ctx.lineTo(a, 180);
  ctx.stroke();

  ctx.setLineDash([0]);
}

// Входные переменные х
function drawX(ctx, x) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";

  x *= kx;
  x += 20;

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 200);
  ctx.stroke();
}

// Выходная переменная у
function drawY(ctx, y) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "green";

  y *= kx;
  y += 20;

  ctx.beginPath();
  ctx.moveTo(y, 0);
  ctx.lineTo(y, 200);
  ctx.stroke();
}

// Фигура для выходной переменной У
function drawQuadrForY(ctx, start, a, b, end, up) {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";

  up = 1 - up;
  up *= ky;
  up += 20;

  a *= kx;
  b *= kx;
  start *= kx;
  end *= kx;
  start += 20;
  a += 20;
  b += 20;
  end += 20;

  ctx.beginPath();
  ctx.moveTo(start, 180);
  ctx.lineTo(a, up);
  ctx.lineTo(b, up);
  ctx.lineTo(end, 180);
  ctx.closePath();
  ctx.stroke();

  ctx.fill();
}

// Термы
function drawTerm(ctx, x, end, up, color) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;

  up = 1 - up;
  up *= ky;
  up += 20;

  x *= kx;
  x += 20;
  end *= kx;
  end += 20;

  ctx.beginPath();
  ctx.moveTo(x, up);
  ctx.lineTo(end, up);
  ctx.stroke();
}

// Вспомогательная линия для термов
function drawLine(ctx, a, b, up, end = 180) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";

  up = 1 - up;
  up *= ky;
  up += 20;

  if (end != 180) {
    end = 1 - end;
    end *= ky;
    end += 20;
  }

  a *= kx;
  a += 20;
  b *= kx;
  b += 20;

  ctx.beginPath();
  ctx.moveTo(a, up);
  ctx.lineTo(b, end);
  ctx.stroke();
}

//! Иницализация

// Коэффициенты осей
let kx = 3.6;
let ky = 160;

let canv11 = document.getElementById("canvas11");
let ctx11 = canv11.getContext("2d");
let canv12 = document.getElementById("canvas12");
let ctx12 = canv12.getContext("2d");
let canv13 = document.getElementById("canvas13");
let ctx13 = canv13.getContext("2d");

let canv21 = document.getElementById("canvas21");
let ctx21 = canv21.getContext("2d");
let canv22 = document.getElementById("canvas22");
let ctx22 = canv22.getContext("2d");
let canv23 = document.getElementById("canvas23");
let ctx23 = canv23.getContext("2d");

let canv31 = document.getElementById("canvas31");
let ctx31 = canv31.getContext("2d");
let canv32 = document.getElementById("canvas32");
let ctx32 = canv32.getContext("2d");
let canv33 = document.getElementById("canvas33");
let ctx33 = canv33.getContext("2d");

let canvas = [
  [canv11, canv12, canv13],
  [canv21, canv22, canv23],
  [canv31, canv32, canv33],
];

let context = [
  [ctx11, ctx12, ctx13],
  [ctx21, ctx22, ctx23],
  [ctx31, ctx32, ctx33],
];

// Размер холстов
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    canvas[i][j].width = 400;
    canvas[i][j].height = 200;
  }
}

//! Рисуем функции принадлежности

drawLinearZ(context[0][0], 0, a1_ZL, b1_ZL, 1);
drawTrap(context[1][0], a1_T, b1_T, c1_T, d1_T, 1);
drawLinearS(context[2][0], a1_SL, b1_SL, 100, 1);

drawLinearZ(context[0][1], 0, a2_ZL, b2_ZL, 1);
drawLinearZ(context[1][1], 0, a2_ZL, b2_ZL, 1);
drawLinearS(context[2][1], a2_SL, b2_SL, 100, 1);

drawLinearZ(context[0][2], 0, a3_ZL, b3_ZL, 1);
drawLinearS(context[1][2], a3_SL, b3_SL, 100, 1);
drawLinearS(context[2][2], a3_SL, b3_SL, 100, 1);

drawX(context[0][0], x1);
drawX(context[1][0], x1);
drawX(context[2][0], x1);

drawX(context[0][1], x2);
drawX(context[1][1], x2);
drawX(context[2][1], x2);

//! Рисуем оси

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    drawAxes(context[i][j]);
  }
}

//! Рисуем термы

if (t1x1) {
  drawTerm(context[0][0], x1, 100, t1x1, "purple");
  drawTerm(context[0][1], 0, 100, t1x1, "purple");
  drawTerm(context[0][2], 0, 100, t1x1, "purple");

  drawLine(context[0][2], t1xMin, b3_ZL, t1);
  drawLine(context[0][2], t1xMin, 0, t1, t1);
}

if (t1x2) {
  drawTerm(context[0][1], x2, 100, t1x2, "brown");
  drawTerm(context[0][2], 0, 100, t1x2, "brown");

  drawLine(context[0][2], t1xMin, b3_ZL, t1);
  drawLine(context[0][2], t1xMin, 0, t1, t1);
}

if (t1x1 == 0 && t1x2 == 0) {
  drawLine(context[0][2], b3_ZL, 0, 0, 0);
}

if (t2x1) {
  drawTerm(context[1][0], x1, 100, t2x1, "purple");
  drawTerm(context[1][1], 0, 100, t2x1, "purple");
  drawTerm(context[1][2], 0, 100, t2x1, "purple");

  drawLine(context[1][2], t2xMax, a3_SL, t2);
  drawLine(context[1][2], t2xMax, 100, t2, t2);
}

if (t2x2) {
  drawTerm(context[1][1], x2, 100, t2x2, "brown");
  drawTerm(context[1][2], 0, 100, t2x2, "brown");

  drawLine(context[1][2], t2xMax, a3_SL, t2);
  drawLine(context[1][2], t2xMax, 100, t2, t2);
}

if (t2x1 == 0 && t2x2 == 0) {
  drawLine(context[1][2], a3_SL, 100, 0, 0);
}

if (t3x1) {
  drawTerm(context[2][0], x1, 100, t3x1, "purple");
  drawTerm(context[2][1], 0, 100, t3x1, "purple");
  drawTerm(context[2][2], 0, 100, t3x1, "purple");

  drawLine(context[2][2], t3xMin, a3_SL, t3);
  drawLine(context[2][2], t3xMin, 100, t3, t3);
}

if (t3x2) {
  drawTerm(context[2][1], x2, 100, t3x2, "brown");
  drawTerm(context[2][2], 0, 100, t3x2, "brown");

  drawLine(context[2][2], t3xMin, a3_SL, t3);
  drawLine(context[2][2], t3xMin, 100, t3, t3);
}

if (t3x1 == 0 && t3x2 == 0) {
  drawLine(context[2][2], a3_SL, 100, 0, 0);
}

//! Выходная переменная

let canvY = document.getElementById("canvasY");
let ctxY = canvY.getContext("2d");

canvY.width = 400;
canvY.height = 200;

if (xZL) {
  drawQuadrForY(ctxY, 0, 0, xZL, b3_ZL, arrResult[0][0]);
}

if (xSL) {
  drawQuadrForY(ctxY, a3_SL, xSL, 100, 100, arrResult[1][0]);
}

drawY(ctxY, y);

drawAxes(ctxY);
