
//
// v_score_tracker.js

class VerticalScoreTracker extends DivComponent {

  #goban

  #score

  //
  // private methods

  #enter(ev) {

    if (this.#goban) this.#goban.vighlightStone(H.t(ev));
  }

  //
  // "protected" methods

  //
  // public methods

  connectedCallback() {
  }

  push(ge, moveCount, stone, score, delta) {

if (stone[1] === 'pass') clog('PASS', stone, score, delta);
// it says [ 'black', 'pass' ] for white...
    let big = 10;

    let c = stone[0].substr(0, 1);
    let d = delta.toFixed(1); d = delta < 0 ? d : '+' + d;
    let s = score > 0 ? 'b' : 'w';
    let z = (delta > big) ? 'b' : (delta < -big) ? 'red' : 'neutral';

    let se = H.c(this, 'div.move');
    H.c(se, 'span.number', '' + moveCount);
    H.c(se, 'span.color.' + c, c);
    let le = H.c(se, 'span.vertex', stone[1]);
    H.c(se, 'span.score.' + s, score.toFixed(1));
    H.c(se, 'span.delta.' + z, d);

    H.on(le, 'mouseenter', this.#enter.bind(this));

    if (this.#goban) this.style.height = this.#goban.style.height;

    this.scrollTop = this.scrollHeight;
  }

  set goban(ge) {

    this.#goban = ge;
  }
}

customElements.define(
  'v-score-tracker', VerticalScoreTracker, { extends: 'div' });

