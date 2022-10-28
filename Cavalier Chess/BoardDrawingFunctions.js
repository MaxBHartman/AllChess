function preload() {
  imgWhitePawn = loadImage('pieceSprites/whitepawn.png');
  imgWhiteKnight = loadImage('pieceSprites/whiteknight.png');
  imgWhiteBishop = loadImage('pieceSprites/whitebishop.png');
  imgWhiteRook = loadImage('pieceSprites/whiterook.png');
  imgWhiteQueen = loadImage('pieceSprites/whitequeen.png');
  imgWhiteKing = loadImage('pieceSprites/whiteking.png');
  imgWhiteCavalier = loadImage('pieceSprites/whitecavalier.png');
  imgWhitePrincess = loadImage('pieceSprites/whiteprincess.png');
  imgWhiteEmpress = loadImage('pieceSprites/whiteempress.png');
  imgWhiteNightrider = loadImage('pieceSprites/whitenightrider.png');
  
  
  imgBlackPawn = loadImage('pieceSprites/blackpawn.png');
  imgBlackKnight = loadImage('pieceSprites/blackknight.png');
  imgBlackBishop = loadImage('pieceSprites/blackbishop.png');
  imgBlackRook = loadImage('pieceSprites/blackrook.png');
  imgBlackQueen = loadImage('pieceSprites/blackqueen.png');
  imgBlackKing = loadImage('pieceSprites/blackking.png');
  imgBlackCavalier = loadImage('pieceSprites/blackcavalier.png');
  imgBlackPrincess = loadImage('pieceSprites/blackprincess.png');
  imgBlackEmpress = loadImage('pieceSprites/blackempress.png');
  imgBlackNightrider = loadImage('pieceSprites/blacknightrider.png');
}

function mouseWheel(event){
  scrollPos += event.delta;
}

function drawSidebar(){
  let scrollOn = false;
  let scrollAdjustment = 0;
  let blockAdjustment = 0;
  let num = board.allMoves.length + 1;

  if(num > 8){
    scrollOn = true;
  }
  if(scrollOn){
    scrollAdjustment = scrollPos;
    if(scrollAdjustment > 0){
      scrollPos = 0;
      scrollAdjustment = 0;
    }
    if(scrollAdjustment < -50 * (num - 8)){
      scrollPos = -50 * (num - 8);
      scrollAdjustment = -50 * (num - 8);
    }
    blockAdjustment = num - 8;
  }
    
  push();
  
  fill(200);
  rectMode(CORNERS);
  noStroke();
  rect(410,0,610,400);
  fill(`black`);
  text("Moves", 420, 30 - scrollAdjustment - 50*blockAdjustment);
  for(let i = 0; i < board.allMoves.length; i++){
    let move = board.allMoves[i];
    if(i % 2 == 0){
      fill(`white`);
      rect(410, 50 * (i+1 - blockAdjustment) - scrollAdjustment, 610, 50 * (i+2 - blockAdjustment) - scrollAdjustment);
      fill(`black`);
    }
    else{
      fill(`black`);
      rect(410, 50 * (i+1 - blockAdjustment) - scrollAdjustment, 610, 50 * (i+2 - blockAdjustment) - scrollAdjustment);
      fill(`white`);
    }
    textSize(14);
    text(move.piece + " (" + move.prevLoc + ") -> (" + move.curLoc + ")", 410, 50 * (i + 1 - blockAdjustment) + 25  - scrollAdjustment);
    
    if(board.checkMateMoves.indexOf(i) != -1){
      text(board.turn + ` has been checkmated!`, 410, 50 * (i + 1 - blockAdjustment) + 45  - scrollAdjustment);
    }
    
    else if(board.checkMoves.indexOf(i) != -1){
      text(board.turn + ` is in check!`, 410, 50 * (i + 1 - blockAdjustment) + 45  - scrollAdjustment);
    }
    else if(board.staleMateMoves.indexOf(i) != -1){
      text(`Stalemate!`, 410, 50 * (i + 1 - blockAdjustment) + 45  - scrollAdjustment);
    }
  }
  pop();
}


function mousePressed(){
  if(!startMode){
    selected = !selected;
    justClicked = true;
  }
  
  let xLwrBound = startButton.centerX - startButton.xRadius;
  let xUprBound = startButton.centerX + startButton.xRadius;
  let yLwrBound = startButton.centerY - startButton.yRadius;
  let yUprBound = startButton.centerY + startButton.yRadius;
  
  if(startMode && mouseX < xUprBound && mouseX > xLwrBound && mouseY < yUprBound && mouseY > yLwrBound){
    board = new Board(altInstantiateBoard());
    startMode = false;
  }
}