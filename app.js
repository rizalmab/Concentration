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
const startButton = $("#start-button");
const rulesButton = $("#rules-button");
const rulesBackButton = $("#rules-back-button");
const goButton = $("#go-button");
const snapButton = $("#snap-button");

/*----- functions -----*/
const showStartScreen = () => {
  $(".screen").hide();
  $("#start-screen").show();
};

const showInputScreen = () => {
  $(".screen").hide();
  $("#input-screen").show();
};

const showRulesScreen = () => {
  $(".screen").hide();
  $("#rules-screen").show();
};

const showGameScreen = () => {
  $(".screen").hide();
  $("#game-screen").show();
};

const checkConditions = () => {
  // code block - make simple condition
  // if prev card === current card (ie. value is the same)
  // const prevVal =

  const main = () => {};

  /*----- event listeners -----*/

  startButton.on("click", showInputScreen);
  rulesButton.on("click", showRulesScreen);
  rulesBackButton.on("click", showStartScreen);
  goButton.on("click", showGameScreen);
  snapButton.on("click", checkConditions);

  // $("h1").innerText("hello");
  // RENDER FUNCTION
  // things to render:
  // previous card
  // current card
  // computerCardCount
  // playerCardCount
  // discardPileCount
  // correct or wrong snap
};

$(main);
