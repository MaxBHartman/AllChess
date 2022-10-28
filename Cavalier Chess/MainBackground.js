//draws the chessboard, contains methods for selecting pieces, etc
class MainBackground {
  constructor() {
    this.squareSize = (height - 140) / 8;
    this.leftX = 275;
    this.topY = 70;
    this.rightX = 275 + 8 * this.squareSize;
    this.bottomY = height - 70;
  }

  draw() {
    push();
    rectMode(CORNERS);
    noStroke();
    fill(236, 218, 185);
    let flip = true;
    for (let x = this.leftX; x < this.rightX; x += this.squareSize) {
      for (let y = this.topY; y < this.bottomY; y += this.squareSize) {
        if (flip) {
          fill(236, 218, 185);
        } else {
          fill(174, 138, 104);
        }
        rect(x, y, x + this.squareSize, y + this.squareSize);
        flip = !flip;
      }
      flip = !flip;
    }

    fill(150);
    rect(
      this.leftX,
      this.bottomY,
      this.rightX,
      this.bottomY + int(0.0125 * width)
    );
    rect(
      this.rightX,
      this.topY + int(0.0125 * width),
      this.rightX + int(0.0125 * width),
      this.bottomY + int(0.0125 * width)
    );
    rect(
      this.leftX - int(0.0125 * width),
      this.topY,
      this.leftX,
      this.bottomY + int(0.0125 * width)
    );
    rect(
      this.leftX - int(0.0125 * width),
      this.topY - int(0.0125 * width),
      this.rightX + 10,
      this.topY
    );
    pop();
  }

  getSquareFile(xCoord) {
    let file = Math.floor((xCoord - this.leftX) / this.squareSize) + 1;
    if (file > 8) {
      file = 8;
    }
    if (file < 1) {
      file = 1;
    }
    return file;
  }

  getSquareRank(yCoord) {
    let rank = 8 - Math.floor((yCoord - this.topY) / this.squareSize);
    if (rank > 8) {
      rank = 8;
    }
    if (rank < 1) {
      rank = 1;
    }
    return rank;
  }

  getCenterXCoord(squareFile) {
    return (
      this.leftX + this.squareSize * (squareFile - 1) + this.squareSize / 2
    );
  }
  getCenterYCoord(squareRank) {
    return this.topY + this.squareSize * (8 - squareRank) + this.squareSize / 2;
  }

  drawCurrentBoard() {
    imageMode(CENTER);
    for (let file = 1; file < 9; file++) {
      for (let rank = 1; rank < 9; rank++) {
        if (board.getPiece(file, rank).name == `Pawn`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhitePawn,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else {
            image(
              imgBlackPawn,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          }
        } else if (board.getPiece(file, rank).name == `Rook`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteRook,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackRook,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        } else if (board.getPiece(file, rank).name == `King`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteKing,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackKing,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        } else if (board.getPiece(file, rank).name == `Knight`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteKnight,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackKnight,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        } else if (board.getPiece(file, rank).name == `Bishop`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteBishop,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackBishop,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        } else if (board.getPiece(file, rank).name == `Queen`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteQueen,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackQueen,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          
        } 
        else if (board.getPiece(file, rank).name == `Princess`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhitePrincess,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackPrincess,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        } else if (board.getPiece(file, rank).name == `Empress`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteEmpress,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackEmpress,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        } else if (board.getPiece(file, rank).name == `Nightrider`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteNightrider,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackNightrider,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        }
        else if (board.getPiece(file, rank).name == `Cavalier`) {
          if (board.getPiece(file, rank).type == `White`)
            image(
              imgWhiteCavalier,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
          else
            image(
              imgBlackCavalier,
              this.getCenterXCoord(file),
              this.getCenterYCoord(rank),
              this.squareSize,
              this.squareSize
            );
        }
      }
    }
  }

  drawRedBorder(file, rank) {
    push();
    strokeWeight(4);
    stroke(`red`);
    noFill();
    rectMode(CORNERS);
    rect(
      this.squareSize * (file - 1) + this.leftX,
      this.squareSize * (8 - rank) + this.topY,
      this.squareSize * file + this.leftX,
      this.squareSize * (9 - rank) + this.topY
    );
    pop();
  }

  drawGreenBorder(file, rank) {
    push();
    strokeWeight(4);
    stroke(`green`);
    noFill();
    rectMode(CORNERS);
    rect(
      this.squareSize * (file - 1) + this.leftX,
      this.squareSize * (8 - rank) + this.topY,
      this.squareSize * file + this.leftX,
      this.squareSize * (9 - rank) + this.topY
    );
    pop();
  }

  drawYellowBorder(file, rank) {
    push();
    strokeWeight(4);
    stroke(`yellow`);
    noFill();
    rectMode(CORNERS);
    rect(
      this.squareSize * (file - 1) + this.leftX,
      this.squareSize * (8 - rank) + this.topY,
      this.squareSize * file + this.leftX,
      this.squareSize * (9 - rank) + this.topY
    );
    pop();
  }

  colorOnHover() {
    let pieceName = board.getPiece(selectedX, selectedY).name;
    let curMove = {
      piece: pieceName,
      prevLoc: [selectedX, selectedY],
      curLoc: [this.getSquareFile(mouseX), this.getSquareRank(mouseY)],
    };
    let piece = board.getPiece(selectedX, selectedY);
    let isValidMove = piece.isValidMove(curMove, board);
    if (isValidMove) {
      this.drawGreenBorder(
        this.getSquareFile(mouseX),
        this.getSquareRank(mouseY)
      );
    } else {
      this.drawRedBorder(
        this.getSquareFile(mouseX),
        this.getSquareRank(mouseY)
      );
    }
  }

  markReachable() {
    let piece = board.getPiece(selectedX, selectedY);
    let squares = piece.getAllValidMoves(board);
    for (let i = 0; i < squares.length; i++) {
      let x = squares[i][0];
      let y = squares[i][1];
      push();
      let squareColor = color(240, 240, 60);
      squareColor.setAlpha(100);
      noStroke();
      fill(squareColor);
      rectMode(CORNERS);
      rect(
        this.squareSize * (x - 1) + this.leftX,
        this.squareSize * (8 - y) + this.topY,
        this.squareSize * x + this.leftX,
        this.squareSize * (9 - y) + this.topY
      );
      pop();
    }
  }
}
