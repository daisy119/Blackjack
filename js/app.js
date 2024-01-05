/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let msg, bet, playerSum, dealerSum, playerHand, dealerHand, deck
let totalAmount = 2500

/*------------------------ Cached Element References ------------------------*/
const dealerSumMsg = document.querySelector('#dealersum')
const playerSumMsg = document.querySelector('#playersum')
const messageEl = document.getElementById("message")
const cardContainer = document.querySelector('#card-container')
const pcards1 = document.querySelector('.pcards1')
const dcards1 = document.querySelector('.dcards1')
const playBtn =document.querySelector('#play')
const hitBtn = document.querySelector('#hit')
const standBtn = document.querySelector('#stand')
const twoBtn = document.querySelector('#two')
const fiveBtn = document.querySelector('#five')
const tenBtn = document.querySelector('#ten')
const dealBtn = document.querySelector('#deal-cards')
let hiddenCard = document.querySelector('.back-blue')
const betEl = document.getElementById("bet")
const currentBetEl = document.getElementById("current-bet")
const pokerSound = new Audio('../assets/audio/poker-card.wav')
const wrongSound = new Audio('../assets/audio/wrong.mp3')
const jazzSound = new Audio('../assets/audio/jazz music.mp3')
const coinSound = new Audio('../assets/audio/coin.wav')
jazzSound.volume = 0.3
wrongSound.volume = 0.3
pokerSound.volume = 0.3
coinSound.volume = 0.3

/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', init)
hitBtn.addEventListener('click', drawPlayer)
standBtn.addEventListener('click',endPlayerTurn)
twoBtn.addEventListener('click', () => { 
  calculateBet(2)
})
fiveBtn.addEventListener('click', () => { 
  calculateBet(5)
})
tenBtn.addEventListener('click', () => {
  calculateBet(10)
})
dealBtn.addEventListener('click', dealCards)


function calculateBet(a){
  totalAmount -= a
  bet += a
  betEl.textContent = `Bank: $${totalAmount}`
  currentBetEl.textContent = `Bet: $${bet}`
  coinSound.play()
  
}

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  
  // set scores to 0
  playerSum = 0
  dealerSum = 0

  // set bet
  bet = 0
  currentBetEl.textContent = `Bet: $${bet}`

  // clear hands
  playerHand = []
  renderPlayerHand()
  dealerHand = []
  renderDealerHand()

  //reset message
  messageEl.textContent = ""
  dealerSumMsg.textContent = ""
  playerSumMsg.textContent = ""
  
  // set new deck
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

  //display bet
  betEl.textContent = `Bank: $${totalAmount}`

  //hide Hit and Stand Button
  hitBtn.style.visibility = "hidden"
  standBtn.style.visibility = "hidden"
  twoBtn.style.visibility = "visible"
  fiveBtn.style.visibility = "visible"
  tenBtn.style.visibility = "visible"
}

function dealCards() {
  //deal
  drawDealer()
  drawDealer()
  drawPlayer()
  drawPlayer()
  jazzSound.play()
  hitBtn.style.visibility = "visible"
  standBtn.style.visibility = "visible"

}

function drawPlayer() {
  if (deck.length > 0){
    let randIdx = Math.floor(Math.random()*deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    playerHand.push(cardPicked)
    renderPlayerHand()
    playerSum = calculateHand(playerHand)
    playerSumMsg.textContent ="Player: "+ playerSum
    catch21(playerSum)
  }
}

function renderPlayerHand() {
  pcards1.innerHTML = ''
  playerHand.forEach(playerHand =>{
    appendPlayerHand(playerHand)
  })
  pokerSound.play()
}

function appendPlayerHand(playerHand) {
  let playerHandCard = document.createElement('div')
  playerHandCard.classList.add('large')
  playerHandCard.classList.add('card')
  playerHandCard.classList.add(playerHand)
  pcards1.appendChild(playerHandCard)
}

function calculateHand(hand) {
  let playerSum = 0
  let aceCounter = 0
  hand.forEach((card) => {
    let pt = card.slice(1)
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
  if (deck.length > 0){
    let randIdx = Math.floor(Math.random()*deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    dealerHand.push(cardPicked)
    renderDealerHand()
    dealerSum = calculateHand(dealerHand)
}}


function renderDealerHand(){
  dcards1.innerHTML = ''
  for (let i = 0; i < dealerHand.length; i++) {
    if (i === 0 ) {
      appendDealerHandHidden(dealerHand[i]);
    }
    else {
      appendDealerHand(dealerHand[i]);
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
    messageEl.textContent = `Bust 🤯! try again🥀`
    wrongSound.play()
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
}


function compareSum() {
  
  if (playerSum ===21 && dealerSum !== 21){
    messageEl.textContent = `👑 You got a Blackjack!`
    won()
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
  else if (playerSum < 21 && dealerSum >21){
    messageEl.textContent = `Winner winner chicken dinner 🍗 dealer bust 🤯`
    won()
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
  else if (dealerSum === 21) {
    messageEl.textContent = `👑 Dealer got a Blackjack! You lose.`
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
  else if (playerSum < 21 && dealerSum <21 && playerSum >dealerSum) {
    messageEl.textContent = `Winner winner chicken dinner 🍗`
    won()
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
  else if (dealerSum === playerSum){
    messageEl.textContent = `Push! 👔 Play again`
    tied()
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
  else {
    messageEl.textContent = `You lost! try again🥀---else`
    wrongSound.play()
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden"
  }
  

}

function endPlayerTurn() {
  //disable hit button
  
  unhideDealerCard()
  while(dealerSum< 17  && dealerSum < playerSum) {
    drawDealer()
    unhideDealerCard()
  }
  dealerSumMsg.textContent ="Dealer: "+ dealerSum
  compareSum()
}

function unhideDealerCard() {
  dcards1.firstChild.classList.remove("back-blue")
}

function won() {
  totalAmount += bet*2
  betEl.textContent = `Bank: $${totalAmount}`
}

function tied() {
  totalAmount += bet
  betEl.textContent = `Bank: $${totalAmount}`
}

//to do :disable button when result is out and when player hit stand