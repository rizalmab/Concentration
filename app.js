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

let turn = 0;
let turnResult;
let playTurnInterval;

const game = {
  turn: null, // whose turn is it
  winner: null, // who is the winner
  snap: null, // who snapped?
};

const player1 = {
  name: "Player 1",
  snapStatus: false,
  turnWinStatus: false,
  overallWinStatus: false,
  turn: false,
  deck: null,
};

const computer1 = {
  name: "Computer",
  snapStatus: false,
  turnWinStatus: false,
  overallWinStatus: false,
  turn: false,
  deck: null,
};

/*----- cached element references -----*/

/*----- functions -----*/

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

const setupDecks = () => {
  // define createDeck function
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

  // create deck of 52 cards
  const deck = createDeck();

  // shuffle deck of 52 cards
  const shuffledDeck = shuffleDeck(deck);

  // slice deck of 52 cards in 2 halves
  playerDeck = shuffledDeck.slice(0, Math.floor(deck.length / 2));
  computerDeck = shuffledDeck.slice(Math.floor(deck.length / 2), deck.length);
};

const startGame = () => {
  // function to run during first move of whole game
  setupDecks();
  playGame();
};

const playGame = () => {
  // function to be called during game, besides first turn
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

  // give % chance for computer to snap (ie. run postSnap function)
  if (checkConditions()) {
    // console.log("conditions are met");

    // computer will snap in 0.9 seconds (ie. run postSnap function)
    setTimeout(postSnapCom(), 900);
  } else {
    // computer will not snap
    // console.log("conditions not met");
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

const showResult = (user) => {
  // console.log("showResult function ran");
  // if (previousCard.value === currentCard.value) {

  // to stop function from returning error during first turn when previousCard is undefined
  if (typeof previousCard === "undefined") {
    return;
  }
  // print message based on conditions
  if (checkConditions()) {
    turnResult = `${user} snapped correctly! :)`;
    console.log(turnResult);
  } else {
    turnResult = `${user} snapped wrongly... :(`;
    console.log(turnResult);
  }
  //* Call render function
};

const addDiscardDeckTo = (deck) => {
  // console.log("clearDiscardDeck function called");

  // push all cards in discardDeck into loser's deck
  deck.push(...discardDeck);

  // clear discardDeck array back to zero elements
  discardDeck = [];

  console.log("loser's deck", deck, discardDeck);
};

const postSnapCom = () => {
  // console.log("snap pressed");
  showResult("Computer"); // show whether player/com snapped correctly
  addDiscardDeckTo(playerDeck); // add discardDeck to the loser's hand
  shuffleDeck(playerDeck); // shuffle the loser's deck
  setTimeout(playGame(), 5000); // resume the game
};

const postSnapPlayer = () => {
  // console.log("snap pressed");
  showResult("Player"); // show whether player/com snapped correctly
  addDiscardDeckTo(computerDeck); // add discardDeck to the loser's hand
  shuffleDeck(computerDeck); // shuffle the loser's deck
  setTimeout(playGame(), 5000); // resume the game
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
  $(".snap-button").on("click", postSnapPlayer);
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
