class TitleSquare{
  constructor(){
    this.leftX = 500;
    this.rightX = 750;
    this.topY = 25;
    this.bottomY = 160;
  }
  
  draw(){
    push();
    noStroke();
    fill(50);
    rectMode(CORNERS); rect(this.leftX,this.topY,this.rightX,this.bottomY);
    
    imageMode(CORNERS);
  image(imgWhiteKing, this.leftX, this.topY, this.leftX+60, this.topY+60);
    
    fill(`White`);
    textAlign(LEFT);
    textSize(17);
    text(`Regular Chess`,this.leftX + 70, this.topY + 40 )
    textSize(12);
    text(`No variation or modification enabled,`,this.leftX + 15, this.topY + 80 )
    text(`just good ol' simple regular chess.`,this.leftX + 15, this.topY + 95)
    pop();
  }
}