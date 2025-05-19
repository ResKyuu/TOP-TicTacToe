const tictactoe = (function () {
  const gamePlayer = [];
  let currentPlayerIndex = -1;
  let turns = 0;
  let roundWin = false;

  const gameBoard = {
    Board: ["", "", "", "", "", "", "", "", ""],
  };

  const winningCombinations = {
    Rows: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    Columns: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ],
    Diagonal: [
      [0, 4, 8],
      [2, 4, 6],
    ],
  };

  function switchTurn() {
    if (gamePlayer.length === 2) {
      currentPlayerIndex = (currentPlayerIndex + 1) % 2;
      const nextPlayer = gamePlayer[currentPlayerIndex];

      const currenTurnText = document.querySelector("#currentTurnText");
      currenTurnText.innerText = `Current turn: ${nextPlayer.name}, ${nextPlayer.marker}`;

      console.log(`Turn switched. It is now ${nextPlayer.name}'s turn!`);
    }
  }
  const makeMove = (index) => {
    if (gamePlayer.length !== 2) {
      console.log(`Please register 2 players, before you start playing!`);
      return null;
    }
    const currentPlayer = gamePlayer[currentPlayerIndex];
    if (index < 0 || index >= gameBoard.Board.length) {
      console.log("Invalid Index! Choose from 0 - 8");
      return null;
    }

    if (gameBoard.Board[index] !== "") {
      console.log(
        `Cell ${index} is already taken by ${gameBoard.Board[index]}! Try again`
      );
      return null;
    }

    gameBoard.Board[index] = currentPlayer.marker;
    turns++;
    if (turns >= 5) {
      checkRoundWinner(currentPlayer);
    }

    if (roundWin === true) {
      roundWin = false;
      return;
    }

    if (turns === 9) {
      gameDraw();
      return;
    }

    switchTurn();
    console.log(gameBoard.Board);
  };

  function checkRoundWinner(currentPlayer) {
    winningCombinations.Rows.forEach((rowLine) => {
      console.log(rowLine);
      if (
        gameBoard.Board[rowLine[0]] === currentPlayer.marker &&
        gameBoard.Board[rowLine[1]] === currentPlayer.marker &&
        gameBoard.Board[rowLine[2]] === currentPlayer.marker
      ) {
        currentPlayer.giveScore();
        newRound();
        console.log(
          `${
            currentPlayer.name
          } has won the round! Players score is now: ${currentPlayer.getScore()}`
        );
        roundWin = true;
      }
    });

    winningCombinations.Columns.forEach((rowLine) => {
      console.log(rowLine);
      if (
        gameBoard.Board[rowLine[0]] === currentPlayer.marker &&
        gameBoard.Board[rowLine[1]] === currentPlayer.marker &&
        gameBoard.Board[rowLine[2]] === currentPlayer.marker
      ) {
        currentPlayer.giveScore();
        newRound();
        console.log(
          `${
            currentPlayer.name
          } has won the round! Players score is now: ${currentPlayer.getScore()}`
        );
        roundWin = true;
      }
    });

    winningCombinations.Diagonal.forEach((rowLine) => {
      console.log(rowLine);
      if (
        gameBoard.Board[rowLine[0]] === currentPlayer.marker &&
        gameBoard.Board[rowLine[1]] === currentPlayer.marker &&
        gameBoard.Board[rowLine[2]] === currentPlayer.marker
      ) {
        currentPlayer.giveScore();
        newRound();
        console.log(
          `${
            currentPlayer.name
          } has won the round! Players score is now: ${currentPlayer.getScore()}`
        );
        roundWin = true;
      }
    });
  }

  //Factory function to create the player objects
  function createPlayerFactory(name, marker) {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
    const resetScore = () => (score = 0);

    return {
      name,
      marker,
      score,
      getScore,
      giveScore,
      resetScore,
    };
  }

  //Add players to the game
  const addPlayer = (name, marker) => {
    if (gamePlayer.length >= 2) {
      console.log("Maximum of two players already added!");
      return null;
    }

    if (marker !== "X" && marker !== "O") {
      console.log("Invalid marker. Choose O or X");
      return null;
    }

    if (gamePlayer.length === 1) {
      if (gamePlayer[0].marker === marker) {
        console.log(
          `Marker ${marker} is already taken by ${gamePlayer[0].name}`
        );
        return null;
      }
    }

    const newPlayer = createPlayerFactory(name, marker);
    gamePlayer.push(newPlayer);
    console.log(
      `${newPlayer.name} has been registered with the marker ${newPlayer.marker}`
    );

    if (gamePlayer.length === 2) {
      currentPlayerIndex = 0;
      console.log(`\nBoth Players are registered. The game can now start!`);
      console.log(`${gamePlayer[currentPlayerIndex].name} will start.`);
    }
  };

  function getPlayers() {
    return [...gamePlayer];
  }

  function getGameBoard() {
    return [...gameBoard.Board];
  }

  function gameReset() {
    gamePlayer.length = 0;
    gameBoard.Board = ["", "", "", "", "", "", "", "", ""];
    currentPlayerIndex = -1;
    console.log(
      `The game has been reset. Please enter new Players and play again!`
    );
  }

  function gameDraw() {
    gameBoard.Board = ["", "", "", "", "", "", "", "", ""];
    currentPlayerIndex = 0;
    turns = 0;
    roundWin = false;
    console.log(`Game draw! Try again.`);
    updateFrontEndGameBoard();
  }

  function newRound() {
    turns = 0;
    currentPlayerIndex = 0;
    gameBoard.Board = ["", "", "", "", "", "", "", "", ""];
    updateFrontEndGameBoard();
  }

  function getCurrentPlayerIndex() {
    return currentPlayerIndex;
  }

  function updateFrontEndGameBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      const gameBoard = tictactoe.getGameBoard();
      cell.innerText = gameBoard[index];
    });
  }

  function updateFrontEndPlayerScore(currentPlayer) {}

  return {
    makeMove,
    addPlayer,
    getPlayers,
    getGameBoard,
    gameReset,
    getCurrentPlayerIndex,
  };
})();

