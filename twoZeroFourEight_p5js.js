/* 2048 (p5.js) */


const BOARD_SIZE = 300;
const CANVAS_SIZE = BOARD_SIZE + 30;
const SIZE = 4;
const PNL_SIZE = BOARD_SIZE / SIZE;


let mdl, view;



function setup() {  
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  mdl = new Model();
  view = new View();
}


function draw() {
  translate(15, 15);
  view.board();
  if ( mdl.isGameFinished() ) {
    view.finMessage();
  }
}
