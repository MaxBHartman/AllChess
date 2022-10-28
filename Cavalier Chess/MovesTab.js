class MovesTab {
  constructor() {
    //side length of board is (height-140)
    this.leftX = 310 + (height - 140);
    this.rightX = 790 + (height - 140);
    this.topY = height / 2;
    this.bottomY = height - 30;
  }

  draw() {
    push();
    noStroke();
    fill(40);
    rectMode(CORNERS);
    rect(this.leftX, this.topY, this.rightX, this.bottomY, 0, 15, 15, 15);
    pop();
    this.drawTab();
  }

  drawTab() {
    let width = (this.rightX - this.leftX) / 3;
    let height = 20;
    push();
    noStroke();
    fill(20);
    rectMode(CORNERS);
    rect(this.leftX, this.topY - height, this.leftX + width, this.topY);
    fill(`White`);
    textAlign(LEFT);
    textSize(15);
    text(`Moves`, this.leftX + width / 10, this.topY - 3);
    pop();
  }
}
