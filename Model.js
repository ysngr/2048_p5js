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
