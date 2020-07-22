//====================================================================
//  Model
//====================================================================

const EMPTYPANEL = 0;


let Model = function() {
  this.panels = [];
  this.genPanels();

  this.newPanelRow = -1; 
  this.newPanelColumn = -1; 
  this.newPanelSize = -1;
};



Model.prototype.genPanels = function() {

  /* generate panels */
  let panelsRow = [];
  for (let column = 0; column < SIZE; column++) {
    panelsRow.push(0);
  }
  for (let row = 0; row < SIZE; row++) {
    this.panels.push(panelsRow.concat());
  }

  /* put initial panels */
  for (let i = 0; i < 2; i++) {
    this.genNewPanel();
    this.newPanelSize = BOARD_SIZE / SIZE; // (== PNL_SIZE)
  }

  return ;
};


Model.prototype.genNewPanel = function() {

  /* find place for new panel */
  while ( true ) {
    this.newPanelRow = int(random(0, 4));
    this.newPanelColumn = int(random(0, 4));
    if ( this.panels[this.newPanelRow][this.newPanelColumn] == 0 ) {
      break;
    }
  }

  /* generate new panel */
  this.panels[this.newPanelRow][this.newPanelColumn] = (random(0, 2) >= 1)? 2 : 4; 
  this.newPanelSize = 50;

  return ;
};


//Model.prototype.move = function(direction) {

//  /* preserve previous panels' state */
//  let prevPanels = this.copyPrevPanels();

//  /* find incremental value */
//  let incr = (direction == TO_TOP || direction == TO_LEFT)? 1 : -1;


//  for (let line = 0; line < SIZE; line++) {

//    /* replicate panels on line */
//    let replLine = [];
//    for (let orthLine = 0; orthLine < SIZE; orthLine++) {
//      replLine.push((direction == TO_TOP || direction == TO_BOTTOM)? this.panels[orthLine][line] : this.panels[line][orthLine]);
//    }

//    /* addition */
//    let sumPanelIndex = (direction == TO_TOP || direction == TO_LEFT)? 0 : SIZE-1;  // panel to be added
//    while( 0 <= sumPanelIndex && sumPanelIndex < SIZE ){
//      if( replLine[sumPanelIndex] == 0 ){
//        sumPanelIndex += incr;
//        continue;
//      }
//      /* find terget panel for addition */
//      let targetPanelIndex = sumPanelIndex + incr;  // panel to marge with sumPanel and become zero
//      while( replLine[targetPanelIndex] == 0 && 0 <= targetPanelIndex && targetPanelIndex < SIZE ){
//        targetPanelIndex += incr;
//      }
//      /* marge with adjecent panel */
//      if( 0 <= targetPanelIndex && targetPanelIndex < SIZE && replLine[sumPanelIndex] == replLine[targetPanelIndex] ){
//        replLine[sumPanelIndex] += replLine[targetPanelIndex];
//        replLine[targetPanelIndex] = 0;
//        sumpanelIndex = targetPanelIndex + incr;
//      }else{
//        sumPanelIndex += incr;
//      }
//    }

//    /* move to selected direction */
//    let idx = (incr >= 0)? 0 : SIZE-1;
//    for (let orthLine = idx; 0 <= orthLine && orthLine < SIZE; orthLine += incr) {
//      if ( replLine[orthLine] != 0 ) {
//        if ( direction == TO_TOP || direction == TO_BOTTOM ) {  // move vertically
//          this.panels[idx][line] = replLine[orthLine];
//        } else {  // move horizontally
//          this.panels[line][idx] = replLine[orthLine];
//        }
//        idx += incr;
//      }
//    }

//    /* set value(0) in empty place */
//    while ( 0 <= idx && idx < SIZE ) {
//      if ( direction == TO_TOP || direction == TO_BOTTOM ) {
//        this.panels[idx][line] = 0;
//      } else {
//        this.panels[line][idx] = 0;
//      }
//      idx += incr;
//    }
//  }

//  return this.isPanelMoved(prevPanels);
//};


Model.prototype.move = function(direction) {

  let prevPanels = this.copyPrevPanels();

  switch( direction ) {
  case TONORTH :
    this.moveToNorth();
    break;
  case TOSOUTH :
    this.moveToSouth();
    break;
  case TOEAST :
    this.moveToEast();
    break;
  case TOWEST :
    this.moveToWest();
    break;
  }

  return this.isPanelMoved(prevPanels);
};


Model.prototype.moveToNorth = function() {

  for ( let c = 0; c < SIZE; c++ ) {
    /* replicate panels on c-th column */
    let replLine = new Array(SIZE);
    for ( let r = 0; r < replLine.length; r++ ) {
      replLine[r] = this.panels[r][c];
    }
    /* addition */
  ADDLOOP:
    for ( let r = 0; r < SIZE-1; r++ ) {
      if ( replLine[r] == EMPTYPANEL ) {
        continue;
      }
      for ( let nr = r+1; nr < SIZE; nr++ ) {
        if ( replLine[nr] == EMPTYPANEL ) {
          continue;
        }
        if ( replLine[r] == replLine[nr] ) {
          replLine[r] += replLine[nr];
          replLine[nr] = 0;
          break ADDLOOP;
        }
        break;
      }
    }
    /* move */
    let r = 0;
    for ( let rr = 0; rr < SIZE; rr++ ) {
      if ( replLine[rr] != EMPTYPANEL ) {
        this.panels[r++][c] = replLine[rr];
      }
    }
    while ( r < SIZE ) {
      this.panels[r++][c] = EMPTYPANEL;
    }
  }

  return ;
};


