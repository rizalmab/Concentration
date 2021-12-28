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
// Decks
let playerDeck, computerDeck;
const discardDeck = [];

// Current and previous cards
let previousCard, currentCard;

// Card counts
let playerCount, computerCount, discardCount;

let turn = 0;
let myInterval;

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

const startGame = () => {
  // create deck of 52 cards
  const deck = createDeck();

  // shuffle deck of 52 cards
  const shuffledDeck = shuffleDeck(deck);

  // slice deck of 52 cards in half
  playerDeck = shuffledDeck.slice(0, Math.floor(deck.length / 2));
  computerDeck = shuffledDeck.slice(Math.floor(deck.length / 2), deck.length);

  // Update global variables with values
  playerCount = playerDeck.length;
  computerCount = computerDeck.length;
  discardCount = discardDeck.length;

  //! Call playTurn function. Player puts first card into discard pile, followed by computer
  // playTurn();
  console.log(playerDeck, computerDeck, discardDeck);
  playTurn();
  playTurn();
  playTurn();
  playTurn();
  playTurn();
  playTurn();

  // if (!myInterval) {
  //   myInterval = setInterval(playTurn, 2000);
  // }
};

const playTurn = () => {
  // while (playerCount > 0 && computerCount > 0) {
  turn++;

  if (turn === 1) {
    // for the first turn only
    currentCard = playerDeck.pop();
  } else {
    if (turn % 2 !== 0) {
      // on odd turns
      discardDeck.push(previousCard);
      previousCard = currentCard;
      currentCard = playerDeck.pop();
    } else {
      // on even turns
      discardDeck.push(previousCard);
      previousCard = currentCard;
      currentCard = computerDeck.pop();
    }
  }
  console.log("Turn", turn); // check turn number
  console.log("prev", previousCard, "current", currentCard); // check previous and current card
  console.log(
    // check remaining deck length
    "player length",
    playerCount,
    "computer length",
    computerCount,
    "discard length",
    discardCount
  );
};

const pauseGame = () => {
  clearInterval(myInterval);
  myInterval = null;
};

const checkConditions = () => {
  // code block - make simple condition
  // if prev card === current card (ie. value is the same)
  console.log("SNAP button clicked");
};

const main = () => {
  /*----- event listeners -----*/
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
  $(".start-game-button").on("click", startGame);
  // perhaps, there should be a resume game button in addition
  $(".pause-game-button").on("click", pauseGame);

  startGame();
};

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
