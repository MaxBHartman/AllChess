class Nightrider extends Piece {
  constructor(file, rank, moveCount, type) {
    super(file, rank, moveCount, type);
    this.name = `Nightrider`;
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
    let deltaX = move.curLoc[0] - move.prevLoc[0];
    let deltaY = move.curLoc[1] - move.prevLoc[1];
    if (abs(deltaY / deltaX) == 2 || abs(deltaX / deltaY) == 2) {
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
      if (file + 2 < 9 && rank + 4 < 9) {
        moves.push([file + 2, rank + 4]);
        if (file + 3 < 9 && rank + 6 < 9) {
          moves.push([file + 3, rank + 6]);
        }
      }
    }
    if (file + 1 < 9 && rank - 2 > 0) {
      moves.push([file + 1, rank - 2]);
      if (file + 2 < 9 && rank - 4 > 0) {
        moves.push([file + 2, rank - 4]);
        if (file + 3 < 9 && rank - 6 > 0) {
          moves.push([file + 3, rank - 6]);
        }
      }
    }
    if (file - 1 > 0 && rank + 2 < 9) {
      moves.push([file - 1, rank + 2]);
      if (file - 2 > 0 && rank + 4 < 9) {
        moves.push([file - 2, rank + 4]);
        if (file - 3 > 0 && rank + 6 < 9) {
          moves.push([file - 3, rank + 6]);
        }
      }
    }
    if (file - 1 > 0 && rank - 2 > 0) {
      moves.push([file - 1, rank + -2]);
      if (file - 2 > 0 && rank - 4 > 0) {
        moves.push([file - 2, rank - 4]);
        if (file - 3 > 0 && rank - 6 > 0) {
          moves.push([file - 3, rank - 6]);
        }
      }
    }

    if (file + 2 < 9 && rank + 1 < 9) {
      moves.push([file + 2, rank + 1]);
      if (file + 4 < 9 && rank + 2 < 9) {
        moves.push([file + 4, rank + 2]);
        if (file + 6 < 9 && rank + 3 < 9) {
          moves.push([file + 6, rank + 3]);
        }
      }
    }
    if (file + 2 < 9 && rank - 1 > 0) {
      moves.push([file + 2, rank - 1]);
      if (file + 4 < 9 && rank - 2 > 0) {
        moves.push([file + 4, rank - 2]);
        if (file + 6 < 9 && rank - 3 > 0) {
          moves.push([file + 6, rank - 3]);
        }
      }
    }
    if (file - 2 > 0 && rank + 1 < 9) {
      moves.push([file - 2, rank + 1]);
      if (file - 4 > 0 && rank + 2 < 9) {
        moves.push([file - 4, rank + 2]);
        if (file - 6 > 0 && rank + 3 < 9) {
          moves.push([file - 6, rank + 3]);
        }
      }
    }
    if (file - 2 > 0 && rank - 1 > 0) {
      moves.push([file - 2, rank - 1]);
      if (file - 4 > 0 && rank - 2 > 0) {
        moves.push([file - 4, rank - 2]);
        if (file - 6 > 0 && rank - 3 > 0) {
          moves.push([file - 6, rank - 3]);
        }
      }
    }
    return moves;
  }
}
