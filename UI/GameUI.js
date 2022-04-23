export default class GameUI {
    constructor(rootElement, gameLogic) {
        this.rootElement = rootElement;
        this.gameLogic = gameLogic;

        this.rootElement.innerHTML = "";

        this.boardContainer = this.initBoardContainer();
        this.infoContainer = this.initInfoContainer();
        this.commandContainer = this.initCommandContainer();

        this.renderBoard();
        this.renderInfo();

        rootElement.append(this.boardContainer, this.infoContainer, this.commandContainer);
    }

    initBoardContainer() {
        const boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container");
        
        return boardContainer;
    }

    initInfoContainer() {
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        return infoContainer;
    }

    initCommandContainer() {
        const commandContainer = document.createElement("div");

        commandContainer.classList.add("command-container");

        const rollButton = document.createElement("button");
        rollButton.textContent = "Roll";

        rollButton.addEventListener("click", () => {
            this.gameLogic.rollButtonClick([1,2,3,4,5,6]);
            this.render();
        })

        commandContainer.appendChild(rollButton);

        return commandContainer;
    }

    renderBoard() {
        this.boardContainer.innerHTML = "";

        const { gameState } = this.gameLogic;
        const cellElements = [];

        for(let i = 0; i < gameState.map.width * gameState.map.height; i++){
            const cell = document.createElement("div");
            cell.textContent = gameState.map.cells[i].occuPieces;
            cell.classList.add("cell");
            cellElements.push(cell);
        }

        cellElements.forEach(cellElement => this.boardContainer.appendChild(cellElement));
    }

    renderInfo() {
        const { infoContainer } = this;

        infoContainer.innerHTML = "";

        const infoElement = document.createElement("div");
        const { gameState } = this.gameLogic;

        const turnElement = document.createElement("div");
        turnElement.textContent = `Turn: ${gameState.turn}`;
        infoElement.appendChild(turnElement);

        const currentPlayerElement = document.createElement("div");
        currentPlayerElement.textContent = `currentPlayer: ${gameState.currentPlayer}`;
        infoElement.appendChild(currentPlayerElement);

        infoContainer.appendChild(infoElement);
    }

    render() {
        this.renderBoard();
        this.renderInfo();
    }

    renderCommand() {

    }
}