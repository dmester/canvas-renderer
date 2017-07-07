# polygon-renderer
JavaScript library for encoding polygons as PNG on Node.js.
* Renders polygons as PNG with no native dependencies like PhantomJS.
* It does not run in the browser.
* It is not an attempt to implement a complete vector graphics 
  rendering library. More features probably won't be implemented.

## Sample
Install the polygon-renderer NPM package.

```
npm install polygon-renderer
```

The following example renders two triangles to C:\test.png.

```js
const fs = require("fs");
const Canvas = require("./lib/canvas");

var canvas = new Canvas(100, 100);

canvas.fillColor = 0xff0000ff;
canvas.beginPath();
canvas.moveTo(10, 10);
canvas.lineTo(90, 10);
canvas.lineTo(10, 90);
canvas.fill();

canvas.fillColor = 0x0000ffff;
canvas.beginPath();
canvas.moveTo(90, 90);
canvas.lineTo(90, 50);
canvas.lineTo(50, 90);
canvas.fill();

var testpng = fs.createWriteStream("C:\\test.png");
testpng.write(canvas.asPng());
testpng.close();
```

## API
To create an instance of `Canvas`, use the `createCanvas(width, height)` method that is exposed
by the module.

### Canvas

* `width` (integer)

  The width of the canvas in pixels.

* `height` (integer)

  The height of the canvas in pixels.

* `backColor` (color)

  Specifies the background color. Allowed values are:
  * 32 bit integers on the format 0xRRGGBBAA
  * strings on the format #RGB
  * strings on the format #RRGGBB
  * strings on the format #RRGGBBAA

* `fillColor` (color)

  Specifies the fill color that is used when the `fill()` method is called. Allowed values are:
  * 32 bit integers on the format 0xRRGGBBAA
  * strings on the format #RGB
  * strings on the format #RRGGBB
  * strings on the format #RRGGBBAA
  
* `beginPath()`

  Resets the internal path buffer and begins a new path.

* `moveTo(x, y)`

  Begins a new subpath by moving the cursor to the specified position.

* `lineTo(x, y)`

  Inserts an edge between the last and specified position.

* `fill([windingRule])`

  Fills the defined paths. `windingRule` defines the winding rule to be used for 
  determining which areas are covered by the current path. Valid values are "evenodd" and
  "nonzero". Default is "nonzero".

* `asPng([keywords])`

  Renders the canvas as a PNG data stream and returns it as a `Buffer`. `keywords`
  is an optional dictionary defining the keywords to be written to the PNG stream.
  See https://www.w3.org/TR/PNG/#11keywords.

## License
Polygon-renderer is released under the [zlib license](https://github.com/dmester/polygon-renderer/blob/master/license.txt).
