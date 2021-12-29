const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(index, name, timestamp, data, previousHash = ''){
        this.index = index;
        this.name = name;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.name + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1; //increasing the difficulty increase the processing time of the block
    } 

    createGenesisBlock(){
        return new Block(0, "Alejandro Ojea", "27/12/2021", "Genesis Block", "0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
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
bitcoin.addBlock(new Block(1, "Alejandro Ojea", "27/12/2021", { amount: 5}));
bitcoin.addBlock(new Block(2, "Alejandro Ojea", "27/12/2021", { amount: 15}));

console.log(JSON.stringify(bitcoin, null, 4));
console.log("Is blockchain valid?" + bitcoin.isChainValid());
