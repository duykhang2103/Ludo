export default class GameState {
  constructor(map, pieces, playerCount, players) {
    this.map = map;
    this.pieces = pieces;
    this.players = players;

    this.playerCount = playerCount;
    this.turn = 0;
    this.turnOrder = Array(playerCount).fill(0).map((item, index) => index);
    this.currentPlayer = 0;

    this.rollResult = 0;
  }
}
