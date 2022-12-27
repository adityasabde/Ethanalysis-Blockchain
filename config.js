
const MINE_RATE = 1000; // 1sec == 1000ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA = {
    timestamp : 1,
    prevhash : "00000",
    hash : "00123",
    data : [],
    nonce : 0,
    difficulty :INITIAL_DIFFICULTY 
}

module.exports = {GENESIS_DATA , MINE_RATE};