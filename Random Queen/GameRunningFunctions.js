//creates a shadow copy of the board
function shadowBoard(board){
  //make new 2d array
  let myArray = new Array(8);
  for (let i = 0; i < myArray.length; i++) {
    myArray[i] = new Array(8);
  }
  
  let shadowBoard = new Board(myArray);
  
  for(let file = 1; file < 9; file++){
    for(let rank = 1; rank < 9; rank++){
      let piece = board.getPiece(file, rank)
      let type = piece.type;
      if (piece.name == `Empty`){
        myArray[file-1][rank-1] = new Empty(file, rank, 0, type);
      }
      else if (piece.name == `Pawn`){
        myArray[file-1][rank-1] = new Pawn(file, rank, 0, type);
      }
      else if (piece.name == `Rook`){
        myArray[file-1][rank-1] = new Rook(file, rank, 0, type);
      }
      else if (piece.name == `Knight`){
        myArray[file-1][rank-1] = new Knight(file, rank, 0, type);
      }
      else if (piece.name == `Bishop`){
        myArray[file-1][rank-1] = new Bishop(file, rank, 0, type);
      }
      else if (piece.name == `Queen`){
        myArray[file-1][rank-1] = new Queen(file, rank, 0, type);
      }
      else if (piece.name == `King`){
        myArray[file-1][rank-1] = new King(file, rank, 0, type);
      }
    }
  }
  return shadowBoard
}


function checkAllowed(selectedX, selectedY, destinationX, destinationY){//is move valid, will cause check, etc
  
  let pieceName = board.getPiece(selectedX, selectedY).name;
  let curMove = {piece: pieceName, prevLoc: [selectedX,selectedY], curLoc: [destinationX,destinationY]};
  let piece = board.getPiece(selectedX, selectedY);
  let isValidMove = piece.isValidMove(curMove, board);
  let needsExternalMove = piece.needsExternalMove(curMove, board);
  let shadow = shadowBoard(board)
  let shadowPiece = shadow.getPiece(selectedX, selectedY);
  
  if (isValidMove && piece.type == board.turn){
    shadowPiece.executeMove(curMove, shadow);
    if(needsExternalMove){
      shadowPiece.executeExternalMove(curMove, shadow);
    }
  }
  
  if(board.turn == `White` && shadow.isInCheck(`Black`)){
    return false;
  }
  else if(board.turn == `Black` && shadow.isInCheck(`White`)){
    return false;
  }
  
  return true;
}

function playRound(selectedX, selectedY, destinationX, destinationY){
  
  let pieceName = board.getPiece(selectedX, selectedY).name;
  let curMove = {piece: pieceName, prevLoc: [selectedX,selectedY], curLoc: [destinationX,destinationY]};
  let piece = board.getPiece(selectedX, selectedY);
  let isValidMove = piece.isValidMove(curMove, board);
  let needsExternalMove = piece.needsExternalMove(curMove, board);
  let shadow = shadowBoard(board)
  let shadowPiece = shadow.getPiece(selectedX, selectedY);
  
  
  //execute move if legal & won't cause check
  if (isValidMove && piece.type == board.turn && checkAllowed(selectedX, selectedY, destinationX, destinationY)){
    piece.executeMove(curMove, board);
    board.allMoves.push(curMove);
    if(needsExternalMove){
      piece.executeExternalMove(curMove, board);
    }
  }
  
  if(board.turn == `White` && board.isInCheck(`Black`)){
    console.log(`White in check`);
    board.checkMoves.push(board.allMoves.length - 1);
    if(board.isInCheckMate(`White`)){
      console.log(`White has been checkmated!!!`);
      board.checkMateMoves.push(board.allMoves.length - 1);
      startMode = true;
    }
    else{
      console.log(`no checkmate`);
    }
  }
  else if(board.turn == `Black` && board.isInCheck(`White`)){
    console.log(`Black in check`);
    board.checkMoves.push(board.allMoves.length - 1);
    if(board.isInCheckMate(`Black`)){
      console.log(`Black has been checkmated!!!`);
      board.checkMateMoves.push(board.allMoves.length - 1);
      startMode = true;
    }
    else{
      console.log(`no checkmate`);
    }
  }
  
  else if(board.isInStaleMate(invType(board.turn))){
    console.log(board.turn, ` in stalemate`);
    board.staleMateMoves.push(board.allMoves.length - 1);
    startMode = true;
  }
}

