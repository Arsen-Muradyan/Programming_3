class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
    }
    mul() {
        this.multiply+=2
        var newCell = random(super.chooseCell(0));
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }  
    }
}
