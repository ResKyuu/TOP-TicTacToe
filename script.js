const tictactoe = (function () {
  const gamePlayer = [];
  let currentPlayerIndex = -1;

  const gameBoard = {
    Board: ["", "", "", "", "", "", "", "", ""],
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

    switchTurn();
    console.log(gameBoard.Board);
  };

  //Factory function to create the player objects
  function createPlayerFactory(name, marker) {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return {
      name,
      marker,
      getScore,
      giveScore,
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

  return { makeMove, addPlayer, getPlayers, getGameBoard };
})();

/*
TODO

Win Condition,
Draw Condition,
Game Reset
*/
