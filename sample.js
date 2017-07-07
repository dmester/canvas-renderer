"use strict";

const fs = require("fs");
const Canvas = require("./lib/canvas");

var canvas = new Canvas(100, 100);

canvas.fillColor = 0xff0000ff;
canvas.beginPath();
canvas.moveTo(10, 10);
canvas.lineTo(90, 10);
canvas.lineTo(10, 90);
canvas.fill();

canvas.fillColor = 0x0000ffff;
canvas.beginPath();
canvas.moveTo(30, 10);
canvas.lineTo(60, 10);
canvas.lineTo(60, 90);
canvas.lineTo(30, 90);
canvas.fill();

canvas.fillColor = 0x00ff00aa;
canvas.beginPath();
canvas.moveTo(10, 30);
canvas.lineTo(90, 30);
canvas.lineTo(90, 60);
canvas.lineTo(10, 60);
canvas.fill();

canvas.fillColor = 0xff0000ff;
canvas.beginPath();
canvas.moveTo(90, 90);
canvas.lineTo(90, 10);
canvas.lineTo(10, 90);
canvas.fill();

var testpng = fs.createWriteStream("C:\\output.png");
testpng.write(canvas.asPng({ "Software": "PolygonRenderer" }));
testpng.close();