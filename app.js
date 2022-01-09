let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] //13 different cards per suit
let suits = ['clubs', 'diams', 'hearts', 'spades'] //4 suits
let deck = []
let cardCount = 0 //track cards delt from deck
let playerCards = []
let dealerCards = []
let cardArea = document.getElementById('cardArea')
let playerHand = document.getElementById('playerHand')
let dealerHand = document.getElementById('dealerHand')
let wallet = 100


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
    playerHand.innerHTML = ''
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
   dealACard()
    console.log("pressed")
}

function dealACard() {
    // // let randomNum = Math.floor((Math.random()*52)+1) //for selecting random card
    // playerHand.innerHTML += "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>" //test to see random card, showing colored symbol and weight, occassionally get an error, probably because of deck[]random mashups? Not sure yet

    // dealerHand.innerHTML += "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>"

    for(d = 0; d < 2; d++) {
        dealerCards.push(deck[cardCount])
        dealerHand.innerHTML += cardDisplay(cardCount, d)
        if(d == 0) {
            dealerHand.innerHTML += '<div id="hide" style="left: 100px;"></div>'
        }
        cardCount++
        playerCards.push(deck[cardCount])
        playerHand.innerHTML += cardDisplay(cardCount, d)
        cardCount++
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

// function start() {
//     shuffle(deck)
//     dealNew(deck)
// }


//continue dealing after game start
//win/lose/push
//bets
//wallet
//Aces

function choice(hitStay) {
    console.log("pressed")
    if (hitStay == 'hit') {
        anotherCard()
    } if (hitStay == 'stay'){
        endTurn()
    }
}

function dealACard() {
    console.log("dealACard function invoked")
    let randomNum = Math.floor((Math.random()*52)+1) //for selecting random card
    playerHand.innerHTML += "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>" //test to see random card, showing colored symbol and weight, occassionally get an error, probably because of deck[]random mashups? Not sure yet

    dealerHand.innerHTML += "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>"
}


function anotherCard() {
    console.log("deal player another card")
    playerCards.push(deck[cardCount])
    console.log(cardCount)
    playerHand.innerHTML += cardDisplay(cardCount, (playerCards.length - 1))
    cardCount++
}

function endTurn() {
    console.log('player holds - dealer go')
}

function contDeal() { //to continue dealing after game/hand has already started

}

// function regularDeal() {
//     console.log(deck, "regularDeal invoked")

//     for(d = 0; d < 2; d++) {
//         dealerCards.push(deck[cardCount])
//         dealerHand.innerHTML += cardDisplay(cardCount, d)
//         if(d == 0) {
//             dealerHand.innerHTML += '<div id="hide" style="left: 100px;"></div>'
//         }
//         cardCount++
//         playerCards.push(deck[cardCount])
//         playerHand.innerHTML += cardDisplay(cardCount, d)
//         cardCount++
// }



playersHandTotal = document.getElementById('playersHandTotal')
dealersHandTotal = document.getElementById('dealersHandTotal')







//continue dealing after game start
//win/lose/push
//bets
//wallet
//Aces
//result message to player
//show player & dealer's scores 


// my screw up section back-up:


// function dealNew() { //to initally deal 2 cards each
//     playerCards = []
//     dealerCards = []
//     playerHand.innerHTML = ''
//     dealerHand.innerHTML = ''
//     for(d = 0; d < 2; d++) {
//         dealerCards.push(deck[cardCount])
//         dealerHand.innerHTML += cardDisplay(cardCount, d)
//         if(d == 0) {
//             dealerHand.innerHTML += '<div id="hide" style="left: 100px;"></div>'
//         }
//         cardCount++
//         playerCards.push(deck[cardCount])
//         playerHand.innerHTML += cardDisplay(cardCount, d)
//         cardCount++
//     }
//     console.log("pressed")
// }
//need to figure out how to hide first dealer card though