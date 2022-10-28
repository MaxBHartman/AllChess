class Pawn extends Piece {
  constructor(file, rank, moveCount, type) {
    super(file, rank, moveCount, type);
    this.name = `Pawn`;
  }
  isValidMove(move, board) {
    let deltaX = abs(move.curLoc[0] - move.prevLoc[0]);
    if (this.isReachable(move)) {
      let target = board.getPiece(move.curLoc[0], move.curLoc[1]);
      if (deltaX > 0) {
        if (
          target.name != `King` &&
          target.name != `Empty` &&
          target.type != this.type
        ) {
          return true;
        } else {
          //en passant
          let lastMove;
          if (board.allMoves.length > 0) {
            lastMove = board.allMoves[board.allMoves.length - 1];
          } else {
            return false;
          }
          if (lastMove.piece == `Pawn`) {
            if (lastMove.curLoc[0] == move.curLoc[0]) {
              if (abs(lastMove.curLoc[1] - lastMove.prevLoc[1]) == 2) {
                if (
                  this.type == `White` &&
                  lastMove.curLoc[1] + 1 == move.curLoc[1]
                ) {
                  return true;
                }
                if (
                  this.type == `Black` &&
                  lastMove.curLoc[1] - 1 == move.curLoc[1]
                ) {
                  return true;
                }
              }
            }
          }

          return false;
        }
      } else {
        if (target.name == `Empty` && !this.isPathBlocked(move, board)) {
          return true;
        }
      }
    }
    return false;
  }

  needsExternalMove(move, board) {
    if (move.curLoc[0] != move.prevLoc[0]) {
      let target = board.getPiece(move.curLoc[0], move.curLoc[1]);
      if (target.name == `Empty`) {
        //must be en passant
        return true;
      }
    }
    return false;
  }

  executeExternalMove(move, board) {
    if (this.type == `Black`) {
      board.twoDArray[this.file - 1][this.rank] = new Empty(
        this.file,
        this.rank + 1,
        0,
        `None`
      );
    } else if (this.type == `White`) {
      board.twoDArray[this.file - 1][this.rank - 2] = new Empty(
        this.file,
        this.rank - 1,
        0,
        `None`
      );
    }
  }

  isReachable(move) {
    //does not account for blocking, etc
    let x = move.prevLoc[0];
    let deltaX = move.curLoc[0] - move.prevLoc[0];
    let deltaY = move.curLoc[1] - move.prevLoc[1];

    //double
    if (
      deltaX == 0 &&
      ((deltaY == 2 && this.type == `White` && this.rank == 2) ||
        (deltaY == -2 && this.type == `Black` && this.rank == 7))
    ) {
      return true;
    }

    //regular
    else if (
      deltaX == 0 &&
      ((deltaY == 1 && this.type == `White`) ||
        (deltaY == -1 && this.type == `Black`))
    ) {
      return true;
    }

    //taking
    else if (
      abs(deltaX) == 1 &&
      ((deltaY == 1 && this.type == `White`) ||
        (deltaY == -1 && this.type == `Black`))
    ) {
      if (x + deltaX > 0 && x + deltaX < 9) {
        return true;
      }
    }

    return false;
  }

  getAllMovesInRange() {
    //returns array with all THEORETICALLY reachable squares
    let file = this.file;
    let rank = this.rank;
    const moves = [];

    if (this.type == `White`) {
      moves.push([file, rank + 1]);
      moves.push([file - 1, rank + 1]);
      moves.push([file + 1, rank + 1]);
      if (this.rank == 2) {
        moves.push([file, rank + 2]);
      }
    } else if (this.type == `Black`) {
      moves.push([file, rank - 1]);
      moves.push([file - 1, rank - 1]);
      moves.push([file + 1, rank - 1]);
      if (this.rank == 7) {
        moves.push([file, rank - 2]);
      }
    }
    return moves;
  }

  isPromotionMove(move, board) {
    if (move.curLoc[1] == 1 || move.curLoc[1] == 8) {
      return true;
    }
    return false;
  }
}
