
//
// score_tracker.js

class ScoreTracker extends DivComponent {

  #graph

  #score = [ 0 ];

  #stick_xf = 2.0;
  #stick_yf = 1.0;

  //
  // private methods

  //
  // "protected" methods

  //
  // public methods

  connectedCallback() {

    this.#graph = Svg.create(this, 'svg', { viewBox: '0 0 300 100' });
  }

  push(ge, moveCount, delta) {

    this.#graph.style.width = ge.style.width;
    this.#score[moveCount] = delta;
clog('this.#score', ge, this.#score);
  }
}

customElements.define('score-tracker', ScoreTracker, { extends: 'div' });

