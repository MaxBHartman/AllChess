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

function drawBackground(){
  push();
  rectMode(CORNERS);
  noStroke();
  fill(236, 218, 185);
  let flip = true;
  rect(0, 0, 50, 50);
  for(let x = 0; x < 400; x+=50){
    for(let y = 0; y < 400; y+=50){
      if (flip){
        fill(236, 218, 185);
      }
      else{
        fill(174, 138, 104);
      }
      rect(x, y, x + 50, y + 50);
      flip = !flip;
    }
    flip = !flip
  }
  
  fill(`White`);
  rect(400,0,410,400);
  rect(0,400,410,410);
  pop();
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

function markReachable(){
  let piece = board.getPiece(selectedX, selectedY);
  let squares = piece.getAllValidMoves(board);
  for(let i = 0; i < squares.length; i++){
    let x = squares[i][0];
    let y = squares[i][1];
    push();
    squareColor = color(240, 240, 60);
    squareColor.setAlpha(100);
    noStroke();
    fill(squareColor);
    rectMode(CORNERS);
    rect(50 * (x - 1), 50 * (8 - y), 50 * x, 50 * (9 - y));
    pop();
  }
}

function getSquareFile(xCoord){
  let file = Math.floor(xCoord / 50) + 1;
  if (file > 8){
    file = 8;
  }
  if (file < 1){
    file = 1;
  }
  return file;
}

function getSquareRank(yCoord){
  let rank = 8 - Math.floor(yCoord / 50);
  if (rank > 8){
    rank = 8;
  }
  if (rank < 1){
    rank = 1;
  }
  return rank;
}

function getCenterXCoord(squareFile){
  return 50 * (squareFile - 1) + 25;
}

function getCenterYCoord(squareRank){
  return 50 * (8 - squareRank) + 25;
}

function drawRedBorder(file,rank){
  push();
  strokeWeight(4);
  stroke(`red`);
  noFill();
  rectMode(CORNERS);
  rect(50 * (file - 1), 50 * (8 - rank), 50 * file, 50 * (9 - rank));
  pop();
}

function drawGreenBorder(file,rank){
  push();
  strokeWeight(4);
  stroke(`green`);
  noFill();
  rectMode(CORNERS);
  rect(50 * (file - 1), 50 * (8 - rank), 50 * file, 50 * (9 - rank));
  pop();
}

function drawYellowBorder(file,rank){
  push();
  strokeWeight(4);
  stroke(`yellow`);
  noFill();
  rectMode(CORNERS);
  rect(50 * (file - 1), 50 * (8 - rank), 50 * file, 50 * (9 - rank));
  pop();
}

function colorOnHover(){
  let pieceName = board.getPiece(selectedX, selectedY).name;
  let curMove = {piece: pieceName, prevLoc: [selectedX,selectedY], curLoc: [getSquareFile(mouseX),getSquareRank(mouseY)]};
  let piece = board.getPiece(selectedX, selectedY);
  let isValidMove = piece.isValidMove(curMove, board);
  if(isValidMove){
    drawGreenBorder(getSquareFile(mouseX),getSquareRank(mouseY))
  }
  else{
    drawRedBorder(getSquareFile(mouseX),getSquareRank(mouseY))
  }
}
//runs new game screen
function runStartMode(){
  push()
  fill(`purple`);
  rectMode(RADIUS);
  rect(200,200,80,40);
  fill(`yellow`);
  textAlign(CENTER);
  text("New Game", 200, 200);
  pop();
}


function mousePressed(){
  if(!startMode){
    selected = !selected;
    justClicked = true;
  }
  
  if(startMode && mouseX < 280 && mouseX > 120 && mouseY < 240 && mouseY > 160){
    board = new Board(instantiateBoard());
    startMode = false;
  }
}

function drawCurrentBoard(){
  for (let file = 1; file < 9; file++){
    for (let rank = 1; rank < 9; rank++){
      if (board.getPiece(file, rank).name == `Pawn`){
        if(board.getPiece(file,rank).type == `White`)
          image(imgWhitePawn, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        else{
          image(imgBlackPawn, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        }
      }
      
      else if (board.getPiece(file, rank).name == `Rook`){
        if(board.getPiece(file,rank).type == `White`)
          image(imgWhiteRook, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        else
          image(imgBlackRook, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
      }
      
      else if (board.getPiece(file, rank).name == `King`){
        if(board.getPiece(file,rank).type == `White`)
          image(imgWhiteKing, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        else
          image(imgBlackKing, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
      }
      
      else if (board.getPiece(file, rank).name == `Knight`){
        if(board.getPiece(file,rank).type == `White`)
          image(imgWhiteKnight, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        else
          image(imgBlackKnight, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
      }
      
      else if (board.getPiece(file, rank).name == `Bishop`){
        if(board.getPiece(file,rank).type == `White`)
          image(imgWhiteBishop, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        else
          image(imgBlackBishop, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
      }
      else if (board.getPiece(file, rank).name == `Queen`){
        if(board.getPiece(file,rank).type == `White`)
          image(imgWhiteQueen, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
        else
          image(imgBlackQueen, getCenterXCoord(file)-25,getCenterYCoord(rank)-25,50,50);
         
      }
    }
  }
}