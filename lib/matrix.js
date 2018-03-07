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
 * Creates a new transformation matrix.
 * @public
 */
function Matrix(a, b, c, d, e, f) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
    this._e = e;
    this._f = f;
}

/**
 * Gets a value determining if this matrix has skewing values.
 * @returns {Boolean}
 */
Matrix.prototype.hasSkewing = function Matrix_hasSkewing() {
    return this._b || this._c;
};

/**
 * Gets a value determining if this matrix has translation values.
 * @returns {Boolean}
 */
Matrix.prototype.hasTranslation = function Matrix_hasTranslation() {
    return this._e || this._f;
};

/**
 * Gets a value determining if this matrix has scaling values.
 * @returns {Boolean}
 */
Matrix.prototype.hasScaling = function Matrix_hasScaling() {
    return this._a !== 1 || this._d !== 1;
};

/**
 * Returns a new matrix based on the current matrix multiplied with the specified matrix values.
 * @returns {Matrix}
 */
Matrix.prototype.multiply = function Matrix_multiply(a, b, c, d, e, f) {
    return new Matrix(
        this._a * a + this._c * b,
        this._b * a + this._d * b,
        this._a * c + this._c * d,
        this._b * c + this._d * d,
        this._a * e + this._c * f + this._e,
        this._b * e + this._d * f + this._f
    );
};

/**
 * Multiplies the specified point with the current matrix and returns the resulting point.
 * @param {number} x  X coordinate.
 * @param {number} y  Y coordinate.
 * @returns {{x:number, y:number}}
 */
Matrix.prototype.multiplyPoint = function Matrix_multiply(x, y) {
    return {
        x: this._a * x + this._c * y + this._e,
        y: this._b * x + this._d * y + this._f
    };
};

/**
 * Returns a new matrix based on the current matrix with a rotation transformation applied.
 * @param {number} angle  Rotation angle in radians.
 * @returns {Matrix}
 */
Matrix.prototype.rotate = function Matrix_rotate(angle) {
    var sin = Math.sin(angle),
        cos = Math.cos(angle);
    return this.multiply(cos, sin, -sin, cos, 0, 0);
};

/**
 * Returns a new matrix based on the current matrix with a translation transformation applied.
 * @param {number} x  Horizontal move distance.
 * @param {number} y  Vertical move distance.
 * @returns {Matrix}
 */
Matrix.prototype.translate = function Matrix_translate(x, y) {
    return this.multiply(1, 0, 0, 1, x, y);
};

/**
 * Returns a new matrix based on the current matrix with a scaling transformation applied.
 * @param {number} x  Horizontal scale.
 * @param {number} y  Vertical scale.
 * @returns {Matrix}
 */
Matrix.prototype.scale = function Matrix_scale(x, y) {
    return this.multiply(x, 0, 0, y, 0, 0);
};

module.exports = Matrix;
