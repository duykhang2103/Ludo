import { rollDie } from "./Utils.js";

export default class GameLogic {
  constructor(gameState) {
    this.gameState = gameState;
  }

  getPieceFromId(pieceId) {
    return this.gameState.pieces.find(piece => piece.id == pieceId)
  }

  getPlayerFromId(playerId) {
    return this.gameState.players.find(player => player.id == playerId);
  }

  rollButtonClick(die) {
    const rollResult = rollDie(die);
    
    const activePlayer = this.getPlayerFromId(this.gameState.currentPlayer);
    console.log(activePlayer);
    const pieceId = activePlayer.party.pieces[0].id;

    this.movePiece(pieceId, rollResult);

    this.endTurn();
  }

  movePiece(pieceId, steps){
    const { map } = this.gameState; 
    const piece = this.getPieceFromId(pieceId);

    map.cells[piece.pos].occuPieces = map.cells[piece.pos].occuPieces.filter(id => id != pieceId);
    for(let i = 0; i < steps; i++){
      piece.pos = map.cells[piece.pos].next[0];
    }
    
    map.cells[piece.pos].occuPieces.push(pieceId);
  }

  addPiece(pieceId, des){
    const { map } = this.gameState;
    const piece = this.getPieceFromId(pieceId);

    map.cells[des].occuPieces.push(pieceId);
    piece.pos = des;
  }

  endTurn() {
    const { gameState } = this;
    const currIndex = gameState.turnOrder.indexOf(gameState.currentPlayer);

    gameState.turn += 1;
    gameState.currentPlayer = gameState.turnOrder[(currIndex+1) % gameState.playerCount] ;
  }

}
