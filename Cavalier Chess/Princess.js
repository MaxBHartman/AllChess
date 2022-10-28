class Princess extends Piece {
  constructor(file, rank, moveCount, type) {
    super(file, rank, moveCount, type);
    this.name = `Princess`;
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
    if (deltaX == 0 || deltaY == 0) {
      return false;
    } 
    else if (abs(deltaX / deltaY) == 1) {
      return true;
    }
    else if ((abs(deltaX) == 2 && abs(deltaY) == 1) || (abs(deltaX) == 1 && abs(deltaY) == 2)) {
      return true;
    }
    return false;
  }

  getAllMovesInRange() {
    //returns array with all THEORETICALLY reachable squares
    let file = this.file;
    let rank = this.rank;
    const moves = [];

    //up right
    for (let t = 1; t < min(9 - file, 9 - rank); t++) {
      moves.push([file + t, rank + t]);
    }

    //down left
    for (let t = 1; t < min(file, rank); t++) {
      moves.push([file - t, rank - t]);
    }

    //up left
    for (let t = 1; t < min(file, 9 - rank); t++) {
      moves.push([file - t, rank + t]);
    }

    //down right
    for (let t = 1; t < min(9 - file, rank); t++) {
      moves.push([file + t, rank - t]);
    }
    
    //knight moves
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
