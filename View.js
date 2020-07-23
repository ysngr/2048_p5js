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

  const textSizeDict = [50, 40, 30, 25, 20, 18];

  let panelNum, index;

  panelNum = mdl.getPanelNumAt(r, c);

  if ( panelNum > 0 ) {
    index = -1;
    for ( let n = panelNum; n > 0; n = int(n/10), index++ );
    textSize(textSizeDict[index]);
    fill(( index < 2 )? "#000000" : "#FFFFFF");
    text(panelNum, (c+0.5)*PANELSIZE, (r+0.6)*PANELSIZE);
  }

  return ;
};


View.prototype.getPanelColor = function(panelNum) {

  const colorDict = [  // TODO
    "#E5E6E6", "#BBCFE4", "#DAD2E4", "#C7D1DC", "#E9E4DA", "#E8F0EB", "#F4A358", /* 0 ~ 64 */
    "#B81B30", "#724E87", "#33662B", /* 128 ~ 512 */
   "#457DA8", "#405C7D", "#97CACF", "#9CAEBC"  /* 1024 ~ 8192 */
  ];

  let index = this.binlog(panelNum);

  return ( index < colorDict.length )? colorDict[index] : "#272B58";
};


View.prototype.binlog = function(n) {

  let logn;
  for ( logn = 0; n > 0; n = (int)(n/2), logn++ );

  return max(0, (int)(logn-1));
};


View.prototype.initNewPanelSize = function() {
  this.newPanelSize = INITNEWPANELSIZE;
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
