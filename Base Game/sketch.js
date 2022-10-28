let selected = false;
let board;
let justClicked = false;
let selectedX;  
let selectedY;
let destinationX;
let destinationY;
let startMode = true;
let scrollY = 225;


function setup() {
  createCanvas(600, 400);
  board = new Board(altInstantiateBoard());
  textSize(24);
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
    drawYellowBorder(selectedX, selectedY);
    //drawRedBorder(getSquareFile(mouseX), getSquareRank(mouseY));
    colorOnHover();
  }
  
  else if(!selected && justClicked && !startMode){
    destinationX = getSquareFile(mouseX);
    destinationY = getSquareRank(mouseY);
    playRound(selectedX, selectedY, destinationX, destinationY);
    justClicked = false;
  }
}