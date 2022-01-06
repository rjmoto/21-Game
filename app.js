let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] //13 different cards per suit
let suits = ['clubs', 'diams', 'hearts', 'spades'] //4 suits
let deck = []
// let randomNum = Math.floor((Math.random()*52)+1) //for selecting random card
//console.log(randomNum)
let cardArea = document.getElementById('cardArea')


    for (s = 0; s < suits.length; s++)
    {
        let suit = suits[s][0].toUpperCase()
        let suitColor = (suit == 'S' || suit == 'C') ? 'black' : 'red'
        for(v = 0 ; v < values.length; v++)
        {
            cardArea.innerHTML += "<span style='color:" + suitColor + "'>&" + suits[s] + ";" + values[v] + "</span>"
        }
    }   
