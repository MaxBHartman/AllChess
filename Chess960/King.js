class King extends Piece{
  constructor(file, rank, moveCount, type){
    super(file, rank, moveCount, type);
    this.name = `King`;
  }
  
  isValidMove(move, board){
    if(this.isValidCastle(move, board)){
      return true;
    }
    if(abs(move.prevLoc[0]-move.curLoc[0]) >1 || 
       abs(move.prevLoc[1]-move.curLoc[1]) >1)
      return false;
    if(this.type == board.getPiece(move.curLoc[0],move.curLoc[1]).type)
      return false;
    return true;
  }
  
  getCastleDirection(move, board){
    if(move.curLoc[0] == 3 && move.curLoc[1] == 1){
      return `bottomLeft`;
    }
    else if(move.curLoc[0] == 7 && move.curLoc[1] == 1){
      return `bottomRight`;
    }
    else if(move.curLoc[0] == 3 && move.curLoc[1] == 8){
      return `topLeft`;
    }
    else if(move.curLoc[0] == 7 && move.curLoc[1] == 8){
      return `topRight`;
    }
    else{
      return `none`;
    }
  }
  
  isValidCastle(move, board){ 
    let attempt = this.getCastleDirection(move, board);
    if (attempt == `none`){
      return false;
    }
    
    //white castle
    if(this.type == `White`){
      if(this.rank == 1){
        let rightEnd = board.getPiece(8,1);
        let leftEnd = board.getPiece(1,1);
        
        if(attempt == `bottomRight` && rightEnd.name == `Rook`){
          if (rightEnd.moveCount == 0 && this.moveCount == 0){
            if(board.getPiece(7,1).name == `Empty` && board.getPiece(6,1).name == `Empty`){
              if(!board.isThreatened(5,1,`Black`)&& !board.isThreatened(7,1,`Black`) && !board.isThreatened(6,1,`Black`)){
                return true;
              }
            }
          }
        }
          
        if(attempt == `bottomLeft` && leftEnd.name == `Rook`){
          if (leftEnd.moveCount == 0 && this.moveCount == 0){
            if(board.getPiece(3,1).name == `Empty` && board.getPiece(2,1).name == `Empty`&& board.getPiece(4,1).name == `Empty`){
              if(!board.isThreatened(5,1,`Black`) && !board.isThreatened(4,1,`Black`) && !board.isThreatened(3,1,`Black`)){
                 return true;
                 }
            }
          }
        }
      }
    }
    
    
  //black castle
    if(this.type == `Black`){
      if(this.rank == 8){
        let rightEnd = board.getPiece(8,8);
        let leftEnd = board.getPiece(1,8);
        
        if(attempt == `topRight` && rightEnd.name == `Rook`){
          if (rightEnd.moveCount == 0 && this.moveCount == 0){
            if(board.getPiece(7,8).name == `Empty` && board.getPiece(6,8).name == `Empty`){
              if(!board.isThreatened(5,8,`White`)&& !board.isThreatened(7,8,`White`) && !board.isThreatened(6,8,`White`)){
                return true;
              }
            }
          }
        }
          
        if(attempt == `topLeft` && leftEnd.name == `Rook`){
          if (leftEnd.moveCount == 0 && this.moveCount == 0){
            if(board.getPiece(3,8).name == `Empty` && board.getPiece(2,8).name == `Empty`&& board.getPiece(4,8).name == `Empty`){
              if((!board.isThreatened(5,1,`White`) && !board.isThreatened(4,1,`White`) && !board.isThreatened(3,1,`White`))){
                return true;
              }
            }
          }
        }
      }
    }
    
    return false;
  }
  
  needsExternalMove(move, board){
    if (this.isValidCastle(move, board)){
      return true;
    }
    return false;
  }
  
  executeExternalMove(move, board){
    let direction = this.getCastleDirection(move, board);
    
    if (direction == `bottomLeft`){
      let rook = board.getPiece(1,1);
      let rookMove = {piece: `Rook`, prevLoc: [1,1], curLoc: [4,1]};
      rook.executeMove(rookMove, board);
    }
    if (direction == `bottomRight`){
      let rook = board.getPiece(8,1);
      let rookMove = {piece: `Rook`, prevLoc: [8,1], curLoc: [6,1]};
      rook.executeMove(rookMove, board);
    }
    if (direction == `topRight`){
      let rook = board.getPiece(8,8);
      let rookMove = {piece: `Rook`, prevLoc: [8,8], curLoc: [6,8]};
      rook.executeMove(rookMove, board);
    }
    if (direction == `topLeft`){
      let rook = board.getPiece(1,8);
      let rookMove = {piece: `Rook`, prevLoc: [1,8], curLoc: [4,8]};
      rook.executeMove(rookMove, board);
    }
    
    if(board.turn == `White`){
      board.turn = `Black`;
    }
    
    else if(board.turn == `Black`){
      board.turn = `White`;
    }
  }
  
  getAllMovesInRange(){//returns array with all THEORETICALLY reachable squares
    let file = this.file;
    let rank = this.rank;
    const moves = [];
    
    let leftOK = file > 1;
    let rightOK = file < 8;
    let upOK = rank < 8;
    let downOK = rank > 1;
    
    if(leftOK){
      moves.push([file-1,rank]);
    }
    if(rightOK){
      moves.push([file+1,rank]);
    }
    if(upOK){
      moves.push([file,rank+1]);
    }
    if(downOK){
      moves.push([file,rank-1]);
    }
    if(leftOK && upOK){
      moves.push([file - 1,rank + 1]);
    }
    if(leftOK && downOK){
      moves.push([file - 1,rank - 1]);
    }
    if(rightOK && upOK){
      moves.push([file + 1,rank + 1]);
    }
    if(rightOK && downOK){
      moves.push([file + 1,rank - 1]);
    }
    if(this.rank == 1){
      moves.push([3,1]);
      moves.push([7,1]);
    }
    if(this.rank == 8){
      moves.push([3,8])
      moves.push([7,8]);
    }
    return moves;
  }
}