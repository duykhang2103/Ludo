export default class GameUI {
    constructor(rootElement, gameLogic) {
        this.rootElement = rootElement;
        this.gameLogic = gameLogic;

        this.rootElement.innerHTML = "";

        this.cellElements = this.initCellElements();
        this.boardContainer = this.initBoardContainer();
        this.pieceElements = this.initPieceElements();

        this.optionContainer = this.initOptionContainer()
        this.infoContainer = this.initInfoContainer();
        this.commandContainer = this.initCommandContainer();
// pieceElements(like a board) is an array of arrays (each one represents a cell), which consist of all the piece ocuppying the cell.

        // this.renderOption();
        this.renderBoard();
        this.renderInfo();

        rootElement.append(this.boardContainer, this.optionContainer, this.infoContainer, this.commandContainer);
    }

    initCellElements(){

      const cellElements = [];
      const { gameState } = this.gameLogic;

      for(let i = 0; i < gameState.map.width * gameState.map.height; i++){
          const cell = document.createElement("div");

          cell.classList.add("cell");
          cell.classList.add( gameState.map.cells[i].type.name );

          if (gameState.map.cells[i].type.partyId != -1) {
            cell.classList.add( gameState.map.cells[i].type.name + String(gameState.map.cells[i].type.partyId) );
          }

        cellElements.push(cell);
      }
      return cellElements;
    }

    initPieceElements(){
      const pieceElements = [];

      const { gameState } = this.gameLogic;
      for(let i = 0 ; i < gameState.map.width * gameState.map.height; i++){
        const tempOccuPieceElements = [];

        gameState.map.cells[i].occuPieces.forEach((pieceId) => {
          const occuPieceElement = document.createElement("div");

          occuPieceElement.textContent = `${pieceId}`;
          occuPieceElement.classList.add("piece");
          occuPieceElement.classList.add(`piece${this.gameLogic.getPieceFromId(pieceId).party}`);
          occuPieceElement.dataset.partyId = this.gameLogic.getPieceFromId(pieceId).party;

          tempOccuPieceElements.push(occuPieceElement);
        });

        pieceElements.push(tempOccuPieceElements);
      }
      return pieceElements;
    }

    initOptionContainer(){
      const optionContainer = document.createElement("div");
      optionContainer.classList.add("option-container");

      return optionContainer;
    }

    initBoardContainer() {
        const boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container");

        this.cellElements.forEach(cellElement => boardContainer.appendChild(cellElement));

        return boardContainer;
    }

    initInfoContainer() {
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        return infoContainer;
    }

    initCommandContainer() {
        const commandContainer = document.createElement("div");
        const { gameState } = this.gameLogic;

        commandContainer.classList.add("command-container");

        const rollButton = document.createElement("button");
        const dieBox = document.createElement("div");
        // dieBox.classList.add("die-box");

        rollButton.textContent = "Roll";
        dieBox.textContent = "";


        rollButton.addEventListener("click", () => {
            this.gameLogic.rollButtonClick([1,2,3,4,5,6]);
            this.render();
            gameState.hasMoved = false;
            gameState.checkMovable = false;
            rollButton.disabled = true;

            gameState.pieces.forEach( piece => {
              if(piece.party == gameState.currentPlayer){
                piece.approachingPos = this.gameLogic.getApproachingPos(piece.id, gameState.rollResult);
              }
            });

            if(gameState.checkMovable == false) {
              this.gameLogic.endTurn();
              this.render();
              rollButton.disabled = false;
            }
            else {
              this.pieceElements.forEach((occuPieceElements) => {
                occuPieceElements.forEach((ele, i) => {
                  const movingPieceId =  gameState.map.cells[this.pieceElements.indexOf(occuPieceElements)].occuPieces[i];
                  const movingPiece = this.gameLogic.getPieceFromId(movingPieceId);

                  if(movingPiece.approachingPos != movingPiece.pos && ele.dataset.partyId == gameState.currentPlayer) {
                    ele.classList.add("piece-movable");
                  }
                })
              })

              this.pieceElements.forEach((occuPieceElements, index) => {
                occuPieceElements.forEach((ele, i) => {

                  if(ele.dataset.partyId == gameState.currentPlayer){

                      ele.addEventListener("click", () => {
                        if(gameState.hasMoved == false && ele.dataset.partyId == gameState.currentPlayer){

                          const movingPieceId =  gameState.map.cells[this.pieceElements.indexOf(occuPieceElements)].occuPieces[i];
                          const movingPiece = this.gameLogic.getPieceFromId(movingPieceId);
                          const desCell = gameState.map.cells[movingPiece.approachingPos];

                          if(desCell.occuPieces[0] != undefined) {

                            let enemyPiece = this.gameLogic.getPieceFromId(desCell.occuPieces[0]);

                            if(enemyPiece.party != movingPiece.party){
                              console.log("Kick");
                              let desCellEle = this.pieceElements[movingPiece.approachingPos];
                              let home = gameState.map.cells.find(cell => cell.type.name == "home" && cell.type.partyId == enemyPiece.party);
                              let homeEle = this.pieceElements[gameState.map.cells.indexOf(home)];

                              this.gameLogic.clearCell(movingPiece.approachingPos, enemyPiece.party);
                              while(desCellEle[0]){
                                homeEle.push(desCellEle.pop());
                              }
                            }
                          }


                          this.gameLogic.movePiece(movingPieceId, movingPiece.approachingPos);

                          // Use pieceElements[index] to change the pieceElements outside, don't use occuPieceElements bcz it's passed by value

                          this.pieceElements[index] = occuPieceElements.filter(pieceEle => pieceEle != occuPieceElements[i]);
                          this.pieceElements[movingPiece.pos].push(ele);

                          this.pieceElements.forEach(occuPieceEles => {
                            occuPieceEles.forEach(occuEle => {
                              occuEle.classList.remove("piece-movable");
                            })
                          })

                          this.gameLogic.endTurn();
                          this.render();
                          rollButton.disabled = false;
                          if (this.gameLogic.checkWin(movingPiece.party)) {
                            setTimeout(()=>{
                              alert(`Player ${movingPiece.party} win!`);
                            }, 5);
                           
                          }

                        }

                      })

                  }
                });

              });
            }
        })

        commandContainer.appendChild(rollButton);

        return commandContainer;
    }

    // initDie(dieResult){
    //   const dieContainer = document.createElement("div");
    //
    //   dieContainer.classList.add("die-container");
    //
    //   dieContainer.textContent = `${}`;
    // }

    // initMoveContainer(){
    //   const moveContainer = document.createElement("div");
    //
    //   moveContainer.classList.add("move-container");
    //
    //   const moveButton = document.createElement("button");
    //   moveButton.textContent = "Move";
    // }


    // renderOption(){
    //   const {gameState} = this.gameLogic;
    //   const {optionContainer} = this;

    //   const optionElement = document.createElement("div");

    //   const boardTitleElement = document.createElement("div");
    //   boardTitleElement.textContent = `BoardId: ${gameState.map.mapId}`;
    //   optionElement.appendChild(boardTitleElement);

    //   const playerNumberElement = document.createElement("div");
    //   const playerNumberInput = document.createElement("input");
    //   playerNumberInput.type = "number";
    //   playerNumberInput.value = 2;
    //   playerNumberInput.min = 2;
    //   playerNumberInput.max = 2;
    //   playerNumberElement.textContent = `Number of players: `;
    //   playerNumberElement.appendChild(playerNumberInput);
    //   optionElement.appendChild(playerNumberElement);


    //   optionContainer.appendChild(optionElement);
    // }

    renderBoard() {
        const {gameState} = this.gameLogic;

        this.cellElements.forEach((ele, i) => {
          this.pieceElements[i].forEach(occuPieceElement => {
            ele.appendChild(occuPieceElement);
          });

        });

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

        const rollResultElement = document.createElement("div");
        rollResultElement.textContent = `rollResult: ${gameState.rollResult}`;
        infoElement.appendChild(rollResultElement);

        infoContainer.appendChild(infoElement);
    }

    render() {
        this.renderBoard();
        this.renderInfo();
    }

}
