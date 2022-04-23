


export default class GameLogic {
  constructor(gameState) {
    this.gameState = gameState;
  }

  movePiece(pieceId, steps){
    const piece = this.gameState.pieces.find(piece => piece.id == pieceId);
    this.gameState.map.cells[piece.pos].player = [];
    for(let i=0; i<steps; i++){
      piece.pos = this.gameState.map.cells[piece.pos].next[0];
    }
    this.gameState.map.cells[piece.pos].player.push(pieceId);
  }

  addPiece(pieceId, des){
    const piece = this.gameState.pieces.find(piece => piece.id == pieceId);
    this.gameState.map.cells[des].player.push(pieceId);
    piece.pos = des;
  }

  // updateMap(){
  //
  // }
}
