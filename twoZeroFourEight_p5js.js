/* 2048 */

const CANVAS_SIZE = 300;
const SIZE = 4;

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


//====================================================================
//  Control
//====================================================================

const TO_TOP = 1, TO_BOTTOM = -1; 
const TO_LEFT = 2, TO_RIGHT = -2;


function keyPressed() {

  var isPanelMoved;
  switch( keyCode ) {
  case UP_ARROW : 
    isPanelMoved = move(TO_TOP); 
    break; 
  case DOWN_ARROW : 
    isPanelMoved = move(TO_BOTTOM); 
    break;
  case LEFT_ARROW : 
    isPanelMoved = move(TO_LEFT); 
    break;
  case RIGHT_ARROW : 
    isPanelMoved = move(TO_RIGHT); 
    break;
  default : 
    isPanelMoved = false;
  }

  if ( isPanelMoved ) {
    genNewPanel();
  }

  return ;
}


var touchStartX, touchStartY;

function touchStarted() {
  touchStartX = mouseX;
  touchStartY = mouseY;
  return ;
}

function touchEnded() {

  var diffX = abs(mouseX - touchStartX);
  var diffY = abs(mouseY - touchStartY);

  var isPanelMoved;
  if ( diffX < 10 && diffY < 10 ) {
    return ;
  } else if ( diffX < diffY ) {
    if ( mouseY < touchStartY ) {
      isPanelMoved = move(TO_TOP);
    } else {
      isPanelMoved = move(TO_BOTTOM);
    }
  } else if ( diffX > diffY ) {
    if ( mouseX < touchStartX ) {
      isPanelMoved = move(TO_LEFT);
    } else {
      isPanelMoved = move(TO_RIGHT);
    }
  }
    
  if ( isPanelMoved ) {
    genNewPanel();
  }

  return ;
}


//====================================================================
//  Model
//====================================================================


function isGameFinished() {

  /* search empty place */
  for (var line = 0; line < SIZE; line++) {
    for (var row = 0; row < SIZE; row++) {
      if ( panels[line][row] == 0 ) {
        return false;  // continue
      }
    }
  }
  /* search pair to be added */
  for (var line = 0; line < SIZE; line++) {
    for (var row = 0; row < SIZE; row++) {
      // vartical
      if ( line < SIZE -1 ) {
        if ( panels[line][row] == panels[line+1][row] ) {
          return false;  // continue
        }
      }
      // horizontal
      if ( row < SIZE - 1 ) {
        if ( panels[line][row] == panels[line][row+1] )
          return false;  // continue
      }
    }
  }

  return true;  // end
}


function move(direction) {

  /* preserve previous panels' state */
  var prevPanels = this.copyPrevPanels();

  /* find incremental value */
  var incr = (direction == TO_TOP || direction == TO_LEFT)? 1 : -1;


  for (var line = 0; line < SIZE; line++) {

    /* replicate panels on line */
    var replLine = [];
    for (var orthLine = 0; orthLine < SIZE; orthLine++) {
      replLine.push((direction == TO_TOP || direction == TO_BOTTOM)? panels[orthLine][line] : panels[line][orthLine]);
    }

    /* addition */
    var usablePanelIndex = (incr >= 0)? 0 : SIZE-1;
    for (var orthLine = usablePanelIndex + incr; 0 <= orthLine && orthLine < SIZE; orthLine += incr) {
      // if the panel's value is 0, skip to the next loop 
      if ( replLine[orthLine] == 0 ) {
        continue;
      }
      // find the target panel to be added
      var target = orthLine - incr;
      while ( replLine[target] == 0 ) {
        if ( (incr >= 0)? --target < usablePanelIndex : ++target > usablePanelIndex ) {
          break;
        }
      }
      // merge with adjacent panel
      if ( 0 <= target && target < SIZE && replLine[target] == replLine[orthLine] ) {
        replLine[target] += replLine[orthLine];
        replLine[orthLine] = 0;
        usablePanelIndex = orthLine + incr;
      }
    }

    /* move to celected direction */
    var idx = (incr >= 0)? 0 : SIZE-1;
    for (var orthLine = idx; 0 <= orthLine && orthLine < SIZE; orthLine += incr) {
      if ( replLine[orthLine] != 0 ) {
        if ( direction == TO_TOP || direction == TO_BOTTOM ) {  // move vertically
          panels[idx][line] = replLine[orthLine];
        } else {  // move horizontally
          panels[line][idx] = replLine[orthLine];
        }
        idx += incr;
      }
    }
    // set value(0) in empty place
    while ( 0 <= idx && idx < SIZE ) {
      if ( direction == TO_TOP || direction == TO_BOTTOM ) {
        panels[idx][line] = 0;
      } else {
        panels[line][idx] = 0;
      }
      idx += incr;
    }
  }

  return isPanelMoved(prevPanels);
}


function copyPrevPanels() {

  var prevPanels = [];
  var prevPanelsRow;

  for (var row = 0; row < SIZE; row++) {
    prevPanelsRow = [];
    for (var column = 0; column < SIZE; column++) {
      prevPanelsRow.push(panels[row][column]);
    }
    prevPanels.push(prevPanelsRow);
  }

  return prevPanels;
}


function isPanelMoved(prevPanels) {

  for (var row = 0; row < SIZE; row++) {
    for (var column = 0; column < SIZE; column++) {
      if ( panels[row][column] != prevPanels[row][column] ) {
        return true;  // some panels are moved
      }
    }
  }

  return false;  // none of the panels are moved
}


function genNewPanel() {

  /* find place for new panel */
  var newPanelLine, newPanelRow;
  while ( true ) {
    newPanelLine = int(random(0, 4));
    newPanelRow = int(random(0, 4));
    if ( panels[newPanelLine][newPanelRow] == 0 ) {
      break;
    }
  }

  /* generate new panel */
  panels[newPanelLine][newPanelRow] = (random(0, 2) >= 1 ? 2 : 4); 

  return ;
}



//====================================================================
//  View
//====================================================================

const PNL_SIZE = 300 / SIZE;


function board() {

  for (var row = 0; row < SIZE; row++) {
    for (var column = 0; column < SIZE; column++) {
      fill(getPanelColor(panels[row][column]));
      rectMode(CORNER);
      rect(column*PNL_SIZE, row*PNL_SIZE, PNL_SIZE, PNL_SIZE);
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