Model.prototype.moveToSouth = function() {

  for ( let c = 0; c < SIZE; c++ ) {
    /* replicate panels on c-th column */
    let replLine = new Array(SIZE);
    for ( let r = 0; r < replLine.length; r++ ) {
      replLine[r] = this.panels[r][c];
    }
    /* addition */
  ADDLOOP:
    for ( let r = SIZE-1; r > 0; r-- ) {
      if ( replLine[r] == EMPTYPANEL ) {
        continue;
      }
      for ( let nr = r-1; nr >= 0; nr-- ) {
        if ( replLine[nr] == EMPTYPANEL ) {
          continue;
        }
        if ( replLine[r] == replLine[nr] ) {
          replLine[r] += replLine[nr];
          replLine[nr] = 0;
          break ADDLOOP;
        }
        break;
      }
    }
    /* move */
    let r = SIZE - 1;
    for ( let rr = SIZE-1; rr >= 0; rr-- ) {
      if ( replLine[rr] != EMPTYPANEL ) {
        this.panels[r--][c] = replLine[rr];
      }
    }
    while ( r >= 0 ) {
      this.panels[r--][c] = EMPTYPANEL;
    }
  }

  return ;
};


Model.prototype.moveToEast = function() {

  for ( let r = 0; r < SIZE; r++ ) {
    /* replicate panels on r-th row */
    let replLine = new Array(SIZE);
    for ( let c = 0; c < replLine.length; c++ ) {
      replLine[c] = this.panels[r][c];
    }
    /* addition */
  ADDLOOP:
    for ( let c = SIZE-1; c > 0; c-- ) {
      if ( replLine[c] == EMPTYPANEL ) {
        continue;
      }
      for ( let nc = c-1; nc >= 0; nc-- ) {
        if ( replLine[nc] == EMPTYPANEL ) {
          continue;
        }
        if ( replLine[c] == replLine[nc] ) {
          replLine[c] += replLine[nc];
          replLine[nc] = 0;
          break ADDLOOP;
        }
        break;
      }
    }
    /* move */
    let c = SIZE - 1;
    for ( let rc = SIZE-1; rc >= 0; rc-- ) {
      if ( replLine[rc] != EMPTYPANEL ) {
        this.panels[r][c--] = replLine[rc];
      }
    }
    while ( c >= 0 ) {
      this.panels[r][c--] = EMPTYPANEL;
    }
  }

  return ;
};


Model.prototype.moveToWest = function() {

  for ( let r = 0; r < SIZE; r++ ) {
    /* replicate panels on r-th row */
    let replLine = new Array(SIZE);
    for ( let c = 0; c < replLine.length; c++ ) {
      replLine[c] = this.panels[r][c];
    }
    /* addition */
  ADDLOOP:
    for ( let c = 0; c < SIZE-1; c++ ) {
      if ( replLine[c] == EMPTYPANEL ) {
        continue;
      }
      for ( let nc = c+1; nc < SIZE; nc++ ) {
        if ( replLine[nc] == EMPTYPANEL ) {
          continue;
        }
        if ( replLine[c] == replLine[nc] ) {
          replLine[c] += replLine[nc];
          replLine[nc] = 0;
          break ADDLOOP;
        }
        break;
      }
    }
    /* move */
    let c = 0;
    for ( let rc = 0; rc < SIZE; rc++ ) {
      if ( replLine[rc] != EMPTYPANEL ) {
        this.panels[r][c++] = replLine[rc];
      }
    }
    while ( c < SIZE ) {
      this.panels[r][c++] = EMPTYPANEL;
    }
  }

  return ;
};


Model.prototype.copyPrevPanels = function() {

  let prevPanels = [];
  let prevPanelsRow;

  for (let row = 0; row < SIZE; row++) {
    prevPanelsRow = [];
    for (let column = 0; column < SIZE; column++) {
      prevPanelsRow.push(this.panels[row][column]);
    }
    prevPanels.push(prevPanelsRow);
  }

  return prevPanels;
};


Model.prototype.isPanelMoved = function(prevPanels) {

  for (let row = 0; row < SIZE; row++) {
    for (let column = 0; column < SIZE; column++) {
      if ( this.panels[row][column] != prevPanels[row][column] ) {
        return true;  // some panels are moved
      }
    }
  }

  return false;  // none of the panels are moved
};



Model.prototype.isGameFinished = function() {

  /* search empty place */
  for (let row = 0; row < SIZE; row++) {
    for (let column = 0; column < SIZE; column++) {
      if ( this.panels[row][column] == 0 ) {
        return false;  // continue
      }
    }
  }
  /* search pair to be added */
  for (let row = 0; row < SIZE; row++) {
    for (let column = 0; column < SIZE; column++) {
      // vartical
      if ( row < SIZE -1 ) {
        if ( this.panels[row][column] == this.panels[row+1][column] ) {
          return false;  // continue
        }
      }
      // horizontal
      if ( column < SIZE - 1 ) {
        if ( this.panels[row][column] == this.panels[row][column+1] ) {
          return false;  // continue
        }
      }
    }
  }

  return true;  // end
};


Model.prototype.getMaxPanel = function() {

  let max = -1;
  for (let row = 0; row < SIZE; row++) {
    for (let column = 0; column < SIZE; column++) {
      if ( this.panels[row][column] > max ) {
        max = this.panels[row][column];
      }
    }
  }

  return max;
};
