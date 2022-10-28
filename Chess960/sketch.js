let selected = false;
let board;
let justClicked = false;
let selectedX;  
let selectedY;
let destinationX;
let destinationY;
let startMode = true;
let scrollPos = 0;
let inCheck = false;



function setup() {
  createCanvas(610, 420);
  board = new Board(instantiateBoard());
  textSize(24);
  
  input = createInput('Enter FEN');
  input.position(10, 410);
  button = createButton("submit");
  button.position(input.x + input.width, 410);
  button.mousePressed(doFen);
}

function draw() {
  
  drawBackground();
  
  drawCurrentBoard();
  
  drawSidebar();
    
  if(startMode){
    runStartMode();
  }
  
  if(selected && justClicked && !startMode){
    selectedX = getSquareFile(mouseX);
    selectedY = getSquareRank(mouseY);
    drawYellowBorder(selectedX, selectedY);
    justClicked = false;
  }
  
  else if(selected && !startMode){
    if(board.getPiece(selectedX, selectedY).type == board.turn){
      drawYellowBorder(selectedX, selectedY);
      colorOnHover();
      markReachable();
    }
    else{
      selected = false;
    }
  }
  
  else if(!selected && justClicked && !startMode){
    destinationX = getSquareFile(mouseX);
    destinationY = getSquareRank(mouseY);
    playRound(selectedX, selectedY, destinationX, destinationY);
    justClicked = false;
  }
}