const {init, GameLoop, Sprite} = kontra;

const {canvas, context} = init();
let sprite = null;
console.log(canvas)
console.log(context)

const blockImage = new Image();
blockImage.src = 'assets/images/bean_blue.png';
blockImage.onload = () => {
    sprite = Sprite( {
        x: 200,
        y: 200,
        dx: 2, 
        image: blockImage
    })
};



const loop = GameLoop({ //creates the main game loop
    update:() =>{ //update the game state
        if(sprite) {
             sprite.update()
        if(sprite.x > canvas.width) {
            sprite.x =-sprite.width 
        }
        }
       
    }, 
    render:() =>{ //render the game state
        if(sprite) {
           sprite.render(); 
        }
        
    }, 
})

loop.start()