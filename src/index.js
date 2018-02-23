var dim = 9;
        var reference = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var def = [1, 1, 1, 1, 1, 1, 1, 1, 1];
/*        var initial = [[0, 5, 0, 0, 7, 0, 0, 0, 1],
        [8, 7, 6, 0, 2, 1, 9, 0, 3],
        [0, 0, 0, 0, 3, 5, 0, 0, 0],
        [0, 0, 0, 0, 4, 3, 6, 1, 0],
        [0, 4, 0, 0, 0, 9, 0, 0, 2],
        [0, 1, 2, 0, 5, 0, 0, 0, 4],
        [0, 8, 9, 0, 6, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 0, 0, 0],
        [1, 6, 7, 0, 0, 2, 5, 4, 0]
        ];
        z = [[3, 5, 4, 9, 7, 6, 8, 2, 1],
        [8, 7, 6, 4, 2, 1, 9, 5, 3],
        [9, 2, 1, 8, 3, 5, 4, 7, 6],
        [7, 9, 8, 2, 4, 3, 6, 1, 5],
        [5, 4, 3, 6, 1, 9, 7, 8, 2],
        [6, 1, 2, 7, 5, 8, 3, 9, 4],
        [2, 8, 9, 5, 6, 4, 1, 3, 7],
        [4, 3, 5, 1, 8, 7, 2, 6, 9],
        [1, 6, 7, 3, 9, 2, 5, 4, 8]
        ];
*/
module.exports = function solveSudoku(inp) {
//        function solveSudoku(inp) {

        var matrix = inp;
                res = recursiveTry(matrix, inp);
                //console.log('RESULT');
                //for (var i in res) console.log(res[i]);
                return res;
        }

function coordGetAll(dim) {
var res = [];
        for (var i = 0; i < dim; i++)
        for (var j = 0; j < dim; j++) {
res.push([i, j]);
        }
return res;
}
function getCoordRaw(coord, dim) {
var y = coord[0];
        var res = [];
        for (var i = 0; i < dim; i++)
        res.push([y, i]);
        return res;
}
function getCoordCol(coord, dim) {
var x = coord[1];
        var res = [];
        for (var i = 0; i < dim; i++)
        res.push([i, x]);
        return res;
}
function getCoordSeg(coord, dim) {
var dim = 3;
        var coordSeg = evalCoordSeg(coord);
        var x = coordSeg[1];
        var y = coordSeg[0];
        var res = [];
        for (var i = y; i < y + 3; i++)
        for (var j = x; j < x + 3; j++)
        res.push([i, j]);
        return res;
}
function evalCoordSeg(coord) {
var coordSeg = coord.slice().map(function (el) {
return Math.floor(el / 3) * 3;
        });
        return coordSeg;
}

function findCandidates(coord, cand, matrix, get) {
if (get === 'raw')
        var coordArr = getCoordRaw(coord, dim);
        else if (get === 'col')
        var coordArr = getCoordCol(coord, dim);
        else
        var coordArr = getCoordSeg(coord, dim);
        coordArr.forEach(function (i) {
        var el = matrix[i[0]][i[1]];
                if (el > 0) {
        var position = cand.indexOf(el);
                if (position !== - 1)
                cand.splice(position, 1);
        }
        });
        return cand;
}
function findCandidatesAll(coord, matrix) {
var candidates = reference.slice();
        findCandidates(coord, candidates, matrix, 'raw');
        findCandidates(coord, candidates, matrix, 'col');
        findCandidates(coord, candidates, matrix, 'seg');
        return candidates;
}

function findDeficit(coord, matrix, get) {
var ref = reference.slice();
        var values = [];
        if (get == 'raw')
        var coordArr = getCoordRaw(coord, dim);
        else if (get == 'col')
        var coordArr = getCoordRaw(coord, dim);
        else
        var coordArr = getCoordSeg(coord, dim);
        coordArr.forEach(function (i) {
        var y = i[0];
                var x = i[1];
                var value = matrix[y][x];
                if (!(x == coord[1]) || !(y == coord[0])) {
        if (value)
                values.push(value);
                else {
                var cand = findCandidatesAll([y, x], matrix);
                        cand.forEach(function (j) {
                        values.push(j);
                        });
                }
        }
        });
        return ref.filter(function (i) {
        return !(values.indexOf(i) + 1); //!values.includes(i);
        });
}
function value2ways(cand, def) {
if (def.length === 1 && cand.indexOf(def[0]) != - 1)
        return true;
        return false;
}

