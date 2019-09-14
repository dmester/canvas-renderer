import { Canvas, CanvasContext, createCanvas } from "../../";

// The following code is for testing typings only. It does not produce any sensible output.

// Canvas
const canvas: Canvas = createCanvas(100, 100);
canvas.width = 100;
canvas.height = 100;
canvas.backColor = "#fff";
canvas.backColor = 0xffffffff;

// Context
const ctx: CanvasContext = canvas.getContext("2d", {});
const ctx2: CanvasContext = canvas.getContext("2d");
const ctx3: CanvasContext = canvas.getContext();

// State management
ctx.save();
ctx.restore();

// Transforms
ctx.resetTransform();
ctx.rotate(52);
ctx.scale(1.5, 1.5);
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.transform(1, 0, 0, 1, 0, 0);
ctx.translate(10, 10);

// Drawing
ctx.fillStyle = 0xffffffff;
ctx.fillStyle = "#0000ff";
ctx.beginPath();
ctx.moveTo(90, 90);
ctx.lineTo(90, 50);
ctx.arc(50, 50, 50, 0, Math.PI);
ctx.closePath();
ctx.fill();
ctx.fill("evenodd");
ctx.fill("nonzero");
ctx.fillRect(0, 0, 10, 10);
ctx.clearRect(0, 0, 20, 20);

// Export
const dataUri1: string = canvas.toDataURL();
const dataUri2: string = canvas.toDataURL("image/png");
const dataUri3: string = canvas.toDataURL("image/png", 0.92);
const pngWithoutKeywords: Buffer = canvas.toPng();
const pngWithKeywords: Buffer = canvas.toPng({ "Software": "canvas-renderer 1.0" });
