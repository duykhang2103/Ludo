
 export default class GameState {
   constructor(map, pieces, playerCount) {
     this.map = map;
     this.pieces = pieces;
     this.turn = 0;
     this.playerCount = playerCount;
     this.currentPlayer = 0;
   }

   // movePiece(pieceId){
   //   const piece = this.pieces.find(piece => piece.id == pieceId);
   //   for(let i=0; i<steps; i++){
   //
   //     piece.pos = this.cells[piece.pos].next;
   //   }
   // }
 }
