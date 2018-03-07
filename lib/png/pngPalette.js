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

/**
 * Creates a PNG color palette for the specified bitmap data.
 * @param {Array} colorRanges
 */
function PngPalette(colorRanges) {
    var lookup = {};
    var colors = [];
    var hasAlphaChannel = false;

    for (var i = 0; i + 1 < colorRanges.length && colors.length <= 256; i += 2) {
        var count = colorRanges[i + 0];
        var color = colorRanges[i + 1];

        if (!count) {
            // Empty range
            continue;
        }

        if (color in lookup) {
            // Color already processed
            continue;
        }

        if (!hasAlphaChannel && colorUtils.alpha(color) < 255) {
            hasAlphaChannel = true;
        }

        lookup[color] = colors.length;
        colors.push(color);
    }

    this.hasAlphaChannel = hasAlphaChannel;
    this.colors = colors;
    this.lookup = lookup;
    this.isValid = colors.length <= 256;
}

/**
 * Specifies if the palette is valid to be used for encoding a PNG image.
 * @public
 */
PngPalette.prototype.isValid = false;

/**
 * Specifies if the palette has any partial or fully transparent
 * colors.
 * @public
 */
PngPalette.prototype.hasAlphaChannel = false;

/**
 * Array of colors in the palette.
 * @public
 */
PngPalette.prototype.colors = [];

/**
 * Lookup table from 32-bit color value to color index.
 * @public
 */
PngPalette.prototype.lookup = {};

module.exports = PngPalette;
