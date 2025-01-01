
//
// console.js

var Console = (function() {

  "use strict";

  let self = this;
  let inputElt = null;

  //
  // protected functions

  var onGnuGo = function(res) {

clog('res', res);
  };

  var onInputKey = function(ev) {

    if (ev.key !== 'Enter') return;

    //let d = { 'command': inputElt.value.trim() };
    let d = { 'command': 'boardsize 9' };

    H.request('POST', '/actions', d, onGnuGo);
  };

  //
  // public functions

  this.init = function() {

    inputElt = inputElt || H.elt('#input input');
    inputElt.focus();

    H.onk(inputElt, onInputKey);
  };

  //
  // over.

  return this;

}).apply({}); // end Console

