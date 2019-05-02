//====================================================================
//  View
//====================================================================


const GUTTER = 2;


let View = function() {
};



View.prototype.board = function() {

  for (let row = 0; row < SIZE; row++) {
    for (let column = 0; column < SIZE; column++) {

      /* panel */
      rectMode(CENTER);
      noStroke();
      fill(this.getPanelColor(0));
      rect(column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/2, PNL_SIZE, PNL_SIZE);  // frame

      strokeWeight(1);
      stroke(0, 0, 0);
      if ( row == mdl.newPanelRow && column == mdl.newPanelColumn ) {
        // draw new panel with panel size increasing
        fill(this.getPanelColor(mdl.panels[row][column]));
        rect(column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/2, mdl.newPanelSize-GUTTER*2, mdl.newPanelSize-GUTTER*2);
        mdl.newPanelSize += (mdl.newPanelSize+5 > PNL_SIZE )? 0 : 5;
      } else {
        fill(this.getPanelColor(mdl.panels[row][column]));
        rect(column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/2, PNL_SIZE-GUTTER*2, PNL_SIZE-GUTTER*2);
      }      

      /* figure */
      if ( mdl.panels[row][column] != 0 ) {
        fill(00, 00, 00);  // black
        if ( mdl.panels[row][column] < 100 ) {  // digit = 1
          textSize(60);
        } else if ( mdl.panels[row][column] < 1000 ) {  // digit = 2
          textSize(40);
        } else {  // digit >= 3
          textSize(20);
        }
        textAlign(CENTER, CENTER);
        text(mdl.panels[row][column], column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/1.5);
      }
    }
  }

  return ;
};


View.prototype.getPanelColor = function(value) {

  let pnlCol;
  switch(value) {
  case 0 : 
    pnlCol = color(169, 169, 169);  // gray
    break;
  case 2 : 
    pnlCol = color(135, 206, 250);  // light sky blue
    break;
  case 4 : 
    pnlCol = color(246, 246, 250);  // lavender
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
    pnlCol = color(255, 165, 00);  // orange
    break;  
  case 128 : 
    pnlCol = color(255, 255, 00);  // yellow
    break; 
  case 256 : 
    pnlCol = color(173, 255, 47);  // green yellow
    break; 
  case 512 : 
    pnlCol = color(90, 238, 90);  // light green
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
};


View.prototype.finMessage = function() {

  /* panel */
  noStroke();
  fill(255, 255, 255);  // white
  rectMode(CENTER);
  rect(BOARD_SIZE/2, BOARD_SIZE/2, 200, 100);

  /* text */
  noStroke();
  fill(00, 00, 00);  // black
  textSize(16);
  textAlign(CENTER, CENTER);
  text("GAME OVER !", BOARD_SIZE/2, BOARD_SIZE/2.25);

  return ;
};
