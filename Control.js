//====================================================================
//  Control
//====================================================================


//const TO_TOP = 1, TO_BOTTOM = -1; 
//const TO_LEFT = 2, TO_RIGHT = -2;
const TONORTH = 1, TOEAST = 2, TOSOUTH = 3, TOWEST = 4;


function keyPressed() {

  let isPanelMoved;
  switch( keyCode ) {
  case UP_ARROW : 
    isPanelMoved = mdl.move(TONORTH); 
    break; 
  case DOWN_ARROW : 
    isPanelMoved = mdl.move(TOSOUTH); 
    break;
  case LEFT_ARROW : 
    isPanelMoved = mdl.move(TOWEST); 
    break;
  case RIGHT_ARROW : 
    isPanelMoved = mdl.move(TOEAST); 
    break;
  default : 
    isPanelMoved = false;
  }

  if ( isPanelMoved ) {
    mdl.genNewPanel();
    view.initNewPanelSize();
  }

  return false;  // prevent default
}


/* for smartphone */
let touchStartX, touchStartY;

function touchStarted() {

  touchStartX = mouseX;
  touchStartY = mouseY;

  return false;  // prevent default
}


function touchEnded() {

  let diffX = abs(mouseX - touchStartX);
  let diffY = abs(mouseY - touchStartY);

  let isPanelMoved;
  if ( diffX < 10 && diffY < 10 ) {
    return ;
  } else if ( diffX < diffY ) {
    if ( mouseY < touchStartY ) {
      isPanelMoved = mdl.move(TO_TOP);
    } else {
      isPanelMoved = mdl.move(TO_BOTTOM);
    }
  } else if ( diffX > diffY ) {
    if ( mouseX < touchStartX ) {
      isPanelMoved = mdl.move(TO_LEFT);
    } else {
      isPanelMoved = mdl.move(TO_RIGHT);
    }
  }

  if ( isPanelMoved ) {
    mdl.genNewPanel();
  }

  return false;  // prevent default
}
