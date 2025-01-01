
//
// _board.js

class Board extends HTMLDivElement {

  constructor() {

    super();
  }

  connectedCallback() {

    //super.connectedCallback();
      // actually, no... It complains...
  }
}

customElements.define('board', Board, { extends: 'div' });

