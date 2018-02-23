//module.exports = function solveSudoku(m) {
matrix = [
    [0, 5, 0, 4, 0, 0, 0, 1, 3],
    [0, 2, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 8, 5, 6, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 0, 0],
    [3, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 7, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0]
  ];


function solveSudoku(m) {
    var dim = 9;
    var reference = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var def = [1, 1, 1, 1, 1, 1, 1, 1, 1];


    var flagChanged = 1;
    var matrix = m;
    var candidates;
    var coordAll = coordGetAll(dim);


    for (var k = 0; k < 81; k++) {
        for (var i = 0; i < coordAll.length; i++) {
            flagChanged = 0;
            var x = coordAll[i][1];
            var y = coordAll[i][0];
            if (matrix[y][x] !== 0)
                continue;
            var candidates = findCandidatesAll([y, x]);
            if (candidates.length === 1) {
                matrix[y][x] = candidates[0];
                flagChanged = 1;
                break;
            }
            var deficit = findDeficit([y, x], 'row');
            if (value2ways(candidates, deficit)) {
                matrix[y][x] = deficit[0];
                flagChanged = 1;
                break;
            }
            var deficit = findDeficit([y, x], 'col');
            if (value2ways(candidates, deficit)) {
                matrix[y][x] = deficit[0];
                flagChanged = 1;
                break;
            }
            var deficit = findDeficit([y, x], 'seg');
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
        console.log(i);
    });


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

    function findCandidates(coord, cand, get) {
        if (get == 'raw')
            var coordArr = getCoordRaw(coord, dim);
        else if (get == 'col')
            var coordArr = getCoordCol(coord, dim);
        else
            var coordArr = getCoordSeg(coord, dim);
        coordArr.forEach(function (i) {
            var el = matrix[i[0]][i[1]];
            if (el > 0) {
                var position = cand.indexOf(el);
                if (position !== -1)
                    cand.splice(position, 1);
            }
        });
        return cand;
    }
    function findCandidatesAll(coord) {
        var candidates = reference.slice();

        findCandidates(coord, candidates, 'raw');
        findCandidates(coord, candidates, 'col');
        findCandidates(coord, candidates, 'seg');

        return candidates;
    }

    function findDeficit(coord, get) {
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
                    var cand = findCandidatesAll([y, x]);
                    cand.forEach(function (j) {
                        values.push(j);
                    });
                }
            }
        });
        return ref.filter(function (i) {
            return !values.includes(i);
        });
    }

    function value2ways(cand, def) {
        if (def.length === 1 && cand.includes(def[0]))
            return true;
        return false;
    }
return matrix;
};

solveSudoku(matrix);