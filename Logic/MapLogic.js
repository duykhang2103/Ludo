import { Maps } from '../Data/Maps.js';

export default class Map {
  constructor(mapId) {
    const board = JSON.parse(JSON.stringify(Maps[mapId]));
    this.width = board.width;
    this.height = board.height;
    this.cells = board.cells;
  }
}
