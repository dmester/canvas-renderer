import Crc32 from './lib/png/crc32';
import { format } from './lib/colorUtils';
import PngPalette from './lib/png/pngPalette';

const a1 = new PngPalette([]);

const a = new Crc32();

console.log(a, format(0xFFFFFF));