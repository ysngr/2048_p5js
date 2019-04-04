//====================================================================
//  View
//====================================================================


/* constants */
const PNL_SIZE = CANVAS_SIZE / SIZE;


function board() {

  for (var row = 0; row < SIZE; row++) {
    for (var column = 0; column < SIZE; column++) {
      /* panel */
      fill(getPanelColor(panels[row][column]));
      rectMode(CORNER);
      rect(column*PNL_SIZE, row*PNL_SIZE, PNL_SIZE, PNL_SIZE);
      /* figure */
      if ( panels[row][column] != 0 ) {
        fill(00, 00, 00);  // black
        if ( panels[row][column] < 100 ) {  // digit = 1
          textSize(60);
        } else if ( panels[row][column] < 1000 ) {  // digit = 2
          textSize(40);
        } else {  // digit >= 3
          textSize(20);
        }
        textAlign(CENTER, CENTER);
        text(panels[row][column], column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/1.5);
      }
    }
  }

  return ;
}


function getPanelColor(value) {

  var pnlCol;
  switch(value) {
  case 0 : 
    pnlCol = color(169, 169, 169);  // gray
    break;
  case 2 : 
    pnlCol = color(135, 206, 250);  // light sky blue
    break;
  case 4 : 
    pnlCol = color(246, 246, 250);  // lavender e6e6fa
    break;
  case 8 : 
    pnlCol = color(00, 255, 255);  // aqua 
    break;
  case 16 : 
    pnlCol = color(238, 232, 170);  // pale golden rod
    break; 
  case 32 : 
    pnlCol = color(218, 165, 20);  // golden rod
    break;
  case 64 : 
    pnlCol = color(255, 250, 00);  // orange
    break;  
  case 128 : 
    pnlCol = color(255, 255, 00);  // yellow
    break; 
  case 256 : 
    pnlCol = color(173, 255, 47);  // green yellow
    break; 
  case 512 : 
    pnlCol = color(90, 238, 90);  // light green 90ee90
    break;
  case 1024 : 
    pnlCol = color(93, 70, 219);  // medium purple
    break; 
  case 2048 : 
    pnlCol = color(255, 255, 00);  // red 
    break;
  default : 
    pnlCol = color(255, 182, 193);  // pink
  }

  return pnlCol;
}


function finMessage() {

  /* panel */
  fill(255, 255, 255);  // white
  rectMode(CENTER);
  rect(CANVAS_SIZE/2, CANVAS_SIZE/2, 200, 100);

  /* text */
  fill(00, 00, 00);  // black
  textSize(16);
  textAlign(CENTER, CENTER);
  text("GAME OVER !", CANVAS_SIZE/2, CANVAS_SIZE/2.25);

  return ;
}
