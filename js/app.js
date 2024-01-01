/*-------------------------------- Constants --------------------------------*/
const choices = ["stand","hit"]



/*-------------------------------- Variables --------------------------------*/
let msg, playerHand, dealerHand, winner


/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById("message")



/*----------------------------- Event Listeners -----------------------------*/
document.getElementById('play').addEventListener('click', play)


/*-------------------------------- Functions --------------------------------*/
function play(e) {
  console.log(e)
}