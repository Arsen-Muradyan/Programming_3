class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply+=2
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }  
    }
}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell = random(this.chooseCell(1))
        if (typeof newCell === 'object') {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 2 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }
    dead() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class  HerbivorouEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell = random(this.chooseCell(2))
            if (typeof newCell == 'object') {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in herbivorouEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy++;
            }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 6  &&  newCell) {
            var newHerbivorousEater = new HerbivorouEater(newCell[0], newCell[1], this.index);
            herbivorouEaterArr.push(newHerbivorousEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }
    dead() {
        if (this.energy < 3) {
            matrix[this.y][this.x] = 0
            for (var i in herbivorouEaterArr) {
                if (this.x == herbivorouEaterArr[i].x && this.y == herbivorouEaterArr[i].y) {
                    herbivorouEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Spider {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 4;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell4 = random(this.chooseCell(4))
        var newCell2 = random(this.chooseCell(2)) 
        var newCell1 = random(this.chooseCell(1))
        var newCell0 = random(this.chooseCell(0))
        var newCell
        var arr = []
        var cells = [newCell0, newCell1, newCell2,newCell4]
        for (var i in cells) {
            if (typeof cells[i] == "object") {
                newCell = arr.concat(cells[i])
            }
        }        
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 4) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index
                this.y = newY;
                this.x = newX;
            }
            else if(matrix[newY][newX] == 2) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
            }
            else if(matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
            }
            this.energy-=2
        }
    }
    eat() {
        var newCell = random(this.chooseCell(3)) 
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in herbivorouEaterArr) {
                if (newX == herbivorouEaterArr[i].x && newY == herbivorouEaterArr[i].y) {
                    herbivorouEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX; 
            this.energy += 3;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 7 && newCell) {
            var newSpider = new Spider(newCell[0], newCell[1], this.index);
            spiderArr.push(newSpider);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 6;
        }
    }
    dead() {
        if (this.energy < 2) {
            matrix[this.y][this.x] = 0
            for (var i in spiderArr) {
                if (this.x == spiderArr[i].x && this.y == spiderArr[i].y) {
                    spiderArr.splice(i, 1);
                    break;
                }
            }
        }
    }
} 
class Dragon {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 18;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0))
        if (typeof newCell !== "undefined") {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy-=3;
        }
    }
    eat() {
        var newCell4 = random(this.chooseCell(4))
        var newCell3 = random(this.chooseCell(3))
        var newCell2 = random(this.chooseCell(2))
        var newCell1 = random(this.chooseCell(1))
        var newCell;
        var arr = []
        var cells = [newCell4, newCell3, newCell2, newCell1];
        for (var i in cells) {
            if (typeof cells[i] == "object") {
                newCell = arr.concat(cells[i])
            }
        }
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 4) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in spiderArr) {
                    if (newX ==  spiderArr[i].x && newY == spiderArr[i].y) {
                        spiderArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 6;
            }
            else if (matrix[newY][newX] == 3) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in herbivorouEaterArr) {
                    if (newX == herbivorouEaterArr[i].x && newY == herbivorouEaterArr[i].y) {
                        herbivorouEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 4 
            }
            else if(matrix[newY][newX] == 2) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 3 
            }
            else if(matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy++
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 30 && newCell) {
            var newDragon = new Dragon(newCell[0], newCell[1], this.index);
            dragonArr.push(newDragon);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 18;
        }
    }
    dead() {
        if (this.energy <= 16) {
            matrix[this.y][this.x] = 1
            var newgrass = new Grass(this.x, this.y, 1) 
            grassArr.push(newgrass) 
            for (var i in dragonArr) {
                if (this.x == dragonArr[i].x && this.y == dragonArr[i].y) {
                    dragonArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
