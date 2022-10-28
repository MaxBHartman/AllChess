class StartButton{
  constructor(){
    this.centerX = mainBackground.leftX + 4 * mainBackground.squareSize;
    this.centerY = mainBackground.topY + 4 *  mainBackground.squareSize;
    this.xRadius = 80;
    this.yRadius = 40;
  }
  //runs new game screen
  runStartMode(){
    push()
    fill(`purple`);
    rectMode(RADIUS);
    rect(this.centerX, this.centerY,this.xRadius,this.yRadius);
    fill(`yellow`);
    textAlign(CENTER);
    text("New Game", this.centerX, this.centerY);
    pop();
  }
  
  inBounds(clickX,clickY){
    let yMin = this.centerY - this.yRadius;
    let yMax = this.centerY + this.yRadius;
    let xMin = this.centerX - this.xRadius;
    let xMax = this.centerX + this.xRadius;
    if(clickX >= xMin && clickX <= xMax && clickY >= yMin && clickY <= yMax){
      return true;
    }
    return false;
  }
}