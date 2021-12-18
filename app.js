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

const main = () => {
  //When click 'start game' button
  $("#start-button").on("click", showInputScreen);

  // On click of 'rules' button
  $("#rules-button").on("click", showRulesScreen);

  // On click of 'back' button on Rules page
  $("#rules-back-button").on("click", showStartScreen);

  // On click of 'go' button after typing name
  $("#go-button").on("click", showGameScreen);

  // RENDER FUNCTION
};

$(main);
