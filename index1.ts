import Crc32 from './lib/png/crc32';
import { format } from './lib/colorUtils';

const a = new Crc32();

console.log(a, format(0xFFFFFF));