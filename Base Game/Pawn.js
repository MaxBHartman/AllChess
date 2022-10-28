class Pawn extends Piece{
  constructor(file, rank, moveCount, type){
    super(file, rank, moveCount, type);
    this.name = `Pawn`;
  }
  isPromotionMove(move, board)
  {
    if(move.curLoc[1]==1 || move.curLoc[1]==8)
    {
      return true;
    }
    return false;
  }
  isValidMove(move, board){
    
    //up one, white
    if (move.prevLoc[0] == move.curLoc[0] && move.prevLoc[1] + 1 == move.curLoc[1] && this.type == `White`){
      
      //check if blocked
      if(board.getPiece(move.curLoc[0], move.curLoc[1]).name == `Empty`){
        return true;
      }
      else{
        return false;
      }
    }
    
    //down one, black
    else if (move.prevLoc[0] == move.curLoc[0] && move.prevLoc[1] - 1 == move.curLoc[1] && this.type == `Black`){
      
      //check if blocked
      if(board.getPiece(move.curLoc[0], move.curLoc[1]).name == `Empty`){
        return true;
      }
      else{
        return false;
      }
    }
    
    //up two from 2nd rank, white
    else if (move.prevLoc[0] == move.curLoc[0] && move.prevLoc[1] + 2 == move.curLoc[1] && this.moveCount == 0){
      if(this.type == `White` && this.rank == 2){
        
        //check if blocked
        if(board.getPiece(move.curLoc[0], move.curLoc[1]).name == `Empty` && board.getPiece(move.curLoc[0], move.curLoc[1]-1).name == `Empty`){
          return true;
        }
        else{
          return false;
        }
      }
      
      else{
        return false;
      }
    }
    
    //down two from 7th rank, black
    else if (move.prevLoc[0] == move.curLoc[0] && move.prevLoc[1] - 2 == move.curLoc[1] && this.moveCount == 0){
      if(this.type == `Black` && this.rank == 7){
        //check if blocked
        if(board.getPiece(move.curLoc[0], move.curLoc[1]).name == `Empty` && board.getPiece(move.curLoc[0], move.curLoc[1]+1).name == `Empty`){
          return true;
        }
        else{
          return false;
        }
      }
      
      else{
        return false;
      }
    }
    
    //taking diag right, white
    else if (move.prevLoc[0] + 1 == move.curLoc[0] && move.prevLoc[1] + 1 == move.curLoc[1] && this.type == `White`){
      // check if spot is populated
      let piece = board.getPiece(move.curLoc[0],move.curLoc[1]);
      if(piece.name != `Empty` && piece.name != `King` && piece.type != this.type){
        return true;
      }
      else{
       return false;
      }
    }
    
    //taking diag right, black
    else if (move.prevLoc[0] - 1 == move.curLoc[0] && move.prevLoc[1] - 1 == move.curLoc[1] && this.type == `Black`){
      // check if spot is populated
      let piece = board.getPiece(move.curLoc[0],move.curLoc[1]);
      if(piece.name != `Empty` && piece.name != `King` && piece.type != this.type){
        return true;
      }
      else{
       return false;
      }
    }
      
    //taking diag left, white
    else if (move.prevLoc[0] - 1 == move.curLoc[0] && move.prevLoc[1] + 1 == move.curLoc[1] && this.type == `White`){
      // check if spot is populated
      let piece = board.getPiece(move.curLoc[0],move.curLoc[1]);
      if(piece.name != `Empty` && piece.name != `King` && piece.type != this.type){
        return true;
      }
      else{
       return false;
      }
    }
    
    //taking diag left, black
    else if (move.prevLoc[0] + 1 == move.curLoc[0] && move.prevLoc[1] - 1 == move.curLoc[1] && this.type == `Black`){
      //check if spot is populated
      let piece = board.getPiece(move.curLoc[0],move.curLoc[1]);
      if(piece.name != `Empty` && piece.name != `King` && piece.type != this.type){
        return true;
      }
      else{
       return false;
      }
    }
    
    //add en passant here later
    
    else{
      return false;
    }
  }
  
}
