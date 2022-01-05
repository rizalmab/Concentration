describe("Navigation between pages", () => {
  it("Enters name input into game page", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.contains("Start game").click();
    cy.get("#input-name").type("Rizal");
    cy.get("#go-button").click();
    cy.get("#player-name").should("contain", "Rizal");
  });
  it("Enters the rules page and back returns to starting page", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.contains("Rules").click();
    cy.get("#rules-back-button").click();
  });
});

describe("Playing the game", () => {
  it("start-game button starts the game", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.contains("Start game").click();
    cy.get("#go-button").click();
    cy.get(".start-game-button").click();
  });
  it("pause-game button pauses the game", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.contains("Start game").click();
    cy.get("#go-button").click();
    cy.get(".start-game-button").click();
    cy.get(".pause-game-button").click();
  });
  it("When snap button is pressed, result message appears", () => {
    cy.visit(
      "http://127.0.0.1:5500/index.html?previouscard=jack&currentcard=jack"
    );
    cy.contains("Start game").click();
    cy.get("#go-button").click();
    cy.get(".start-game-button").click();
    cy.get(".snap-button").click();
    // cy.contains("snap");
    // cy.get(".turn-result-message").should("have.text", "snap");

    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());
    // console.table(params);
  });
});

// http://127.0.0.1:5500/index.html?previouscard=jack&currentcard=jack
