let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] //13 different cards per suit
let suits = ['clubs', 'diams', 'hearts', 'spades'] //4 suits
let deck = []
//console.log(randomNum)

let cardArea = document.getElementById('cardArea')


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
            deck.push(card)
        } 
    }   
console.log(deck)

function dealACard() {
    let randomNum = Math.floor((Math.random()*52)+1) //for selecting random card
    cardArea.innerHTML += "<span style='color:" + deck[randomNum].suitColor + "'>&" + deck[randomNum].symbol + ";" + deck[randomNum].weight + "</span>" //test to see random card, showing colored symbol and weight, occassionally get an error, probably because of deck[]random mashups? Not sure yet
}