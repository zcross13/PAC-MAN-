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
    constructor({position}){//bracket to pass it through a object
        this.position = position //instead of a set value we give it changeable value  
        this.width = 40 //set value 
        this.height = 40 
    }
    draw(){//drawing out boundary 
        c.fillStyle ='blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-'],
]

const boundaries = []

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
    w: {
        pressed:false 
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    }
}

let lastKey = ""
/* ======================
Functions 
=========================*/

//Loop through each row
map.forEach((row, i) => {
    row.forEach((symbol, j) => { //for each symbol 
        switch(symbol){ 
            case '-': //when you see this symbol run this function
                boundaries.push(new Boundary({ //create a new square
                    position:{
                        x: Boundary.width * j, //move the square to the right
                        y: Boundary.height * i  //move the square down
                    }
                }))
                break //break the function 
        }
    })
})
//animation loop
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width, canvas.height)
    boundaries.forEach((boundary) =>{
        boundary.draw()
    })
    player.update()
    player.velocity.y=0
    player.velocity.x=0

    if(keys.w.pressed && lastKey === 'w'){
        player.velocity.y = -5
    }else if(keys.a.pressed && lastKey ==="a"){
        player.velocity.x =-5
    }else if(keys.s.pressed && lastKey ==="s"){
        player.velocity.y =5
    }else if(keys.d.pressed && lastKey === "d"){
        player.velocity.x = 5
}
}

animate()



//draw pacman 
player.draw()

/* ======================
Event Listerners
=========================*/
window.addEventListener('keydown', ({key}) => {
        switch(key){
            case "w": keys.w.pressed = true
            lastKey ="w"
            break
        }
        switch(key){
            case "a": keys.a.pressed =true
            lastKey = "a"
            break
        }
        switch(key){
            case "s": keys.s.pressed = true
            lastKey ="s"
            break
        }
        switch(key){
            case "d": keys.d.pressed=true
            lastKey="d"
            break
        }
    console.log(keys.d.pressed)
    console.log(keys.s.pressed)
    })

    window.addEventListener('keyup', ({key}) => {
        switch(key){
            case "w": keys.w.pressed=false
            break
        }
        switch(key){
            case "a":keys.a.pressed=false
            break
        }
        switch(key){
            case "s": keys.s.pressed=false
            break
        }
        switch(key){
            case "d": keys.d.pressed=false
            break
        }
        console.log(keys.d.pressed)
        console.log(keys.s.pressed)
})