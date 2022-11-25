export default class GameState {
  constructor(map, pieces, playerCount, players) {
    this.map = map;
    this.pieces = pieces;
    this.players = players;

    this.playerCount = playerCount;
    this.turn = 0;
    this.currentPlayer = 0;
    this.hasMoved = false;
    this.checkMovable = false;

    this.rollResult = 0;
  }
}
