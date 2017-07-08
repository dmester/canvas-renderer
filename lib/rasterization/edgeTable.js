"use strict";

/**
 * Keeps a list of edges per scanline.
 * @param {number} width  Clipping width.
 * @param {number} height  Clipping height.
 * @public
 */
function EdgeTable(width, height) {
    this.width = width;
    this.height = height;
    this.clear();
}

/**
 * Sorts the edges of each scanline in ascending x coordinates.
 * @public
 */
EdgeTable.prototype.clear = function EdgeTable_clear() {
    this.scanlines = [];
    this.scanlines.length = this.height;
    this.nextId = 1;
};

/**
 * Adds an edge to the table.
 * @param {Edge} edge
 * @public
 */
EdgeTable.prototype.add = function EdgeTable_add(edge) {
    var minY, maxY;

    if (edge.y0 == edge.y1) {
        // Skip horizontal lines
        return;
    }
    else if (edge.y0 < edge.y1) {
        minY = Math.floor(edge.y0);
        maxY = Math.floor(edge.y1 + 0.996 /* 1/255 */);
    }
    else {
        minY = Math.floor(edge.y1);
        maxY = Math.floor(edge.y0 + 0.996 /* 1/255 */);
    }

    if (maxY < 0 || minY >= this.scanlines.length) {
        return;
    }

    if (minY < 0) {
        minY = 0;
    }
    if (maxY > this.scanlines.length) {
        maxY = this.scanlines.length;
    }

    if (minY < maxY) {
        var y = minY;
        var x1 = edge.intersection(y);

        while (y < maxY) {
            var x2 = edge.intersection(y + 1);

            var fromX, width;
            if (x1 < x2) {
                fromX = Math.floor(x1);
                width = Math.floor(x2 + 0.9999) - fromX;
            }
            else {
                fromX = Math.floor(x2);
                width = Math.floor(x1 + 0.9999) - fromX;
            }

            if (fromX < 0) {
                width += fromX;
                fromX = 0;

                if (width < 0) {
                    width = 0;
                }
            }

            if (fromX < this.width) {
                var scanline = this.scanlines[y];
                if (scanline == null) {
                    this.scanlines[y] = scanline = [];
                }
                scanline.push({
                    fromX: fromX,
                    width: width,
                    edge: edge
                });
            }

            x1 = x2;
            y++;
        }
    }
};

/**
 * Sorts the edges of each scanline in ascending x coordinates.
 * @public
 */
EdgeTable.prototype.sort = function EdgeTable_sort() {
    for (var i = 0; i < this.scanlines.length; i++) {
        var arr = this.scanlines[i];
        if (arr) {
            arr.sort(function (x, y) {
                if (x.fromX < y.fromX) {
                    return -1;
                }
                if (x.fromX > y.fromX) {
                    return 1;
                }
                return 0;
            });
        }
    }
};

module.exports = EdgeTable;
