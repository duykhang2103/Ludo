// import Maps from 'Data/Maps.js';
import Map from "./Logic/MapLogic.js"
import Piece from "./Logic/PieceLogic.js"
import GameState from "./Logic/GameState.js"
import GameLogic from "./Logic/GameLogic.js"
import BoardUI from "./UI/BoardUI.js"
import InfoUI from "./UI/InfoUI.js"

const playerCount = 2;

const myMap = new Map(0);
console.log(myMap);

const myPiece = new Piece(0, 0);
const newPiece = new Piece(1, 1);
// console.log(myPiece);

const myGameState = new GameState(myMap, [myPiece, newPiece], playerCount);
// console.log(myGameState);

const myGameLogic = new GameLogic(myGameState);
myGameLogic.addPiece(myPiece.id, 0);
myGameLogic.addPiece(newPiece.id, 6);
console.log(myGameLogic);

myGameLogic.movePiece(0, 3);
console.log(myGameLogic);

const gameContainer = document.querySelector("#game-container");
const myBoardUI = new BoardUI(myMap, gameContainer);
myBoardUI.render();


const gameInfo = document.querySelector("#game-info");
const myInfoUI = new InfoUI(myGameState, gameInfo);
myInfoUI.render();
// console.log(myBoardUI);
