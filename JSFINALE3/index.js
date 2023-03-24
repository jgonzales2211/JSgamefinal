const platform = createImage('./img/platform.png');
const barrel = createImage('./img/barrel.png');
const background = createImage('./img/background.png');
const barrelSmall = createImage('./img/barrelSmall.png');
const spriteRunRight = createImage('./img/spriteRunRight.png');
const spriteStand = createImage('./img/spriteStand.png');
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1534
canvas.height = 703

const gravity = 1.5; 
const platformWidth = 153;
const platformHeight = 69;


class Player {
    
    constructor() {
        this.speed = 7
        this.position = {
            x: 0,
            y: 525,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 200;
        this.height= 200;
        this.image = spriteStand;
        this.frames = 0;
        this.sprites = {
           stand: {
                right: spriteStand, 
                cropWidth: 150,
                width: 200
            } , 
            run: {

                right: spriteStand,
                cropWidth: 150,
                width: 200

            }
        }
        this.currentSprite = this.sprites.stand;
        this.currentCropWidth = 150;
    }
    draw() {
        //c.drawImage(this.image, this.currentCropWidth * this.frames, 0, 180 ,300, this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.currentCropWidth * this.frames, 0, this.currentCropWidth , 300,  this.position.x, this.position.y,
           this.width, this.height);
    }
    update() {
        this.frames;
        if(this.frames && this.currentSprite===this.sprites.stand)this.frames = 0;
        this.draw()
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y 

        if(this.position.y + this.height + 
            this.velocity.y <= canvas.height)
        this.velocity.y += gravity;
        
    
    }
}

class Platform {
    constructor({ x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height =  image.height
        
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class GenericObject {
    constructor({ x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height =  image.height
        
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc   
    return image
}
let platformImage = createImage('img/platform.png');



let player = new Player()
let platforms = []
let genericObjects = []


const keys = {
    right: { pressed: false
    },
    left: { pressed: false
    },
   
    };

let scrollOffset = 0

function init() {



platformImage = createImage('img/platform.png');


 player = new Player()
 platforms = [ new Platform({x: platform.width * 4 + 285 -3 + platform.width - barrelSmall.width, y:335, image: barrelSmall}),
    new Platform({
    x:-1,
     y: 620,
     image: platformImage

}), 
new Platform({x: platform.width -3, y: 620, image: platformImage}),
new Platform({x: platform.width *2  + 300, y:620, image: platformImage}),
new Platform({x: platform.width * 3 + 400, y:570, image: platformImage}),
new Platform({x: platform.width * 4 + 300 -2, y:470, image: platformImage}),
new Platform({x: platform.width * 5 + 500 -2, y:620, image: platformImage}),
new Platform({x: platform.width * 6 + 700 -2, y:220, image: platformImage}),
new Platform({x: platform.width * 7 + 900 -2, y:620, image: platformImage}),
new Platform({x: platform.width * 8 + 1200 , y:620, image: platformImage}),
]
genericObjects = [
    
    new GenericObject({
        
        x: -1,
        y: -1,
        image: background
}),
new GenericObject({
        x: 200,
           y: 423,
           image: barrel
}),
new GenericObject({
    x: 275,
       y: 510,
       image: barrelSmall
}),
new GenericObject({
    x: 1150,
       y: 423,
       image: barrel
}),

new GenericObject({
    x: 1850,
       y: 423,
       image: barrel
}),
]


scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate);
    
    c.fillStyle = 'rgb(21,66,113)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    
    platforms.forEach((platform) => {
        platform.draw()
    })
player.update()

    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100) ||
     keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = -player.speed
    }else { 
        player.velocity.x = 0;
        


if (keys.right.pressed) {
    scrollOffset += 5
    platforms.forEach((platform) => {
        platform.position.x -= player.speed
    })
    genericObjects.forEach(genericObject => {
        genericObject.position.x -= player.speed * 0.66
    })
    
} else if (keys.left.pressed && scrollOffset >0) {
    scrollOffset -= player.speed
    platforms.forEach((platform) => {
        platform.position.x += player.speed
    })
    genericObjects.forEach(genericObject => {
        genericObject.position.x += player.speed * 0.66
    })
    
}
    }
    
    platforms.forEach((platform) => {
    if(player.position.y + player.height <= platform.position.y && 
        player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x && player.position.x 
        <= platform.position.x + platform.width) 
        //if(player.position.y + player.height <= platform.position.y && 
           // player.position.y + player.height + player.velocity.y >= platform.position.y)
           {
        player.velocity.y = 0
    }
})
if (scrollOffset > platform.width * 5 + 800) {
    console.log('You Win')
} if (player.position.y > canvas.height) {
    init(); //ends game when player loses
}
}
init()
animate()

addEventListener('keydown', ({keyCode}) => {
    
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed= true
            break

            case 83:
            console.log('down')
            break

            case 68:
            console.log('right')
        keys.right.pressed = true
        player.currentSprite = player.sprites.stand
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
             break

            case 87:
            console.log('up')
            player.velocity.y -= 20
            break
    }
})

addEventListener('keyup', ({keyCode}) => {
    
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break

            case 83:
            console.log('down')
            break

            case 68:
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
             break

            case 87:
            console.log('up')
            player.velocity.y -= 10
            break
    }
})