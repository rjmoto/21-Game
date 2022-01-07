let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] //13 different cards per suit
let suits = ['clubs', 'diams', 'hearts', 'spades'] //4 suits
let deck = []
let cardCount = 0 //track cards delt from deck
let playerCards = []
let dealerCards = []
let cardArea = document.getElementById('cardArea')
let playerHand = document.getElementById('playerHand')
let dealerHand = document.getElementById('dealerHand')


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


function dealACard() {
    let randomNum = Math.floor((Math.random()*52)+1) //for selecting random card
    playerHand.innerHTML += "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>" //test to see random card, showing colored symbol and weight, occassionally get an error, probably because of deck[]random mashups? Not sure yet

    dealerHand.innerHTML += "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>"
}



function shuffle(arr) { //randomly mixes up cards into different indices
    for(i = arr.length -1; i > 0; i--) { //loops through array back to front
        let j = Math.floor(Math.random() * (1 + i))
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}
// console.log(shuffle(deck))


function dealNew() { //to initally deal 2 cards each
    playerCards = []
    dealerCards = []
    playerHand.innerHTML = ''
    dealerHand.innerHTML = ''
    for(d = 0; d < 2; d++) {
        dealerCards.push(deck[cardCount])
        dealerHand.innerHTML += cardDisplay(cardCount)
        cardCount++
        playerCards.push(deck[cardCount])
        playerHand.innerHTML += cardDisplay(cardCount)
        cardCount++
    }
}
//need to figure out how to hide first dealer card though

function cardDisplay(cC) { //for outputting the generated card value - (cardCount)
    return "<span style='color:" + deck[cardCount].suitColor + "'>&" + deck[cardCount].symbol + ";" + deck[cardCount].weight + "</span>"
}

function start() {
    shuffle(deck)
    dealNew(deck)
}

