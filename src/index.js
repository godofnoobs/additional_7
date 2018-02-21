module.exports = function solveSudoku(matrix) {
//function solveSudoku(matrix) {

solveSudokuWraper(matrix);

return matrix;


/*
var inp = [
    [5, 3, 4, 6, 7, 8, 9, 0, 0],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
*/

function solveSudokuWraper(inp) {
    var flagChanged = 1;
    var dim = 9;
    var reference = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    while (flagChanged == 1) {
        
        var coordinates = coorGenerator(dim);
        for (var i = 0; i < 81; i++) {
            var currentCoord = coordinates.next().value;
            var currentCandidates = findCandidates(currentCoord);
            if (currentCandidates.length == 1) {
                inp[currentCoord[0]][currentCoord[1]] = currentCandidates[0];
                continue;
            }
        }
        flagChanged = 0;
    }






    function findCandidatesRow(coord, cand) {
        for (var i = 0; i < dim; i++) {
            var x = inp[coord[0]][i];
            if (x > 0) {
                var position = cand.indexOf(x);
                if (position != -1)
                    cand.splice(position, 1);
            }
        }
        return;
    }
    function findCandidatesCol(coord, cand) {
        for (var i = 0; i < dim; i++) {
            var x = inp[i][coord[1]];
            if (x > 0) {
                var position = cand.indexOf(x);
                if (position != -1)
                    cand.splice(position, 1);
            }
        }
        return;
    }
    function evalQuadr(coord) {
        var coordQuadr = coord.slice().map(function (el) {
            return Math.floor(el / 3) * 3;
        });
        return coordQuadr;
    }
    function findCandidatesQuadr(c, cand) {
        var coord = evalQuadr(c);
        for (var i = coord[0]; i < coord[0] + 3; i++)
            for (var j = coord[1]; j < coord[1] + 3; j++) {
                var x = inp[i][j];
                if (x > 0) {
                    var position = cand.indexOf(x);
                    if (position != -1)
                        cand.splice(position, 1);
                }
            }
    }
    function findCandidates(coord) {
        var cand = reference.slice();
        findCandidatesRow(coord, cand);
        findCandidatesCol(coord, cand);
        findCandidatesQuadr(coord, cand);
        return cand;
    }
    function * coorGenerator(dim) {
        for (var i = 0; i < dim; i++)
            for (var j = 0; j < dim; j++) {
                yield [i, j];
            }
    }
}
}
//solveSudokuWraper(inp);
//alert('dick');
//alert(inp[0][8]);