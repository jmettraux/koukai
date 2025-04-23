
//
// div_component.js


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

