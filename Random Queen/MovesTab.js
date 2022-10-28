class MovesTab{
  constructor(){
    this.leftX = 500;
    this.rightX = 750;
    this.topY = 200;
    this.bottomY = 475;
    this.showing = true;
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
    this.drawMoves();
  }
  
  drawTab(){
    let width = (this.rightX - this.leftX)/3;
    let height = 20;
    push();
    noStroke();
    fill(50);
    rectMode(CORNERS)
    rect(this.leftX,this.topY - height,this.leftX + width,this.topY + 10);
    fill(`White`)
    textAlign(LEFT);
    textSize(15);
    text(`Moves`,this.leftX + width/10, this.topY - 3 )
    pop();
  }
  
  outliner(){
    push();
    stroke(150);
    fill(50);
    rectMode(CORNERS); rect(this.leftX,this.topY,this.rightX,this.bottomY);
    let width = (this.rightX - this.leftX)/3;
    let height = 20;
    rect(this.leftX,this.topY - height,this.leftX + width,this.topY + 10);
    pop();
  }
  
  drawMoves(){
    let scrollOn = false;
    if(board.allMoves.length > 9){
      scrollOn = true;
    }
    if(!scrollOn){
      scrollPos = 0;
    }
    else if(scrollOn){
      if(scrollPos > 0){
        scrollPos = 0;
      }
      let min = -(board.allMoves.length*20 - (this.bottomY-this.topY-20));
      if(scrollPos < min){
        scrollPos = min;
      }
    }
    push();
    fill(`White`);
    for(let i = 0; i < board.allMoves.length; i++){
      let move = board.allMoves[i];
      textSize(10);
      if(i % 2 == 0){
        let y = this.topY + 20 * (i + 2) + scrollPos;
        if(y > this.topY + 10 && y < this.bottomY - 5){
          text((i/2 + 1) + "." + this.translator(move),this.leftX + 10, y);
          
          if(board.staleMateMoves.indexOf(i) != -1){
            text(`\n Stalemate!`, this.leftX + 10, y)
          }
          
          else if(board.checkMateMoves.indexOf(i) != -1){
            text(`\n Black checkmated!`, this.leftX + 10, y)
          }
          
          else if(board.checkMoves.indexOf(i) != -1){
            text(`\n Black in check!`, this.leftX + 10, y)
          }
        }
      }
      else if(i % 2 == 1){
        let y = this.topY + 20 * (i + 1) + scrollPos;
        if(y > this.topY + 10 && y < this.bottomY - 5){
          text(this.translator(move),(this.leftX + this.rightX)/2, y);
          
          if(board.staleMateMoves.indexOf(i) != -1){
            text(`\n Stalemate!`, (this.leftX + this.rightX)/2, y)
          }
          
          else if(board.checkMateMoves.indexOf(i) != -1){
            text(`\n White checkmated!`, (this.leftX + this.rightX)/2, y)
          }
          
          else if(board.checkMoves.indexOf(i) != -1){
            text(`\n White in check!`, (this.leftX + this.rightX)/2, y)
          }
        }
      }
    }
    
    fill(50);
    noStroke();
    
    //bars to make the text look like it's disappearing
    rectMode(CORNERS)
    rect(this.leftX, this.topY, this.rightX, this.topY+20);
    rect(this.leftX, this.bottomY-20, this.rightX, this.bottomY);
    
    fill(`White`)
    textSize(10);
    text(`White`, this.leftX + 20, this.topY + 10);
    text(`Black`, (this.leftX + this.rightX) / 2, this.topY + 10);
    pop();
  }
  
  inBounds(clickX,clickY){
    let yMin = this.topY - 20;
    let yMax = this.topY;
    let xMin = this.leftX;
    let xMax = this.leftX + (this.rightX - this.leftX)/3;
    if(clickX >= xMin && clickX <= xMax && clickY >= yMin && clickY <= yMax){
      return true;
    }
    return false;
  }
  
  translator(move){
    const letters = [`a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`]
    
    let start = letters[move.prevLoc[0] - 1] + move.prevLoc[1];
    let end = letters[move.curLoc[0] -1] + move.curLoc[1];
    return "" + move.piece + " " + start + " ->  " + end;
  }
}