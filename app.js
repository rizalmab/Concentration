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
let discardDeck = [];

// Current and previous cards
let previousCard, currentCard;

// Card counts
//* Don't use card count variables but instead use length property of decks
// let playerCount, computerCount, discardCount;

let turn = 0;
let turnResult;
let playTurnInterval;

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

  // slice deck of 52 cards in 2 halves
  playerDeck = shuffledDeck.slice(0, Math.floor(deck.length / 2));
  computerDeck = shuffledDeck.slice(Math.floor(deck.length / 2), deck.length);

  // call playTurn function every 2 seconds
  if (!playTurnInterval) {
    playTurnInterval = setInterval(playTurn, 1000);
  }
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
      if (typeof previousCard !== "undefined") {
        discardDeck.push(previousCard);
      } // to avoid pushing undefined previous card during the second turn into the discardDeck
      previousCard = currentCard;
      currentCard = playerDeck.pop();
    } else {
      // on even turns
      if (typeof previousCard !== "undefined") {
        discardDeck.push(previousCard);
      } // to avoid pushing undefined previous card during the second turn into the discardDeck
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
    computerDeck.length,
    "discard length",
    discardDeck.length
  );
};

const pauseGame = () => {
  clearInterval(playTurnInterval);
  playTurnInterval = null;
};

const checkConditions = () => {
  // console.log("check conditions ran");

  // stops function from returning error during first turn as previous card is undefined
  if (typeof previousCard === "undefined") {
    return;
  }
  // check if condition is met
  // if (previousCard.value === currentCard.value) {
  //   console.log("condition met");
  // } else {
  //   console.log("condition NOT met");
  // }
  if (previousCard.value === currentCard.value) {
    return true;
  } else {
    return false;
  }
};

const showResult = () => {
  // console.log("showResult function ran");
  // if (previousCard.value === currentCard.value) {

  // to stop function from being called during first turn when previousCard is undefined
  if (typeof previousCard === "undefined") {
    return;
  }
  // print message based on conditions
  if (checkConditions()) {
    turnResult = "Player snapped correctly! :)";
    console.log(turnResult);
  } else {
    turnResult = "Player snapped wrongly... :(";
    console.log(turnResult);
  }
  //* Call render function
};

const clearDiscardDeck = () => {
  console.log("clearDiscardDeck function called");
  // push all cards in discardDeck into loser's deck
  playerDeck.push(...discardDeck);

  // clear discardDeck array back to zero elements
  discardDeck = [];

  console.log(playerDeck, discardDeck);
};

const postSnap = () => {
  // console.log("snap pressed");
  showResult();
  clearDiscardDeck();
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
  $(".snap-button").on("click", postSnap);
  $(".start-game-button").on("click", startGame);
  // perhaps, there should be a resume game button in addition
  $(".pause-game-button").on("click", pauseGame);

  // startGame();
  // console.log(playerDeck, computerDeck, discardDeck);
  // console.log(
  //   // check remaining deck length
  //   "player length",
  //   playerDeck.length,
  //   "computer length",
  //   computerDeck.length,
  //   "discard length",
  //   discardDeck.length
  // )
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
