"use strict";

const fs = require("fs");
const canvasRenderer = require("./index");

var canvas = canvasRenderer.createCanvas(100, 100);
canvas.backColor = "#00000000";

var ctx = canvas.getContext("2d");
ctx.fillStyle = "#f00";

ctx.rotate(0.1);

ctx.beginPath();
ctx.lineTo(10, 10);
ctx.arc(50, 50, 30, -3 * Math.PI / 4, -1 * Math.PI / 4, true);
ctx.lineTo(90, 10);
ctx.closePath();

ctx.fill();

ctx.fillStyle = "#f00";
ctx.fillRect(80, 80, 20, 20);

ctx.translate(0, 5);

ctx.lineTo(90, 90);
ctx.lineTo(10, 90);
ctx.lineTo(10, 30);

ctx.fillStyle = "#0000ff";
ctx.fill();

ctx.clearRect(30, 30, 20, 20);

var testpng = fs.createWriteStream("M:\\output1704.png");
testpng.write(canvas.toPng({ "Software": "CanvasRenderer" }));
testpng.close();

