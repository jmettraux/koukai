
//
// console.js

var Console = (function() {

  "use strict";

  let self = this;
  let inputElt = null;
  let outputElt = null;

  //
  // protected functions

  let bodyClick = function(ev) {

    if (ev.target.tagName === 'body') inputElt.focus();
  };

  let onGnuGo = function(res) {

    H.c(outputElt, 'pre.command', res.data.c);
    H.c(outputElt, 'pre.output', res.data.o);

    inputElt.value = '';
    inputElt.scrollIntoView();
    inputElt.focus();
  };

  let expandCommand = function(s) {

    if (s === 'cl') return 'CLEAR';

    if (s === '9x9') return 'boardsize 9';
    if (s === 'show') return 'showboard';
    if (s === 'score') return 'estimate_score';

    return s;
  };

  let onInputKey = function(ev) {

    if (ev.key !== 'Enter') return;

    let c = expandCommand(inputElt.value.trim());

    if (c === 'CLEAR') { H.clean(outputElt); return; }

    let d = { 'command': c };

    H.request('POST', '/actions', d, onGnuGo);
  };

  //
  // public functions

  this.init = function() {

    H.onc('body', bodyClick);

    inputElt = H.elt('#input input');
    outputElt = H.elt('#output');

    inputElt.focus();

    H.onk(inputElt, onInputKey);
  };

  //
  // over.

  return this;

}).apply({}); // end Console

