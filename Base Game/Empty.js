class Empty extends Piece{
  constructor(rank, file, moveCount, type, name){
    super(rank, file, moveCount, type);
    this.name = `Empty`;
  }
  
  isValidMove(move){
    return false;
  }
}
