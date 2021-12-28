// Every 2 seconds, a card is put down
// Play a turn every 2 seconds (ie. call playTurn function every 2 seconds)

let playerCount, computerCount, discardCount; // counts
let playerDeck, computerDeck; // card decks
let previousCard, currentCard; // matching cards
let turn = 0; // turn count

const startGame = () => {
  // call playTurn function every ? interval
  // update the Counts variables
  // stop the interval (clearInterval) when SNAP button is clicked (or computer presses SNAP). Else, continue putting down cards.
};

// while (playerDeck.length > 0 && computerDeck.length > 0) {}

const playTurn = () => {
  turn++;
  discardCount++;
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
};

const printHello = () => {
  console.log("hello");
};

const myInterval = setInterval(printHello, 1000);
clearInterval(myInterval);
