const { logger } = require("./utils/logger");

class Peer {
    constructor(ws, peers) {
        this.client = ws;
        this.active = false;
        this.peers = peers;
        this.initClient();
    }

    initClient() {
        let events = ['NAME', 'OFFER', 'ANSWER']
        this.client.onmessage = (msg) => {
            msg = msg.data

            for(let event of events) {
                if(msg.startsWith(event))
                    this['handle' + event.toLowerCase()](msg.substring(event.length + 1))
            }
        }
    }

    handlename(msg) {
        this.name = msg;
        logger.info('peers name is ' + this.name)
        // some new connectors may can't be connected by this code
        this.active = true;
        this.sendPeersList();
        this.peers.set(this.name, this);
    }

    handleoffer(msg) {
        this.connecteTo(msg.substring(0, msg.indexOf(' ')), msg.substring(msg.indexOf(' ') + 1))
    }

    handleanswer(msg) {
        this.replyTo(msg.substring(0, msg.indexOf(' ')), msg.substring(msg.indexOf(' ') + 1))
    }

    connecteTo(peerName, offer) {
        let peer = this.peers.get(peerName)
        peer.sendoffer(this.name, offer);
    }

    replyTo(peerName, ans) {
        let peer = this.peers.get(peerName);
        peer.sendAns(this.name, ans);
    }

    sendAns(peerName, ans) {
        this.sendData('ANSWER ' + peerName + ' ' + ans)
    }

    sendData(data) {
        try {
            this.client.send(data)
            
        } catch (error) {
            logger.error(error)
            this.active = false;
        }
    }

    sendoffer(peerName, offer) {
        this.sendData('OFFER ' + peerName + ' '  + offer)
    }

    /*
     @peers a Peer list
    **/
    sendPeersList() {
        this.sendData('LIST ' + JSON.stringify(this.getPeersInfo()))
    }
    
    getPeersInfo() {
        let otherInfos = [];
        for (let peer of this.peers) {
            if (peer[1].active) //peer object
                otherInfos.push(peer[0]); // peer name
        }
        return otherInfos;
    }
}

module.exports = Peer;