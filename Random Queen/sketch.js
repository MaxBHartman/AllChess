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
let instructionsTab;
let settingsTab;
let currentTab;
let titleSquare;
let moveCount;


function setup() {
  createCanvas(800, 500);
  background(150);
  mainBackground = new MainBackground();
  startButton = new StartButton();
  titleSquare = new TitleSquare();
  instructionsTab = new InstructionsTab();
  movesTab = new MovesTab();
  settingsTab = new SettingsTab();
  board = new Board(altInstantiateBoard());
  textSize(24);
  
  input = createInput('Enter FEN');
  input.position(60, 460);
  button = createButton("submit");
  button.position(input.x + input.width, input.y);
  button.mousePressed(doFen);
  settingsTab.draw();
  instructionsTab.draw();
  movesTab.draw();
}

function draw() {
  mainBackground.draw();
  
  mainBackground.drawCurrentBoard();
  
  titleSquare.draw();
  
  setCursor();
  
  if(movesTab.showing == true){
    movesTab.draw(); // keep updating the moves tab
  }
    
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