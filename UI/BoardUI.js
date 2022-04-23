
export default class BoardUI {
  constructor(map, rootElement) {
    this.map = map;
    // this.cells = [];
    this.rootElement = rootElement;

  }

  render(){
    // const cells = document.
    for(let i=0; i<this.map.width * this.map.height; i++){
      const cell = document.createElement("div");

      cell.textContent = this.map.cells[i].player[0];

      cell.classList.add("cell");

      this.rootElement.appendChild(cell);

      // this.cells.push(cell);
    }

  }
}
