//create strings displaying different phrases for each distortion phase 
var h = "Hello human";
var w = "Welcome to The Underworld";
var b = "Be careful";
var t = "Time's up";

//variable allowing user to cycle between different types of distortions 
var distortion = 1;


function preload() {
  //load image of television
  television = loadImage("TV.jpg");  
  //load image of colored bars
  coloredbars = loadImage("coloredbars.jpg");
}


function setup() {
  //set window to match dimensions of television
  createCanvas (700, 500);
  
   //load television to fit entire processing window with colored bars on top of tv screen
  image (television, 0, 0);
  image (coloredbars, 67, 67, 450, 330);

  //load font, Courier New, size 25
  textFont("Courier New", 25);
}


function draw() { 
  //normal television, no issues
  if (distortion == 1) { 
     //draw television to fit entire window with colored bars on top of the screen
    image (television, 0, 0);
    image (coloredbars, 67, 67, 450, 330);
    fill (0);
    
   //first phrase is loaded without input from the user
   text(h.substring(), width/3, height/2);
  }  

  if (distortion == 2) {
    //draw television to fit entire window with colored bars on top of the screen
    image (television, 0, 0);
    image (coloredbars, 67, 67, 450, 330);

    //phrase appears on screen without input from the user
    fill (0);
    text(w, width/9, height/2);

    //adapted from Generative Design: P_4_1_2_01.pde
    //tv+screen are loaded into window and sections of the images are copied to slightly different positions (randomly selected)
    let x1 = random(20, 80);
    let y1 = 0;

    let x2 = round(x1 + random(-5, 5));
    let y2 = round(random(-2, 2));
    //width and height of tv+screen distorted slightly based on mouse position (copied and moved) 
    let wi = mouseX; 
    constrain(mouseX, 50, 80);
    let he = mouseY; 
    constrain(mouseY, 300, 400);

    copy(x1, y1, wi, he, x2, y2, wi, he);
  }

  if (distortion == 3) {
    //phrase appears on screen without input from the user, fades in and out
    smooth();
    fill (0, 0, 0, 2);
  
    text(b, width/4, height/2);
    //rectangles take on color of screen image depending on mouse position
    noStroke();  
    for (let i = 0; i < 4000; i++) {
      let x = random (mouseX);
      let y = random (mouseY); 
      let c = color;
      c = coloredbars.get(x, y);
      fill (c);
      rect (x, y, 20, 2);
   
      let xx = random (mouseX);
      let yy = random (mouseY);
      let w = color;
      w = television.get(xx, yy);
      fill (w);
      rect (xx, yy, 20, 2);
    }
  }

  if (distortion == 4) {
    //phrase appears on screen without input from the user, distorts with mouse movements
    fill (0);
    text(t, width/4, height/2);

    //adapted from Generative Design: P_4_1_2_01.pde
    //tv+screen are loaded into window and sections of the images are copied to randomly selected positions upon movement of the mouse (distortion)
    let x1 = random(20, 80);
    let y1 = 0;

    let x2 = round(x1 + random(-4, 4));
    let y2 = round(random(-4, 4));

    let wi = mouseX; 
    constrain(mouseX, 200, width);
    let he = mouseY; 
    constrain(mouseY, 200, height);

    copy(x1, y1, wi, he, x2, y2, wi, he);
  }
}

//pressing a key allows user to cycle between different types of distortions 
function keyPressed() {
  distortion = distortion + 1;
  if (distortion > 4) {
    distortion = 1;
    //when distortion type reaches phase four image resets so that static from phase three does not carry over
  } else if (distortion == 4) {
    image (television, 0, 0);
    image (coloredbars, 67, 67, 450, 330);
  }
}
