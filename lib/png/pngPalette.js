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
