"use strict";

const EdgeTable = require("./rasterization/edgeTable");
const rasterizer = require("./rasterization/rasterizer");
const PngPalette = require("./png/pngPalette");
const PngEncoder = require("./png/pngEncoder");
const CanvasContext = require("./canvasContext");
const colorUtils = require("./colorUtils");

/**
 * Creates a new canvas with the specified dimensions given in pixels.
 * @param {number} width  Canvas width in pixels.
 * @param {number} height  Canvas height in pixels.
 * @constructor
 * @public
 */
function Canvas(width, height) {
    this.width = width;
    this.height = height;
    this._edges = new EdgeTable(width, height);
}

/**
 * The width of the canvas in pixels.
 * @type {number}
 * @public
 */
Canvas.prototype.width = 0;

/**
 * The height of the canvas in pixels.
 * @type {number}
 * @public
 */
Canvas.prototype.height = 0;

/**
 * Specifies the background color. Allowed values are:
 * - 32 bit integers on the format 0xRRGGBBAA
 * - strings on the format #RGB
 * - strings on the format #RRGGBB
 * - strings on the format #RRGGBBAA
 * @type {number}
 * @public
 */
Canvas.prototype.backColor = 0x00000000;

/**
 * Gets a context used to draw polygons on this canvas.
 * @returns {CanvasContext}
 * @public
 */
Canvas.prototype.getContext = function Canvas_getContext() {
    return new CanvasContext(this);
};

/**
 * Renders the canvas as a PNG data stream.
 * @param {Object} keywords  Keywords to be written to the PNG stream. See https://www.w3.org/TR/PNG/#11keywords.
 * @returns {Buffer}
 * @public
 */
Canvas.prototype.toPng = function Canvas_toPng(keywords) {
    var backColor = colorUtils.parse(this.backColor);
    var colorRanges = rasterizer(this._edges, backColor);

    var palette = new PngPalette(colorRanges);
    var png = new PngEncoder();

    png.writeImageHeader(this.width, this.height, palette.isValid ?
        PngEncoder.INDEXED_COLOR : PngEncoder.TRUE_COLOR_WITH_ALPHA);

    png.writeImageGamma();
    
    if (keywords) {
        for (var key in keywords) {
            png.writeTextualData(key, keywords[key]);
        }
    }

    if (palette && palette.isValid) {
        png.writePalette(palette);
        png.writeTransparency(palette);
        png.writeIndexed(colorRanges, palette, this.width, this.height);
    }
    else {
        png.writeTrueColorWithAlpha(colorRanges, this.width, this.height);
    }

    png.writeImageEnd();

    return png.getBuffer();
};

module.exports = Canvas;
