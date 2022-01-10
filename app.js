let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] //13 different cards per suit
let suits = ['clubs', 'diams', 'hearts', 'spades'] //4 suits
let deck = []
let cardCount = 0 //track cards delt from deck
let playerCards = []
let dealerCards = []
let cardArea = document.getElementById('cardArea')
let playerHand = document.getElementById('playerHand')
let dealerHand = document.getElementById('dealerHand')
let pWeight = document.getElementById('pWeight') //display total of player's hand
let dWeight = document.getElementById('dWeight') //display total of dealer's hand
let wallet = 100
// let moneyValue = document.getElementById('money')
let message = document.getElementById("message")
let turnIsOver = false


    for (s = 0; s < suits.length; s++) //loop puts together suits, values, color, card suit symbols
    {
        let suit = suits[s][0].toUpperCase() //incase case sensitive
        let suitColor = (suit == 'S' || suit == 'C') ? 'black' : 'red'
        for(v = 0 ; v < values.length; v++)
        {
            // cardArea.innerHTML += "<span style='color:" + suitColor + "'>&" + suits[s] + ";" + values[v] + "</span>" //adds suit symbol, visualize full deck in html
            //let weight = (v > 9) ? 10 : parseInt(values[v]) //makes Ace NaN
            let weight = (v > 9) ? 10 : parseInt(v) + 1 //makes weight/value accurate, but Ace only has weight of one
            let card = {  //object to hold card properties
                suit: suit,
                symbol: suits[s],
                suitColor: suitColor,
                value: values[v],
                weight: weight
            }
            deck.push(card) //populates the deck with all 52 card objects
        } 
    }   
console.log(deck)

function start() {
    shuffle(deck)
    dealNew(deck)
    document.getElementById('start').style.display = 'none' //hide start button after game start
    document.getElementById('money').innerHTML = wallet

}

function dealNew() { //to initally deal 2 cards each
    playerCards = []
    dealerCards = []
    playerHand.innerHTML = '' //clear hands for new deal
    dealerHand.innerHTML = ''
    // for(d = 0; d < 2; d++) {
    //     dealerCards.push(deck[cardCount])
    //     dealerHand.innerHTML += cardDisplay(cardCount, d)
    //     if(d == 0) {
    //         dealerHand.innerHTML += '<div id="hide" style="left: 100px;"></div>'
    //     }
    //     cardCount++
    //     playerCards.push(deck[cardCount])
    //     playerHand.innerHTML += cardDisplay(cardCount, d)
    //     cardCount++
    // }

    let betAmount = document.getElementById('bet').value //pickup bet amount for new hand
    wallet = wallet - betAmount //adjust wallet by bet amount
    document.getElementById('money').innerHTML = wallet
    document.getElementById('playerChoices').style.display = 'block' //show play option buttons
    document.getElementById('bet').disabled = true //disable betting after cards dealt

   dealACard()
    console.log("pressed")
}

function dealACard() {
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
        endTurn()
    }
    pWeight.innerHTML = playerTotal
    console.log("dealACard activated")
}

function newShuffle() {
    cardCount++
    if (cardCount > 40) {
        shuffle(deck)
        cardCount = 0
        message.innerHTML = "The Dealer Has Shuffled a New Deck"
        console.log("newShuffle activated")
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


function cardDisplay(v, d) { //for outputting the generated card values and design - (cardCount)
    let cardPos = (d > 0) ? d * 60 + 100 : 100; //card relative positioning, styling, values
    return '<div class="card ' + deck[v].symbol + '" style="left:' + cardPos + 'px;"> <div class="cardTop suit">' + deck[v].value + '<br></div>  <div class="cardCenter suit"></div> <div class="cardBottom suit">' + deck[v].value + '<br></div> </div>'
}

function choice(hitStay) {
    console.log("pressed")
    if (hitStay == 'hit') { //deal another card to player
        anotherCard()
    } if (hitStay == 'stay'){ //player done adding cards, finish dealer hand
        endTurn()
    }
}

function anotherCard() {
    console.log("deal player another card")
    playerCards.push(deck[cardCount])
    console.log(cardCount)
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
    console.log('player holds - dealer go')
    turnIsOver = true
    document.getElementById('hide').style.display = 'none' //control availibility of buttons
    document.getElementById('playerChoices').style.display = 'none'
    document.getElementById('dealButton').style.display = 'block'
    document.getElementById('bet').disabled = false
    // message.innerHTML = "The Round is Over. "
    let bjPayout = 1
    let dealerTotal = checkWeight(dealerCards)
    dWeight.innerHTML = dealerTotal

    while (dealerTotal < 17) { //dealer hits to 17
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

    if ((playerTotal <= 21 && dealerTotal < playerTotal) || (dealerTotal > 21 && playerTotal <= 21)) {
        message.innerHTML += " You Win!"
        wallet = wallet + (betValue * 2)
        // wallet += wallet + betAmount
    } else if (playerTotal > 21) {
        message.innerHTML += " Dealer Wins"
    } else if (playerTotal == dealerTotal) {
        message.innerHTML += " PUSH"
        wallet = wallet + betValue
    } else {
        message.innerHTML += " Dealer Wins"
    }
    pWeight.innerHTML = playerTotal
    // moneyValue.innerHTML = wallet
    document.getElementById('money').innerHTML = wallet

}

function checkWeight(arr) { //checks for aces, determines their weight
    let resultWeight = 0
    let ace = false
    for(a = 0 ; a < arr.length; a++) {
        if (arr[a].value == 'A' && !ace) {
            ace = true
            resultWeight = resultWeight + 10
        }
        resultWeight = resultWeight + arr[a].weight
    }
    if (ace && resultWeight > 21) {
        resultWeight = resultWeight - 10
    }
    return resultWeight
}

