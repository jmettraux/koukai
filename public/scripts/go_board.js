
//
// go_board.js

class DivComponent extends HTMLDivElement {

  //
  // private methods

  //
  // "protected" methods

  //
  // public methods

  attributeChangedCallback(name, v0, v1) {

    let ns = name.split('-').slice(1);
    if (ns[0] === 'sg') ns = ns.slice(1);
    let n = ns.map(e => H.cap(e)).join('');
      //
    let fn = `_on${n}AttChange`;
    let f = this[fn];

    if (typeof f === 'function') return f.bind(this)(name, v0, v1);
    throw new Error(`No \`${fn}\` function in ${this.constructor.name} class`);
  }
}

class GoBoard extends DivComponent {

  //
  // private methods

  //
  // "protected" methods

  _onKoukaiSizeAttChange(name, v0, v1) {

clog('att', name, '->', v1);
  }

  //
  // public methods

  //constructor() {
  //  super();
  //}

  connectedCallback() {

    //super.connectedCallback();
      // actually, no... It complains...
  }

  static get observedAttributes() {
    return [
      'data-koukai-engine', 'data-koukai-engine-id',
      'data-koukai-size', 'data-koukai-sound'
        ]; }
}

customElements.define('go-board', GoBoard, { extends: 'div' });

