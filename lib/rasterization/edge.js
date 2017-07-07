"use strict";

function Edge(polygonId, x0, y0, x1, y1, color, windingRule) {
    this.polygonId = polygonId;
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
    this.color = color;
    this.windingRule = windingRule;
}

Edge.prototype.intersection = function intersection(y)
{
    var dx = (this.x1 - this.x0) * (this.y0 - y) / (this.y0 - this.y1);
    return this.x0 + dx;
};

module.exports = Edge;

