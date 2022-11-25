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

  // getCellFromId(cellId)

  rollButtonClick(die) {
    const rollResult = rollDie(die);
    this.gameState.rollResult = rollResult;

    const activePlayer = this.getPlayerFromId(this.gameState.currentPlayer);
    const pieceId = activePlayer.party.pieces[0].id;
  }

  addPiece(pieceId){
    const { map } = this.gameState;
    const piece = this.getPieceFromId(pieceId);
    const homeCell = map.cells.find(cell => cell.type.name == "home" && cell.type.partyId == piece.party);

    piece.pos = map.cells.indexOf(homeCell);
    map.cells[piece.pos].occuPieces.push(pieceId);
  }

//NO NEED
  // resetPieceMovable(){
  //   const { gameState } = this;
  //   this.gameState.pieces.forEach( piece => {
  //     piece.approachingPos = piece.pos;
  //   });
  // }


// get your pieces' approachingPos. return current pos if blocked
  getApproachingPos(pieceId, rollResult) {
    const { map } = this.gameState;
    const piece = this.getPieceFromId( pieceId );
    let piecePos = piece.pos;

    if ( piece.isHome == true ) {
      if(rollResult == 1 || rollResult == 6){
        this.gameState.checkMovable = true;
        return map.cells[piece.pos].next[0];
      }
      else {
        return piece.pos;
      }
    }
    else {
      for(let i = 0; i < rollResult; i++){
        let nextCellIndex = 0;

        if (map.cells[piecePos].type.name == "gate" && map.cells[piecePos].type.partyId == piece.party ) {
          nextCellIndex = 1;
        }

        let nextPos = map.cells[piecePos].next[nextCellIndex];

        if ( nextPos === undefined || (map.cells[nextPos].occuPieces[0] != undefined && map.cells[nextPos].occuPieces[0].party != piece.party && i != rollResult - 1 )) {
          return piece.pos ;
        }
        piecePos = nextPos;
      }
      this.gameState.checkMovable = true;
      return piecePos;
    }
  }

  summonPiece(pieceId){
    const { map } = this.gameState;
    const piece = this.getPieceFromId(pieceId);
    const home = gameState.map.cells.find(cell => cell.type.name == "home" && cell.type.partyId == piece.party);

    this.movePiece(pieceId, home.id);
    piece.approachingPos = home.id;
  }

  movePiece( pieceId, des ){
    const { map } = this.gameState;
    const piece = this.getPieceFromId(pieceId);
    const home = this.gameState.map.cells.find(cell => cell.type.name == "home" && cell.type.partyId == piece.party);

    if(des == home.id){
      piece.isHome = true;
    }
    else piece.isHome = false;
    map.cells[piece.pos].occuPieces = map.cells[piece.pos].occuPieces.filter(id => id != pieceId);

    piece.pos = des;
    map.cells[piece.pos].occuPieces.push(pieceId);
  }

  clearCell(cellId, partyId){
    const clearingCell = this.gameState.map.cells[cellId];
    const home = this.gameState.map.cells.find(cell => {
      return cell.type.name == "home" && cell.type.partyId == partyId
    });

    while(clearingCell.occuPieces[0] != undefined){
      let clearingPiece = this.getPieceFromId(clearingCell.occuPieces[0]);
      clearingPiece.isHome = true;
      clearingPiece.pos = home.id;

      home.occuPieces.push(clearingCell.occuPieces.pop());
    }
  }

  endTurn() {
    const { gameState } = this;

    gameState.hasMoved = true;

    if(gameState.rollResult != 1 && gameState.rollResult != 6){
      gameState.turn += 1;
      gameState.currentPlayer = gameState.turn % gameState.playerCount;
    }
  }

  checkWin(partyId){
    const { gameState } = this;
    let check = 1;
    gameState.pieces.forEach( piece => {
      if (gameState.map.cells[piece.pos].type.name != "finish" && piece.party == partyId){
        check = 0;
      }
    });
    return check;
  }

}
