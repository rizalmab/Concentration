/*----- constants -----*/
class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}

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

/*----- app's state (variables) -----*/
let playerCount, computerCount, discardCount;
let playerDeck, computerDeck;
let previousCard, currentCard;
let turn = 0;

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
  return deck;
};

const shuffleDeck = (array) => {
  let currentIndex = array.length;
  let randomIndex;

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

const deck = createDeck();
const shuffledDeck = shuffleDeck(deck);

//* Start of game
//split deck into 2
playerDeck = shuffledDeck.slice(0, Math.floor(deck.length / 2));
computerDeck = shuffledDeck.slice(Math.floor(deck.length / 2), deck.length);
// console.log(playerDeck, playerDeck.length); // to check what cards and no. of cards in deck
// console.log(computerDeck, computerDeck.length); // to check what cards and no. of cards in deck

// Update counts of cards in 3 decks
playerCount = 0;
computerCount = 0;
discardCount = 0;

// Player put downs card first
// At each turn (while loop), player and computer take turns putting down card

const startGame = () => {
  while (playerDeck.length > 0 && computerDeck.length > 0) {
    turn++;

    if (turn === 1) {
      // for the first turn only
      currentCard = playerDeck.pop();
    } else {
      if (turn % 2 !== 0) {
        // on odd turns
        previousCard = currentCard;
        currentCard = playerDeck.pop();
      } else {
        // on even turns
        previousCard = currentCard;
        currentCard = computerDeck.pop();
      }
    }

    console.log("Turn", turn); // check turn number
    console.log("prev", previousCard, "current", currentCard); // check previous and current card
    console.log(
      // check remaining deck length
      "player length",
      playerDeck.length,
      "computer length",
      computerDeck.length
    );
  }
};

// Every 2 seconds, a card is put down
