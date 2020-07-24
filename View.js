//====================================================================
//  View
//====================================================================


let View = function() {
  this.newPanelSize = PANELSIZE;

  textFont("Serif");
  textAlign(CENTER, CENTER);
};



View.prototype.board = function() {

  background("#FFFFFF");

  for ( let r = 0; r < SIZE; r++ ) {
    for ( let c = 0; c < SIZE; c++ ) {
      this.panel(r, c);
      this.figure(r, c);
    }
  }

  return ;
};


View.prototype.panel = function(r, c) {

  const FRAMECOLOR = "#696969";

  let d;

  strokeWeight(1.2);
  stroke(FRAMECOLOR);

  if ( mdl.isNewPanelIndex(r, c) && this.newPanelSize < PANELSIZE ) {
    d = (PANELSIZE - this.newPanelSize) / 2;
    fill(FRAMECOLOR);
    rect(c*PANELSIZE, r*PANELSIZE, PANELSIZE, PANELSIZE);
    noStroke();
    fill(this.getPanelColor(mdl.getPanelNumAt(r, c)));
    rect(c*PANELSIZE+d, r*PANELSIZE+d, this.newPanelSize, this.newPanelSize);
    this.newPanelSize += 5;
  } else {
    fill(this.getPanelColor(mdl.getPanelNumAt(r, c)));
    rect(c*PANELSIZE, r*PANELSIZE, PANELSIZE, PANELSIZE);
  }

  return ;
};


View.prototype.figure = function(r, c) {

  const textSizeDict = [-1, 42, 40, 30, 25, 20, 18];

  let index;

  if ( (index = mdl.getPanelDigitAt(r, c)) > 0 ) {
    noStroke();
    fill(( index < 3 )? "#000000" : "#FFFFFF");
    textSize(textSizeDict[index]);
    text(mdl.getPanelNumAt(r, c), (c+0.5)*PANELSIZE, (r+0.6)*PANELSIZE);
  }

  return ;
};


View.prototype.getPanelColor = function(panelNum) {

  const colorDict = [
    "#E5E6E6", "#BBCFE4", "#DAD2E4", "#A6E8C5", // 0 ~ 8
    "#DDF29F", "#F7BED9", "#E8D485", // 16 ~ 64 
    "#5EC125", "#E3259D", "#F58123", // 128 ~ 512
    "#457DA8", "#88BC06", "#35C9DB", "#9B3A91"  // 1024 ~ 8192 
  ];

  let index = this.binlog(panelNum);

  return ( index < colorDict.length )? colorDict[index] : "#272B58";
};


View.prototype.binlog = function(n) {

  let logn;

  for ( logn = 0; n > 1; n = int(n/2), logn++ );

  return (int)(logn);
};


View.prototype.initNewPanelSize = function() {

  this.newPanelSize = 40;

  return ;
};


View.prototype.finMessage = function() {

  /* draw panels completely */
  this.newPanelSize = PANELSIZE;
  this.board();

  /* front panel */
  strokeWeight(3);
  stroke("#E6E6FA");
  fill("#FFFFFFEB");
  rect(0, 0, BOARDSIZE, BOARDSIZE);

  /* message */
  noStroke();
  fill("#000000");
  textSize(18);
  text("Game Over !\nMax number = " + mdl.getMaxPanelNum(), BOARDSIZE/2, BOARDSIZE/2);

  return ;
};
