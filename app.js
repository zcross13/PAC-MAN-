/* ======================
SETTING UP VARs
=========================*/
//Canvas 
const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d') //get API associate with 2d 
canvas.width = window.innerWidth //property of window object adjust width
canvas.height = innerHeight 

const scoreEl = document.getElementById('scoreEl')
/* ======================
CREATING CLASSES
=========================*/

//Grid Class
class Boundary {
    static width = 40 
    static height = 40
    constructor({position, image}){//bracket to pass it through a object
        this.position = position //instead of a set value we give it changeable value  
        this.width = 40 //set value 
        this.height = 40 
        this.image = image 
    }
    draw(){//drawing out boundary 
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

//PACMAN Class
class Player {
    constructor({
        position, 
        velocity}){
        this.position= position //position on the board 
        this.velocity = velocity //player moving 
        this.radius = 15 
        this.radians = 0.75
        this.openRate = 0.12
        this.rotation = 0
    }//draw pacman
    draw(){
        c.save()
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x,-this.position.y)
        c.beginPath()
        c.arc(this.position.x, 
            this.position.y, 
            this.radius, 
            this.radians,
            Math.PI * 2 -this.radians) // radius is half a circle * 2 make its a whole
        c.fillStyle='yellow'
        c.lineTo(this.position.x, this.position.y)
        c.fill()
        c.closePath()
        c.restore()
    }//determines how player move
    update (){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.radians < 0 || this.radians > 0.75)this.openRate =- this.openRate

        this.radians += this.openRate 
    }
    die () {

    }
}

class Ghost {
    static speed =2 
    constructor({position, velocity, color='red'}){
        this.position= position //position on the board 
        this.velocity = velocity //player moving 
        this.radius = 15 
        this.color=color
        this.prevCollisions=[]
        this.speed = 2
        this.scared =false 
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2) // radius is half a circle * 2 make its a whole
        c.fillStyle=this.scared ? "blue": this.color
        c.fill()
        c.closePath()
    }//determines how player move
    update (){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor({position}){
        this.position= position 
        this.radius = 3
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2) // radius is half a circle * 2 make its a whole
        c.fillStyle='white'
        c.fill()
        c.closePath()
    }
}

class PowerUp {
    constructor({position}){
        this.position= position 
        this.radius = 8
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2) // radius is half a circle * 2 make its a whole
        c.fillStyle='white'
        c.fill()
        c.closePath()
    }
}

/* ======================
Global Var's
=========================*/
//layout of grid
const pellets = []
const boundaries = []
const powerUps = []
const ghosts = [
    new Ghost({
        position:{
            x:Boundary.width * 5 + Boundary.width/2, //move along x axis
            y:Boundary.height * 5 + Boundary.height/2, //move along y axis
        },
        velocity:{
            x:Ghost.speed,
            y:0
        }
    }), 
    new Ghost({
        position:{
            x:Boundary.width * 4 + Boundary.width/2, //move along x axis
            y:Boundary.height * 5  + Boundary.height/2, //move along y axis
        },
        velocity:{
            x:Ghost.speed,
            y:0
        },
        color:'teal'
    }),
    new Ghost({
        position:{
            x:Boundary.width * 5 + Boundary.width/2, //move along x axis
            y:Boundary.height* 3 + Boundary.height/2, //move along y axis
        },
        velocity:{
            x:Ghost.speed,
            y:0
        },
        color:'pink'
    }),
    new Ghost({
        position:{
            x:Boundary.width * 7 + Boundary.width/2, //move along x axis
            y:Boundary.height * 3 + Boundary.height/2, //move along y axis
        },
        velocity:{
            x:Ghost.speed,
            y:0
        },
        color:'gold'
    }),
]
const player = new Player({
    position:{
        x:Boundary.width + Boundary.width/2, //move along x axis
        y:Boundary.height + Boundary.height/2, //move along y axis 
    },
    velocity:{
        x:0,
        y:0 
    }
})

const keys = {
    U: {
        pressed:false 
    },
    L:{
        pressed:false
    },
    D:{
        pressed:false
    },
    R:{
        pressed:false
    }
}

let lastKey = ""
let score = 0

const map = [
    ['1','-','-','-','-','-','-','-','-','-','2'],
    ['|','.','.','.','.','.','.','.','.','p','|'],
    ['|','.','bl','.','l','r','.','l','r','.','|'],
    ['|','.','p','.','.','.','.','.','.','.','|'],
    ['|','.','t','.','bl',' ','bl','.','t','.','|'],
    ['|','.','|','.',' ',' ',' ','.','|','.','|'],
    ['|','.','b','.','l','-','r','.','b','.','|'],
    ['|','.','.','.','.','.','.','.','.','.','|'],
    ['|','.','l','r','.','.','.','l','r','.','|'],
    ['|','.','.','.','.','t','.','.','.','.','|'],
    ['|','.','bl','.','l','^','r','.','bl','.','|'],
    ['|','p','.','.','.','.','.','.','.','p','|'],
    ['4','-','-','-','-','-','-','-','-','-','3']
]





