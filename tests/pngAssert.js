/**
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
 * This module will extend tap with the assert 
 * tap.equalPng(found : Buffer, wanted : Buffer, msg, extra)
 */

const pngjs = require("pngjs");

function createDataUri(buffer) {
    return "data:image/png;base64," + buffer.toString("base64");
}

function formatPixel(data, i) {
    i -= i % 4;
    return `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3]})`;
}

function register(tap) {
    tap.Test.prototype.addAssert("equalPng", 2, function (found, wanted, message, extra) {
        message = message || "PNG should be equal";

        var foundPng = pngjs.PNG.sync.read(found);
        var wantedPng = pngjs.PNG.sync.read(wanted);
        
        if (foundPng.width != wantedPng.width ||
            foundPng.height != wantedPng.height ||
            foundPng.data.length != wantedPng.data.length
        ) {
            extra.found = createDataUri(found);
            extra.wanted = createDataUri(wanted);
            return this.fail(message, extra);
        }

        for (var i = 0; i < foundPng.data.length; i++) {
            // Allow some difference due to rounding errors
            if (Math.abs(foundPng.data[i] - wantedPng.data[i]) > 2) {
                extra.found = createDataUri(found);
                extra.wanted = createDataUri(wanted);

                var x = i % foundPng.width;
                var y = (i / foundPng.width) | 0;

                extra.foundPixel = formatPixel(foundPng.data, i);
                extra.wantedPixel = formatPixel(wantedPng.data, i);
                extra.note = `Difference at pixel { x: ${x}, y: ${y} }.`;

                return this.fail(message, extra);
            }
        }

        return this.pass(message, extra);
    })
}

module.exports = register;
