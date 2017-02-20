function Cell(id, x, y, h, w, col) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.col = col;
    this.neighbours = [];
    
    this.HCost = 0;
    this.GCost = 0;
    this.FCost = 0;
    this.isClose = false;


    this.startPoint =
    {
        x: this.x * this.w,
        y: this.y * this.h
    };

    this.wallStatus = [true, true, true, true];

    this.visited = false;

    this.walls =
    {
        north: {
            x: (this.x * this.w) + w,
            y: (this.y * this.h)
        },
        west: {
            x: (this.x * this.w) + w,
            y: (this.y * this.h) + this.h
        },
        south: {
            x: (this.x * this.w),
            y: (this.y * this.h) + this.h
        },
        east: {
            x: (this.x * this.w),
            y: (this.y * this.h)
        }
    };

    this.checkNeighbors = function (grid) {
        var neighbors = [];

        var top = grid[this.index(this.x - 1, this.y)];
        var right = grid[this.index(this.x, this.y + 1)];
        var bottom = grid[this.index(this.x + 1, this.y)];
        var left = grid[this.index(this.x, this.y - 1)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }

    };

    this.index = function (i, j) {
        if (i < 0 || j < 0 || i > this.col - 1 || j > this.col - 1) {
            return -1;
        }
        return j + i * this.col;
    }
}

export default Cell;