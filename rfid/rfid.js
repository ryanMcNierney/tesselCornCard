// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A'],
  {
    listen: true,
    delay: 1000
  });

let score = {
  player1: 0,
  player2: 0
}

let isPlayer1 = true;
let switchPlayer = function () {
  isPlayer1 = !isPlayer1;
};


rfid.on('ready', function (version) {
  console.log('\n----------Round 1-----------\nPLAYER 1 START\n----------Round 1-----------\n');
  //console.log('Player 1 Turn')

  setTimeout(() => {
    switchPlayer();
    console.log('\n----------Round 1-----------\nPLAYER 2 START\n----------Round 1-----------\n');
  }, 20000);
  setTimeout(() => {
    switchPlayer();
    console.log('\n----------Round 2-----------\nPLAYER 1 START\n----------Round 2-----------\n');
  }, 40000);
  setTimeout(() => {
    switchPlayer();
    console.log('\n----------Round 2-----------\nPLAYER 2 START\n----------Round 2-----------\n');
  }, 60000);
  setTimeout(() => {
    switchPlayer();
    console.log('\n----------Round 3-----------\nPLAYER 1 START\n----------Round 3-----------\n');
  }, 80000);
  setTimeout(() => {
    switchPlayer();
    console.log('\n----------Round 3-----------\nPLAYER 2 START\n----------Round 3-----------\n');
  }, 100000);
  setTimeout(() => {
    switchPlayer();
    if (score.player1 > score.player2) {
      console.log(`\n----------WINNER-----------\nPLAYER 1`)
    } else if (score.player1 < score.player2) {
      console.log(`\n----------WINNER-----------\nPLAYER 2`)
    } else {
      console.log(`\n----------IT'S A TIEEEEEE----------\n`)
    }
  }, 120000);


  rfid.on('data', function (card) {

    if (isPlayer1) score.player1++;
    else score.player2++;

    console.log('player1 score =', score.player1)
    console.log('player2 score =', score.player2)
  });
});






rfid.on('error', function (err) {
  console.error(err);
});
