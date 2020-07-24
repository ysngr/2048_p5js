//====================================================================
//  Control
//====================================================================

const TONORTH = 1, TOEAST = 2, TOSOUTH = 3, TOWEST = 4;


let Control = function() {
  this.touchStartX = -1;
  this.touchStartY = -1;
};



Control.prototype.setTouchStart = function(x, y) {

  this.touchStartX = x;
  this.touchStartY = y;

  return ;
};


Control.prototype.keyCodeToMovegen = function(kCode) {

  let moveDir;

  switch( kCode ) {
  case UP_ARROW :
    moveDir = TONORTH;
    break;
  case DOWN_ARROW : 
    moveDir = TOSOUTH;
    break;
  case LEFT_ARROW : 
    moveDir = TOWEST;
    break;
  case RIGHT_ARROW : 
    moveDir = TOEAST;
    break;
  default : 
    return ;
  }

  this.movegen(moveDir);

  return ;
};


Control.prototype.touchToMovegen = function(touchEndX, touchEndY) {

  let moveDir;
  let diffX = abs(touchEndX - this.touchStartX);
  let diffY = abs(touchEndY - this.touchStartY);

  if ( mag(diffX, diffY) > 10 ) {
    if ( diffX >= diffY ) {
      moveDir = ( touchEndX < this.touchStartX )? TOWEST : TOEAST;
    } else {
      moveDir = ( touchEndY < this.touchStartY )? TONORTH : TOSOUTH;
    }
    this.movegen(moveDir);
  }

  return ;
};


Control.prototype.movegen = function(moveDir) {

  if ( mdl.move(moveDir) ) {
    mdl.genNewPanel();
    view.initNewPanelSize();
  }

  return ;
};



function keyPressed() {

  ctrl.keyCodeToMovegen(keyCode);

  return false;  // prevent default
}


function touchStarted() {

  ctrl.setTouchStart(mouseX, mouseY);

  return false;  // prevent default
}


function touchEnded() {

  ctrl.touchToMovegen(mouseX, mouseY);

  return false;  // prevent default
}
