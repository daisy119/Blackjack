/*-------------------------------- Constants --------------------------------*/
const choices = ["stand","hit"]



/*-------------------------------- Variables --------------------------------*/
let msg, bet, totalAmount, winner, playerTotal, dealerTotal, cardToRemove
let deck1 = []
let playerHands = []
let dealerHands = []
let playerHandsNew = []
let dealerHandsNew = []


/*------------------------ Cached Element References ------------------------*/
let p1El = document.getElementById('deck-1')
let p2El = document.getElementById('deck-2')
let d2El = document.getElementById('deck-3')
let d1El = document.getElementById('deck-4')

const cardContainer = document.querySelector('#card-container')
// console.log("🚀 ~ file: app.js:20 ~  cardContainer:",  cardContainer)
 //cardContainer.innerHTML = '<p>sleepy</p>'
 const pcards1 = document.querySelector('.pcards1')
//  console.log("🚀 ~ file: app.js:25 ~ pcards1:", pcards1)
//  pcards1.innerHTML = <p>gahhhh</p>'

const messageEl = document.getElementById("message")
// messageEl.innerHTML = 'hello'

const playBtn =document.querySelector('#play')
const hitBtn =document.querySelector('#hit')
const standBtn =document.querySelector('#stand')
// console.log(standBtn)

/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', function() {console.log('who is playing cards')})
hitBtn.addEventListener('click',drawPlayerNew)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

  drawDealer()
  drawDealer()
  drawPlayer()
  drawPlayer()
}

function drawPlayerNew() {
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    playerHandsNew.push(cardPicked)
    // console.log("🚀 ~ file: app.js:39 ~ playerHandNew:", playerHandsNew)
    renderPlayerNew()
  }
}

function renderPlayerNew() {
  pcards1.innerHTML = ''
  playerHandsNew.forEach(playerHand =>{
    // pcards1.classList.add(playerHand)
    // console.log("🚀 ~ file: app.js:66 ~ renderPlayerNew ~ pcards1:", pcards1)
    
     appendPlayerHand(playerHand)
  })
}

  function appendPlayerHand(playerHand) {
    // console.log("🚀 ~ file: app.js:70 ~ appendPlayerHand ~ playerHand:", playerHand)
    let playerHandCard = document.createElement('div')
    playerHandCard.classList.add('large')
    playerHandCard.classList.add('card')
    playerHandCard.classList.add(playerHand)
    pcards1.appendChild(playerHandCard)
    // console.log("🚀 ~ file: app.js:77 ~ appendPlayerHand ~ playerHandCard:", playerHandCard)
  }

function drawPlayer() {
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    playerHands.push(cardPicked)
    renderPlayer(cardPicked)
  }
}
 //console.log(playerHand)

function renderPlayer(cardPicked) {
  if (playerHands.length === 1) {  
    p1El.classList.add(cardPicked) 
  }
  else if (playerHands.length ===2) {
    p2El.classList.add(cardPicked)
  }
}

function drawDealer() {
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    dealerHands.push(cardPicked)
    renderDealer(cardPicked)
  }
}
 //console.log(playerHand)

function renderDealer(cardPicked) {
  if (dealerHands.length === 1) {  
    d1El.classList.add(cardPicked) 
  }
  else if (dealerHands.length === 2) {
    d2El.classList.add(cardPicked)
  }
}

function play(e) {
  console.log(e)
}

