/**
 * Knight Class - subclass of Piece
 * 
 * @author Nathan Liu
 * @version May 27, 2022
 */

class Knight extends Piece {
  constructor(file, rank, moveCount, type){
    super(file, rank, moveCount, type);
    this.name = `Knight`;
  }

  isValidMove(move, board) {
    var fileGap = Math.abs(move.prevLoc[0] - move.curLoc[0]);
    var rankGap = Math.abs(move.prevLoc[1] - move.curLoc[1]);
  
    if(!((fileGap == 2 && rankGap == 1) || (fileGap == 1 && rankGap == 2))) {
      return false;
    }
    
    if(this.type != board.getPiece(move.curLoc[0], move.curLoc[1]).type) {
      return true;
    }
    return false;
  }
}