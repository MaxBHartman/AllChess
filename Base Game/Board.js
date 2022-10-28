class Board{
  constructor(twoDArray, turn, allMoves){
    this.twoDArray = twoDArray;
    this.turn = "White";
    this.allMoves = [];
  }
  
  printBoard(){ //for convenience
    let transposedArray = this.twoDArray[0].map((_, colIndex) => this.twoDArray.map(row => row[colIndex]));
    
    for(let y = this.twoDArray.length - 1; y >= 0; y--){
      console.log(transposedArray[y])
    }
  }
  
  getPiece(file,rank){ //also for convenience
    return this.twoDArray[file - 1][rank - 1];
    //bcuz arrays start from 0
  }
  
  isInCheckMate(type){
    let opposingType;
    if (type == `White`){
      opposingType = `Black`;
    }
    
    else if (type == `Black`){
      opposingType = `White`;
    }
    
    //step 1: locate the king
    let king;
    for(let file = 1; file < 9; file++){
      for(let rank = 1; rank < 9; rank++){
        let piece = this.getPiece(file,rank);
        if(piece.name == `King` && piece.type == type){
          king = piece;
        }
      }
    }
    
    //step 2: return false if king not under attack
    if(!this.isThreatened(king.file, king.rank, opposingType)){
      return false;
    }
    
    //step 3: move king in all directions. return false if king can move or take 
    //have to remove the king first:
    this.twoDArray[king.file-1][king.rank-1] = new Empty(king.file,king.rank,0,`none`);
    
    for(let file = max(king.file-1,1); file < min(king.file+2,9); file++){
      for(let rank = max(king.rank-1,1); rank < min(king.rank+2,9); rank++){
        let testMove = {piece: king.name, prevLoc: [king.file, king.rank], curLoc: [file, rank]};
        if(king.isValidMove(testMove,this) && !this.isThreatened(file, rank, opposingType)){
          console.log(`failed first checkmate test`);
          console.log(`King can move to`, file, rank);
          //replace the king:
          this.twoDArray[king.file-1][king.rank-1] = king;
          return false;
        }
      }
    }
    
    //replace the king:
    this.twoDArray[king.file-1][king.rank-1] = king;
    
    console.log(`passed first checkmate test (movement)`)
    
    //step 4: return true if more than 1 piece is checking king
    let attackers = this.getPiecesAttackingKing(opposingType);
    if (attackers.length > 1){
      return true;
    }
    if (attackers.length == 0){//this should never happen
      return false;
    }
        
    //step 5: else, return true if threatening piece is knight or pawn
    let attacker = attackers[0];
    console.log(`attacker:`, attacker.name, attacker. type)
    if (attacker.name == `Knight`){
      return true;
    }
    if (attacker.name == `Pawn`){
      return true;
    }
    
    //step 6: else, identify all squares along the path from threatening piece to king
    let attackMove = {piece: attacker.name, prevLoc: [attacker.file, attacker.rank], curLoc: [king.file, king.rank]}
    const squares = attacker.getPath(attackMove, this);
    
    
    //step 7: search thru all pieces of opp color and see if they can be moved into one of the identified squares
    //return false as soon as a block is found
    for(let file = 1; file < 9; file++){
      for(let rank = 1; rank < 9; rank++){
        let testPiece = this.getPiece(file,rank);
        for(const square of squares){
          if(testPiece.type == type){
            let testMove = {piece: testPiece.name, prevLoc: [file,rank], curLoc: [square[0], square[1]]}
            if(testPiece.isValidMove(testMove,this) && testPiece.name != `King`){
              console.log(`failed 2nd test (blockable)`)
              console.log(`potential move:`, testMove.piece, testMove.prevLoc, `-->`, testMove.curLoc)
              return false;
            }
          }
        }
      }
    }
        
    //step 8: return true
    console.log(`passed 2nd test (blockable)`)
    return true;
  }
  
  //figure out some way to deal with castling for isThreatened and isInCheck, if necessary
  
  //determines whether a square is threatened by pieces of a certain color
  isThreatened(file, rank, opposingType){
    //locate square
    let piece = this.getPiece(file,rank);
    
    //empty square
    this.twoDArray[file - 1][rank - 1] = new Empty(file,rank,0,`None`);
    
    //check if any opp piece can move to square
    for(let x = 1; x < 9; x++){
      for(let y = 1; y < 9; y++){
        let testPiece = this.getPiece(x,y);
        let testMove = {piece: testPiece.name, prevLoc: [x,y], curLoc: [file, rank]};
        
        if(testPiece.type == opposingType){
          //does it still count in case where `attacking` piece is pinned or would be moving into check?
          //i hope it does
          //i have words for whoever invented this awful game
          if(testPiece.isValidMove(testMove,this)){
            //unempty square
            this.twoDArray[file-1][rank-1] = piece;
            return true;
          }
        }
      }
    }
    //if not, still replace the piece and return false
    this.twoDArray[file-1][rank-1] = piece;
    return false;
  }
  
  isInCheck(opposingType){//returns true or false
    //find king
    let king;
    for(let file = 1; file < 9; file++){
      for(let rank = 1; rank < 9; rank++){
        let piece = this.getPiece(file,rank);
        if(piece.name == `King` && piece.type != opposingType){
          king = piece;
        }
      }
    }
    return this.isThreatened(king.file, king.rank, opposingType);
  }
  
  
  //returns array with the pieces threatening the king or 'none'
  getPiecesAttackingKing(opposingType){
    const attackers = [];
    let type;
    
    if(opposingType == `White`){
      type = `Black`;
    }
    
    if(opposingType == `Black`){
      type = `White`;
    }
    
    //locate king
    let king;
    for(let file = 1; file < 9; file++){
      for(let rank = 1; rank < 9; rank++){
        let piece = this.getPiece(file,rank);
        if(piece.name == `King` && piece.type == type){
          king = piece;
        }
      }
    }
    
    //remove king
    this.twoDArray[king.file-1][king.rank-1] = new Empty(king.file, king.rank, 0, `None`);
    
    //check if any opposing piece can move to king's former spot
    for(let file = 1; file < 9; file++){
      for(let rank = 1; rank < 9; rank++){
        let testPiece = this.getPiece(file,rank);
        let testMove = {piece: testPiece.name, prevLoc: [file,rank], curLoc: [king.file, king.rank]}
        
        if(testPiece.type ==  opposingType){
          if(testPiece.isValidMove(testMove,this)){
            attackers.push(testPiece);
          }
        }
      }
    }
    
    //replace the king and return the array
    this.twoDArray[king.file-1][king.rank-1] = king;
    return attackers;
  }
}