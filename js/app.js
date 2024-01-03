/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let msg, bet, winner, playerScore, dealerScore, playerHandsNew, dealerHandsNew, deck1
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

/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', init)
hitBtn.addEventListener('click', drawPlayerNew)
standBtn.addEventListener('click', drawDealerNew)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  
  // set scores to 0
  playerScore = 0
  dealerScore = 0

  // clear hands
  playerHandsNew = []
  dealerHandsNew = []

  // set new deck
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


  // Ask player for bet
  // makeBet()
  //deal
  drawDealerNew()
  drawDealerNew()
  drawPlayerNew()
  drawPlayerNew()
  
}

function drawPlayerNew() {
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    playerHandsNew.push(cardPicked)
        renderPlayerNew()
    calculatePlayerSum()
  }
}

function renderPlayerNew() {
  pcards1.innerHTML = ''
  playerHandsNew.forEach(playerHand =>{
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

  function calculatePlayerSum() {
        let playerSum = 0
    let aceCounter = 0
    playerHandsNew.forEach((playerHandNew) => {
      let pt =playerHandNew.slice(1)
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
    playerSumMsg.textContent ="Player: "+ playerSum
    })

    let playerSumObj = {character: "player", sum: playerSum}
    catch21(playerSumObj)
    
    compareSum(playerSumObj.sum)
  }


function drawDealerNew(){
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    dealerHandsNew.push(cardPicked)
    renderDealerNew()
    calculateDealerSum()
}}


function renderDealerNew(){
  dcards1.innerHTML = ''
  for (let i = 0; i < dealerHandsNew.length; i++) {
    if (i === 0) {
      appendDealerHandHidden(dealerHandsNew[i]);
    }
    else {
      appendDealerHand(dealerHandsNew[i]);
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

function calculateDealerSum() {
    let dealerSum = 0
  let aceCounter = 0
  dealerHandsNew.forEach((dealerHandNew) => {
    let pt = dealerHandNew.slice(1)
    if (pt === "J" || pt === "Q" || pt === "K"){
    pt = 10
  } else if (pt === "A") {
    pt = 11
    aceCounter += 1
  } else {
    pt = parseInt(pt)
  }
  
  dealerSum += pt
    while(dealerSum > 21 && aceCounter > 0){
      dealerSum -= 10
      aceCounter -= 1
    }

    dealerSumMsg.textContent ="Dealer: "+dealerSum
  })
  let dealerSumObj = {character: "dealer", sum: dealerSum}
  catch21(dealerSumObj)
}

function catch21(obj) {
  if (obj.character === 'player' && obj.sum ===21) {
        messageEl.textContent = `👑 You got a Blackjack!`
  }
  
  else if (obj.character ==="dealer" && obj.sum === 21) {
    
    messageEl.textContent = `👑 dealer got a Blackjack!` 
  }
}


function compareSum(p,q) {
  console.log("🚀 ~ file: app.js:210 ~ compareSum ~ p:", p)
  console.log('keep pushing')
}

function play(e) {
  console.log(e)
}

