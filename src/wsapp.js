const WebSocket = require("ws");
const { logger } = require("./utils/logger");
const { v4: uuidv4 } = require('uuid');
const Peer = require("./peer");

const WebSocketServer = WebSocket.Server;

const port = 3000;
const wss = new WebSocketServer({
    port
});

const peers = new Map;
const peersList = [];

wss.on('connection', function (ws) {
    logger.info('connection()')
    peersList.push(new Peer(ws, peers));
});

logger.info('websocket server is hosted on ' + port)