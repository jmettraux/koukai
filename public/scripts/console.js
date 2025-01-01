
//
// console.js

var Console = (function() {

  "use strict";

  let self = this;
  let inputElt = null;
  let outputElt = null;

  //
  // protected functions

  var onGnuGo = function(res) {

    H.c(outputElt, 'pre', res.data.s);

    inputElt.val = '';
    inputElt.scrollIntoView();
    inputElt.focus();
  };

  var expandCommand = function(s) {

    if (s === 'cl') return 'CLEAR';

    if (s === '9x9') return 'boardsize 9';
    if (s === 'show') return 'showboard';

    return s;
  };

  var onInputKey = function(ev) {

    if (ev.key !== 'Enter') return;

    let c = expandCommand(inputElt.value.trim());

    if (c === 'CLEAR') { H.clean(outputElt); return; }

    let d = { 'command': c };

    H.request('POST', '/actions', d, onGnuGo);
  };

  //
  // public functions

  this.init = function() {

    inputElt = H.elt('#input input');
    outputElt = H.elt('#output');

    inputElt.focus();

    H.onk(inputElt, onInputKey);
  };

  //
  // over.

  return this;

}).apply({}); // end Console