function findPairs(matrix) {
var coordAll = coordGetAll(dim);
        var res = [];
        for (var i = 0; i < coordAll.length; i++) {
var x = coordAll[i][1];
        var y = coordAll[i][0];
        if (!matrix[y][x]) {
var temp = findCandidatesAll([y, x], matrix);
        if (temp.length === 2) {
var current = [temp, [y, x]];
        res.push(current);
        //console.log(current);
        }
}
}
return res;
}
function copyMatrix(matrix, dim) {
var res = [];
        for (var i = 0; i < dim; i++) {
res.push(matrix[i].slice());
        }
return res;
}
function changeArr(matrix, arr) {
var res = [];
        for (var i = 0; i < arr.length; i++) {
var x = arr[i][1][1];
        var y = arr[i][1][0];
        if (!matrix[y][x])
        res.push(arr[i]);
        }
return res;
}

function recursiveTry(matrix, inp, arr, step) {
if (!step)
        var step = 0;
        if (step > 10)
        return false;
        var newMatrix = copyMatrix(solveTry(matrix), dim);
        if (!arr) {
var newArr = findPairs(newMatrix);
        //console.log(arr);
        }
else {
var newArr = changeArr(newMatrix, arr);
        }
if (isFilled(newMatrix))
        if (isDone(inp, newMatrix)) {
return newMatrix;
        }
else
        return false;
        if (newArr.length) {
var newMatrix1 = copyMatrix(newMatrix, dim);
        var newMatrix2 = copyMatrix(newMatrix, dim);
        setTry(newMatrix1, newArr[0][1], newArr[0][0][0]);
        setTry(newMatrix1, newArr[0][1], newArr[0][0][1]);
        var mt = (recursiveTry(newMatrix1, inp, newArr, step++)) || (recursiveTry(newMatrix2, inp, newArr, step++));
        return mt;
        }
else
        return false;
        }

function setTry(matrix, coord, value) {
var x = coord[1];
        var y = coord[0];
        matrix[y][x] = value;
        }

function solveTry(matrix) {
var flagChanged = 1;
        var candidates;
        var coordAll = coordGetAll(dim);
        for (var k = 0; k < dim * dim; k++) {
for (var i = 0; i < coordAll.length; i++) {
flagChanged = 0;
        var x = coordAll[i][1];
        var y = coordAll[i][0];
        if (matrix[y][x] !== 0)
        continue;
        var candidates = findCandidatesAll([y, x], matrix);
        if (candidates.length === 1) {
matrix[y][x] = candidates[0];
        flagChanged = 1;
        break;
        }
var deficit = findDeficit([y, x], matrix, 'row');
        if (value2ways(candidates, deficit)) {
matrix[y][x] = deficit[0];
        flagChanged = 1;
        break;
        }
var deficit = findDeficit([y, x], matrix, 'col');
        if (value2ways(candidates, deficit)) {
matrix[y][x] = deficit[0];
        flagChanged = 1;
        break;
        }
var deficit = findDeficit([y, x], matrix, 'seg');
        if (value2ways(candidates, deficit)) {
matrix[y][x] = deficit[0];
        flagChanged = 1;
        break;
        }
}
if (!flagChanged) {
break;
        }
}


matrix.forEach(function (i) {
//console.log(i);
});
        return matrix;
        }

function isDone(init, sudoku) {
//console.log('Cheking if...')
        for (var i in sudoku) console.log(sudoku[i]);
        for (var i = 0; i < 9; i++) {
var r = Math.floor(i / 3) * 3,
        c = (i % 3) * 3;
        if (
                (sudoku[i].reduce((s, v) => s.add(v), new Set()).size != 9) ||
                (sudoku.reduce((s, v) => s.add(v[i]), new Set()).size != 9) ||
                (sudoku.slice(r, r + 3).reduce((s, v) => v.slice(c, c + 3).reduce((s, v) => s.add(v), s), new Set()).size != 9)
                )
        {//console.log('false');
                return false; }
}
return init.every((row, rowIndex) => {
return row.every((num, colIndex) => {
console.log('true');
        return num === 0 || sudoku[rowIndex][colIndex] === num;
        });
        });
        }
function isFilled(matrix) {
for (var i = 0; i < dim; i++)
        for (var j = 0; j < dim; j++) {
if (!matrix[i][j])
        return false;
        }
return true;
        }
function countZeros(matrix) {
var count = 0;
        for (var i = 0; i < dim; i++)
        for (var j = 0; j < dim; j++)
        if (!matrix[i][j])
        count++;
        return count;
        }


//z = solveSudoku(initial);
//alert(isDone(initial, z));