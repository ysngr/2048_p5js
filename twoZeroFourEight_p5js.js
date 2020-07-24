
const SIZE = 4;

const BOARDSIZE = 300;
const BOARDGUTTER = 15;
const CANVASSIZE = BOARDSIZE + 2*BOARDGUTTER;
const PANELSIZE = BOARDSIZE / SIZE;


let mdl, view, ctrl;


function setup() {  
  createCanvas(CANVASSIZE, CANVASSIZE);
  mdl = new Model();
  view = new View();
  ctrl = new Control();
  //mdl.debug_setBeforeEnd();
  //mdl.debug_setPair();
}


function draw() {
  translate(BOARDGUTTER, BOARDGUTTER);
  view.board();
  if ( mdl.isGameFinished() ) {
    view.finMessage();
  }
}
