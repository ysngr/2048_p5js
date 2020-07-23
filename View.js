//====================================================================
//  View
//====================================================================

const INITNEWPANELSIZE = 40;
const FRAMECOLOR = "#696969";


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

  let d;

  strokeWeight(1);
  stroke(FRAMECOLOR);

  if ( mdl.isNewPanelIndex(r, c) && this.newPanelSize < PANELSIZE ) {
    d = (PANELSIZE - this.newPanelSize) / 2;
    fill("#696969");  // background color = empty panel color
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

  const fillColorDict = ["#000000", "#000000", "#FFFFFF", "#000000"];
  const textSizeDict = [50, 40, 25, 20];

  let panelNum, index;

  panelNum = mdl.getPanelNumAt(r, c);

  if ( panelNum > 0 ) {
    index = -1;
    for ( let n = panelNum; n > 0; n = int(n/10), index++ );
    textSize(textSizeDict[index]);
    fill(fillColorDict[index]);
    text(panelNum, (c+0.5)*PANELSIZE, (r+0.6)*PANELSIZE);
  }

  return ;
};


View.prototype.getPanelColor = function(panelNum) {

  const colorDict = [
    "#D3D3D3", "#A0D8EF", "#CEE4AE", "#BBBCDA", "#D6C6AF", "#D9A62E", 
    "#68BE8D", "#028760", "#5654A2", "#0095D9", "#F39800", "#E2041B", 
    "#AA4C8F", "#9F6F55"
  ];

  let index = this.binlog(panelNum);

  return ( index < colorDict.length )? colorDict[index] : "#EEBBCB";
};


View.prototype.binlog = function(n) {

  if ( n == 0 ) {
    return 0;
  }

  let logn;
  for ( logn = 0; n > 0; n = (int)(n/2), logn++ );

  return (int)(logn-1);
};


View.prototype.initNewPanelSize = function() {
  this.newPanelSize = INITNEWPANELSIZE;
};


View.prototype.finMessage = function() {

  /* draw panels completely */
  this.newPanelSize = PANELSIZE;
  this.board();

  /* fin-message panel */
  strokeWeight(5);
  stroke("#E6E6FA");  // lavender
  fill(255, 255, 255, 220);
  rect(0, 0, BOARDSIZE, BOARDSIZE);

  /* message */
  noStroke();
  fill("#000000");  // black
  textSize(16);
  text("GAME OVER !\nMax panel : " + mdl.getMaxPanelNum(), BOARDSIZE/2, BOARDSIZE/2);

  return ;
};
