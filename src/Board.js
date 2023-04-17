import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


function Board({ nrows, ncols, chanceLightStartsOn }) {

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  const createBoard = (rows, columns) => {
    let chanceTrue = parseFloat(chanceLightStartsOn);
    const randomTrueFalse = () => Boolean(Math.random() < 0.25);
    //Initializes new new array
    let initialBoard = [];
    for(let i = 0; i < rows; i++){
      initialBoard.push(new Array(columns).fill(null).map(() => randomTrueFalse()))
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  const [board, setBoard] = useState(createBoard(nrows, ncols));

  function hasWon() {
    const checkBoard = new Set(board)
    if(checkBoard.size === 1){
      return true
    } else {
      return false
    }
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell( y, x, boardCopy);
      flipCell( y, x - 1, boardCopy);
      flipCell( y, x + 1, boardCopy);
      flipCell( y - 1,x, boardCopy);
      flipCell( y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  console.log(board)
  // TODO 

  if( hasWon() === true ){
    return (
    <div>
      <p>YOU WON</p>
    </div>
    )
  }else {
    let tableBoard = [];
    for(let y = 0; y < nrows; y++){
      let row = [];
      for(let x = 0; x < ncols; x++){
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={evt => flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(<tr key={y}>{row}</tr>)
    }
    return (
      <table className="Board">
        <tbody>{tableBoard}</tbody>
      </table>
    )
  }
  // make table board

  // TODO
}

export default Board;
