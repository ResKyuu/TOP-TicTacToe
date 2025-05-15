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
  }

  function newRound() {
    turns = 0;
    currentPlayerIndex = 0;
    gameBoard.Board = ["", "", "", "", "", "", "", "", ""];
  }

  return { makeMove, addPlayer, getPlayers, getGameBoard, gameReset };
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
    dialog.close();
  });
});

/* TODO
- Check dialog name input fields
- Add fields for the marker the user can choose
- Check that both users have not chosen the same marker
- Initiliaze the players after press of the start game button
- Have the HTML gameboard display the actual contents of the gameBoard array
- Make entire user interactive game logic
*/
