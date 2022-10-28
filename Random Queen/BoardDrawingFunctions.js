function preload() {
  imgWhitePawn = loadImage('pieceSprites/whitepawn.png');
  imgWhiteKnight = loadImage('pieceSprites/whiteknight.png');
  imgWhiteBishop = loadImage('pieceSprites/whitebishop.png');
  imgWhiteRook = loadImage('pieceSprites/whiterook.png');
  imgWhiteQueen = loadImage('pieceSprites/whitequeen.png');
  imgWhiteKing = loadImage('pieceSprites/whiteking.png');
  
  imgBlackPawn = loadImage('pieceSprites/blackpawn.png');
  imgBlackKnight = loadImage('pieceSprites/blackknight.png');
  imgBlackBishop = loadImage('pieceSprites/blackbishop.png');
  imgBlackRook = loadImage('pieceSprites/blackrook.png');
  imgBlackQueen = loadImage('pieceSprites/blackqueen.png');
  imgBlackKing = loadImage('pieceSprites/blackking.png');
}

function mouseWheel(event){
  scrollPos += event.delta;
}

function mousePressed(){
  if(!startMode && mainBackground.inBounds(mouseX,mouseY)){
    selected = !selected;
    justClicked = true;
  }
  
  if(!startMode && !mainBackground.inBounds(mouseX,mouseY) && selected){
    selected = false;
  }
  
  //toggle between tabs
  if(movesTab.inBounds(mouseX,mouseY)){
    movesTab.draw()
    movesTab.showing = true;
    instructionsTab.showing = false;
    settingsTab.showing = false;
  }
  else if(instructionsTab.inBounds(mouseX,mouseY)){
    instructionsTab.draw()
    movesTab.showing = false;
    instructionsTab.showing = true;
    settingsTab.showing = false;
  }
  else if(settingsTab.inBounds(mouseX,mouseY)){
    settingsTab.draw()
    movesTab.showing = false;
    instructionsTab.showing = false;
    settingsTab.showing = true;
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

function setCursor(){
  let clicky = false;
  if(startMode){
    if (startButton.inBounds(mouseX,mouseY)){
      clicky = true;
    }
  }
  else{
    if(mainBackground.inBounds(mouseX,mouseY)){
      clicky = true;
    }
  }
  
  
  if(movesTab.inBounds(mouseX,mouseY) && !movesTab.showing){
    clicky = true;
  }
  if(instructionsTab.inBounds(mouseX,mouseY) && !instructionsTab.showing){
    clicky = true;
  }
  if(settingsTab.inBounds(mouseX,mouseY) && !settingsTab.showing){
    clicky = true;
  }
  
  if(clicky){
    cursor(`grab`);
  }
  
  else{
    cursor();
  }
}