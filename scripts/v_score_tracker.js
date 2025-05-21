
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

    let d = delta.toFixed(1); d = delta < 0 ? d : '+' + d;

    let se = H.c(this, 'div.move');
    H.c(se, 'span.number', '' + moveCount);
    H.c(se, 'span.color', stone[0].substr(0, 1));
    let le = H.c(se, 'span.vertex', stone[1]);
    H.c(se, 'span.score', score.toFixed(1));
    H.c(se, 'span.delta', d);

    H.on(le, 'mouseenter', this.#enter.bind(this));
  }

  set goban(ge) {

    this.#goban = ge;
  }
}

customElements.define(
  'v-score-tracker', VerticalScoreTracker, { extends: 'div' });

