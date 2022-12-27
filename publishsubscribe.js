const redis = require('redis');

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN : "BLOCKCHAIN"
}

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;
        this.publisher  = redis.createClient();

        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscriber.on('message' , (channel , message)=>{this.handlemessage(channel,message)});

        }

        handlemessage(channel , message) {
            console.log(`message received on channel ${channel} and message is ${message}`);

            const parseMessage = JSON.parse(message);
            if(channel == CHANNELS.BLOCKCHAIN){
                 this.blockchain.replaceChain(parseMessage);
            }
        }

        broadcastChain(){
            this.publish({
                channel:CHANNELS.BLOCKCHAIN,
                message:JSON.stringify(this.blockchain.chain)

            });
        }

    publish({channel , message}){
        this.publisher.publish(channel , message);
    }
}


// const checkpubsub = new PubSub();
// setTimeout(()=>checkpubsub.publisher.publish(CHANNELS.TEST , "hello shriram"),1000);


module.exports = PubSub;