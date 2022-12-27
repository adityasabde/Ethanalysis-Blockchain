const Block = require("./block");
const cryptohash = require("./crypto-hash");
 


class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    
    // add new block to chain
    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock : this.chain[this.chain.length -1],
            data,
        });

        this.chain.push(newBlock);
    }

    // check block is valid or not before adding to chain
    
    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }

        for(let i = 1 ; i<chain.length ;i++){
            const {timestamp , prevHash , hash , data , nonce , difficulty} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;

            const realLastHash = chain[i - 1].hash;

            if(prevHash !== realLastHash) return false;

            const validatedHash = cryptohash(timestamp , prevHash , data , nonce , difficulty);

            if(hash !== validatedHash) return false;
            if(Math.abs(lastDifficulty - difficulty) >1)return  false;
        }
       
        return true;
    }


    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error("the incoming chain is not longer");
            return
        }

        if(!Blockchain.isValidChain(chain)){
            console.error("the incoming chain is not longer");
            return;
        }
        
        this.chain = chain;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data : "my block"});

blockchain.addBlock({data : "block3"});


const result = Blockchain.isValidChain(blockchain.chain);
console.log(blockchain.chain);
// console.log(result);
module.exports = Blockchain ;