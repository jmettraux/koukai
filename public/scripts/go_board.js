
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
//
// Board width               424.2     16 23/32     1.4  shaku 尺
// Board length              454.5     17 29/32     1.5  shaku 尺
// Board thickness           151.5      5 31/32     0.5  shaku 尺
//
// Line spacing width-wise    22           7/8      7.26 bu 分
// Line spacing length-wise   23.7        15/16     7.82 bu 分
// Line thickness              1           1/32     0.3  bu 分
//
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
  _stoneDiameter = 22.5;

  //
  // private methods

  //
  // "protected" methods

  //   A B C D E F G H J
  // 9 . . . . . . . . . 9
  // 8 . . . . . . . . . 8
  // 7 . . + . . . + . . 7
  // 6 . . . . . . . . . 6
  // 5 . . . . + . . . . 5
  // 4 . . . . . . . . . 4
  // 3 . . + . . . + . . 3
  // 2 . . . . . . . . . 2     WHITE (O) has captured 0 stones
  // 1 . . . . . . . . . 1     BLACK (X) has captured 0 stones
  //   A B C D E F G H J

  _xs = 'ABCDEFGHJKLMNOPQRST'

  _vertexToXy(vertex) {

    let sr = this._stoneDiameter / 2;

    let vx = parseInt(this._xs.indexOf(vertex[0]), 10) + 1;
    let vy = parseInt(vertex.slice(1, 3), 10);

    let bx = this._xpad + (vx - 1) * this._lineWidth - sr;
    let by = this._ypad + (this.size - vy) * this._lineHeight - sr;

    return { x: bx, y: by };
  }

  _playStoneSound() {

    let a = new Audio([
      'sounds/stone1.wav', 'sounds/stone2.wav', 'sounds/stone3.wav',
      'sounds/stone4.wav', 'sounds/stone5.wav',
        ].sample());

    a.play();
  }

  _addStone(colour, vertex) {

    let v = this._vertexToXy(vertex);

    let x = v.x + [ -1, 0, 1 ].sample();
    let y = v.y + [ -1, 0, 1 ].sample();

    Svg.create(
      this._svge,
      'image',
      { x: x, y: y,
        width: this._stoneDiameter, height: this._stoneDiameter,
        'xlink:href': `images/${colour}.png` });

    this._playStoneSound();
  }

  _drawGrid() {

    H.clean(this);

    let s = this.size;
    let s1 = s - 1;

    let xp = this._xpad;
    let yp = this._ypad;

    let bh = yp * 2 + s1 * this._lineHeight;
    let bw = xp * 2 + s1 * this._lineWidth;

    this._svge = Svg.create(this, 'svg', { viewBox: `0 0 ${bw} ${bh}` });

    let lh = this._lineHeight;
    let lw = this._lineWidth;

    for (let i = 0; i < s; i++) Svg.build( // horizontal lines
      this._svge,
      [ 'path',
        { d: `M ${xp} ${yp + (i * lh)} L ${xp + s1 * lw} ${yp + (i * lh)}`,
          stroke: 'black', 'stroke-width': this._lineThickness } ]);

    for (let i = 0; i < s; i++) Svg.build( // vertical lines
      this._svge,
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
        this._svge,
        [ 'circle',
          { cx: xp + x * lw, cy: yp + y * lh, r: this._starRadius,
            fill: 'black', 'stroke-width': 0.3 } ]);
    }

    let r = this._stoneDiameter * 0.5 * 0.77;

    for (let x = 0; x < s; x++) {
      for (let y = 0; y < s; y++) {

        let xy = `${x + 1},${y + 1}`;
        let vt = `${this._xs[x]}${s - y}`;

        Svg.build(
          this._svge,
          [ 'circle',
            { cx: xp + x * lw, cy: yp + y * lh, r: r,
              fill: 'white', 'fill-opacity': '0.0',
              'data-koukai-xy': xy, 'data-koukai-vertex': vt,
                } ]);
              //'pointer-events': 'all' } ]);
      }
    }
  }

  _onSizeAttChange(name, v0, v1) {

    this._drawGrid();
  }

  _onKey(ev) { clog('GoBoard', 'onKey()', ev); };
  _onClick(ev) { clog('GoBoard', 'onClick()', ev.target); }

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

    H.addc(this, '.go-board');

    this._drawGrid();

    let ro = new ResizeObserver(function(es) {
      for (let e of es) {
        let h = e.contentRect.width * e.target._boardHeightToWidth;
        e.target.style.height = `${h}px`;
        e.target.style.minHeight = `${h}px`; } });
    ro.observe(this);

    H.onk('body', this._onKey.bind(this));
    H.onc(this, this._onClick.bind(this));

    clog('window.board =', this);
    window.board = this;
  }

  get size() { return this._atti('-koukai-size', 19); }

  //get _svg() { return this._e('svg'); }
}

