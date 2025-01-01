
//
// go_board.js

class GoBoard extends HTMLDivElement {

  //constructor() {
  //  super();
  //}

  connectedCallback() {

    //super.connectedCallback();
      // actually, no... It complains...
  }

  static get observedAttributes() {
    return [ 'data-koukai-size' ]; }

  attributeChangedCallback(name, v0, v1) {

clog('attributeChangedCallback()', name, v0, v1);
  }
}

customElements.define('go-board', GoBoard, { extends: 'div' });

