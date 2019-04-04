//====================================================================
//  Control
//====================================================================


/* constants */
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

  return false;  // prevent default
}


/* for smartphone */
var touchStartX, touchStartY;

function touchStarted() {
  
  touchStartX = mouseX;
  touchStartY = mouseY;
  
  return false;  // prevent default
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

  return false;  // prevent default
}
