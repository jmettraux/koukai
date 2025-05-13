
//
// v_score_tracker.js

class VerticalScoreTracker extends DivComponent {

  #graph

  #score = [ 0 ];

  //#height = 100;
  //#stick_xf = 2.0;
  //#stick_yf = 2.0;

  //
  // private methods

  //
  // "protected" methods

  //
  // public methods

  connectedCallback() {

    //this.#graph =
    //  Svg.create(this, 'svg', { viewBox: `0 0 300 ${this.#height}` });
  }

  push(ge, moveCount, stone, delta) {

//    this.#graph.style.width = ge.style.width;
//    let a = [ stone[0], stone[1], delta ];
//    this.#score[moveCount] = a;
////clog('push()', a);
//
//    let c = 'plus';
//    let h = this.#stick_yf * delta;
//    let x = this.#stick_xf * moveCount;
//    let y = this.#height / 2 - h;
//    let t = `${a[0]} ${a[1]} ${a[2] >= 0 ? '+' : ''}${a[2]}`;
//      //
//    if (delta < 0) {
//      c = 'minus';
//      h = -h;
//      y = this.#height / 2;
//    }
//
//    let se = Svg.create(
//      this.#graph,
//      'rect',
//      { class: c, x: x, y: y, width: this.#stick_xf, height: h })
//    Svg.create(
//      se,
//      'title',
//      {},
//      t);
  }
}

customElements.define(
  'v-score-tracker', VerticalScoreTracker, { extends: 'div' });

