
const Canvas = require("./lib/canvas");

module.exports = {
    /**
     * Creates a new canvas.
     * @param {number} width  Width of the canvas in pixels.
     * @param {number} heigt  Height of the canvas in pixels.
     * @returns {Canvas}
     */
    createCanvas: function (width, height) {
        return new Canvas(width, height);
    }
};