function invType(type){//turns white to black and vice versa
  if(type == `Black`){
    return `White`
  }
  if(type == `White`){
    return `Black`
  }
}
function instantiate960(){ //returns array that can be used to make new Board
  //make new 2d array
  let myArray = new Array(8);
  for (let i = 0; i < myArray.length; i++) {
    myArray[i] = new Array(8);
  }
  //fill array with empty spaces
  for (let x = 0; x < myArray.length; x++){
    for (let y = 0; y < myArray.length; y++){
      myArray[x][y] = new Empty(x,y,0,`None`);
    }
  }
  
  let unavailableRanks = []; //Stores rank values of placed pieces.
  
  //King rank
  let kingRank = int(random(2,8)); //Kings can be places from files 2 (b) to 7 (g).
  
  //Rook ranks
  let rookOneRank = int(random(1, kingRank));
  let rookTwoRank = int(random(kingRank+1, 9));
  unavailableRanks.push(rookOneRank, rookTwoRank, kingRank);
  
  //Bishop ranks
  let bishopOneRank = int(random(1,9));
  while(unavailableRanks.includes(bishopOneRank))
  {
    //Randomly generates files until one not taken is found.
    bishopOneRank = int(random(1,9));
  }
  unavailableRanks.push(bishopOneRank);
  let bishopTwoRank = int(random(1,9));
  while(unavailableRanks.includes(bishopTwoRank) || (bishopOneRank % 2 == 0 && bishopTwoRank % 2 == 0)|| (bishopOneRank % 2 == 1 && bishopTwoRank % 2 == 1))
  {
    bishopTwoRank = int(random(1,9));
  }
  unavailableRanks.push(bishopTwoRank);
  
  //Queen rank
  let queenRank = int(random(1,9));
  while(unavailableRanks.includes(queenRank))
  {
    queenRank = int(random(1,9));
  }
  unavailableRanks.push(queenRank);
  
  //Knight ranks
  let knightOneRank = 0; let knightTwoRank = 0;
  for(let rank = 1; rank<9; rank++)
  {
    if(!(unavailableRanks.includes(rank)) && knightOneRank==0)
    {
       knightOneRank = rank;
    }
    else if(!(unavailableRanks.includes(rank)) && knightTwoRank==0)
    {
      knightTwoRank = rank;
    }
  }
  
  //add rooks
  myArray[rookOneRank-1][0] = new Rook(rookOneRank,1,0,`White`);
  myArray[rookTwoRank-1][0] = new Rook(rookTwoRank,1,0,`White`);
  myArray[rookTwoRank-1][7] = new Rook(rookTwoRank,8,0,`Black`);
  myArray[rookOneRank-1][7] = new Rook(rookOneRank,8,0,`Black`);
  //add pawns
  for(let k = 0; k < 8; k++){
    myArray[k][1] = new Pawn(k+1, 2, 0, 'White');
    myArray[k][6] = new Pawn(k+1, 7, 0, 'Black');
  }
  //add kings
  myArray[kingRank-1][0] = new King(kingRank,1,0,`White`);
  myArray[kingRank-1][7] = new King(kingRank,8,0,`Black`);
  
  //add queens
  myArray[queenRank-1][0] = new Queen(queenRank,1,0,`White`);
  myArray[queenRank-1][7] = new Queen(queenRank,8,0,`Black`);
  
  //add knights
  myArray[knightOneRank-1][0] = new Knight(knightOneRank,1,0,`White`);
  myArray[knightTwoRank-1][0] = new Knight(knightTwoRank,1,0,`White`);
  myArray[knightTwoRank-1][7] = new Knight(knightTwoRank,8,0,`Black`);
  myArray[knightOneRank-1][7] = new Knight(knightOneRank,8,0,`Black`);
  
  //add bishops
  myArray[bishopOneRank-1][0] = new Bishop(bishopOneRank,1,0,`White`);
  myArray[bishopTwoRank-1][0] = new Bishop(bishopTwoRank,1,0,`White`);
  myArray[bishopTwoRank-1][7] = new Bishop(bishopTwoRank,8,0,`Black`);
  myArray[bishopOneRank-1][7] = new Bishop(bishopOneRank,8,0,`Black`);
  
  return myArray;
}

function altInstantiateBoard(){ //for testing
  //make new 2d array
  let myArray = new Array(8);
  for (let i = 0; i < myArray.length; i++) {
    myArray[i] = new Array(8);
  }
  //fill array with empty spaces
  for (let x = 0; x < myArray.length; x++){
    for (let y = 0; y < myArray.length; y++){
      myArray[x][y] = new Empty(x,y,0,`None`);
    }
  }

  //add rooks
  myArray[7][0] = new Rook(8,1,0,`White`);
  myArray[0][0] = new Rook(1,1,0,`White`);
  myArray[0][7] = new Rook(1,8,0,`Black`);
  myArray[7][7] = new Rook(8,8,0,`Black`);
  //add pawns
  for(let k = 0; k < 8; k++){
    myArray[k][1] = new Pawn(k+1, 2, 0, 'White');
    myArray[k][6] = new Pawn(k+1, 7, 0, 'Black');
  }
  //add kings
  myArray[4][0] = new King(5,1,0,`White`);
  myArray[4][7] = new King(5,8,0,`Black`);
  
  //add queens
  myArray[3][0] = new Queen(4,1,0,`White`);
  myArray[3][7] = new Queen(4,8,0,`Black`);
  
  //add knights
  myArray[6][0] = new Knight(7,1,0,`White`);
  myArray[1][0] = new Knight(2,1,0,`White`);
  myArray[1][7] = new Knight(2,8,0,`Black`);
  myArray[6][7] = new Knight(7,8,0,`Black`);
  
  //add bishops
  myArray[5][0] = new Bishop(6,1,0,`White`);
  myArray[2][0] = new Bishop(3,1,0,`White`);
  myArray[2][7] = new Bishop(3,8,0,`Black`);
  myArray[5][7] = new Bishop(6,8,0,`Black`);
  
  return myArray;
}

function doFen(){
  const fen = input.value();
  board.fenToBoard(fen);
  console.log('fen');
}