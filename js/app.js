/*-------------------------------- Constants --------------------------------*/
const choices = ["stand","hit"]

/*-------------------------------- Variables --------------------------------*/
let msg, bet, totalAmount, winner, playerTotal, dealerTotal, cardToRemove
let deck1 = []
// let playerHands = []
let dealerHands = []
let playerHandsNew = []
let dealerHandsNew = []


/*------------------------ Cached Element References ------------------------*/
const dealerSumMsg = document.querySelector('#dealersum')
const playerSumMsg = document.querySelector('#playersum')
// console.log("🚀 ~ file: app.js:20 ~ playerSum:", playerSum)
//  playerSum.innerHTML = '<p>hangry</p>'

const cardContainer = document.querySelector('#card-container')
// console.log("🚀 ~ file: app.js:20 ~  cardContainer:",  cardContainer)
 //cardContainer.innerHTML = '<p>sleepy</p>'
 const pcards1 = document.querySelector('.pcards1')
 const dcards1 = document.querySelector('.dcards1')
//  console.log("🚀 ~ file: app.js:26 ~  dcards1:",  dcards1)
//  console.log("🚀 ~ file: app.js:25 ~ pcards1:", pcards1)
// pcards1.innerHTML = '<p>gahhhh</p>'
// dcards1.innerHTML = '<p>sleepy</p>'

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
    // console.log("🚀 ~ file: app.js:39 ~ playerHandNew:", playerHandsNew)
    renderPlayerNew()
    calculatePlayerSum()
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

  function calculatePlayerSum() {
    // console.log(playerHandsNew)
    let playerSum = 0
    let aceCounter = 0
    playerHandsNew.forEach((playerHandNew) => {
    //  console.dir(playerHandNew)
     let pt =playerHandNew.slice(1)
     console.log("🚀 ~ file: app.js:92 ~ playerHandsNew.forEach ~ playerHandNew:", playerHandNew)
     if (pt === "J" || pt === "Q" || pt === "K"){
      pt = 10
     } else if (pt === "A") {
      pt =11
      aceCounter += 1
     }
     else {
      pt = parseInt(pt)
     }
    //  if (playerSum > 21 && aceCounter > 0) {
    //   playerSum += pt
    //   playerSum - 10*aceCounter
    //  }
    //  else {
    //   playerSum += pt
    //  }
    playerSum += pt
    while(playerSum > 21 && aceCounter > 0){
      playerSum -= 10
      aceCounter -= 1
    }
     playerSumMsg.textContent ="Player: "+ playerSum
     
    })
    check21(playerSum)
   }


function drawDealerNew(){
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    dealerHandsNew.push(cardPicked)
    // console.log("🚀 ~ file: app.js:105 ~ dealerHandsNew:", dealerHandsNew)
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
  // dealerHandsNew.forEach(dealerHand =>{
  // appendDealerHand(dealerHand)
  // })
  // console.log("🚀 ~ file: app.js:119 ~ renderDealerNew ~ dealerHandsNew:", dealerHandsNew)
}

function appendDealerHand(dealerHand) {
  // console.log("🚀 ~ file: app.js:70 ~ appendPlayerHand ~ playerHand:", playerHand)
  let dealerHandCard = document.createElement('div')
  dealerHandCard.classList.add('large')
  dealerHandCard.classList.add('card')
  dealerHandCard.classList.add(dealerHand)
  dcards1.appendChild(dealerHandCard)
  // console.log("🚀 ~ file: app.js:127 ~ appenddealerHand ~ dealerHandCard:", dealerHandCard)
}

function appendDealerHandHidden(dealerHand) {
  // console.log("🚀 ~ file: app.js:70 ~ appendPlayerHand ~ playerHand:", playerHand)
  let dealerHandCard = document.createElement('div')
  dealerHandCard.classList.add('large')
  dealerHandCard.classList.add('card')
  dealerHandCard.classList.add('back-blue')
  dealerHandCard.classList.add(dealerHand)
  dcards1.appendChild(dealerHandCard)
  // console.log("🚀 ~ file: app.js:127 ~ appenddealerHand ~ dealerHandCard:", dealerHandCard)
}

function calculateDealerSum() {
  // console.log(playerHandsNew)
  let dealerSum = 0
  let aceCounter = 0
  dealerHandsNew.forEach((dealerHandNew) => {
  //  console.dir(playerHandNew)
   let pt = dealerHandNew.slice(1)
   if (pt === "J" || pt === "Q" || pt === "K"){
    pt = 10
   } else if (pt === "A") {
    pt = 11
    aceCounter += 1
   }
   else {
    pt = parseInt(pt)
   }

     
   if (dealerSum > 21 && aceCounter > 0) {
    dealerSum += pt
    dealerSum - 10*aceCounter
   }
   else {
    dealerSum += pt
   }
   dealerSumMsg.textContent ="Dealer: "+dealerSum
  })
 }

 function check21(playerSum) {
  // console.log("rahhh")
  if (playerSum === 21) {
    console.log("🚀 ~ file: app.js:188 ~ check21 ~ playerSumMsg.textContent:", playerSumMsg.textContent)
    msg.textContent = "👑 You got a Blackjack! "
  }
  else if (dealerSumMsg.textContent === 21) {
    msg.textContent = "👑 dealr got a Blackjack! "
  }
 }


 //check for winner
//  function compareSum() {
//   if (playerSum = 21) {
//     msg.textContent = "👑 Blackjack winner winner chicken dinner"
//   }
// //check first round if any party got 21

//   //player =21

//   //player_stand=true  + player < 21 + dealer >21

//   //player_stand=true + player <21 + dealer <21 + (dealer - player) >0

//   // player = dealer ->msg +restart asking for bet



//   // else if (playerSum<21 && dealerSum >21 ){
//   //   msg.textContent = "winner winner chicken dinner"
//   // }

//  }

function play(e) {
  console.log(e)
}

