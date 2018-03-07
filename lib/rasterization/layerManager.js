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
 * Keeps track of the z-order of the currently rendered polygons,
 * and computes the final color from the stack of layers.
 * @public
 */
function LayerManager() {
    this._layers = [];
}

/**
 * The current visible color.
 * @public
 */
LayerManager.prototype.color = colorUtils.TRANSPARENT;

/**
 * Clears the stack of layers.
 * @public
 */
LayerManager.prototype.clear = function LayerManager_clear() {
    this._layers = [];
    this.color = colorUtils.TRANSPARENT;
};

/**
 * Adds a layer for the specified edge. The z-order is defined by its id.
 * @param {Edge} edge
 * @public
 */
LayerManager.prototype.add = function LayerManager_add(edge) {
    var dwinding = edge.y0 < edge.y1 ? 1 : -1;

    var inserted = false;
    for (var i = this._layers.length - 1; i >= 0; i--) {
        if (this._layers[i].polygonId == edge.polygonId) {
            this._layers[i].winding += dwinding;

            if (!this._layers[i].inPath()) {
                this._layers.splice(i, 1);
            }

            inserted = true;
            break;
        }
        else if (this._layers[i].polygonId < edge.polygonId) {
            // Insert here
            this._layers.splice(i + 1, 0, {
                polygonId: edge.polygonId,
                color: edge.color,
                winding: dwinding,
                inPath: edge.windingRule == "evenodd" ? inPath_evenOdd : inPath_nonZero
            });

            inserted = true;
            break;
        }
    }

    if (!inserted) {
        this._layers.splice(0, 0, {
            polygonId: edge.polygonId,
            color: edge.color,
            winding: dwinding,
            inPath: edge.windingRule == "evenodd" ? inPath_evenOdd : inPath_nonZero
        });
    }

    // Update current color
    var color = colorUtils.TRANSPARENT;
    for (var i = this._layers.length - 1; i >= 0 && colorUtils.alpha(color) < 255; i--) {
        var layerColor = this._layers[i].color;
        if (layerColor === colorUtils.FORCE_TRANSPARENT) {
            break;
        }

        color = colorUtils.over(color, layerColor);
    }
    this.color = color;
};

module.exports = LayerManager;


// Defines the winding rules

function inPath_evenOdd() {
    return this.winding % 2 == 1;
}
function inPath_nonZero() {
    return this.winding != 0;
}

