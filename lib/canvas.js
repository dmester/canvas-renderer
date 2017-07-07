"use strict";

const Edge = require("./rasterization/edge");
const EdgeTable = require("./rasterization/edgeTable");
const rasterizer = require("./rasterization/rasterizer");
const PngPalette = require("./png/pngPalette");
const PngEncoder = require("./png/pngEncoder");
const colorUtils = require("./colorUtils");

/**
 * Creates a new canvas with the specified dimensions given in pixels.
 * @public
 */
function Canvas(width, height) {
    this.width = width;
    this.height = height;

    this._edges = new EdgeTable(width, height);
    this.beginPath();

    this._nextId = 1;
}

/**
 * The width of the canvas in pixels.
 * @public
 */
Canvas.prototype.width = 0;

/**
 * The height of the canvas in pixels.
 * @public
 */
Canvas.prototype.height = 0,

/**
 * Specifies the background color. Allowed values are:
 * - 32 bit integers on the format 0xRRGGBBAA
 * - strings on the format #RGB
 * - strings on the format #RRGGBB
 * - strings on the format #RRGGBBAA
 * @public
 */
Canvas.prototype.backColor = 0xffffffff;

/**
 * Specifies the fill color that is used when the fill method is called. Allowed values are:
 * - 32 bit integers on the format 0xRRGGBBAA
 * - strings on the format #RGB
 * - strings on the format #RRGGBB
 * - strings on the format #RRGGBBAA
 * @public
 */
Canvas.prototype.fillColor = 0x000000ff;

/**
 * Resets the internal path buffer and begins a new path.
 * @public
 */
Canvas.prototype.beginPath = function Canvas_beginPath() {
    this._paths = [[0, 0]];
};

/**
 * Begins a new subpath by moving the cursor to the specified position.
 * @param {number} x  X coordinate.
 * @param {number} y  Y coordinate.
 * @public
 */
Canvas.prototype.moveTo = function Canvas_moveTo(x, y) {
    this._paths.push([x, y]);
};

/**
 * Inserts an edge between the last and specified position.
 * @param {number} x  Target X coordinate.
 * @param {number} y  Target Y coordinate.
 * @public
 */
Canvas.prototype.lineTo = function Canvas_lineTo(x, y) {
    var path = this._paths[this._paths.length - 1];
    path.push(x);
    path.push(y);
};

/**
 * Fills the defined paths.
 * @param {string} [windingRule]  The winding rule to be used for determining
 * which areas are covered by the current path. Valid values are "evenodd" and
 * "nonzero". Default is "nonzero".
 * @public
 */
Canvas.prototype.fill = function Canvas_fill(windingRule) {
    var id = this._nextId++;
    var fillColor = colorUtils.parse(this.fillColor);

    for (var p = 0; p < this._paths.length; p++) {
        var points = this._paths[p];

        if (points.length <= 2) {
            // Nothing to fill
            continue;
        }

        for (var i = 2; i < points.length; i += 2) {
            this._edges.add(new Edge(
                id,
                points[i - 2],
                points[i - 1],
                points[i],
                points[i + 1],
                fillColor,
                windingRule));
        }

        // Close path
        if (points[0] != points[points.length - 2] ||
            points[1] != points[points.length - 1]) {
            this._edges.add(new Edge(
                id,
                points[points.length - 2],
                points[points.length - 1],
                points[0],
                points[1],
                fillColor,
                windingRule));
        }
    }
};

/**
 * Renders the canvas as a PNG data stream.
 * @param {Object} keywords  Keywords to be written to the PNG stream. See https://www.w3.org/TR/PNG/#11keywords.
 * @returns {Buffer}
 * @public
 */
Canvas.prototype.asPng = function Canvas_asPng(keywords) {
    var colorRanges = rasterizer(this._edges, this.backColor);

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
