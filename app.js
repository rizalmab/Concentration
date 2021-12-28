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
const $startButton = $("#start-button");
const rulesButton = $("#rules-button");
const rulesBackButton = $("#rules-back-button");
const goButton = $("#go-button");
const snapButton = $("#snap-button");

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

const printHello = () => {
  console.log("hello");
};

// const myInterval = setInterval(printHello, 1000);

const checkConditions = () => {
  // code block - make simple condition
  // if prev card === current card (ie. value is the same)
  console.log("SNAP button clicked");
};

const main = () => {
  $("#start-button").on("click", () => {
    $(".screen").hide();
    $("#input-screen").show();
  });
  $("#rules-button").on("click", () => {
    $(".screen").hide();
    $("#rules-screen").show();
  });
  $("#rules-back-button").on("click", () => {
    $(".screen").hide();
    $("#start-screen").show();
  });
  $("#go-button").on("click", () => {
    $(".screen").hide();
    $("#game-screen").show();
  });
  $("#snap-button").on("click", () => {
    clearInterval(myInterval);
  });
};

/*----- event listeners -----*/

// $("h1").innerText("hello");
// RENDER FUNCTION
// things to render:
// previous card
// current card
// computerCardCount
// playerCardCount
// discardPileCount
// correct or wrong snap

$(main);
