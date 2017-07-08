"use strict";

const BitmapWriter = require("./bitmapWriter");
const LayerManager = require("./layerManager");
const SuperSampleBuffer = require("./superSampleBuffer");

/**
 * A higher number of samples per pixel horizontally does not affect the
 * performance in the same way as SAMPLES_PER_PIXEL_Y, since the rasterizer
 * does not scan every subpixel horizontally.
 */
const SAMPLES_PER_PIXEL_X = 10;

/**
 * A higher number of samples vertically means lower performance, since
 * the rasterizer does a scan for every subpixel vertically.
 */
const SAMPLES_PER_PIXEL_Y = 4;

const SAMPLE_HEIGHT = 1 / SAMPLES_PER_PIXEL_Y;


module.exports = rasterize;


/**
 * Rasterizes the edges in the edge table to a list of color ranges. No range will span
 * multiple scanlines.
 * @param {EdgeTable} edgeTable 
 * @param {number} backColor
 */
function rasterize(edgeTable, backColor) {
    edgeTable.sort();

    var writer = new BitmapWriter(backColor, edgeTable.width, edgeTable.height);
    var superSampleBuffer = new SuperSampleBuffer(edgeTable.width, SAMPLES_PER_PIXEL_X);

    var layers = [];
    var color = 0;

    for (var i = 0; i < SAMPLES_PER_PIXEL_Y; i++) {
        layers[i] = new LayerManager();
    }

    for (var ey = 0; ey < edgeTable.height; ey++) {
        var scanline = edgeTable.scanlines[ey];
        if (!scanline || !scanline.length) {
            writer.skip(edgeTable.width);
            continue;
        }
        
        for (var i = 0; i < layers.length; i++) {
            layers[i].clear();
        }

        var superSampleRanges = getSuperSampleRanges(scanline, edgeTable.width);

        writer.skip(superSampleRanges[0].fromX);

        for (var rangeIndex = 0; rangeIndex < superSampleRanges.length; rangeIndex++) {
            var superSampleRange = superSampleRanges[rangeIndex];

            var y = ey + SAMPLE_HEIGHT / 2;

            for (var sy = 0; sy < SAMPLES_PER_PIXEL_Y; sy++ , y += SAMPLE_HEIGHT) {
                var subScanlineLayers = layers[sy];
                color = subScanlineLayers.color;

                var intersections = getIntersections(superSampleRange.edges, y);

                for (var i = 0; i < intersections.length; i++) {
                    var intersection = intersections[i];
                    superSampleBuffer.add(color, intersection.x - superSampleRange.fromX);
                    subScanlineLayers.add(intersection.edge);
                    color = subScanlineLayers.color;
                }

                superSampleBuffer.add(color, superSampleRange.width);
                superSampleBuffer.rewind();
            } // /subpixel

            // Blend subpixels
            superSampleBuffer.writeTo(writer, superSampleRange.width);
            superSampleBuffer.clear();

            // Forward last color
            if (rangeIndex + 1 < superSampleRanges.length) {
                var nextRangeX = superSampleRanges[rangeIndex + 1].fromX;
                writer.write(color, nextRangeX - superSampleRange.toXExcl);
            }
            else {
                writer.write(color, edgeTable.width - superSampleRange.toXExcl);
            }
        } // /range
    }

    return writer.canvas;
}

/**
 * Determines what edges that intersect a horizontal line with the specified y coordinate.
 * For each intersecting edge the intersecting x coordinate is returned.
 * @param {Array} scanline  Array of edges in the current scanline.
 * @returns {Array} Array with objects like { x: number, edge: Edge }. Objects
 * are sorted ascending by x coordinate.
 */
function getIntersections(edges, y) {
    var intersections = [];

    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];

        if (edge.y0 < y && edge.y1 >= y ||
            edge.y0 >= y && edge.y1 < y) {
            var x = edge.x0 +
                (edge.x1 - edge.x0) * (y - edge.y0) /
                (edge.y1 - edge.y0);

            intersections.push({
                edge: edge,
                x: x
            });
        }
    }

    intersections.sort(function (a, b) {
        return a.x - b.x;
    });

    return intersections;
}

/**
 * Determines what ranges of a scanline that needs to be supersampled.
 * @param {Array} scanline  Array of edges in the current scanline.
 * @returns {Array}  Array of ranges like { fromX: number, toXExcl: number, edges: Edge[] }
 */
function getSuperSampleRanges(scanline, width) {
    var superSampleRanges = [];

    const ALLOWED_RANGE_DISTANCE = 1;
    var rangeIndex = 0;
    var superSampleRangeIndex = 0;

    while (rangeIndex < scanline.length) {
        var superSampleRange = {
            fromX: scanline[rangeIndex].fromX,
            toXExcl: scanline[rangeIndex].fromX + scanline[rangeIndex].width,
            edges: [scanline[rangeIndex].edge]
        };

        if (superSampleRange.fromX >= width) {
            break;
        }

        superSampleRanges.push(superSampleRange);

        rangeIndex++;

        for (var i = rangeIndex; i < scanline.length; i++) {
            if (scanline[i].fromX <= superSampleRange.toXExcl + ALLOWED_RANGE_DISTANCE) {
                superSampleRange.toXExcl = Math.max(superSampleRange.toXExcl, scanline[i].fromX + scanline[i].width);
                superSampleRange.edges.push(scanline[i].edge);
                rangeIndex++;
            }
            else {
                break;
            }
        }

        superSampleRange.toXExcl = Math.min(superSampleRange.toXExcl, width);
        superSampleRange.width = superSampleRange.toXExcl - superSampleRange.fromX;
    }

    return superSampleRanges;
}


