class MenuBar {
  constructor() {
    this.leftX = 0;
    this.rightX = 240;
    this.topY = 0;
    this.bottomY = height;
  }

  draw() {
    push();
    noStroke();
    fill(40);
    rectMode(CORNERS);
    rect(this.leftX, this.topY, this.rightX, this.bottomY);
    pop();
  }
}
