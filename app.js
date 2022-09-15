/* ======================
SETTING UP VARs
=========================*/
//Canvas 
const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d') //get API associate with 2d 
canvas.width = window.innerWidth //property of window object adjust width
canvas.height = innerHeight 

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
    }//draw pacman
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2) // radius is half a circle * 2 make its a whole
        c.fillStyle='yellow'
        c.fill()
        c.closePath()
    }//determines how player move
    update (){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

/* ======================
Global Var's
=========================*/
//layout of grid
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

const map = [
    ['-','-','-','-','-','-','-'],
    ['|',' ',' ',' ',' ',' ','|'],
    ['|',' ','-',' ','-',' ','|'],
    ['|',' ',' ',' ',' ',' ','|'],
    ['|',' ','-',' ','-',' ','|'],
    ['|',' ',' ',' ',' ',' ','|'],
    ['-','-','-','-','-','-','-'],
]


const boundaries = []


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
        }
    })
})

function circleCollidesWithRectangle({
    circle, 
    rectangle 
})
    {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height && 
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && circle.position.x - circle.radius + circle.velocity.x <=rectangle.position.x + rectangle.width && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y
            )
}
//animation loop
function animate(){
    requestAnimationFrame(animate)
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
    boundaries.forEach((boundary) =>{
        boundary.draw()
        if (
            circleCollidesWithRectangle({
                circle: player, 
                rectangle: boundary
            })
        )   {
            console.log('we are colliding')
            player.velocity.y=0
            player.velocity.x=0
        }   
    })
    player.update()


}

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
    console.log(keys.R.pressed)
    console.log(keys.D.pressed)
    console.log(keys.U.pressed)
    console.log(keys.L.pressed)
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
        console.log(keys.R.pressed)
        console.log(keys.D.pressed)
})