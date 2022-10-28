/**
 * Knight Class - subclass of Piece
 *
 * @author Nathan Liu
 * @version May 27, 2022
 */

class Knight extends Piece {
  constructor(file, rank, moveCount, type) {
    super(file, rank, moveCount, type);
    this.name = `Knight`;
  }

  isValidMove(move, board) {
    if (this.isValidDestination(move, board)) {
      if (this.isReachable(move)) {
        if (!this.isPathBlocked(move, board)) {
          return true;
        }
      }
    }
    return false;
  }

  isReachable(move) {
    let deltaX = abs(move.curLoc[0] - move.prevLoc[0]);
    let deltaY = abs(move.curLoc[1] - move.prevLoc[1]);
    if ((deltaX == 2 && deltaY == 1) || (deltaX == 1 && deltaY == 2)) {
      return true;
    }
    return false;
  }

  getAllMovesInRange() {
    //returns array with all THEORETICALLY reachable squares
    let file = this.file;
    let rank = this.rank;
    const moves = [];

    if (file + 1 < 9 && rank + 2 < 9) {
      moves.push([file + 1, rank + 2]);
    }
    if (file + 1 < 9 && rank - 2 > 0) {
      moves.push([file + 1, rank - 2]);
    }
    if (file - 1 > 0 && rank + 2 < 9) {
      moves.push([file - 1, rank + 2]);
    }
    if (file - 1 > 0 && rank - 2 > 0) {
      moves.push([file - 1, rank + -2]);
    }

    if (file + 2 < 9 && rank + 1 < 9) {
      moves.push([file + 2, rank + 1]);
    }
    if (file + 2 < 9 && rank - 1 > 0) {
      moves.push([file + 2, rank - 1]);
    }
    if (file - 2 > 0 && rank + 1 < 9) {
      moves.push([file - 2, rank + 1]);
    }
    if (file - 2 > 0 && rank - 1 > 0) {
      moves.push([file - 2, rank - 1]);
    }
    return moves;
  }
}
