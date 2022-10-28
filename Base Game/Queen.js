
class Queen extends Piece{
  constructor(file, rank, moveCount, type){
    super(file, rank, moveCount, type);
    this.name = `Queen`;

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
  
  getAllValidMoves(board){//returns array with all reachable squares
    
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
    
    else if(abs(deltaX/deltaY) == 1){
      return true;
    }
    return false;
  }
  
  getAllMovesInRange(){//returns array with all THEORETICALLY reachable squares
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
    
    //up right
    for(let t = 1; t < min(9-file,9-rank); t++){
      moves.push([file + t,rank + t]);
    }
    
    //down left
    for(let t = 1; t < min(file,rank); t++){
      moves.push([file - t,rank - t]);
    }
    
    //up left
    for(let t = 1; t < min(file, 9-rank); t++){
      moves.push([file - t,rank + t]);
    }
    
    //down right
    for(let t = 1; t < min(9-file,rank); t++){
      moves.push([file + t,rank - t]);
    }
    console.log(`start`)
    for(let i = 0; i< moves.length; i++){
      console.log(moves[i])
    }
    return moves;
  }
}