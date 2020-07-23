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


View.prototype.getPanelColor = function(value) {

  let pnlCol;
  switch(value) {
  case 0 :   // empty panel color
    pnlCol = color("#D3D3D3");  // frosty white
    break;
  case 2 : 
    pnlCol = color("#A0D8EF");  // sora
    break;
  case 4 : 
    pnlCol = color("#CEE4AE");  // natsumushi
    break;
  case 8 : 
    pnlCol = color("#BBBCDA");  // huji
    break;
  case 16 : 
    pnlCol = color("#D6C6AF");  // ama
    break; 
  case 32 : 
    pnlCol = color("#D9A62E");  // hajizome
    break;
  case 64 : 
    pnlCol = color("#68BE8D");  // wakatake
    break;  
  case 128 : 
    pnlCol = color("#028760");  // tokiwa midori
    break; 
  case 256 : 
    pnlCol = color("#5654A2");  // kikyo
    break; 
  case 512 : 
    pnlCol = color("#0095D9");  // ao
    break;
  case 1024 : 
    pnlCol = color("#F39800");  // kintya
    break; 
  case 2048 : 
    pnlCol = color("#E2041B");  // shoujyouhi
    break;
  case 4096 :
    pnlCol = color("#AA4C8F");  // ume murasaki
    break;
  case 8192 :
    pnlCol = color("#9F6F55");  // tonotya
    break;
  default : 
    pnlCol = color("#EEBBCB");  // nadesiko
    break;
  }

  return pnlCol;
};


View.prototype.initNewPanelSize = function() {
  this.newPanelSize = INITNEWPANELSIZE;
};


View.prototype.finMessage = function() {

  /* draw completely */
  this.newPanelSize = PANELSIZE;
  this.board();

  strokeWeight(5);
  stroke("#E6E6FA");  // lavender
  fill(255, 255, 255, 220);
  rect(0, 0, BOARDSIZE, BOARDSIZE);

  noStroke();
  fill("#000000");  // black
  textSize(16);
  text("GAME OVER !\nMax panel : " + mdl.getMaxPanelNum(), BOARDSIZE/2, BOARDSIZE/2);

  return ;
};
