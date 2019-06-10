var grassArr = [];
var grassEaterArr = [];
var herbivorouEaterArr = []
var spiderArr = []
var dragonArr = []
var side = 10;
var matrix;
var m,n
m = 50;
n = m
var mat = [];
var matrix;
function pushing(arr) {
    var d = [];
    for (var i = 0; i < m; i++) {
        var rand = Math.floor(Math.random() * 5)
        d.push(rand)
    }
    var randDragon = [0, 2, 3, 5, 0, 0]
    var randIndex = Math.floor(Math.random() * randDragon.length+1)
    d.push(randDragon[randIndex])
    arr.push(d)
    return arr
}
for (var i = 0; i < n; i++) {
    matrix = pushing(mat)
}
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {   
        for (var x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
            }
            else if (matrix[y][x] == 3) {
                var hret = new HerbivorouEater(x, y, 3)
                herbivorouEaterArr.push(hret)
            }
            else if (matrix[y][x] == 4) {
                var spider = new Spider(x, y, 4)
                spiderArr.push(spider)
            } 
            else if (matrix[y][x] == 5) {
                var dr = new Dragon(x, y, 5)
                dragonArr.push(dr)
            }
        }
    }   
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {    
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#333")
            }
            else if (matrix[y][x] == 5) {
                fill('orange')
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].dead();
    } 
    for (var i in herbivorouEaterArr) {
        herbivorouEaterArr[i].move();
        herbivorouEaterArr[i].eat();
        herbivorouEaterArr[i].mul()
        herbivorouEaterArr[i].dead();
    } 
    for (var i in spiderArr) {
        spiderArr[i].move();
        spiderArr[i].eat();
        spiderArr[i].mul()
        spiderArr[i].dead();
    } 
    for (var i in dragonArr) {
        dragonArr[i].move();
        dragonArr[i].eat();
        dragonArr[i].mul()
        dragonArr[i].dead();
    } 
}
