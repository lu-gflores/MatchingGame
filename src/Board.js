export default class Board {
    constructor(rows, cols, blockVariations, debug = false) {
        this.rows = rows;
        this.cols = cols;
        this.blockVariations = blockVariations;
        this.debug = debug;
        this.grid = [];

        this.reserverGrid = [];
        for (let i = 0; i < rows; i++) {
            this.grid.push([])
            this.reserverGrid.push([])
        }

        this.populateGrid();
        this.populateReserveGrid();
        this.consoleLog()
    }

    populateGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const variation = Math.floor(Math.random() * this.blockVariations) + 1
                this.grid[i].push(variation)
            }
        }
    }

    populateReserveGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const variation = Math.floor(Math.random() * this.blockVariations) + 1
                this.reserverGrid[i].push(variation)
            }
        }
    }
    consoleLog() {
        if (this.debug) {

            let prettyString = '';
            for (let i = 0; i < this.rows; i++) {
                prettyString += '\n';
                for (let j = 0; j < this.cols; j++) {
                    prettyString += ' ' + this.reserverGrid[i][j]
                }
            }
            //seperate grids
            prettyString += '\n'
            for (let j = 0; j < this.cols; j++) {
                prettyString += ' -';
            }
            //print main grid
            for (let i = 0; i < this.rows; i++) {
                prettyString += '\n';
                for (let j = 0; j < this.cols; j++) {
                    prettyString += ' ' + this.grid[i][j]
                }
            }
            console.log(prettyString);

        }

    }
    swap(source, target) {
        const temp = this.grid[target.row][target.col];
        this.grid[target.row][target.col] = this.grid[source.row][source.col]
        this.grid[source.row][source.col] = temp;
        const tempPos = {
            row: source.row,
            col: source.col,
        }
        source.row = target.row
        source.col = target.col
        target.row = tempPos.row
        target.col = tempPos.col
        this.consoleLog();
    }
    checkAdjacent(source, target) {
        const diffRow = Math.abs(source.row - target.row);
        const diffCol = Math.abs(source.col - target.col);
        const isAdjacent = (diffRow === 1 && diffCol === 0) || (diffRow === 0 && diffCol === 1)
        return isAdjacent
    }
    isChained(block) {
        let isChained = false;
        const variation = this.grid[block.row][block.col]
        const { row, col } = block;
        //left
        if (variation === this.grid[row][col - 1] && variation === this.grid[row][col - 2]) {
            isChained = true;
        }
        //right
        if (variation === this.grid[row][col + 1] && variation === this.grid[row][col + 2]) {
            isChained = true;
        }
        //up
        if (this.grid[row - 2]) {
            if (variation === this.grid[row - 1][col] && variation === this.grid[row - 2][col]) {
                isChained = true;
            }
        }
        //down
        if (this.grid[row + 2]) {
            if (variation === this.grid[row + 1][col] && variation === this.grid[row + 2][col]) {
                isChained = true;
            }
        }
        //center horizontal
        if (variation === this.grid[row][col - 1] && variation === this.grid[row][col + 1]) {
            isChained = true;
        }
        //center vertical
        if (this.grid[row + 1] && this.grid[row - 1]) {
            if (variation === this.grid[row + 1][col] && variation === this.grid[row - 1][col]) {
                isChained = true;
            }
        }
        return isChained
    }
    findAllChains() {
        const chained = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.isChained({ row: i, col: j })) {
                    chained.push({ row: i, col: j })
                }
            }
        }
        return chained;
    }
    clearChains() {
        //get all blocks that need to be cleared
        const chainedBlocks = this.findAllChains();
        chainedBlocks.forEach((block) => {
            //reset to 0
            this.grid[block.row][block.col] = 0;
    
            //destroy block


        })
        this.consoleLog();
    }
}