PAC-MAN:
Pac-Man is a maze action video game. 

Remake of Chris Course Youtube video of how to create Pac-Man. 

Goal:
My goals was to used Chris's tutorial as a walkthrough and skeleton that throughout my coding experience I can expand upon.


Build Status:  
Written in HTML5 + CSS + Javascript + Canvas 

Play:
You can play the game on all canvas-enabled browsers. 

Code Style:
Global Variables

Classes
-Player(PacMan)
-Boundaries
-Ghost
-Pellets
-PowerUp

Functions 
-Collision detection (line 386) - predicts and allow pacman to advoid hitting boundary is correct arrow key is pressed
-Animation Function (line 396) - provide us the animation of pac man moving 
-Map/Boundary Function  (line 237)- create the boundaries 
-Create Image Function (line 231) - creates the images used for boundaries

Event Listerners 
-Arrow key up
-Arrow key down

Tech/Framework 
spread syntax (...object)
switch case statement 
if else statement

Features:
Touch controls are up, down, left, and right arrow keys. 
Power Pellet turn ghost blue and allow you to attack them 
Player moves until they hit a boundary

Challenges:
Collision Function - Two days to finnally get it to work. This was by far the most diffcult concept to grasp. 


Successes: 
Gaining knowledge about canvas 
Challenging myself to learn diffcult topics 
Showed me how to build a project from scratch 



Credits: 
Chris Course Youtube: https://www.youtube.com/watch?v=5IMXpp3rohQ&list=RDCMUC9Yp2yz6-pwhQuPlIDV_mjA&start_radio=1&rv=5IMXpp3rohQ&t=18


Future Feature I would like to add: 
Flash on ghost as time expired 
Respawn the ghost once they died
Give Pac-Man three lives 
Have ghost spawn in a cage 
Sprit



<!-- Introduction: 

Pac-Man is a maze action video game. This version of Pac-Man is built using HTML 5 Canvas, JavaScript and Casacading Style Sheet (CSS). 

Table of Content:
1.Project setup
2.Generate map boundaries
3.add pacman with movement 
4.add collison detection 
5.swap boundaries with images 
6.generate pellets
7.remove pellets on collison 
8.add scor 
9.create ghost 
10.create power-up
11.add win condition 
12.lay out a full level 
13.pacman chomp animation 

Project Setup:
    HTML 5 Canvas is a element within HTML. Once you create the element in HTML a canvas is create that we can draw on and manipulate the pieces within it. 
Technology used:
    canvas - set up canvas in window
    windows height and width methods to allow the canvas to fill the entire link of the windows. 
    .getContext('2d): method used to pass methods and functions to allow us to draw, only 2d images. 

Technology used:
//Build Rectangle 
    c.fillRect(x,y,width,height): method of canvas, allow us to create rectangle. Take in four properties x-axis; y-axis; width; and height.
    c.fillstyle: to change the color of our rectangle 

//Build Arc/Circle/ Pac-Man && Ghost
    c.arc(x,y,radius,startAngle, endAngle): x vaule, y vaule, radius, startAngle- at what angle do we want to draw the arc; endAngle how long do we want the arc to go one for.

//animation function 
    requestAnimationFrame(): create a loop for the function called in the parameters 
    c.clearRect(0,0,innerwidth, innerheight): clear canvas 
    math.random(): give us a random intergers between 0 and 1

//Map boundaries
    create a class call boundary 
        properties of a boundary include its position, width and height. 
        methods of a boundary includes... 
            draws()- draws the boundary  
    create a variable called Map to store mutiple arrays. Each array contains a string of symbols. 
    we then loop over each row(array) within the maps variable. within that loop we loops over each string. Each string that contains a symbol will be stored in the boundaries array. 
    create a array call boundaries to store our boundaries create from our Map forEach loop. Create a forEach loop to loop over the boundary array and run the draw method.  -->
    


