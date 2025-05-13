
//
// goban.js

var Goban = (function() {

  "use strict";

  let self = this;
  let elt = null;

  //
  // protected functions

  //
  // public functions

  this.init = function() {

    let ps = new URLSearchParams(window.location.search);

    let size = ps.get('size') || '19x19'; size =
      size.match(/19/) ? '19x19' :
      size.match(/13/) ? '13x13' :
      size.match(/9/) ? '9x9' :
      '19x19';

    let gbe = new GnuGoBoard(); H.satt(gbe, 'is', 'gnu-go-board');
    H.satt(gbe, 'data-koukai-size', size);

    H.elt('#goban').appendChild(gbe);

    //let ste = new ScoreTracker(); H.satt(ste, 'is', 'score-tracker');
    //H.elt('#goban').appendChild(ste);
    //gbe.scoreTracker = ste;
  };

  //
  // over.

  return this;

}).apply({}); // end Goban

