function PathFinder(col, cells) {
    this.cells = cells;
    this.col = col;

    /**
     * hold all cell which have not been fully eveluated
     * @type {Array}
     */

    this.openSet = [];
    this.closeSet = [];


    /**
     * remove item which have been seen
     * @param arr
     * @param element
     */
    this.removeFromArray = function (arr, element) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == element) {
                console.log("Remove");
                arr.splice(i, 1);
            }
        }
    };

    /**
     *
     * @param a current location
     * @param b target location
     * @returns {number}
     */
    this.heuristic = function (a, b) {
        var d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

        return d;
    };

    this.index = function (i, j) {
        if (i < 0 || j < 0 || i > this.col - 1 || j > this.col - 1) {
            return -1;
        }
        return j + i * this.col;
    };

    /**
     * add Neighbours to each current all Neighbours must have open wall
     */
    this.findEachNeighbours = function () {
        for (var i = 0; i < this.cells.length; i++) {
            var currentCell = this.cells[i];
            var northNeighbour = this.index(currentCell.x, currentCell.y - 1);
            var easeNeighbour = this.index(currentCell.x, currentCell.y + 1);
            var southNeighbour = this.index(currentCell.x + 1, currentCell.y);
            var westNeighbour = this.index(currentCell.x - 1, currentCell.y);

            if (northNeighbour > 0 && currentCell.wallStatus[0] == false) {
                this.cells[i].neighbours.push(this.cells[northNeighbour])
            }
            if (easeNeighbour > 0 && currentCell.wallStatus[2] == false) {
                this.cells[i].neighbours.push(this.cells[easeNeighbour])
            }
            if (southNeighbour > 0 && currentCell.wallStatus[1] == false) {
                this.cells[i].neighbours.push(this.cells[southNeighbour])
            }
            if (westNeighbour > 0 && currentCell.wallStatus[3] == false) {
                this.cells[i].neighbours.push(this.cells[westNeighbour])
            }
        }
    };


    this.findPath = function (x, y, targetX,targetY) {
        var currentCell = this.cells[this.index(x, y)];

        var endCell = this.cells[this.index(targetX, targetY)];
        console.log("end", endCell);

        this.openSet.push(currentCell);
        while (this.openSet.length > 0) {

            if (this.openSet.length > 0) {
                var winner = 0;
                for (var index = 0; index < this.openSet.length; index++) {
                    if (this.openSet[index].FCost < this.openSet[winner].FCost) {
                        winner = index;
                    }
                }
            }
            currentCell = this.openSet[winner];
            if (currentCell.id === endCell.id) {

                return currentCell;
            }

            this.removeFromArray(this.openSet, currentCell);
            this.closeSet.push(currentCell);

            var neighbours = currentCell.neighbours;

            for (var item = 0; item < neighbours.length; item++) {
                var neighbour = neighbours[item];

                if (!this.closeSet.includes(neighbour)) {

                    var tempG = currentCell.GCost + this.heuristic(neighbour, currentCell);

                    if (!this.openSet.includes[neighbour]) {
                        this.openSet.push(neighbour);
                    }
                    else if (tempG >= neighbour.GCost) {
                        continue;
                    }
                    neighbour.GCost = tempG;
                    neighbour.HCost = this.heuristic(neighbour, endCell);
                    neighbour.previous = currentCell;
                    neighbour.FCost = neighbour.HCost + neighbour.GCost;
                }
            }
        }
    }
}

export  default PathFinder;