/* ======================
Functions 
=========================*/
//create img 
function createImage(src){
    const image = new Image()
    image.src= src 
    return image
}
    //Loop through each row
map.forEach((row, i) => {
    row.forEach((symbol, j) => { //for each symbol 
        switch(symbol){ 
            case '-': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeHorizontal.png")
                }))
                break 
                case '|': 
                boundaries.push(new Boundary({ 
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i  
                    }, 
                    image:  createImage("./images/pipeVertical.png")
                }))
                break 
                case '1': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeCorner1.png")
                }))
                break
                case '2': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeCorner2.png")
                }))
                break
                case '3': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeCorner3.png")
                }))
                break
                case '4': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeCorner4.png")
                }))
                break
                case 'bl': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/block.png")
                }))
                break
                case 'r': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/capRight.png")
                }))
                break
                case 'l': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/capLeft.png")
                }))
                break
                case '+': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeCross.png")
                }))
                break
                case 't': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/capTop.png")
                }))
                break
                case 'b': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/capBottom.png")
                }))
                break
                case '^': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeConnectorTop.png")
                }))
                break
                case '<': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }, 
                    image: createImage("./images/pipeConnectorRight.png")
                }))
                break
                case '.': 
                pellets.push(new Pellet({ 
                    position:{
                        x:  j * Boundary.width + Boundary.width/2, 
                        y: i * Boundary.height + Boundary.height/2  
                    }, 
                }))
                break
                case 'p': 
                powerUps.push(new PowerUp({ 
                    position:{
                        x:  j * Boundary.width + Boundary.width/2, 
                        y: i * Boundary.height + Boundary.height/2  
                    }, 
                }))
                break
        }
    })
})

function circleCollidesWithRectangle({circle ,rectangle 
})
    {
    const padding = Boundary.width/2 - circle.radius -1 
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding && 
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x -padding && circle.position.x - circle.radius + circle.velocity.x <=rectangle.position.x + rectangle.width +padding && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y -padding 
            )
}

let animationId
//animation loop
function animate(){
    animationId = requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)
    if(keys.U.pressed && lastKey === 'ArrowUp') {
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
            circle:{...player, velocity:{
            x:0, 
            y:-5
        } }, 
            rectangle: boundary
        })
        ) {
            player.velocity.y = 0
            break
        }else{
            player.velocity.y =-5
        }
    }
    }else if(keys.L.pressed && lastKey ==="ArrowLeft"){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
            circle:{...player, velocity:{
            x:-5, 
            y:0
        } }, 
            rectangle: boundary
        })
        ) {
            player.velocity.x = 0
            break
        }else{
            player.velocity.x =-5
        }
    }
    }else if(keys.D.pressed && lastKey ==="ArrowDown"){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if 
            (circleCollidesWithRectangle({
            circle:{
                ...player, 
                velocity: {
            x:0, 
            y:5
        } }, 
            rectangle: boundary
        })
        ) {
            player.velocity.y = 0
            break
        }else{
            player.velocity.y =5
        }
    }
    }else if(keys.R.pressed && lastKey === "ArrowRight"){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
            circle:{...player, velocity:{
            x:5, 
            y:0
        } }, 
            rectangle: boundary
        })
        ) {
            player.velocity.x = 0
            break
        }else{
            player.velocity.x =5
        }
    }
}

// powerup
for (let i=powerUps.length - 1; 0 <= i; i--){
    const powerUp = powerUps[i]
    powerUp.draw()
//player collides with powerups
    if(
        Math.hypot(
        powerUp.position.x - player.position.x, 
        powerUp.position.y - player.position.y
        ) < 
        powerUp.radius + player.radius 
        ){
            powerUps.splice(i, 1)

            //make ghost scared 
            ghosts.forEach(ghost => {
                ghost.scared=true 
                setTimeout(() => {
                    ghost.scared=false 
                }, 5000)
            })
        }
    }

