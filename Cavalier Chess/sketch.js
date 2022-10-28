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
let mainBackground;
let startButton;
let movesTab;
let menuBar;



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);
  mainBackground = new MainBackground();
  startButton = new StartButton();
  movesTab = new MovesTab();
  menuBar = new MenuBar();
  board = new Board(altInstantiateBoard());
  textSize(24);
  
  input = createInput('Enter FEN');
  input.position(int(width/2), int(height-50));
  button = createButton("submit");
  button.position(input.x + input.width, input.y);
  button.mousePressed(doFen);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(150);
  mainBackground = new MainBackground();
  startButton = new StartButton();
  movesTab = new MovesTab();
  menuBar = new MenuBar();
  
  mainBackground.draw();
  movesTab.draw();
  menuBar.draw();
  mainBackground.drawCurrentBoard();
  //drawSidebar();
    
  if(startMode){
    startButton.runStartMode();
  }
  if(selected && justClicked && !startMode){
    selectedX = mainBackground.getSquareFile(mouseX);
    selectedY = mainBackground.getSquareRank(mouseY);
    mainBackground.drawYellowBorder(selectedX, selectedY);
    justClicked = false;
  }
  else if(selected && !startMode){
    if(board.getPiece(selectedX, selectedY).type == board.turn){
      mainBackground.drawYellowBorder(selectedX, selectedY);
      mainBackground.colorOnHover();
      mainBackground.markReachable();
    }
    else{
      selected = false;
    }
  }
  
  else if(!selected && justClicked && !startMode){
    destinationX = mainBackground.getSquareFile(mouseX);
    destinationY = mainBackground.getSquareRank(mouseY);
    playRound(selectedX, selectedY, destinationX, destinationY);
    justClicked = false;
  }
}