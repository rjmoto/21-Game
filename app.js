let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] //13 different cards per suit
let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'] //4 suits
let deck = []

function createDeck() //for combining values and suits into 52 cards objects, pushes them to deck array
{
    for (s = 0; s < suits.length; s++)
    {
        for(v = 0 ; v < values.length; v++)
        {
            let weight = parseInt(values[v])
            if (values[v] == 'J' || values[v] == 'K' || values[v] == 'Q')
                weight = 10
            if (values[v] == 'A')
                weight = 11
            let card = {Value: values[v], Suit: suits[s], Weight: weight}
            deck.push(card)
        }
    }
}

createDeck() //invoked to fill deck with 52 cards

console.log(deck)


console.log(deck[Math.floor((Math.random()*52))]) //selects random card from deck array, indices 0-51

// let output = document.getElementById('output')
// output.innerHTML = deck[Math.floor((Math.random()*52))]

function DealACard() {
    let output = document.getElementById('output')
    output.innerHTML = deck[Math.floor((Math.random()*52))]
}

DealACard()
