/* ======================
SETTING UP GRID
=========================*/
//Canvas 
const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d') //get API associate with 2d 
canvas.width = window.innerWidth //property of window object adjust width
canvas.height = innerHeight 

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

const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-'],
]

const boundaries = []

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol){
            case '-':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j, 
                        y: Boundary.height * i 
                    }
                }))
                break
        }
    })
})

boundaries.forEach((boundary) =>{
    boundary.draw()
})