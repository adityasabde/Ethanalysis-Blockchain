const { GENESIS_DATA , MINE_RATE} = require("./config.js");

const hexToBinary = require("hex-to-binary");

const cryptohash = require("./crypto-hash.js");

class Block {
  constructor({ timestamp, data, hash, prevHash, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.prevHash = prevHash;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  // starting block
  static genesis() {
    return new this(GENESIS_DATA);
  }

  // creating new block
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;

    let nonce = 0;
    do {
      nonce++;
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      timestamp = Date.now();
      hash = cryptohash(timestamp, prevHash, data, nonce, difficulty);
    } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));

    // hash = cryptohash(timestamp, prevHash, data, nonce, difficulty);
    return new Block({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    const difference = timestamp - originalBlock.timsestamp;

    if (difficulty < 1) return 1;
    if (difference > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}

const block1 = new Block({
  timestamp: "2/09/22",
  data: "i am data",
  hash: "0xewrf",
  prevHash: "nothing",
});

const genesis = Block.genesis();
// console.log(genesis);

const result = Block.mineBlock({ prevBlock: block1, data: "block2" });
// console.log(result);

module.exports = Block;
