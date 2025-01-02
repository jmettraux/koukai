
//
// go_board.js

class DivComponent extends HTMLDivElement {

  //
  // private methods

  //
  // "protected" methods

  _att(key) { return H.att(this, key); }
  _atti(key, _default_val) { return H.atti(this, key, _default_val); }
  _attf(key, _default_val) { return H.attf(this, key, _default_val); }
  _attb(key, _default_val) { return H.attb(this, key, _default_val); }
  _atta(key, _default_val) { return H.atta(this, key, _default_val); }

  _satt(key, val) { H.satt(this, key, val); }

  _elt(sel) { return H.elt(this, sel); }

  _elts(sel) { return H.elts(this, sel); }
  _es(sel) { return H.elts(this, sel); }


  //
  // public methods

  attributeChangedCallback(name, v0, v1) {

    let ns = name.split('-').slice(1);
    if (ns[0] === 'koukai') ns = ns.slice(1);
    let n = ns.map(e => H.cap(e)).join('');
      //
    let fn = `_on${n}AttChange`;
    let f = this[fn];

    if (typeof f === 'function') return f.bind(this)(name, v0, v1);
    throw new Error(`No \`${fn}\` function in ${this.constructor.name} class`);
  }
}

// https://senseis.xmp.net/?EquipmentDimensions
//
//                            mm
// Board width               424.2     16 23/32     1.4  shaku 尺
// Board length              454.5     17 29/32     1.5  shaku 尺
// Board thickness           151.5      5 31/32     0.5  shaku 尺
// Line spacing width-wise    22           7/8      7.26 bu 分
// Line spacing length-wise   23.7        15/16     7.82 bu 分
// Line thickness              1           1/32     0.3  bu 分
// Star point marker diameter  4           5/32     1.2  bu 分
// Stone diameter             22.5        29/32     7.5  bu 分

class GoBoard extends DivComponent {

  _bw = 424.2;
  _bh = 454.5;
  _lw = 22.0;
  _lh = 23.7;
  _xmargin = (this._bw - 18 * this._lw) / 2;
  _ymargin = (this._bh - 18 * this._lh) / 2;
  _bhtow = this._bh / this._bw;
  _lhtow = this._lh / this._lw;
  _stard = 4.0;
  //_lthik = 1.0;
  _lthik = 0.7;

  //
  // private methods

  //
  // "protected" methods

  get _derivedHeight() { return this.clientWidth * this._bhtow; }

  _drawGrid() {

    H.clean(this);

    let svge = Svg.create(
      this, 'svg', { viewBox: `0 0 ${this._bw} ${this._bh}` });

    let s = this.size;
    let s1 = s - 1;
    let lh = this._lh;
    let lw = this._lw;

    for (let i = 0; i < s; i++) {
      Svg.build(
        svge,
        [ 'path',
          { d:
              `M ${this._xmargin} ${this._ymargin + (i * lh)} ` +
              `L ${this._xmargin + s1 * lw} ${this._ymargin + (i * lh)}`,
            stroke: 'black', 'stroke-width': this._lthik } ]);
    }
    for (let i = 0; i < s; i++) {
      Svg.build(
        svge,
        [ 'path',
          { d:
              `M ${this._xmargin + (i * lw)} ${this._ymargin} ` +
              `L ${this._xmargin + (i * lw)} ${this._ymargin + s1 * lh}`,
            stroke: 'black', 'stroke-width': this._lthik } ]);
    }
  }

  _onSizeAttChange(name, v0, v1) {

clog('att', name, '->', v1);
  }

  //
  // public methods

  static get observedAttributes() { return [
    'data-koukai-engine', 'data-koukai-engine-id', // string and int
    'data-koukai-size', // -> 9x9, 13x13, or 19x19
    'data-koukai-sound', // -> on/off
    'data-koukai-labels', // -> on/off
      ]; }

  //constructor() {
  //  super();
  //}

  connectedCallback() {

    //super.connectedCallback();
      // actually, no... It complains...

    this.style.height = `${this._derivedHeight}px`;
    this.style.minHeight = this.style.height;

    this._drawGrid();
  }

  get size() { return this._atti('-koukai-size', 19); }

  //get _svg() { return this._e('svg'); }
}

customElements.define('go-board', GoBoard, { extends: 'div' });

