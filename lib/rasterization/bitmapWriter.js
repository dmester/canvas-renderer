"use strict";

const colorUtils = require("../colorUtils");

function BitmapWriter(backColor, width, height) {
    this.backColor = backColor;
    this.canvas = [];
}

BitmapWriter.prototype.write = function write(color, count) {
    if (count > 0) {
        this.canvas.push(count);
        this.canvas.push(colorUtils.over(color, this.backColor));
    }
};

BitmapWriter.prototype.skip = function skip(count) {
    if (count > 0) {
        this.canvas.push(count);
        this.canvas.push(this.backColor);
    }
};

module.exports = BitmapWriter;
