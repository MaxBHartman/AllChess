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

function playRound(selectedX, selectedY, destinationX, destinationY){
  
  let pieceName = board.getPiece(selectedX, selectedY).name;
  let curMove = {piece: pieceName, prevLoc: [selectedX,selectedY], curLoc: [destinationX,destinationY]};
  let piece = board.getPiece(selectedX, selectedY);
  let isValidMove = piece.isValidMove(curMove, board);
  let needsExternalMove = piece.needsExternalMove(curMove, board);
  let shadow = shadowBoard(board)
  let shadowPiece = shadow.getPiece(selectedX, selectedY);
  
  //check if move will result in check using shadowBoard
  if (isValidMove && piece.type == board.turn){
    shadowPiece.executeMove(curMove, shadow);
    if(needsExternalMove){
      shadowPiece.executeExternalMove(curMove, shadow);
    }
  }
  
  let willCauseCheck = false;
  if(board.turn == `White` && shadow.isInCheck(`Black`)){
    willCauseCheck = true;
  }
  else if(board.turn == `Black` && shadow.isInCheck(`White`)){
    willCauseCheck = true;
  }
  
  //execute move if legal & won't cause check
  if (isValidMove && piece.type == board.turn && !willCauseCheck){
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

function instantiateBoard(){ //returns array that can be used to make new Board
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
  //add pawns
  for(let k = 0; k < 8; k++){
    myArray[k][1] = new Pawn(k+1, 2, 0, 'White');
    myArray[k][6] = new Pawn(k+1, 7, 0, 'Black');
  }
  
  let whiteRankOrder = getRankOrder(); let blackRankOrder = getRankOrder();
  //In order: rook1, rook2, knight1, knight2, queen, king, bishop1, bishop2
  //add rooks
  myArray[whiteRankOrder[0]-1][0] = new Rook(whiteRankOrder[0],1,0,`White`);
  myArray[whiteRankOrder[1]-1][0] = new Rook(whiteRankOrder[1],1,0,`White`);
  myArray[blackRankOrder[0]-1][7] = new Rook(blackRankOrder[0],8,0,`Black`);
  myArray[blackRankOrder[1]-1][7] = new Rook(blackRankOrder[1],8,0,`Black`);
  
  //add kings
  myArray[whiteRankOrder[5]-1][0] = new King(whiteRankOrder[5],1,0,`White`);
  myArray[blackRankOrder[5]-1][7] = new King(blackRankOrder[5],8,0,`Black`);
  
  //add queens
  myArray[whiteRankOrder[4]-1][0] = new Queen(whiteRankOrder[4],1,0,`White`);
  myArray[blackRankOrder[4]-1][7] = new Queen(blackRankOrder[4],8,0,`Black`);
  
  //add knights
  myArray[whiteRankOrder[2]-1][0] = new Knight(whiteRankOrder[2],1,0,`White`);
  myArray[whiteRankOrder[3]-1][0] = new Knight(whiteRankOrder[3],1,0,`White`);
  myArray[blackRankOrder[2]-1][7] = new Knight(blackRankOrder[2],8,0,`Black`);
  myArray[blackRankOrder[3]-1][7] = new Knight(blackRankOrder[3],8,0,`Black`);
  
  //add bishops
  myArray[whiteRankOrder[6]-1][0] = new Bishop(whiteRankOrder[6],1,0,`White`);
  myArray[whiteRankOrder[7]-1][0] = new Bishop(whiteRankOrder[7],1,0,`White`);
  myArray[blackRankOrder[6]-1][7] = new Bishop(blackRankOrder[6],8,0,`Black`);
  myArray[blackRankOrder[7]-1][7] = new Bishop(blackRankOrder[7],8,0,`Black`);
  
  return myArray;
}

function getRankOrder()
{
  let rankOrder = []; //In order: rook1, rook2, knight1, knight2, queen, king, bishop1, bishop2
  let unavailableRanks = []; //Stores rank values of placed pieces.
  
  //King rank
  rankOrder[5] = int(random(2,8)); //Kings can be places from files 2 (b) to 7 (g).
  
  //Rook ranks
  rankOrder[0] = int(random(1, rankOrder[5]));
  rankOrder[1] = int(random(rankOrder[5]+1, 9));
  unavailableRanks.push(rankOrder[0], rankOrder[1], rankOrder[5]);
  
  //Bishop ranks
  rankOrder[6] = int(random(1,9));
  while(unavailableRanks.includes(rankOrder[6]))
  {
    //Randomly generates files until one not taken is found.
    rankOrder[6] = int(random(1,9));
  }
  unavailableRanks.push(rankOrder[6]);
  rankOrder[7] = int(random(1,9));
  
  while(unavailableRanks.includes(rankOrder[7]) || (rankOrder[6] % 2 == 0 && rankOrder[7] % 2 == 0)|| (rankOrder[6] % 2 == 1 && rankOrder[7] % 2 == 1))
  {
    rankOrder[7] = int(random(1,9));
  }
  unavailableRanks.push(rankOrder[7]);
  
  //Queen rank
  rankOrder[4] = int(random(1,9));
  while(unavailableRanks.includes(rankOrder[4]))
  {
    rankOrder[4] = int(random(1,9));
  }
  unavailableRanks.push(rankOrder[4]);
  
  //Knight ranks
  rankOrder[2] = 0; rankOrder[3] = 0;
  for(let rank = 1; rank<9; rank++)
  {
    if(!(unavailableRanks.includes(rank)) && rankOrder[2]==0)
    {
       rankOrder[2] = rank;
    }
    else if(!(unavailableRanks.includes(rank)) && rankOrder[3]==0)
    {
      rankOrder[3] = rank;
    }
  }
  return rankOrder;
}


function doFen(){
  console.log('fen');
}