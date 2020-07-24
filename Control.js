//====================================================================
//  Control
//====================================================================

const TONORTH = 1, TOEAST = 2, TOSOUTH = 3, TOWEST = 4;


let Control = function() {
  this.touchStartX = -1;
  this.touchStartY = -1;
};



Control.prototype.movegen = function(moveDir) {

  if ( mdl.move(moveDir) ) {
    mdl.genNewPanel();
    view.initNewPanelSize();
  }

  return ;
};


Control.prototype.setTouchStart = function(x, y) {

  this.touchStartX = x;
  this.touchStartY = y;

  return ;
};

Control.prototype.getTouchStartX = function() {
  return this.touchStartX;
};

Control.prototype.getTouchStartY = function() {
  return this.touchStartY;
};



function keyPressed() {

  let moveDir;

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

  ctrl.movegen(moveDir);

  return false;  // prevent default
}


function touchStarted() {

  ctrl.setTouchStart(mouseX, mouseY);

  return false;  // prevent default
}


function touchEnded() {

  let touchStartX = ctrl.getTouchStartX();
  let touchStartY = ctrl.getTouchStartY();
  let diffX = abs(mouseX - touchStartX);
  let diffY = abs(mouseY - touchStartY);
  let moveDir;

  if ( mag(diffX, diffY) > 10 ) {
    if ( diffX >= diffY ) {
      moveDir = ( mouseX < touchStartX )? TOWEST : TOEAST;
    } else {
      moveDir = ( mouseY < touchStartY )? TONORTH : TOSOUTH;
    }
  }

  ctrl.movegen(moveDir);

  return false;  // prevent default
}
