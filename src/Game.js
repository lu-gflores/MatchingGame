import Grid from './Grid.js'
import Board from './Board.js'
const { init, GameLoop, Sprite, initPointer, track, load, on } = kontra;


export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.numberOfCols = 8;
        this.numberOfRows = 8;
        this.blockSize = 35;
        this.init();
    }
    init() {
        console.log('initalizing gamne')
        const { canvas, context } = init();
        this.canvas = canvas;
        this.context = context;
        initPointer();

        this.gameLoop = GameLoop({
            update: this.update.bind(this),
            render: this.render.bind(this),
        });

        this.createGrid()
        this.createBoard()
        this.load();
    }
    render() {
        //render sprites
        this.grid.render()
    }
    update() {

    }
    load() {
        console.log('loading assets')

        on('assetLoaded', (asset, url) => {
            asset.id = url;
        })
        //promised based asset loader that will return promise
        // that resolves when all assets are loaded
        load(
            'assets/images/bean_blue.png',
            'assets/images/bean_green.png',
            'assets/images/bean_orange.png',
            'assets/images/bean_pink.png',
            'assets/images/bean_purple.png',
            'assets/images/bean_red.png',
            'assets/images/bean_yellow.png',
            'assets/images/bean_white.png',
            'assets/images/bean_dead.png',
        ).then((assets) => {
            this.assets = assets;
            this.start();
            console.log(this.assets)
        }).catch((error) => {
            console.log(error)
        })
        
    }
    start() {
        console.log('starting game')
        this.gameLoop.start()
    }
    createGrid() {
        this.grid = new Grid({
            numberOfRows: this.numberOfRows,
            numberOfCols: this.numberOfCols,
            cellSize: this.blockSize + 4,
            x: 25,
            y: 180,
            color: 'lavender'
        });
    }
    createBoard() {
        this.board = new Board(
            this.numberOfRows,
            this.numberOfCols,
            6,
            true
        );
        window.board = this.board;
        
    }
}