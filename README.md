﻿# canvas-renderer
HTML5 inspired canvas implemented in Node.js for rendering PNG images.
* Render simple polygons as PNG with no native dependencies like PhantomJS.
* It does not run in the browser.
* It is not an attempt to implement a complete vector graphics 
  rendering library. More features probably won't be implemented.

## Sample
Install the canvas-renderer NPM package.

```
npm install canvas-renderer
```

The following example renders two triangles to C:\test.png.

```js
const fs = require("fs");
const canvasRenderer = require("./canvas-renderer");

var canvas = canvasRenderer.createCanvas(100, 100);

var ctx = canvas.getContext("2d");

ctx.fillColor = 0xff0000ff;
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(90, 10);
ctx.lineTo(10, 90);
ctx.fill();

ctx.fillColor = 0x0000ffff;
ctx.beginPath();
ctx.moveTo(90, 90);
ctx.lineTo(90, 50);
ctx.lineTo(50, 90);
ctx.fill();

var testpng = fs.createWriteStream("C:\\test.png");
testpng.write(canvas.toPng());
testpng.close();
```

## API
To create an instance of `Canvas`, use the `createCanvas(width, height)` method that is exposed
by the module. Use 

### Canvas

#### Properties

* `width` (integer)

  The width of the canvas in pixels.

* `height` (integer)

  The height of the canvas in pixels.

* `backColor` (color)

  Specifies the background color. Allowed values are:

  * 32 bit integers on the format `0xRRGGBBAA`
  * strings on the format `"#RGB"`
  * strings on the format `"#RRGGBB"`
  * strings on the format `"#RRGGBBAA"`

  Default is transparent.

#### Methods

* `asPng([keywords])`

  Renders the canvas as a PNG data stream and returns it as a `Buffer`. `keywords`
  is an optional dictionary defining the keywords to be written to the PNG stream.
  See https://www.w3.org/TR/PNG/#11keywords.

* `getContext()`

  Gets a CanvasContext object for drawing on this canvas.


### CanvasContext

#### Properties

* `fillStyle` (color)

  Specifies the fill color that is used when the `fill()` method is called. Allowed values are:

  * 32 bit integers on the format `0xRRGGBBAA`
  * strings on the format `"#RGB"`
  * strings on the format `"#RRGGBB"`
  * strings on the format `"#RRGGBBAA"`
  
#### Paths

* `beginPath()`

  Removes all existing subpaths and begins a new path.

* `moveTo(x, y)`

  Begins a new subpath by moving the cursor to the specified position.

* `lineTo(x, y)`

  Inserts an edge between the last and specified position.

* `arc(x, y, radius, startAngle, endAngle, [anticlockwise])`

  Adds an arc to the current subpath. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)
  for details.

* `closePath()`

  Starts a new subpath that begins in the same point as the start and end point of the previous one.

#### Rendering

* `clearRect(x, y, width, height)`

  Fills the specified rectangle with fully transparent black without affecting the current paths.

* `fill([windingRule])`

  Fills the defined paths. `windingRule` defines the winding rule to be used for 
  determining which areas are covered by the current path. Valid values are `"evenodd"` and
  `"nonzero"`. Default is `"nonzero"`.

* `fillRect(x, y, width, height)`

  Fills the specified rectangle without affecting the current paths.


#### Transformation

* `resetTransform()`

* `rotate(angle)`

* `scale(x, y)`

* `setTransform(a, b, c, d, e, f)`

* `transform(a, b, c, d, e, f)`

* `translate(x, y)`

## License
Polygon-renderer is released under the [zlib license](https://github.com/dmester/polygon-renderer/blob/master/license.txt).
