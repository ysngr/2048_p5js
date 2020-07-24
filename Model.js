//====================================================================
//  Model
//====================================================================

const EMPTYPANEL = 1;


let Model = function() {
  this.panels = [];
  this.newPanelRow = -1;
  this.newPanelCol = -1;
  this.eventExec = true;

  this.initPanels();
};



Model.prototype.initPanels = function() {

  this.panels = new Array(SIZE);
  for ( let r = 0; r < SIZE; r++ ) {
    this.panels[r] = new Array(SIZE).fill(EMPTYPANEL);
  }

  for ( let i = 0; i < 2; i++ ) {
    this.genNewPanel();
  }

  return ;
};


Model.prototype.genNewPanel = function() {

  let r, c;

  /* find place for new panel */
  while ( true ) {
    r = int(random(SIZE));
    c = int(random(SIZE));
    if ( this.panels[r][c] == EMPTYPANEL ) {
      break;
    }
  }

  /* generate new panel */
  this.panels[r][c] = ( random(2) >= 1 )? 2 : 4; 
  this.newPanelRow = r;
  this.newPanelCol = c;

  return ;
};


Model.prototype.move = function(moveDir) {

  let prevPanels = this.copyPanels();

  //this.debug_printBoardLog();  // debug print

  switch( moveDir ) {
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
    for ( let r = 0; r < SIZE; r++ ) {
      replLine[r] = this.panels[r][c];
    }
    /* addition */
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
          replLine[nr] = EMPTYPANEL;
          r = nr;
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
    for ( let r = 0; r < SIZE; r++ ) {
      replLine[r] = this.panels[r][c];
    }
    /* addition */
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
          replLine[nr] = EMPTYPANEL;
          r = nr;
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
    for ( let c = 0; c < SIZE; c++ ) {
      replLine[c] = this.panels[r][c];
    }
    /* addition */
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
          replLine[nc] = EMPTYPANEL;
          c = nc;
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
    for ( let c = 0; c < SIZE; c++ ) {
      replLine[c] = this.panels[r][c];
    }
    /* addition */
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
          replLine[nc] = EMPTYPANEL;
          c = nc;
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


Model.prototype.copyPanels = function() {

  let cpanels = new Array(SIZE);

  for ( let r = 0; r < SIZE; r++ ) {
    cpanels[r] = new Array(SIZE);
    for ( let c = 0; c < SIZE; c++ ) {
      cpanels[r][c] = this.panels[r][c];
    }
  }

  return cpanels;
};


Model.prototype.isPanelMoved = function(prevPanels) {

  for ( let r = 0; r < SIZE; r++ ) {
    for ( let c = 0; c < SIZE; c++ ) {
      if ( this.panels[r][c] != prevPanels[r][c] ) {
        return true;  // some panels are moved
      }
    }
  }

  return false;  // none of the panels are moved
};


Model.prototype.isNewPanelIndex = function(r, c) {
  return ( r == this.newPanelRow && c == this.newPanelCol );
};


Model.prototype.getPanelNumAt = function(r, c) {
  return this.panels[r][c];
};


Model.prototype.getPanelDigitAt = function(r, c) {

  let num, digit;

  if ( (num = this.panels[r][c]) == EMPTYPANEL ) {
    return 0;  // EMPTYPANEL digit is difined as 0
  }

  for ( digit = 0; num > 0; num = int(num/10), digit++ );

  return digit;
};


Model.prototype.isGameFinished = function() {

  /* search empty place */
  for ( let r = 0; r < SIZE; r++ ) {
    for ( let c = 0; c < SIZE; c++ ) {
      if ( this.panels[r][c] == EMPTYPANEL ) {
        return false;
      }
    }
  }

  /* search pair to be added */
  for ( let r = 0; r < SIZE-1; r++ ) {
    for ( let c = 0; c < SIZE-1; c++ ) {
      // vertical
      if ( this.panels[r][c] == this.panels[r+1][c] ) {
        return false;
      }
      // horizontal
      if ( this.panels[r][c] == this.panels[r][c+1] ) {
        return false;
      }
    }
  }

  /* lock event exec */
  this.lockEvent();

  return true;
};


Model.prototype.getMaxPanelNum = function() {

  let maxPanelNum = 0;

  for ( let r = 0; r < SIZE; r++ ) {
    for ( let c = 0; c < SIZE; c++ ) {
      if ( this.panels[r][c] > maxPanelNum ) {
        maxPanelNum = this.panels[r][c];
      }
    }
  }

  return maxPanelNum;
};


Model.prototype.lockEvent = function() {

  this.eventExec = false;

  return ;
};


Model.prototype.isEventExec = function() {
  return this.eventExec;
};




//=========================================================
//  debug functions
//=========================================================
Model.prototype.debug_printBoardLog = function() {
  for ( let r = 0; r < SIZE; r++ ) {
    console.log(r+": "+(this.panels[r][0])+"|"+(this.panels[r][1])+"|"+(this.panels[r][2])+"|"+(this.panels[r][3])+"|");
  }
  console.log("\n");
  return ;
};

Model.prototype.debug_setBeforeEnd = function() {
  this.panels[0] = [2, 4, 8, 16];
  this.panels[1] = [32, 64, 128, 256];
  this.panels[2] = [512, 1024, 2048, 4096];
  //this.panels[2] = [65536, 131072, 262144, 524288];
  this.panels[3] = [8192, 16384, 32768, EMPTYPANEL];
  return ;
};

Model.prototype.debug_setPair = function() {
  this.panels[0] = [2, 2, 4, 4];
  this.panels[1] = [2, 2, 4, 4];
  this.panels[2] = [2, 2, 4, 4];
  this.panels[3] = [2, 2, 4, 4];
  return ;
};

Model.prototype.debug_setPair2 = function() {
  this.panels[0] = [2, 2, 4, 4];
  this.panels[1] = [4, 4, 2, 2];
  this.panels[2] = [4, 4, 2, 2];
  this.panels[3] = [2, 2, 4, 4];
  return ;
};
