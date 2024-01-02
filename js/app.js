/*-------------------------------- Constants --------------------------------*/
const choices = ["stand","hit"]



/*-------------------------------- Variables --------------------------------*/
let msg, bet, totalAmount, winner, playerTotal, dealerTotal, cardToRemove
let deck1 = []
let playerHand = []
let dealerHand = []


/*------------------------ Cached Element References ------------------------*/
let p1El = document.getElementById('deck-1')
let p2El = document.getElementById('deck-2')
let d2El = document.getElementById('deck-3')
let d1El = document.getElementById('deck-4')




//displaying win/lose message---->need test
const messageEl = document.getElementById("message")



/*----------------------------- Event Listeners -----------------------------*/
document.getElementById('play').addEventListener('click', play)


/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

  drawDealer()
}

function drawDealer() {
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    dealerHand.push(cardPicked)
    render(cardPicked)
  }
}

function render(cardPicked) {

  if (deck2.length === 1) {  
    deck2El.classList.remove("outline")
  }
  if (deck2.length > 1) {  
    deck2El.classList.remove(cardToRemove)
  }
  cardToRemove = cardPicked  
  deck2El.classList.add(cardPicked)  
  if (deck2.length === 26) {  
    deck2El.classList.add("shadow");
    deck1El.classList.remove("shadow");
  }
  if (deck1.length === 0) {  
    deck1El.classList.add("outline");
    deck1El.classList.remove("back-blue");
  }
}

function play(e) {
  console.log(e)
}

