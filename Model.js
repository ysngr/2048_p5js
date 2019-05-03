//====================================================================
//  Model
//====================================================================


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


Model.prototype.move = function(direction) {

  /* preserve previous panels' state */
  let prevPanels = this.copyPrevPanels();

  /* find incremental value */
  let incr = (direction == TO_TOP || direction == TO_LEFT)? 1 : -1;


  for (let line = 0; line < SIZE; line++) {

    /* replicate panels on line */
    let replLine = [];
    for (let orthLine = 0; orthLine < SIZE; orthLine++) {
      replLine.push((direction == TO_TOP || direction == TO_BOTTOM)? this.panels[orthLine][line] : this.panels[line][orthLine]);
    }

    /* addition */
    let usablePanelIndex = (incr >= 0)? 0 : SIZE-1;
    for (let orthLine = usablePanelIndex + incr; 0 <= orthLine && orthLine < SIZE; orthLine += incr) {
      // if the panel's value is 0, skip to the next loop 
      if ( replLine[orthLine] == 0 ) {
        continue;
      }
      // find the target panel to be added
      let target = orthLine - incr;
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

    /* move to selected direction */
    let idx = (incr >= 0)? 0 : SIZE-1;
    for (let orthLine = idx; 0 <= orthLine && orthLine < SIZE; orthLine += incr) {
      if ( replLine[orthLine] != 0 ) {
        if ( direction == TO_TOP || direction == TO_BOTTOM ) {  // move vertically
          this.panels[idx][line] = replLine[orthLine];
        } else {  // move horizontally
          this.panels[line][idx] = replLine[orthLine];
        }
        idx += incr;
      }
    }
    // set value(0) in empty place
    while ( 0 <= idx && idx < SIZE ) {
      if ( direction == TO_TOP || direction == TO_BOTTOM ) {
        this.panels[idx][line] = 0;
      } else {
        this.panels[line][idx] = 0;
      }
      idx += incr;
    }
  }

  return this.isPanelMoved(prevPanels);
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
