class InstructionsTab{
  constructor(){
    this.leftX = 500;
    this.rightX = 750;
    this.topY = 200;
    this.bottomY = 475;
    this.showing = false;
  }
  
  draw(){
    this.outliner();
    push();
    noStroke();
    fill(50);
    rectMode(CORNERS)
    rect(this.leftX,this.topY,this.rightX,this.bottomY);
    pop();
    this.drawTab();
  }
  
  drawTab(){
    let width = (this.rightX - this.leftX)/3;
    let height = 20;
    push();
    noStroke();
    fill(50);
    rectMode(CORNERS)
    rect(this.leftX + width,this.topY - height,this.leftX + 2*width,this.topY);
    fill(`White`)
    textAlign(LEFT);
    textSize(15);
    text(`Rules`,this.leftX + width + width/10, this.topY - 3 )
    pop();
  }
  
  inBounds(clickX,clickY){
    let yMin = this.topY - 20;
    let yMax = this.topY;
    let xMin = this.leftX + (this.rightX - this.leftX)/3 ;
    let xMax = this.leftX + 2*(this.rightX - this.leftX)/3;
    if(clickX >= xMin && clickX <= xMax && clickY >= yMin && clickY <= yMax){
      return true;
    }
    return false;
  }
  
  outliner(){
    push();
    stroke(150);
    fill(50);
    rectMode(CORNERS); rect(this.leftX,this.topY,this.rightX,this.bottomY);
    let width = (this.rightX - this.leftX)/3;
    let height = 20;
    rect(this.leftX + width,this.topY - height,this.leftX + 2 * width,this.topY + 10);
    pop();
  }
}