/*----- constants -----*/
class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
}

const RANKS = [
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

// time-related variables
const turnResultDisappearDelay = 500; // used in render function
const computerSnapTime = 1400; // used in playTurn
const playTurnTime = 1500; // used in playGame function
const resumeGameTime = 2000; // used in postSnapCom and postSnapPlayer functions

// other variables
let turn = 0;
let turnResult;
let playTurnInterval;

let game = {
  turn: null, // whose turn is it
  winner: null, // who is the winner
  snap: null, // who snapped?
  playerName: null, // from the input box
  level: 1,
};

/*----- cached element references -----*/

/*----- functions -----*/

const shuffleDeck = (array) => {
  //* This code was copied from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
      for (const value of RANKS) {
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
  if (turn === 0) {
    // only before the game starts (ie. turn 0), call setupDecks
    setupDecks();
  }
  playGame();
};

const playGame = () => {
  // function to be called during game, besides first turn
  // call playTurn function every 2 seconds
  if (!playTurnInterval) {
    playTurnInterval = setInterval(playTurn, playTurnTime);
  }
};

const playTurn = () => {
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
  if (checkConditions() && game.snap !== "player") {
    // console.log("conditions are met");

    // computer will snap in certain amount of time (ie. run postSnap function)
    setTimeout(postSnapCom, computerSnapTime);
  } else {
    // computer will not snap
    // console.log("conditions not met");
  }

  game.snap = null;
  postWin();
  render();
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
  if (game.level === "1") {
    if (previousCard.rank === currentCard.rank) {
      return true;
    } else {
      return false;
    }
  } else if (game.level === "2") {
    if (
      previousCard.rank === currentCard.rank ||
      previousCard.suit === currentCard.suit
    ) {
      return true;
    } else {
      return false;
    }
  }
};

const updateTurnResult = (user) => {
  // console.log("showResult function ran");
  // if (previousCard.value === currentCard.value) {

  // to stop function from returning error during first turn when previousCard is undefined
  if (typeof previousCard === "undefined") {
    return;
  }
  // print message based on conditions
  if (checkConditions()) {
    turnResult = `${user} snapped correctly! :)`;
    // console.log(turnResult);
  } else {
    turnResult = `${user} snapped wrongly... :(`;
    // console.log(turnResult);
  }
  return turnResult;
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

  if (game.snap === "player") {
    return;
  }

  game.snap = "computer"; // assign snap to "computer"

  updateTurnResult("Computer"); // show whether player/com snapped correctly
  $(".turn-result-message").text(turnResult);

  // based on whether snap was correct or not, add discard deck to user's deck
  if (checkConditions()) {
    // if computer snapped correctly
    addDiscardDeckTo(playerDeck);
    shuffleDeck(playerDeck);
  } else {
    // if computer snapped wrongly
    addDiscardDeckTo(computerDeck);
    shuffleDeck(computerDeck);

    setTimeout(playGame, resumeGameTime); // resume the game after a period of time
  }
};

const postSnapPlayer = () => {
  // console.log("snap pressed");

  game.snap = "player"; // assign snap to "player"

  updateTurnResult("Player"); // show whether player/com snapped correctly

  $(".turn-result-message").text(turnResult); // display the turnResult (global) immediately

  // based on whether snap was correct or not, add discard deck to user's deck
  if (checkConditions()) {
    // if player snapped correctly
    addDiscardDeckTo(computerDeck);
    shuffleDeck(computerDeck);
  } else {
    // if player snapped wrongly
    addDiscardDeckTo(playerDeck);
    shuffleDeck(playerDeck);
  }
  setTimeout(playGame(), resumeGameTime); // resume the game after some time
};

const returnSuit = (obj) => {
  if (obj.suit === "♠") {
    return "spades";
  } else if (obj.suit === "♥") {
    return "hearts";
  } else if (obj.suit === "♦") {
    return "diams";
  } else if (obj.suit === "♣") {
    return "clubs";
  }
};

const updateSuitClassPrevious = (elem) => {
  // If object in previousCard/currentCard slot has value of [x] , toggleClass so that it contains class of [x]
  const lastClass = elem.attr("class").split(" ").pop();

  if (turn === 1) {
    return;
  } else {
    elem.removeClass(lastClass);
    elem.addClass(returnSuit(previousCard));
  }
};

const updateSuitClassCurrent = (elem) => {
  // If object in previousCard/currentCard slot has value of [x] , toggleClass so that it contains class of [x]
  const lastClass = elem.attr("class").split(" ").pop();

  elem.removeClass(lastClass);
  elem.addClass(returnSuit(currentCard));
};

const postWin = () => {
  // when length is 0
  if (computerDeck.length === 0) {
    // // Hide the game screen
    $("#game-screen").css("display", "none");

    // Display the post game screen with the text message
    $("#post-game-screen").css("display", "block");
    $("#post-game-result-message").text(
      "You lost to the computer. Better luck next time!"
    );
    // stop loop. Ie. stop interval
    pauseGame();
  } else if (playerDeck.length === 0) {
    // Hide the game screen
    $("#game-screen").css("display", "none");

    // Display the post game screen with the text message
    $("#post-game-screen").css("display", "block");
    $("#post-game-result-message").text("You won! Congratulations!");

    // stop loop. Ie. stop interval
    pauseGame();
  }
};

const resetGame = () => {
  playerDeck = [];
  computerDeck = [];
  previousCard = null;
  currentCard = null;
  turn = 0;
  game = {
    turn: null, // whose turn is it
    winner: null, // who is the winner
    snap: null, // who snapped?
    playerName: null, // from the input box
    level: 1,
  };
  $(".computer-count").text(26);
  $(".player-count").text(26);
  $(".discard-count").text(0);
  $(".previous-card-rank").text("");
  $(".previous-card-suit").text("");
  $(".current-card-rank").text("");
  $(".current-card-suit").text("");
  const lastClassPrev = $("#previous-card-container")
    .attr("class")
    .split(" ")
    .pop();
  $("#previous-card-container").removeClass(lastClassPrev);
  $("#previous-card-container").addClass("placeholder-suit");
  const lastClassCurr = $("#current-card-container")
    .attr("class")
    .split(" ")
    .pop();
  $("#current-card-container").removeClass(lastClassCurr);
  $("#current-card-container").addClass("placeholder-suit");
  $(".turn-result-message").text("");
};

const render = () => {
  // previous card
  if (turn !== 1) {
    // to avoid error as previousCard is undefined in turn 1
    $(".previous-card-rank").text(previousCard.rank);
    $(".previous-card-suit").text(previousCard.suit);
  }
  // current card
  $(".current-card-rank").text(currentCard.rank);
  $(".current-card-suit").text(currentCard.suit);

  // computerCardCount
  $(".computer-count").text(computerDeck.length);

  // playerCardCount
  $(".player-count").text(playerDeck.length);

  // discardPileCount
  $(".discard-count").text(discardDeck.length);

  // turnResult message (ie. who snapped and whether they snapped correctly or wrongly)
  const clearTurnResult = () => {
    $(".turn-result-message").text(""); // clear the turnResult innerHTML (front-end)
    turnResult = ""; // clear the turnResult variable back to "" (back-end)
  };
  // $(".turn-result-message").text(turnResult); // display the turnResult (global) immediately
  setTimeout(clearTurnResult, turnResultDisappearDelay); // clear the turnResult message after some delay;

  updateSuitClassPrevious($("#previous-card-container"));
  updateSuitClassCurrent($("#current-card-container"));

  // To check turn number, previousCard, currentCard, length of different decks, turnResult
  console.log("Turn", turn); // check turn number
  console.log("prev", previousCard, "current", currentCard); // check previous and current card
  console.log(
    // check remaining deck length
    "player length",
    playerDeck.length,
    "computer length",
    computerDeck.length,
    "discard length",
    discardDeck.length,
    "total cards in-game",
    playerDeck.length + computerDeck.length + discardDeck.length + 2, // 2 is for previous and current cards
    "turn result",
    turnResult,
    "prevCard classList",
    $("#previous-card-container").attr("class").split(/\s+/),
    "currentCard classList",
    $("#current-card-container").attr("class").split(/\s+/)
  );
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
  $("#go-button").on("click", () => {
    $(".screen").hide();
    $("#game-screen").show();
    game.playerName = $("#input-name").val(); // save the name input into a variable
    $("#player-name").text(game.playerName);
    game.level = $("#select-level").val(); // save the level input into a variable
    render();
  });
  $("#back-to-start-button").on("click", () => {
    $(".screen").hide();
    $("#start-screen").show();
  });
  $(".snap-button").on("click", postSnapPlayer);
  $(".start-game-button").on("click", startGame);
  $(".pause-game-button").on("click", pauseGame);
  $(".restart-game-button").on("click", () => {
    $(".screen").hide();
    $("#input-screen").show();
    resetGame();
  });
};

$(main);
