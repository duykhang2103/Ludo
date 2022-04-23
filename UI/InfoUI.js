
export default class InfoUI {
  constructor(gameState, rootElement) {
    // this.map = map;
    this.gameState = gameState;
    this.rootElement = rootElement;
  }

  render(){
    // const info = document.createElement("die");
    const turn = document.createElement("div");
    turn.textContent = `Turn: ${this.gameState.turn}`;
    const currentPlayer = document.createElement("div");
    currentPlayer.textContent = `currentPlayer: ${this.gameState.currentPlayer}`;
    const roll = document.createElement("button");
    roll.textContent = "roll";

    this.rootElement.appendChild(turn);
    this.rootElement.appendChild(currentPlayer);
    this.rootElement.appendChild(roll);


  }
}
