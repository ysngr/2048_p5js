//====================================================================
//  Control
//====================================================================

const TONORTH = 1, TOEAST = 2, TOSOUTH = 3, TOWEST = 4;


let Control = function() {
  this.touchStartX = -1;
  this.touchStartY = -1;
  this.moveDir = -1;
};



Control.prototype.movegen = function() {

  if ( mdl.move(moveDir) ) {
    mdl.genNewPanel();
    view.initNewPanelSize();
  }

  return ;
};


function keyPressed() {

  switch( keyCode ) {
  case UP_ARROW :
  case 'k' :
    moveDir = TONORTH;
    break;
  case DOWN_ARROW : 
  case 'j' :
    moveDir = TOSOUTH; 
    break;
  case LEFT_ARROW : 
  case 'h' :
    moveDir = TOWEST; 
    break;
  case RIGHT_ARROW : 
  case 'l' :
    moveDir = TOEAST; 
    break;
  }

  ctrl.movegen();

  return false;  // prevent default
}


function touchStarted() {

  this.touchStartX = mouseX;
  this.touchStartY = mouseY;

  return false;  // prevent default
}


function touchEnded() {

  let diffX = abs(mouseX - touchStartX);
  let diffY = abs(mouseY - touchStartY);

  if ( mag(diffX, diffY) > 10 ) {
    if ( diffX >= diffY ) {
      this.moveDir = ( mouseX < this.touchStartX )? TOWEST : TOEAST;
    } else {
      this.moveDir = ( mouseY < this.touchStartY )? TONORTH : TOSOUTH;
    }
  }

  ctrl.movegen();

  return false;  // prevent default
}
