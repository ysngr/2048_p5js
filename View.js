//====================================================================
//  View
//====================================================================

/* << TODO >>
 increasing drawing of new panel
 */

const GUTTER = 2;


let View = function() {
  this.newPanelSize = 0;  // temp
  textFont("Serif");
};



View.prototype.board = function() {

  this.newPanelSize = 50;

  for (let row = 0; row < SIZE; row++) {
    for (let column = 0; column < SIZE; column++) {

      rectMode(CENTER);
      /* frame */
      noStroke();
      fill(this.getPanelColor(-1));
      rect(column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/2, PNL_SIZE, PNL_SIZE);
      /* panel */
      strokeWeight(1);
      stroke("#000000");  // black
      if ( row == mdl.newPanelRow && column == mdl.newPanelCol ) {
        // draw new panel with panel size increasing
        /*  << TODO >> 
         change this code (new panel's size increasing) to loop
         not use draw() function
         */
        fill(this.getPanelColor(mdl.panels[row][column]));
        rect(column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/2, this.newPanelSize-GUTTER*2, this.newPanelSize-GUTTER*2);
        this.newPanelSize += (this.newPanelSize+5 > PNL_SIZE )? 0 : 5;
      } else {
        fill(this.getPanelColor(mdl.panels[row][column]));
        rect(column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/2, PNL_SIZE-GUTTER*2, PNL_SIZE-GUTTER*2);
      }      

      /* figure */
      if ( mdl.panels[row][column] != 0 ) {
        if ( mdl.panels[row][column] < 100 ) {  // digit = 1
          strokeWeight(1);
          stroke("#000000");  // black
          fill("#000000");  // black
          textSize(50);
        } else if ( mdl.panels[row][column] < 1000 ) {  // digit = 2
          strokeWeight(1);
          stroke("#FFFFFF");  // white
          fill("#FFFFFF");  // white
          textSize(30);
        } else if ( mdl.panels[row][column] < 10000 ) {  // digit = 3
          strokeWeight(1);
          stroke("#FFFFFF");  // white
          fill("#FFFFFF");  // white
          textSize(25);
        } else {  // digit >= 4
          strokeWeight(1);
          stroke("#000000");  // black
          fill("#000000");  // white
          textSize(20);
        }
        textAlign(CENTER, CENTER);
        text(mdl.panels[row][column], column*PNL_SIZE+PNL_SIZE/2, row*PNL_SIZE+PNL_SIZE/1.5);
      }
    }
  }

  return ;
};


View.prototype.getPanelColor = function(value) {

  let pnlCol;
  switch(value) {
  case -1 :  // frame color
    pnlCol = color("#696969");  // dimgray
    break;
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


View.prototype.finMessage = function() {

  /* panel */
  strokeWeight(5);
  stroke("#E6E6FA");  // lavender
  fill("#FFFFFF");  // white
  rectMode(CENTER);
  rect(BOARD_SIZE/2, BOARD_SIZE/2, 200, 100);

  /* text */
  noStroke();
  fill("#000000");  // black
  textSize(16);
  textAlign(CENTER, CENTER);
  text("GAME OVER !\nMax panel : " + mdl.getMaxPanelNum(), BOARD_SIZE/2, BOARD_SIZE/2);

  return ;
};
