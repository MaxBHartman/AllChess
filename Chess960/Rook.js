
class Rook extends Piece{
  constructor(file, rank, moveCount, type){
    super(file, rank, moveCount, type);
    this.name = `Rook`;
  }
  
  isValidMove(move, board){
    if(this.isValidDestination(move,board)){
      if(this.isReachable(move)){
        if(!this.isPathBlocked(move,board)){
           return true;
        }
      }
    }
    return false;
  }
  
  isReachable(move){
    let deltaX = move.curLoc[0] - move.prevLoc[0];
    let deltaY = move.curLoc[1] - move.prevLoc[1];
    if(deltaX == 0 && deltaY == 0){
      return false;
    }
    else if(deltaX == 0 || deltaY == 0){
      return true;
    }
    return false;
  }
  
  getAllMovesInRange(){//returns array with all theoretically reachable squares
    let file = this.file;
    let rank = this.rank;
    const moves = [];
    
    //horizontal
    for(let x = 1; x < 9; x++){
      moves.push([x,rank]);
    }
    
    //vertical
    for(let y = 1; y < 9; y++){
      moves.push([file,y]);
    }
    return moves;
  }
  
}