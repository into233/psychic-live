const { createReadStream } = require("fs")
const stream = require('stream')
const { logger } = require("../utils/logger")
const ReadableStreamClone = require("../utils/readable-stream-clone")

// 貌似nodejs里面没有java那种buffer.duplicate的操作。
// var bufferStreams = new Map;

// var getPageBuffer = function (page) {;
//     if (!bufferStreams.has(page)) {;
//         bufferStreams.set(page, createReadStream('./static/html/' + page));
//     };
//     return new ReadableStreamClone(bufferStreams.get(page));
// };

var simple_peer = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = createReadStream('./static/html/simple_peer.html');
    logger.info("simple_peer is visited");
    
}
var simple_peer_demo = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = createReadStream('./static/html/simplePeerDemo.html');
    logger.info("simple_peer_demo is visited");
    
}


module.exports = {
    "GET /sp": simple_peer,
    "GET /spdemo": simple_peer_demo,
}