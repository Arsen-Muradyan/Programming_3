function setup() {
    var socket = io();
    var side = 20;
    var matrix = [];
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterElement = document.getElementById('grassEaterCount')
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        var matirxStr = matrix.join()
        var grassCount = matirxStr.match(/1/g)
        var grassEat = data.grassEat; 
        if (grassCount !== null) {
            grassLength =  grassCount.length
        } else {
            grassLength = 0
        }
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
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
        grassCountElement.innerText = grassLength === 0 ? 'Չի ծնվել' : `Ծնվել է ${grassLength} հատ`
        grassEaterElement.innerHTML = `Կերել է ${grassEat} հատ`
    }
}
