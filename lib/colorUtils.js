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

module.exports = {
    /**
     * Transparent color.
     * @type {number}
     * @constant
     */
    TRANSPARENT: 0,

    /**
     * Specifies a transparent color that will not blend with layers below the current layer.
     * @type {number}
     * @constant
     */
    FORCE_TRANSPARENT: Infinity,

    /**
     * Creates a color on the format 0xRRGGBBAA from the specified
     * color components.
     * @returns {number}
     */
    from: function colorUtils_from(a, r, g, b) {
        return (r << 24) | (g << 16) | (b << 8) | a;
    },

    /**
     * Gets the alpha component of a color.
     * @param {number} color  32-bit color value on the format 0xRRGGBBAA.
     * @returns {number}
     * @public
     */
    alpha: alpha,

    /**
     * Gets the red component of a color.
     * @param {number} color  32-bit color value on the format 0xRRGGBBAA.
     * @returns {number}
     * @public
     */
    red: red,

    /**
     * Gets the green component of a color.
     * @param {number} color  32-bit color value on the format 0xRRGGBBAA.
     * @returns {number}
     * @public
     */
    green: green,

    /**
     * Gets the blue component of a color.
     * @param {number} color  32-bit color value on the format 0xRRGGBBAA.
     * @returns {number}
     * @public
     */
    blue: blue,

    /**
     * Parses a value to a 32-bit color on the format 0xRRGGBBAA.
     * @param {number|String} color  The value to parse.
     * @returns {number}
     * @public
     */
    parse: parse,

    /**
     * Blends this color with another color using the over blending operation.
     * @param {number} fore  The foreground color.
     * @param {number} back  The background color.
     * @public
     */
    over: function colorUtils_over(fore, back) {
        var foreA = alpha(fore);

        if (foreA < 1) {
            return back;
        }
        else if (foreA > 254 || alpha(back) < 1) {
            return fore;
        }

        // Source: https://en.wikipedia.org/wiki/Alpha_compositing#Description
        var forePA = foreA * 255;
        var backPA = alpha(back) * (255 - foreA);
        var pa = (forePA + backPA);

        var b = Math.floor(
            (forePA * blue(fore) + backPA * blue(back)) /
            pa);

        var g = Math.floor(
            (forePA * green(fore) + backPA * green(back)) /
            pa);

        var r = Math.floor(
            (forePA * red(fore) + backPA * red(back)) /
            pa);

        var a = Math.floor(pa / 255);

        return (r << 24) | (g << 16) | (b << 8) | a;
    }
};

function alpha(color) {
    return color & 0xff;
}

function red(color) {
    return (color >>> 24);
}

function green(color) {
    return (color >>> 16) & 0xff;
}

function blue(color) {
    return (color >>> 8) & 0xff;
}

function parse(color) {
    if (typeof color == "number") {
        return color & 0xffffffff;
    }

    color = "" + color;

    if (/^#?[0-9a-fA-F]+$/.test(color)) {
        var hexColor = color; 
        if (hexColor.charAt(0) == "#") {
            hexColor = hexColor.substr(1);
        }

        var numeric = parseInt(hexColor, 16);

        switch (hexColor.length) {
            case 3:
                return (
                    ((numeric & 0xf00) << 20) |
                    ((numeric & 0xf00) << 16) |
                    ((numeric & 0x0f0) << 16) |
                    ((numeric & 0x0f0) << 12) |
                    ((numeric & 0x00f) << 12) |
                    ((numeric & 0x00f) << 8) | 
                    0xff);
            case 6:
                return numeric << 8 | 0xff;
            case 8:
                return numeric;
        }
    }

    throw new Error("Invalid color " + color);
}

