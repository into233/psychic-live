const util = require("util")
const { Readable } = require('stream')

var ReadableStreamClone = function(readableStream, options) {
    var that = this;
    Readable.call(that, options);

    readableStream.on("data", function(chunk) {
        that.push(chunk);
    })
    readableStream.on('end', function() {
        that.push(null);
    })
    readableStream.on("error", function(err) {
        that.emit('error', err);
    })
    that._read = function() {
    };
}

util.inherits(ReadableStreamClone, Readable)

module.exports = ReadableStreamClone;