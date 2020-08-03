const {init, GameLoop, Sprite, initPointer, track} = kontra;

const {canvas, context} = init();
let sprite = null;
console.log(canvas)
console.log(context)
initPointer();


const blockImage = new Image();
blockImage.src = 'assets/images/bean_blue.png';
blockImage.onload = () => {
    sprite = Sprite( {
        x: 200,
        y: 200,
        //dx: 2, 
        image: blockImage,
        onUp: () => {
            console.log('onUp')
        },
        onOver: () => {
            console.log('onOver')
        }
    })
    
    sprite.onDown = () => {
        clickedObject(sprite);
    };

    track(sprite)
};



const loop = GameLoop({ //creates the main game loop
    update:() =>{ //update the game state
        if(sprite) {
             sprite.update()
        // if(sprite.x > canvas.width) {
        //     sprite.x =-sprite.width 
        // }
        }
  
    }, 
    render:() =>{ //render the game state
        if(sprite) {
           sprite.render(); 
        }   
    }, 
})

loop.start()