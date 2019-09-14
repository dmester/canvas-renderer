import * as canvasRenderer from "../../";

// The following code is for testing typings only. It does not produce any sensible output.

const canvas: canvasRenderer.Canvas = canvasRenderer.createCanvas(100, 100);
const ctx: canvasRenderer.CanvasContext = canvas.getContext("2d", {});