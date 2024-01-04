/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let msg, bet, winner, playerSum, dealerSum, playerHands, dealerHands, deck1
let totalAmount = 2500

/*------------------------ Cached Element References ------------------------*/
const dealerSumMsg = document.querySelector('#dealersum')
const playerSumMsg = document.querySelector('#playersum')

const cardContainer = document.querySelector('#card-container')
const pcards1 = document.querySelector('.pcards1')
const dcards1 = document.querySelector('.dcards1')

const messageEl = document.getElementById("message")

const playBtn =document.querySelector('#play')
const hitBtn =document.querySelector('#hit')
const standBtn =document.querySelector('#stand')

const hiddenCard = document.querySelector('.back-blue')

/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', init)
hitBtn.addEventListener('click', drawPlayer)
standBtn.addEventListener('click',endPlayerTurn)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  
  // set scores to 0
  playerSum = 0
  dealerSum = 0

  // clear hands
  playerHands = []
  dealerHands = []

  // set new deck
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

  // Ask player for bet
  // makeBet()
  //deal
  drawDealer()
  drawDealer()
  drawPlayer()
  drawPlayer()
}


function drawPlayer() {
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    playerHands.push(cardPicked)
    renderPlayerHands()
    playerSum = calculateHands(playerHands)
    playerSumMsg.textContent ="Player: "+ playerSum
    catch21(playerSum)
    
  }
}

function renderPlayerHands() {
  pcards1.innerHTML = ''
  playerHands.forEach(playerHand =>{
    appendPlayerHand(playerHand)
  })
}

function appendPlayerHand(playerHand) {
  let playerHandCard = document.createElement('div')
  playerHandCard.classList.add('large')
  playerHandCard.classList.add('card')
  playerHandCard.classList.add(playerHand)
  pcards1.appendChild(playerHandCard)
}

function calculateHands(hands) {
  let playerSum = 0
  let aceCounter = 0
  hands.forEach((hand) => {
    let pt = hand.slice(1)
    if (pt === "J" || pt === "Q" || pt === "K"){
      pt = 10
    } else if (pt === "A") {
      pt =11
      aceCounter += 1
    } else {
      pt = parseInt(pt)
    }
    playerSum += pt
    while(playerSum > 21 && aceCounter > 0){
      playerSum -= 10
      aceCounter -= 1
    }
  })
  return playerSum
}
  

function drawDealer(){
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    dealerHands.push(cardPicked)
    renderDealerNew()
    dealerSum = calculateHands(dealerHands)
}}


function renderDealerNew(){
  dcards1.innerHTML = ''
  for (let i = 0; i < dealerHands.length; i++) {
    if (i === 0) {
      appendDealerHandHidden(dealerHands[i]);
    }
    else {
      appendDealerHand(dealerHands[i]);
    }  
  }
        }

function appendDealerHand(dealerHand) {
  let dealerHandCard = document.createElement('div')
  dealerHandCard.classList.add('large')
  dealerHandCard.classList.add('card')
  dealerHandCard.classList.add(dealerHand)
  dcards1.appendChild(dealerHandCard)
  }

function appendDealerHandHidden(dealerHand) {
  let dealerHandCard = document.createElement('div')
  dealerHandCard.classList.add('large')
  dealerHandCard.classList.add('card')
  dealerHandCard.classList.add('back-blue')
  dealerHandCard.classList.add(dealerHand)
  dcards1.appendChild(dealerHandCard)
  }

function catch21(sum) {
  console.log(`${playerSum}<---player,${dealerSum}<----dealer`)
  if (sum ===21 ) {
    dcards1.firstChild.classList.remove("back-blue")
    dealerSumMsg.textContent ="Dealer: "+ dealerSum
    compareSum()
  }
  else if (sum >21) {
    dcards1.firstChild.classList.remove("back-blue")
    dealerSumMsg.textContent ="Dealer: "+ dealerSum
    messageEl.textContent = `you lost! try again`
  }
  
  }
 
  // if (obj.character === 'player' && obj.sum ===21) {
  //       messageEl.textContent = `👑 You got a Blackjack!`
  // }
  
  // else if (obj.character ==="dealer" && obj.sum === 21) {
    
  //   messageEl.textContent = `👑 dealer got a Blackjack!` 
  // }


function compareSum() {
  
  if (playerSum ===21 && dealerSum !== 21){
    messageEl.textContent = `👑 You got a Blackjack!`
  }
  else if (dealerSum === playerSum){
    messageEl.textContent = `Push! 👔 Play again`
  }
  else if (playerSum < 21 && dealerSum >21){
    messageEl.textContent = `winner winner chicken dinner 🍗`
  }
  else if (dealerSum === 21) {
    messageEl.textContent = `👑 Dealer got a Blackjack!`
  }
  else if (playerSum < 21 && dealerSum <21 && playerSum >dealerSum) {
    messageEl.textContent = `winner winner chicken dinner 🍗`
  }
  else {
    messageEl.textContent = `you lost! try again`
  }

}

function endPlayerTurn() {
  //disable button
  
  dcards1.firstChild.classList.remove("back-blue")
  dealerSumMsg.textContent ="Dealer: "+ dealerSum
  while(dealerSum< 17  && dealerSum <playerSum) {
    drawDealer()
  }
  compareSum()

}



