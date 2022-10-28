class StartButton {
  constructor() {
    this.centerX = mainBackground.leftX + 4 * mainBackground.squareSize;
    this.centerY = mainBackground.topY + 4 * mainBackground.squareSize;
    this.xRadius = 80;
    this.yRadius = 40;
  }
  //runs new game screen
  runStartMode() {
    push();
    fill(`purple`);
    rectMode(RADIUS);
    rect(this.centerX, this.centerY, this.xRadius, this.yRadius);
    fill(`yellow`);
    textAlign(CENTER);
    text("New Game", this.centerX, this.centerY);
    pop();
  }
}
