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
