/* 2048 */

/* constants */
const CANVAS_SIZE = 300;
const SIZE = 4;

/* grobal variables */
var panels = [];



function setup() {  
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  this.genPanels();
}

function genPanels() {

  /* generate panels */
  var panelsRow = [];
  for (var column = 0; column < SIZE; column++) {
    panelsRow.push(0);
  }
  for (var row = 0; row < SIZE; row++) {
    panels.push(panelsRow.concat());
  }

  /* put initial panels */
  for (var i = 0; i < 2; i++) {
    genNewPanel();
  }

  return ;
}


function draw() {
  board();
  if ( isGameFinished() ) {
    finMessage();
  }
}
