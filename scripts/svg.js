
var Svg = (function() {

  "use strict";

  let self = this;

  //
  // private functions

  let makeSvgElt = function(container, eltName, attributes, text, opts) {

    eltName = eltName || 'svg';
    attributes = attributes || {};
    opts = opts || {};

    let elt = document.createElementNS('http://www.w3.org/2000/svg', eltName);

    for (let k in attributes) {

      let v = attributes[k];
      let ns = null;
      let m = k.match(/^([a-z]+):([a-z-]+)$/);
      if (m) ns = m[1];
      if (ns === 'xlink') ns = 'http://www.w3.org/1999/xlink';

      if (v instanceof Array) v = v.join(' ');

      elt.setAttributeNS(ns, k, v);
    };

    if (text) elt.appendChild(document.createTextNode(text));

    container.appendChild(elt);

    return elt;
  };

  // Walks an SVG tree and adds its elements to the DOM on the go
  //
  let makeSvgElts = function(container, tree) {

    let name = tree[0];
    let attributes = null;
    let children = [];
    let text = null;
      //
    tree.slice(1)
      .forEach(function(e) {
        if (Array.isArray(e)) children.push(e);
        else if (typeof e === 'object') attributes = attributes || e;
        else if (typeof e === 'string') text = text || e; });

    let elt = makeSvgElt(container, name, attributes, text);

    children.forEach(function(t) { makeSvgElts(elt, t) });

    return elt;
  };

  //
  // public functions

  this.create = makeSvgElt;
  this.c = makeSvgElt;

  this.build = makeSvgElts;
  this.b = makeSvgElts;

  //
  // over.

  return this;

}).apply({}); // end Svg

