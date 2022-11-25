export default class Piece {
  constructor(id, party) {
    this.id = id;
    this.party = party;
    this.pos = null;
    this.isHome = true;
    this.approachingPos = null;
  }
}
