class Piece {
  constructor(file, rank, moveCount, type){
    this.file = file;
    this.rank = rank;
    this.moveCount = moveCount;
    this.type = type;
  }
  
  executeMove(move,board){
    if(this.name == `Pawn` && this.isPromotionMove(move, board))
    {
      console.log(`Is promotion move!`)
      board.twoDArray[move.prevLoc[0] - 1][move.prevLoc[1] - 1] = new Empty(move.prevLoc[0],move.prevLoc[1],0,"None");
      //This part needs to be updated to allow the user to pick the type of the promoted piece.
      board.twoDArray[move.curLoc[0] - 1][move.curLoc[1] - 1] = new Queen(move.curLoc[0], move.curLoc[1], 0,this.type);
    }
    else
      {
        

    //replace old spot with Empty
    board.twoDArray[move.prevLoc[0] - 1][move.prevLoc[1] - 1] = new Empty(move.prevLoc[0],move.prevLoc[1],0,"None");
    
    //replace new spot with current Pawn
    board.twoDArray[move.curLoc[0] - 1][move.curLoc[1] - 1] = this;
      }
    board.moveCount++;
    if(board.moveCount % 5 == 0)
    {
      console.log(board.moveCount);
      let randomFile = int(random(1,9));
      let randomRank = int(random(1,9));
      
      while(board.getPiece(randomFile, randomRank).name == `Empty`)
      {
        randomFile = int(random(1,9));
        randomRank = int(random(1,9));
      }
      board.twoDArray[randomFile-1][randomRank-1] = new Queen(randomFile,randomRank,0, board.getPiece(randomFile, randomRank).type);
    }
    
    //change file
    this.file = move.curLoc[0];
    
    //change rank
    this.rank = move.curLoc[1];
    
    this.moveCount++;
    
    if(board.turn == `White`){
      board.turn = `Black`;
    }
    
    else if(board.turn == `Black`){
      board.turn = `White`;
    }
  }
  needsExternalMove(move, board){
    return false;
  }
  
  isValidDestination(move, board){//not same color or king
    let target = board.getPiece(move.curLoc[0], move.curLoc[1]);
    if(target.type != this.type && target.name != `King`){
      return true;
    }
    return false;
  }
  
  getPath(move){
    //returns an array with all the moves along the path
    //does not include curLoc or prevLoc
    
    let startingX = move.prevLoc[0];
    let startingY = move.prevLoc[1];
    let finalX = move.curLoc[0];
    let finalY = move.curLoc[1];
    let deltaX = finalX - startingX;
    let deltaY = finalY - startingY;
    
    const path = [[startingX, startingY]];
    
    if(move.piece == `Knight`){
      return path;
    }
    
    //to avoid errors
    if(deltaX == 0 && deltaY == 0){
      return path;
    }
    
    //vertical move
    if(deltaX == 0){
      let polarity = deltaY/abs(deltaY);
      for(let i = 1; i < abs(deltaY); i++){
        path.push([startingX, startingY + polarity * i]);
      }
      return path;
    }
    
    //horizontal move
    else if(deltaY == 0){
      let polarity = deltaX/abs(deltaX);
      for(let i = 1; i < abs(deltaX); i++){
        path.push([startingX + polarity * i, startingY])
      }
      return path;
    }
      
      //diagonal right move
    else if(deltaX == deltaY){
      let polarity = deltaX / abs(deltaX)
      for(let i = 1; i < abs(deltaX); i++){
        path.push([startingX + i * polarity, startingY + i * polarity]);
      }
      return path;
    }
    
    //diagonal left move
    else if(deltaX == -1 * deltaY){
      let polarity = deltaX / abs(deltaX)
      for(let i = 1; i < abs(deltaX); i++){
        path.push([startingX + i * polarity, startingY - i * polarity])
      }
      return path;
    }
    return path;
  }
  
  isPathBlocked(move, board){
    let path = this.getPath(move);
    if (path.length == 1){
      return false;
    }
    for(let i = 1; i < path.length; i++){
      if(board.getPiece(path[i][0],path[i][1]).name != `Empty`){
        return true;
      }
    }
    return false;
  }
  
  getAllValidMoves(board){//returns array with all reachable squares
    const inRange = this.getAllMovesInRange();
    const validMoves = [];
    
    for(let i = 0; i < inRange.length; i++){
      let testMove = {piece: this.name, prevLoc: [this.file,this.rank], curLoc: [inRange[i][0],inRange[i][1]]};
      if(this.isValidMove(testMove,board)){
        validMoves.push(testMove.curLoc);
      }
    }
    return validMoves;
  }

}