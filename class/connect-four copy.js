const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    Screen.addCommand('up', 'move cursor up', this.cursor.up);
    Screen.addCommand('down', 'move cursor down', this.cursor.down);
    Screen.addCommand('left', 'move cursor left', this.cursor.left);
    Screen.addCommand('right', 'move cursor up', this.cursor.right);

    Screen.addCommand('p', 'show position', () => {
      console.log(`Row: ${this.cursor.row}, Column: ${this.cursor.col}`)
      let row = this.cursor.row;
      let col = this.cursor.col;
      console.log("\nValue: " + this.grid[row][col]);
    });

    Screen.addCommand('x', "place 'X' at the current spot", () => {
      let row = this.cursor.row; let col = this.cursor.col;
      let spot = this.grid[row][col];

      if (spot === " ") {
      this.grid[row][col] = 'X';

      Screen.setGrid(row, col, "X")
      Screen.setTextColor(row, col, "blue")
      Screen.render();

      console.log( `You placed an X!`);

      let winner = ConnectFour.checkWin(this.grid);
        if (winner) {
          ConnectFour.endGame(winner)
        }
      }
    });

    Screen.addCommand('o', "place 'O' at the current spot", () => {
      let row = this.cursor.row; let col = this.cursor.col;
      let spot = this.grid[row][col];

      if (spot === " ") {
        this.grid[row][col] = 'O';

        Screen.setGrid(row, col, "O");
        Screen.setTextColor(row, col, "red");
        Screen.render();

        console.log( `You placed an O!`);

        let winner = ConnectFour.checkWin(this.grid);
        if (winner) {
          ConnectFour.endGame(winner)
        }
      }
    });



    this.cursor.setBackgroundColor();
    Screen.render();
  }


  static numRows(grid) {
    return grid.length;
  }

  static numCols(grid) {
    return grid[0].length;
  }

  static checkRow(grid) {

  }


  static checkWin(grid) {

    let xCount = 0;
    let oCount = 0;

    //rows
    for (let i1 = 0; i1 < ConnectFour.numRows(grid); i1++) {
      let row = grid[i1];

      for (let i2 = 0; i2 < ConnectFour.numCols(grid); i2++) {
        if (row[i2] === 'X') {
          xCount++;
          if (xCount === 4) {return 'X'}
        } else {
          xCount = 0;
        }

        if (row[i2] === 'O') {
          oCount++;
          if (oCount === 4) {return 'O'}
        } else {
          oCount = 0;
        }
      }

    xCount = 0; oCount = 0;
    }

    //columns
    for (let i1 = 0; i1 < ConnectFour.numCols(grid); i1++) {

      for (let i2 = 0; i2 < ConnectFour.numRows(grid); i2++) {
        if (grid[i2][i1] === 'X') {
          xCount++;
          if (xCount === 4) {return 'X'}
        } else {
          xCount = 0;
        }

        if (grid[i2][i1] === 'O') {
          oCount++;
          if (oCount === 4) {return 'O'}
        } else {
          oCount = 0;
        }
      }

    xCount = 0; oCount = 0;
    }

    //horizontal downwards
    let iCount;

    for (let r = 0; r < ConnectFour.numRows(grid); r++) {

      for (let tl = 0; tl < ConnectFour.numRows(grid); tl++) {
        iCount = r;

        for (let i1 = tl; i1 < ConnectFour.numCols(grid); i1++) {

        if (grid[iCount][i1] === "X") {
          xCount++;
          if (xCount === 4) {return "X"}
        } else {
          xCount = 0;
        }

       if (grid[iCount][i1] === "O") {
          oCount++;
          if (oCount === 4) {return "O"}
        } else {
          oCount = 0;
        }

        if (iCount < ConnectFour.numRows(grid) - 1) { iCount++ }
      }

      xCount = 0; oCount = 0;
      }
    }


  // horizontal upwards

    for (let r = ConnectFour.numRows(grid) - 1; r >= 0 ; r--) {

      for (let bl = 0; bl < ConnectFour.numRows(grid); bl++) {
        iCount = r;

        for (let i1 = bl; i1 < ConnectFour.numCols(grid); i1++) {

        if (grid[iCount][i1] === "X") {
          xCount++;
          if (xCount === 4) {return "X"}
        } else {
          xCount = 0;
        }

       if (grid[iCount][i1] === "O") {
          oCount++;
          if (oCount === 4) {return "O"}
        } else {
          oCount = 0;
        }

        if (iCount > 0) { iCount-- }
      }

      xCount = 0; oCount = 0;
      }
    }


    //checking for a tie
    let count = 0;

    grid.forEach( row => {
      row.forEach (spot => {
        if (spot === 'X' || spot === "O") {count += 1}
      });
    });

    if (count === ConnectFour.numCols(grid) * ConnectFour.numRows(grid)) {return "T"}

    //if all else fails
    return false;

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;


//const test = new ConnectFour();
