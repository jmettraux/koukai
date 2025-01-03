
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

    //throw new Error(`No \`${fn}\` func in ${this.constructor.name} class`);
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

  _boardHeightToWidth = 454.5 / 424.2;
  _lineHeight = 23.7;
  _lineWidth = 22.0;
  _xpad = 14;
  _ypad = 14;
  _lineThickness = 0.7;
  _starRadius = 4.0 / 2;

  //
  // private methods

  //
  // "protected" methods

  _drawGrid() {

    H.clean(this);

    let s = this.size;
    let s1 = s - 1;

    let xp = this._xpad;
    let yp = this._ypad;

    let bh = yp * 2 + s1 * this._lineHeight;
    let bw = xp * 2 + s1 * this._lineWidth;

    let svge = Svg.create(this, 'svg', { viewBox: `0 0 ${bw} ${bh}` });

    let lh = this._lineHeight;
    let lw = this._lineWidth;

    for (let i = 0; i < s; i++) Svg.build( // horizontal lines
      svge,
      [ 'path',
        { d: `M ${xp} ${yp + (i * lh)} L ${xp + s1 * lw} ${yp + (i * lh)}`,
          stroke: 'black', 'stroke-width': this._lineThickness } ]);

    for (let i = 0; i < s; i++) Svg.build( // vertical lines
      svge,
      [ 'path',
        { d: `M ${xp + (i * lw)} ${yp} L ${xp + (i * lw)} ${yp + s1 * lh}`,
          stroke: 'black', 'stroke-width': this._lineThickness } ]);

    let stars =
      s === 19 ? [
        [ 4,  4 ], [ 10,  4 ], [ 16,  4 ],
        [ 4, 10 ], [ 10, 10 ], [ 16, 10 ],
        [ 4, 16 ], [ 10, 16 ], [ 16, 16 ], ] :
      s === 13 ? [
        [  4,  4 ], [ 10,  4 ],
        [  7,  7 ],
        [  4, 10 ], [ 10, 10 ], ] :
      [
        [ 3, 3 ], [ 7, 3 ],
        [ 5, 5 ],
        [ 3, 7 ], [ 7, 7 ], ];

    for (let xy of stars) {

      let x = xy[0] - 1; let y = xy[1] - 1;

      Svg.build(
        svge,
        [ 'circle',
          { cx: xp + x * lw, cy: yp + y * lh, r: this._starRadius,
            fill: 'black', 'stroke-width': 0.3 } ]);
    }
  }

  //_onSizeAttChange(name, v0, v1) {
  //}

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

    this._drawGrid();

    let ro = new ResizeObserver(function(es) {
      for (let e of es) {
        let h = e.contentRect.width * e.target._boardHeightToWidth;
        e.target.style.height = `${h}px`;
        e.target.style.minHeight = `${h}px`; } });
    ro.observe(this);
  }

  get size() { return this._atti('-koukai-size', 19); }

  //get _svg() { return this._e('svg'); }
}

customElements.define('go-board', GoBoard, { extends: 'div' });

