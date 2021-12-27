const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "27/12/2021", "Genesis Block", "0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousHash = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousHash.hash){
                return false;
            }
        }

        return true;
    }
}

let bitcoin = new Blockchain();
bitcoin.addBlock(new Block(1, "27/12/2021", { amount: 5}));
bitcoin.addBlock(new Block(2, "27/12/2021", { amount: 15}));

console.log(JSON.stringify(bitcoin, null, 4));
console.log("Is blockchain valid?" + bitcoin.isChainValid());

console.log("Hacking block 1...");

bitcoin.chain[1].data = { amount: 100 };
console.log("Hacked blockchain");
console.log(JSON.stringify(bitcoin, null, 4));
console.log("Is blockchain valid?" + bitcoin.isChainValid());

console.log("Trying to recalculate the hash");

bitcoin.chain[1].hash = bitcoin.chain[1].calculateHash();
console.log(JSON.stringify(bitcoin, null, 4));
console.log("Is valid after recalculate the hash?" + bitcoin.isChainValid())
