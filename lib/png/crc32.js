"use strict";

var CRC_TABLE = makeCrcTable();

/**
 * Creates a new running CRC32 calculator.
 * @public
 */
function Crc32() { }

/**
 * The current CRC32 value.
 * @public
 */
Crc32.prototype.value = 0;

/**
 * Adds more data to the CRC32 sum.
 * @param {Buffer} buffer  Data is read from this buffer.
 * @param {number} bufferStart  Index of first byte to read.
 * @param {number} bufferEnd  Index of exclusive last byte to read.
 * @public
 */
Crc32.prototype.update = function Crc32_update(buffer, bufferStart, bufferEnd) {
    var crc = this.value ^ 0xffffffff;

    if (typeof bufferStart !== "number") {
        bufferStart = 0;
    }

    if (typeof bufferEnd !== "number") {
        bufferEnd = buffer.length;
    }
    
    for (var i = bufferStart; i < bufferEnd; i++) {
        crc = CRC_TABLE[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
    }

    this.value = crc ^ 0xffffffff;
};


module.exports = Crc32;


function makeCrcTable() {
    var crcTable = [];

    for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) {
            if ((c & 1) == 1)
                c = 0xedb88320 ^ (c >>> 1);
            else
                c = c >>> 1;
        }
        crcTable[n] = c;
    }

    return crcTable;
}
