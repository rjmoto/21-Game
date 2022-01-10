let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] //13 different cards per suit
let suits = ['clubs', 'diams', 'hearts', 'spades'] //4 suits
let deck = [] //playing cards
let cardCount = 0 //track cards delt from deck
let playerCards = [] //cards drawn
let dealerCards = [] //cards drawn
let cardArea = document.getElementById('cardArea') //div card display area
let playerHand = document.getElementById('playerHand') //display cards
let dealerHand = document.getElementById('dealerHand') //display cards
let pWeight = document.getElementById('pWeight') //display total of player's hand
let dWeight = document.getElementById('dWeight') //display total of dealer's hand
let wallet = 100 //playing currency
// let moneyValue = document.getElementById('money')
let message = document.getElementById("message") //display messages to player
let turnIsOver = false //has player made move

    for (s = 0; s < suits.length; s++) //loop puts together suits, values, color, card suit symbols
    {
        for(v = 0 ; v < values.length; v++)
        {
            let weight = (v > 9) ? 10 : parseInt(v) + 1 //quantify values
            let card = {  //object to hold card properties
                symbol: suits[s],
                value: values[v],
                weight: weight
            }
            deck.push(card) //populates the deck with all 52 card objects
        } 
    }   
// console.log(deck)

function start() { //begins the game
    shuffle(deck)
    dealNew(deck)
    document.getElementById('start').style.display = 'none' //hide start button after game start
}

function dealNew() { //adjustments for new deal
    playerCards = []
    dealerCards = []
    playerHand.innerHTML = '' //clears for new deal
    dealerHand.innerHTML = ''
    let betAmount = document.getElementById('bet').value //pickup bet amount for new hand
    wallet = wallet - betAmount //adjust wallet by bet amount
    document.getElementById('money').innerHTML = wallet
    document.getElementById('playerChoices').style.display = 'block' //show play option buttons
    document.getElementById('bet').disabled = true //disable betting after cards dealt
    dWeight.innerHTML = ""  //hide dealers total before card revealed
    document.getElementById('dealButton').style.display = 'none'
    dealACard()
    // console.log("pressed")
}

function dealACard() { //starts cardplay
    message.innerHTML = "Good Luck!"
    for(d = 0; d < 2; d++) {
        dealerCards.push(deck[cardCount])
        dealerHand.innerHTML += cardDisplay(cardCount, d)
        if(d == 0) {
            dealerHand.innerHTML += '<div id="hide" style="left: 100px;"></div>'
        }
        newShuffle()
        playerCards.push(deck[cardCount])
        playerHand.innerHTML += cardDisplay(cardCount, d)
        newShuffle()
    }
    let playerTotal = checkWeight(playerCards) //see player total
    if (playerTotal == 21 && playerCards.length == 2) {
        message.innerHTML = "BLACKJACK!"
        endTurn()
    }
    pWeight.innerHTML = playerTotal
    // console.log("dealACard activated")
}

function newShuffle() { //when deck gets low
    cardCount++
    if (cardCount > 40) {
        shuffle(deck)
        cardCount = 0
        message.innerHTML = "The Dealer Has Shuffled a New Deck"
        // console.log("newShuffle activated")
    }
}

function shuffle(arr) { //randomly mixes up cards into different indices
    for(i = arr.length -1; i > 0; i--) { //loops through array back to front
        let j = Math.floor(Math.random() * (1 + i))
        let temp = arr[i] //the ol' switcheraoo
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}

function cardDisplay(v, d) { //for outputting the generated card values and design
    let cardPos = (d > 0) ? d * 60 + 100 : 100; //card relative positioning, styling, values
    return '<div class="card ' + deck[v].symbol + '" style="left:' + cardPos + 'px;"> <div class="cardTop suit">' + deck[v].value + 
    '<br></div>  <div class="cardCenter suit"></div> <div class="cardBottom suit">' + deck[v].value + '<br></div> </div>'
}

function choice(hitStay) {
    // console.log("pressed")
    if (hitStay == 'hit') { //deal another card to player
        anotherCard()
    } if (hitStay == 'stay'){ //player done adding cards, finish dealer hand
        endTurn()
    }
}

function anotherCard() {  //adds more cards for player
    // console.log("deal player another card")
    playerCards.push(deck[cardCount])
    // console.log(cardCount)
    playerHand.innerHTML += cardDisplay(cardCount, (playerCards.length - 1))
    newShuffle()
    let resultWeight = checkWeight(playerCards)
    pWeight.innerHTML = resultWeight
    if (resultWeight > 21) {
        message.innerHTML = "BUST!  You went over 21 -"
        endTurn()
    }
}

function endTurn() { //player
    message.innerHTML = ''
    turnIsOver = true
    document.getElementById('hide').style.display = 'none' //control availibility of buttons
    document.getElementById('playerChoices').style.display = 'none'
    document.getElementById('dealButton').style.display = 'block'
    document.getElementById('bet').disabled = false
    let bjPayout = 1
    let dealerTotal = checkWeight(dealerCards)
    dWeight.innerHTML = dealerTotal

    while (dealerTotal < 17) { //make dealer hit while under 17
        dealerCards.push(deck[cardCount])
        dealerHand.innerHTML += cardDisplay(cardCount, (dealerCards.length -1))
        newShuffle()
        dealerTotal = checkWeight(dealerCards)
        dWeight.innerHTML = dealerTotal
    }
    //win/lose logic
    let playerTotal = checkWeight(playerCards) 
    if (playerTotal == 21 && playerCards.length == 2) { //checking blackjack
        message.innerHTML = "BLACKJACK! "
        bjPayout = 1.5
    }
    let betValue = parseInt(document.getElementById('bet').value) * bjPayout

    if (playerTotal == dealerTotal) {
        message.innerHTML = " PUSH"
        wallet = wallet + betValue
    } else if ((playerTotal < 22 && dealerTotal < playerTotal) || (dealerTotal > 21 && playerTotal < 22)) {
        message.innerHTML += " You Win!"
        wallet = wallet + (betValue * 2)
    } else if (playerTotal > 21) {
        message.innerHTML += " Dealer Wins"
    } else {
        message.innerHTML += " Dealer Wins"
    }
    pWeight.innerHTML = playerTotal
    document.getElementById('money').innerHTML = wallet
}

function checkWeight(arr) { //checks for aces, determines their weight if hand has multiple
    let resultWeight = 0
    let ace = false
    for(a = 0 ; a < arr.length; a++) {
        if (arr[a].value == 'A' && !ace) { 
            ace = true
            resultWeight = resultWeight + 10
        }
        resultWeight = resultWeight + arr[a].weight
    }
    if (ace && resultWeight > 21) { //weighs ace as 1 if it would otherwise bust your hand
        resultWeight = resultWeight - 10
    }
    return resultWeight
}