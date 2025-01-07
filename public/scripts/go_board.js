
//
// go_board.js

class ShowboardResponse {

  #s

  #xs
  #captured = {} // { black: 0, white: 0 }

  //
  // private methods

  //
  // "protected" methods

  //
  // public methods

  constructor(s) {

    //super();

    this.#s = s;

    for (let l of s.split('\n')) {

      let m = l.match(/(BLACK|WHITE) .+ has captured (\d+) stones/);
      if (m) this.#captured[m[1].toLowerCase()] = parseInt(m[2], 10);

      let ss = l.split(' '); while (ss[0] === '') ss = ss.slice(1);

      if (( ! this.#xs) && ss[0] === 'A') {
        this.#xs = ss.filter(e => e.length > 0);
        continue;
      }

      if (ss.length < 1) continue;
      if ( ! ss[0].match(/^\d+$/)) continue;

      let y = parseInt(ss[0], 10);
      for (let x = 0, xl = this.#xs.length; x < xl; x++) {
        let vx = this.#xs[x];
        let c = ss[x + 1];
        let v = `${vx}${y}`;
        if (c === 'X' || c === 'O') this[v] = c;
      }
    }
  }
}

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
  _lineThickness = 0.7;
  _starRadius = 4.0 / 2;
  //_stoneDiameter = 22.5;
  _stoneDiameter = 21.7;
  _xpad = 22.5 * 0.7;
  _ypad = 22.5 * 0.7;

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

    if (vertex === 'pass') return null;

    let sr = this._stoneDiameter / 2;

    let vx = parseInt(this._xs.indexOf(vertex[0]), 10) + 1;
    let vy = parseInt(vertex.slice(1, 3), 10);

    let bx = this._xpad + (vx - 1) * this._lineWidth - sr;
    let by = this._ypad + (this.size - vy) * this._lineHeight - sr;

    return { x: bx, y: by };
  }

  _stoneSounds = [
    'sounds/stone1.wav', 'sounds/stone2.wav', 'sounds/stone3.wav',
    'sounds/stone4.wav', 'sounds/stone5.wav',
      ].map(s => new Audio(s));

  _playStoneSound() {

    this._stoneSounds.sample().play();
  }

  _reHighlightStone() {

    let se = H.elt(this, 'svg .stone.highlighted');

    H.remc(se, '.highlighted');
    window.setTimeout(function() { H.addc(se, '.highlighted'); }, 500);
  }

  _highlightStone(vertex) {

    H.remc(this, 'svg .stone.highlighted', '.highlighted');
    H.addc(this, `svg .stone[-koukai-vertex="${vertex}"]`, '.highlighted');
  }

  _addStone(colour, vertex) {

    let v = this._vertexToXy(vertex); if ( ! v) return;

    let a = [ -0.49, -0.35, -0.1, -0.1, 0, 0, 0, 0.1, 0.1, 0.35, 0.49 ]

    let x = v.x + a.sample();
    let y = v.y + a.sample();

    Svg.create(
      this._svge,
      'image',
      { x: x, y: y,
        width: this._stoneDiameter, height: this._stoneDiameter,
        'xlink:href': `images/${colour}.png`, class: 'stone',
        'data-koukai-vertex': vertex,
        'data-koukai-stone': colour === 'black' ? 'X' : 'O' });

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
          class: 'line', 'stroke-width': this._lineThickness } ]);

    for (let i = 0; i < s; i++) Svg.build( // vertical lines
      this._svge,
      [ 'path',
        { d: `M ${xp + (i * lw)} ${yp} L ${xp + (i * lw)} ${yp + s1 * lh}`,
          class: 'line', 'stroke-width': this._lineThickness } ]);

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
            class: 'star-point' } ]);
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
              class: 'intersection',
              'data-koukai-xy': xy, 'data-koukai-vertex': vt,
                } ]);
              //'pointer-events': 'all' } ]);
      }
    }

    H.c(this, 'div.output');
  }

  _onSizeAttChange(name, v0, v1) {

    this._send(`boardsize ${v1.split('x')[0]}`);
    this._drawGrid();
  }

  _onKey(ev) { clog('GoBoard', 'onKey()', ev); };
  _onClick(ev) { clog('GoBoard', 'onClick()', ev.target); }

  _write(s) { H.sett(this, 'div.output', s); }

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

  _updateBoard(b) {

    let r = new ShowboardResponse(b);

    H.forEach(this, 'svg image.stone', function(e) {

      let v = H.att(e, '-koukai-vertex');
      let c = H.att(e, '-koukai-stone');

      if (r[v] !== c) H.remove(e);
    });
  };

  _otherColour(c) { return c.toLowerCase() === 'black' ? 'white' : 'black'; }

  _onGtp(res) {

    //clog('_onGtp()', res);
    clog('_onGtp()', res.data.o.trim());

    let c = res.data.c;
    let c0 = c.split(' ')[0];
    let r = res.data.o.slice(2).trim();

    if (c0 === 'genmove' && r === 'PASS') {
      this._write(`${this._otherColour(this._player)} passes`);
      this._turn = this._otherColour(this._player);
      H.addc(this, '.inputting');
    }
    else if (c0 === 'genmove') {
      let o = c.split(' ')[1];
      this._addStone(o, r);
      this._highlightStone(r);
      this._turn = this._otherColour(o);
      H.addc(this, '.inputting');
    }
    else if (c0 === 'showboard') {
      this._updateBoard(r);
    }
    else if (c0 === 'estimate_score') {
      this._write(r);
    }
  }

  _send(...cmds) {

    let c0 = cmds[0];

    if (c0 === undefined) return;

    let t = this;

    if (c0 === null) {

      t._send(...cmds.slice(1));
    }
    else if (typeof c0 === 'number') {

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

  _isBlackStart(ev) {

    let s = this.size;
    let v = H.att(ev.target, '-koukai-vertex');

    if (s === 19) return [ 'Q16', 'Q17', 'R16', 'R17' ].includes(v);
    if (s === 13) return [ 'K10', 'K11', 'L10', 'L11' ].includes(v);
    if (s === 9) return [ 'E5', 'G7', 'G8', 'H7', 'H8' ].includes(v);
    return false;
  }

  _doPlay(vertex, pre=null) {

    H.remc(this, '.inputting');

    this._addStone(this._player, vertex);

    this._send(
      pre,
      `play ${this._player} ${vertex}`,
      'showboard',
      Math.random() * 6.3 * 1_000,
      `genmove ${this._otherColour(this._player)}`,
      'showboard');
  }

  _idleOnClick(ev) {

//clog('_idleOnClick()', ev.target);
    if (this._isBlackStart(ev)) {

      let v = H.att(ev.target, '-koukai-vertex');

      this.#mode = 'playing';
      this._player = 'black';

      this._doPlay(v, `set_random_seed ${Date.now() % 10_000_000}`);
    }
  }

  _playingOnClick(ev) {

//clog('_playingOnClick()', ev.target);
    let v = H.att(ev.target, '-koukai-vertex');

    if ( ! v) return;
    if (this._turn !== this._player) return;

    this._doPlay(v);
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

//clog('_playingOnKey()', ev);
    let ing = H.hasc(this, '.inputting');

    if (ev.key === 'e') {
      this._send('estimate_score');
    }
    else if (ev.key === 'p' && ing) {
      this._doPlay('pass');
    }
    else if (ev.key === '?' && ing) {
      this._reHighlightStone();
    }
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

