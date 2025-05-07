const tictactoe = (function () {
  const gameBoard = {
    Board: ["", "", "", "", "", "", "", "", ""],
  };

  const makeMove = (index, marker) => {
    if (index >= 0 && index < gameBoard.Board.length) {
      gameBoard.Board[index] = marker;
    } else {
      console.log("Invalid Index! Choose from 0 - 8");
    }
  };

  return { gameBoard, makeMove };
})();

function createPlayer(name, marker) {
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

/*
TODO

Get All player,
Win Condition,
Draw Condition,
Turn Management,
Input Validation - Checking if a cell has already been taking
Game Reset
*/
