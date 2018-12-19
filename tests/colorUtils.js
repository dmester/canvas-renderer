"use strict";

var tap = require("tap");
var colorUtils = require("../lib/colorUtils");

tap.equal(255, colorUtils.red(0xff000000));
tap.equal(255, colorUtils.red(0xff000000 & 0xffffffff)); // converted to 32-bit signed int
tap.equal(255, colorUtils.green(0x00ff0000));
tap.equal(255, colorUtils.blue(0x0000ff00));
tap.equal(255, colorUtils.alpha(0x000000ff));

function assertParsed(expected, value) {
    const SIGNED_MAX_VALUE = 2147483647;
    const SIGNED_MIN_VALUE = -2147483648;

    var actual = colorUtils.parse(value);
    var actualFormatted = colorUtils.format(actual);

    tap.assert(
        actual >= SIGNED_MIN_VALUE &&
        actual <= SIGNED_MAX_VALUE, 
        `${value} was parsed as ${actual}, which is not a 32-bit signed integer.`);
    
    tap.equal(
        expected, actualFormatted, 
        `${value} was parsed as ${actualFormatted} instead of ${expected}.`);
}

assertParsed("#fedcbaef", 0xfedcbaef);
assertParsed("#00000000", 0);
assertParsed("#00000000", "transparent");
assertParsed("#66cdaaff", "mediumaquaMarine");
assertParsed("#e0ffffff", "lightcyan");
assertParsed("#aabbccdd", "#abcd");
assertParsed("#abcdef21", "#abcdef21");
assertParsed("#aabbccff", "#abc");
assertParsed("#aabbccff", "#aabbcc");
assertParsed("#fffefdff", "rgb(255, 254, 253)");
assertParsed("#ff7f00ff", "rgb(100%, 50%, 0%)");
assertParsed("#fffefd7f", "rgb(255, 254, 253, 0.5)");
assertParsed("#fffefd7f", "rgba(255, 254, 253, 0.5)");
assertParsed("#adcbaeff", "hsl(123, 23%, 74% )");
assertParsed("#adcbaeff", "hsl(123deg, 23%, 74% )");
assertParsed("#adcbaeff", "hsl(123.000001deg, 23%, 74% )");
assertParsed("#adcbae7f", "hsl(123.000001deg, 23%, 74% , 0.5)");
assertParsed("#adcbae7f", "hsla(123.000001deg, 23%, 74% , 0.5)");
assertParsed("#bcbcbcff", "hsl(123, 0%, 74% )");
assertParsed("#000000ff", "hsl(123deg, 23%, 0% )");
assertParsed("#ffffffff", "hsl(123.000001deg, 23%, 100% )");
assertParsed("#adcbaeff", "hsl(2.146755rad, 23%, 74% )");
assertParsed("#adcbaeff", "hsl(0.3416667turn, 23%, 74% )");
assertParsed("#adcbaeff", "hsl(136.66667grad, 23%, 74% )");
assertParsed("#00bfffff", "hwb(195, 0%, 0%)");
assertParsed("#00bfffb2", "hwb(195, 0%, 0%, 0.7)");
assertParsed("#bfbfe5b2", "hwb(239.0000deg, 75%, 10%, 0.7)");
assertParsed("#9c9c9cff", "hwb(5, 91%, 57%)");
assertParsed("#000000ff", "hwb(5, 0%, 100%)");
assertParsed("#ffffffff", "hwb(5, 100%, 0%)");
