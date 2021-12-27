/*----- constants -----*/
let prevVal, currentVal;
/*----- app's state (variables) -----*/
let playerCardCount = 26;
let computerCardCount = 26;
let discardPileCount = 0;
/*----- cached element references -----*/
/*----- functions -----*/

const main = () => {
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
  };

  /*----- event listeners -----*/

  //When click 'start game' button
  $("#start-button").on("click", showInputScreen);

  // On click of 'rules' button
  $("#rules-button").on("click", showRulesScreen);

  // On click of 'back' button on Rules page
  $("#rules-back-button").on("click", showStartScreen);

  // On click of 'go' button after typing name
  $("#go-button").on("click", showGameScreen);

  // On click of 'snap' button
  // on click, do function: check conditions for correct snap, change variables (cards)
  $("#snap-button").on("click", checkConditions);

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
