export default class Board {
    constructor(rows, cols, blockVariations, debug = false) {
        this.rows = rows;
        this.cols = cols;
        this.blockVariations = blockVariations;
        this.debug = debug;
        this.grid = [];

        this.reserverGrid = [];
        for(let i = 0; i < rows; i++) {
            this.grid.push([])
            this.reserverGrid.push([])
        }
        
        this.populateGrid();
        this.populateReserveGrid();
        this.consoleLog()
    }  

    populateGrid () {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                const variation = Math.floor(Math.random() * this.blockVariations) + 1
                this.grid[i].push(variation)
            }
        }
    }

    populateReserveGrid() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                const variation = Math.floor(Math.random() * this.blockVariations) + 1
                this.reserverGrid[i].push(variation)
            }
        }
    }
    consoleLog () {
        if (this.debug) {

            let prettyString = '';
            for(let i = 0; i < this.rows; i++) {
                prettyString += '\n';
                for(let j = 0; j < this.cols; j++) {
                   prettyString += ' ' + this.reserverGrid[i][j]
                }
            }
            //seperate grids
            prettyString += '\n'
            for(let j = 0; j < this.cols; j++) {
                prettyString += ' -';
            } 
            //print main grid
            for(let i = 0; i < this.rows; i++) {
                prettyString += '\n';
                for(let j = 0; j < this.cols; j++) {
                   prettyString += ' ' + this.grid[i][j]
                }
            }
            console.log(prettyString);
      
        }

    }
}