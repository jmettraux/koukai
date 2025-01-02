
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
//
// thus
//
//   grid width   418.0mm
//   grid height  450.3mm
//
//   margin left/top 3.0999mm 2.0999mm

class GoBoard extends DivComponent {

  //
  // private methods

  //
  // "protected" methods

  _drawGrid() {

    H.clean(this);

    let svge = Svg.create(this, 'svg', {}, null, null);
clog('svg', svge);

    let w = svge.clientWidth;
    let h = svge.clientHeight;
clog('w', w, 'h', h);

    Svg.b(
      svge,
      [ 'path',
        { d: `M 0 0 L ${w} ${h}`, stroke: 'black', 'stroke-width': 0.9 } ]);
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

    this._drawGrid();
  }

  get size() { return this._atti('-koukai-size', 19); }

  //get _svg() { return this._e('svg'); }
}

customElements.define('go-board', GoBoard, { extends: 'div' });

