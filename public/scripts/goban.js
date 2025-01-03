
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

    let gbe = new GoBoard();
    H.satt(gbe, 'is', 'gnu-go-board');
    //H.satt(gbe, 'data-koukai-size', '9x9');
    //H.satt(gbe, 'data-koukai-size', '13x13');
    H.satt(gbe, 'data-koukai-size', '19x19');
      //
    H.elt('#goban').appendChild(gbe);
  };

  //
  // over.

  return this;

}).apply({}); // end Goban

