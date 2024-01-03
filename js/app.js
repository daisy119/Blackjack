/*-------------------------------- Constants --------------------------------*/
const choices = ["stand","hit"]
const values = {
  "dA": 11, "dQ": 10, "dK": 10, "dJ": 10, "d10": 10, "d09": 9, "d08": 8, "d07": 7, "d06": 6, "d05": 5, "d04": 4, "d03": 3, "d02": 2, "hA": 11, "hQ": 10, "hK": 10, "hJ": 10, "h10": 10, "h09": 9, "h08": 8, "h07": 7, "h06": 6, "h05": 5, "h04": 4, "h03": 3, "h02": 2, "cA": 11, "cQ": 10, "cK": 10, "cJ": 10, "c10": 10, "c09": 9, "c08": 8, "c07": 7, "c06": 6, "c05": 5, "c04": 4, "c03": 3, "c02": 2, "sA": 11, "sQ": 10, "sK": 10, "sJ": 10, "s10": 10, "s09": 9, "s08": 8, "s07": 7, "s06": 6, "s05": 5, "s04": 4, "s03": 3, "s02": 2
}


/*-------------------------------- Variables --------------------------------*/
let msg, bet, totalAmount, winner, playerTotal, dealerTotal, cardToRemove
let deck1 = []
// let playerHands = []
let dealerHands = []
let playerHandsNew = []
let dealerHandsNew = []


/*------------------------ Cached Element References ------------------------*/
const dealerSum = document.querySelector('#dealersum')
const playerSum = document.querySelector('#playersum')
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
    calculateSum()
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

  function calculateSum() {
    // console.log(playerHandsNew)
    let sum = 0
    let aceCounter = 0
    playerHandsNew.forEach((playerHandNew) => {
    //  console.dir(playerHandNew)
     let pt =playerHandNew.slice(1)
     
     if (pt === "J" || pt === "Q" || pt === "K"){
      pt = 10
     } else if (pt === "A") {
      pt =11
      aceCounter += 1
     }
     else {
      pt = parseInt(pt)
     }
     console.log(pt)
     sum += pt  
     if (sum > 21 && aceCounter > 0) {
      sum - 10
     }
     console.log("🚀 ~ file: app.js:103 ~ playerHandsNew.forEach ~ sum:", sum)
    })
  //   console.log("🚀 ~ file: app.js:94 ~ playerHandsNew.forEach ~ sum:", sum)
   }


function drawDealerNew(){
  if (deck1.length > 0){
    let randIdx = Math.floor(Math.random()*deck1.length)
    let cardPicked = deck1.splice(randIdx, 1)[0]
    dealerHandsNew.push(cardPicked)
    // console.log("🚀 ~ file: app.js:105 ~ dealerHandsNew:", dealerHandsNew)
     renderDealerNew()
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



function play(e) {
  console.log(e)
}

