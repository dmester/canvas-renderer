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

/**
 * Captures the current state of a specified canvas context.
 * @param {CanvasContext} ctx  Canvas context whose state will be captured.
 * @public
 */
function canvasState_capture(ctx) {
    return {
        fillStyle: ctx.fillStyle,
        transform: ctx._transform
    };
}

/**
 * Restores the specified canvas state.
 * @param {CanvasContext} ctx  Canvas context whose state will be restored.
 * @param {CanvasState} state  State to restore.
 * @public
 */
function canvasState_restore(ctx, state) {
    ctx.fillStyle = state.fillStyle;
    ctx._transform = state.transform;
}

module.exports = {
    capture: canvasState_capture,
    restore: canvasState_restore
};