class GtpBoard extends GoBoard {

  #bid = `goban${Date.now()}`
  _player = 'black' // or 'white'
  _turn = 'black' // or 'white'

  //
  // private methods

  //
  // "protected" methods

  _otherColour(c) { return c.toLowerCase() === 'black' ? 'white' : 'black'; }

  _onGtp(res) {

    //clog('_onGtp()', res);
    clog('_onGtp()', res.data.o.trim());

    let c = res.data.c;
    let r = res.data.o.slice(2);

    if (c.match(/^genmove /)) {
      let o = c.split(' ')[1];
      this._addStone(o, r);
      this._turn = this._otherColour(o);
    }
  }

  _send(...cmds) {

    let c0 = cmds[0];

    if (c0 === undefined) return;

    let t = this;

    if (typeof c0 === 'number') {

      window.setTimeout(function() { t._send(...cmds.slice(1)); }, c0)
    }
    else {

      H.request(
        'POST', `/gtp/${this.engine}/${this.#bid}`,
        { command: cmds[0], engine: this.engine, id: this.#bid },
        function(res) {
          t._onGtp(res);
          t._send(...cmds.slice(1));
        });
    }
  }

  //
  // public methods

  get engine() { return 'someEngine'; }
  get boardId() { return this.#bid; }
}

class GnuGoBoard extends GtpBoard {

  #mode = 'idle' // or 'playing' or 'finished'

  //
  // private methods

  //
  // "protected" methods

  _idleOnClick(ev) {

clog('_idleOnClick()', ev.target);
  }

  _playingOnClick(ev) {

//clog('_playingOnClick()', ev.target);
    let v = H.att(ev.target, '-koukai-vertex');

    if ( ! v) return;
    if (this._turn !== this._player) return;

    this._addStone(this._player, v);

    this._send(
      `play ${this._player} ${v}`,
      Math.random() * 10_000,
      `genmove ${this._otherColour(this._player)}`);
  }

  _idleOnKey(ev) {

    if (ev.key === 'b') {
    }
    else if (ev.key === 'w') {
      this.#mode = 'playing';
      this._player = 'white';
      this._send(
        `set_random_seed ${Date.now() % 10_000_000}`,
        'genmove black');
    }
    else if (ev.key === '9') {
      H.satt(this, '-koukai-size', '9x9');
      this._send('boardsize 9');
    }
    else if (ev.key === '3') {
      H.satt(this, '-koukai-size', '13x13');
      this._send('boardsize 13');
    }
    else if (ev.key === '1') {
      H.satt(this, '-koukai-size', '19x19');
      this._send('boardsize 19');
    }
  }

  _playingOnKey(ev) {

clog('_playingOnKey()', ev);
  }

  _onKey(ev) { this[`_${this.#mode}OnKey`](ev); }
  _onClick(ev) { this[`_${this.#mode}OnClick`](ev); }

  //
  // public methods

  get mode() { return this.#mode; }

  get engine() { return 'GnuGO'; }
}

customElements.define('go-board', GoBoard, { extends: 'div' });
customElements.define('gnu-go-board', GnuGoBoard, { extends: 'div' });

