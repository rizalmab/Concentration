/*----- constants -----*/
class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}

/*----- app's state (variables) -----*/
/*----- cached element references -----*/

/*----- functions -----*/
const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      const card = new Card(value, suit);
      deck.push(card);
    }
  }
  console.log(deck);
  console.log("no of cards", deck.length);
};

const shuffleDeck = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

/*----- event listeners -----*/

// create deck arrays
// needs to be a list of objects

const VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const SUITS = ["♠", "♥", "♦", "♣"];

const deck = createDeck();
const shuffledDeck = shuffleDeck(deck);
console.log(shuffledDeck);