/* HOW A GAME WORKS IN CONSOLE 

- 1: tictactoe.addPlayer("name", "marker"); \\ this adds the first player to the game.
- 2: tictactoe.addPlayer("name", "marker"); \\ this adds the second player to the game.
- 3: tictactoe.makeMove(position); \\ the first player starts by making a move at a position in the Board. After the turn is done it switches to the next player.
- 4: Just keep on playing until either of the 2 players has won or the game has turned into a draw.

! tictactoe.gameReset(); \\ Resets the entire game, needing to input new players etc.
*/

document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("dialog");

  if (dialog) {
    dialog.showModal();
  }

  const startGameBtn = document.getElementById("startGameBtn");

  startGameBtn.addEventListener("click", () => {
    const form = document.querySelector("form");
    const player1Name = document.querySelector("#player1Name");
    const player1MarkerX = document.querySelector("#player1MarkerX");
    const player1MarkerO = document.querySelector("#player1MarkerO");

    const player2Name = document.querySelector("#player2Name");
    const player2MarkerX = document.querySelector("#player2MarkerX");
    const player2MarkerO = document.querySelector("#player2MarkerO");

    if (
      (player1MarkerO.checked === true && player2MarkerO.checked === true) ||
      (player1MarkerX.checked === true && player2MarkerX.checked === true)
    ) {
      alert("Please use different Markers!");
      return;
    }

    //If player 1 takes marker X and player 2 takes marker O
    if (player1MarkerX.checked === true && player2MarkerO.checked === true) {
      if (player1Name.value === "" && player2Name.value === "") {
        // if no names were entered, defaults to Player 1 and Player 2
        tictactoe.addPlayer(`Player 1`, `${player1MarkerX.value}`);
        tictactoe.addPlayer(`Player 2`, `${player1MarkerO.value}`);
      }
      // if player 1 entered a name and player 2 hasn't
      else if (player1Name.value !== "" && player2Name.value === "") {
        tictactoe.addPlayer(`${player1Name.value}`, `${player1MarkerX.value}`);
        tictactoe.addPlayer(`Player 2`, `${player1MarkerO.value}`);
      }
      // if player 1 hasnt entered a name and player 2 has
      else if (player1Name.value === "" && player2Name.value !== "") {
        tictactoe.addPlayer(`Player 1`, `${player1MarkerX.value}`);
        tictactoe.addPlayer(`${player2Name.value}`, `${player1MarkerO.value}`);
      }
      // if both players have entered a name
      else {
        tictactoe.addPlayer(`${player1Name.value}`, `${player1MarkerX.value}`);
        tictactoe.addPlayer(`${player2Name.value}`, `${player1MarkerO.value}`);
      }
    }
    //Else if player 1 takes marker O and player 2 takes marker X
    else if (
      player1MarkerO.checked === true &&
      player2MarkerX.checked === true
    ) {
      if (player1Name.value === "" && player2Name.value === "") {
        // if no names were entered, defaults to Player 1 and Player 2
        tictactoe.addPlayer(`Player 1`, `${player1MarkerO.value}`);
        tictactoe.addPlayer(`Player 2`, `${player1MarkerX.value}`);
      }
      // if player 1 entered a name and player 2 hasn't
      else if (player1Name.value !== "" && player2Name.value === "") {
        tictactoe.addPlayer(`${player1Name.value}`, `${player1MarkerO.value}`);
        tictactoe.addPlayer(`Player 2`, `${player1MarkerX.value}`);
      }
      // if player 1 hasnt entered a name and player 2 has
      else if (player1Name.value === "" && player2Name.value !== "") {
        tictactoe.addPlayer(`Player 1`, `${player1MarkerO.value}`);
        tictactoe.addPlayer(`${player2Name.value}`, `${player1MarkerX.value}`);
      }
      // if both players have entered a name
      else {
        tictactoe.addPlayer(`${player1Name.value}`, `${player1MarkerO.value}`);
        tictactoe.addPlayer(`${player2Name.value}`, `${player1MarkerX.value}`);
      }
    } else {
      alert("Please select a marker for both players!");
      return;
    }

    //get and display player names and scores
    const allPlayers = tictactoe.getPlayers();

    const player1DisplayName = document.querySelector("#player1NameDisplay");
    const player2DisplayName = document.querySelector("#player2NameDisplay");
    const currenTurnText = document.querySelector("#currentTurnText");
    //Player X, Score: ...
    player1DisplayName.innerText = allPlayers[0].name;
    player2DisplayName.innerText = allPlayers[1].name;

    //Turn display
    currenTurnText.innerText = `Current turn: ${
      allPlayers[tictactoe.getCurrentPlayerIndex()].name
    }, ${allPlayers[tictactoe.getCurrentPlayerIndex()].marker}`;
    dialog.close();
  });

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    console.log(cell, index);

    cell.addEventListener("click", () => {
      tictactoe.makeMove(index);
      const gameBoard = tictactoe.getGameBoard();
      cell.innerText = gameBoard[index];
    });
  });
});

/* TODO
display player scores properly
styling for the gameboard markers
*/
