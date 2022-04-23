export default class Player {
    constructor(id, name, party) {
        this.id = id;
        this.name = name;
        this.party = party;
        this.hasMoved = false;
    }
}