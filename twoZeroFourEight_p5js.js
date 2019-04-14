/* 2048 (p5.js) */


const CANVAS_SIZE = 300;
const SIZE = 4;
const PNL_SIZE = CANVAS_SIZE / SIZE;


let mdl, view;



function setup() {  
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  mdl = new Model();
  view = new View();
}


function draw() {
  view.board();
  if ( mdl.isGameFinished() ) {
    view.finMessage();
  }
}