//detect collision between ghost and player 
for (let i=ghosts.length - 1; 0 <= i; i--){
    const ghost = ghosts[i]
 //ghost touches player
if(
    Math.hypot(
    ghost.position.x - player.position.x, 
    ghost.position.y - player.position.y
    ) < 
    ghost.radius + player.radius 
    ) {

        if(ghost.scared){
            ghosts.splice(i,1)
        }else{
        cancelAnimationFrame(animationId)
        console.log('you lose')
        }
    }
}
//tocuh pellets here 
for (let i=pellets.length - 1; 0 <= i; i--){
const pellet =pellets[i]
pellet.draw()

if(
    Math.hypot(
    pellet.position.x - player.position.x, 
    pellet.position.y - player.position.y
    ) < 
    pellet.radius + player.radius 
    ){
    console.log('touching')
    pellets.splice(i, 1)
    score += 10
    scoreEl.innerHTML=score
}
}

//win conditions 
if(pellets.length === 0){
    console.log('you win')
    cancelAnimationFrame(animationId)
}

    boundaries.forEach((boundary) =>{
        boundary.draw()
        if (
            circleCollidesWithRectangle({
                circle: player, 
                rectangle: boundary
            })
        )   {
            player.velocity.y=0
            player.velocity.x=0
        }   
    })
    player.update()

    ghosts.forEach((ghost) =>{
        ghost.update()

        const collisions =[]
        boundaries.forEach(boundary => {
            if (
                !collisions.includes('right') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,  
                    velocity:{
                        x:ghost.speed, 
                        y:0
                    }
                },
                rectangle: boundary
            })
            ){
                collisions.push('right')
            }


            if (
                !collisions.includes('left') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,  
                    velocity:{
                        x:-ghost.speed, 
                        y:0
                    }
                },
                rectangle: boundary
            })
            ){
                collisions.push('left')
            }

            if (
                !collisions.includes('up') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,  
                    velocity:{
                        x:0, 
                        y:-ghost.speed
                    }
                },
                rectangle: boundary
            })
            ){
                collisions.push('up')
            }

            if (
                !collisions.includes('down') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost,  
                    velocity:{
                        x:0, 
                        y:ghost.speed
                    }
                },
                rectangle: boundary
            })
            ){
                collisions.push('down')
            }
        })

        if(collisions.length > ghost.prevCollisions.length)
        ghost.prevCollisions= collisions

        if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            
            if (ghost.velocity.x>0) ghost.prevCollisions.push("right")
            else if (ghost.velocity.x<0) ghost.prevCollisions.push("left")
            if (ghost.velocity.y<0) ghost.prevCollisions.push("up")
            if (ghost.velocity.y>0) ghost.prevCollisions.push("down")

            console.log(collisions)
            console.log(ghost.prevCollisions)

            const pathways = ghost.prevCollisions.filter(collision =>{
                return !collisions.includes(collision)
            }) 
            console.log({pathways})

            const direction = pathways[Math.floor(Math.random()* pathways.length)]

            console.log({direction})

            switch(direction){
                case 'down':
                    ghost.velocity.y =ghost.speed
                    ghost.velocity.x =0
                    break
                case 'up':
                    ghost.velocity.y =-ghost.speed
                    ghost.velocity.x =0
                    break
                case 'left':
                    ghost.velocity.y =0
                    ghost.velocity.x =-ghost.speed
                    break
                case 'right':
                    ghost.velocity.y =0
                    ghost.velocity.x =ghost.speed
                    break
            }
            ghost.prevCollisions =[]
        }
    })
    if (player.velocity.x > 0) player.rotation =0
    else if(player.velocity.x <0) player.rotation = Math.PI
    else if(player.velocity.y <0) player.rotation = Math.PI * 1.5
    else if(player.velocity.y >0) player.rotation = Math.PI/2
}//end of animate

animate()



//draw pacman 
player.draw()

/* ======================
Event Listerners
=========================*/
window.addEventListener('keydown', ({key}) => {
        switch(key){
            case "ArrowUp": keys.U.pressed = true
            lastKey ="ArrowUp"
            break
        }
        switch(key){
            case "ArrowLeft": keys.L.pressed =true
            lastKey = "ArrowLeft"
            break
        }
        switch(key){
            case "ArrowDown": keys.D.pressed = true
            lastKey ="ArrowDown"
            break
        }
        switch(key){
            case "ArrowRight": keys.R.pressed=true
            lastKey="ArrowRight"
            break
        }
    // console.log(keys.R.pressed)
    // console.log(keys.D.pressed)
    // console.log(keys.U.pressed)
    // console.log(keys.L.pressed)
    })

    window.addEventListener('keyup', ({key}) => {
        switch(key){
            case "ArrowUp": keys.U.pressed=false
            break
        }
        switch(key){
            case "ArrowLeft":keys.L.pressed=false
            break
        }
        switch(key){
            case "ArrowDown": keys.D.pressed=false
            break
        }
        switch(key){
            case "ArrowRight": keys.R.pressed=false
            break
        }
        // console.log(keys.R.pressed)
        // console.log(keys.D.pressed)
})