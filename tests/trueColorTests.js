﻿/**
 * canvas-renderer
 * https://github.com/dmester/canvas-renderer
 * 
 * Copyright (c) 2017-2018 Daniel Mester Pirttijärvi
 *
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the 
 * "Software"), to deal in the Software without restriction, including 
 * without limitation the rights to use, copy, modify, merge, publish, 
 * distribute, sublicense, and/or sell copies of the Software, and to 
 * permit persons to whom the Software is furnished to do so, subject to 
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
"use strict";


/**
 * canvas-renderer will use a palette when possible. To force it to produce
 * a truecolor PNG we need to ensure the image contains more than 256 colors.
 * This is done by rendering large circles, leading to a lot of different
 * colors.
 *
 * A mix of light and dark colors are used to ensure we test colors that
 * are represented as integers where the sign bit is set and unset.
 */

const fs = require("fs");
const tap = require("tap");
const canvasRenderer = require("../index");
require("./pngAssert")(tap);

var canvas = canvasRenderer.createCanvas(1000, 1000);
canvas.backColor = "#abcdefff";

var ctx = canvas.getContext("2d");

var radius = 250;

ctx.beginPath();
ctx.fillStyle = "#ffffffff";
ctx.moveTo(100 + radius, 250 + radius);
ctx.arc(100 + radius, 250 + radius, radius, 0, Math.PI * 2, true); // last argument should have no effect
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "#000000ff";
ctx.moveTo(400 + radius, 250 + radius);
ctx.arc(400 + radius, 250 + radius, radius, 0, Math.PI * 2, false); // last argument should have no effect
ctx.closePath();
ctx.fill();

var wanted = fs.readFileSync(__dirname + "/expected-truecolor.png");
tap.equalPng(canvas.toPng(), wanted);