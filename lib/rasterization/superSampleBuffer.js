/**
 * canvas-renderer
 * https://github.com/dmester/canvas-renderer
 * 
 * Copyright (c) 2017-2018 Daniel Mester Pirttijärvi
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 
 * 3. This notice may not be removed or altered from any source distribution.
 */
 
"use strict";

const colorUtils = require("../colorUtils");

const IDX_COUNT = 0;
const IDX_NON_EMPTY_COUNT = 1;
const IDX_A = 2;
const IDX_R = 3;
const IDX_G = 4;
const IDX_B = 5;

/**
 * Creates a color buffer keeping an average color out of several
 * color samples per pixel.
 * @param {number} width  Width of the buffer in pixels.
 * @param {number} samplesPerPixel  Number of samples to keep per pixel.
 * @public
 */
function SuperSampleBuffer(width, samplesPerPixel) {
    this._samples = new Uint16Array(width * 6);
    this._samplesPerPixel = samplesPerPixel;

    this._pixelOffset = 0;
    this._subPixelOffset = 0;
}

/**
 * Adds a color to the current pixel in the buffer.
 * @param {number} count  Number of samples of the color to be added to the buffer.
 * @private
 */
SuperSampleBuffer.prototype._add = function SuperSampleBuffer_add(count, a, r, g, b) {
    this._samples[this._pixelOffset * 6 + IDX_COUNT] += count;

    if (a > 0) {
        this._samples[this._pixelOffset * 6 + IDX_A] += a * count;
        this._samples[this._pixelOffset * 6 + IDX_R] += r * count;
        this._samples[this._pixelOffset * 6 + IDX_G] += g * count;
        this._samples[this._pixelOffset * 6 + IDX_B] += b * count;
        this._samples[this._pixelOffset * 6 + IDX_NON_EMPTY_COUNT] += count;
    }
};

/**
 * Rewinds the cursor to the beginning of the buffer.
 * @public
 */
SuperSampleBuffer.prototype.rewind = function SuperSampleBuffer_rewind() {
    this._pixelOffset = 0;
    this._subPixelOffset = 0;
};

/**
 * Clears the samples in this buffer.
 * @public
 */
SuperSampleBuffer.prototype.clear = function SuperSampleBuffer_clear() {
    this._pixelOffset = 0;
    this._subPixelOffset = 0;

    this._samples.fill(0);
};

/**
 * Writes the average color of each pixel to a specified BitmapWriter.
 * @param {BitmapWriter} bitmapWriter  The average colors will be written to this BitmapWriter.
 * @param {number} count  Number of pixels to write.
 * @public
 */
SuperSampleBuffer.prototype.writeTo = function SuperSampleBuffer_writeTo(bitmapWriter, count) {
    for (var i = 0; i < count; i++) {
        var nonEmptyCount = this._samples[i * 6 + IDX_NON_EMPTY_COUNT];
        var color = nonEmptyCount == 0 ? 0 :
            colorUtils.from(
                Math.floor(this._samples[i * 6 + IDX_A] / this._samples[i * 6 + IDX_COUNT]),
                Math.floor(this._samples[i * 6 + IDX_R] / nonEmptyCount),
                Math.floor(this._samples[i * 6 + IDX_G] / nonEmptyCount),
                Math.floor(this._samples[i * 6 + IDX_B] / nonEmptyCount)
            );
        bitmapWriter.write(color, 1);
    }
};

/**
 * Adds a color to the buffer up until the specified x index.
 * @param {number} color  Color to write.
 * @param {number} untilX  Samples of the color will be added the buffer until
 * the cursor reaches this coordinate.
 * @public
 */
SuperSampleBuffer.prototype.add = function SuperSampleBuffer_add(color, untilX) {
    var samplesLeft = Math.floor(untilX * this._samplesPerPixel) - this._subPixelOffset - this._pixelOffset * this._samplesPerPixel;

    var a = colorUtils.alpha(color);
    var r = colorUtils.red(color);
    var g = colorUtils.green(color);
    var b = colorUtils.blue(color);
    
    // First partial pixel
    if (this._subPixelOffset > 0) {
        var samples = this._samplesPerPixel - this._subPixelOffset;
        if (samples > samplesLeft) {
            samples = samplesLeft;
        }
        samplesLeft -= samples;

        this._add(samples, a, r, g, b);

        this._subPixelOffset += samples;
        if (this._subPixelOffset == this._samplesPerPixel) {
            this._subPixelOffset = 0;
            this._pixelOffset++;
        }
    }

    // Full pixels
    var fullPixels = Math.floor(samplesLeft / this._samplesPerPixel);
    if (fullPixels > 0) {
        for (var i = 0; i < fullPixels; i++) {
            this._add(this._samplesPerPixel, a, r, g, b);
            this._pixelOffset++;
        }

        samplesLeft -= fullPixels * this._samplesPerPixel;
    }

    // Last partial pixel
    if (samplesLeft > 0) {
        this._add(samplesLeft, a, r, g, b);

        this._subPixelOffset += samplesLeft;

        if (this._subPixelOffset == this._samplesPerPixel) {
            this._subPixelOffset = 0;
            this._pixelOffset++;
        }
    }
};

module.exports = SuperSampleBuffer;
