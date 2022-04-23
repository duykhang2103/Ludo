import Map from "./Logic/MapLogic.js"
import Piece from "./Logic/PieceLogic.js"
import GameState from "./Logic/GameState.js"
import GameLogic from "./Logic/GameLogic.js"
import Party from "./Logic/PartyLogic.js"
import Player from "./Logic/PlayerLogic.js"
import GameUI from "./UI/GameUI.js"

const playerCount = 2;

const myMap = new Map(0);
console.log(myMap);

const myPiece = new Piece(0, 0);
const newPiece = new Piece(1, 1);
// console.log(myPiece);

const myParty = new Party(0, [myPiece]);
const newParty = new Party(1, [newPiece]);

const myPlayer = new Player(0, "Senko", myParty);
const newPlayer = new Player(1, "Rem", newParty);

const myPieces = [myPiece, newPiece];

const myGameState = new GameState(myMap, myPieces, playerCount, [myPlayer, newPlayer]);
// console.log(myGameState);

const myGameLogic = new GameLogic(myGameState);
myGameLogic.addPiece(myPiece.id, 0);
myGameLogic.addPiece(newPiece.id, 6);
console.log(myGameLogic);

console.log(myGameState);

const gameContainer = document.querySelector("#game-container");
const gameUI = new GameUI(gameContainer, myGameLogic);
