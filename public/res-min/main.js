function diff_match_patch() {
 this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = .5, this.Match_Distance = 1e3, 
 this.Patch_DeleteThreshold = .5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
}

window.rangy = function() {
 function e(e, t) {
  var n = typeof e[t];
  return n == d || !(n != u || !e[t]) || "unknown" == n;
 }
 function t(e, t) {
  return !(typeof e[t] != u || !e[t]);
 }
 function n(e, t) {
  return typeof e[t] != p;
 }
 function r(e) {
  return function(t, n) {
   for (var r = n.length; r--; ) if (!e(t, n[r])) return !1;
   return !0;
  };
 }
 function i(e) {
  return e && b(e, g) && y(e, m);
 }
 function a(e) {
  window.alert("Rangy not supported in your browser. Reason: " + e), x.initialized = !0, 
  x.supported = !1;
 }
 function o(e) {
  var t = "Rangy warning: " + e;
  x.config.alertOnWarn ? window.alert(t) : typeof window.console != p && typeof window.console.log != p && window.console.log(t);
 }
 function s() {
  if (!x.initialized) {
   var n, r = !1, o = !1;
   e(document, "createRange") && (n = document.createRange(), b(n, f) && y(n, h) && (r = !0), 
   n.detach());
   var s = t(document, "body") ? document.body : document.getElementsByTagName("body")[0];
   s && e(s, "createTextRange") && (n = s.createTextRange(), i(n) && (o = !0)), r || o || a("Neither Range nor TextRange are implemented"), 
   x.initialized = !0, x.features = {
    implementsDomRange: r,
    implementsTextRange: o
   };
   for (var l = S.concat(w), c = 0, u = l.length; u > c; ++c) try {
    l[c](x);
   } catch (d) {
    t(window, "console") && e(window.console, "log") && window.console.log("Init listener threw an exception. Continuing.", d);
   }
  }
 }
 function l(e) {
  e = e || window, s();
  for (var t = 0, n = C.length; n > t; ++t) C[t](e);
 }
 function c(e) {
  this.name = e, this.initialized = !1, this.supported = !1;
 }
 var u = "object", d = "function", p = "undefined", h = [ "startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END" ], f = [ "setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach" ], m = [ "boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text" ], g = [ "collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect" ], b = r(e), v = r(t), y = r(n), x = {
  version: "1.2.3",
  initialized: !1,
  supported: !0,
  util: {
   isHostMethod: e,
   isHostObject: t,
   isHostProperty: n,
   areHostMethods: b,
   areHostObjects: v,
   areHostProperties: y,
   isTextRange: i
  },
  features: {},
  modules: {},
  config: {
   alertOnWarn: !1,
   preferTextRange: !1
  }
 };
 x.fail = a, x.warn = o, {}.hasOwnProperty ? x.util.extend = function(e, t) {
  for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
 } : a("hasOwnProperty not supported");
 var w = [], S = [];
 x.init = s, x.addInitListener = function(e) {
  x.initialized ? e(x) : w.push(e);
 };
 var C = [];
 x.addCreateMissingNativeApiListener = function(e) {
  C.push(e);
 }, x.createMissingNativeApi = l, c.prototype.fail = function(e) {
  throw this.initialized = !0, this.supported = !1, new Error("Module '" + this.name + "' failed to load: " + e);
 }, c.prototype.warn = function(e) {
  x.warn("Module " + this.name + ": " + e);
 }, c.prototype.createError = function(e) {
  return new Error("Error in Rangy " + this.name + " module: " + e);
 }, x.createModule = function(e, t) {
  var n = new c(e);
  x.modules[e] = n, S.push(function(e) {
   t(e, n), n.initialized = !0, n.supported = !0;
  });
 }, x.requireModules = function(e) {
  for (var t, n, r = 0, i = e.length; i > r; ++r) {
   if (n = e[r], t = x.modules[n], !(t && t instanceof c)) throw new Error("Module '" + n + "' not found");
   if (!t.supported) throw new Error("Module '" + n + "' not supported");
  }
 };
 var _ = !1, E = function() {
  _ || (_ = !0, x.initialized || s());
 };
 return typeof window == p ? void a("No window found") : typeof document == p ? void a("No document found") : (e(document, "addEventListener") && document.addEventListener("DOMContentLoaded", E, !1), 
 e(window, "addEventListener") ? window.addEventListener("load", E, !1) : e(window, "attachEvent") ? window.attachEvent("onload", E) : a("Window does not have required addEventListener or attachEvent method"), 
 x);
}(), rangy.createModule("DomUtil", function(e, t) {
 function n(e) {
  var t;
  return typeof e.namespaceURI == E || null === (t = e.namespaceURI) || "http://www.w3.org/1999/xhtml" == t;
 }
 function r(e) {
  var t = e.parentNode;
  return 1 == t.nodeType ? t : null;
 }
 function i(e) {
  for (var t = 0; e = e.previousSibling; ) t++;
  return t;
 }
 function a(e) {
  var t;
  return c(e) ? e.length : (t = e.childNodes) ? t.length : 0;
 }
 function o(e, t) {
  var n, r = [];
  for (n = e; n; n = n.parentNode) r.push(n);
  for (n = t; n; n = n.parentNode) if (D(r, n)) return n;
  return null;
 }
 function s(e, t, n) {
  for (var r = n ? t : t.parentNode; r; ) {
   if (r === e) return !0;
   r = r.parentNode;
  }
  return !1;
 }
 function l(e, t, n) {
  for (var r, i = n ? e : e.parentNode; i; ) {
   if (r = i.parentNode, r === t) return i;
   i = r;
  }
  return null;
 }
 function c(e) {
  var t = e.nodeType;
  return 3 == t || 4 == t || 8 == t;
 }
 function u(e, t) {
  var n = t.nextSibling, r = t.parentNode;
  return n ? r.insertBefore(e, n) : r.appendChild(e), e;
 }
 function d(e, t) {
  var n = e.cloneNode(!1);
  return n.deleteData(0, t), e.deleteData(t, e.length - t), u(n, e), n;
 }
 function p(e) {
  if (9 == e.nodeType) return e;
  if (typeof e.ownerDocument != E) return e.ownerDocument;
  if (typeof e.document != E) return e.document;
  if (e.parentNode) return p(e.parentNode);
  throw new Error("getDocument: no document found for node");
 }
 function h(e) {
  var t = p(e);
  if (typeof t.defaultView != E) return t.defaultView;
  if (typeof t.parentWindow != E) return t.parentWindow;
  throw new Error("Cannot get a window object for node");
 }
 function f(e) {
  if (typeof e.contentDocument != E) return e.contentDocument;
  if (typeof e.contentWindow != E) return e.contentWindow.document;
  throw new Error("getIframeWindow: No Document object found for iframe element");
 }
 function m(e) {
  if (typeof e.contentWindow != E) return e.contentWindow;
  if (typeof e.contentDocument != E) return e.contentDocument.defaultView;
  throw new Error("getIframeWindow: No Window object found for iframe element");
 }
 function g(e) {
  return k.isHostObject(e, "body") ? e.body : e.getElementsByTagName("body")[0];
 }
 function b(e) {
  for (var t; t = e.parentNode; ) e = t;
  return e;
 }
 function v(e, t, n, r) {
  var a, s, c, u, d;
  if (e == n) return t === r ? 0 : r > t ? -1 : 1;
  if (a = l(n, e, !0)) return t <= i(a) ? -1 : 1;
  if (a = l(e, n, !0)) return i(a) < r ? -1 : 1;
  if (s = o(e, n), c = e === s ? s : l(e, s, !0), u = n === s ? s : l(n, s, !0), c === u) throw new Error("comparePoints got to case 4 and childA and childB are the same!");
  for (d = s.firstChild; d; ) {
   if (d === c) return -1;
   if (d === u) return 1;
   d = d.nextSibling;
  }
  throw new Error("Should not be here!");
 }
 function y(e) {
  for (var t, n = p(e).createDocumentFragment(); t = e.firstChild; ) n.appendChild(t);
  return n;
 }
 function x(e) {
  if (!e) return "[No node]";
  if (c(e)) return '"' + e.data + '"';
  if (1 == e.nodeType) {
   var t = e.id ? ' id="' + e.id + '"' : "";
   return "<" + e.nodeName + t + ">[" + e.childNodes.length + "]";
  }
  return e.nodeName;
 }
 function w(e) {
  this.root = e, this._next = e;
 }
 function S(e) {
  return new w(e);
 }
 function C(e, t) {
  this.node = e, this.offset = t;
 }
 function _(e) {
  this.code = this[e], this.codeName = e, this.message = "DOMException: " + this.codeName;
 }
 var E = "undefined", k = e.util;
 k.areHostMethods(document, [ "createDocumentFragment", "createElement", "createTextNode" ]) || t.fail("document missing a Node creation method"), 
 k.isHostMethod(document, "getElementsByTagName") || t.fail("document missing getElementsByTagName method");
 var T = document.createElement("div");
 k.areHostMethods(T, [ "insertBefore", "appendChild", "cloneNode" ] || !k.areHostObjects(T, [ "previousSibling", "nextSibling", "childNodes", "parentNode" ])) || t.fail("Incomplete Element implementation"), 
 k.isHostProperty(T, "innerHTML") || t.fail("Element is missing innerHTML property");
 var N = document.createTextNode("test");
 k.areHostMethods(N, [ "splitText", "deleteData", "insertData", "appendData", "cloneNode" ] || !k.areHostObjects(T, [ "previousSibling", "nextSibling", "childNodes", "parentNode" ]) || !k.areHostProperties(N, [ "data" ])) || t.fail("Incomplete Text Node implementation");
 var D = function(e, t) {
  for (var n = e.length; n--; ) if (e[n] === t) return !0;
  return !1;
 };
 w.prototype = {
  _current: null,
  hasNext: function() {
   return !!this._next;
  },
  next: function() {
   var e, t, n = this._current = this._next;
   if (this._current) if (e = n.firstChild) this._next = e; else {
    for (t = null; n !== this.root && !(t = n.nextSibling); ) n = n.parentNode;
    this._next = t;
   }
   return this._current;
  },
  detach: function() {
   this._current = this._next = this.root = null;
  }
 }, C.prototype = {
  equals: function(e) {
   return this.node === e.node & this.offset == e.offset;
  },
  inspect: function() {
   return "[DomPosition(" + x(this.node) + ":" + this.offset + ")]";
  }
 }, _.prototype = {
  INDEX_SIZE_ERR: 1,
  HIERARCHY_REQUEST_ERR: 3,
  WRONG_DOCUMENT_ERR: 4,
  NO_MODIFICATION_ALLOWED_ERR: 7,
  NOT_FOUND_ERR: 8,
  NOT_SUPPORTED_ERR: 9,
  INVALID_STATE_ERR: 11
 }, _.prototype.toString = function() {
  return this.message;
 }, e.dom = {
  arrayContains: D,
  isHtmlNamespace: n,
  parentElement: r,
  getNodeIndex: i,
  getNodeLength: a,
  getCommonAncestor: o,
  isAncestorOf: s,
  getClosestAncestorIn: l,
  isCharacterDataNode: c,
  insertAfter: u,
  splitDataNode: d,
  getDocument: p,
  getWindow: h,
  getIframeWindow: m,
  getIframeDocument: f,
  getBody: g,
  getRootContainer: b,
  comparePoints: v,
  inspectNode: x,
  fragmentFromNodeChildren: y,
  createIterator: S,
  DomPosition: C
 }, e.DOMException = _;
}), rangy.createModule("DomRange", function(e) {
 function t(e, t) {
  return 3 != e.nodeType && (O.isAncestorOf(e, t.startContainer, !0) || O.isAncestorOf(e, t.endContainer, !0));
 }
 function n(e) {
  return O.getDocument(e.startContainer);
 }
 function r(e, t, n) {
  var r = e._listeners[t];
  if (r) for (var i = 0, a = r.length; a > i; ++i) r[i].call(e, {
   target: e,
   args: n
  });
 }
 function i(e) {
  return new B(e.parentNode, O.getNodeIndex(e));
 }
 function a(e) {
  return new B(e.parentNode, O.getNodeIndex(e) + 1);
 }
 function o(e, t, n) {
  var r = 11 == e.nodeType ? e.firstChild : e;
  return O.isCharacterDataNode(t) ? n == t.length ? O.insertAfter(e, t) : t.parentNode.insertBefore(e, 0 == n ? t : O.splitDataNode(t, n)) : n >= t.childNodes.length ? t.appendChild(e) : t.insertBefore(e, t.childNodes[n]), 
  r;
 }
 function s(e) {
  for (var t, r, i, a = n(e.range).createDocumentFragment(); r = e.next(); ) {
   if (t = e.isPartiallySelectedSubtree(), r = r.cloneNode(!t), t && (i = e.getSubtreeIterator(), 
   r.appendChild(s(i)), i.detach(!0)), 10 == r.nodeType) throw new $("HIERARCHY_REQUEST_ERR");
   a.appendChild(r);
  }
  return a;
 }
 function l(e, t, n) {
  var r, i;
  n = n || {
   stop: !1
  };
  for (var a, o; a = e.next(); ) if (e.isPartiallySelectedSubtree()) {
   if (t(a) === !1) return void (n.stop = !0);
   if (o = e.getSubtreeIterator(), l(o, t, n), o.detach(!0), n.stop) return;
  } else for (r = O.createIterator(a); i = r.next(); ) if (t(i) === !1) return void (n.stop = !0);
 }
 function c(e) {
  for (var t; e.next(); ) e.isPartiallySelectedSubtree() ? (t = e.getSubtreeIterator(), 
  c(t), t.detach(!0)) : e.remove();
 }
 function u(e) {
  for (var t, r, i = n(e.range).createDocumentFragment(); t = e.next(); ) {
   if (e.isPartiallySelectedSubtree() ? (t = t.cloneNode(!1), r = e.getSubtreeIterator(), 
   t.appendChild(u(r)), r.detach(!0)) : e.remove(), 10 == t.nodeType) throw new $("HIERARCHY_REQUEST_ERR");
   i.appendChild(t);
  }
  return i;
 }
 function d(e, t, n) {
  var r, i = !(!t || !t.length), a = !!n;
  i && (r = new RegExp("^(" + t.join("|") + ")$"));
  var o = [];
  return l(new h(e, !1), function(e) {
   i && !r.test(e.nodeType) || a && !n(e) || o.push(e);
  }), o;
 }
 function p(e) {
  var t = "undefined" == typeof e.getName ? "Range" : e.getName();
  return "[" + t + "(" + O.inspectNode(e.startContainer) + ":" + e.startOffset + ", " + O.inspectNode(e.endContainer) + ":" + e.endOffset + ")]";
 }
 function h(e, t) {
  if (this.range = e, this.clonePartiallySelectedTextNodes = t, !e.collapsed) {
   this.sc = e.startContainer, this.so = e.startOffset, this.ec = e.endContainer, this.eo = e.endOffset;
   var n = e.commonAncestorContainer;
   this.sc === this.ec && O.isCharacterDataNode(this.sc) ? (this.isSingleCharacterDataNode = !0, 
   this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc !== n || O.isCharacterDataNode(this.sc) ? O.getClosestAncestorIn(this.sc, n, !0) : this.sc.childNodes[this.so], 
   this._last = this.ec !== n || O.isCharacterDataNode(this.ec) ? O.getClosestAncestorIn(this.ec, n, !0) : this.ec.childNodes[this.eo - 1]);
  }
 }
 function f(e) {
  this.code = this[e], this.codeName = e, this.message = "RangeException: " + this.codeName;
 }
 function m(e, t, n) {
  this.nodes = d(e, t, n), this._next = this.nodes[0], this._position = 0;
 }
 function g(e) {
  return function(t, n) {
   for (var r, i = n ? t : t.parentNode; i; ) {
    if (r = i.nodeType, O.arrayContains(e, r)) return i;
    i = i.parentNode;
   }
   return null;
  };
 }
 function b(e, t) {
  if (Q(e, t)) throw new f("INVALID_NODE_TYPE_ERR");
 }
 function v(e) {
  if (!e.startContainer) throw new $("INVALID_STATE_ERR");
 }
 function y(e, t) {
  if (!O.arrayContains(t, e.nodeType)) throw new f("INVALID_NODE_TYPE_ERR");
 }
 function x(e, t) {
  if (0 > t || t > (O.isCharacterDataNode(e) ? e.length : e.childNodes.length)) throw new $("INDEX_SIZE_ERR");
 }
 function w(e, t) {
  if (V(e, !0) !== V(t, !0)) throw new $("WRONG_DOCUMENT_ERR");
 }
 function S(e) {
  if (W(e, !0)) throw new $("NO_MODIFICATION_ALLOWED_ERR");
 }
 function C(e, t) {
  if (!e) throw new $(t);
 }
 function _(e) {
  return !O.arrayContains(j, e.nodeType) && !V(e, !0);
 }
 function E(e, t) {
  return t <= (O.isCharacterDataNode(e) ? e.length : e.childNodes.length);
 }
 function k(e) {
  return !!e.startContainer && !!e.endContainer && !_(e.startContainer) && !_(e.endContainer) && E(e.startContainer, e.startOffset) && E(e.endContainer, e.endOffset);
 }
 function T(e) {
  if (v(e), !k(e)) throw new Error("Range error: Range is no longer valid after DOM mutation (" + e.inspect() + ")");
 }
 function N() {}
 function D(e) {
  e.START_TO_START = et, e.START_TO_END = tt, e.END_TO_END = nt, e.END_TO_START = rt, 
  e.NODE_BEFORE = it, e.NODE_AFTER = at, e.NODE_BEFORE_AND_AFTER = ot, e.NODE_INSIDE = st;
 }
 function M(e) {
  D(e), D(e.prototype);
 }
 function I(e, t) {
  return function() {
   T(this);
   var n, r, i = this.startContainer, o = this.startOffset, s = this.commonAncestorContainer, c = new h(this, !0);
   i !== s && (n = O.getClosestAncestorIn(i, s, !0), r = a(n), i = r.node, o = r.offset), 
   l(c, S), c.reset();
   var u = e(c);
   return c.detach(), t(this, i, o, i, o), u;
  };
 }
 function A(n, r, o) {
  function s(e, t) {
   return function(n) {
    v(this), y(n, G), y(q(n), j);
    var r = (e ? i : a)(n);
    (t ? l : d)(this, r.node, r.offset);
   };
  }
  function l(e, t, n) {
   var i = e.endContainer, a = e.endOffset;
   (t !== e.startContainer || n !== e.startOffset) && ((q(t) != q(i) || 1 == O.comparePoints(t, n, i, a)) && (i = t, 
   a = n), r(e, t, n, i, a));
  }
  function d(e, t, n) {
   var i = e.startContainer, a = e.startOffset;
   (t !== e.endContainer || n !== e.endOffset) && ((q(t) != q(i) || -1 == O.comparePoints(t, n, i, a)) && (i = t, 
   a = n), r(e, i, a, t, n));
  }
  function p(e, t, n) {
   (t !== e.startContainer || n !== e.startOffset || t !== e.endContainer || n !== e.endOffset) && r(e, t, n, t, n);
  }
  n.prototype = new N(), e.util.extend(n.prototype, {
   setStart: function(e, t) {
    v(this), b(e, !0), x(e, t), l(this, e, t);
   },
   setEnd: function(e, t) {
    v(this), b(e, !0), x(e, t), d(this, e, t);
   },
   setStartBefore: s(!0, !0),
   setStartAfter: s(!1, !0),
   setEndBefore: s(!0, !1),
   setEndAfter: s(!1, !1),
   collapse: function(e) {
    T(this), e ? r(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : r(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
   },
   selectNodeContents: function(e) {
    v(this), b(e, !0), r(this, e, 0, e, O.getNodeLength(e));
   },
   selectNode: function(e) {
    v(this), b(e, !1), y(e, G);
    var t = i(e), n = a(e);
    r(this, t.node, t.offset, n.node, n.offset);
   },
   extractContents: I(u, r),
   deleteContents: I(c, r),
   canSurroundContents: function() {
    T(this), S(this.startContainer), S(this.endContainer);
    var e = new h(this, !0), n = e._first && t(e._first, this) || e._last && t(e._last, this);
    return e.detach(), !n;
   },
   detach: function() {
    o(this);
   },
   splitBoundaries: function() {
    T(this);
    var e = this.startContainer, t = this.startOffset, n = this.endContainer, i = this.endOffset, a = e === n;
    O.isCharacterDataNode(n) && i > 0 && i < n.length && O.splitDataNode(n, i), O.isCharacterDataNode(e) && t > 0 && t < e.length && (e = O.splitDataNode(e, t), 
    a ? (i -= t, n = e) : n == e.parentNode && i >= O.getNodeIndex(e) && i++, t = 0), 
    r(this, e, t, n, i);
   },
   normalizeBoundaries: function() {
    T(this);
    var e = this.startContainer, t = this.startOffset, n = this.endContainer, i = this.endOffset, a = function(e) {
     var t = e.nextSibling;
     t && t.nodeType == e.nodeType && (n = e, i = e.length, e.appendData(t.data), t.parentNode.removeChild(t));
    }, o = function(r) {
     var a = r.previousSibling;
     if (a && a.nodeType == r.nodeType) {
      e = r;
      var o = r.length;
      if (t = a.length, r.insertData(0, a.data), a.parentNode.removeChild(a), e == n) i += t, 
      n = e; else if (n == r.parentNode) {
       var s = O.getNodeIndex(r);
       i == s ? (n = r, i = o) : i > s && i--;
      }
     }
    }, s = !0;
    if (O.isCharacterDataNode(n)) n.length == i && a(n); else {
     if (i > 0) {
      var l = n.childNodes[i - 1];
      l && O.isCharacterDataNode(l) && a(l);
     }
     s = !this.collapsed;
    }
    if (s) {
     if (O.isCharacterDataNode(e)) 0 == t && o(e); else if (t < e.childNodes.length) {
      var c = e.childNodes[t];
      c && O.isCharacterDataNode(c) && o(c);
     }
    } else e = n, t = i;
    r(this, e, t, n, i);
   },
   collapseToPoint: function(e, t) {
    v(this), b(e, !0), x(e, t), p(this, e, t);
   }
  }), M(n);
 }
 function L(e) {
  e.collapsed = e.startContainer === e.endContainer && e.startOffset === e.endOffset, 
  e.commonAncestorContainer = e.collapsed ? e.startContainer : O.getCommonAncestor(e.startContainer, e.endContainer);
 }
 function R(e, t, n, i, a) {
  var o = e.startContainer !== t || e.startOffset !== n, s = e.endContainer !== i || e.endOffset !== a;
  e.startContainer = t, e.startOffset = n, e.endContainer = i, e.endOffset = a, L(e), 
  r(e, "boundarychange", {
   startMoved: o,
   endMoved: s
  });
 }
 function P(e) {
  v(e), e.startContainer = e.startOffset = e.endContainer = e.endOffset = null, e.collapsed = e.commonAncestorContainer = null, 
  r(e, "detach", null), e._listeners = null;
 }
 function F(e) {
  this.startContainer = e, this.startOffset = 0, this.endContainer = e, this.endOffset = 0, 
  this._listeners = {
   boundarychange: [],
   detach: []
  }, L(this);
 }
 e.requireModules([ "DomUtil" ]);
 var O = e.dom, B = O.DomPosition, $ = e.DOMException;
 h.prototype = {
  _current: null,
  _next: null,
  _first: null,
  _last: null,
  isSingleCharacterDataNode: !1,
  reset: function() {
   this._current = null, this._next = this._first;
  },
  hasNext: function() {
   return !!this._next;
  },
  next: function() {
   var e = this._current = this._next;
   return e && (this._next = e !== this._last ? e.nextSibling : null, O.isCharacterDataNode(e) && this.clonePartiallySelectedTextNodes && (e === this.ec && (e = e.cloneNode(!0)).deleteData(this.eo, e.length - this.eo), 
   this._current === this.sc && (e = e.cloneNode(!0)).deleteData(0, this.so))), e;
  },
  remove: function() {
   var e, t, n = this._current;
   !O.isCharacterDataNode(n) || n !== this.sc && n !== this.ec ? n.parentNode && n.parentNode.removeChild(n) : (e = n === this.sc ? this.so : 0, 
   t = n === this.ec ? this.eo : n.length, e != t && n.deleteData(e, t - e));
  },
  isPartiallySelectedSubtree: function() {
   var e = this._current;
   return t(e, this.range);
  },
  getSubtreeIterator: function() {
   var e;
   if (this.isSingleCharacterDataNode) e = this.range.cloneRange(), e.collapse(); else {
    e = new F(n(this.range));
    var t = this._current, r = t, i = 0, a = t, o = O.getNodeLength(t);
    O.isAncestorOf(t, this.sc, !0) && (r = this.sc, i = this.so), O.isAncestorOf(t, this.ec, !0) && (a = this.ec, 
    o = this.eo), R(e, r, i, a, o);
   }
   return new h(e, this.clonePartiallySelectedTextNodes);
  },
  detach: function(e) {
   e && this.range.detach(), this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
  }
 }, f.prototype = {
  BAD_BOUNDARYPOINTS_ERR: 1,
  INVALID_NODE_TYPE_ERR: 2
 }, f.prototype.toString = function() {
  return this.message;
 }, m.prototype = {
  _current: null,
  hasNext: function() {
   return !!this._next;
  },
  next: function() {
   return this._current = this._next, this._next = this.nodes[++this._position], this._current;
  },
  detach: function() {
   this._current = this._next = this.nodes = null;
  }
 };
 var G = [ 1, 3, 4, 5, 7, 8, 10 ], j = [ 2, 9, 11 ], U = [ 5, 6, 10, 12 ], H = [ 1, 3, 4, 5, 7, 8, 10, 11 ], z = [ 1, 3, 4, 5, 7, 8 ], q = O.getRootContainer, V = g([ 9, 11 ]), W = g(U), Q = g([ 6, 10, 12 ]), X = document.createElement("style"), K = !1;
 try {
  X.innerHTML = "<b>x</b>", K = 3 == X.firstChild.nodeType;
 } catch (Y) {}
 e.features.htmlParsingConforms = K;
 var J = K ? function(e) {
  var t = this.startContainer, n = O.getDocument(t);
  if (!t) throw new $("INVALID_STATE_ERR");
  var r = null;
  return 1 == t.nodeType ? r = t : O.isCharacterDataNode(t) && (r = O.parentElement(t)), 
  r = null === r || "HTML" == r.nodeName && O.isHtmlNamespace(O.getDocument(r).documentElement) && O.isHtmlNamespace(r) ? n.createElement("body") : r.cloneNode(!1), 
  r.innerHTML = e, O.fragmentFromNodeChildren(r);
 } : function(e) {
  v(this);
  var t = n(this), r = t.createElement("body");
  return r.innerHTML = e, O.fragmentFromNodeChildren(r);
 }, Z = [ "startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer" ], et = 0, tt = 1, nt = 2, rt = 3, it = 0, at = 1, ot = 2, st = 3;
 N.prototype = {
  attachListener: function(e, t) {
   this._listeners[e].push(t);
  },
  compareBoundaryPoints: function(e, t) {
   T(this), w(this.startContainer, t.startContainer);
   var n, r, i, a, o = e == rt || e == et ? "start" : "end", s = e == tt || e == et ? "start" : "end";
   return n = this[o + "Container"], r = this[o + "Offset"], i = t[s + "Container"], 
   a = t[s + "Offset"], O.comparePoints(n, r, i, a);
  },
  insertNode: function(e) {
   if (T(this), y(e, H), S(this.startContainer), O.isAncestorOf(e, this.startContainer, !0)) throw new $("HIERARCHY_REQUEST_ERR");
   var t = o(e, this.startContainer, this.startOffset);
   this.setStartBefore(t);
  },
  cloneContents: function() {
   T(this);
   var e, t;
   if (this.collapsed) return n(this).createDocumentFragment();
   if (this.startContainer === this.endContainer && O.isCharacterDataNode(this.startContainer)) return e = this.startContainer.cloneNode(!0), 
   e.data = e.data.slice(this.startOffset, this.endOffset), t = n(this).createDocumentFragment(), 
   t.appendChild(e), t;
   var r = new h(this, !0);
   return e = s(r), r.detach(), e;
  },
  canSurroundContents: function() {
   T(this), S(this.startContainer), S(this.endContainer);
   var e = new h(this, !0), n = e._first && t(e._first, this) || e._last && t(e._last, this);
   return e.detach(), !n;
  },
  surroundContents: function(e) {
   if (y(e, z), !this.canSurroundContents()) throw new f("BAD_BOUNDARYPOINTS_ERR");
   var t = this.extractContents();
   if (e.hasChildNodes()) for (;e.lastChild; ) e.removeChild(e.lastChild);
   o(e, this.startContainer, this.startOffset), e.appendChild(t), this.selectNode(e);
  },
  cloneRange: function() {
   T(this);
   for (var e, t = new F(n(this)), r = Z.length; r--; ) e = Z[r], t[e] = this[e];
   return t;
  },
  toString: function() {
   T(this);
   var e = this.startContainer;
   if (e === this.endContainer && O.isCharacterDataNode(e)) return 3 == e.nodeType || 4 == e.nodeType ? e.data.slice(this.startOffset, this.endOffset) : "";
   var t = [], n = new h(this, !0);
   return l(n, function(e) {
    (3 == e.nodeType || 4 == e.nodeType) && t.push(e.data);
   }), n.detach(), t.join("");
  },
  compareNode: function(e) {
   T(this);
   var t = e.parentNode, n = O.getNodeIndex(e);
   if (!t) throw new $("NOT_FOUND_ERR");
   var r = this.comparePoint(t, n), i = this.comparePoint(t, n + 1);
   return 0 > r ? i > 0 ? ot : it : i > 0 ? at : st;
  },
  comparePoint: function(e, t) {
   return T(this), C(e, "HIERARCHY_REQUEST_ERR"), w(e, this.startContainer), O.comparePoints(e, t, this.startContainer, this.startOffset) < 0 ? -1 : O.comparePoints(e, t, this.endContainer, this.endOffset) > 0 ? 1 : 0;
  },
  createContextualFragment: J,
  toHtml: function() {
   T(this);
   var e = n(this).createElement("div");
   return e.appendChild(this.cloneContents()), e.innerHTML;
  },
  intersectsNode: function(e, t) {
   if (T(this), C(e, "NOT_FOUND_ERR"), O.getDocument(e) !== n(this)) return !1;
   var r = e.parentNode, i = O.getNodeIndex(e);
   C(r, "NOT_FOUND_ERR");
   var a = O.comparePoints(r, i, this.endContainer, this.endOffset), o = O.comparePoints(r, i + 1, this.startContainer, this.startOffset);
   return t ? 0 >= a && o >= 0 : 0 > a && o > 0;
  },
  isPointInRange: function(e, t) {
   return T(this), C(e, "HIERARCHY_REQUEST_ERR"), w(e, this.startContainer), O.comparePoints(e, t, this.startContainer, this.startOffset) >= 0 && O.comparePoints(e, t, this.endContainer, this.endOffset) <= 0;
  },
  intersectsRange: function(e, t) {
   if (T(this), n(e) != n(this)) throw new $("WRONG_DOCUMENT_ERR");
   var r = O.comparePoints(this.startContainer, this.startOffset, e.endContainer, e.endOffset), i = O.comparePoints(this.endContainer, this.endOffset, e.startContainer, e.startOffset);
   return t ? 0 >= r && i >= 0 : 0 > r && i > 0;
  },
  intersection: function(e) {
   if (this.intersectsRange(e)) {
    var t = O.comparePoints(this.startContainer, this.startOffset, e.startContainer, e.startOffset), n = O.comparePoints(this.endContainer, this.endOffset, e.endContainer, e.endOffset), r = this.cloneRange();
    return -1 == t && r.setStart(e.startContainer, e.startOffset), 1 == n && r.setEnd(e.endContainer, e.endOffset), 
    r;
   }
   return null;
  },
  union: function(e) {
   if (this.intersectsRange(e, !0)) {
    var t = this.cloneRange();
    return -1 == O.comparePoints(e.startContainer, e.startOffset, this.startContainer, this.startOffset) && t.setStart(e.startContainer, e.startOffset), 
    1 == O.comparePoints(e.endContainer, e.endOffset, this.endContainer, this.endOffset) && t.setEnd(e.endContainer, e.endOffset), 
    t;
   }
   throw new f("Ranges do not intersect");
  },
  containsNode: function(e, t) {
   return t ? this.intersectsNode(e, !1) : this.compareNode(e) == st;
  },
  containsNodeContents: function(e) {
   return this.comparePoint(e, 0) >= 0 && this.comparePoint(e, O.getNodeLength(e)) <= 0;
  },
  containsRange: function(e) {
   return this.intersection(e).equals(e);
  },
  containsNodeText: function(e) {
   var t = this.cloneRange();
   t.selectNode(e);
   var n = t.getNodes([ 3 ]);
   if (n.length > 0) {
    t.setStart(n[0], 0);
    var r = n.pop();
    t.setEnd(r, r.length);
    var i = this.containsRange(t);
    return t.detach(), i;
   }
   return this.containsNodeContents(e);
  },
  createNodeIterator: function(e, t) {
   return T(this), new m(this, e, t);
  },
  getNodes: function(e, t) {
   return T(this), d(this, e, t);
  },
  getDocument: function() {
   return n(this);
  },
  collapseBefore: function(e) {
   v(this), this.setEndBefore(e), this.collapse(!1);
  },
  collapseAfter: function(e) {
   v(this), this.setStartAfter(e), this.collapse(!0);
  },
  getName: function() {
   return "DomRange";
  },
  equals: function(e) {
   return F.rangesEqual(this, e);
  },
  isValid: function() {
   return k(this);
  },
  inspect: function() {
   return p(this);
  }
 }, A(F, R, P), e.rangePrototype = N.prototype, F.rangeProperties = Z, F.RangeIterator = h, 
 F.copyComparisonConstants = M, F.createPrototypeRange = A, F.inspect = p, F.getRangeDocument = n, 
 F.rangesEqual = function(e, t) {
  return e.startContainer === t.startContainer && e.startOffset === t.startOffset && e.endContainer === t.endContainer && e.endOffset === t.endOffset;
 }, e.DomRange = F, e.RangeException = f;
}), rangy.createModule("WrappedRange", function(e) {
 function t(e) {
  var t = e.parentElement(), n = e.duplicate();
  n.collapse(!0);
  var r = n.parentElement();
  n = e.duplicate(), n.collapse(!1);
  var i = n.parentElement(), a = r == i ? r : o.getCommonAncestor(r, i);
  return a == t ? a : o.getCommonAncestor(t, a);
 }
 function n(e) {
  return 0 == e.compareEndPoints("StartToEnd", e);
 }
 function r(e, t, n, r) {
  var i = e.duplicate();
  i.collapse(n);
  var a = i.parentElement();
  if (o.isAncestorOf(t, a, !0) || (a = t), !a.canHaveHTML) return new s(a.parentNode, o.getNodeIndex(a));
  var l, c, u, d, p, h = o.getDocument(a).createElement("span"), f = n ? "StartToStart" : "StartToEnd";
  do a.insertBefore(h, h.previousSibling), i.moveToElementText(h); while ((l = i.compareEndPoints(f, e)) > 0 && h.previousSibling);
  if (p = h.nextSibling, -1 == l && p && o.isCharacterDataNode(p)) {
   i.setEndPoint(n ? "EndToStart" : "EndToEnd", e);
   var m;
   if (/[\r\n]/.test(p.data)) {
    var g = i.duplicate(), b = g.text.replace(/\r\n/g, "\r").length;
    for (m = g.moveStart("character", b); -1 == (l = g.compareEndPoints("StartToEnd", g)); ) m++, 
    g.moveStart("character", 1);
   } else m = i.text.length;
   d = new s(p, m);
  } else c = (r || !n) && h.previousSibling, u = (r || n) && h.nextSibling, d = u && o.isCharacterDataNode(u) ? new s(u, 0) : c && o.isCharacterDataNode(c) ? new s(c, c.length) : new s(a, o.getNodeIndex(h));
  return h.parentNode.removeChild(h), d;
 }
 function i(e, t) {
  var n, r, i, a, s = e.offset, l = o.getDocument(e.node), c = l.body.createTextRange(), u = o.isCharacterDataNode(e.node);
  return u ? (n = e.node, r = n.parentNode) : (a = e.node.childNodes, n = s < a.length ? a[s] : null, 
  r = e.node), i = l.createElement("span"), i.innerHTML = "&#feff;", n ? r.insertBefore(i, n) : r.appendChild(i), 
  c.moveToElementText(i), c.collapse(!t), r.removeChild(i), u && c[t ? "moveStart" : "moveEnd"]("character", s), 
  c;
 }
 e.requireModules([ "DomUtil", "DomRange" ]);
 var a, o = e.dom, s = o.DomPosition, l = e.DomRange;
 if (!e.features.implementsDomRange || e.features.implementsTextRange && e.config.preferTextRange) {
  if (e.features.implementsTextRange) {
   a = function(e) {
    this.textRange = e, this.refresh();
   }, a.prototype = new l(document), a.prototype.refresh = function() {
    var e, i, a = t(this.textRange);
    n(this.textRange) ? i = e = r(this.textRange, a, !0, !0) : (e = r(this.textRange, a, !0, !1), 
    i = r(this.textRange, a, !1, !1)), this.setStart(e.node, e.offset), this.setEnd(i.node, i.offset);
   }, l.copyComparisonConstants(a);
   var c = function() {
    return this;
   }();
   "undefined" == typeof c.Range && (c.Range = a), e.createNativeRange = function(e) {
    return e = e || document, e.body.createTextRange();
   };
  }
 } else !function() {
  function t(e) {
   for (var t, n = u.length; n--; ) t = u[n], e[t] = e.nativeRange[t];
  }
  function n(e, t, n, r, i) {
   var a = e.startContainer !== t || e.startOffset != n, o = e.endContainer !== r || e.endOffset != i;
   (a || o) && (e.setEnd(r, i), e.setStart(t, n));
  }
  function r(e) {
   e.nativeRange.detach(), e.detached = !0;
   for (var t, n = u.length; n--; ) t = u[n], e[t] = null;
  }
  var i, s, c, u = l.rangeProperties;
  a = function(e) {
   if (!e) throw new Error("Range must be specified");
   this.nativeRange = e, t(this);
  }, l.createPrototypeRange(a, n, r), i = a.prototype, i.selectNode = function(e) {
   this.nativeRange.selectNode(e), t(this);
  }, i.deleteContents = function() {
   this.nativeRange.deleteContents(), t(this);
  }, i.extractContents = function() {
   var e = this.nativeRange.extractContents();
   return t(this), e;
  }, i.cloneContents = function() {
   return this.nativeRange.cloneContents();
  }, i.surroundContents = function(e) {
   this.nativeRange.surroundContents(e), t(this);
  }, i.collapse = function(e) {
   this.nativeRange.collapse(e), t(this);
  }, i.cloneRange = function() {
   return new a(this.nativeRange.cloneRange());
  }, i.refresh = function() {
   t(this);
  }, i.toString = function() {
   return this.nativeRange.toString();
  };
  var d = document.createTextNode("test");
  o.getBody(document).appendChild(d);
  var p = document.createRange();
  p.setStart(d, 0), p.setEnd(d, 0);
  try {
   p.setStart(d, 1), s = !0, i.setStart = function(e, n) {
    this.nativeRange.setStart(e, n), t(this);
   }, i.setEnd = function(e, n) {
    this.nativeRange.setEnd(e, n), t(this);
   }, c = function(e) {
    return function(n) {
     this.nativeRange[e](n), t(this);
    };
   };
  } catch (h) {
   s = !1, i.setStart = function(e, n) {
    try {
     this.nativeRange.setStart(e, n);
    } catch (r) {
     this.nativeRange.setEnd(e, n), this.nativeRange.setStart(e, n);
    }
    t(this);
   }, i.setEnd = function(e, n) {
    try {
     this.nativeRange.setEnd(e, n);
    } catch (r) {
     this.nativeRange.setStart(e, n), this.nativeRange.setEnd(e, n);
    }
    t(this);
   }, c = function(e, n) {
    return function(r) {
     try {
      this.nativeRange[e](r);
     } catch (i) {
      this.nativeRange[n](r), this.nativeRange[e](r);
     }
     t(this);
    };
   };
  }
  i.setStartBefore = c("setStartBefore", "setEndBefore"), i.setStartAfter = c("setStartAfter", "setEndAfter"), 
  i.setEndBefore = c("setEndBefore", "setStartBefore"), i.setEndAfter = c("setEndAfter", "setStartAfter"), 
  p.selectNodeContents(d), i.selectNodeContents = p.startContainer == d && p.endContainer == d && 0 == p.startOffset && p.endOffset == d.length ? function(e) {
   this.nativeRange.selectNodeContents(e), t(this);
  } : function(e) {
   this.setStart(e, 0), this.setEnd(e, l.getEndOffset(e));
  }, p.selectNodeContents(d), p.setEnd(d, 3);
  var f = document.createRange();
  f.selectNodeContents(d), f.setEnd(d, 4), f.setStart(d, 2), i.compareBoundaryPoints = -1 == p.compareBoundaryPoints(p.START_TO_END, f) & 1 == p.compareBoundaryPoints(p.END_TO_START, f) ? function(e, t) {
   return t = t.nativeRange || t, e == t.START_TO_END ? e = t.END_TO_START : e == t.END_TO_START && (e = t.START_TO_END), 
   this.nativeRange.compareBoundaryPoints(e, t);
  } : function(e, t) {
   return this.nativeRange.compareBoundaryPoints(e, t.nativeRange || t);
  }, e.util.isHostMethod(p, "createContextualFragment") && (i.createContextualFragment = function(e) {
   return this.nativeRange.createContextualFragment(e);
  }), o.getBody(document).removeChild(d), p.detach(), f.detach();
 }(), e.createNativeRange = function(e) {
  return e = e || document, e.createRange();
 };
 e.features.implementsTextRange && (a.rangeToTextRange = function(e) {
  if (e.collapsed) {
   var t = i(new s(e.startContainer, e.startOffset), !0);
   return t;
  }
  var n = i(new s(e.startContainer, e.startOffset), !0), r = i(new s(e.endContainer, e.endOffset), !1), a = o.getDocument(e.startContainer).body.createTextRange();
  return a.setEndPoint("StartToStart", n), a.setEndPoint("EndToEnd", r), a;
 }), a.prototype.getName = function() {
  return "WrappedRange";
 }, e.WrappedRange = a, e.createRange = function(t) {
  return t = t || document, new a(e.createNativeRange(t));
 }, e.createRangyRange = function(e) {
  return e = e || document, new l(e);
 }, e.createIframeRange = function(t) {
  return e.createRange(o.getIframeDocument(t));
 }, e.createIframeRangyRange = function(t) {
  return e.createRangyRange(o.getIframeDocument(t));
 }, e.addCreateMissingNativeApiListener(function(t) {
  var n = t.document;
  "undefined" == typeof n.createRange && (n.createRange = function() {
   return e.createRange(this);
  }), n = t = null;
 });
}), rangy.createModule("WrappedSelection", function(e, t) {
 function n(e) {
  return (e || window).getSelection();
 }
 function r(e) {
  return (e || window).document.selection;
 }
 function i(e, t, n) {
  var r = n ? "end" : "start", i = n ? "start" : "end";
  e.anchorNode = t[r + "Container"], e.anchorOffset = t[r + "Offset"], e.focusNode = t[i + "Container"], 
  e.focusOffset = t[i + "Offset"];
 }
 function a(e) {
  var t = e.nativeSelection;
  e.anchorNode = t.anchorNode, e.anchorOffset = t.anchorOffset, e.focusNode = t.focusNode, 
  e.focusOffset = t.focusOffset;
 }
 function o(e) {
  e.anchorNode = e.focusNode = null, e.anchorOffset = e.focusOffset = 0, e.rangeCount = 0, 
  e.isCollapsed = !0, e._ranges.length = 0;
 }
 function s(t) {
  var n;
  return t instanceof _ ? (n = t._selectionNativeRange, n || (n = e.createNativeRange(S.getDocument(t.startContainer)), 
  n.setEnd(t.endContainer, t.endOffset), n.setStart(t.startContainer, t.startOffset), 
  t._selectionNativeRange = n, t.attachListener("detach", function() {
   this._selectionNativeRange = null;
  }))) : t instanceof E ? n = t.nativeRange : e.features.implementsDomRange && t instanceof S.getWindow(t.startContainer).Range && (n = t), 
  n;
 }
 function l(e) {
  if (!e.length || 1 != e[0].nodeType) return !1;
  for (var t = 1, n = e.length; n > t; ++t) if (!S.isAncestorOf(e[0], e[t])) return !1;
  return !0;
 }
 function c(e) {
  var t = e.getNodes();
  if (!l(t)) throw new Error("getSingleElementFromRange: range " + e.inspect() + " did not consist of a single element");
  return t[0];
 }
 function u(e) {
  return !!e && "undefined" != typeof e.text;
 }
 function d(e, t) {
  var n = new E(t);
  e._ranges = [ n ], i(e, n, !1), e.rangeCount = 1, e.isCollapsed = n.collapsed;
 }
 function p(t) {
  if (t._ranges.length = 0, "None" == t.docSelection.type) o(t); else {
   var n = t.docSelection.createRange();
   if (u(n)) d(t, n); else {
    t.rangeCount = n.length;
    for (var r, a = S.getDocument(n.item(0)), s = 0; s < t.rangeCount; ++s) r = e.createRange(a), 
    r.selectNode(n.item(s)), t._ranges.push(r);
    t.isCollapsed = 1 == t.rangeCount && t._ranges[0].collapsed, i(t, t._ranges[t.rangeCount - 1], !1);
   }
  }
 }
 function h(e, t) {
  for (var n = e.docSelection.createRange(), r = c(t), i = S.getDocument(n.item(0)), a = S.getBody(i).createControlRange(), o = 0, s = n.length; s > o; ++o) a.add(n.item(o));
  try {
   a.add(r);
  } catch (l) {
   throw new Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
  }
  a.select(), p(e);
 }
 function f(e, t, n) {
  this.nativeSelection = e, this.docSelection = t, this._ranges = [], this.win = n, 
  this.refresh();
 }
 function m(e, t) {
  for (var n, r = S.getDocument(t[0].startContainer), i = S.getBody(r).createControlRange(), a = 0; rangeCount > a; ++a) {
   n = c(t[a]);
   try {
    i.add(n);
   } catch (o) {
    throw new Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");
   }
  }
  i.select(), p(e);
 }
 function g(e, t) {
  if (e.anchorNode && S.getDocument(e.anchorNode) !== S.getDocument(t)) throw new k("WRONG_DOCUMENT_ERR");
 }
 function b(e) {
  var t = [], n = new T(e.anchorNode, e.anchorOffset), r = new T(e.focusNode, e.focusOffset), i = "function" == typeof e.getName ? e.getName() : "Selection";
  if ("undefined" != typeof e.rangeCount) for (var a = 0, o = e.rangeCount; o > a; ++a) t[a] = _.inspect(e.getRangeAt(a));
  return "[" + i + "(Ranges: " + t.join(", ") + ")(anchor: " + n.inspect() + ", focus: " + r.inspect() + "]";
 }
 e.requireModules([ "DomUtil", "DomRange", "WrappedRange" ]), e.config.checkSelectionRanges = !0;
 var v, y, x = "boolean", w = "_rangySelection", S = e.dom, C = e.util, _ = e.DomRange, E = e.WrappedRange, k = e.DOMException, T = S.DomPosition, N = "Control", D = e.util.isHostMethod(window, "getSelection"), M = e.util.isHostObject(document, "selection"), I = M && (!D || e.config.preferTextRange);
 I ? (v = r, e.isSelectionValid = function(e) {
  var t = (e || window).document, n = t.selection;
  return "None" != n.type || S.getDocument(n.createRange().parentElement()) == t;
 }) : D ? (v = n, e.isSelectionValid = function() {
  return !0;
 }) : t.fail("Neither document.selection or window.getSelection() detected."), e.getNativeSelection = v;
 var A = v(), L = e.createNativeRange(document), R = S.getBody(document), P = C.areHostObjects(A, [ "anchorNode", "focusNode" ] && C.areHostProperties(A, [ "anchorOffset", "focusOffset" ]));
 e.features.selectionHasAnchorAndFocus = P;
 var F = C.isHostMethod(A, "extend");
 e.features.selectionHasExtend = F;
 var O = "number" == typeof A.rangeCount;
 e.features.selectionHasRangeCount = O;
 var B = !1, $ = !0;
 C.areHostMethods(A, [ "addRange", "getRangeAt", "removeAllRanges" ]) && "number" == typeof A.rangeCount && e.features.implementsDomRange && !function() {
  var e = document.createElement("iframe");
  e.frameBorder = 0, e.style.position = "absolute", e.style.left = "-10000px", R.appendChild(e);
  var t = S.getIframeDocument(e);
  t.open(), t.write("<html><head></head><body>12</body></html>"), t.close();
  var n = S.getIframeWindow(e).getSelection(), r = t.documentElement, i = r.lastChild, a = i.firstChild, o = t.createRange();
  o.setStart(a, 1), o.collapse(!0), n.addRange(o), $ = 1 == n.rangeCount, n.removeAllRanges();
  var s = o.cloneRange();
  o.setStart(a, 0), s.setEnd(a, 2), n.addRange(o), n.addRange(s), B = 2 == n.rangeCount, 
  o.detach(), s.detach(), R.removeChild(e);
 }(), e.features.selectionSupportsMultipleRanges = B, e.features.collapsedNonEditableSelectionsSupported = $;
 var G, j = !1;
 R && C.isHostMethod(R, "createControlRange") && (G = R.createControlRange(), C.areHostProperties(G, [ "item", "add" ]) && (j = !0)), 
 e.features.implementsControlRange = j, y = P ? function(e) {
  return e.anchorNode === e.focusNode && e.anchorOffset === e.focusOffset;
 } : function(e) {
  return e.rangeCount ? e.getRangeAt(e.rangeCount - 1).collapsed : !1;
 };
 var U;
 C.isHostMethod(A, "getRangeAt") ? U = function(e, t) {
  try {
   return e.getRangeAt(t);
  } catch (n) {
   return null;
  }
 } : P && (U = function(t) {
  var n = S.getDocument(t.anchorNode), r = e.createRange(n);
  return r.setStart(t.anchorNode, t.anchorOffset), r.setEnd(t.focusNode, t.focusOffset), 
  r.collapsed !== this.isCollapsed && (r.setStart(t.focusNode, t.focusOffset), r.setEnd(t.anchorNode, t.anchorOffset)), 
  r;
 }), e.getSelection = function(e) {
  e = e || window;
  var t = e[w], n = v(e), i = M ? r(e) : null;
  return t ? (t.nativeSelection = n, t.docSelection = i, t.refresh(e)) : (t = new f(n, i, e), 
  e[w] = t), t;
 }, e.getIframeSelection = function(t) {
  return e.getSelection(S.getIframeWindow(t));
 };
 var H = f.prototype;
 if (!I && P && C.areHostMethods(A, [ "removeAllRanges", "addRange" ])) {
  H.removeAllRanges = function() {
   this.nativeSelection.removeAllRanges(), o(this);
  };
  var z = function(t, n) {
   var r = _.getRangeDocument(n), i = e.createRange(r);
   i.collapseToPoint(n.endContainer, n.endOffset), t.nativeSelection.addRange(s(i)), 
   t.nativeSelection.extend(n.startContainer, n.startOffset), t.refresh();
  };
  H.addRange = O ? function(t, n) {
   if (j && M && this.docSelection.type == N) h(this, t); else if (n && F) z(this, t); else {
    var r;
    if (B ? r = this.rangeCount : (this.removeAllRanges(), r = 0), this.nativeSelection.addRange(s(t)), 
    this.rangeCount = this.nativeSelection.rangeCount, this.rangeCount == r + 1) {
     if (e.config.checkSelectionRanges) {
      var a = U(this.nativeSelection, this.rangeCount - 1);
      a && !_.rangesEqual(a, t) && (t = new E(a));
     }
     this._ranges[this.rangeCount - 1] = t, i(this, t, W(this.nativeSelection)), this.isCollapsed = y(this);
    } else this.refresh();
   }
  } : function(e, t) {
   t && F ? z(this, e) : (this.nativeSelection.addRange(s(e)), this.refresh());
  }, H.setRanges = function(e) {
   if (j && e.length > 1) m(this, e); else {
    this.removeAllRanges();
    for (var t = 0, n = e.length; n > t; ++t) this.addRange(e[t]);
   }
  };
 } else {
  if (!(C.isHostMethod(A, "empty") && C.isHostMethod(L, "select") && j && I)) return t.fail("No means of selecting a Range or TextRange was found"), 
  !1;
  H.removeAllRanges = function() {
   try {
    if (this.docSelection.empty(), "None" != this.docSelection.type) {
     var e;
     if (this.anchorNode) e = S.getDocument(this.anchorNode); else if (this.docSelection.type == N) {
      var t = this.docSelection.createRange();
      t.length && (e = S.getDocument(t.item(0)).body.createTextRange());
     }
     if (e) {
      var n = e.body.createTextRange();
      n.select(), this.docSelection.empty();
     }
    }
   } catch (r) {}
   o(this);
  }, H.addRange = function(e) {
   this.docSelection.type == N ? h(this, e) : (E.rangeToTextRange(e).select(), this._ranges[0] = e, 
   this.rangeCount = 1, this.isCollapsed = this._ranges[0].collapsed, i(this, e, !1));
  }, H.setRanges = function(e) {
   this.removeAllRanges();
   var t = e.length;
   t > 1 ? m(this, e) : t && this.addRange(e[0]);
  };
 }
 H.getRangeAt = function(e) {
  if (0 > e || e >= this.rangeCount) throw new k("INDEX_SIZE_ERR");
  return this._ranges[e];
 };
 var q;
 if (I) q = function(t) {
  var n;
  e.isSelectionValid(t.win) ? n = t.docSelection.createRange() : (n = S.getBody(t.win.document).createTextRange(), 
  n.collapse(!0)), t.docSelection.type == N ? p(t) : u(n) ? d(t, n) : o(t);
 }; else if (C.isHostMethod(A, "getRangeAt") && "number" == typeof A.rangeCount) q = function(t) {
  if (j && M && t.docSelection.type == N) p(t); else if (t._ranges.length = t.rangeCount = t.nativeSelection.rangeCount, 
  t.rangeCount) {
   for (var n = 0, r = t.rangeCount; r > n; ++n) t._ranges[n] = new e.WrappedRange(t.nativeSelection.getRangeAt(n));
   i(t, t._ranges[t.rangeCount - 1], W(t.nativeSelection)), t.isCollapsed = y(t);
  } else o(t);
 }; else {
  if (!P || typeof A.isCollapsed != x || typeof L.collapsed != x || !e.features.implementsDomRange) return t.fail("No means of obtaining a Range or TextRange from the user's selection was found"), 
  !1;
  q = function(e) {
   var t, n = e.nativeSelection;
   n.anchorNode ? (t = U(n, 0), e._ranges = [ t ], e.rangeCount = 1, a(e), e.isCollapsed = y(e)) : o(e);
  };
 }
 H.refresh = function(e) {
  var t = e ? this._ranges.slice(0) : null;
  if (q(this), e) {
   var n = t.length;
   if (n != this._ranges.length) return !1;
   for (;n--; ) if (!_.rangesEqual(t[n], this._ranges[n])) return !1;
   return !0;
  }
 };
 var V = function(e, t) {
  var n = e.getAllRanges(), r = !1;
  e.removeAllRanges();
  for (var i = 0, a = n.length; a > i; ++i) r || t !== n[i] ? e.addRange(n[i]) : r = !0;
  e.rangeCount || o(e);
 };
 H.removeRange = j ? function(e) {
  if (this.docSelection.type == N) {
   for (var t, n = this.docSelection.createRange(), r = c(e), i = S.getDocument(n.item(0)), a = S.getBody(i).createControlRange(), o = !1, s = 0, l = n.length; l > s; ++s) t = n.item(s), 
   t !== r || o ? a.add(n.item(s)) : o = !0;
   a.select(), p(this);
  } else V(this, e);
 } : function(e) {
  V(this, e);
 };
 var W;
 !I && P && e.features.implementsDomRange ? (W = function(e) {
  var t = !1;
  return e.anchorNode && (t = 1 == S.comparePoints(e.anchorNode, e.anchorOffset, e.focusNode, e.focusOffset)), 
  t;
 }, H.isBackwards = function() {
  return W(this);
 }) : W = H.isBackwards = function() {
  return !1;
 }, H.toString = function() {
  for (var e = [], t = 0, n = this.rangeCount; n > t; ++t) e[t] = "" + this._ranges[t];
  return e.join("");
 }, H.collapse = function(t, n) {
  g(this, t);
  var r = e.createRange(S.getDocument(t));
  r.collapseToPoint(t, n), this.removeAllRanges(), this.addRange(r), this.isCollapsed = !0;
 }, H.collapseToStart = function() {
  if (!this.rangeCount) throw new k("INVALID_STATE_ERR");
  var e = this._ranges[0];
  this.collapse(e.startContainer, e.startOffset);
 }, H.collapseToEnd = function() {
  if (!this.rangeCount) throw new k("INVALID_STATE_ERR");
  var e = this._ranges[this.rangeCount - 1];
  this.collapse(e.endContainer, e.endOffset);
 }, H.selectAllChildren = function(t) {
  g(this, t);
  var n = e.createRange(S.getDocument(t));
  n.selectNodeContents(t), this.removeAllRanges(), this.addRange(n);
 }, H.deleteFromDocument = function() {
  if (j && M && this.docSelection.type == N) {
   for (var e, t = this.docSelection.createRange(); t.length; ) e = t.item(0), t.remove(e), 
   e.parentNode.removeChild(e);
   this.refresh();
  } else if (this.rangeCount) {
   var n = this.getAllRanges();
   this.removeAllRanges();
   for (var r = 0, i = n.length; i > r; ++r) n[r].deleteContents();
   this.addRange(n[i - 1]);
  }
 }, H.getAllRanges = function() {
  return this._ranges.slice(0);
 }, H.setSingleRange = function(e) {
  this.setRanges([ e ]);
 }, H.containsNode = function(e, t) {
  for (var n = 0, r = this._ranges.length; r > n; ++n) if (this._ranges[n].containsNode(e, t)) return !0;
  return !1;
 }, H.toHtml = function() {
  var e = "";
  if (this.rangeCount) {
   for (var t = _.getRangeDocument(this._ranges[0]).createElement("div"), n = 0, r = this._ranges.length; r > n; ++n) t.appendChild(this._ranges[n].cloneContents());
   e = t.innerHTML;
  }
  return e;
 }, H.getName = function() {
  return "WrappedSelection";
 }, H.inspect = function() {
  return b(this);
 }, H.detach = function() {
  this.win[w] = null, this.win = this.anchorNode = this.focusNode = null;
 }, f.inspect = b, e.Selection = f, e.selectionPrototype = H, e.addCreateMissingNativeApiListener(function(t) {
  "undefined" == typeof t.getSelection && (t.getSelection = function() {
   return e.getSelection(this);
  }), t = null;
 });
}), define("rangy", function(e) {
 return function() {
  var t;
  return t || e.rangy;
 };
}(this)), function() {
 var e = this, t = e._, n = {}, r = Array.prototype, i = Object.prototype, a = Function.prototype, o = r.push, s = r.slice, l = r.concat, c = i.toString, u = i.hasOwnProperty, d = r.forEach, p = r.map, h = r.reduce, f = r.reduceRight, m = r.filter, g = r.every, b = r.some, v = r.indexOf, y = r.lastIndexOf, x = Array.isArray, w = Object.keys, S = a.bind, C = function(e) {
  return e instanceof C ? e : this instanceof C ? void (this._wrapped = e) : new C(e);
 };
 "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = C), 
 exports._ = C) : e._ = C, C.VERSION = "1.5.1";
 var _ = C.each = C.forEach = function(e, t, r) {
  if (null != e) if (d && e.forEach === d) e.forEach(t, r); else if (e.length === +e.length) {
   for (var i = 0, a = e.length; a > i; i++) if (t.call(r, e[i], i, e) === n) return;
  } else for (var o in e) if (C.has(e, o) && t.call(r, e[o], o, e) === n) return;
 };
 C.map = C.collect = function(e, t, n) {
  var r = [];
  return null == e ? r : p && e.map === p ? e.map(t, n) : (_(e, function(e, i, a) {
   r.push(t.call(n, e, i, a));
  }), r);
 };
 var E = "Reduce of empty array with no initial value";
 C.reduce = C.foldl = C.inject = function(e, t, n, r) {
  var i = arguments.length > 2;
  if (null == e && (e = []), h && e.reduce === h) return r && (t = C.bind(t, r)), 
  i ? e.reduce(t, n) : e.reduce(t);
  if (_(e, function(e, a, o) {
   i ? n = t.call(r, n, e, a, o) : (n = e, i = !0);
  }), !i) throw new TypeError(E);
  return n;
 }, C.reduceRight = C.foldr = function(e, t, n, r) {
  var i = arguments.length > 2;
  if (null == e && (e = []), f && e.reduceRight === f) return r && (t = C.bind(t, r)), 
  i ? e.reduceRight(t, n) : e.reduceRight(t);
  var a = e.length;
  if (a !== +a) {
   var o = C.keys(e);
   a = o.length;
  }
  if (_(e, function(s, l, c) {
   l = o ? o[--a] : --a, i ? n = t.call(r, n, e[l], l, c) : (n = e[l], i = !0);
  }), !i) throw new TypeError(E);
  return n;
 }, C.find = C.detect = function(e, t, n) {
  var r;
  return k(e, function(e, i, a) {
   return t.call(n, e, i, a) ? (r = e, !0) : void 0;
  }), r;
 }, C.filter = C.select = function(e, t, n) {
  var r = [];
  return null == e ? r : m && e.filter === m ? e.filter(t, n) : (_(e, function(e, i, a) {
   t.call(n, e, i, a) && r.push(e);
  }), r);
 }, C.reject = function(e, t, n) {
  return C.filter(e, function(e, r, i) {
   return !t.call(n, e, r, i);
  }, n);
 }, C.every = C.all = function(e, t, r) {
  t || (t = C.identity);
  var i = !0;
  return null == e ? i : g && e.every === g ? e.every(t, r) : (_(e, function(e, a, o) {
   return (i = i && t.call(r, e, a, o)) ? void 0 : n;
  }), !!i);
 };
 var k = C.some = C.any = function(e, t, r) {
  t || (t = C.identity);
  var i = !1;
  return null == e ? i : b && e.some === b ? e.some(t, r) : (_(e, function(e, a, o) {
   return i || (i = t.call(r, e, a, o)) ? n : void 0;
  }), !!i);
 };
 C.contains = C.include = function(e, t) {
  return null == e ? !1 : v && e.indexOf === v ? -1 != e.indexOf(t) : k(e, function(e) {
   return e === t;
  });
 }, C.invoke = function(e, t) {
  var n = s.call(arguments, 2), r = C.isFunction(t);
  return C.map(e, function(e) {
   return (r ? t : e[t]).apply(e, n);
  });
 }, C.pluck = function(e, t) {
  return C.map(e, function(e) {
   return e[t];
  });
 }, C.where = function(e, t, n) {
  return C.isEmpty(t) ? n ? void 0 : [] : C[n ? "find" : "filter"](e, function(e) {
   for (var n in t) if (t[n] !== e[n]) return !1;
   return !0;
  });
 }, C.findWhere = function(e, t) {
  return C.where(e, t, !0);
 }, C.max = function(e, t, n) {
  if (!t && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
  if (!t && C.isEmpty(e)) return -1/0;
  var r = {
   computed: -1/0,
   value: -1/0
  };
  return _(e, function(e, i, a) {
   var o = t ? t.call(n, e, i, a) : e;
   o > r.computed && (r = {
    value: e,
    computed: o
   });
  }), r.value;
 }, C.min = function(e, t, n) {
  if (!t && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
  if (!t && C.isEmpty(e)) return 1/0;
  var r = {
   computed: 1/0,
   value: 1/0
  };
  return _(e, function(e, i, a) {
   var o = t ? t.call(n, e, i, a) : e;
   o < r.computed && (r = {
    value: e,
    computed: o
   });
  }), r.value;
 }, C.shuffle = function(e) {
  var t, n = 0, r = [];
  return _(e, function(e) {
   t = C.random(n++), r[n - 1] = r[t], r[t] = e;
  }), r;
 };
 var T = function(e) {
  return C.isFunction(e) ? e : function(t) {
   return t[e];
  };
 };
 C.sortBy = function(e, t, n) {
  var r = T(t);
  return C.pluck(C.map(e, function(e, t, i) {
   return {
    value: e,
    index: t,
    criteria: r.call(n, e, t, i)
   };
  }).sort(function(e, t) {
   var n = e.criteria, r = t.criteria;
   if (n !== r) {
    if (n > r || void 0 === n) return 1;
    if (r > n || void 0 === r) return -1;
   }
   return e.index < t.index ? -1 : 1;
  }), "value");
 };
 var N = function(e, t, n, r) {
  var i = {}, a = T(null == t ? C.identity : t);
  return _(e, function(t, o) {
   var s = a.call(n, t, o, e);
   r(i, s, t);
  }), i;
 };
 C.groupBy = function(e, t, n) {
  return N(e, t, n, function(e, t, n) {
   (C.has(e, t) ? e[t] : e[t] = []).push(n);
  });
 }, C.countBy = function(e, t, n) {
  return N(e, t, n, function(e, t) {
   C.has(e, t) || (e[t] = 0), e[t]++;
  });
 }, C.sortedIndex = function(e, t, n, r) {
  n = null == n ? C.identity : T(n);
  for (var i = n.call(r, t), a = 0, o = e.length; o > a; ) {
   var s = a + o >>> 1;
   n.call(r, e[s]) < i ? a = s + 1 : o = s;
  }
  return a;
 }, C.toArray = function(e) {
  return e ? C.isArray(e) ? s.call(e) : e.length === +e.length ? C.map(e, C.identity) : C.values(e) : [];
 }, C.size = function(e) {
  return null == e ? 0 : e.length === +e.length ? e.length : C.keys(e).length;
 }, C.first = C.head = C.take = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[0] : s.call(e, 0, t);
 }, C.initial = function(e, t, n) {
  return s.call(e, 0, e.length - (null == t || n ? 1 : t));
 }, C.last = function(e, t, n) {
  return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0));
 }, C.rest = C.tail = C.drop = function(e, t, n) {
  return s.call(e, null == t || n ? 1 : t);
 }, C.compact = function(e) {
  return C.filter(e, C.identity);
 };
 var D = function(e, t, n) {
  return t && C.every(e, C.isArray) ? l.apply(n, e) : (_(e, function(e) {
   C.isArray(e) || C.isArguments(e) ? t ? o.apply(n, e) : D(e, t, n) : n.push(e);
  }), n);
 };
 C.flatten = function(e, t) {
  return D(e, t, []);
 }, C.without = function(e) {
  return C.difference(e, s.call(arguments, 1));
 }, C.uniq = C.unique = function(e, t, n, r) {
  C.isFunction(t) && (r = n, n = t, t = !1);
  var i = n ? C.map(e, n, r) : e, a = [], o = [];
  return _(i, function(n, r) {
   (t ? r && o[o.length - 1] === n : C.contains(o, n)) || (o.push(n), a.push(e[r]));
  }), a;
 }, C.union = function() {
  return C.uniq(C.flatten(arguments, !0));
 }, C.intersection = function(e) {
  var t = s.call(arguments, 1);
  return C.filter(C.uniq(e), function(e) {
   return C.every(t, function(t) {
    return C.indexOf(t, e) >= 0;
   });
  });
 }, C.difference = function(e) {
  var t = l.apply(r, s.call(arguments, 1));
  return C.filter(e, function(e) {
   return !C.contains(t, e);
  });
 }, C.zip = function() {
  for (var e = C.max(C.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; e > n; n++) t[n] = C.pluck(arguments, "" + n);
  return t;
 }, C.object = function(e, t) {
  if (null == e) return {};
  for (var n = {}, r = 0, i = e.length; i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
  return n;
 }, C.indexOf = function(e, t, n) {
  if (null == e) return -1;
  var r = 0, i = e.length;
  if (n) {
   if ("number" != typeof n) return r = C.sortedIndex(e, t), e[r] === t ? r : -1;
   r = 0 > n ? Math.max(0, i + n) : n;
  }
  if (v && e.indexOf === v) return e.indexOf(t, n);
  for (;i > r; r++) if (e[r] === t) return r;
  return -1;
 }, C.lastIndexOf = function(e, t, n) {
  if (null == e) return -1;
  var r = null != n;
  if (y && e.lastIndexOf === y) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
  for (var i = r ? n : e.length; i--; ) if (e[i] === t) return i;
  return -1;
 }, C.range = function(e, t, n) {
  arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
  for (var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, a = new Array(r); r > i; ) a[i++] = e, 
  e += n;
  return a;
 };
 var M = function() {};
 C.bind = function(e, t) {
  var n, r;
  if (S && e.bind === S) return S.apply(e, s.call(arguments, 1));
  if (!C.isFunction(e)) throw new TypeError();
  return n = s.call(arguments, 2), r = function() {
   if (!(this instanceof r)) return e.apply(t, n.concat(s.call(arguments)));
   M.prototype = e.prototype;
   var i = new M();
   M.prototype = null;
   var a = e.apply(i, n.concat(s.call(arguments)));
   return Object(a) === a ? a : i;
  };
 }, C.partial = function(e) {
  var t = s.call(arguments, 1);
  return function() {
   return e.apply(this, t.concat(s.call(arguments)));
  };
 }, C.bindAll = function(e) {
  var t = s.call(arguments, 1);
  if (0 === t.length) throw new Error("bindAll must be passed function names");
  return _(t, function(t) {
   e[t] = C.bind(e[t], e);
  }), e;
 }, C.memoize = function(e, t) {
  var n = {};
  return t || (t = C.identity), function() {
   var r = t.apply(this, arguments);
   return C.has(n, r) ? n[r] : n[r] = e.apply(this, arguments);
  };
 }, C.delay = function(e, t) {
  var n = s.call(arguments, 2);
  return setTimeout(function() {
   return e.apply(null, n);
  }, t);
 }, C.defer = function(e) {
  return C.delay.apply(C, [ e, 1 ].concat(s.call(arguments, 1)));
 }, C.throttle = function(e, t, n) {
  var r, i, a, o = null, s = 0;
  n || (n = {});
  var l = function() {
   s = n.leading === !1 ? 0 : new Date(), o = null, a = e.apply(r, i);
  };
  return function() {
   var c = new Date();
   s || n.leading !== !1 || (s = c);
   var u = t - (c - s);
   return r = this, i = arguments, 0 >= u ? (clearTimeout(o), o = null, s = c, a = e.apply(r, i)) : o || n.trailing === !1 || (o = setTimeout(l, u)), 
   a;
  };
 }, C.debounce = function(e, t, n) {
  var r, i = null;
  return function() {
   var a = this, o = arguments, s = function() {
    i = null, n || (r = e.apply(a, o));
   }, l = n && !i;
   return clearTimeout(i), i = setTimeout(s, t), l && (r = e.apply(a, o)), r;
  };
 }, C.once = function(e) {
  var t, n = !1;
  return function() {
   return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t);
  };
 }, C.wrap = function(e, t) {
  return function() {
   var n = [ e ];
   return o.apply(n, arguments), t.apply(this, n);
  };
 }, C.compose = function() {
  var e = arguments;
  return function() {
   for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
   return t[0];
  };
 }, C.after = function(e, t) {
  return function() {
   return --e < 1 ? t.apply(this, arguments) : void 0;
  };
 }, C.keys = w || function(e) {
  if (e !== Object(e)) throw new TypeError("Invalid object");
  var t = [];
  for (var n in e) C.has(e, n) && t.push(n);
  return t;
 }, C.values = function(e) {
  var t = [];
  for (var n in e) C.has(e, n) && t.push(e[n]);
  return t;
 }, C.pairs = function(e) {
  var t = [];
  for (var n in e) C.has(e, n) && t.push([ n, e[n] ]);
  return t;
 }, C.invert = function(e) {
  var t = {};
  for (var n in e) C.has(e, n) && (t[e[n]] = n);
  return t;
 }, C.functions = C.methods = function(e) {
  var t = [];
  for (var n in e) C.isFunction(e[n]) && t.push(n);
  return t.sort();
 }, C.extend = function(e) {
  return _(s.call(arguments, 1), function(t) {
   if (t) for (var n in t) e[n] = t[n];
  }), e;
 }, C.pick = function(e) {
  var t = {}, n = l.apply(r, s.call(arguments, 1));
  return _(n, function(n) {
   n in e && (t[n] = e[n]);
  }), t;
 }, C.omit = function(e) {
  var t = {}, n = l.apply(r, s.call(arguments, 1));
  for (var i in e) C.contains(n, i) || (t[i] = e[i]);
  return t;
 }, C.defaults = function(e) {
  return _(s.call(arguments, 1), function(t) {
   if (t) for (var n in t) void 0 === e[n] && (e[n] = t[n]);
  }), e;
 }, C.clone = function(e) {
  return C.isObject(e) ? C.isArray(e) ? e.slice() : C.extend({}, e) : e;
 }, C.tap = function(e, t) {
  return t(e), e;
 };
 var I = function(e, t, n, r) {
  if (e === t) return 0 !== e || 1 / e == 1 / t;
  if (null == e || null == t) return e === t;
  e instanceof C && (e = e._wrapped), t instanceof C && (t = t._wrapped);
  var i = c.call(e);
  if (i != c.call(t)) return !1;
  switch (i) {
  case "[object String]":
   return e == String(t);

  case "[object Number]":
   return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;

  case "[object Date]":
  case "[object Boolean]":
   return +e == +t;

  case "[object RegExp]":
   return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase;
  }
  if ("object" != typeof e || "object" != typeof t) return !1;
  for (var a = n.length; a--; ) if (n[a] == e) return r[a] == t;
  var o = e.constructor, s = t.constructor;
  if (o !== s && !(C.isFunction(o) && o instanceof o && C.isFunction(s) && s instanceof s)) return !1;
  n.push(e), r.push(t);
  var l = 0, u = !0;
  if ("[object Array]" == i) {
   if (l = e.length, u = l == t.length) for (;l-- && (u = I(e[l], t[l], n, r)); ) ;
  } else {
   for (var d in e) if (C.has(e, d) && (l++, !(u = C.has(t, d) && I(e[d], t[d], n, r)))) break;
   if (u) {
    for (d in t) if (C.has(t, d) && !l--) break;
    u = !l;
   }
  }
  return n.pop(), r.pop(), u;
 };
 C.isEqual = function(e, t) {
  return I(e, t, [], []);
 }, C.isEmpty = function(e) {
  if (null == e) return !0;
  if (C.isArray(e) || C.isString(e)) return 0 === e.length;
  for (var t in e) if (C.has(e, t)) return !1;
  return !0;
 }, C.isElement = function(e) {
  return !(!e || 1 !== e.nodeType);
 }, C.isArray = x || function(e) {
  return "[object Array]" == c.call(e);
 }, C.isObject = function(e) {
  return e === Object(e);
 }, _([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(e) {
  C["is" + e] = function(t) {
   return c.call(t) == "[object " + e + "]";
  };
 }), C.isArguments(arguments) || (C.isArguments = function(e) {
  return !(!e || !C.has(e, "callee"));
 }), "function" != typeof /./ && (C.isFunction = function(e) {
  return "function" == typeof e;
 }), C.isFinite = function(e) {
  return isFinite(e) && !isNaN(parseFloat(e));
 }, C.isNaN = function(e) {
  return C.isNumber(e) && e != +e;
 }, C.isBoolean = function(e) {
  return e === !0 || e === !1 || "[object Boolean]" == c.call(e);
 }, C.isNull = function(e) {
  return null === e;
 }, C.isUndefined = function(e) {
  return void 0 === e;
 }, C.has = function(e, t) {
  return u.call(e, t);
 }, C.noConflict = function() {
  return e._ = t, this;
 }, C.identity = function(e) {
  return e;
 }, C.times = function(e, t, n) {
  for (var r = Array(Math.max(0, e)), i = 0; e > i; i++) r[i] = t.call(n, i);
  return r;
 }, C.random = function(e, t) {
  return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
 };
 var A = {
  escape: {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': "&quot;",
   "'": "&#x27;",
   "/": "&#x2F;"
  }
 };
 A.unescape = C.invert(A.escape);
 var L = {
  escape: new RegExp("[" + C.keys(A.escape).join("") + "]", "g"),
  unescape: new RegExp("(" + C.keys(A.unescape).join("|") + ")", "g")
 };
 C.each([ "escape", "unescape" ], function(e) {
  C[e] = function(t) {
   return null == t ? "" : ("" + t).replace(L[e], function(t) {
    return A[e][t];
   });
  };
 }), C.result = function(e, t) {
  if (null == e) return void 0;
  var n = e[t];
  return C.isFunction(n) ? n.call(e) : n;
 }, C.mixin = function(e) {
  _(C.functions(e), function(t) {
   var n = C[t] = e[t];
   C.prototype[t] = function() {
    var e = [ this._wrapped ];
    return o.apply(e, arguments), B.call(this, n.apply(C, e));
   };
  });
 };
 var R = 0;
 C.uniqueId = function(e) {
  var t = ++R + "";
  return e ? e + t : t;
 }, C.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
 };
 var P = /(.)^/, F = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "	": "t",
  "\u2028": "u2028",
  "\u2029": "u2029"
 }, O = /\\|'|\r|\n|\t|\u2028|\u2029/g;
 C.template = function(e, t, n) {
  var r;
  n = C.defaults({}, n, C.templateSettings);
  var i = new RegExp([ (n.escape || P).source, (n.interpolate || P).source, (n.evaluate || P).source ].join("|") + "|$", "g"), a = 0, o = "__p+='";
  e.replace(i, function(t, n, r, i, s) {
   return o += e.slice(a, s).replace(O, function(e) {
    return "\\" + F[e];
   }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), 
   i && (o += "';\n" + i + "\n__p+='"), a = s + t.length, t;
  }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
  try {
   r = new Function(n.variable || "obj", "_", o);
  } catch (s) {
   throw s.source = o, s;
  }
  if (t) return r(t, C);
  var l = function(e) {
   return r.call(this, e, C);
  };
  return l.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", l;
 }, C.chain = function(e) {
  return C(e).chain();
 };
 var B = function(e) {
  return this._chain ? C(e).chain() : e;
 };
 C.mixin(C), _([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
  var t = r[e];
  C.prototype[e] = function() {
   var n = this._wrapped;
   return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], 
   B.call(this, n);
  };
 }), _([ "concat", "join", "slice" ], function(e) {
  var t = r[e];
  C.prototype[e] = function() {
   return B.call(this, t.apply(this._wrapped, arguments));
  };
 }), C.extend(C.prototype, {
  chain: function() {
   return this._chain = !0, this;
  },
  value: function() {
   return this._wrapped;
  }
 });
}.call(this), define("underscore", function(e) {
 return function() {
  var t;
  return t || e._;
 };
}(this)), function(e, t) {
 "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define("crel", t) : e.crel = t();
}(this, function() {
 function e() {
  var n, r = window.document, i = arguments, a = r.createElement(i[0]), o = i[1], s = 2, l = i.length, c = e.attrMap;
  if (1 === l) return a;
  if (("object" != typeof o || t(o)) && (--s, o = null), l - s === 1 && "string" == typeof i[s] && void 0 !== a.textContent) a.textContent = i[s]; else for (;l > s; ++s) n = i[s], 
  null != n && (t(n) || (n = r.createTextNode(n)), a.appendChild(n));
  for (var u in o) if (c[u]) {
   var d = e.attrMap[u];
   "function" == typeof d ? d(a, o[u]) : a.setAttribute(d, o[u]);
  } else a.setAttribute(u, o[u]);
  return a;
 }
 var t = "object" == typeof Node ? function(e) {
  return e instanceof Node;
 } : function(e) {
  return e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
 };
 return e.attrMap = {}, e.isNode = t, e;
}), define("storage", [ "underscore" ], function(e) {
 function t(t) {
  try {
   return e.compact(localStorage[t].split(";"));
  } catch (n) {
   return localStorage[t] = ";", [];
  }
 }
 var n, r, i = t("file.list"), a = localStorage.version;
 if (void 0 === a && (localStorage.removeItem("sync.queue"), localStorage.removeItem("sync.current"), 
 localStorage.removeItem("file.counter"), e.each(i, function(n) {
  localStorage[n + ".publish"] = ";";
  var r = t(n + ".sync");
  e.each(r, function(e) {
   localStorage[e + ".contentCRC"] = "0", void 0 !== localStorage[e + ".etag"] && (localStorage[e + ".titleCRC"] = "0");
  });
 }), a = "v1"), "v1" == a) {
  var o = localStorage["sync.gdrive.lastChangeId"];
  o && (localStorage["gdrive.lastChangeId"] = o, localStorage.removeItem("sync.gdrive.lastChangeId"));
  var s = localStorage["sync.dropbox.lastChangeId"];
  s && (localStorage["dropbox.lastChangeId"] = s, localStorage.removeItem("sync.dropbox.lastChangeId"));
  var l = "gdrive", c = "dropbox", u = "sync." + l + ".", d = "sync." + c + ".";
  e.each(i, function(n) {
   var r = t(n + ".sync");
   e.each(r, function(e) {
    var t = {};
    0 === e.indexOf(u) ? (t.provider = l, t.id = e.substring(u.length), t.etag = localStorage[e + ".etag"], 
    t.contentCRC = localStorage[e + ".contentCRC"], t.titleCRC = localStorage[e + ".titleCRC"]) : 0 === e.indexOf(d) && (t.provider = c, 
    t.path = decodeURIComponent(e.substring(d.length)), t.version = localStorage[e + ".version"], 
    t.contentCRC = localStorage[e + ".contentCRC"]), localStorage[e] = JSON.stringify(t), 
    localStorage.removeItem(e + ".etag"), localStorage.removeItem(e + ".version"), localStorage.removeItem(e + ".contentCRC"), 
    localStorage.removeItem(e + ".titleCRC");
   });
  }), a = "v2";
 }
 return "v2" == a && (e.each(i, function(t) {
  e.has(localStorage, t + ".sync") || (localStorage.removeItem(t + ".title"), localStorage.removeItem(t + ".publish"), 
  localStorage.removeItem(t + ".content"), localStorage["file.list"].replace(";" + t + ";", ";"));
 }), a = "v3"), "v3" == a && (n = localStorage["file.current"], void 0 !== n && -1 === localStorage["file.list"].indexOf(";" + n + ";") && localStorage.removeItem("file.current"), 
 a = "v4"), "v4" == a && (localStorage.removeItem("githubToken"), a = "v5"), "v5" == a && (e.each(i, function(n) {
  var r = t(n + ".publish");
  e.each(r, function(e) {
   var t = JSON.parse(localStorage[e]);
   "gdrive" == t.provider && (t.id = t.fileId, t.fileId = void 0, localStorage[e] = JSON.stringify(t));
  });
 }), a = "v6"), "v6" == a && (n = localStorage["file.current"], void 0 !== n && (localStorage[n + ".selectTime"] = new Date().getTime(), 
 localStorage.removeItem("file.current")), a = "v7"), ("v7" == a || "v8" == a || "v9" == a) && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 delete r.editorFontFamily, delete r.editorFontSize, r.template && (r.template = r.template.replace("http://benweet.github.io/stackedit/css/main-min.css", "http://benweet.github.io/stackedit/res-min/themes/default.css")), 
 localStorage.settings = JSON.stringify(r)), a = "v10"), "v10" == a && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 ((r.extensionSettings || {}).markdownExtra || {}).extensions && r.extensionSettings.markdownExtra.extensions.push("smartypants"), 
 "http://stackedit-ssh-proxy.herokuapp.com/" == r.sshProxy && (r.sshProxy = "https://stackedit-ssh-proxy.herokuapp.com/"), 
 r.template && (r.template = r.template.replace("http://benweet.github.io/stackedit/lib/", "https://stackedit.io/libs/")), 
 r.template && (r.template = r.template.replace("http://benweet.github.io/stackedit/", "https://stackedit.io/")), 
 r.pdfTemplate && (r.pdfTemplate = r.pdfTemplate.replace("http://benweet.github.io/stackedit/lib/", "https://stackedit.io/libs/")), 
 r.pdfTemplate && (r.pdfTemplate = r.pdfTemplate.replace("http://benweet.github.io/stackedit/", "https://stackedit.io/")), 
 r.defaultContent && (r.defaultContent = r.defaultContent.replace("http://benweet.github.io/stackedit/", "https://stackedit.io/")), 
 r.commitMsg && (r.commitMsg = r.commitMsg.replace("http://benweet.github.io/stackedit/", "https://stackedit.io/")), 
 localStorage.settings = JSON.stringify(r)), a = "v11"), "v11" == a && (localStorage.removeItem("theme"), 
 e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), delete r.editorFontFamily, 
 delete r.editorFontSize, r.template && (r.template = r.template.replace("https://stackedit.io/res-min/themes/default.css", "https://stackedit.io/res-min/themes/base.css")), 
 r.pdfTemplate && (r.pdfTemplate = r.pdfTemplate.replace("https://stackedit.io/res-min/themes/default.css", "https://stackedit.io/res-min/themes/base.css")), 
 localStorage.settings = JSON.stringify(r)), a = "v12"), ("v12" == a || "v13" == a) && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 delete r.editorFontFamily, localStorage.settings = JSON.stringify(r)), a = "v14"), 
 "v14" == a && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 r.template && (r.template = r.template.replace("https://stackedit.io/res-min/themes/default.css", "https://stackedit.io/res-min/themes/base.css")), 
 r.pdfTemplate && (r.pdfTemplate = r.pdfTemplate.replace("https://stackedit.io/res-min/themes/default.css", "https://stackedit.io/res-min/themes/base.css")), 
 localStorage.settings = JSON.stringify(r)), a = "v15"), "v15" == a && (localStorage.removeItem("gdrivePermissions"), 
 e.has(localStorage, "gdrive.lastChangeId") && (localStorage["google.gdrive0.gdrive.lastChangeId"] = localStorage["gdrive.lastChangeId"], 
 localStorage.removeItem("gdrive.lastChangeId")), e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 ((r.extensionSettings || {}).markdownExtra || {}).extensions && (r.extensionSettings.markdownExtra.extensions.push("newlines"), 
 r.extensionSettings.markdownExtra.extensions.push("strikethrough")), localStorage.settings = JSON.stringify(r)), 
 a = "v16"), ("v16" == a || "v17" == a) && (localStorage.removeItem("focusMode"), 
 localStorage.removeItem("mode"), localStorage.removeItem("gdrive.state"), localStorage.removeItem("google.picasa0.permissions"), 
 localStorage.removeItem("google.picasa0.userId"), e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 delete r.shortcuts, delete r.editorFontFamily, delete r.editorFontSize, delete r.maxWidth, 
 localStorage.settings = JSON.stringify(r)), a = "v18"), "v18" == a && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 ((r.extensionSettings || {}).markdownExtra || {}).diagrams = !0, localStorage.settings = JSON.stringify(r)), 
 a = "v19"), "v19" == a && (localStorage.removeItem("themeV3"), localStorage.removeItem("welcomeTour"), 
 e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), delete r.pdfTemplate, 
 delete r.pdfPageSize, delete r.sshProxy, localStorage.settings = JSON.stringify(r)), 
 a = "v20"), "v20" == a && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 delete r.markdownMimeType, localStorage.settings = JSON.stringify(r)), a = "v21"), 
 "v21" == a && (e.has(localStorage, "settings") && (r = JSON.parse(localStorage.settings), 
 r.template && (r.template = r.template.replace("https://stackedit.io/libs/MathJax/", "https://cdn.mathjax.org/mathjax/latest/")), 
 r.pdfTemplate && (r.pdfTemplate = r.pdfTemplate.replace("/libs/MathJax/", "/res/bower-libs/MathJax/")), 
 localStorage.settings = JSON.stringify(r)), a = "v22"), localStorage.version = a, 
 localStorage;
}), function(e) {
 var t;
 "function" == typeof define ? define("xregexp", e) : "object" == typeof exports ? (t = e(), 
 ("object" == typeof module ? module.exports = t : exports).XRegExp = t) : XRegExp = e();
}(function() {
 var e = function(e) {
  function t(e, t, n) {
   var r;
   if (n) if (e.__proto__) e.__proto__ = g.prototype; else for (r in g.prototype) e[r] = g.prototype[r];
   return e[v] = {
    captureNames: t
   }, e;
  }
  function n(e) {
   return x.replace.call(e, /([\s\S])(?=[\s\S]*\1)/g, "");
  }
  function r(e, r) {
   if (!g.isRegExp(e)) throw new TypeError("Type RegExp expected");
   var i = x.exec.call(/\/([a-z]*)$/i, String(e))[1];
   return r = r || {}, r.add && (i = n(i + r.add)), r.remove && (i = x.replace.call(i, new RegExp("[" + r.remove + "]+", "g"), "")), 
   e = t(new RegExp(e.source, i), a(e) ? e[v].captureNames.slice(0) : null, r.addProto);
  }
  function i() {
   return {
    captureNames: null
   };
  }
  function a(e) {
   return !(!e[v] || !e[v].captureNames);
  }
  function o(e, t) {
   if (Array.prototype.indexOf) return e.indexOf(t);
   var n, r = e.length;
   for (n = 0; r > n; ++n) if (e[n] === t) return n;
   return -1;
  }
  function s(e, t) {
   return A.call(e) === "[object " + t + "]";
  }
  function l(e, t, n) {
   return x.test.call(n.indexOf("x") > -1 ? /^(?:\s+|#.*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ : /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/, e.slice(t));
  }
  function c(e, t) {
   var r;
   if (n(t) !== t) throw new SyntaxError("Invalid duplicate regex flag " + t);
   for (e = x.replace.call(e, /^\(\?([\w$]+)\)/, function(e, r) {
    if (x.test.call(/[gy]/, r)) throw new SyntaxError("Cannot use flag g or y in mode modifier " + e);
    return t = n(t + r), "";
   }), r = 0; r < t.length; ++r) if (!I[t.charAt(r)]) throw new SyntaxError("Unknown regex flag " + t.charAt(r));
   return {
    pattern: e,
    flags: t
   };
  }
  function u(e) {
   return e = e || {}, s(e, "String") && (e = g.forEach(e, /[^\s,]+/, function(e) {
    this[e] = !0;
   }, {})), e;
  }
  function d(e) {
   if (!/^[\w$]$/.test(e)) throw new Error("Flag must be a single character A-Za-z0-9_$");
   I[e] = !0;
  }
  function p(e, t, n, r, i) {
   for (var a, o, s = _.length, l = null; s--; ) if (o = _[s], (o.scope === r || "all" === o.scope) && (!o.flag || t.indexOf(o.flag) > -1) && (a = g.exec(e, o.regex, n, "sticky"))) {
    l = {
     matchLength: a[0].length,
     output: o.handler.call(i, a, r, t),
     reparse: o.reparse
    };
    break;
   }
   return l;
  }
  function h(e) {
   g.cache.flush("patterns"), y.astral = e;
  }
  function f(e) {
   RegExp.prototype.exec = (e ? w : x).exec, RegExp.prototype.test = (e ? w : x).test, 
   String.prototype.match = (e ? w : x).match, String.prototype.replace = (e ? w : x).replace, 
   String.prototype.split = (e ? w : x).split, y.natives = e;
  }
  function m(e) {
   if (null == e) throw new TypeError("Cannot convert null or undefined to object");
   return e;
  }
  var g, b, v = "xregexp", y = {
   astral: !1,
   natives: !1
  }, x = {
   exec: RegExp.prototype.exec,
   test: RegExp.prototype.test,
   match: String.prototype.match,
   replace: String.prototype.replace,
   split: String.prototype.split
  }, w = {}, S = {}, C = {}, _ = [], E = "default", k = "class", T = {
   "default": /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
   "class": /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|[\s\S]/
  }, N = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g, D = x.exec.call(/()??/, "")[1] === e, M = RegExp.prototype.sticky !== e, I = {
   g: !0,
   i: !0,
   m: !0,
   y: M
  }, A = {}.toString;
  return g = function(n, i) {
   var a, o, s, l = {
    hasNamedCapture: !1,
    captureNames: []
   }, u = E, d = "", h = 0;
   if (g.isRegExp(n)) {
    if (i !== e) throw new TypeError("Cannot supply flags when copying a RegExp");
    return r(n, {
     addProto: !0
    });
   }
   if (n = n === e ? "" : String(n), i = i === e ? "" : String(i), s = n + "***" + i, 
   !C[s]) {
    for (a = c(n, i), n = a.pattern, i = a.flags; h < n.length; ) {
     do a = p(n, i, h, u, l), a && a.reparse && (n = n.slice(0, h) + a.output + n.slice(h + a.matchLength)); while (a && a.reparse);
     a ? (d += a.output, h += a.matchLength || 1) : (o = g.exec(n, T[u], h, "sticky")[0], 
     d += o, h += o.length, "[" === o && u === E ? u = k : "]" === o && u === k && (u = E));
    }
    C[s] = {
     pattern: x.replace.call(d, /\(\?:\)(?=\(\?:\))|^\(\?:\)|\(\?:\)$/g, ""),
     flags: x.replace.call(i, /[^gimy]+/g, ""),
     captures: l.hasNamedCapture ? l.captureNames : null
    };
   }
   return s = C[s], t(new RegExp(s.pattern, s.flags), s.captures, !0);
  }, g.prototype = new RegExp(), g.version = "3.0.0-pre", g.addToken = function(e, t, n) {
   n = n || {};
   var i, a = n.optionalFlags;
   if (n.flag && d(n.flag), a) for (a = x.split.call(a, ""), i = 0; i < a.length; ++i) d(a[i]);
   _.push({
    regex: r(e, {
     add: "g" + (M ? "y" : "")
    }),
    handler: t,
    scope: n.scope || E,
    flag: n.flag,
    reparse: n.reparse
   }), g.cache.flush("patterns");
  }, g.cache = function(e, t) {
   var n = e + "***" + (t || "");
   return S[n] || (S[n] = g(e, t));
  }, g.cache.flush = function(e) {
   "patterns" === e ? C = {} : S = {};
  }, g.escape = function(e) {
   return x.replace.call(m(e), /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }, g.exec = function(e, t, n, a) {
   var o, s, l = "g";
   return M && (a || t.sticky && a !== !1) && (l += "y"), t[v] = t[v] || i(), s = t[v][l] || (t[v][l] = r(t, {
    add: l,
    remove: a === !1 ? "y" : ""
   })), s.lastIndex = n = n || 0, o = w.exec.call(s, e), a && o && o.index !== n && (o = null), 
   t.global && (t.lastIndex = o ? s.lastIndex : 0), o;
  }, g.forEach = function(e, t, n, r) {
   for (var i, a = 0, o = -1; i = g.exec(e, t, a); ) n.call(r, i, ++o, e, t), a = i.index + (i[0].length || 1);
   return r;
  }, g.globalize = function(e) {
   return r(e, {
    add: "g",
    addProto: !0
   });
  }, g.install = function(e) {
   e = u(e), !y.astral && e.astral && h(!0), !y.natives && e.natives && f(!0);
  }, g.isInstalled = function(e) {
   return !!y[e];
  }, g.isRegExp = function(e) {
   return "[object RegExp]" === A.call(e);
  }, g.match = function(e, t, n) {
   var a, o, s = t.global && "one" !== n || "all" === n, l = (s ? "g" : "") + (t.sticky ? "y" : "");
   return t[v] = t[v] || i(), o = t[v][l || "noGY"] || (t[v][l || "noGY"] = r(t, {
    add: l,
    remove: "one" === n ? "g" : ""
   })), a = x.match.call(m(e), o), t.global && (t.lastIndex = "one" === n && a ? a.index + a[0].length : 0), 
   s ? a || [] : a && a[0];
  }, g.matchChain = function(e, t) {
   return function n(e, r) {
    var i, a = t[r].regex ? t[r] : {
     regex: t[r]
    }, o = [], s = function(e) {
     if (a.backref) {
      if (!(e.hasOwnProperty(a.backref) || +a.backref < e.length)) throw new ReferenceError("Backreference to undefined group: " + a.backref);
      o.push(e[a.backref] || "");
     } else o.push(e[0]);
    };
    for (i = 0; i < e.length; ++i) g.forEach(e[i], a.regex, s);
    return r !== t.length - 1 && o.length ? n(o, r + 1) : o;
   }([ e ], 0);
  }, g.replace = function(e, t, n, a) {
   var o, s = g.isRegExp(t), l = t.global && "one" !== a || "all" === a, c = (l ? "g" : "") + (t.sticky ? "y" : ""), u = t;
   return s ? (t[v] = t[v] || i(), u = t[v][c || "noGY"] || (t[v][c || "noGY"] = r(t, {
    add: c,
    remove: "one" === a ? "g" : ""
   }))) : l && (u = new RegExp(g.escape(String(t)), "g")), o = w.replace.call(m(e), u, n), 
   s && t.global && (t.lastIndex = 0), o;
  }, g.replaceEach = function(e, t) {
   var n, r;
   for (n = 0; n < t.length; ++n) r = t[n], e = g.replace(e, r[0], r[1], r[2]);
   return e;
  }, g.split = function(e, t, n) {
   return w.split.call(m(e), t, n);
  }, g.test = function(e, t, n, r) {
   return !!g.exec(e, t, n, r);
  }, g.uninstall = function(e) {
   e = u(e), y.astral && e.astral && h(!1), y.natives && e.natives && f(!1);
  }, g.union = function(e, t) {
   var n, r, i, a, o = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g, l = [], c = 0, u = function(e, t, i) {
    var a = r[c - n];
    if (t) {
     if (++c, a) return "(?<" + a + ">";
    } else if (i) return "\\" + (+i + n);
    return e;
   };
   if (!s(e, "Array") || !e.length) throw new TypeError("Must provide a nonempty array of patterns to merge");
   for (a = 0; a < e.length; ++a) i = e[a], g.isRegExp(i) ? (n = c, r = i[v] && i[v].captureNames || [], 
   l.push(x.replace.call(g(i.source).source, o, u))) : l.push(g.escape(i));
   return g(l.join("|"), t);
  }, w.exec = function(t) {
   var n, i, a, s = this.lastIndex, l = x.exec.apply(this, arguments);
   if (l) {
    if (!D && l.length > 1 && o(l, "") > -1 && (i = r(this, {
     remove: "g"
    }), x.replace.call(String(t).slice(l.index), i, function() {
     var t, n = arguments.length;
     for (t = 1; n - 2 > t; ++t) arguments[t] === e && (l[t] = e);
    })), this[v] && this[v].captureNames) for (a = 1; a < l.length; ++a) n = this[v].captureNames[a - 1], 
    n && (l[n] = l[a]);
    this.global && !l[0].length && this.lastIndex > l.index && (this.lastIndex = l.index);
   }
   return this.global || (this.lastIndex = s), l;
  }, w.test = function(e) {
   return !!w.exec.call(this, e);
  }, w.match = function(e) {
   var t;
   if (g.isRegExp(e)) {
    if (e.global) return t = x.match.apply(this, arguments), e.lastIndex = 0, t;
   } else e = new RegExp(e);
   return w.exec.call(e, m(this));
  }, w.replace = function(t, n) {
   var r, i, a, l = g.isRegExp(t);
   return l ? (t[v] && (i = t[v].captureNames), r = t.lastIndex) : t += "", a = s(n, "Function") ? x.replace.call(String(this), t, function() {
    var r, a = arguments;
    if (i) for (a[0] = new String(a[0]), r = 0; r < i.length; ++r) i[r] && (a[0][i[r]] = a[r + 1]);
    return l && t.global && (t.lastIndex = a[a.length - 2] + a[0].length), n.apply(e, a);
   }) : x.replace.call(null == this ? this : String(this), t, function() {
    var e = arguments;
    return x.replace.call(String(n), N, function(t, n, r) {
     var a;
     if (n) {
      if (a = +n, a <= e.length - 3) return e[a] || "";
      if (a = i ? o(i, n) : -1, 0 > a) throw new SyntaxError("Backreference to undefined group " + t);
      return e[a + 1] || "";
     }
     if ("$" === r) return "$";
     if ("&" === r || 0 === +r) return e[0];
     if ("`" === r) return e[e.length - 1].slice(0, e[e.length - 2]);
     if ("'" === r) return e[e.length - 1].slice(e[e.length - 2] + e[0].length);
     if (r = +r, !isNaN(r)) {
      if (r > e.length - 3) throw new SyntaxError("Backreference to undefined group " + t);
      return e[r] || "";
     }
     throw new SyntaxError("Invalid token " + t);
    });
   }), l && (t.lastIndex = t.global ? 0 : r), a;
  }, w.split = function(t, n) {
   if (!g.isRegExp(t)) return x.split.apply(this, arguments);
   var r, i = String(this), a = [], o = t.lastIndex, s = 0;
   return n = (n === e ? -1 : n) >>> 0, g.forEach(i, t, function(e) {
    e.index + e[0].length > s && (a.push(i.slice(s, e.index)), e.length > 1 && e.index < i.length && Array.prototype.push.apply(a, e.slice(1)), 
    r = e[0].length, s = e.index + r);
   }), s === i.length ? (!x.test.call(t, "") || r) && a.push("") : a.push(i.slice(s)), 
   t.lastIndex = o, a.length > n ? a.slice(0, n) : a;
  }, b = g.addToken, b(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/, function(e, t) {
   if ("B" === e[1] && t === E) return e[0];
   throw new SyntaxError("Invalid escape " + e[0]);
  }, {
   scope: "all"
  }), b(/\[(\^?)]/, function(e) {
   return e[1] ? "[\\s\\S]" : "\\b\\B";
  }), b(/\(\?#[^)]*\)/, function(e, t, n) {
   return l(e.input, e.index + e[0].length, n) ? "" : "(?:)";
  }), b(/\s+|#.*/, function(e, t, n) {
   return l(e.input, e.index + e[0].length, n) ? "" : "(?:)";
  }, {
   flag: "x"
  }), b(/\./, function() {
   return "[\\s\\S]";
  }, {
   flag: "s"
  }), b(/\\k<([\w$]+)>/, function(e) {
   var t = isNaN(e[1]) ? o(this.captureNames, e[1]) + 1 : +e[1], n = e.index + e[0].length;
   if (!t || t > this.captureNames.length) throw new SyntaxError("Backreference to undefined group " + e[0]);
   return "\\" + t + (n === e.input.length || isNaN(e.input.charAt(n)) ? "" : "(?:)");
  }), b(/\\(\d+)/, function(e, t) {
   if (!(t === E && /^[1-9]/.test(e[1]) && +e[1] <= this.captureNames.length) && "0" !== e[1]) throw new SyntaxError("Cannot use octal escape or backreference to undefined group " + e[0]);
   return e[0];
  }, {
   scope: "all"
  }), b(/\(\?P?<([\w$]+)>/, function(e) {
   if (!isNaN(e[1])) throw new SyntaxError("Cannot use integer as capture name " + e[0]);
   if ("length" === e[1] || "__proto__" === e[1]) throw new SyntaxError("Cannot use reserved word as capture name " + e[0]);
   if (o(this.captureNames, e[1]) > -1) throw new SyntaxError("Cannot use same name for multiple groups " + e[0]);
   return this.captureNames.push(e[1]), this.hasNamedCapture = !0, "(";
  }), b(/\((?!\?)/, function(e, t, n) {
   return n.indexOf("n") > -1 ? "(?:" : (this.captureNames.push(null), "(");
  }, {
   optionalFlags: "n"
  }), g;
 }();
 return function(e) {
  function t(e) {
   var t = /^\^/, n = /\$$/;
   return t.test(e) && n.test(e.replace(/\\[\s\S]/g, "")) ? e.replace(t, "").replace(n, "") : e;
  }
  function n(t) {
   return e.isRegExp(t) ? t[r] && t[r].captureNames ? t : e(t.source) : e(t);
  }
  var r = "xregexp", i = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g, a = e.union([ /\({{([\w$]+)}}\)|{{([\w$]+)}}/, i ], "g");
  e.build = function(o, s, l) {
   var c, u, d, p, h = /^\(\?([\w$]+)\)/.exec(o), f = {}, m = 0, g = 0, b = [ 0 ];
   h && (l = l || "", h[1].replace(/./g, function(e) {
    l += l.indexOf(e) > -1 ? "" : e;
   }));
   for (p in s) s.hasOwnProperty(p) && (d = n(s[p]), f[p] = {
    pattern: t(d.source),
    names: d[r].captureNames || []
   });
   return o = n(o), u = o[r].captureNames || [], o = o.source.replace(a, function(e, t, n, r, a) {
    var o, s, l = t || n;
    if (l) {
     if (!f.hasOwnProperty(l)) throw new ReferenceError("Undefined property " + e);
     return t ? (o = u[g], b[++g] = ++m, s = "(?<" + (o || l) + ">") : s = "(?:", c = m, 
     s + f[l].pattern.replace(i, function(e, t, n) {
      if (t) {
       if (o = f[l].names[m - c], ++m, o) return "(?<" + o + ">";
      } else if (n) return "\\" + (+n + c);
      return e;
     }) + ")";
    }
    if (r) {
     if (o = u[g], b[++g] = ++m, o) return "(?<" + o + ">";
    } else if (a) return "\\" + b[+a];
    return e;
   }), e(o, l);
  };
 }(e), function(e) {
  function t(e, t, n, r) {
   return {
    name: e,
    value: t,
    start: n,
    end: r
   };
  }
  e.matchRecursive = function(n, r, i, a, o) {
   a = a || "", o = o || {};
   var s, l, c, u, d, p = a.indexOf("g") > -1, h = a.indexOf("y") > -1, f = a.replace(/y/g, ""), m = o.escapeChar, g = o.valueNames, b = [], v = 0, y = 0, x = 0, w = 0;
   if (r = e(r, f), i = e(i, f), m) {
    if (m.length > 1) throw new Error("Cannot use more than one escape character");
    m = e.escape(m), d = new RegExp("(?:" + m + "[\\S\\s]|(?:(?!" + e.union([ r, i ]).source + ")[^" + m + "])+)+", a.replace(/[^im]+/g, ""));
   }
   for (;;) {
    if (m && (x += (e.exec(n, d, x, "sticky") || [ "" ])[0].length), c = e.exec(n, r, x), 
    u = e.exec(n, i, x), c && u && (c.index <= u.index ? u = null : c = null), c || u) y = (c || u).index, 
    x = y + (c || u)[0].length; else if (!v) break;
    if (h && !v && y > w) break;
    if (c) v || (s = y, l = x), ++v; else {
     if (!u || !v) throw new Error("Unbalanced delimiter found in string");
     if (!--v && (g ? (g[0] && s > w && b.push(t(g[0], n.slice(w, s), w, s)), g[1] && b.push(t(g[1], n.slice(s, l), s, l)), 
     g[2] && b.push(t(g[2], n.slice(l, y), l, y)), g[3] && b.push(t(g[3], n.slice(y, x), y, x))) : b.push(n.slice(l, y)), 
     w = x, !p)) break;
    }
    y === x && ++x;
   }
   return p && !h && g && g[0] && n.length > w && b.push(t(g[0], n.slice(w), w, n.length)), 
   b;
  };
 }(e), function(e) {
  function t(e) {
   return e.replace(/[- _]+/g, "").toLowerCase();
  }
  function n(e) {
   for (;e.length < 4; ) e = "0" + e;
   return e;
  }
  function r(e) {
   return parseInt(e, 16);
  }
  function i(e) {
   return parseInt(e, 10).toString(16);
  }
  function a(e) {
   var t = /^\\[xu](.+)/.exec(e);
   return t ? r(t[1]) : e.charCodeAt("\\" === e.charAt(0) ? 1 : 0);
  }
  function o(t) {
   var r, o = "", s = -1;
   return e.forEach(t, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, function(e) {
    r = a(e[1]), r > s + 1 && (o += "\\u" + n(i(s + 1)), r > s + 2 && (o += "-\\u" + n(i(r - 1)))), 
    s = a(e[2] || e[1]);
   }), 65535 > s && (o += "\\u" + n(i(s + 1)), 65534 > s && (o += "-\\uFFFF")), o;
  }
  function s(e) {
   var t = "b!";
   return u[e][t] || (u[e][t] = o(u[e].bmp));
  }
  function l(e, t) {
   var n = u[e], r = "";
   return n.bmp && !n.isBmpLast && (r = "[" + n.bmp + "]" + (n.astral ? "|" : "")), 
   n.astral && (r += n.astral), n.isBmpLast && n.bmp && (r += (n.astral ? "|" : "") + "[" + n.bmp + "]"), 
   t ? "(?:(?!" + r + ")(?:[�-�][�-�]|[\x00-￿]))" : "(?:" + r + ")";
  }
  function c(e, t) {
   var n = t ? "a!" : "a=";
   return u[e][n] || (u[e][n] = l(e, t));
  }
  var u = {};
  e.addToken(/\\([pP])(?:{(\^?)([^}]*)}|([A-Za-z]))/, function(n, r, i) {
   var a = "Invalid double negation ", o = "Unknown Unicode token ", l = "Unicode token missing data ", d = "Astral mode required for Unicode token ", p = "Astral mode does not support Unicode tokens within character classes", h = "P" === n[1] || !!n[2], f = i.indexOf("A") > -1 || e.isInstalled("astral"), m = t(n[4] || n[3]), g = u[m];
   if ("P" === n[1] && n[2]) throw new SyntaxError(a + n[0]);
   if (!u.hasOwnProperty(m)) throw new SyntaxError(o + n[0]);
   if (g.inverseOf) {
    if (m = t(g.inverseOf), !u.hasOwnProperty(m)) throw new ReferenceError(l + n[0] + " -> " + g.inverseOf);
    g = u[m], h = !h;
   }
   if (!g.bmp && !f) throw new SyntaxError(d + n[0]);
   if (f) {
    if ("class" === r) throw new SyntaxError(p);
    return c(m, h);
   }
   return "class" === r ? h ? s(m) : g.bmp : (h ? "[^" : "[") + g.bmp + "]";
  }, {
   scope: "all",
   optionalFlags: "A"
  }), e.addUnicodeData = function(n) {
   var r, i, a = "Unicode token requires name", o = "Unicode token has no character data ";
   for (i = 0; i < n.length; ++i) {
    if (r = n[i], !r.name) throw new Error(a);
    if (!(r.inverseOf || r.bmp || r.astral)) throw new Error(o + r.name);
    u[t(r.name)] = r, r.alias && (u[t(r.alias)] = r);
   }
   e.cache.flush("patterns");
  }, e.addUnicodeData([ {
   name: "L",
   alias: "Letter",
   bmp: "A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
   astral: "�[�-���-�����-��-��-��-�����-��-��-��-��-��-��-�]|�[�-�]|�[�-��-��-����-��-��-��-��-��-��-��-��-��-��-�]|�[�-�]|�[�-��-��-��-��-��-�]|�[�-�]|�[�-��-�]|�[�-�]|�[�-�]|�[�-�]|�[�-�]|�[�-���-�]|�[�-��-�]|�[��]|[��-��-�][�-�]|�[�-��-������-��-��������-�������������-��-��-��-���-��-��-��-��-�]|�[�-��-�������-��-���-��-��-��-��-��-��-��-���-��-��-��-��-��-��-��-��-��-��-��-��-�]|�[�-�]"
  } ]);
 }(e), function(e) {
  if (!e.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Blocks");
  e.addUnicodeData([ {
   name: "InAegean_Numbers",
   astral: "�[�-�]"
  }, {
   name: "InAlchemical_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InAlphabetic_Presentation_Forms",
   bmp: "ﬀ-ﭏ"
  }, {
   name: "InAncient_Greek_Musical_Notation",
   astral: "�[�-�]"
  }, {
   name: "InAncient_Greek_Numbers",
   astral: "�[�-�]"
  }, {
   name: "InAncient_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InArabic",
   bmp: "؀-ۿ"
  }, {
   name: "InArabic_Extended_A",
   bmp: "ࢠ-ࣿ"
  }, {
   name: "InArabic_Mathematical_Alphabetic_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InArabic_Presentation_Forms_A",
   bmp: "ﭐ-﷿"
  }, {
   name: "InArabic_Presentation_Forms_B",
   bmp: "ﹰ-﻿"
  }, {
   name: "InArabic_Supplement",
   bmp: "ݐ-ݿ"
  }, {
   name: "InArmenian",
   bmp: "԰-֏"
  }, {
   name: "InArrows",
   bmp: "←-⇿"
  }, {
   name: "InAvestan",
   astral: "�[�-�]"
  }, {
   name: "InBalinese",
   bmp: "ᬀ-᭿"
  }, {
   name: "InBamum",
   bmp: "ꚠ-꛿"
  }, {
   name: "InBamum_Supplement",
   astral: "�[�-�]"
  }, {
   name: "InBasic_Latin",
   bmp: "\x00-"
  }, {
   name: "InBatak",
   bmp: "ᯀ-᯿"
  }, {
   name: "InBengali",
   bmp: "ঀ-৿"
  }, {
   name: "InBlock_Elements",
   bmp: "▀-▟"
  }, {
   name: "InBopomofo",
   bmp: "㄀-ㄯ"
  }, {
   name: "InBopomofo_Extended",
   bmp: "ㆠ-ㆿ"
  }, {
   name: "InBox_Drawing",
   bmp: "─-╿"
  }, {
   name: "InBrahmi",
   astral: "�[�-�]"
  }, {
   name: "InBraille_Patterns",
   bmp: "⠀-⣿"
  }, {
   name: "InBuginese",
   bmp: "ᨀ-᨟"
  }, {
   name: "InBuhid",
   bmp: "ᝀ-᝟"
  }, {
   name: "InByzantine_Musical_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InCJK_Compatibility",
   bmp: "㌀-㏿"
  }, {
   name: "InCJK_Compatibility_Forms",
   bmp: "︰-﹏"
  }, {
   name: "InCJK_Compatibility_Ideographs",
   bmp: "豈-﫿"
  }, {
   name: "InCJK_Compatibility_Ideographs_Supplement",
   astral: "�[�-�]"
  }, {
   name: "InCJK_Radicals_Supplement",
   bmp: "⺀-⻿"
  }, {
   name: "InCJK_Strokes",
   bmp: "㇀-㇯"
  }, {
   name: "InCJK_Symbols_and_Punctuation",
   bmp: "　-〿"
  }, {
   name: "InCJK_Unified_Ideographs",
   bmp: "一-鿿"
  }, {
   name: "InCJK_Unified_Ideographs_Extension_A",
   bmp: "㐀-䶿"
  }, {
   name: "InCJK_Unified_Ideographs_Extension_B",
   astral: "[�-�][�-�]|�[�-�]"
  }, {
   name: "InCJK_Unified_Ideographs_Extension_C",
   astral: "�[�-�]|[�-�][�-�]|�[�-�]"
  }, {
   name: "InCJK_Unified_Ideographs_Extension_D",
   astral: "�[�-�]|�[�-�]"
  }, {
   name: "InCarian",
   astral: "�[�-�]"
  }, {
   name: "InChakma",
   astral: "�[�-�]"
  }, {
   name: "InCham",
   bmp: "ꨀ-꩟"
  }, {
   name: "InCherokee",
   bmp: "Ꭰ-᏿"
  }, {
   name: "InCombining_Diacritical_Marks",
   bmp: "̀-ͯ"
  }, {
   name: "InCombining_Diacritical_Marks_Supplement",
   bmp: "᷀-᷿"
  }, {
   name: "InCombining_Diacritical_Marks_for_Symbols",
   bmp: "⃐-⃿"
  }, {
   name: "InCombining_Half_Marks",
   bmp: "︠-︯"
  }, {
   name: "InCommon_Indic_Number_Forms",
   bmp: "꠰-꠿"
  }, {
   name: "InControl_Pictures",
   bmp: "␀-␿"
  }, {
   name: "InCoptic",
   bmp: "Ⲁ-⳿"
  }, {
   name: "InCounting_Rod_Numerals",
   astral: "�[�-�]"
  }, {
   name: "InCuneiform",
   astral: "�[�-�]"
  }, {
   name: "InCuneiform_Numbers_and_Punctuation",
   astral: "�[�-�]"
  }, {
   name: "InCurrency_Symbols",
   bmp: "₠-⃏"
  }, {
   name: "InCypriot_Syllabary",
   astral: "�[�-�]"
  }, {
   name: "InCyrillic",
   bmp: "Ѐ-ӿ"
  }, {
   name: "InCyrillic_Extended_A",
   bmp: "ⷠ-ⷿ"
  }, {
   name: "InCyrillic_Extended_B",
   bmp: "Ꙁ-ꚟ"
  }, {
   name: "InCyrillic_Supplement",
   bmp: "Ԁ-ԯ"
  }, {
   name: "InDeseret",
   astral: "�[�-�]"
  }, {
   name: "InDevanagari",
   bmp: "ऀ-ॿ"
  }, {
   name: "InDevanagari_Extended",
   bmp: "꣠-ꣿ"
  }, {
   name: "InDingbats",
   bmp: "✀-➿"
  }, {
   name: "InDomino_Tiles",
   astral: "�[�-�]"
  }, {
   name: "InEgyptian_Hieroglyphs",
   astral: "�[�-�]|�[�-�]"
  }, {
   name: "InEmoticons",
   astral: "�[�-�]"
  }, {
   name: "InEnclosed_Alphanumeric_Supplement",
   astral: "�[�-�]"
  }, {
   name: "InEnclosed_Alphanumerics",
   bmp: "①-⓿"
  }, {
   name: "InEnclosed_CJK_Letters_and_Months",
   bmp: "㈀-㋿"
  }, {
   name: "InEnclosed_Ideographic_Supplement",
   astral: "�[�-�]"
  }, {
   name: "InEthiopic",
   bmp: "ሀ-፿"
  }, {
   name: "InEthiopic_Extended",
   bmp: "ⶀ-⷟"
  }, {
   name: "InEthiopic_Extended_A",
   bmp: "꬀-꬯"
  }, {
   name: "InEthiopic_Supplement",
   bmp: "ᎀ-᎟"
  }, {
   name: "InGeneral_Punctuation",
   bmp: " -⁯"
  }, {
   name: "InGeometric_Shapes",
   bmp: "■-◿"
  }, {
   name: "InGeorgian",
   bmp: "Ⴀ-ჿ"
  }, {
   name: "InGeorgian_Supplement",
   bmp: "ⴀ-⴯"
  }, {
   name: "InGlagolitic",
   bmp: "Ⰰ-ⱟ"
  }, {
   name: "InGothic",
   astral: "�[�-�]"
  }, {
   name: "InGreek_Extended",
   bmp: "ἀ-῿"
  }, {
   name: "InGreek_and_Coptic",
   bmp: "Ͱ-Ͽ"
  }, {
   name: "InGujarati",
   bmp: "઀-૿"
  }, {
   name: "InGurmukhi",
   bmp: "਀-੿"
  }, {
   name: "InHalfwidth_and_Fullwidth_Forms",
   bmp: "＀-￯"
  }, {
   name: "InHangul_Compatibility_Jamo",
   bmp: "㄰-㆏"
  }, {
   name: "InHangul_Jamo",
   bmp: "ᄀ-ᇿ"
  }, {
   name: "InHangul_Jamo_Extended_A",
   bmp: "ꥠ-꥿"
  }, {
   name: "InHangul_Jamo_Extended_B",
   bmp: "ힰ-퟿"
  }, {
   name: "InHangul_Syllables",
   bmp: "가-힯"
  }, {
   name: "InHanunoo",
   bmp: "ᜠ-᜿"
  }, {
   name: "InHebrew",
   bmp: "֐-׿"
  }, {
   name: "InHigh_Private_Use_Surrogates",
   bmp: "�-�"
  }, {
   name: "InHigh_Surrogates",
   bmp: "�-�"
  }, {
   name: "InHiragana",
   bmp: "぀-ゟ"
  }, {
   name: "InIPA_Extensions",
   bmp: "ɐ-ʯ"
  }, {
   name: "InIdeographic_Description_Characters",
   bmp: "⿰-⿿"
  }, {
   name: "InImperial_Aramaic",
   astral: "�[�-�]"
  }, {
   name: "InInscriptional_Pahlavi",
   astral: "�[�-�]"
  }, {
   name: "InInscriptional_Parthian",
   astral: "�[�-�]"
  }, {
   name: "InJavanese",
   bmp: "ꦀ-꧟"
  }, {
   name: "InKaithi",
   astral: "�[�-�]"
  }, {
   name: "InKana_Supplement",
   astral: "�[�-�]"
  }, {
   name: "InKanbun",
   bmp: "㆐-㆟"
  }, {
   name: "InKangxi_Radicals",
   bmp: "⼀-⿟"
  }, {
   name: "InKannada",
   bmp: "ಀ-೿"
  }, {
   name: "InKatakana",
   bmp: "゠-ヿ"
  }, {
   name: "InKatakana_Phonetic_Extensions",
   bmp: "ㇰ-ㇿ"
  }, {
   name: "InKayah_Li",
   bmp: "꤀-꤯"
  }, {
   name: "InKharoshthi",
   astral: "�[�-�]"
  }, {
   name: "InKhmer",
   bmp: "ក-៿"
  }, {
   name: "InKhmer_Symbols",
   bmp: "᧠-᧿"
  }, {
   name: "InLao",
   bmp: "຀-໿"
  }, {
   name: "InLatin_Extended_Additional",
   bmp: "Ḁ-ỿ"
  }, {
   name: "InLatin_Extended_A",
   bmp: "Ā-ſ"
  }, {
   name: "InLatin_Extended_B",
   bmp: "ƀ-ɏ"
  }, {
   name: "InLatin_Extended_C",
   bmp: "Ⱡ-Ɀ"
  }, {
   name: "InLatin_Extended_D",
   bmp: "꜠-ꟿ"
  }, {
   name: "InLatin_1_Supplement",
   bmp: "-ÿ"
  }, {
   name: "InLepcha",
   bmp: "ᰀ-ᱏ"
  }, {
   name: "InLetterlike_Symbols",
   bmp: "℀-⅏"
  }, {
   name: "InLimbu",
   bmp: "ᤀ-᥏"
  }, {
   name: "InLinear_B_Ideograms",
   astral: "�[�-�]"
  }, {
   name: "InLinear_B_Syllabary",
   astral: "�[�-�]"
  }, {
   name: "InLisu",
   bmp: "ꓐ-꓿"
  }, {
   name: "InLow_Surrogates",
   bmp: "�-�"
  }, {
   name: "InLycian",
   astral: "�[�-�]"
  }, {
   name: "InLydian",
   astral: "�[�-�]"
  }, {
   name: "InMahjong_Tiles",
   astral: "�[�-�]"
  }, {
   name: "InMalayalam",
   bmp: "ഀ-ൿ"
  }, {
   name: "InMandaic",
   bmp: "ࡀ-࡟"
  }, {
   name: "InMathematical_Alphanumeric_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InMathematical_Operators",
   bmp: "∀-⋿"
  }, {
   name: "InMeetei_Mayek",
   bmp: "ꯀ-꯿"
  }, {
   name: "InMeetei_Mayek_Extensions",
   bmp: "ꫠ-꫿"
  }, {
   name: "InMeroitic_Cursive",
   astral: "�[�-�]"
  }, {
   name: "InMeroitic_Hieroglyphs",
   astral: "�[�-�]"
  }, {
   name: "InMiao",
   astral: "�[�-�]"
  }, {
   name: "InMiscellaneous_Mathematical_Symbols_A",
   bmp: "⟀-⟯"
  }, {
   name: "InMiscellaneous_Mathematical_Symbols_B",
   bmp: "⦀-⧿"
  }, {
   name: "InMiscellaneous_Symbols",
   bmp: "☀-⛿"
  }, {
   name: "InMiscellaneous_Symbols_And_Pictographs",
   astral: "�[�-�]|�[�-�]"
  }, {
   name: "InMiscellaneous_Symbols_and_Arrows",
   bmp: "⬀-⯿"
  }, {
   name: "InMiscellaneous_Technical",
   bmp: "⌀-⏿"
  }, {
   name: "InModifier_Tone_Letters",
   bmp: "꜀-ꜟ"
  }, {
   name: "InMongolian",
   bmp: "᠀-᢯"
  }, {
   name: "InMusical_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InMyanmar",
   bmp: "က-႟"
  }, {
   name: "InMyanmar_Extended_A",
   bmp: "ꩠ-ꩿ"
  }, {
   name: "InNKo",
   bmp: "߀-߿"
  }, {
   name: "InNew_Tai_Lue",
   bmp: "ᦀ-᧟"
  }, {
   name: "InNumber_Forms",
   bmp: "⅐-↏"
  }, {
   name: "InOgham",
   bmp: " -᚟"
  }, {
   name: "InOl_Chiki",
   bmp: "᱐-᱿"
  }, {
   name: "InOld_Italic",
   astral: "�[�-�]"
  }, {
   name: "InOld_Persian",
   astral: "�[�-�]"
  }, {
   name: "InOld_South_Arabian",
   astral: "�[�-�]"
  }, {
   name: "InOld_Turkic",
   astral: "�[�-�]"
  }, {
   name: "InOptical_Character_Recognition",
   bmp: "⑀-⑟"
  }, {
   name: "InOriya",
   bmp: "଀-୿"
  }, {
   name: "InOsmanya",
   astral: "�[�-�]"
  }, {
   name: "InPhags_pa",
   bmp: "ꡀ-꡿"
  }, {
   name: "InPhaistos_Disc",
   astral: "�[�-�]"
  }, {
   name: "InPhoenician",
   astral: "�[�-�]"
  }, {
   name: "InPhonetic_Extensions",
   bmp: "ᴀ-ᵿ"
  }, {
   name: "InPhonetic_Extensions_Supplement",
   bmp: "ᶀ-ᶿ"
  }, {
   name: "InPlaying_Cards",
   astral: "�[�-�]"
  }, {
   name: "InPrivate_Use_Area",
   bmp: "-"
  }, {
   name: "InRejang",
   bmp: "ꤰ-꥟"
  }, {
   name: "InRumi_Numeral_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InRunic",
   bmp: "ᚠ-᛿"
  }, {
   name: "InSamaritan",
   bmp: "ࠀ-࠿"
  }, {
   name: "InSaurashtra",
   bmp: "ꢀ-꣟"
  }, {
   name: "InSharada",
   astral: "�[�-�]"
  }, {
   name: "InShavian",
   astral: "�[�-�]"
  }, {
   name: "InSinhala",
   bmp: "඀-෿"
  }, {
   name: "InSmall_Form_Variants",
   bmp: "﹐-﹯"
  }, {
   name: "InSora_Sompeng",
   astral: "�[�-�]"
  }, {
   name: "InSpacing_Modifier_Letters",
   bmp: "ʰ-˿"
  }, {
   name: "InSpecials",
   bmp: "￰-￿"
  }, {
   name: "InSundanese",
   bmp: "ᮀ-ᮿ"
  }, {
   name: "InSundanese_Supplement",
   bmp: "᳀-᳏"
  }, {
   name: "InSuperscripts_and_Subscripts",
   bmp: "⁰-₟"
  }, {
   name: "InSupplemental_Arrows_A",
   bmp: "⟰-⟿"
  }, {
   name: "InSupplemental_Arrows_B",
   bmp: "⤀-⥿"
  }, {
   name: "InSupplemental_Mathematical_Operators",
   bmp: "⨀-⫿"
  }, {
   name: "InSupplemental_Punctuation",
   bmp: "⸀-⹿"
  }, {
   name: "InSupplementary_Private_Use_Area_A",
   astral: "[�-�][�-�]"
  }, {
   name: "InSupplementary_Private_Use_Area_B",
   astral: "[�-�][�-�]"
  }, {
   name: "InSyloti_Nagri",
   bmp: "ꠀ-꠯"
  }, {
   name: "InSyriac",
   bmp: "܀-ݏ"
  }, {
   name: "InTagalog",
   bmp: "ᜀ-ᜟ"
  }, {
   name: "InTagbanwa",
   bmp: "ᝠ-᝿"
  }, {
   name: "InTags",
   astral: "�[�-�]"
  }, {
   name: "InTai_Le",
   bmp: "ᥐ-᥿"
  }, {
   name: "InTai_Tham",
   bmp: "ᨠ-᪯"
  }, {
   name: "InTai_Viet",
   bmp: "ꪀ-꫟"
  }, {
   name: "InTai_Xuan_Jing_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InTakri",
   astral: "�[�-�]"
  }, {
   name: "InTamil",
   bmp: "஀-௿"
  }, {
   name: "InTelugu",
   bmp: "ఀ-౿"
  }, {
   name: "InThaana",
   bmp: "ހ-޿"
  }, {
   name: "InThai",
   bmp: "฀-๿"
  }, {
   name: "InTibetan",
   bmp: "ༀ-࿿"
  }, {
   name: "InTifinagh",
   bmp: "ⴰ-⵿"
  }, {
   name: "InTransport_And_Map_Symbols",
   astral: "�[�-�]"
  }, {
   name: "InUgaritic",
   astral: "�[�-�]"
  }, {
   name: "InUnified_Canadian_Aboriginal_Syllabics",
   bmp: "᐀-ᙿ"
  }, {
   name: "InUnified_Canadian_Aboriginal_Syllabics_Extended",
   bmp: "ᢰ-᣿"
  }, {
   name: "InVai",
   bmp: "ꔀ-꘿"
  }, {
   name: "InVariation_Selectors",
   bmp: "︀-️"
  }, {
   name: "InVariation_Selectors_Supplement",
   astral: "�[�-�]"
  }, {
   name: "InVedic_Extensions",
   bmp: "᳐-᳿"
  }, {
   name: "InVertical_Forms",
   bmp: "︐-︟"
  }, {
   name: "InYi_Radicals",
   bmp: "꒐-꓏"
  }, {
   name: "InYi_Syllables",
   bmp: "ꀀ-꒏"
  }, {
   name: "InYijing_Hexagram_Symbols",
   bmp: "䷀-䷿"
  } ]);
 }(e), function(e) {
  if (!e.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Categories");
  e.addUnicodeData([ {
   name: "C",
   alias: "Other",
   isBmpLast: !0,
   bmp: "\x00--­͸͹Ϳ-΃΋΍΢Ԩ-԰՗՘ՠֈ֋-֎֐׈-׏׫-ׯ׵-؅؜؝۝܎܏݋݌޲-޿߻-߿࠮࠯࠿࡜࡝࡟-࢟ࢡࢭ-ࣣࣿॸঀ঄঍঎঑঒঩঱঳-঵঺঻৅৆৉৊৏-৖৘-৛৞৤৥ৼ-਀਄਋-਎਑਒਩਱਴਷਺਻਽੃-੆੉੊੎-੐੒-੘੝੟-੥੶-઀઄઎઒઩઱઴઺઻૆૊૎૏૑-૟૤૥૲-଀଄଍଎଑଒଩଱଴଺଻୅୆୉୊୎-୕୘-୛୞୤୥୸-஁஄஋-஍஑஖-஘஛஝஠-஢஥-஧஫-஭஺-஽௃-௅௉௎௏௑-௖௘-௥௻-ఀఄ఍఑఩ఴ఺-఼౅౉౎-౔౗ౚ-౟౤౥౰-౷ಀಁ಄಍಑಩಴಺಻೅೉೎-೔೗-ೝ೟೤೥೰ೳ-ഁഄ഍഑഻഼൅൉൏-ൖ൘-ൟ൤൥൶-൸඀ඁ඄඗-඙඲඼඾඿෇-෉෋-෎෕෗෠-෱෵-฀฻-฾๜-຀຃຅ຆຉ຋ຌຎ-ຓຘຠ຤຦ຨຩຬ຺຾຿໅໇໎໏໚໛໠-໿཈཭-཰྘྽࿍࿛-࿿჆჈-჌჎჏቉቎቏቗቙቞቟኉኎኏኱኶኷኿዁዆዇዗጑጖጗፛፜፽-፿᎚-᎟Ᏽ-᏿᚝-᚟ᛱ-᛿ᜍ᜕-ᜟ᜷-᜿᝔-᝟᝭᝱᝴-᝿៞៟៪-៯៺-៿᠏᠚-᠟ᡸ-᡿᢫-᢯᣶-᣿ᤝ-᤟᤬-᤯᤼-᤿᥁-᥃᥮᥯᥵-᥿᦬-᦯᧊-᧏᧛-᧝᨜᨝᩟᩽᩾᪊-᪏᪚-᪟᪮-᫿ᭌ-᭏᭽-᭿᯴-᯻᰸-᰺᱊-᱌ᲀ-Ჿ᳈-᳏᳷-᳿ᷧ-᷻἖἗἞἟὆὇὎὏὘὚὜὞὾὿᾵῅῔῕῜῰῱῵῿​-‏‪-‮⁠-⁯⁲⁳₏₝-₟₻-⃏⃱-⃿↊-↏⏴-⏿␧-␿⑋-⑟✀⭍-⭏⭚-⯿Ⱟⱟ⳴-⳸⴦⴨-⴬⴮⴯⵨-⵮⵱-⵾⶗-⶟⶧⶯⶷⶿⷇⷏⷗⷟⸼-⹿⺚⻴-⻿⿖-⿯⿼-⿿぀゗゘㄀-㄄ㄮ-㄰㆏ㆻ-ㆿ㇤-㇯㈟㋿䶶-䶿鿍-鿿꒍-꒏꓇-꓏꘬-꘿Ꚙ-ꚞ꛸-꛿ꞏꞔ-ꞟꞫ-ꟷ꠬-꠯꠺-꠿꡸-꡿ꣅ-꣍꣚-꣟꣼-ꣿ꥔-꥞꥽-꥿꧎꧚-꧝ꧠ-꧿꨷-꨿꩎꩏꩚꩛ꩼ-ꩿ꫃-꫚꫷-꬀꬇꬈꬏꬐꬗-꬟꬧꬯-ꮿ꯮꯯꯺-꯿힤-힯퟇-퟊퟼-﩮﩯﫚-﫿﬇-﬒﬘-﬜﬷﬽﬿﭂﭅﯂-﯒﵀-﵏﶐﶑﷈-﷯﷾﷿︚-︟︧-︯﹓﹧﹬-﹯﹵﻽-＀﾿-￁￈￉￐￑￘￙￝-￟￧￯-￻￾￿",
   astral: "�[�-�]|�[�-��-�]|�[�-��-���-��-��-���-��-��-�]|�[�����-�����-��-��-��-��-��-���-����-��-��-��-��-��-����-��-�]|�[�-�]|�[�-��-��-��-�]|�[�-�]|�[�������-��-��-��-��-��-��-��-��-���-��-���-��-�]|�[�-�]|�[�-�����������-��-�����������������������-����-��-�]|�[�-�]|�[�-��-�]|�[�-��-�]|�[�-�]|[�����-��-��-��-����-��-��-�][�-�]|�[����-����-��-��-��-��-��-�]|�[�-��-�������-��-���-��-��-��-��-��-��-���-��-���-��-�]|�[���������������������-������]|�[�-�]|�[�-����-��-��-��-��-�]|�[���-�]|�[�-��-��-�]|�[�-�]"
  }, {
   name: "Cc",
   alias: "Control",
   bmp: "\x00--"
  }, {
   name: "Cf",
   alias: "Format",
   bmp: "­؀-؄۝܏​-‏‪-‮⁠-⁤⁪-⁯﻿￹-￻",
   astral: "�[��-�]|�[�-�]|𑂽"
  }, {
   name: "Cn",
   alias: "Unassigned",
   bmp: "͸͹Ϳ-΃΋΍΢Ԩ-԰՗՘ՠֈ֋-֎֐׈-׏׫-ׯ׵-׿؅؜؝܎݋݌޲-޿߻-߿࠮࠯࠿࡜࡝࡟-࢟ࢡࢭ-ࣣࣿॸঀ঄঍঎঑঒঩঱঳-঵঺঻৅৆৉৊৏-৖৘-৛৞৤৥ৼ-਀਄਋-਎਑਒਩਱਴਷਺਻਽੃-੆੉੊੎-੐੒-੘੝੟-੥੶-઀઄઎઒઩઱઴઺઻૆૊૎૏૑-૟૤૥૲-଀଄଍଎଑଒଩଱଴଺଻୅୆୉୊୎-୕୘-୛୞୤୥୸-஁஄஋-஍஑஖-஘஛஝஠-஢஥-஧஫-஭஺-஽௃-௅௉௎௏௑-௖௘-௥௻-ఀఄ఍఑఩ఴ఺-఼౅౉౎-౔౗ౚ-౟౤౥౰-౷ಀಁ಄಍಑಩಴಺಻೅೉೎-೔೗-ೝ೟೤೥೰ೳ-ഁഄ഍഑഻഼൅൉൏-ൖ൘-ൟ൤൥൶-൸඀ඁ඄඗-඙඲඼඾඿෇-෉෋-෎෕෗෠-෱෵-฀฻-฾๜-຀຃຅ຆຉ຋ຌຎ-ຓຘຠ຤຦ຨຩຬ຺຾຿໅໇໎໏໚໛໠-໿཈཭-཰྘྽࿍࿛-࿿჆჈-჌჎჏቉቎቏቗቙቞቟኉኎኏኱኶኷኿዁዆዇዗጑጖጗፛፜፽-፿᎚-᎟Ᏽ-᏿᚝-᚟ᛱ-᛿ᜍ᜕-ᜟ᜷-᜿᝔-᝟᝭᝱᝴-᝿៞៟៪-៯៺-៿᠏᠚-᠟ᡸ-᡿᢫-᢯᣶-᣿ᤝ-᤟᤬-᤯᤼-᤿᥁-᥃᥮᥯᥵-᥿᦬-᦯᧊-᧏᧛-᧝᨜᨝᩟᩽᩾᪊-᪏᪚-᪟᪮-᫿ᭌ-᭏᭽-᭿᯴-᯻᰸-᰺᱊-᱌ᲀ-Ჿ᳈-᳏᳷-᳿ᷧ-᷻἖἗἞἟὆὇὎὏὘὚὜὞὾὿᾵῅῔῕῜῰῱῵῿⁥-⁩⁲⁳₏₝-₟₻-⃏⃱-⃿↊-↏⏴-⏿␧-␿⑋-⑟✀⭍-⭏⭚-⯿Ⱟⱟ⳴-⳸⴦⴨-⴬⴮⴯⵨-⵮⵱-⵾⶗-⶟⶧⶯⶷⶿⷇⷏⷗⷟⸼-⹿⺚⻴-⻿⿖-⿯⿼-⿿぀゗゘㄀-㄄ㄮ-㄰㆏ㆻ-ㆿ㇤-㇯㈟㋿䶶-䶿鿍-鿿꒍-꒏꓇-꓏꘬-꘿Ꚙ-ꚞ꛸-꛿ꞏꞔ-ꞟꞫ-ꟷ꠬-꠯꠺-꠿꡸-꡿ꣅ-꣍꣚-꣟꣼-ꣿ꥔-꥞꥽-꥿꧎꧚-꧝ꧠ-꧿꨷-꨿꩎꩏꩚꩛ꩼ-ꩿ꫃-꫚꫷-꬀꬇꬈꬏꬐꬗-꬟꬧꬯-ꮿ꯮꯯꯺-꯿힤-힯퟇-퟊퟼-퟿﩮﩯﫚-﫿﬇-﬒﬘-﬜﬷﬽﬿﭂﭅﯂-﯒﵀-﵏﶐﶑﷈-﷯﷾﷿︚-︟︧-︯﹓﹧﹬-﹯﹵﻽﻾＀﾿-￁￈￉￐￑￘￙￝-￟￧￯-￸￾￿",
   astral: "�[�-�]|�[��-��-��-�]|�[�-����-��-��-��-�]|�[�����-�����-��-��-��-��-��-���-����-��-��-��-��-��-����-��-�]|�[�-�]|�[�-��-��-��-�]|�[�-��-�]|�[�������-��-��-��-��-��-��-��-��-���-��-���-��-�]|�[�-�]|�[�-��-��-��-��-���-��-��-�]|�[�-�����������-��-�����������������������-����-��-�]|[��][��]|�[�-�]|�[�-��-�]|�[�-�]|[�����-��-��-��-����-��-��-�][�-�]|�[����-����-��-��-��-��-��-�]|�[�-�]|�[�-��-�������-��-���-��-��-��-��-��-��-���-��-���-��-�]|�[���������������������-������]|�[�-�]|�[���-�]|�[�-��-��-�]|�[�-�]"
  }, {
   name: "Co",
   alias: "Private_Use",
   bmp: "-",
   astral: "[�-��-�][�-�]|[��][�-�]"
  }, {
   name: "Cs",
   alias: "Surrogate",
   bmp: "�-�"
  }, {
   name: "Ll",
   alias: "Lowercase_Letter",
   bmp: "a-zµß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌƍƒƕƙ-ƛƞơƣƥƨƪƫƭưƴƶƹƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜǝǟǡǣǥǧǩǫǭǯǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿɀɂɇɉɋɍɏ-ʓʕ-ʯͱͳͷͻ-ͽΐά-ώϐϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣԥԧա-ևᴀ-ᴫᵫ-ᵷᵹ-ᶚḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶᾷιῂ-ῄῆῇῐ-ΐῖῗῠ-ῧῲ-ῴῶῷℊℎℏℓℯℴℹℼℽⅆ-ⅉⅎↄⰰ-ⱞⱡⱥⱦⱨⱪⱬⱱⱳⱴⱶ-ⱻⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣⳤⳬⳮⳳⴀ-ⴥⴧⴭꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙡꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯꝱ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌꞎꞑꞓꞡꞣꞥꞧꞩꟺﬀ-ﬆﬓ-ﬗａ-ｚ",
   astral: "�[�-��-��-��-��-���-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��]|�[�-�]"
  }, {
   name: "Lm",
   alias: "Modifier_Letter",
   bmp: "ʰ-ˁˆ-ˑˠ-ˤˬˮʹͺՙـۥۦߴߵߺࠚࠤࠨॱๆໆჼៗᡃᪧᱸ-ᱽᴬ-ᵪᵸᶛ-ᶿⁱⁿₐ-ₜⱼⱽⵯⸯ々〱-〵〻ゝゞー-ヾꀕꓸ-ꓽꘌꙿꜗ-ꜟꝰꞈꟸꟹꧏꩰꫝꫳꫴｰﾞﾟ",
   astral: "�[�-�]"
  }, {
   name: "Lo",
   alias: "Other_Letter",
   bmp: "ªºƻǀ-ǃʔא-תװ-ײؠ-ؿف-يٮٯٱ-ۓەۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪࠀ-ࠕࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॲ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๅກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎა-ჺჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៜᠠ-ᡂᡄ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱷᳩ-ᳬᳮ-ᳱᳵᳶℵ-ℸⴰ-ⵧⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ〆〼ぁ-ゖゟァ-ヺヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꀔꀖ-ꒌꓐ-ꓷꔀ-ꘋꘐ-ꘟꘪꘫꙮꚠ-ꛥꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩯꩱ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛꫜꫠ-ꫪꫲꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎יִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼｦ-ｯｱ-ﾝﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
   astral: "�[�-���-�����-��-��-��-�����-��-��-��-��-��-��-�]|�[�-��-��-����-��-��-��-��-��-��-��-��-��-��-�]|�[�-�]|�[�-��-��-��-��-��-�]|�[�-�]|�[�-��-�]|�[�-�]|�[�-�]|�[�-�]|�[�-�]|�[�-��]|�[�-�]|�[��]|[��-��-�][�-�]|�[�-��-������-��-��������-�������������-��-��-��-���-��-��-��-��-�]|�[�-�]|�[�-��-�]"
  }, {
   name: "Lt",
   alias: "Titlecase_Letter",
   bmp: "ǅǈǋǲᾈ-ᾏᾘ-ᾟᾨ-ᾯᾼῌῼ"
  }, {
   name: "Lu",
   alias: "Uppercase_Letter",
   bmp: "A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԤԦԱ-ՖႠ-ჅჇჍḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾ-ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳫⳭⳲꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙠꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾꞀꞂꞄꞆꞋꞍꞐꞒꞠꞢꞤꞦꞨꞪＡ-Ｚ",
   astral: "�[�-��-��-��������-��-��-����-��-��-����-��-���-��-��-��-��-��-��-��-��-��-��-��-��]|�[�-�]"
  }, {
   name: "M",
   alias: "Mark",
   bmp: "̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఁ-ఃా-ౄె-ైొ-్ౕౖౢౣಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣംഃാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢩᤠ-ᤫᤰ-᤻ᦰ-ᧀᧈᧉᨗ-ᨛᩕ-ᩞ᩠-᩿᩼ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᷀-ᷦ᷼-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣠-꣱ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꨩ-ꨶꩃꩌꩍꩻꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︦",
   astral: "�[�-��-��-��-��-��-�]|�[�-����-��-��]|�[�-��-�]|�[�-��-��-��-��-��-��-��-�]|�[�-�]|𐇽|�[�-�]"
  }, {
   name: "Mc",
   alias: "Spacing_Mark",
   bmp: "ःऻा-ीॉ-ौॎॏংঃা-ীেৈোৌৗਃਾ-ੀઃા-ીૉોૌଂଃାୀେୈୋୌୗாிுூெ-ைொ-ௌௗఁ-ఃు-ౄಂಃಾೀ-ೄೇೈೊೋೕೖംഃാ-ീെ-ൈൊ-ൌൗංඃා-ෑෘ-ෟෲෳ༾༿ཿါာေးျြၖၗၢ-ၤၧ-ၭႃႄႇ-ႌႏႚ-ႜាើ-ៅះៈᤣ-ᤦᤩ-ᤫᤰᤱᤳ-ᤸᦰ-ᧀᧈᧉᨙ-ᨛᩕᩗᩡᩣᩤᩭ-ᩲᬄᬵᬻᬽ-ᭁᭃ᭄ᮂᮡᮦᮧ᮪ᮬᮭᯧᯪ-ᯬᯮ᯲᯳ᰤ-ᰫᰴᰵ᳡ᳲᳳ〮〯ꠣꠤꠧꢀꢁꢴ-ꣃꥒ꥓ꦃꦴꦵꦺꦻꦽ-꧀ꨯꨰꨳꨴꩍꩻꫫꫮꫯꫵꯣꯤꯦꯧꯩꯪ꯬",
   astral: "�[���-�]|�[����-������-���]|�[����]|�[�-�]"
  }, {
   name: "Me",
   alias: "Enclosing_Mark",
   bmp: "҈҉⃝-⃠⃢-⃤꙰-꙲"
  }, {
   name: "Mn",
   alias: "Nonspacing_Mark",
   bmp: "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ࣾऀ-ंऺ़ु-ै्॑-ॗॢॣঁ়ু-ৄ্ৢৣਁਂ਼ੁੂੇੈੋ-੍ੑੰੱੵઁં઼ુ-ૅેૈ્ૢૣଁ଼ିୁ-ୄ୍ୖୢୣஂீ்ా-ీె-ైొ-్ౕౖౢౣ಼ಿೆೌ್ೢೣു-ൄ്ൢൣ්ි-ුූัิ-ฺ็-๎ັິ-ູົຼ່-ໍཱ༹༘༙༵༷-ཾྀ-྄྆྇ྍ-ྗྙ-ྼ࿆ိ-ူဲ-့္်ွှၘၙၞ-ၠၱ-ၴႂႅႆႍႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴឵ិ-ួំ៉-៓៝᠋-᠍ᢩᤠ-ᤢᤧᤨᤲ᤹-᤻ᨘᨗᩖᩘ-ᩞ᩠ᩢᩥ-ᩬᩳ-᩿᩼ᬀ-ᬃ᬴ᬶ-ᬺᬼᭂ᭫-᭳ᮀᮁᮢ-ᮥᮨᮩ᯦᮫ᯨᯩᯭᯯ-ᯱᰬ-ᰳᰶ᰷᳐-᳔᳒-᳢᳠-᳨᳭᳴᷀-ᷦ᷼-᷿⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〭꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠥꠦ꣄꣠-꣱ꤦ-꤭ꥇ-ꥑꦀ-ꦂ꦳ꦶ-ꦹꦼꨩ-ꨮꨱꨲꨵꨶꩃꩌꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫬꫭ꫶ꯥꯨ꯭ﬞ︀-️︠-︦",
   astral: "�[�-����-��-��]|�[�-��-��-��-��-�]|�[�-�]|�[���-��]|�[��-����-����-��-��-����-�]|𐇽|�[�-�]"
  }, {
   name: "N",
   alias: "Number",
   bmp: "0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൦-൵๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９",
   astral: "�[�-��-��-����-��-�]|�[�-�]|�[�-�]|�[�-�]|�[�-��-���-����-�]|�[�-�]|�[�-�]|�[�-�]|�[�-�]|�[�-��-��-��-�]"
  }, {
   name: "Nd",
   alias: "Decimal_Number",
   bmp: "0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９",
   astral: "�[�-��-��-��-�]|�[�-�]|�[�-�]|�[�-�]"
  }, {
   name: "Nl",
   alias: "Letter_Number",
   bmp: "ᛮ-ᛰⅠ-ↂↅ-ↈ〇〡-〩〸-〺ꛦ-ꛯ",
   astral: "�[�-����-�]|�[�-�]"
  }, {
   name: "No",
   alias: "Other_Number",
   bmp: "²³¹¼-¾৴-৹୲-୷௰-௲౸-౾൰-൵༪-༳፩-፼៰-៹᧚⁰⁴-⁹₀-₉⅐-⅟↉①-⒛⓪-⓿❶-➓⳽㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꠰-꠵",
   astral: "�[�-��-��-����-��-�]|�[�-�]|�[�-�]|�[�-��-���-�]|�[�-�]|�[�-�]"
  }, {
   name: "P",
   alias: "Punctuation",
   bmp: "!-#%-\\x2A,-/:;\\x3F@\\x5B-\\x5D_\\x7B}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⸻、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･",
   astral: "�[�-�]|�[����-���-�]|�[�-���]|�[�-����-��-��-�]"
  }, {
   name: "Pc",
   alias: "Connector_Punctuation",
   bmp: "_‿⁀⁔︳︴﹍-﹏＿"
  }, {
   name: "Pd",
   alias: "Dash_Punctuation",
   bmp: "\\x2D֊־᐀᠆‐-―⸗⸚⸺⸻〜〰゠︱︲﹘﹣－"
  }, {
   name: "Pe",
   alias: "Close_Punctuation",
   bmp: "\\x29\\x5D}༻༽᚜⁆⁾₎〉❩❫❭❯❱❳❵⟆⟧⟩⟫⟭⟯⦄⦆⦈⦊⦌⦎⦐⦒⦔⦖⦘⧙⧛⧽⸣⸥⸧⸩〉》」』】〕〗〙〛〞〟﴿︘︶︸︺︼︾﹀﹂﹄﹈﹚﹜﹞）］｝｠｣"
  }, {
   name: "Pf",
   alias: "Final_Punctuation",
   bmp: "»’”›⸃⸅⸊⸍⸝⸡"
  }, {
   name: "Pi",
   alias: "Initial_Punctuation",
   bmp: "«‘‛“‟‹⸂⸄⸉⸌⸜⸠"
  }, {
   name: "Po",
   alias: "Other_Punctuation",
   bmp: "!-#%-'\\x2A,\\x2E/:;\\x3F@\\x5C¡§¶·¿;·՚-՟։׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔྅࿐-࿔࿙࿚၊-၏჻፠-፨᙭᙮᛫-᛭᜵᜶។-៖៘-៚᠀-᠅᠇-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‖‗†-‧‰-‸※-‾⁁-⁃⁇-⁑⁓⁕-⁞⳹-⳼⳾⳿⵰⸀⸁⸆-⸈⸋⸎-⸖⸘⸙⸛⸞⸟⸪-⸮⸰-⸹、-〃〽・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫︐-︖︙︰﹅﹆﹉-﹌﹐-﹒﹔-﹗﹟-﹡﹨﹪﹫！-＃％-＇＊，．／：；？＠＼｡､･",
   astral: "�[�-�]|�[����-���-�]|�[�-���]|�[�-����-��-��-�]"
  }, {
   name: "Ps",
   alias: "Open_Punctuation",
   bmp: "\\x28\\x5B\\x7B༺༼᚛‚„⁅⁽₍〈❨❪❬❮❰❲❴⟅⟦⟨⟪⟬⟮⦃⦅⦇⦉⦋⦍⦏⦑⦓⦕⦗⧘⧚⧼⸢⸤⸦⸨〈《「『【〔〖〘〚〝﴾︗︵︷︹︻︽︿﹁﹃﹇﹙﹛﹝（［｛｟｢"
  }, {
   name: "S",
   alias: "Symbol",
   bmp: "\\x24\\x2B<->\\x5E`\\x7C~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֏؆-؈؋؎؏۞۩۽۾߶৲৳৺৻૱୰௳-௺౿൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₺℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏←-⌨⌫-⏳␀-␦⑀-⑊⒜-ⓩ─-⛿✁-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭌⭐-⭙⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�",
   astral: "�[�-���-��-��-��-��-��-��-��-��-�]|�[����������]|�[�-��-��-��-��-��-��-��-��-��-��-��-����-��-��-��-��-��-��-�]|�[�-��-��-��-����-��-��-���-�]|�[�-��-��-��-�]|�[��]"
  }, {
   name: "Sc",
   alias: "Currency_Symbol",
   bmp: "\\x24¢-¥֏؋৲৳৻૱௹฿៛₠-₺꠸﷼﹩＄￠￡￥￦"
  }, {
   name: "Sk",
   alias: "Modifier_Symbol",
   bmp: "\\x5E`¨¯´¸˂-˅˒-˟˥-˫˭˯-˿͵΄΅᾽᾿-῁῍-῏῝-῟῭-`´῾゛゜꜀-꜖꜠꜡꞉꞊﮲-﯁＾｀￣"
  }, {
   name: "Sm",
   alias: "Math_Symbol",
   bmp: "\\x2B<->\\x7C~¬±×÷϶؆-؈⁄⁒⁺-⁼₊-₌℘⅀-⅄⅋←-↔↚↛↠↣↦↮⇎⇏⇒⇔⇴-⋿⌈-⌋⌠⌡⍼⎛-⎳⏜-⏡▷◁◸-◿♯⟀-⟄⟇-⟥⟰-⟿⤀-⦂⦙-⧗⧜-⧻⧾-⫿⬰-⭄⭇-⭌﬩﹢﹤-﹦＋＜-＞｜～￢￩-￬",
   astral: "�[��]|�[����������]"
  }, {
   name: "So",
   alias: "Other_Symbol",
   bmp: "¦©®°҂؎؏۞۩۽۾߶৺୰௳-௸௺౿൹༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙᥀᧞-᧿᭡-᭪᭴-᭼℀℁℃-℆℈℉℔№℗℞-℣℥℧℩℮℺℻⅊⅌⅍⅏↕-↙↜-↟↡↢↤↥↧-↭↯-⇍⇐⇑⇓⇕-⇳⌀-⌇⌌-⌟⌢-⌨⌫-⍻⍽-⎚⎴-⏛⏢-⏳␀-␦⑀-⑊⒜-ⓩ─-▶▸-◀◂-◷☀-♮♰-⛿✁-❧➔-➿⠀-⣿⬀-⬯⭅⭆⭐-⭙⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꠨-꠫꠶꠷꠹꩷-꩹﷽￤￨￭￮￼�",
   astral: "�[�-���-��-��-��-��-��-��-��-��-�]|�[�-��-��-��-����-��-��-���-�]|�[�-��-��-��-��-��-��-��-��-��-��-��-����-��-��-��-��-��-��-�]|�[�-��-��-��-�]"
  }, {
   name: "Z",
   alias: "Separator",
   bmp: "   ᠎ - \u2028\u2029  　"
  }, {
   name: "Zl",
   alias: "Line_Separator",
   bmp: "\u2028"
  }, {
   name: "Zp",
   alias: "Paragraph_Separator",
   bmp: "\u2029"
  }, {
   name: "Zs",
   alias: "Space_Separator",
   bmp: "   ᠎ -   　"
  } ]);
 }(e), function(e) {
  if (!e.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Properties");
  e.addUnicodeData([ {
   name: "ASCII",
   bmp: "\x00-"
  }, {
   name: "Alphabetic",
   bmp: "A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͅͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևְ-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-ٗٙ-ٟٮ-ۓە-ۜۡ-ۭۨ-ۯۺ-ۼۿܐ-ܿݍ-ޱߊ-ߪߴߵߺࠀ-ࠗࠚ-ࠬࡀ-ࡘࢠࢢ-ࢬࣤ-ࣰࣩ-ࣾऀ-ऻऽ-ौॎ-ॐॕ-ॣॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হঽ-ৄেৈোৌৎৗড়ঢ়য়-ৣৰৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਾ-ੂੇੈੋੌੑਖ਼-ੜਫ਼ੰ-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽ-ૅે-ૉોૌૐૠ-ૣଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽ-ୄେୈୋୌୖୗଡ଼ଢ଼ୟ-ୣୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-ௌௐௗఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-ౌౕౖౘౙౠ-ౣಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ-ೄೆ-ೈೊ-ೌೕೖೞೠ-ೣೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൌൎൗൠ-ൣൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆා-ුූෘ-ෟෲෳก-ฺเ-ๆํກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆໍໜ-ໟༀཀ-ཇཉ-ཬཱ-ཱྀྈ-ྗྙ-ྼက-ံးျ-ဿၐ-ၢၥ-ၨၮ-ႆႎႜႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜓᜠ-ᜳᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-ឳា-ៈៗៜᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-ᤸᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨛᨠ-ᩞᩡ-ᩴᪧᬀ-ᬳᬵ-ᭃᭅ-ᭋᮀ-ᮩᮬ-ᮯᮺ-ᯥᯧ-ᯱᰀ-ᰵᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳳᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⒶ-ⓩⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙴ-ꙻꙿ-ꚗꚟ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠧꡀ-ꡳꢀ-ꣃꣲ-ꣷꣻꤊ-ꤪꤰ-ꥒꥠ-ꥼꦀ-ꦲꦴ-ꦿꧏꨀ-ꨶꩀ-ꩍꩠ-ꩶꩺꪀ-ꪾꫀꫂꫛ-ꫝꫠ-ꫯꫲ-ꫵꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
   astral: "�[�-�]|�[�-�]|�[�-�]|�[�-�]|�[�-��-��-��-��-��-�]|[��-��-�][�-�]|�[�-�]|�[�-��-�]|�[�-�]|�[�-�]|�[�-���-�����-��-��-��-����-����-��-��-��-��-��-��-�]|�[�-��-��-����-��-��-��-��-��-��-��-��-��-��-��-�]|�[�-��-��-�]|�[�-��-�������-��-���-��-��-��-��-��-��-��-���-��-��-��-��-��-��-��-��-��-��-��-��-�]|�[�-��-������-��-��������-�������������-��-��-��-���-��-��-��-��-�]|�[�-��-�]|�[��]|�[�-�]|�[�-�]"
  }, {
   name: "Any",
   isBmpLast: !0,
   bmp: "\x00-￿",
   astral: "[�-�][�-�]"
  }, {
   name: "Assigned",
   inverseOf: "Cn"
  }, {
   name: "Default_Ignorable_Code_Point",
   bmp: "­͏ᅟᅠ឴឵᠋-᠍​-‏‪-‮⁠-⁯ㅤ︀-️﻿ﾠ￰-￸",
   astral: "[�-�][�-�]|�[�-�]"
  }, {
   name: "Lowercase",
   bmp: "a-zªµºß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌƍƒƕƙ-ƛƞơƣƥƨƪƫƭưƴƶƹƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜǝǟǡǣǥǧǩǫǭǯǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿɀɂɇɉɋɍɏ-ʓʕ-ʸˀˁˠ-ˤͅͱͳͷͺ-ͽΐά-ώϐϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣԥԧա-ևᴀ-ᶿḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶᾷιῂ-ῄῆῇῐ-ΐῖῗῠ-ῧῲ-ῴῶῷⁱⁿₐ-ₜℊℎℏℓℯℴℹℼℽⅆ-ⅉⅎⅰ-ⅿↄⓐ-ⓩⰰ-ⱞⱡⱥⱦⱨⱪⱬⱱⱳⱴⱶ-ⱽⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣⳤⳬⳮⳳⴀ-ⴥⴧⴭꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙡꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌꞎꞑꞓꞡꞣꞥꞧꞩꟸ-ꟺﬀ-ﬆﬓ-ﬗａ-ｚ",
   astral: "�[�-��-��-��-��-���-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��-��]|�[�-�]"
  }, {
   name: "Noncharacter_Code_Point",
   bmp: "﷐-﷯￾￿",
   astral: "[����������������][��]"
  }, {
   name: "Uppercase",
   bmp: "A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԤԦԱ-ՖႠ-ჅჇჍḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾℿⅅⅠ-ⅯↃⒶ-ⓏⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾ-ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳫⳭⳲꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙠꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾꞀꞂꞄꞆꞋꞍꞐꞒꞠꞢꞤꞦꞨꞪＡ-Ｚ",
   astral: "�[�-��-��-��������-��-��-����-��-��-����-��-���-��-��-��-��-��-��-��-��-��-��-��-��]|�[�-�]"
  }, {
   name: "White_Space",
   bmp: "	-\r   ᠎ - \u2028\u2029  　"
  } ]);
 }(e), function(e) {
  if (!e.addUnicodeData) throw new ReferenceError("Unicode Base must be loaded before Unicode Scripts");
  e.addUnicodeData([ {
   name: "Arabic",
   bmp: "؀-؄؆-؋؍-ؚ؞ؠ-ؿف-يٖ-ٟ٪-ٯٱ-ۜ۞-ۿݐ-ݿࢠࢢ-ࢬࣤ-ࣾﭐ-﯁ﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-﷼ﹰ-ﹴﹶ-ﻼ",
   astral: "�[�-�]|�[�-��-������-��-��������-�������������-��-��-��-���-��-��-��-��-���]"
  }, {
   name: "Armenian",
   bmp: "Ա-Ֆՙ-՟ա-և֊֏ﬓ-ﬗ"
  }, {
   name: "Avestan",
   astral: "�[�-��-�]"
  }, {
   name: "Balinese",
   bmp: "ᬀ-ᭋ᭐-᭼"
  }, {
   name: "Bamum",
   bmp: "ꚠ-꛷",
   astral: "�[�-�]"
  }, {
   name: "Batak",
   bmp: "ᯀ-᯳᯼-᯿"
  }, {
   name: "Bengali",
   bmp: "ঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-৻"
  }, {
   name: "Bopomofo",
   bmp: "˪˫ㄅ-ㄭㆠ-ㆺ"
  }, {
   name: "Brahmi",
   astral: "�[�-��-�]"
  }, {
   name: "Braille",
   bmp: "⠀-⣿"
  }, {
   name: "Buginese",
   bmp: "ᨀ-ᨛ᨞᨟"
  }, {
   name: "Buhid",
   bmp: "ᝀ-ᝓ"
  }, {
   name: "Canadian_Aboriginal",
   bmp: "᐀-ᙿᢰ-ᣵ"
  }, {
   name: "Carian",
   astral: "�[�-�]"
  }, {
   name: "Chakma",
   astral: "�[�-��-�]"
  }, {
   name: "Cham",
   bmp: "ꨀ-ꨶꩀ-ꩍ꩐-꩙꩜-꩟"
  }, {
   name: "Cherokee",
   bmp: "Ꭰ-Ᏼ"
  }, {
   name: "Common",
   bmp: "\x00-@\\x5B-`\\x7B-©«-¹»-¿×÷ʹ-˟˥-˩ˬ-˿ʹ;΅·։،؛؟ـ٠-٩۝।॥฿࿕-࿘჻᛫-᛭᜵᜶᠂᠃᠅᳓᳡ᳩ-ᳬᳮ-ᳳᳵᳶ -​‎-⁤⁪-⁰⁴-⁾₀-₎₠-₺℀-℥℧-℩ℬ-ℱℳ-⅍⅏-⅟↉←-⏳␀-␦⑀-⑊①-⛿✁-⟿⤀-⭌⭐-⭙⸀-⸻⿰-⿻　-〄〆〈-〠〰-〷〼-〿゛゜゠・ー㆐-㆟㇀-㇣㈠-㉟㉿-㋏㍘-㏿䷀-䷿꜀-꜡ꞈ-꞊꠰-꠹﴾﴿﷽︐-︙︰-﹒﹔-﹦﹨-﹫﻿！-＠［-｀｛-･ｰﾞﾟ￠-￦￨-￮￹-�",
   astral: "�[�-��-��-��-��-�]|�[�-��-��-��-��-��-��-��-��-��-��-����-��-����-��-��-��-��-��-��-�]|�[��-�]|�[�-��-�������-��-���-��-��-��-��-��-��-��-���-��-��-��-�]|�[�-��-��-��-����-��-��-��-�]|�[�-���-��-��-��-��-��-��-��-��-�]"
  }, {
   name: "Coptic",
   bmp: "Ϣ-ϯⲀ-ⳳ⳹-⳿"
  }, {
   name: "Cuneiform",
   astral: "�[�-��-�]|�[�-�]"
  }, {
   name: "Cypriot",
   astral: "�[�-���-�����]"
  }, {
   name: "Cyrillic",
   bmp: "Ѐ-҄҇-ԧᴫᵸⷠ-ⷿꙀ-ꚗꚟ"
  }, {
   name: "Deseret",
   astral: "�[�-�]"
  }, {
   name: "Devanagari",
   bmp: "ऀ-ॐ॓-ॣ०-ॷॹ-ॿ꣠-ꣻ"
  }, {
   name: "Egyptian_Hieroglyphs",
   astral: "�[�-�]|�[�-�]"
  }, {
   name: "Ethiopic",
   bmp: "ሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፼ᎀ-᎙ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮ"
  }, {
   name: "Georgian",
   bmp: "Ⴀ-ჅჇჍა-ჺჼ-ჿⴀ-ⴥⴧⴭ"
  }, {
   name: "Glagolitic",
   bmp: "Ⰰ-Ⱞⰰ-ⱞ"
  }, {
   name: "Gothic",
   astral: "�[�-�]"
  }, {
   name: "Greek",
   bmp: "Ͱ-ͳ͵-ͷͺ-ͽ΄ΆΈ-ΊΌΎ-ΡΣ-ϡϰ-Ͽᴦ-ᴪᵝ-ᵡᵦ-ᵪᶿἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ῄῆ-ΐῖ-Ί῝-`ῲ-ῴῶ-῾Ω",
   astral: "�[�-�]|�[�-�]"
  }, {
   name: "Gujarati",
   bmp: "ઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૱"
  }, {
   name: "Gurmukhi",
   bmp: "ਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵ"
  }, {
   name: "Han",
   bmp: "⺀-⺙⺛-⻳⼀-⿕々〇〡-〩〸-〻㐀-䶵一-鿌豈-舘並-龎",
   astral: "[�-��-�][�-�]|�[�-��-�]|�[�-�]|�[�-��-�]|�[�-�]"
  }, {
   name: "Hangul",
   bmp: "ᄀ-ᇿ〮〯ㄱ-ㆎ㈀-㈞㉠-㉾ꥠ-ꥼ가-힣ힰ-ퟆퟋ-ퟻﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ"
  }, {
   name: "Hanunoo",
   bmp: "ᜠ-᜴"
  }, {
   name: "Hebrew",
   bmp: "֑-ׇא-תװ-״יִ-זּטּ-לּמּנּסּףּפּצּ-ﭏ"
  }, {
   name: "Hiragana",
   bmp: "ぁ-ゖゝ-ゟ",
   astral: "𛀁|🈀"
  }, {
   name: "Imperial_Aramaic",
   astral: "�[�-��-�]"
  }, {
   name: "Inherited",
   bmp: "̀-ًͯ҅҆-ٰٕ॒॑᳐-᳔᳒-᳢᳠-᳨᳭᳴᷀-ᷦ᷼-᷿‌‍⃐-〪⃰-゙゚〭︀-️︠-︦",
   astral: "�[�-��-��-��-�]|𐇽|�[�-�]"
  }, {
   name: "Inscriptional_Pahlavi",
   astral: "�[�-��-�]"
  }, {
   name: "Inscriptional_Parthian",
   astral: "�[�-��-�]"
  }, {
   name: "Javanese",
   bmp: "ꦀ-꧍ꧏ-꧙꧞꧟"
  }, {
   name: "Kaithi",
   astral: "�[�-�]"
  }, {
   name: "Kannada",
   bmp: "ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲ"
  }, {
   name: "Katakana",
   bmp: "ァ-ヺヽ-ヿㇰ-ㇿ㋐-㋾㌀-㍗ｦ-ｯｱ-ﾝ",
   astral: "𛀀"
  }, {
   name: "Kayah_Li",
   bmp: "꤀-꤯"
  }, {
   name: "Kharoshthi",
   astral: "�[�-����-��-��-��-��-��-�]"
  }, {
   name: "Khmer",
   bmp: "ក-៝០-៩៰-៹᧠-᧿"
  }, {
   name: "Lao",
   bmp: "ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟ"
  }, {
   name: "Latin",
   bmp: "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿﬀ-ﬆＡ-Ｚａ-ｚ"
  }, {
   name: "Lepcha",
   bmp: "ᰀ-᰷᰻-᱉ᱍ-ᱏ"
  }, {
   name: "Limbu",
   bmp: "ᤀ-ᤜᤠ-ᤫᤰ-᤻᥀᥄-᥏"
  }, {
   name: "Linear_B",
   astral: "�[�-��-��-����-��-��-�]"
  }, {
   name: "Lisu",
   bmp: "ꓐ-꓿"
  }, {
   name: "Lycian",
   astral: "�[�-�]"
  }, {
   name: "Lydian",
   astral: "�[�-��]"
  }, {
   name: "Malayalam",
   bmp: "ംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൵൹-ൿ"
  }, {
   name: "Mandaic",
   bmp: "ࡀ-࡛࡞"
  }, {
   name: "Meetei_Mayek",
   bmp: "ꫠ-꫶ꯀ-꯭꯰-꯹"
  }, {
   name: "Meroitic_Cursive",
   astral: "�[�-���]"
  }, {
   name: "Meroitic_Hieroglyphs",
   astral: "�[�-�]"
  }, {
   name: "Miao",
   astral: "�[�-��-��-�]"
  }, {
   name: "Mongolian",
   bmp: "᠀᠁᠄᠆-᠎᠐-᠙ᠠ-ᡷᢀ-ᢪ"
  }, {
   name: "Myanmar",
   bmp: "က-႟ꩠ-ꩻ"
  }, {
   name: "New_Tai_Lue",
   bmp: "ᦀ-ᦫᦰ-ᧉ᧐-᧚᧞᧟"
  }, {
   name: "Nko",
   bmp: "߀-ߺ"
  }, {
   name: "Ogham",
   bmp: " -᚜"
  }, {
   name: "Ol_Chiki",
   bmp: "᱐-᱿"
  }, {
   name: "Old_Italic",
   astral: "�[�-��-�]"
  }, {
   name: "Old_Persian",
   astral: "�[�-��-�]"
  }, {
   name: "Old_South_Arabian",
   astral: "�[�-�]"
  }, {
   name: "Old_Turkic",
   astral: "�[�-�]"
  }, {
   name: "Oriya",
   bmp: "ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୷"
  }, {
   name: "Osmanya",
   astral: "�[�-��-�]"
  }, {
   name: "Phags_Pa",
   bmp: "ꡀ-꡷"
  }, {
   name: "Phoenician",
   astral: "�[�-��]"
  }, {
   name: "Rejang",
   bmp: "ꤰ-꥓꥟"
  }, {
   name: "Runic",
   bmp: "ᚠ-ᛪᛮ-ᛰ"
  }, {
   name: "Samaritan",
   bmp: "ࠀ-࠭࠰-࠾"
  }, {
   name: "Saurashtra",
   bmp: "ꢀ-꣄꣎-꣙"
  }, {
   name: "Sharada",
   astral: "�[�-��-�]"
  }, {
   name: "Shavian",
   astral: "�[�-�]"
  }, {
   name: "Sinhala",
   bmp: "ංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲ-෴"
  }, {
   name: "Sora_Sompeng",
   astral: "�[�-��-�]"
  }, {
   name: "Sundanese",
   bmp: "ᮀ-ᮿ᳀-᳇"
  }, {
   name: "Syloti_Nagri",
   bmp: "ꠀ-꠫"
  }, {
   name: "Syriac",
   bmp: "܀-܍܏-݊ݍ-ݏ"
  }, {
   name: "Tagalog",
   bmp: "ᜀ-ᜌᜎ-᜔"
  }, {
   name: "Tagbanwa",
   bmp: "ᝠ-ᝬᝮ-ᝰᝲᝳ"
  }, {
   name: "Tai_Le",
   bmp: "ᥐ-ᥭᥰ-ᥴ"
  }, {
   name: "Tai_Tham",
   bmp: "ᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪠-᪭"
  }, {
   name: "Tai_Viet",
   bmp: "ꪀ-ꫂꫛ-꫟"
  }, {
   name: "Takri",
   astral: "�[�-��-�]"
  }, {
   name: "Tamil",
   bmp: "ஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௺"
  }, {
   name: "Telugu",
   bmp: "ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯౸-౿"
  }, {
   name: "Thaana",
   bmp: "ހ-ޱ"
  }, {
   name: "Thai",
   bmp: "ก-ฺเ-๛"
  }, {
   name: "Tibetan",
   bmp: "ༀ-ཇཉ-ཬཱ-ྗྙ-ྼ྾-࿌࿎-࿔࿙࿚"
  }, {
   name: "Tifinagh",
   bmp: "ⴰ-ⵧⵯ⵰⵿"
  }, {
   name: "Ugaritic",
   astral: "�[�-��]"
  }, {
   name: "Vai",
   bmp: "ꔀ-ꘫ"
  }, {
   name: "Yi",
   bmp: "ꀀ-ꒌ꒐-꓆"
  } ]);
 }(e), e;
}), function(e, t) {
 "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define("stacktrace", t) : e.printStackTrace = t();
}(this, function() {
 function e(t) {
  t = t || {
   guess: !0
  };
  var n = t.e || null, r = !!t.guess, i = t.mode || null, a = new e.implementation(), o = a.run(n, i);
  return r ? a.guessAnonymousFunctions(o) : o;
 }
 return e.implementation = function() {}, e.implementation.prototype = {
  run: function(e, t) {
   return e = e || this.createException(), t = t || this.mode(e), "other" === t ? this.other(arguments.callee) : this[t](e);
  },
  createException: function() {
   try {
    this.undef();
   } catch (e) {
    return e;
   }
  },
  mode: function(e) {
   return "undefined" != typeof window && window.navigator.userAgent.indexOf("PhantomJS") > -1 ? "phantomjs" : e.arguments && e.stack ? "chrome" : e.stack && e.sourceURL ? "safari" : e.stack && e.number ? "ie" : e.stack && e.fileName ? "firefox" : e.message && e["opera#sourceloc"] ? e.stacktrace ? e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? "opera9" : "opera10a" : "opera9" : e.message && e.stack && e.stacktrace ? e.stacktrace.indexOf("called from line") < 0 ? "opera10b" : "opera11" : e.stack && !e.fileName ? "chrome" : "other";
  },
  instrumentFunction: function(t, n, r) {
   t = t || window;
   var i = t[n];
   t[n] = function() {
    return r.call(this, e().slice(4)), t[n]._instrumented.apply(this, arguments);
   }, t[n]._instrumented = i;
  },
  deinstrumentFunction: function(e, t) {
   e[t].constructor === Function && e[t]._instrumented && e[t]._instrumented.constructor === Function && (e[t] = e[t]._instrumented);
  },
  chrome: function(e) {
   return (e.stack + "\n").replace(/^[\s\S]+?\s+at\s+/, " at ").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}() ($1)$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}() ($1)").replace(/^(.+) \((.+)\)$/gm, "$1@$2").split("\n").slice(0, -1);
  },
  safari: function(e) {
   return e.stack.replace(/\[native code\]\n/m, "").replace(/^(?=\w+Error\:).*$\n/m, "").replace(/^@/gm, "{anonymous}()@").split("\n");
  },
  ie: function(e) {
   return e.stack.replace(/^\s*at\s+(.*)$/gm, "$1").replace(/^Anonymous function\s+/gm, "{anonymous}() ").replace(/^(.+)\s+\((.+)\)$/gm, "$1@$2").split("\n").slice(1);
  },
  firefox: function(e) {
   return e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^(?:\((\S*)\))?@/gm, "{anonymous}($1)@").split("\n");
  },
  opera11: function(e) {
   for (var t = "{anonymous}", n = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, r = e.stacktrace.split("\n"), i = [], a = 0, o = r.length; o > a; a += 2) {
    var s = n.exec(r[a]);
    if (s) {
     var l = s[4] + ":" + s[1] + ":" + s[2], c = s[3] || "global code";
     c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, t), 
     i.push(c + "@" + l + " -- " + r[a + 1].replace(/^\s+/, ""));
    }
   }
   return i;
  },
  opera10b: function(e) {
   for (var t = /^(.*)@(.+):(\d+)$/, n = e.stacktrace.split("\n"), r = [], i = 0, a = n.length; a > i; i++) {
    var o = t.exec(n[i]);
    if (o) {
     var s = o[1] ? o[1] + "()" : "global code";
     r.push(s + "@" + o[2] + ":" + o[3]);
    }
   }
   return r;
  },
  opera10a: function(e) {
   for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, r = e.stacktrace.split("\n"), i = [], a = 0, o = r.length; o > a; a += 2) {
    var s = n.exec(r[a]);
    if (s) {
     var l = s[3] || t;
     i.push(l + "()@" + s[2] + ":" + s[1] + " -- " + r[a + 1].replace(/^\s+/, ""));
    }
   }
   return i;
  },
  opera9: function(e) {
   for (var t = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)/i, r = e.message.split("\n"), i = [], a = 2, o = r.length; o > a; a += 2) {
    var s = n.exec(r[a]);
    s && i.push(t + "()@" + s[2] + ":" + s[1] + " -- " + r[a + 1].replace(/^\s+/, ""));
   }
   return i;
  },
  phantomjs: function(e) {
   for (var t = "{anonymous}", n = /(\S+) \((\S+)\)/i, r = e.stack.split("\n"), i = [], a = 1, o = r.length; o > a; a++) {
    r[a] = r[a].replace(/^\s+at\s+/gm, "");
    var s = n.exec(r[a]);
    i.push(s ? s[1] + "()@" + s[2] : t + "()@" + r[a]);
   }
   return i;
  },
  other: function(e) {
   for (var t, n, r = "{anonymous}", i = /function(?:\s+([\w$]+))?\s*\(/, a = [], o = 10, s = Array.prototype.slice; e && a.length < o; ) {
    t = i.test(e.toString()) ? RegExp.$1 || r : r;
    try {
     n = s.call(e.arguments || []);
    } catch (l) {
     n = [ "Cannot access arguments: " + l ];
    }
    a[a.length] = t + "(" + this.stringifyArguments(n) + ")";
    try {
     e = e.caller;
    } catch (l) {
     a[a.length] = "Cannot access caller: " + l;
     break;
    }
   }
   return a;
  },
  stringifyArguments: function(e) {
   for (var t = [], n = Array.prototype.slice, r = 0; r < e.length; ++r) {
    var i = e[r];
    void 0 === i ? t[r] = "undefined" : null === i ? t[r] = "null" : i.constructor && (t[r] = i.constructor === Array ? i.length < 3 ? "[" + this.stringifyArguments(i) + "]" : "[" + this.stringifyArguments(n.call(i, 0, 1)) + "..." + this.stringifyArguments(n.call(i, -1)) + "]" : i.constructor === Object ? "#object" : i.constructor === Function ? "#function" : i.constructor === String ? '"' + i + '"' : i.constructor === Number ? i : "?");
   }
   return t.join(",");
  },
  sourceCache: {},
  ajax: function(e) {
   var t = this.createXMLHTTPObject();
   if (t) try {
    return t.open("GET", e, !1), t.send(null), t.responseText;
   } catch (n) {}
   return "";
  },
  createXMLHTTPObject: function() {
   for (var e, t = [ function() {
    return new XMLHttpRequest();
   }, function() {
    return new ActiveXObject("Msxml2.XMLHTTP");
   }, function() {
    return new ActiveXObject("Msxml3.XMLHTTP");
   }, function() {
    return new ActiveXObject("Microsoft.XMLHTTP");
   } ], n = 0; n < t.length; n++) try {
    return e = t[n](), this.createXMLHTTPObject = t[n], e;
   } catch (r) {}
  },
  isSameDomain: function(e) {
   return "undefined" != typeof location && -1 !== e.indexOf(location.hostname);
  },
  getSource: function(e) {
   return e in this.sourceCache || (this.sourceCache[e] = this.ajax(e).split("\n")), 
   this.sourceCache[e];
  },
  guessAnonymousFunctions: function(e) {
   for (var t = 0; t < e.length; ++t) {
    var n = /\{anonymous\}\(.*\)@(.*)/, r = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/, i = e[t], a = n.exec(i);
    if (a) {
     var o = r.exec(a[1]);
     if (o) {
      var s = o[1], l = o[2], c = o[3] || 0;
      if (s && this.isSameDomain(s) && l) {
       var u = this.guessAnonymousFunction(s, l, c);
       e[t] = i.replace("{anonymous}", u);
      }
     }
    }
   }
   return e;
  },
  guessAnonymousFunction: function(e, t) {
   var n;
   try {
    n = this.findFunctionName(this.getSource(e), t);
   } catch (r) {
    n = "getSource failed with url: " + e + ", exception: " + r.toString();
   }
   return n;
  },
  findFunctionName: function(e, t) {
   for (var n, r, i, a = /function\s+([^(]*?)\s*\(([^)]*)\)/, o = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, s = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, l = "", c = Math.min(t, 20), u = 0; c > u; ++u) if (n = e[t - u - 1], 
   i = n.indexOf("//"), i >= 0 && (n = n.substr(0, i)), n) {
    if (l = n + l, r = o.exec(l), r && r[1]) return r[1];
    if (r = a.exec(l), r && r[1]) return r[1];
    if (r = s.exec(l), r && r[1]) return r[1];
   }
   return "(?)";
  }
 }, e;
});

var saveAs = saveAs || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(e) {
 if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
  var t = e.document, n = function() {
   return e.URL || e.webkitURL || e;
  }, r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), i = "download" in r, a = function(n) {
   var r = t.createEvent("MouseEvents");
   r.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(r);
  }, o = e.webkitRequestFileSystem, s = e.requestFileSystem || o || e.mozRequestFileSystem, l = function(t) {
   (e.setImmediate || e.setTimeout)(function() {
    throw t;
   }, 0);
  }, c = "application/octet-stream", u = 0, d = 500, p = function(t) {
   var r = function() {
    "string" == typeof t ? n().revokeObjectURL(t) : t.remove();
   };
   e.chrome ? r() : setTimeout(r, d);
  }, h = function(e, t, n) {
   t = [].concat(t);
   for (var r = t.length; r--; ) {
    var i = e["on" + t[r]];
    if ("function" == typeof i) try {
     i.call(e, n || e);
    } catch (a) {
     l(a);
    }
   }
  }, f = function(t, l) {
   var d, f, m, g = this, b = t.type, v = !1, y = function() {
    h(g, "writestart progress write writeend".split(" "));
   }, x = function() {
    if ((v || !d) && (d = n().createObjectURL(t)), f) f.location.href = d; else {
     var r = e.open(d, "_blank");
     void 0 == r && "undefined" != typeof safari && (e.location.href = d);
    }
    g.readyState = g.DONE, y(), p(d);
   }, w = function(e) {
    return function() {
     return g.readyState !== g.DONE ? e.apply(this, arguments) : void 0;
    };
   }, S = {
    create: !0,
    exclusive: !1
   };
   return g.readyState = g.INIT, l || (l = "download"), i ? (d = n().createObjectURL(t), 
   r.href = d, r.download = l, a(r), g.readyState = g.DONE, y(), void p(d)) : (e.chrome && b && b !== c && (m = t.slice || t.webkitSlice, 
   t = m.call(t, 0, t.size, c), v = !0), o && "download" !== l && (l += ".download"), 
   (b === c || o) && (f = e), s ? (u += t.size, void s(e.TEMPORARY, u, w(function(e) {
    e.root.getDirectory("saved", S, w(function(e) {
     var n = function() {
      e.getFile(l, S, w(function(e) {
       e.createWriter(w(function(n) {
        n.onwriteend = function(t) {
         f.location.href = e.toURL(), g.readyState = g.DONE, h(g, "writeend", t), p(e);
        }, n.onerror = function() {
         var e = n.error;
         e.code !== e.ABORT_ERR && x();
        }, "writestart progress write abort".split(" ").forEach(function(e) {
         n["on" + e] = g["on" + e];
        }), n.write(t), g.abort = function() {
         n.abort(), g.readyState = g.DONE;
        }, g.readyState = g.WRITING;
       }), x);
      }), x);
     };
     e.getFile(l, {
      create: !1
     }, w(function(e) {
      e.remove(), n();
     }), w(function(e) {
      e.code === e.NOT_FOUND_ERR ? n() : x();
     }));
    }), x);
   }), x)) : void x());
  }, m = f.prototype, g = function(e, t) {
   return new f(e, t);
  };
  return m.abort = function() {
   var e = this;
   e.readyState = e.DONE, h(e, "abort");
  }, m.readyState = m.INIT = 0, m.WRITING = 1, m.DONE = 2, m.error = m.onwritestart = m.onprogress = m.onwrite = m.onabort = m.onerror = m.onwriteend = null, 
  g;
 }
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);

"undefined" != typeof module && module.exports ? module.exports = saveAs : "undefined" != typeof define && null !== define && null != define.amd && define("FileSaver", [], function() {
 return saveAs;
}), define("utils", [ "underscore", "storage", "crel", "xregexp", "stacktrace", "FileSaver" ], function(_, storage, crel, XRegExp, printStackTrace, saveAs) {
 function jqElt(e) {
  return _.isString(e) || !e.val ? $(e) : e;
 }
 function inputError(e, t) {
  void 0 !== t && (e.stop(!0, !0).addClass("error").delay(3e3).queue(function() {
   $(this).removeClass("error"), $(this).dequeue();
  }), t.stopPropagation());
 }
 function getInputNumValue(e, t, n, r, i) {
  t = jqElt(t);
  var a = utils.getInputTextValue(t, n);
  return void 0 === a ? void 0 : (a = e ? parseFloat(a) : parseInt(a, 10), isNaN(a) || void 0 !== r && r > a || void 0 !== i && a > i ? void inputError(t, n) : a);
 }
 function padNumber(e, t, n) {
  var r = "";
  for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t; ) e = "0" + e;
  return n && (e = e.substr(e.length - t)), r + e;
 }
 function dateGetter(e, t, n, r) {
  return n = n || 0, function(i) {
   var a = i["get" + e]();
   return (n > 0 || a > -n) && (a += n), 0 === a && -12 == n && (a = 12), padNumber(a, t, r);
  };
 }
 function dateStrGetter(e, t) {
  return function(n, r) {
   var i = n["get" + e](), a = (t ? "SHORT" + e : e).toUpperCase();
   return r[a][i];
  };
 }
 var utils = {};
 utils.msie = function() {
  var e = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1], 10);
  return isNaN(e) && (e = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1], 10)), 
  e;
 }(), utils.urlResolve = function() {
  var e = document.createElement("a");
  return function(t) {
   var n = t;
   return utils.msie && (e.setAttribute("href", n), n = e.href), e.setAttribute("href", n), 
   {
    href: e.href,
    protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
    host: e.host,
    search: e.search ? e.search.replace(/^\?/, "") : "",
    hash: e.hash ? e.hash.replace(/^#/, "") : "",
    hostname: e.hostname,
    port: e.port,
    pathname: "/" === e.pathname.charAt(0) ? e.pathname : "/" + e.pathname
   };
  };
 }(), utils.defer = function() {
  var e = [], t = "deferMsg";
  return window.addEventListener("message", function(n) {
   n.source == window && n.data == t && (n.stopPropagation(), e.length > 0 && e.shift()());
  }, !0), function(n) {
   e.push(n), window.postMessage(t, "*");
  };
 }(), utils.debounce = function(e, t) {
  function n() {
   r = !1, e.call(t);
  }
  var r = !1;
  return function() {
   r !== !0 && (r = !0, utils.defer(n));
  };
 };
 var idAlphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 utils.id = function() {
  for (var e = [], t = 0; 24 > t; t++) e.push(idAlphabet[Math.random() * idAlphabet.length | 0]);
  return e.join("");
 }, utils.getURLParameter = function(e) {
  var t = new RegExp("(?:\\?|\\#\\!|&)" + e + "=(.+?)(?:&|\\#|$)");
  try {
   return decodeURIComponent(t.exec(location.search + location.hash)[1]);
  } catch (n) {
   return void 0;
  }
 }, utils.getInputValue = function(e) {
  return e = jqElt(e), e.val();
 }, utils.setInputValue = function(e, t) {
  e = jqElt(e), e.val(t);
 }, utils.getInputTextValue = function(e, t, n) {
  e = jqElt(e);
  var r = e.val();
  return void 0 === r ? void inputError(e, t) : (r = utils.trim(r), 0 === r.length || void 0 !== n && !r.match(n) ? void inputError(e, t) : r);
 }, utils.getInputIntValue = _.partial(getInputNumValue, !1), utils.getInputFloatValue = _.partial(getInputNumValue, !0), 
 utils.getInputRegExpValue = function(e, t) {
  e = jqElt(e);
  var n = utils.getInputTextValue(e, t);
  if (void 0 === n) return void 0;
  try {
   new RegExp(n);
  } catch (r) {
   return void inputError(e, t);
  }
  return n;
 }, utils.getInputJsValue = function(element, event) {
  element = jqElt(element);
  var value = utils.getInputTextValue(element, event);
  if (void 0 === value) return void 0;
  try {
   eval("var test=" + value);
  } catch (e) {
   return void inputError(element, event);
  }
  return value;
 }, utils.getInputJSONValue = function(e, t) {
  e = jqElt(e);
  var n = utils.getInputTextValue(e, t);
  if (void 0 === n) return void 0;
  try {
   JSON.parse(n);
  } catch (r) {
   return void inputError(e, t);
  }
  return n;
 }, utils.getInputChecked = function(e) {
  return e = jqElt(e), e.prop("checked");
 }, utils.setInputChecked = function(e, t) {
  e = jqElt(e), e.prop("checked", t).change();
 }, utils.getInputRadio = function(e) {
  return $("input:radio[name=" + e + "]:checked").prop("value");
 }, utils.setInputRadio = function(e, t) {
  $("input:radio[name=" + e + "][value=" + t + "]").prop("checked", !0).change();
 }, utils.resetModalInputs = function() {
  $(".modal input[type=text]:not([disabled]), .modal input[type=password], .modal textarea").val(""), 
  $(".modal input[type=checkbox]").prop("checked", !1).change();
 }, utils.trim = function(e) {
  return $.trim(e);
 };
 var nonWordChars = XRegExp("[^\\p{L}\\p{N}-]", "g");
 utils.slugify = function(e) {
  return e.toLowerCase().replace(/\s/g, "-").replace(nonWordChars, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }, utils.checkUrl = function(e, t) {
  return e ? (0 !== e.indexOf("http") && (e = "http://" + e), t && -1 === e.indexOf("/", e.length - 1) && (e += "/"), 
  e) : e;
 }, utils.addModal = function(e, t) {
  var n = crel("div", {
   "class": "modal " + e
  });
  n.innerHTML = t, document.body.appendChild(n);
 }, utils.createBackdrop = function(e) {
  var t = crel("div", {
   "class": "modal-backdrop fade"
  });
  return e = e || document.body, e.appendChild(t), t.offsetWidth, t.className = t.className + " in", 
  t.removeBackdrop = function() {
   t.className = "modal-backdrop fade", setTimeout(function() {
    t.parentNode.removeChild(t);
   }, 150);
  }, t;
 }, utils.popupWindow = function(e, t, n, r) {
  var i = screen.width / 2 - n / 2, a = screen.height / 2 - r / 2;
  return window.open(e, t, [ "toolbar=no, ", "location=no, ", "directories=no, ", "status=no, ", "menubar=no, ", "scrollbars=no, ", "resizable=no, ", "copyhistory=no, ", "width=" + n + ", ", "height=" + r + ", ", "top=" + a + ", ", "left=" + i ].join(""));
 };
 var $windowElt = $(window);
 utils.iframe = function(e, t, n) {
  function r() {
   var e = window.innerWidth - 20;
   e > t && (e = t);
   var r = window.innerHeight - 50;
   r > n && (r = n), o.setAttribute("width", e), o.setAttribute("height", r);
  }
  function i() {
   a.off("click.backdrop"), a[0].removeBackdrop(), $windowElt.off("resize.iframe"), 
   o.parentNode.removeChild(o);
  }
  var a = $(utils.createBackdrop()), o = crel("iframe", {
   src: e,
   frameborder: 0,
   "class": "modal-content modal-iframe"
  });
  return document.body.appendChild(o), r(), $windowElt.on("resize.iframe", r), o.removeIframe = i, 
  a.on("click.backdrop", i), o;
 };
 var redirectCallbackConfirm, redirectCallbackCancel;
 utils.redirectConfirm = function(e, t, n) {
  redirectCallbackConfirm = t, redirectCallbackCancel = n, $(".modal-redirect-confirm .redirect-msg").html(e), 
  $(".modal-redirect-confirm").modal("show");
 }, utils.init = function() {
  $(".action-redirect-confirm").click(function() {
   redirectCallbackCancel = void 0, redirectCallbackConfirm();
  }), $(".modal-redirect-confirm").on("hidden.bs.modal", function() {
   _.defer(function() {
    redirectCallbackCancel && redirectCallbackCancel();
   });
  });
 }, utils.lockUI = function(e) {
  var t = $([ "#wmd-input", "#preview-contents", ".navbar .file-title-navbar", ".navbar .left-buttons", ".navbar .right-buttons", ".navbar .buttons-dropdown" ].join(",")).hide();
  return function() {
   t.show(), e && e.apply(null, arguments);
  };
 };
 var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  " ": " "
 };
 utils.escape = function(e) {
  return String(e).replace(/[&<"'\/\u00a0]/g, function(e) {
   return entityMap[e];
  });
 }, utils.saveAs = function(e, t) {
  if (void 0 === saveAs || /constructor/i.test(window.HTMLElement)) if (_.isString(e)) {
   var n = "data:application/octet-stream;base64," + utils.encodeBase64(e);
   window.open(n, "file");
  } else {
   var r = new FileReader();
   r.onload = function(e) {
    utils.redirectConfirm("You are opening a PDF document.", function() {
     var t = "data:application/pdf;" + e.target.result.substring(e.target.result.indexOf("base64"));
     window.open(t, "file");
    });
   }, r.readAsDataURL(e);
  } else _.isString(e) && (e = new Blob([ e ], {
   type: "text/plain;charset=utf-8"
  })), saveAs(e, t);
 }, utils.updateCurrentTime = function() {
  utils.currentTime = Date.now();
 }, utils.updateCurrentTime(), utils.storeAttributes = function(e) {
  var t = e.syncIndex || e.publishIndex, n = _.omit(e, "syncIndex", "publishIndex", "provider");
  n.provider = e.provider.providerId, storage[t] = JSON.stringify(n);
 }, utils.retrieveIndexArray = function(e) {
  try {
   return _.compact(storage[e].split(";"));
  } catch (t) {
   return storage[e] = ";", [];
  }
 }, utils.appendIndexToArray = function(e, t) {
  storage[e] += t + ";";
 }, utils.removeIndexFromArray = function(e, t) {
  storage[e] = storage[e].replace(";" + t + ";", ";");
 }, utils.retrieveIgnoreError = function(e) {
  try {
   return JSON.parse(storage[e]);
  } catch (t) {
   return void 0;
  }
 };
 var eventList = [];
 utils.logValue = function(e) {
  eventList.unshift(e), eventList.length > 5 && eventList.pop();
 }, utils.logStackTrace = function() {
  eventList.unshift(printStackTrace()), eventList.length > 5 && eventList.pop();
 }, utils.formatEventList = function() {
  var e = [];
  return _.each(eventList, function(t) {
   e.push("\n"), _.isString(t) ? e.push(t) : _.isArray(t) && (e.push(t[5] || ""), e.push(t[6] || ""));
  }), e.join("");
 };
 var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, DATE_FORMATS = {
  yyyy: dateGetter("FullYear", 4),
  yy: dateGetter("FullYear", 2, 0, !0),
  y: dateGetter("FullYear", 1),
  MMMM: dateStrGetter("Month"),
  MMM: dateStrGetter("Month", !0),
  MM: dateGetter("Month", 2, 1),
  M: dateGetter("Month", 1, 1),
  dd: dateGetter("Date", 2),
  d: dateGetter("Date", 1),
  HH: dateGetter("Hours", 2),
  H: dateGetter("Hours", 1),
  hh: dateGetter("Hours", 2, -12),
  h: dateGetter("Hours", 1, -12),
  mm: dateGetter("Minutes", 2),
  m: dateGetter("Minutes", 1),
  ss: dateGetter("Seconds", 2),
  s: dateGetter("Seconds", 1),
  sss: dateGetter("Milliseconds", 3),
  EEEE: dateStrGetter("Day"),
  EEE: dateStrGetter("Day", !0)
 }, DATETIME_FORMATS = {
  MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
  SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
  DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
  SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
  AMPMS: [ "AM", "PM" ],
  medium: "MMM d, y h:mm:ss a",
  "short": "M/d/yy h:mm a",
  fullDate: "EEEE, MMMM d, y",
  longDate: "MMMM d, y",
  mediumDate: "MMM d, y",
  shortDate: "M/d/yy",
  mediumTime: "h:mm:ss a",
  shortTime: "h:mm a"
 };
 utils.formatDate = function(e) {
  var t, n, r = "", i = [], a = Date.now() - e, o = "HH:mm";
  for (a > 3155694e4 ? o = "y" : a > 864e5 && (o = "MMM d"), e = new Date(e); o; ) n = DATE_FORMATS_SPLIT.exec(o), 
  n ? (i = i.concat(n.slice(1)), o = i.pop()) : (i.push(o), o = null);
  return i.forEach(function(n) {
   t = DATE_FORMATS[n], r += t ? t(e, DATETIME_FORMATS) : n.replace(/(^'|'$)/g, "").replace(/''/g, "'");
  }), r;
 }, utils.encodeBase64 = function(e) {
  if (0 === e.length) return "";
  var t, n, r = [], i = 0;
  for (e = encodeURI(e), t = e.length; t > i; ) n = e[i], i += 1, "%" !== n ? r.push(n.charCodeAt(0)) : (n = e[i] + e[i + 1], 
  r.push(parseInt(n, 16)), i += 2);
  var a, o, s = "=", l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = [], u = r.length - r.length % 3;
  for (a = 0; u > a; a += 3) o = r[a] << 16 | r[a + 1] << 8 | r[a + 2], c.push(l.charAt(o >> 18)), 
  c.push(l.charAt(o >> 12 & 63)), c.push(l.charAt(o >> 6 & 63)), c.push(l.charAt(63 & o));
  switch (r.length - u) {
  case 1:
   o = r[a] << 16, c.push(l.charAt(o >> 18) + l.charAt(o >> 12 & 63) + s + s);
   break;

  case 2:
   o = r[a] << 16 | r[a + 1] << 8, c.push(l.charAt(o >> 18) + l.charAt(o >> 12 & 63) + l.charAt(o >> 6 & 63) + s);
  }
  return c.join("");
 }, utils.decodeBase64 = function(e) {
  return decodeURIComponent(window.escape(window.atob(e)));
 };
 var mHash = [ 0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117 ];
 return utils.crc32 = function(e) {
  var t = 0, n = -1;
  return e.split("").forEach(function(e) {
   t = 255 & (n ^ e.charCodeAt(0)), n = n >>> 8 ^ mHash[t];
  }), n = -1 ^ n, 0 > n && (n = 4294967295 + n + 1), n.toString(16);
 }, window.perfTest = function(e) {
  for (var t = Date.now(), n = 0; 1e4 > n; n++) e();
  console.log("Run 10,000 times in " + (Date.now() - t) + "ms");
 }, utils;
}), define("constants", [], function() {
 var e = {};
 return e.VERSION = "4.3.8", e.MAIN_URL = "https://stackedit.io/", e.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1", 
 e.GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw", e.GOOGLE_DRIVE_APP_ID = "241271498917", 
 e.DROPBOX_APP_KEY = "lq6mwopab8wskas", e.DROPBOX_APP_SECRET = "851fgnucpezy84t", 
 e.DROPBOX_RESTRICTED_APP_KEY = "sw0hlixhr8q1xk0", e.DROPBOX_RESTRICTED_APP_SECRET = "1r808p2xygs6lbg", 
 e.BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c", e.DEFAULT_FILE_TITLE = "Title", 
 e.DEFAULT_FOLDER_NAME = "New folder", e.GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document", 
 e.EDITOR_DEFAULT_PADDING = 35, e.CHECK_ONLINE_PERIOD = 12e4, e.AJAX_TIMEOUT = 3e4, 
 e.ASYNC_TASK_DEFAULT_TIMEOUT = 6e4, e.ASYNC_TASK_LONG_TIMEOUT = 18e4, e.USER_IDLE_THRESHOLD = 3e5, 
 e.IMPORT_FILE_MAX_CONTENT_SIZE = 1e5, e.IMPORT_IMG_MAX_CONTENT_SIZE = 1e7, e.COUCHDB_PAGE_SIZE = 25, 
 e.TEMPORARY_FILE_INDEX = "file.tempIndex", e.WELCOME_DOCUMENT_TITLE = "Hello!", 
 e.DOWNLOAD_IMPORT_URL = "/downloadImport", e.PICASA_IMPORT_IMG_URL = "/picasaImportImg", 
 e.SSH_PUBLISH_URL = "/sshPublish", e.PDF_EXPORT_URL = "/pdfExport", e.COUCHDB_URL = "https://stackedit.couchappy.com/documents", 
 e.BASE_URL = "http://localhost/", e.GOOGLE_CLIENT_ID = "241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com", 
 e.GITHUB_CLIENT_ID = "e47fef6055344579799d", e.GATEKEEPER_URL = "https://stackedit-gatekeeper-localhost.herokuapp.com/", 
 e.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-local.herokuapp.com/", e.WORDPRESS_CLIENT_ID = "23361", 
 e.WORDPRESS_PROXY_URL = "https://stackedit-io-wordpress-proxy.herokuapp.com/", 0 === location.hostname.indexOf("stackedit.io") ? (e.BASE_URL = e.MAIN_URL, 
 e.GOOGLE_CLIENT_ID = "241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com", 
 e.GITHUB_CLIENT_ID = "710fc67886ab1ae8fee6", e.GATEKEEPER_URL = "https://stackedit-io-gatekeeper.herokuapp.com/", 
 e.TUMBLR_PROXY_URL = "https://stackedit-io-tumblr-proxy.herokuapp.com/") : 0 === location.hostname.indexOf("benweet.github.io") ? (e.BASE_URL = "http://benweet.github.io/stackedit/", 
 e.GOOGLE_CLIENT_ID = "241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com", 
 e.GITHUB_CLIENT_ID = "fa0d09514da8377ee32e", e.GATEKEEPER_URL = "https://stackedit-gatekeeper.herokuapp.com/", 
 e.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/", e.WORDPRESS_CLIENT_ID = "3185", 
 e.WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/") : 0 === location.hostname.indexOf("stackedit-beta.herokuapp.com") ? (e.BASE_URL = "https://stackedit-beta.herokuapp.com/", 
 e.GOOGLE_CLIENT_ID = "241271498917-9bbplknkt0ljv5gaudhoiogp13hd18be.apps.googleusercontent.com", 
 e.GITHUB_CLIENT_ID = "e9034ae191c3a8a1c5ed", e.GATEKEEPER_URL = "https://stackedit-beta-gatekeeper.herokuapp.com/", 
 e.TUMBLR_PROXY_URL = "https://stackedit-beta-tumblr-proxy.herokuapp.com/", e.WORDPRESS_CLIENT_ID = "34786", 
 e.WORDPRESS_PROXY_URL = "https://stackedit-beta-wordpress-proxy.herokuapp.com/") : 0 === location.hostname.indexOf("benweet.insomnia247.nl") && (e.BASE_URL = "http://benweet.insomnia247.nl/stackedit/", 
 e.GOOGLE_CLIENT_ID = "241271498917-52hae7a08hv7ltenv7km8h7lghno9sk3.apps.googleusercontent.com", 
 e.GITHUB_CLIENT_ID = "d2943d6074b2d9c4a830", e.GATEKEEPER_URL = "https://stackedit-gatekeeper-insomnia.herokuapp.com/", 
 e.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-beta.herokuapp.com/"), e.THEME_LIST = {
  blue: "Blue",
  "default": "Default",
  gray: "Gray",
  night: "Night",
  school: "School",
  "solarized-light": "Solarized Light",
  "solarized-dark": "Solarized Dark"
 }, e;
}), define("settings", [ "underscore", "constants", "storage" ], function(e, t, n) {
 var r = {
  layoutOrientation: "horizontal",
  editMode: "ltr",
  lazyRendering: !0,
  editorFontClass: "font-rich",
  fontSizeRatio: 1,
  maxWidthRatio: 1,
  cursorFocusRatio: .5,
  defaultContent: "\n\n\n> Written with [StackEdit](" + t.MAIN_URL + ").",
  commitMsg: "Published with " + t.MAIN_URL,
  conflictMode: "merge",
  markdownMimeType: "text/plain",
  gdriveMultiAccount: 1,
  gdriveFullAccess: !0,
  dropboxFullAccess: !0,
  githubFullAccess: !0,
  template: [ "<!DOCTYPE html>", "<html>", "<head>", '<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">', "<title><%= documentTitle %></title>", '<link rel="stylesheet" href="' + t.MAIN_URL + 'res-min/themes/base.css" />', '<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>', "</head>", '<body><div class="container"><%= documentHTML %></div></body>', "</html>" ].join("\n"),
  pdfTemplate: [ "<!DOCTYPE html>", "<html>", "<head>", '<meta charset="utf-8">', "<title><%= documentTitle %></title>", '<link rel="stylesheet" href="http://localhost/res-min/themes/base.css" />', '<script type="text/x-mathjax-config">', 'MathJax.Hub.Config({ messageStyle: "none" });', "</script>", '<script type="text/javascript" src="http://localhost/res/bower-libs/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>', "</head>", "<body><%= documentHTML %></body>", "</html>" ].join("\n"),
  pdfOptions: [ "{", '    "marginTop": 25,', '    "marginRight": 25,', '    "marginBottom": 25,', '    "marginLeft": 25,', '    "pageSize": "A4"', "}" ].join("\n"),
  couchdbUrl: t.COUCHDB_URL,
  extensionSettings: {}
 };
 try {
  e.extend(r, JSON.parse(n.settings));
 } catch (i) {}
 return r;
}), function(e, t) {
 function n(e, t, n) {
  return e.addEventListener ? void e.addEventListener(t, n, !1) : void e.attachEvent("on" + t, n);
 }
 function r(e) {
  if ("keypress" == e.type) {
   var t = String.fromCharCode(e.which);
   return e.shiftKey || (t = t.toLowerCase()), t;
  }
  return _[e.which] ? _[e.which] : E[e.which] ? E[e.which] : String.fromCharCode(e.which).toLowerCase();
 }
 function i(e, t) {
  return e.sort().join(",") === t.sort().join(",");
 }
 function a(e) {
  e = e || {};
  var t, n = !1;
  for (t in M) e[t] ? n = !0 : M[t] = 0;
  n || (L = !1);
 }
 function o(e, t, n, r, a, o) {
  var s, l, c = [], u = n.type;
  if (!N[e]) return [];
  for ("keyup" == u && h(e) && (t = [ e ]), s = 0; s < N[e].length; ++s) if (l = N[e][s], 
  (r || !l.seq || M[l.seq] == l.level) && u == l.action && ("keypress" == u && !n.metaKey && !n.ctrlKey || i(t, l.modifiers))) {
   var d = !r && l.combo == a, p = r && l.seq == r && l.level == o;
   (d || p) && N[e].splice(s, 1), c.push(l);
  }
  return c;
 }
 function s(e) {
  var t = [];
  return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), 
  e.metaKey && t.push("meta"), t;
 }
 function l(e) {
  return e.preventDefault ? void e.preventDefault() : void (e.returnValue = !1);
 }
 function c(e) {
  return e.stopPropagation ? void e.stopPropagation() : void (e.cancelBubble = !0);
 }
 function u(e, t, n, r) {
  P.stopCallback(t, t.target || t.srcElement, n, r) || e(t, n) === !1 && (l(t), c(t));
 }
 function d(e, t, n) {
  var r, i = o(e, t, n), s = {}, l = 0, c = !1;
  for (r = 0; r < i.length; ++r) i[r].seq && (l = Math.max(l, i[r].level));
  for (r = 0; r < i.length; ++r) if (i[r].seq) {
   if (i[r].level != l) continue;
   c = !0, s[i[r].seq] = 1, u(i[r].callback, n, i[r].combo, i[r].seq);
  } else c || u(i[r].callback, n, i[r].combo);
  var d = "keypress" == n.type && A;
  n.type != L || h(e) || d || a(s), A = c && "keydown" == n.type;
 }
 function p(e) {
  "number" != typeof e.which && (e.which = e.keyCode);
  var t = r(e);
  if (t) return "keyup" == e.type && I === t ? void (I = !1) : void P.handleKey(t, s(e), e);
 }
 function h(e) {
  return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
 }
 function f() {
  clearTimeout(C), C = setTimeout(a, 1e3);
 }
 function m() {
  if (!S) {
   S = {};
   for (var e in _) e > 95 && 112 > e || _.hasOwnProperty(e) && (S[_[e]] = e);
  }
  return S;
 }
 function g(e, t, n) {
  return n || (n = m()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), 
  n;
 }
 function b(e, t, n, i) {
  function o(t) {
   return function() {
    L = t, ++M[e], f();
   };
  }
  function s(t) {
   u(n, t, e), "keyup" !== i && (I = r(t)), setTimeout(a, 10);
  }
  M[e] = 0;
  for (var l = 0; l < t.length; ++l) {
   var c = l + 1 === t.length, d = c ? s : o(i || y(t[l + 1]).action);
   x(t[l], d, i, e, l);
  }
 }
 function v(e) {
  return "+" === e ? [ "+" ] : e.split("+");
 }
 function y(e, t) {
  var n, r, i, a = [];
  for (n = v(e), i = 0; i < n.length; ++i) r = n[i], T[r] && (r = T[r]), t && "keypress" != t && k[r] && (r = k[r], 
  a.push("shift")), h(r) && a.push(r);
  return t = g(r, a, t), {
   key: r,
   modifiers: a,
   action: t
  };
 }
 function x(e, t, n, r, i) {
  D[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
  var a, s = e.split(" ");
  return s.length > 1 ? void b(e, s, t, n) : (a = y(e, n), N[a.key] = N[a.key] || [], 
  o(a.key, a.modifiers, {
   type: a.action
  }, r, e, i), void N[a.key][r ? "unshift" : "push"]({
   callback: t,
   modifiers: a.modifiers,
   action: a.action,
   seq: r,
   level: i,
   combo: e
  }));
 }
 function w(e, t, n) {
  for (var r = 0; r < e.length; ++r) x(e[r], t, n);
 }
 for (var S, C, _ = {
  8: "backspace",
  9: "tab",
  13: "enter",
  16: "shift",
  17: "ctrl",
  18: "alt",
  20: "capslock",
  27: "esc",
  32: "space",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  45: "ins",
  46: "del",
  91: "meta",
  93: "meta",
  224: "meta"
 }, E = {
  106: "*",
  107: "+",
  109: "-",
  110: ".",
  111: "/",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
 }, k = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
  "|": "\\"
 }, T = {
  option: "alt",
  command: "meta",
  "return": "enter",
  escape: "esc",
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
 }, N = {}, D = {}, M = {}, I = !1, A = !1, L = !1, R = 1; 20 > R; ++R) _[111 + R] = "f" + R;
 for (R = 0; 9 >= R; ++R) _[R + 96] = R;
 n(t, "keypress", p), n(t, "keydown", p), n(t, "keyup", p);
 var P = {
  bind: function(e, t, n) {
   return e = e instanceof Array ? e : [ e ], w(e, t, n), this;
  },
  unbind: function(e, t) {
   return P.bind(e, function() {}, t);
  },
  trigger: function(e, t) {
   return D[e + ":" + t] && D[e + ":" + t]({}, e), this;
  },
  reset: function() {
   return N = {}, D = {}, this;
  },
  stopCallback: function(e, t) {
   return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.isContentEditable;
  },
  handleKey: d
 };
 e.Mousetrap = P, "function" == typeof define && define.amd && define("mousetrap", P);
}(window, document), define("logger", [], function() {
 var e = {
  log: function() {},
  info: function() {},
  warn: function() {},
  error: function() {}
 };
 return /(\?|&)console($|&)/.test(location.search) ? console : e;
}), define("classes/Extension", [], function() {
 function e(e, t, n, r) {
  this.extensionId = e, this.extensionName = t, this.isOptional = n, this.disableInViewer = r;
 }
 return e;
}), define("text", [ "module" ], function(e) {
 var t, n, r, i, a, o = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, c = "undefined" != typeof location && location.href, u = c && location.protocol && location.protocol.replace(/\:/, ""), d = c && location.hostname, p = c && (location.port || void 0), h = {}, f = e.config && e.config() || {};
 return t = {
  version: "2.0.13",
  strip: function(e) {
   if (e) {
    e = e.replace(s, "");
    var t = e.match(l);
    t && (e = t[1]);
   } else e = "";
   return e;
  },
  jsEscape: function(e) {
   return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029");
  },
  createXhr: f.createXhr || function() {
   var e, t, n;
   if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest();
   if ("undefined" != typeof ActiveXObject) for (t = 0; 3 > t; t += 1) {
    n = o[t];
    try {
     e = new ActiveXObject(n);
    } catch (r) {}
    if (e) {
     o = [ n ];
     break;
    }
   }
   return e;
  },
  parseName: function(e) {
   var t, n, r, i = !1, a = e.lastIndexOf("."), o = 0 === e.indexOf("./") || 0 === e.indexOf("../");
   return -1 !== a && (!o || a > 1) ? (t = e.substring(0, a), n = e.substring(a + 1)) : t = e, 
   r = n || t, a = r.indexOf("!"), -1 !== a && (i = "strip" === r.substring(a + 1), 
   r = r.substring(0, a), n ? n = r : t = r), {
    moduleName: t,
    ext: n,
    strip: i
   };
  },
  xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
  useXhr: function(e, n, r, i) {
   var a, o, s, l = t.xdRegExp.exec(e);
   return l ? (a = l[2], o = l[3], o = o.split(":"), s = o[1], o = o[0], !(a && a !== n || o && o.toLowerCase() !== r.toLowerCase() || (s || o) && s !== i)) : !0;
  },
  finishLoad: function(e, n, r, i) {
   r = n ? t.strip(r) : r, f.isBuild && (h[e] = r), i(r);
  },
  load: function(e, n, r, i) {
   if (i && i.isBuild && !i.inlineText) return void r();
   f.isBuild = i && i.isBuild;
   var a = t.parseName(e), o = a.moduleName + (a.ext ? "." + a.ext : ""), s = n.toUrl(o), l = f.useXhr || t.useXhr;
   return 0 === s.indexOf("empty:") ? void r() : void (!c || l(s, u, d, p) ? t.get(s, function(n) {
    t.finishLoad(e, a.strip, n, r);
   }, function(e) {
    r.error && r.error(e);
   }) : n([ o ], function(e) {
    t.finishLoad(a.moduleName + "." + a.ext, a.strip, e, r);
   }));
  },
  write: function(e, n, r) {
   if (h.hasOwnProperty(n)) {
    var i = t.jsEscape(h[n]);
    r.asModule(e + "!" + n, "define(function () { return '" + i + "';});\n");
   }
  },
  writeFile: function(e, n, r, i, a) {
   var o = t.parseName(n), s = o.ext ? "." + o.ext : "", l = o.moduleName + s, c = r.toUrl(o.moduleName + s) + ".js";
   t.load(l, r, function() {
    var n = function(e) {
     return i(c, e);
    };
    n.asModule = function(e, t) {
     return i.asModule(e, c, t);
    }, t.write(e, l, n, a);
   }, a);
  }
 }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (n = require.nodeRequire("fs"), 
 t.get = function(e, t, r) {
  try {
   var i = n.readFileSync(e, "utf8");
   "﻿" === i[0] && (i = i.substring(1)), t(i);
  } catch (a) {
   r && r(a);
  }
 }) : "xhr" === f.env || !f.env && t.createXhr() ? t.get = function(e, n, r, i) {
  var a, o = t.createXhr();
  if (o.open("GET", e, !0), i) for (a in i) i.hasOwnProperty(a) && o.setRequestHeader(a.toLowerCase(), i[a]);
  f.onXhr && f.onXhr(o, e), o.onreadystatechange = function() {
   var t, i;
   4 === o.readyState && (t = o.status || 0, t > 399 && 600 > t ? (i = new Error(e + " HTTP status: " + t), 
   i.xhr = o, r && r(i)) : n(o.responseText), f.onXhrComplete && f.onXhrComplete(o, e));
  }, o.send(null);
 } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function(e, t) {
  var n, r, i = "utf-8", a = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a), i)), l = "";
  try {
   for (n = new java.lang.StringBuffer(), r = s.readLine(), r && r.length() && 65279 === r.charAt(0) && (r = r.substring(1)), 
   null !== r && n.append(r); null !== (r = s.readLine()); ) n.append(o), n.append(r);
   l = String(n.toString());
  } finally {
   s.close();
  }
  t(l);
 } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (r = Components.classes, 
 i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), 
 a = "@mozilla.org/windows-registry-key;1" in r, t.get = function(e, t) {
  var n, o, s, l = {};
  a && (e = e.replace(/\//g, "\\")), s = new FileUtils.File(e);
  try {
   n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), 
   n.init(s, 1, 0, !1), o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), 
   o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), 
   o.readString(n.available(), l), o.close(), n.close(), t(l.value);
  } catch (c) {
   throw new Error((s && s.path || "") + ": " + c);
  }
 }), t;
}), define("text!html/settingsExtensionsAccordion.html", [], function() {
 return '<div class="panel">\n	<div class="accordion-heading">\n		<div class="checkbox pull-right">\n			<label> <input id="input-enable-extension-<%= extensionId %>"\n				type="checkbox"<% if(!isOptional) print(\'disabled\') %>>\n				enabled\n			</label>\n		</div>\n		<a data-toggle="collapse" data-parent=".accordion-extensions"\n			class="accordion-toggle collapsed" href="#accordion-extensions-collapse-<%= extensionId %>">\n			<%= extensionName %> <i class="icon-up-dir"></i></a>\n	</div>\n	<div id="accordion-extensions-collapse-<%= extensionId %>" class="collapse">\n		<div class="accordion-inner clearfix"><%= settingsBlock %></div>\n	</div>\n</div>\n';
}), function() {
 var e = function(e, t, n, r) {
  this.rawMessage = e, this.parsedLine = void 0 !== t ? t : -1, this.snippet = void 0 !== n ? n : null, 
  this.parsedFile = void 0 !== r ? r : null, this.updateRepr(), this.message = e;
 };
 e.prototype = {
  name: "YamlParseException",
  message: null,
  parsedFile: null,
  parsedLine: -1,
  snippet: null,
  rawMessage: null,
  isDefined: function(e) {
   return void 0 != e && null != e;
  },
  getSnippet: function() {
   return this.snippet;
  },
  setSnippet: function(e) {
   this.snippet = e, this.updateRepr();
  },
  getParsedFile: function() {
   return this.parsedFile;
  },
  setParsedFile: function(e) {
   this.parsedFile = e, this.updateRepr();
  },
  getParsedLine: function() {
   return this.parsedLine;
  },
  setParsedLine: function(e) {
   this.parsedLine = e, this.updateRepr();
  },
  updateRepr: function() {
   this.message = this.rawMessage;
   var e = !1;
   "." === this.message.charAt(this.message.length - 1) && (this.message = this.message.substring(0, this.message.length - 1), 
   e = !0), null !== this.parsedFile && (this.message += " in " + JSON.stringify(this.parsedFile)), 
   this.parsedLine >= 0 && (this.message += " at line " + this.parsedLine), this.snippet && (this.message += ' (near "' + this.snippet + '")'), 
   e && (this.message += ".");
  }
 };
 var t = !1, n = function() {};
 n.prototype = {
  parseFile: function(t, r) {
   if (null == r) {
    var i = this.getFileContents(t), a = null;
    try {
     a = this.parse(i);
    } catch (o) {
     throw o instanceof e && o.setParsedFile(t), o;
    }
    return a;
   }
   this.getFileContents(t, function(e) {
    r(new n().parse(e));
   });
  },
  parse: function(e) {
   var t = new a();
   return t.parse(e);
  },
  dump: function(e, t, n) {
   null == t && (t = 2);
   var r = new s();
   return n && (r.numSpacesForIndentation = n), r.dump(e, t);
  },
  getXHR: function() {
   if (window.XMLHttpRequest) return new XMLHttpRequest();
   if (window.ActiveXObject) for (var e = [ "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP" ], t = 0; 4 > t; t++) try {
    return new ActiveXObject(e[t]);
   } catch (n) {}
   return null;
  },
  getFileContents: function(e, n) {
   if (t) {
    var r = require("fs");
    if (null == n) {
     var i = r.readFileSync(e);
     return null == i ? null : "" + i;
    }
    r.readFile(e, function(e, t) {
     n(e ? null : t);
    });
   } else {
    var a = this.getXHR();
    if (null == n) return a.open("GET", e, !1), a.send(null), 200 == a.status || 0 == a.status ? a.responseText : null;
    a.onreadystatechange = function() {
     4 == a.readyState && n(200 == a.status || 0 == a.status ? a.responseText : null);
    }, a.open("GET", e, !0), a.send(null);
   }
  }
 };
 var r = {
  stringify: function(e, t, r) {
   return new n().dump(e, t, r);
  },
  parse: function(e) {
   return new n().parse(e);
  },
  load: function(e, t) {
   return new n().parseFile(e, t);
  }
 };
 "undefined" != typeof exports && "undefined" != typeof module && module.exports && (exports = module.exports = r, 
 t = !0, function() {
  var e = function(e, t) {
   e.exports = r.load(t);
  };
  void 0 !== require.extensions && (require.extensions[".yml"] = e, require.extensions[".yaml"] = e);
 }()), "undefined" != typeof window && (window.YAML = r);
 var i = function() {};
 i.prototype = {
  i: null,
  parse: function(t) {
   var n = null;
   if (t = this.trim(t), 0 == t.length) return "";
   switch (t.charAt(0)) {
   case "[":
    n = this.parseSequence(t);
    break;

   case "{":
    n = this.parseMapping(t);
    break;

   default:
    n = this.parseScalar(t);
   }
   if ("" != t.substr(this.i + 1).replace(/^\s*#.*$/, "")) throw console.log("oups " + t.substr(this.i + 1)), 
   new e('Unexpected characters near "' + t.substr(this.i) + '".');
   return n;
  },
  dump: function(e) {
   if (void 0 == e || null == e) return "null";
   if (e instanceof Date) return e.toISOString();
   if ("object" == typeof e) return this.dumpObject(e);
   if ("boolean" == typeof e) return e ? "true" : "false";
   if (/^\d+$/.test(e)) return "string" == typeof e ? "'" + e + "'" : parseInt(e);
   if (this.isNumeric(e)) return "string" == typeof e ? "'" + e + "'" : parseFloat(e);
   if ("number" == typeof e) return 1/0 == e ? ".Inf" : e == -1/0 ? "-.Inf" : isNaN(e) ? ".NAN" : e;
   var t = new YamlEscaper();
   return t.requiresDoubleQuoting(e) ? t.escapeWithDoubleQuotes(e) : t.requiresSingleQuoting(e) ? t.escapeWithSingleQuotes(e) : "" == e ? '""' : this.getTimestampRegex().test(e) ? "'" + e + "'" : this.inArray(e.toLowerCase(), [ "null", "~", "true", "false" ]) ? "'" + e + "'" : e;
  },
  dumpObject: function(e) {
   var t, n = this.getKeys(e), r = null, i = n.length;
   if (e instanceof Array) {
    for (r = [], t = 0; i > t; t++) r.push(this.dump(e[n[t]]));
    return "[" + r.join(", ") + "]";
   }
   for (r = [], t = 0; i > t; t++) r.push(this.dump(n[t]) + ": " + this.dump(e[n[t]]));
   return "{ " + r.join(", ") + " }";
  },
  parseScalar: function(t, n, r, i, a) {
   void 0 == n && (n = null), void 0 == r && (r = [ '"', "'" ]), void 0 == i && (i = 0), 
   void 0 == a && (a = !0);
   var o = null, s = null, l = null;
   if (this.inArray(t[i], r)) {
    if (o = this.parseQuotedScalar(t, i), i = this.i, null !== n) {
     var c = t.substr(i).replace(/^\s+/, "");
     if (!this.inArray(c.charAt(0), n)) throw new e("Unexpected characters (" + t.substr(i) + ").");
    }
   } else {
    if (n) {
     if (!(l = new RegExp("^(.+?)(" + n.join("|") + ")").exec((t + "").substring(i)))) throw new e("Malformed inline YAML string (" + t + ").");
     o = l[1], i += o.length;
    } else o = (t + "").substring(i), i += o.length, s = o.indexOf(" #"), -1 != s && (o = o.substr(0, s).replace(/\s+$/g, ""));
    o = a ? this.evaluateScalar(o) : o;
   }
   return this.i = i, o;
  },
  parseQuotedScalar: function(t, n) {
   var r = null;
   if (!(r = new RegExp("^" + i.REGEX_QUOTED_STRING).exec((t + "").substring(n)))) throw new e("Malformed inline YAML string (" + (t + "").substring(n) + ").");
   var a = r[0].substr(1, r[0].length - 2), s = new o();
   return a = '"' == (t + "").charAt(n) ? s.unescapeDoubleQuotedString(a) : s.unescapeSingleQuotedString(a), 
   n += r[0].length, this.i = n, a;
  },
  parseSequence: function(t, n) {
   void 0 == n && (n = 0);
   var r = [], i = t.length;
   for (n += 1; i > n; ) {
    switch (t.charAt(n)) {
    case "[":
     r.push(this.parseSequence(t, n)), n = this.i;
     break;

    case "{":
     r.push(this.parseMapping(t, n)), n = this.i;
     break;

    case "]":
     return this.i = n, r;

    case ",":
    case " ":
     break;

    default:
     var a = this.inArray(t.charAt(n), [ '"', "'" ]), o = this.parseScalar(t, [ ",", "]" ], [ '"', "'" ], n);
     if (n = this.i, !a && -1 != (o + "").indexOf(": ")) try {
      o = this.parseMapping("{" + o + "}");
     } catch (s) {
      if (!(s instanceof e)) throw s;
     }
     r.push(o), n--;
    }
    n++;
   }
   throw new e('Malformed inline YAML string "' + t + '"');
  },
  parseMapping: function(t, n) {
   void 0 == n && (n = 0);
   var r = {}, i = t.length;
   n += 1;
   for (var a = !1, o = !1; i > n; ) {
    switch (o = !1, t.charAt(n)) {
    case " ":
    case ",":
     n++, o = !0;
     break;

    case "}":
     return this.i = n, r;
    }
    if (!o) {
     var s = this.parseScalar(t, [ ":", " " ], [ '"', "'" ], n, !1);
     for (n = this.i, a = !1; i > n; ) {
      switch (t.charAt(n)) {
      case "[":
       r[s] = this.parseSequence(t, n), n = this.i, a = !0;
       break;

      case "{":
       r[s] = this.parseMapping(t, n), n = this.i, a = !0;
       break;

      case ":":
      case " ":
       break;

      default:
       r[s] = this.parseScalar(t, [ ",", "}" ], [ '"', "'" ], n), n = this.i, a = !0, n--;
      }
      if (++n, a) {
       o = !0;
       break;
      }
     }
    }
   }
   throw new e('Malformed inline YAML string "' + t + '"');
  },
  evaluateScalar: function(e) {
   e = this.trim(e);
   var t = null, n = null;
   return "null" == e.toLowerCase() || "" == e || "~" == e ? null : 0 == (e + "").indexOf("!str ") ? ("" + e).substring(5) : 0 == (e + "").indexOf("! ") ? parseInt(this.parseScalar((e + "").substr(2))) : /^\d+$/.test(e) ? (t = e, 
   n = parseInt(e), "0" == e.charAt(0) ? this.octdec(e) : "" + t == "" + n ? n : t) : "true" == (e + "").toLowerCase() ? !0 : "false" == (e + "").toLowerCase() ? !1 : this.isNumeric(e) ? "0x" == (e + "").substr(0, 2) ? this.hexdec(e) : parseFloat(e) : ".inf" == e.toLowerCase() ? 1/0 : ".nan" == e.toLowerCase() ? 0/0 : "-.inf" == e.toLowerCase() ? -1/0 : /^(-|\+)?[0-9,]+(\.[0-9]+)?$/.test(e) ? parseFloat(e.split(",").join("")) : this.getTimestampRegex().test(e) ? new Date(this.strtotime(e)) : "" + e;
  },
  getTimestampRegex: function() {
   return new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[ 	]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:.([0-9]*))?(?:[ 	]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$", "gi");
  },
  trim: function(e) {
   return (e + "").replace(/^\s+/, "").replace(/\s+$/, "");
  },
  isNumeric: function(e) {
   return e - 0 == e && e.length > 0 && "" != e.replace(/\s+/g, "");
  },
  inArray: function(e, t) {
   var n, r = t.length;
   for (n = 0; r > n; n++) if (e == t[n]) return !0;
   return !1;
  },
  getKeys: function(e) {
   var t = [];
   for (var n in e) e.hasOwnProperty(n) && t.push(n);
   return t;
  },
  octdec: function(e) {
   return parseInt((e + "").replace(/[^0-7]/gi, ""), 8);
  },
  hexdec: function(e) {
   return e = this.trim(e), "0x" == (e + "").substr(0, 2) && (e = (e + "").substring(2)), 
   parseInt((e + "").replace(/[^a-f0-9]/gi, ""), 16);
  },
  strtotime: function(e, t) {
   var n, r, i, a, o = "";
   if (e = (e + "").replace(/\s{2,}|^\s|\s$/g, " ").replace(/[\t\r\n]/g, ""), "now" === e) return null === t || isNaN(t) ? new Date().getTime() || 0 : t || 0;
   if (!isNaN(o = Date.parse(e))) return o || 0;
   t = t ? new Date(t) : new Date(), e = e.toLowerCase();
   var s = {
    day: {
     sun: 0,
     mon: 1,
     tue: 2,
     wed: 3,
     thu: 4,
     fri: 5,
     sat: 6
    },
    mon: [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ]
   }, l = function(e) {
    var n = e[2] && "ago" === e[2], r = (r = "last" === e[0] ? -1 : 1) * (n ? -1 : 1);
    switch (e[0]) {
    case "last":
    case "next":
     switch (e[1].substring(0, 3)) {
     case "yea":
      t.setFullYear(t.getFullYear() + r);
      break;

     case "wee":
      t.setDate(t.getDate() + 7 * r);
      break;

     case "day":
      t.setDate(t.getDate() + r);
      break;

     case "hou":
      t.setHours(t.getHours() + r);
      break;

     case "min":
      t.setMinutes(t.getMinutes() + r);
      break;

     case "sec":
      t.setSeconds(t.getSeconds() + r);
      break;

     case "mon":
      if ("month" === e[1]) {
       t.setMonth(t.getMonth() + r);
       break;
      }

     default:
      var i = s.day[e[1].substring(0, 3)];
      if ("undefined" != typeof i) {
       var a = i - t.getDay();
       0 === a ? a = 7 * r : a > 0 ? "last" === e[0] && (a -= 7) : "next" === e[0] && (a += 7), 
       t.setDate(t.getDate() + a), t.setHours(0, 0, 0, 0);
      }
     }
     break;

    default:
     if (!/\d+/.test(e[0])) return !1;
     switch (r *= parseInt(e[0], 10), e[1].substring(0, 3)) {
     case "yea":
      t.setFullYear(t.getFullYear() + r);
      break;

     case "mon":
      t.setMonth(t.getMonth() + r);
      break;

     case "wee":
      t.setDate(t.getDate() + 7 * r);
      break;

     case "day":
      t.setDate(t.getDate() + r);
      break;

     case "hou":
      t.setHours(t.getHours() + r);
      break;

     case "min":
      t.setMinutes(t.getMinutes() + r);
      break;

     case "sec":
      t.setSeconds(t.getSeconds() + r);
     }
    }
    return !0;
   };
   if (i = e.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/), 
   null !== i) return i[2] ? i[3] || (i[2] += ":00") : i[2] = "00:00:00", a = i[1].split(/-/g), 
   a[1] = s.mon[a[1] - 1] || a[1], a[0] = +a[0], a[0] = a[0] >= 0 && a[0] <= 69 ? "20" + (a[0] < 10 ? "0" + a[0] : a[0] + "") : a[0] >= 70 && a[0] <= 99 ? "19" + a[0] : a[0] + "", 
   parseInt(this.strtotime(a[2] + " " + a[1] + " " + a[0] + " " + i[2]) + (i[4] ? i[4] : ""), 10);
   var c = "([+-]?\\d+\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?";
   if (i = e.match(new RegExp(c, "gi")), null === i) return !1;
   for (n = 0, r = i.length; r > n; n++) if (!l(i[n].split(" "))) return !1;
   return t.getTime() || 0;
  }
 }, i.REGEX_QUOTED_STRING = "(?:\"(?:[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*)\"|'(?:[^']*(?:''[^']*)*)')";
 var a = function(e) {
  this.offset = void 0 !== e ? e : 0;
 };
 a.prototype = {
  offset: 0,
  lines: [],
  currentLineNb: -1,
  currentLine: "",
  refs: {},
  parse: function(t) {
   this.currentLineNb = -1, this.currentLine = "", this.lines = this.cleanup(t).split("\n");
   for (var n = null, r = null; this.moveToNextLine(); ) if (!this.isCurrentLineEmpty()) {
    if ("	" == this.currentLine.charAt(0)) throw new e("A YAML file cannot contain tabs as indentation.", this.getRealCurrentLineNb() + 1, this.currentLine);
    var o = !1, s = !1, l = !1, c = null, u = null, d = null, p = null, h = null, f = null, m = null, g = null, b = null;
    if (c = /^\-((\s+)(.+?))?\s*$/.exec(this.currentLine)) {
     if (r && "mapping" == r) throw new e("You cannot define a sequence item when in a mapping", this.getRealCurrentLineNb() + 1, this.currentLine);
     r = "sequence", this.isDefined(n) || (n = []), c = {
      leadspaces: c[2],
      value: c[3]
     }, this.isDefined(c.value) && (u = /^&([^ ]+) *(.*)/.exec(c.value)) && (u = {
      ref: u[1],
      value: u[2]
     }, o = u.ref, c.value = u.value), this.isDefined(c.value) && "" != this.trim(c.value) && "#" != c.value.replace(/^ +/, "").charAt(0) ? this.isDefined(c.leadspaces) && " " == c.leadspaces && (u = new RegExp("^(" + i.REGEX_QUOTED_STRING + "|[^ '\"{[].*?) *:(\\s+(.+?))?\\s*$").exec(c.value)) ? (u = {
      key: u[1],
      value: u[3]
     }, d = this.getRealCurrentLineNb(), p = new a(d), p.refs = this.refs, h = c.value, 
     this.isNextLineIndented() || (h += "\n" + this.getNextEmbedBlock(this.getCurrentLineIndentation() + 2)), 
     n.push(p.parse(h)), this.refs = p.refs) : n.push(this.parseValue(c.value)) : (d = this.getRealCurrentLineNb() + 1, 
     p = new a(d), p.refs = this.refs, n.push(p.parse(this.getNextEmbedBlock())), this.refs = p.refs);
    } else {
     if (!(c = new RegExp("^(" + i.REGEX_QUOTED_STRING + "|[^ '\"[{].*?) *:(\\s+(.+?))?\\s*$").exec(this.currentLine))) {
      if (2 == this.lines.length && this.isEmpty(this.lines[1])) {
       try {
        t = new i().parse(this.lines[0]);
       } catch (v) {
        throw v instanceof e && (v.setParsedLine(this.getRealCurrentLineNb() + 1), v.setSnippet(this.currentLine)), 
        v;
       }
       if (this.isObject(t)) {
        var y = t[0];
        if ("string" == typeof t && "*" == y.charAt(0)) {
         n = [], g = t.length;
         for (var x = 0; g > x; x++) n.push(this.refs[t[x].substr(1)]);
         t = n;
        }
       }
       return t;
      }
      throw new e("Unable to parse.", this.getRealCurrentLineNb() + 1, this.currentLine);
     }
     if (this.isDefined(n) || (n = {}), r && "sequence" == r) throw new e("You cannot define a mapping item when in a sequence", this.getRealCurrentLineNb() + 1, this.currentLine);
     r = "mapping", c = {
      key: c[1],
      value: c[3]
     };
     try {
      f = new i().parseScalar(c.key);
     } catch (v) {
      throw v instanceof e && (v.setParsedLine(this.getRealCurrentLineNb() + 1), v.setSnippet(this.currentLine)), 
      v;
     }
     if ("<<" == f) if (this.isDefined(c.value) && "*" == (c.value + "").charAt(0)) {
      if (s = c.value.substr(1), void 0 == this.refs[s]) throw new e('Reference "' + t + '" does not exist', this.getRealCurrentLineNb() + 1, this.currentLine);
     } else {
      t = this.isDefined(c.value) && "" != c.value ? c.value : this.getNextEmbedBlock(), 
      d = this.getRealCurrentLineNb() + 1, p = new a(d), p.refs = this.refs, m = p.parse(t), 
      this.refs = p.refs;
      var w = [];
      if (!this.isObject(m)) throw new e("YAML merge keys used with a scalar value instead of an array", this.getRealCurrentLineNb() + 1, this.currentLine);
      if (this.isDefined(m[0])) {
       b = this.reverseArray(m), g = b.length;
       for (var x = 0; g > x; x++) {
        {
         b[x];
        }
        if (!this.isObject(b[x])) throw new e("Merge items must be arrays", this.getRealCurrentLineNb() + 1, this.currentLine);
        w = this.mergeObject(b[x], w);
       }
      } else w = this.mergeObject(w, m);
      l = w;
     } else this.isDefined(c.value) && (u = /^&([^ ]+) *(.*)/.exec(c.value)) && (u = {
      ref: u[1],
      value: u[2]
     }, o = u.ref, c.value = u.value);
     l ? n = l : this.isDefined(c.value) && "" != this.trim(c.value) && "#" != this.trim(c.value).charAt(0) ? s ? n = this.refs[s] : n[f] = this.parseValue(c.value) : this.isNextLineIndented() && !this.isNextLineUnIndentedCollection() ? n[f] = null : (d = this.getRealCurrentLineNb() + 1, 
     p = new a(d), p.refs = this.refs, n[f] = p.parse(this.getNextEmbedBlock()), this.refs = p.refs);
    }
    if (o) if (n instanceof Array) this.refs[o] = n[n.length - 1]; else {
     var S = null;
     for (var C in n) n.hasOwnProperty(C) && (S = C);
     this.refs[o] = n[C];
    }
   }
   return this.isEmpty(n) ? null : n;
  },
  getRealCurrentLineNb: function() {
   return this.currentLineNb + this.offset;
  },
  getCurrentLineIndentation: function() {
   return this.currentLine.length - this.currentLine.replace(/^ +/g, "").length;
  },
  getNextEmbedBlock: function(t) {
   this.moveToNextLine();
   var n = null, r = null;
   if (this.isDefined(t)) n = t; else {
    n = this.getCurrentLineIndentation();
    var i = this.isStringUnIndentedCollectionItem(this.currentLine);
    if (!this.isCurrentLineEmpty() && 0 == n && !i) throw new e("Indentation problem A", this.getRealCurrentLineNb() + 1, this.currentLine);
   }
   var a = [ this.currentLine.substr(n) ], o = this.isStringUnIndentedCollectionItem(this.currentLine), s = -1;
   for (o === !0 && (s = 1 + /^\-((\s+)(.+?))?\s*$/.exec(this.currentLine)[2].length); this.moveToNextLine(); ) {
    if (o && !this.isStringUnIndentedCollectionItem(this.currentLine) && this.getCurrentLineIndentation() != s) {
     this.moveToPreviousLine();
     break;
    }
    if (this.isCurrentLineEmpty()) this.isCurrentLineBlank() && a.push(this.currentLine.substr(n)); else {
     r = this.getCurrentLineIndentation();
     var l;
     if (l = /^( *)$/.exec(this.currentLine)) a.push(l[1]); else {
      if (!(r >= n)) {
       if (0 == r) {
        this.moveToPreviousLine();
        break;
       }
       throw new e("Indentation problem B", this.getRealCurrentLineNb() + 1, this.currentLine);
      }
      a.push(this.currentLine.substr(n));
     }
    }
   }
   return a.join("\n");
  },
  moveToNextLine: function() {
   return this.currentLineNb >= this.lines.length - 1 ? !1 : (this.currentLineNb++, 
   this.currentLine = this.lines[this.currentLineNb], !0);
  },
  moveToPreviousLine: function() {
   this.currentLineNb--, this.currentLine = this.lines[this.currentLineNb];
  },
  parseValue: function(t) {
   if ("*" == (t + "").charAt(0)) {
    if (t = "#" == this.trim(t).charAt(0) ? (t + "").substr(1, t.indexOf("#") - 2) : (t + "").substr(1), 
    void 0 == this.refs[t]) throw new e('Reference "' + t + '" does not exist', this.getRealCurrentLineNb() + 1, this.currentLine);
    return this.refs[t];
   }
   var n = null;
   if (n = /^(\||>)(\+|\-|\d+|\+\d+|\-\d+|\d+\+|\d+\-)?( +#.*)?$/.exec(t)) {
    n = {
     separator: n[1],
     modifiers: n[2],
     comments: n[3]
    };
    var r = this.isDefined(n.modifiers) ? n.modifiers : "";
    return this.parseFoldedScalar(n.separator, r.replace(/\d+/g, ""), Math.abs(parseInt(r)));
   }
   try {
    return new i().parse(t);
   } catch (a) {
    throw a instanceof e && (a.setParsedLine(this.getRealCurrentLineNb() + 1), a.setSnippet(this.currentLine)), 
    a;
   }
  },
  parseFoldedScalar: function(e, t, n) {
   void 0 == t && (t = ""), void 0 == n && (n = 0), e = "|" == e ? "\n" : " ";
   for (var r = "", i = null, a = this.moveToNextLine(); a && this.isCurrentLineBlank(); ) r += "\n", 
   a = this.moveToNextLine();
   if (!a) return "";
   var o = null;
   if (!(o = new RegExp("^(" + (n ? this.strRepeat(" ", n) : " +") + ")(.*)$").exec(this.currentLine))) return this.moveToPreviousLine(), 
   "";
   o = {
    indent: o[1],
    text: o[2]
   };
   var s = o.indent, l = 0;
   for (r += o.text + e; this.currentLineNb + 1 < this.lines.length; ) if (this.moveToNextLine(), 
   o = new RegExp("^( {" + s.length + ",})(.+)$").exec(this.currentLine)) o = {
    indent: o[1],
    text: o[2]
   }, " " == e && l != o.indent && (r = r.substr(0, r.length - 1) + "\n"), l = o.indent, 
   i = o.indent.length - s.length, r += this.strRepeat(" ", i) + o.text + (0 != i ? "\n" : e); else {
    if (!(o = /^( *)$/.exec(this.currentLine))) {
     this.moveToPreviousLine();
     break;
    }
    r += o[1].replace(new RegExp("^ {1," + s.length + "}", "g"), "") + "\n";
   }
   switch (" " == e && (r = r.replace(/ (\n*)$/g, "\n$1")), t) {
   case "":
    r = r.replace(/\n+$/g, "\n");
    break;

   case "+":
    break;

   case "-":
    r = r.replace(/\n+$/g, "");
   }
   return r;
  },
  isNextLineIndented: function() {
   for (var e = this.getCurrentLineIndentation(), t = this.moveToNextLine(); t && this.isCurrentLineEmpty(); ) t = this.moveToNextLine();
   if (0 == t) return !1;
   var n = !1;
   return this.getCurrentLineIndentation() <= e && (n = !0), this.moveToPreviousLine(), 
   n;
  },
  isCurrentLineEmpty: function() {
   return this.isCurrentLineBlank() || this.isCurrentLineComment();
  },
  isCurrentLineBlank: function() {
   return "" == this.trim(this.currentLine);
  },
  isCurrentLineComment: function() {
   var e = this.currentLine.replace(/^ +/g, "");
   return "#" == e.charAt(0);
  },
  cleanup: function(e) {
   e = e.split("\r\n").join("\n").split("\r").join("\n"), /\n$/.test(e) || (e += "\n");
   for (var t = 0, n = /^\%YAML[: ][\d\.]+.*\n/; n.test(e); ) e = e.replace(n, ""), 
   t++;
   if (this.offset += t, n = /^(#.*?\n)+/, n.test(e)) {
    var r = e.replace(n, "");
    this.offset += this.subStrCount(e, "\n") - this.subStrCount(r, "\n"), e = r;
   }
   return n = /^\-\-\-.*?\n/, n.test(e) && (r = e.replace(n, ""), this.offset += this.subStrCount(e, "\n") - this.subStrCount(r, "\n"), 
   e = r, e = e.replace(/\.\.\.\s*$/g, "")), e;
  },
  isNextLineUnIndentedCollection: function() {
   for (var e = this.getCurrentLineIndentation(), t = this.moveToNextLine(); t && this.isCurrentLineEmpty(); ) t = this.moveToNextLine();
   if (!1 === t) return !1;
   var n = !1;
   return this.getCurrentLineIndentation() == e && this.isStringUnIndentedCollectionItem(this.currentLine) && (n = !0), 
   this.moveToPreviousLine(), n;
  },
  isStringUnIndentedCollectionItem: function() {
   return 0 === this.currentLine.indexOf("- ");
  },
  isObject: function(e) {
   return "object" == typeof e && this.isDefined(e);
  },
  isEmpty: function(e) {
   return void 0 == e || null == e || "" == e || 0 == e || "0" == e || 0 == e;
  },
  isDefined: function(e) {
   return void 0 != e && null != e;
  },
  reverseArray: function(e) {
   for (var t = [], n = e.length, r = n - 1; r >= 0; r--) t.push(e[r]);
   return t;
  },
  merge: function(e, t) {
   var n, r = {};
   for (n in e) e.hasOwnProperty(n) && (/^\d+$/.test(n) ? r.push(e) : r[n] = e[n]);
   for (n in t) t.hasOwnProperty(n) && (/^\d+$/.test(n) ? r.push(t) : r[n] = t[n]);
   return r;
  },
  strRepeat: function(e, t) {
   var n, r = "";
   for (n = 0; t > n; n++) r += e;
   return r;
  },
  subStrCount: function(e, t, n, r) {
   var i = 0;
   e = "" + e, t = "" + t, void 0 != n && (e = e.substr(n)), void 0 != r && (e = e.substr(0, r));
   for (var a = e.length, o = t.length, s = 0; a > s; s++) t == e.substr(s, o) && i++, 
   s += o - 1;
   return i;
  },
  trim: function(e) {
   return (e + "").replace(/^ +/, "").replace(/ +$/, "");
  }
 }, YamlEscaper = function() {}, YamlEscaper.prototype = {
  requiresDoubleQuoting: function(e) {
   return new RegExp(YamlEscaper.REGEX_CHARACTER_TO_ESCAPE).test(e);
  },
  escapeWithDoubleQuotes: function(e) {
   e += "";
   for (var t = YamlEscaper.escapees.length, n = YamlEscaper.escaped.length, r = YamlEscaper.escaped, i = 0; t > i; ++i) i >= n && r.push("");
   var a = "";
   return a = e.replace(new RegExp(YamlEscaper.escapees.join("|"), "g"), function(e) {
    for (var n = 0; t > n; ++n) if (e == YamlEscaper.escapees[n]) return r[n];
   }), '"' + a + '"';
  },
  requiresSingleQuoting: function(e) {
   return /[\s'":{}[\],&*#?]|^[-?|<>=!%@`]/.test(e);
  },
  escapeWithSingleQuotes: function(e) {
   return "'" + e.replace(/'/g, "''") + "'";
  }
 }, YamlEscaper.REGEX_CHARACTER_TO_ESCAPE = "[\\x00-\\x1f]|Â|Â |â¨|â©", YamlEscaper.escapees = [ "\\\\", '\\"', '"', "\x00", "", "", "", "", "", "", "", "\b", "	", "\n", "", "\f", "\r", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Â", "Â ", "â¨", "â©" ], 
 YamlEscaper.escaped = [ '\\"', "\\\\", '\\"', "\\0", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\a", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r", "\\x0e", "\\x0f", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1a", "\\e", "\\x1c", "\\x1d", "\\x1e", "\\x1f", "\\N", "\\_", "\\L", "\\P" ];
 var o = function() {};
 o.prototype = {
  unescapeSingleQuotedString: function(e) {
   return e.replace(/''/g, "'");
  },
  unescapeDoubleQuotedString: function(e) {
   var t = function(e) {
    return new o().unescapeCharacter(e);
   };
   return e.replace(new RegExp(o.REGEX_ESCAPED_CHARACTER, "g"), t);
  },
  unescapeCharacter: function(e) {
   switch (e.charAt(1)) {
   case "0":
    return String.fromCharCode(0);

   case "a":
    return String.fromCharCode(7);

   case "b":
    return String.fromCharCode(8);

   case "t":
    return "	";

   case "	":
    return "	";

   case "n":
    return "\n";

   case "v":
    return String.fromCharCode(11);

   case "f":
    return String.fromCharCode(12);

   case "r":
    return String.fromCharCode(13);

   case "e":
    return "";

   case " ":
    return " ";

   case '"':
    return '"';

   case "/":
    return "/";

   case "\\":
    return "\\";

   case "N":
    return "\x00";

   case "_":
    return "\x00 ";

   case "L":
    return " (";

   case "P":
    return " )";

   case "x":
    return this.pack("n", new i().hexdec(e.substr(2, 2)));

   case "u":
    return this.pack("n", new i().hexdec(e.substr(2, 4)));

   case "U":
    return this.pack("N", new i().hexdec(e.substr(2, 8)));
   }
  },
  pack: function(e) {
   for (var t, n, r = 0, i = 1, a = "", o = 0; r < e.length; ) {
    for (t = e.charAt(r), n = "", r++; r < e.length && null !== e.charAt(r).match(/[\d\*]/); ) n += e.charAt(r), 
    r++;
    switch ("" === n && (n = "1"), t) {
    case "n":
     if ("*" === n && (n = arguments.length - i), n > arguments.length - i) throw new Error("Warning:  pack() Type " + t + ": too few arguments");
     for (o = 0; n > o; o++) a += String.fromCharCode(arguments[i] >> 8 & 255), a += String.fromCharCode(255 & arguments[i]), 
     i++;
     break;

    case "N":
     if ("*" === n && (n = arguments.length - i), n > arguments.length - i) throw new Error("Warning:  pack() Type " + t + ": too few arguments");
     for (o = 0; n > o; o++) a += String.fromCharCode(arguments[i] >> 24 & 255), a += String.fromCharCode(arguments[i] >> 16 & 255), 
     a += String.fromCharCode(arguments[i] >> 8 & 255), a += String.fromCharCode(255 & arguments[i]), 
     i++;
     break;

    default:
     throw new Error("Warning:  pack() Type " + t + ": unknown format code");
    }
   }
   if (i < arguments.length) throw new Error("Warning: pack(): " + (arguments.length - i) + " arguments unused");
   return a;
  }
 }, o.REGEX_ESCAPED_CHARACTER = '\\\\([0abt	nvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})';
 var s = function() {};
 s.prototype = {
  dump: function(e, t, n) {
   null == t && (t = 0), null == n && (n = 0);
   var r, a = "", o = n ? this.strRepeat(" ", n) : "";
   if (this.numSpacesForIndentation || (this.numSpacesForIndentation = 2), 0 >= t || !this.isObject(e) || this.isEmpty(e)) r = new i(), 
   a += o + r.dump(e); else {
    var s, l = !this.arrayEquals(this.getKeys(e), this.range(0, e.length - 1));
    for (var c in e) e.hasOwnProperty(c) && (s = 0 >= t - 1 || !this.isObject(e[c]) || this.isEmpty(e[c]), 
    l && (r = new i()), a += o + "" + (l ? r.dump(c) + ":" : "-") + (s ? " " : "\n") + this.dump(e[c], t - 1, s ? 0 : n + this.numSpacesForIndentation) + (s ? "\n" : ""));
   }
   return a;
  },
  strRepeat: function(e, t) {
   var n, r = "";
   for (n = 0; t > n; n++) r += e;
   return r;
  },
  isObject: function(e) {
   return this.isDefined(e) && "object" == typeof e;
  },
  isEmpty: function(e) {
   var t = void 0 == e || null == e || "" == e || 0 == e || "0" == e || 0 == e;
   if (!(t || "object" != typeof e || e instanceof Array)) {
    var n = 0;
    for (var r in e) e.hasOwnProperty(r) && n++;
    t = !n;
   }
   return t;
  },
  isDefined: function(e) {
   return void 0 != e && null != e;
  },
  getKeys: function(e) {
   var t = [];
   for (var n in e) e.hasOwnProperty(n) && t.push(n);
   return t;
  },
  range: function(e, t) {
   if (e > t) return [];
   for (var n = [], r = e; t >= r; r++) n.push(r);
   return n;
  },
  arrayEquals: function(e, t) {
   if (e.length != t.length) return !1;
   for (var n = e.length, r = 0; n > r; r++) if (e[r] != t[r]) return !1;
   return !0;
  }
 };
}(), define("yaml-js", function(e) {
 return function() {
  var t;
  return t || e.YAML;
 };
}(this)), define("extensions/yamlFrontMatterParser", [ "underscore", "classes/Extension", "yaml-js" ], function(e, t, n) {
 function r(t, r) {
  if (t === o) {
   var i = s.exec(r), a = i[1], l = i[2];
   if (l) {
    if (!o.frontMatter || o.frontMatter._frontMatter != a) {
     o.frontMatter = void 0;
     try {
      o.frontMatter = n.parse(l), e.isObject(o.frontMatter) || (o.frontMatter = void 0), 
      o.frontMatter._yaml = l, o.frontMatter._frontMatter = a;
     } catch (c) {}
    }
   } else o.frontMatter = void 0;
  }
 }
 var i, a = new t("yamlFrontMatterParser", "YAML front matter");
 a.onEventMgrCreated = function(e) {
  i = e;
 };
 var o;
 a.onFileSelected = function(e) {
  o = e;
 };
 var s = /^(\s*-{3}\s*\n([\w\W]+?)\n\s*-{3}\s*?\n)?([\w\W]*)$/;
 return a.onFileOpen = r, a.onContentChanged = r, a;
}), define("text!html/markdownExtraSettingsBlock.html", [], function() {
 return '<p>Adds extra features to the original Markdown syntax.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-sm-4 control-label" for="input-markdownextra-tables">Tables</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-tables">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-deflist">Definition lists</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-deflist">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-attrlist">Special attributes</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-attrlist">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-footnotes">Footnotes</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-footnotes">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-comments">Comments</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-comments">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-smartypants">SmartyPants</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-smartypants">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-newlines">GFM newlines</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-newlines">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-intraword">GFM intra-word stars/underscores</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-intraword">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-strikethrough">GFM strikethrough</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-strikethrough">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-fencedcodegfm">GFM fenced code\n			blocks</label>\n		<div class="col-sm-7">\n			<div class="checkbox">\n				<input type="checkbox" id="input-markdownextra-fencedcodegfm">\n			</div>\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label"\n			for="input-markdownextra-highlighter">Syntax highlighter</label>\n		<div class="col-sm-7">\n			<select id="input-markdownextra-highlighter" class="form-control"><option>None</option>\n				<option value="prettify">Prettify</option>\n				<option value="highlight">Highlight.js</option>\n			</select>\n		</div>\n	</div>\n</div>\n<span class="help-block pull-right"><a target="_blank"\n	href="https://github.com/jmcmanus/pagedown-extra">More info</a></span>';
});

var IN_GLOBAL_SCOPE = !0;

window.PR_SHOULD_USE_CONTINUATION = !0;

var prettyPrintOne, prettyPrint;

!function() {
 function e(e) {
  function t(e) {
   var t = e.charCodeAt(0);
   if (92 !== t) return t;
   var n = e.charAt(1);
   return t = d[n], t ? t : n >= "0" && "7" >= n ? parseInt(e.substring(1), 8) : "u" === n || "x" === n ? parseInt(e.substring(2), 16) : e.charCodeAt(1);
  }
  function n(e) {
   if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
   var t = String.fromCharCode(e);
   return "\\" === t || "-" === t || "]" === t || "^" === t ? "\\" + t : t;
  }
  function r(e) {
   var r = e.substring(1, e.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), i = [], a = "^" === r[0], o = [ "[" ];
   a && o.push("^");
   for (var s = a ? 1 : 0, l = r.length; l > s; ++s) {
    var c = r[s];
    if (/\\[bdsw]/i.test(c)) o.push(c); else {
     var u, d = t(c);
     l > s + 2 && "-" === r[s + 1] ? (u = t(r[s + 2]), s += 2) : u = d, i.push([ d, u ]), 
     65 > u || d > 122 || (65 > u || d > 90 || i.push([ 32 | Math.max(65, d), 32 | Math.min(u, 90) ]), 
     97 > u || d > 122 || i.push([ -33 & Math.max(97, d), -33 & Math.min(u, 122) ]));
    }
   }
   i.sort(function(e, t) {
    return e[0] - t[0] || t[1] - e[1];
   });
   for (var p = [], h = [], s = 0; s < i.length; ++s) {
    var f = i[s];
    f[0] <= h[1] + 1 ? h[1] = Math.max(h[1], f[1]) : p.push(h = f);
   }
   for (var s = 0; s < p.length; ++s) {
    var f = p[s];
    o.push(n(f[0])), f[1] > f[0] && (f[1] + 1 > f[0] && o.push("-"), o.push(n(f[1])));
   }
   return o.push("]"), o.join("");
  }
  function i(e) {
   for (var t = e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), i = t.length, s = [], l = 0, c = 0; i > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c; else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && (c >= d ? s[d] = -1 : t[l] = n(d));
    }
   }
   for (var l = 1; l < s.length; ++l) -1 === s[l] && (s[l] = ++a);
   for (var l = 0, c = 0; i > l; ++l) {
    var u = t[l];
    if ("(" === u) ++c, s[c] || (t[l] = "(?:"); else if ("\\" === u.charAt(0)) {
     var d = +u.substring(1);
     d && c >= d && (t[l] = "\\" + s[d]);
    }
   }
   for (var l = 0; i > l; ++l) "^" === t[l] && "^" !== t[l + 1] && (t[l] = "");
   if (e.ignoreCase && o) for (var l = 0; i > l; ++l) {
    var u = t[l], p = u.charAt(0);
    u.length >= 2 && "[" === p ? t[l] = r(u) : "\\" !== p && (t[l] = u.replace(/[a-zA-Z]/g, function(e) {
     var t = e.charCodeAt(0);
     return "[" + String.fromCharCode(-33 & t, 32 | t) + "]";
    }));
   }
   return t.join("");
  }
  for (var a = 0, o = !1, s = !1, l = 0, c = e.length; c > l; ++l) {
   var u = e[l];
   if (u.ignoreCase) s = !0; else if (/[a-z]/i.test(u.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
    o = !0, s = !1;
    break;
   }
  }
  for (var d = {
   b: 8,
   t: 9,
   n: 10,
   v: 11,
   f: 12,
   r: 13
  }, p = [], l = 0, c = e.length; c > l; ++l) {
   var u = e[l];
   if (u.global || u.multiline) throw new Error("" + u);
   p.push("(?:" + i(u) + ")");
  }
  return new RegExp(p.join("|"), s ? "gi" : "g");
 }
 function t(e, t) {
  function n(e) {
   var l = e.nodeType;
   if (1 == l) {
    if (r.test(e.className)) return;
    for (var c = e.firstChild; c; c = c.nextSibling) n(c);
    var u = e.nodeName.toLowerCase();
    ("br" === u || "li" === u) && (i[s] = "\n", o[s << 1] = a++, o[s++ << 1 | 1] = e);
   } else if (3 == l || 4 == l) {
    var d = e.nodeValue;
    d.length && (d = t ? d.replace(/\r\n?/g, "\n") : d.replace(/[ \t\r\n]+/g, " "), 
    i[s] = d, o[s << 1] = a, a += d.length, o[s++ << 1 | 1] = e);
   }
  }
  var r = /(?:^|\s)nocode(?:\s|$)/, i = [], a = 0, o = [], s = 0;
  return n(e), {
   sourceCode: i.join("").replace(/\n$/, ""),
   spans: o
  };
 }
 function n(e, t, n, r) {
  if (t) {
   var i = {
    sourceCode: t,
    basePos: e
   };
   n(i), r.push.apply(r, i.decorations);
  }
 }
 function r(e) {
  for (var t = void 0, n = e.firstChild; n; n = n.nextSibling) {
   var r = n.nodeType;
   t = 1 === r ? t ? e : n : 3 === r && H.test(n.nodeValue) ? e : t;
  }
  return t === e ? void 0 : t;
 }
 function i(t, r) {
  var i, a = {};
  !function() {
   for (var n = t.concat(r), o = [], s = {}, l = 0, c = n.length; c > l; ++l) {
    var u = n[l], d = u[3];
    if (d) for (var p = d.length; --p >= 0; ) a[d.charAt(p)] = u;
    var h = u[1], f = "" + h;
    s.hasOwnProperty(f) || (o.push(h), s[f] = null);
   }
   o.push(/[\0-\uffff]/), i = e(o);
  }();
  var o = r.length, s = function(e) {
   for (var t = e.sourceCode, l = e.basePos, u = [ l, P ], d = 0, p = t.match(i) || [], h = {}, f = 0, m = p.length; m > f; ++f) {
    var g, b = p[f], v = h[b], y = void 0;
    if ("string" == typeof v) g = !1; else {
     var x = a[b.charAt(0)];
     if (x) y = b.match(x[1]), v = x[0]; else {
      for (var w = 0; o > w; ++w) if (x = r[w], y = b.match(x[1])) {
       v = x[0];
       break;
      }
      y || (v = P);
     }
     g = v.length >= 5 && "lang-" === v.substring(0, 5), !g || y && "string" == typeof y[1] || (g = !1, 
     v = B), g || (h[b] = v);
    }
    var S = d;
    if (d += b.length, g) {
     var C = y[1], _ = b.indexOf(C), E = _ + C.length;
     y[2] && (E = b.length - y[2].length, _ = E - C.length);
     var k = v.substring(5);
     n(l + S, b.substring(0, _), s, u), n(l + S + _, C, c(k, C), u), n(l + S + E, b.substring(E), s, u);
    } else u.push(l + S, v);
   }
   e.decorations = u;
  };
  return s;
 }
 function a(e) {
  var t = [], n = [];
  t.push(e.tripleQuotedStrings ? [ D, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\"" ] : e.multiLineStrings ? [ D, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`" ] : [ D, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'" ]), 
  e.verbatimStrings && n.push([ D, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null ]);
  var r = e.hashComments;
  r && (e.cStyleComments ? (t.push(r > 1 ? [ I, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#" ] : [ I, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#" ]), 
  n.push([ D, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null ])) : t.push([ I, /^#[^\r\n]*/, null, "#" ])), 
  e.cStyleComments && (n.push([ I, /^\/\/[^\r\n]*/, null ]), n.push([ I, /^\/\*[\s\S]*?(?:\*\/|$)/, null ]));
  var a = e.regexLiterals;
  if (a) {
   var o = a > 1 ? "" : "\n\r", s = o ? "." : "[\\S\\s]", l = "/(?=[^/*" + o + "])(?:[^/\\x5B\\x5C" + o + "]|\\x5C" + s + "|\\x5B(?:[^\\x5C\\x5D" + o + "]|\\x5C" + s + ")*(?:\\x5D|$))+/";
   n.push([ "lang-regex", RegExp("^" + U + "(" + l + ")") ]);
  }
  var c = e.types;
  c && n.push([ A, c ]);
  var u = ("" + e.keywords).replace(/^ | $/g, "");
  u.length && n.push([ M, new RegExp("^(?:" + u.replace(/[\s,]+/g, "|") + ")\\b"), null ]), 
  t.push([ P, /^\s+/, null, " \r\n	 " ]);
  var d = "^.[^\\s\\w.$@'\"`/\\\\]*";
  return e.regexLiterals && (d += "(?!s*/)"), n.push([ L, /^@[a-z_$][a-z_$@0-9]*/i, null ], [ A, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null ], [ P, /^[a-z_$][a-z_$@0-9]*/i, null ], [ L, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789" ], [ P, /^\\[\s\S]?/, null ], [ R, new RegExp(d), null ]), 
  i(t, n);
 }
 function o(e, t, n) {
  function r(e) {
   var t = e.nodeType;
   if (1 != t || a.test(e.className)) {
    if ((3 == t || 4 == t) && n) {
     var l = e.nodeValue, c = l.match(o);
     if (c) {
      var u = l.substring(0, c.index);
      e.nodeValue = u;
      var d = l.substring(c.index + c[0].length);
      if (d) {
       var p = e.parentNode;
       p.insertBefore(s.createTextNode(d), e.nextSibling);
      }
      i(e), u || e.parentNode.removeChild(e);
     }
    }
   } else if ("br" === e.nodeName) i(e), e.parentNode && e.parentNode.removeChild(e); else for (var h = e.firstChild; h; h = h.nextSibling) r(h);
  }
  function i(e) {
   function t(e, n) {
    var r = n ? e.cloneNode(!1) : e, i = e.parentNode;
    if (i) {
     var a = t(i, 1), o = e.nextSibling;
     a.appendChild(r);
     for (var s = o; s; s = o) o = s.nextSibling, a.appendChild(s);
    }
    return r;
   }
   for (;!e.nextSibling; ) if (e = e.parentNode, !e) return;
   for (var n, r = t(e.nextSibling, 0); (n = r.parentNode) && 1 === n.nodeType; ) r = n;
   c.push(r);
  }
  for (var a = /(?:^|\s)nocode(?:\s|$)/, o = /\r\n?|\n/, s = e.ownerDocument, l = s.createElement("li"); e.firstChild; ) l.appendChild(e.firstChild);
  for (var c = [ l ], u = 0; u < c.length; ++u) r(c[u]);
  t === (0 | t) && c[0].setAttribute("value", t);
  var d = s.createElement("ol");
  d.className = "linenums";
  for (var p = Math.max(0, t - 1 | 0) || 0, u = 0, h = c.length; h > u; ++u) l = c[u], 
  l.className = "L" + (u + p) % 10, l.firstChild || l.appendChild(s.createTextNode(" ")), 
  d.appendChild(l);
  e.appendChild(d);
 }
 function s(e) {
  var t = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
  t = t && +t[1] <= 8;
  var n = /\n/g, r = e.sourceCode, i = r.length, a = 0, o = e.spans, s = o.length, l = 0, c = e.decorations, u = c.length, d = 0;
  c[u] = i;
  var p, h;
  for (h = p = 0; u > h; ) c[h] !== c[h + 2] ? (c[p++] = c[h++], c[p++] = c[h++]) : h += 2;
  for (u = p, h = p = 0; u > h; ) {
   for (var f = c[h], m = c[h + 1], g = h + 2; u >= g + 2 && c[g + 1] === m; ) g += 2;
   c[p++] = f, c[p++] = m, h = g;
  }
  u = c.length = p;
  var b, v = e.sourceNode;
  v && (b = v.style.display, v.style.display = "none");
  try {
   for (;s > l; ) {
    var y, x = (o[l], o[l + 2] || i), w = c[d + 2] || i, g = Math.min(x, w), S = o[l + 1];
    if (1 !== S.nodeType && (y = r.substring(a, g))) {
     t && (y = y.replace(n, "\r")), S.nodeValue = y;
     var C = S.ownerDocument, _ = C.createElement("span");
     _.className = c[d + 1];
     var E = S.parentNode;
     E.replaceChild(_, S), _.appendChild(S), x > a && (o[l + 1] = S = C.createTextNode(r.substring(g, x)), 
     E.insertBefore(S, _.nextSibling));
    }
    a = g, a >= x && (l += 2), a >= w && (d += 2);
   }
  } finally {
   v && (v.style.display = b);
  }
 }
 function l(e, t) {
  for (var n = t.length; --n >= 0; ) {
   var r = t[n];
   q.hasOwnProperty(r) ? h.console && console.warn("cannot override language handler %s", r) : q[r] = e;
  }
 }
 function c(e, t) {
  return e && q.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), 
  q[e];
 }
 function u(e) {
  var n = e.langExtension;
  try {
   var r = t(e.sourceNode, e.pre), i = r.sourceCode;
   e.sourceCode = i, e.spans = r.spans, e.basePos = 0, c(n, i)(e), s(e);
  } catch (a) {
   h.console && console.log(a && a.stack || a);
  }
 }
 function d(e, t, n) {
  var r = document.createElement("div");
  r.innerHTML = "<pre>" + e + "</pre>", r = r.firstChild, n && o(r, n, !0);
  var i = {
   langExtension: t,
   numberLines: n,
   sourceNode: r,
   pre: 1
  };
  return u(i), r.innerHTML;
 }
 function p(e, t) {
  function n(e) {
   return a.getElementsByTagName(e);
  }
  function i() {
   for (var t = h.PR_SHOULD_USE_CONTINUATION ? m.now() + 250 : 1/0; b < c.length && m.now() < t; b++) {
    for (var n = c[b], a = _, l = n; l = l.previousSibling; ) {
     var d = l.nodeType, p = (7 === d || 8 === d) && l.nodeValue;
     if (p ? !/^\??prettify\b/.test(p) : 3 !== d || /\S/.test(l.nodeValue)) break;
     if (p) {
      a = {}, p.replace(/\b(\w+)=([\w:.%+-]+)/g, function(e, t, n) {
       a[t] = n;
      });
      break;
     }
    }
    var f = n.className;
    if ((a !== _ || y.test(f)) && !x.test(f)) {
     for (var E = !1, k = n.parentNode; k; k = k.parentNode) {
      var T = k.tagName;
      if (C.test(T) && k.className && y.test(k.className)) {
       E = !0;
       break;
      }
     }
     if (!E) {
      n.className += " prettyprinted";
      var N = a.lang;
      if (!N) {
       N = f.match(v);
       var D;
       !N && (D = r(n)) && S.test(D.tagName) && (N = D.className.match(v)), N && (N = N[1]);
      }
      var M;
      if (w.test(n.tagName)) M = 1; else {
       var I = n.currentStyle, A = s.defaultView, L = I ? I.whiteSpace : A && A.getComputedStyle ? A.getComputedStyle(n, null).getPropertyValue("white-space") : 0;
       M = L && "pre" === L.substring(0, 3);
      }
      var R = a.linenums;
      (R = "true" === R || +R) || (R = f.match(/\blinenums\b(?::(\d+))?/), R = R ? R[1] && R[1].length ? +R[1] : !0 : !1), 
      R && o(n, R, M), g = {
       langExtension: N,
       sourceNode: n,
       numberLines: R,
       pre: M
      }, u(g);
     }
    }
   }
   b < c.length ? setTimeout(i, 250) : "function" == typeof e && e();
  }
  for (var a = t || document.body, s = a.ownerDocument || document, l = [ n("pre"), n("code"), n("xmp") ], c = [], d = 0; d < l.length; ++d) for (var p = 0, f = l[d].length; f > p; ++p) c.push(l[d][p]);
  l = null;
  var m = Date;
  m.now || (m = {
   now: function() {
    return +new Date();
   }
  });
  var g, b = 0, v = /\blang(?:uage)?-([\w.]+)(?!\S)/, y = /\bprettyprint\b/, x = /\bprettyprinted\b/, w = /pre|xmp/i, S = /^code$/i, C = /^(?:pre|code|xmp)$/i, _ = {};
  i();
 }
 var h = window, f = [ "break,continue,do,else,for,if,return,while" ], m = [ f, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile" ], g = [ m, "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof" ], b = [ g, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where" ], v = [ g, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient" ], y = [ v, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where" ], x = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", w = [ g, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN" ], S = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", C = [ f, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None" ], _ = [ f, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END" ], E = [ f, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use" ], k = [ f, "case,done,elif,esac,eval,fi,function,in,local,set,then,until" ], T = [ b, y, w, S, C, _, k ], N = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, D = "str", M = "kwd", I = "com", A = "typ", L = "lit", R = "pun", P = "pln", F = "tag", O = "dec", B = "src", $ = "atn", G = "atv", j = "nocode", U = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*", H = /\S/, z = a({
  keywords: T,
  hashComments: !0,
  cStyleComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), q = {};
 l(z, [ "default-code" ]), l(i([], [ [ P, /^[^<?]+/ ], [ O, /^<!\w[^>]*(?:>|$)/ ], [ I, /^<\!--[\s\S]*?(?:-\->|$)/ ], [ "lang-", /^<\?([\s\S]+?)(?:\?>|$)/ ], [ "lang-", /^<%([\s\S]+?)(?:%>|$)/ ], [ R, /^(?:<[%?]|[%?]>)/ ], [ "lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i ], [ "lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i ], [ "lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i ], [ "lang-in.tag", /^(<\/?[a-z][^<>]*>)/i ] ]), [ "default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl" ]), 
 l(i([ [ P, /^[\s]+/, null, " 	\r\n" ], [ G, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'" ] ], [ [ F, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i ], [ $, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i ], [ "lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/ ], [ R, /^[=<>\/]+/ ], [ "lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i ], [ "lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i ], [ "lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i ], [ "lang-css", /^style\s*=\s*\"([^\"]+)\"/i ], [ "lang-css", /^style\s*=\s*\'([^\']+)\'/i ], [ "lang-css", /^style\s*=\s*([^\"\'>\s]+)/i ] ]), [ "in.tag" ]), 
 l(i([], [ [ G, /^[\s\S]+/ ] ]), [ "uq.val" ]), l(a({
  keywords: b,
  hashComments: !0,
  cStyleComments: !0,
  types: N
 }), [ "c", "cc", "cpp", "cxx", "cyc", "m" ]), l(a({
  keywords: "null,true,false"
 }), [ "json" ]), l(a({
  keywords: y,
  hashComments: !0,
  cStyleComments: !0,
  verbatimStrings: !0,
  types: N
 }), [ "cs" ]), l(a({
  keywords: v,
  cStyleComments: !0
 }), [ "java" ]), l(a({
  keywords: k,
  hashComments: !0,
  multiLineStrings: !0
 }), [ "bash", "bsh", "csh", "sh" ]), l(a({
  keywords: C,
  hashComments: !0,
  multiLineStrings: !0,
  tripleQuotedStrings: !0
 }), [ "cv", "py", "python" ]), l(a({
  keywords: S,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: 2
 }), [ "perl", "pl", "pm" ]), l(a({
  keywords: _,
  hashComments: !0,
  multiLineStrings: !0,
  regexLiterals: !0
 }), [ "rb", "ruby" ]), l(a({
  keywords: w,
  cStyleComments: !0,
  regexLiterals: !0
 }), [ "javascript", "js" ]), l(a({
  keywords: x,
  hashComments: 3,
  cStyleComments: !0,
  multilineStrings: !0,
  tripleQuotedStrings: !0,
  regexLiterals: !0
 }), [ "coffee" ]), l(a({
  keywords: E,
  cStyleComments: !0,
  multilineStrings: !0
 }), [ "rc", "rs", "rust" ]), l(i([], [ [ D, /^[\s\S]+/ ] ]), [ "regex" ]);
 var V = h.PR = {
  createSimpleLexer: i,
  registerLangHandler: l,
  sourceDecorator: a,
  PR_ATTRIB_NAME: $,
  PR_ATTRIB_VALUE: G,
  PR_COMMENT: I,
  PR_DECLARATION: O,
  PR_KEYWORD: M,
  PR_LITERAL: L,
  PR_NOCODE: j,
  PR_PLAIN: P,
  PR_PUNCTUATION: R,
  PR_SOURCE: B,
  PR_STRING: D,
  PR_TAG: F,
  PR_TYPE: A,
  prettyPrintOne: IN_GLOBAL_SCOPE ? h.prettyPrintOne = d : prettyPrintOne = d,
  prettyPrint: prettyPrint = IN_GLOBAL_SCOPE ? h.prettyPrint = p : prettyPrint = p
 };
 "function" == typeof define && define.amd && define("google-code-prettify", [], function() {
  return V;
 });
}();

var hljs = new function() {
 function e(e) {
  return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
 }
 function t(e) {
  return e.nodeName.toLowerCase();
 }
 function n(e, t) {
  var n = e && e.exec(t);
  return n && 0 == n.index;
 }
 function r(e) {
  return Array.prototype.map.call(e.childNodes, function(e) {
   return 3 == e.nodeType ? v.useBR ? e.nodeValue.replace(/\n/g, "") : e.nodeValue : "br" == t(e) ? "\n" : r(e);
  }).join("");
 }
 function i(e) {
  var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
  return t = t.map(function(e) {
   return e.replace(/^language-/, "");
  }), t.filter(function(e) {
   return b(e) || "no-highlight" == e;
  })[0];
 }
 function a(e, t) {
  var n = {};
  for (var r in e) n[r] = e[r];
  if (t) for (var r in t) n[r] = t[r];
  return n;
 }
 function o(e) {
  var n = [];
  return function r(e, i) {
   for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? i += a.nodeValue.length : "br" == t(a) ? i += 1 : 1 == a.nodeType && (n.push({
    event: "start",
    offset: i,
    node: a
   }), i = r(a, i), n.push({
    event: "stop",
    offset: i,
    node: a
   }));
   return i;
  }(e, 0), n;
 }
 function s(n, r, i) {
  function a() {
   return n.length && r.length ? n[0].offset != r[0].offset ? n[0].offset < r[0].offset ? n : r : "start" == r[0].event ? n : r : n.length ? n : r;
  }
  function o(n) {
   function r(t) {
    return " " + t.nodeName + '="' + e(t.value) + '"';
   }
   u += "<" + t(n) + Array.prototype.map.call(n.attributes, r).join("") + ">";
  }
  function s(e) {
   u += "</" + t(e) + ">";
  }
  function l(e) {
   ("start" == e.event ? o : s)(e.node);
  }
  for (var c = 0, u = "", d = []; n.length || r.length; ) {
   var p = a();
   if (u += e(i.substr(c, p[0].offset - c)), c = p[0].offset, p == n) {
    d.reverse().forEach(s);
    do l(p.splice(0, 1)[0]), p = a(); while (p == n && p.length && p[0].offset == c);
    d.reverse().forEach(o);
   } else "start" == p[0].event ? d.push(p[0].node) : d.pop(), l(p.splice(0, 1)[0]);
  }
  return u + e(i.substr(c));
 }
 function l(e) {
  function t(e) {
   return e && e.source || e;
  }
  function n(n, r) {
   return RegExp(t(n), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
  }
  function r(i, o) {
   function s(t, n) {
    e.cI && (n = n.toLowerCase()), n.split(" ").forEach(function(e) {
     var n = e.split("|");
     l[n[0]] = [ t, n[1] ? Number(n[1]) : 1 ];
    });
   }
   if (!i.compiled) {
    if (i.compiled = !0, i.k = i.k || i.bK, i.k) {
     var l = {};
     "string" == typeof i.k ? s("keyword", i.k) : Object.keys(i.k).forEach(function(e) {
      s(e, i.k[e]);
     }), i.k = l;
    }
    i.lR = n(i.l || /\b[A-Za-z0-9_]+\b/, !0), o && (i.bK && (i.b = i.bK.split(" ").join("|")), 
    i.b || (i.b = /\B|\b/), i.bR = n(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = n(i.e)), 
    i.tE = t(i.e) || "", i.eW && o.tE && (i.tE += (i.e ? "|" : "") + o.tE)), i.i && (i.iR = n(i.i)), 
    void 0 === i.r && (i.r = 1), i.c || (i.c = []);
    var c = [];
    i.c.forEach(function(e) {
     e.v ? e.v.forEach(function(t) {
      c.push(a(e, t));
     }) : c.push("self" == e ? i : e);
    }), i.c = c, i.c.forEach(function(e) {
     r(e, i);
    }), i.starts && r(i.starts, o);
    var u = i.c.map(function(e) {
     return e.bK ? "\\.?\\b(" + e.b + ")\\b\\.?" : e.b;
    }).concat([ i.tE ]).concat([ i.i ]).map(t).filter(Boolean);
    i.t = u.length ? n(u.join("|"), !0) : {
     exec: function() {
      return null;
     }
    }, i.continuation = {};
   }
  }
  r(e);
 }
 function c(t, r, i, a) {
  function o(e, t) {
   for (var r = 0; r < t.c.length; r++) if (n(t.c[r].bR, e)) return t.c[r];
  }
  function s(e, t) {
   return n(e.eR, t) ? e : e.eW ? s(e.parent, t) : void 0;
  }
  function d(e, t) {
   return !i && n(t.iR, e);
  }
  function p(e, t) {
   var n = S.cI ? t[0].toLowerCase() : t[0];
   return e.k.hasOwnProperty(n) && e.k[n];
  }
  function h(e, t, n, r) {
   var i = r ? "" : v.classPrefix, a = '<span class="' + i, o = n ? "" : "</span>";
   return a += e + '">', a + t + o;
  }
  function f() {
   var t = e(k);
   if (!C.k) return t;
   var n = "", r = 0;
   C.lR.lastIndex = 0;
   for (var i = C.lR.exec(t); i; ) {
    n += t.substr(r, i.index - r);
    var a = p(C, i);
    a ? (T += a[1], n += h(a[0], i[0])) : n += i[0], r = C.lR.lastIndex, i = C.lR.exec(t);
   }
   return n + t.substr(r);
  }
  function m() {
   if (C.sL && !y[C.sL]) return e(k);
   var t = C.sL ? c(C.sL, k, !0, C.continuation.top) : u(k);
   return C.r > 0 && (T += t.r), "continuous" == C.subLanguageMode && (C.continuation.top = t.top), 
   h(t.language, t.value, !1, !0);
  }
  function g() {
   return void 0 !== C.sL ? m() : f();
  }
  function x(t, n) {
   var r = t.cN ? h(t.cN, "", !0) : "";
   t.rB ? (_ += r, k = "") : t.eB ? (_ += e(n) + r, k = "") : (_ += r, k = n), C = Object.create(t, {
    parent: {
     value: C
    }
   });
  }
  function w(t, n) {
   if (k += t, void 0 === n) return _ += g(), 0;
   var r = o(n, C);
   if (r) return _ += g(), x(r, n), r.rB ? 0 : n.length;
   var i = s(C, n);
   if (i) {
    var a = C;
    a.rE || a.eE || (k += n), _ += g();
    do C.cN && (_ += "</span>"), T += C.r, C = C.parent; while (C != i.parent);
    return a.eE && (_ += e(n)), k = "", i.starts && x(i.starts, ""), a.rE ? 0 : n.length;
   }
   if (d(n, C)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (C.cN || "<unnamed>") + '"');
   return k += n, n.length || 1;
  }
  var S = b(t);
  if (!S) throw new Error('Unknown language: "' + t + '"');
  l(S);
  for (var C = a || S, _ = "", E = C; E != S; E = E.parent) E.cN && (_ = h(E.cN, _, !0));
  var k = "", T = 0;
  try {
   for (var N, D, M = 0; ;) {
    if (C.t.lastIndex = M, N = C.t.exec(r), !N) break;
    D = w(r.substr(M, N.index - M), N[0]), M = N.index + D;
   }
   w(r.substr(M));
   for (var E = C; E.parent; E = E.parent) E.cN && (_ += "</span>");
   return {
    r: T,
    value: _,
    language: t,
    top: C
   };
  } catch (I) {
   if (-1 != I.message.indexOf("Illegal")) return {
    r: 0,
    value: e(r)
   };
   throw I;
  }
 }
 function u(t, n) {
  n = n || v.languages || Object.keys(y);
  var r = {
   r: 0,
   value: e(t)
  }, i = r;
  return n.forEach(function(e) {
   if (b(e)) {
    var n = c(e, t, !1);
    n.language = e, n.r > i.r && (i = n), n.r > r.r && (i = r, r = n);
   }
  }), i.language && (r.second_best = i), r;
 }
 function d(e) {
  return v.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
   return t.replace(/\t/g, v.tabReplace);
  })), v.useBR && (e = e.replace(/\n/g, "<br>")), e;
 }
 function p(e) {
  var t = r(e), n = i(e);
  if ("no-highlight" != n) {
   var a = n ? c(n, t, !0) : u(t), l = o(e);
   if (l.length) {
    var p = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
    p.innerHTML = a.value, a.value = s(l, o(p), t);
   }
   a.value = d(a.value), e.innerHTML = a.value, e.className += " hljs " + (!n && a.language || ""), 
   e.result = {
    language: a.language,
    re: a.r
   }, a.second_best && (e.second_best = {
    language: a.second_best.language,
    re: a.second_best.r
   });
  }
 }
 function h(e) {
  v = a(v, e);
 }
 function f() {
  if (!f.called) {
   f.called = !0;
   var e = document.querySelectorAll("pre code");
   Array.prototype.forEach.call(e, p);
  }
 }
 function m() {
  addEventListener("DOMContentLoaded", f, !1), addEventListener("load", f, !1);
 }
 function g(e, t) {
  var n = y[e] = t(this);
  n.aliases && n.aliases.forEach(function(t) {
   x[t] = e;
  });
 }
 function b(e) {
  return y[e] || y[x[e]];
 }
 var v = {
  classPrefix: "hljs-",
  tabReplace: null,
  useBR: !1,
  languages: void 0
 }, y = {}, x = {};
 this.highlight = c, this.highlightAuto = u, this.fixMarkup = d, this.highlightBlock = p, 
 this.configure = h, this.initHighlighting = f, this.initHighlightingOnLoad = m, 
 this.registerLanguage = g, this.getLanguage = b, this.inherit = a, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", 
 this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", 
 this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", 
 this.BE = {
  b: "\\\\[\\s\\S]",
  r: 0
 }, this.ASM = {
  cN: "string",
  b: "'",
  e: "'",
  i: "\\n",
  c: [ this.BE ]
 }, this.QSM = {
  cN: "string",
  b: '"',
  e: '"',
  i: "\\n",
  c: [ this.BE ]
 }, this.CLCM = {
  cN: "comment",
  b: "//",
  e: "$"
 }, this.CBLCLM = {
  cN: "comment",
  b: "/\\*",
  e: "\\*/"
 }, this.HCM = {
  cN: "comment",
  b: "#",
  e: "$"
 }, this.NM = {
  cN: "number",
  b: this.NR,
  r: 0
 }, this.CNM = {
  cN: "number",
  b: this.CNR,
  r: 0
 }, this.BNM = {
  cN: "number",
  b: this.BNR,
  r: 0
 }, this.REGEXP_MODE = {
  cN: "regexp",
  b: /\//,
  e: /\/[gim]*/,
  i: /\n/,
  c: [ this.BE, {
   b: /\[/,
   e: /\]/,
   r: 0,
   c: [ this.BE ]
  } ]
 }, this.TM = {
  cN: "title",
  b: this.IR,
  r: 0
 }, this.UTM = {
  cN: "title",
  b: this.UIR,
  r: 0
 };
}();

hljs.registerLanguage("bash", function(e) {
 var t = {
  cN: "variable",
  v: [ {
   b: /\$[\w\d#@][\w\d_]*/
  }, {
   b: /\$\{(.*?)\}/
  } ]
 }, n = {
  cN: "string",
  b: /"/,
  e: /"/,
  c: [ e.BE, t, {
   cN: "variable",
   b: /\$\(/,
   e: /\)/,
   c: [ e.BE ]
  } ]
 }, r = {
  cN: "string",
  b: /'/,
  e: /'/
 };
 return {
  l: /-?[a-z\.]+/,
  k: {
   keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
   literal: "true false",
   built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
   operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
  },
  c: [ {
   cN: "shebang",
   b: /^#![^\n]+sh\s*$/,
   r: 10
  }, {
   cN: "function",
   b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
   rB: !0,
   c: [ e.inherit(e.TM, {
    b: /\w[\w\d_]*/
   }) ],
   r: 0
  }, e.HCM, e.NM, n, r, t ]
 };
}), hljs.registerLanguage("fix", function() {
 return {
  c: [ {
   b: /[^\u2401\u0001]+/,
   e: /[\u2401\u0001]/,
   eE: !0,
   rB: !0,
   rE: !1,
   c: [ {
    b: /([^\u2401\u0001=]+)/,
    e: /=([^\u2401\u0001=]+)/,
    rE: !0,
    rB: !1,
    cN: "attribute"
   }, {
    b: /=/,
    e: /([\u2401\u0001])/,
    eE: !0,
    eB: !0,
    cN: "string"
   } ]
  } ],
  cI: !0
 };
}), hljs.registerLanguage("erlang", function(e) {
 var t = "[a-z'][a-zA-Z0-9_']*", n = "(" + t + ":" + t + "|" + t + ")", r = {
  keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun let not of orelse|10 query receive rem try when xor",
  literal: "false true"
 }, i = {
  cN: "comment",
  b: "%",
  e: "$",
  r: 0
 }, a = {
  cN: "number",
  b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
  r: 0
 }, o = {
  b: "fun\\s+" + t + "/\\d+"
 }, s = {
  b: n + "\\(",
  e: "\\)",
  rB: !0,
  r: 0,
  c: [ {
   cN: "function_name",
   b: n,
   r: 0
  }, {
   b: "\\(",
   e: "\\)",
   eW: !0,
   rE: !0,
   r: 0
  } ]
 }, l = {
  cN: "tuple",
  b: "{",
  e: "}",
  r: 0
 }, c = {
  cN: "variable",
  b: "\\b_([A-Z][A-Za-z0-9_]*)?",
  r: 0
 }, u = {
  cN: "variable",
  b: "[A-Z][a-zA-Z0-9_]*",
  r: 0
 }, d = {
  b: "#" + e.UIR,
  r: 0,
  rB: !0,
  c: [ {
   cN: "record_name",
   b: "#" + e.UIR,
   r: 0
  }, {
   b: "{",
   e: "}",
   r: 0
  } ]
 }, p = {
  bK: "fun receive if try case",
  e: "end",
  k: r
 };
 p.c = [ i, o, e.inherit(e.ASM, {
  cN: ""
 }), p, s, e.QSM, a, l, c, u, d ];
 var h = [ i, o, p, s, e.QSM, a, l, c, u, d ];
 s.c[1].c = h, l.c = h, d.c[1].c = h;
 var f = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  c: h
 };
 return {
  k: r,
  i: "(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))",
  c: [ {
   cN: "function",
   b: "^" + t + "\\s*\\(",
   e: "->",
   rB: !0,
   i: "\\(|#|//|/\\*|\\\\|:|;",
   c: [ f, e.inherit(e.TM, {
    b: t
   }) ],
   starts: {
    e: ";|\\.",
    k: r,
    c: h
   }
  }, i, {
   cN: "pp",
   b: "^-",
   e: "\\.",
   r: 0,
   eE: !0,
   rB: !0,
   l: "-" + e.IR,
   k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior",
   c: [ f ]
  }, a, e.QSM, d, c, u, l ]
 };
}), hljs.registerLanguage("cs", function(e) {
 var t = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
 return {
  k: t,
  c: [ {
   cN: "comment",
   b: "///",
   e: "$",
   rB: !0,
   c: [ {
    cN: "xmlDocTag",
    b: "///|<!--|-->"
   }, {
    cN: "xmlDocTag",
    b: "</?",
    e: ">"
   } ]
  }, e.CLCM, e.CBLCLM, {
   cN: "preprocessor",
   b: "#",
   e: "$",
   k: "if else elif endif define undef warning error line region endregion pragma checksum"
  }, {
   cN: "string",
   b: '@"',
   e: '"',
   c: [ {
    b: '""'
   } ]
  }, e.ASM, e.QSM, e.CNM, {
   bK: "protected public private internal",
   e: /[{;=]/,
   k: t,
   c: [ {
    bK: "class namespace interface",
    starts: {
     c: [ e.TM ]
    }
   }, {
    b: e.IR + "\\s*\\(",
    rB: !0,
    c: [ e.TM ]
   } ]
  } ]
 };
}), hljs.registerLanguage("brainfuck", function() {
 var e = {
  cN: "literal",
  b: "[\\+\\-]",
  r: 0
 };
 return {
  c: [ {
   cN: "comment",
   b: "[^\\[\\]\\.,\\+\\-<> \r\n]",
   rE: !0,
   e: "[\\[\\]\\.,\\+\\-<> \r\n]",
   r: 0
  }, {
   cN: "title",
   b: "[\\[\\]]",
   r: 0
  }, {
   cN: "string",
   b: "[\\.,]",
   r: 0
  }, {
   b: /\+\+|\-\-/,
   rB: !0,
   c: [ e ]
  }, e ]
 };
}), hljs.registerLanguage("ruby", function(e) {
 var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor", r = {
  cN: "yardoctag",
  b: "@[A-Za-z]+"
 }, i = {
  cN: "comment",
  v: [ {
   b: "#",
   e: "$",
   c: [ r ]
  }, {
   b: "^\\=begin",
   e: "^\\=end",
   c: [ r ],
   r: 10
  }, {
   b: "^__END__",
   e: "\\n$"
  } ]
 }, a = {
  cN: "subst",
  b: "#\\{",
  e: "}",
  k: n
 }, o = {
  cN: "string",
  c: [ e.BE, a ],
  v: [ {
   b: /'/,
   e: /'/
  }, {
   b: /"/,
   e: /"/
  }, {
   b: "%[qw]?\\(",
   e: "\\)"
  }, {
   b: "%[qw]?\\[",
   e: "\\]"
  }, {
   b: "%[qw]?{",
   e: "}"
  }, {
   b: "%[qw]?<",
   e: ">",
   r: 10
  }, {
   b: "%[qw]?/",
   e: "/",
   r: 10
  }, {
   b: "%[qw]?%",
   e: "%",
   r: 10
  }, {
   b: "%[qw]?-",
   e: "-",
   r: 10
  }, {
   b: "%[qw]?\\|",
   e: "\\|",
   r: 10
  }, {
   b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
  } ]
 }, s = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  k: n
 }, l = [ o, i, {
  cN: "class",
  bK: "class module",
  e: "$|;",
  i: /=/,
  c: [ e.inherit(e.TM, {
   b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
  }), {
   cN: "inheritance",
   b: "<\\s*",
   c: [ {
    cN: "parent",
    b: "(" + e.IR + "::)?" + e.IR
   } ]
  }, i ]
 }, {
  cN: "function",
  bK: "def",
  e: " |$|;",
  r: 0,
  c: [ e.inherit(e.TM, {
   b: t
  }), s, i ]
 }, {
  cN: "constant",
  b: "(::)?(\\b[A-Z]\\w*(::)?)+",
  r: 0
 }, {
  cN: "symbol",
  b: ":",
  c: [ o, {
   b: t
  } ],
  r: 0
 }, {
  cN: "symbol",
  b: e.UIR + "(\\!|\\?)?:",
  r: 0
 }, {
  cN: "number",
  b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
  r: 0
 }, {
  cN: "variable",
  b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
 }, {
  b: "(" + e.RSR + ")\\s*",
  c: [ i, {
   cN: "regexp",
   c: [ e.BE, a ],
   i: /\n/,
   v: [ {
    b: "/",
    e: "/[a-z]*"
   }, {
    b: "%r{",
    e: "}[a-z]*"
   }, {
    b: "%r\\(",
    e: "\\)[a-z]*"
   }, {
    b: "%r!",
    e: "![a-z]*"
   }, {
    b: "%r\\[",
    e: "\\][a-z]*"
   } ]
  } ],
  r: 0
 } ];
 return a.c = l, s.c = l, {
  k: n,
  c: l
 };
}), hljs.registerLanguage("rust", function(e) {
 var t = {
  cN: "number",
  b: "\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)",
  r: 0
 }, n = "assert bool break char check claim comm const cont copy dir do drop else enum extern export f32 f64 fail false float fn for i16 i32 i64 i8 if impl int let log loop match mod move mut priv pub pure ref return self static str struct task true trait type u16 u32 u64 u8 uint unsafe use vec while";
 return {
  k: n,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.inherit(e.QSM, {
   i: null
  }), e.ASM, t, {
   cN: "function",
   bK: "fn",
   e: "(\\(|<)",
   c: [ e.UTM ]
  }, {
   cN: "preprocessor",
   b: "#\\[",
   e: "\\]"
  }, {
   bK: "type",
   e: "(=|<)",
   c: [ e.UTM ],
   i: "\\S"
  }, {
   bK: "trait enum",
   e: "({|<)",
   c: [ e.UTM ],
   i: "\\S"
  } ]
 };
}), hljs.registerLanguage("ruleslanguage", function(e) {
 return {
  k: {
   keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING",
   built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME"
  },
  c: [ e.CLCM, e.CBLCLM, e.ASM, e.QSM, e.CNM, {
   cN: "array",
   b: "#[a-zA-Z .]+"
  } ]
 };
}), hljs.registerLanguage("rib", function(e) {
 return {
  k: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
  i: "</",
  c: [ e.HCM, e.CNM, e.ASM, e.QSM ]
 };
}), hljs.registerLanguage("diff", function() {
 return {
  c: [ {
   cN: "chunk",
   r: 10,
   v: [ {
    b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
   }, {
    b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
   }, {
    b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
   } ]
  }, {
   cN: "header",
   v: [ {
    b: /Index: /,
    e: /$/
   }, {
    b: /=====/,
    e: /=====$/
   }, {
    b: /^\-\-\-/,
    e: /$/
   }, {
    b: /^\*{3} /,
    e: /$/
   }, {
    b: /^\+\+\+/,
    e: /$/
   }, {
    b: /\*{5}/,
    e: /\*{5}$/
   } ]
  }, {
   cN: "addition",
   b: "^\\+",
   e: "$"
  }, {
   cN: "deletion",
   b: "^\\-",
   e: "$"
  }, {
   cN: "change",
   b: "^\\!",
   e: "$"
  } ]
 };
}), hljs.registerLanguage("haml", function() {
 return {
  cI: !0,
  c: [ {
   cN: "doctype",
   b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
   r: 10
  }, {
   cN: "comment",
   b: "^\\s*(!=#|=#|-#|/).*$",
   r: 0
  }, {
   b: "^\\s*(-|=|!=)(?!#)",
   starts: {
    e: "\\n",
    sL: "ruby"
   }
  }, {
   cN: "tag",
   b: "^\\s*%",
   c: [ {
    cN: "title",
    b: "\\w+"
   }, {
    cN: "value",
    b: "[#\\.]\\w+"
   }, {
    b: "{\\s*",
    e: "\\s*}",
    eE: !0,
    c: [ {
     b: ":\\w+\\s*=>",
     e: ",\\s+",
     rB: !0,
     eW: !0,
     c: [ {
      cN: "symbol",
      b: ":\\w+"
     }, {
      cN: "string",
      b: '"',
      e: '"'
     }, {
      cN: "string",
      b: "'",
      e: "'"
     }, {
      b: "\\w+",
      r: 0
     } ]
    } ]
   }, {
    b: "\\(\\s*",
    e: "\\s*\\)",
    eE: !0,
    c: [ {
     b: "\\w+\\s*=",
     e: "\\s+",
     rB: !0,
     eW: !0,
     c: [ {
      cN: "attribute",
      b: "\\w+",
      r: 0
     }, {
      cN: "string",
      b: '"',
      e: '"'
     }, {
      cN: "string",
      b: "'",
      e: "'"
     }, {
      b: "\\w+",
      r: 0
     } ]
    } ]
   } ]
  }, {
   cN: "bullet",
   b: "^\\s*[=~]\\s*",
   r: 0
  }, {
   b: "#{",
   starts: {
    e: "}",
    sL: "ruby"
   }
  } ]
 };
}), hljs.registerLanguage("javascript", function(e) {
 return {
  aliases: [ "js" ],
  k: {
   keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
   literal: "true false null undefined NaN Infinity",
   built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
  },
  c: [ {
   cN: "pi",
   b: /^\s*('|")use strict('|")/,
   r: 10
  }, e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM, {
   b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
   k: "return throw case",
   c: [ e.CLCM, e.CBLCLM, e.REGEXP_MODE, {
    b: /</,
    e: />;/,
    r: 0,
    sL: "xml"
   } ],
   r: 0
  }, {
   cN: "function",
   bK: "function",
   e: /\{/,
   c: [ e.inherit(e.TM, {
    b: /[A-Za-z$_][0-9A-Za-z$_]*/
   }), {
    cN: "params",
    b: /\(/,
    e: /\)/,
    c: [ e.CLCM, e.CBLCLM ],
    i: /["'\(]/
   } ],
   i: /\[|%/
  }, {
   b: /\$[(.]/
  }, {
   b: "\\." + e.IR,
   r: 0
  } ]
 };
}), hljs.registerLanguage("glsl", function(e) {
 return {
  k: {
   keyword: "atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly",
   built_in: "gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffsetgl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse",
   literal: "true false"
  },
  i: '"',
  c: [ e.CLCM, e.CBLCLM, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  } ]
 };
}), hljs.registerLanguage("rsl", function(e) {
 return {
  k: {
   keyword: "float color point normal vector matrix while for if do return else break extern continue",
   built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
  },
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.QSM, e.ASM, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "shader",
   bK: "surface displacement light volume imager",
   e: "\\("
  }, {
   cN: "shading",
   bK: "illuminate illuminance gather",
   e: "\\("
  } ]
 };
}), hljs.registerLanguage("lua", function(e) {
 var t = "\\[=*\\[", n = "\\]=*\\]", r = {
  b: t,
  e: n,
  c: [ "self" ]
 }, i = [ {
  cN: "comment",
  b: "--(?!" + t + ")",
  e: "$"
 }, {
  cN: "comment",
  b: "--" + t,
  e: n,
  c: [ r ],
  r: 10
 } ];
 return {
  l: e.UIR,
  k: {
   keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
   built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
  },
  c: i.concat([ {
   cN: "function",
   bK: "function",
   e: "\\)",
   c: [ e.inherit(e.TM, {
    b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
   }), {
    cN: "params",
    b: "\\(",
    eW: !0,
    c: i
   } ].concat(i)
  }, e.CNM, e.ASM, e.QSM, {
   cN: "string",
   b: t,
   e: n,
   c: [ r ],
   r: 10
  } ])
 };
}), hljs.registerLanguage("xml", function() {
 var e = "[A-Za-z0-9\\._:-]+", t = {
  b: /<\?(php)?(?!\w)/,
  e: /\?>/,
  sL: "php",
  subLanguageMode: "continuous"
 }, n = {
  eW: !0,
  i: /</,
  r: 0,
  c: [ t, {
   cN: "attribute",
   b: e,
   r: 0
  }, {
   b: "=",
   r: 0,
   c: [ {
    cN: "value",
    v: [ {
     b: /"/,
     e: /"/
    }, {
     b: /'/,
     e: /'/
    }, {
     b: /[^\s\/>]+/
    } ]
   } ]
  } ]
 };
 return {
  aliases: [ "html" ],
  cI: !0,
  c: [ {
   cN: "doctype",
   b: "<!DOCTYPE",
   e: ">",
   r: 10,
   c: [ {
    b: "\\[",
    e: "\\]"
   } ]
  }, {
   cN: "comment",
   b: "<!--",
   e: "-->",
   r: 10
  }, {
   cN: "cdata",
   b: "<\\!\\[CDATA\\[",
   e: "\\]\\]>",
   r: 10
  }, {
   cN: "tag",
   b: "<style(?=\\s|>|$)",
   e: ">",
   k: {
    title: "style"
   },
   c: [ n ],
   starts: {
    e: "</style>",
    rE: !0,
    sL: "css"
   }
  }, {
   cN: "tag",
   b: "<script(?=\\s|>|$)",
   e: ">",
   k: {
    title: "script"
   },
   c: [ n ],
   starts: {
    e: "</script>",
    rE: !0,
    sL: "javascript"
   }
  }, {
   b: "<%",
   e: "%>",
   sL: "vbscript"
  }, t, {
   cN: "pi",
   b: /<\?\w+/,
   e: /\?>/,
   r: 10
  }, {
   cN: "tag",
   b: "</?",
   e: "/?>",
   c: [ {
    cN: "title",
    b: "[^ /><]+",
    r: 0
   }, n ]
  } ]
 };
}), hljs.registerLanguage("markdown", function() {
 return {
  c: [ {
   cN: "header",
   v: [ {
    b: "^#{1,6}",
    e: "$"
   }, {
    b: "^.+?\\n[=-]{2,}$"
   } ]
  }, {
   b: "<",
   e: ">",
   sL: "xml",
   r: 0
  }, {
   cN: "bullet",
   b: "^([*+-]|(\\d+\\.))\\s+"
  }, {
   cN: "strong",
   b: "[*_]{2}.+?[*_]{2}"
  }, {
   cN: "emphasis",
   v: [ {
    b: "\\*.+?\\*"
   }, {
    b: "_.+?_",
    r: 0
   } ]
  }, {
   cN: "blockquote",
   b: "^>\\s+",
   e: "$"
  }, {
   cN: "code",
   v: [ {
    b: "`.+?`"
   }, {
    b: "^( {4}|	)",
    e: "$",
    r: 0
   } ]
  }, {
   cN: "horizontal_rule",
   b: "^[-\\*]{3,}",
   e: "$"
  }, {
   b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
   rB: !0,
   c: [ {
    cN: "link_label",
    b: "\\[",
    e: "\\]",
    eB: !0,
    rE: !0,
    r: 0
   }, {
    cN: "link_url",
    b: "\\]\\(",
    e: "\\)",
    eB: !0,
    eE: !0
   }, {
    cN: "link_reference",
    b: "\\]\\[",
    e: "\\]",
    eB: !0,
    eE: !0
   } ],
   r: 10
  }, {
   b: "^\\[.+\\]:",
   e: "$",
   rB: !0,
   c: [ {
    cN: "link_reference",
    b: "\\[",
    e: "\\]",
    eB: !0,
    eE: !0
   }, {
    cN: "link_url",
    b: "\\s",
    e: "$"
   } ]
  } ]
 };
}), hljs.registerLanguage("css", function(e) {
 var t = "[a-zA-Z-][a-zA-Z0-9_-]*", n = {
  cN: "function",
  b: t + "\\(",
  e: "\\)",
  c: [ "self", e.NM, e.ASM, e.QSM ]
 };
 return {
  cI: !0,
  i: "[=/|']",
  c: [ e.CBLCLM, {
   cN: "id",
   b: "\\#[A-Za-z0-9_-]+"
  }, {
   cN: "class",
   b: "\\.[A-Za-z0-9_-]+",
   r: 0
  }, {
   cN: "attr_selector",
   b: "\\[",
   e: "\\]",
   i: "$"
  }, {
   cN: "pseudo",
   b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
  }, {
   cN: "at_rule",
   b: "@(font-face|page)",
   l: "[a-z-]+",
   k: "font-face page"
  }, {
   cN: "at_rule",
   b: "@",
   e: "[{;]",
   c: [ {
    cN: "keyword",
    b: /\S+/
   }, {
    b: /\s/,
    eW: !0,
    eE: !0,
    r: 0,
    c: [ n, e.ASM, e.QSM, e.NM ]
   } ]
  }, {
   cN: "tag",
   b: t,
   r: 0
  }, {
   cN: "rules",
   b: "{",
   e: "}",
   i: "[^\\s]",
   r: 0,
   c: [ e.CBLCLM, {
    cN: "rule",
    b: "[^\\s]",
    rB: !0,
    e: ";",
    eW: !0,
    c: [ {
     cN: "attribute",
     b: "[A-Z\\_\\.\\-]+",
     e: ":",
     eE: !0,
     i: "[^\\s]",
     starts: {
      cN: "value",
      eW: !0,
      eE: !0,
      c: [ n, e.NM, e.QSM, e.ASM, e.CBLCLM, {
       cN: "hexcolor",
       b: "#[0-9A-Fa-f]+"
      }, {
       cN: "important",
       b: "!important"
      } ]
     }
    } ]
   } ]
  } ]
 };
}), hljs.registerLanguage("lisp", function(e) {
 var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*", n = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?", r = {
  cN: "shebang",
  b: "^#!",
  e: "$"
 }, i = {
  cN: "literal",
  b: "\\b(t{1}|nil)\\b"
 }, a = {
  cN: "number",
  v: [ {
   b: n,
   r: 0
  }, {
   b: "#b[0-1]+(/[0-1]+)?"
  }, {
   b: "#o[0-7]+(/[0-7]+)?"
  }, {
   b: "#x[0-9a-f]+(/[0-9a-f]+)?"
  }, {
   b: "#c\\(" + n + " +" + n,
   e: "\\)"
  } ]
 }, o = e.inherit(e.QSM, {
  i: null
 }), s = {
  cN: "comment",
  b: ";",
  e: "$"
 }, l = {
  cN: "variable",
  b: "\\*",
  e: "\\*"
 }, c = {
  cN: "keyword",
  b: "[:&]" + t
 }, u = {
  b: "\\(",
  e: "\\)",
  c: [ "self", i, o, a ]
 }, d = {
  cN: "quoted",
  c: [ a, o, l, c, u ],
  v: [ {
   b: "['`]\\(",
   e: "\\)"
  }, {
   b: "\\(quote ",
   e: "\\)",
   k: {
    title: "quote"
   }
  } ]
 }, p = {
  cN: "list",
  b: "\\(",
  e: "\\)"
 }, h = {
  eW: !0,
  r: 0
 };
 return p.c = [ {
  cN: "title",
  b: t
 }, h ], h.c = [ d, p, i, a, o, s, l, c ], {
  i: /\S/,
  c: [ a, r, i, o, s, d, p ]
 };
}), hljs.registerLanguage("profile", function(e) {
 return {
  c: [ e.CNM, {
   cN: "built_in",
   b: "{",
   e: "}$",
   eB: !0,
   eE: !0,
   c: [ e.ASM, e.QSM ],
   r: 0
  }, {
   cN: "filename",
   b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
   e: ":",
   eE: !0
  }, {
   cN: "header",
   b: "(ncalls|tottime|cumtime)",
   e: "$",
   k: "ncalls tottime|10 cumtime|10 filename",
   r: 10
  }, {
   cN: "summary",
   b: "function calls",
   e: "$",
   c: [ e.CNM ],
   r: 10
  }, e.ASM, e.QSM, {
   cN: "function",
   b: "\\(",
   e: "\\)$",
   c: [ e.UTM ],
   r: 0
  } ]
 };
}), hljs.registerLanguage("http", function() {
 return {
  i: "\\S",
  c: [ {
   cN: "status",
   b: "^HTTP/[0-9\\.]+",
   e: "$",
   c: [ {
    cN: "number",
    b: "\\b\\d{3}\\b"
   } ]
  }, {
   cN: "request",
   b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
   rB: !0,
   e: "$",
   c: [ {
    cN: "string",
    b: " ",
    e: " ",
    eB: !0,
    eE: !0
   } ]
  }, {
   cN: "attribute",
   b: "^\\w",
   e: ": ",
   eE: !0,
   i: "\\n|\\s|=",
   starts: {
    cN: "string",
    e: "$"
   }
  }, {
   b: "\\n\\n",
   starts: {
    sL: "",
    eW: !0
   }
  } ]
 };
}), hljs.registerLanguage("java", function(e) {
 var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
 return {
  k: t,
  i: /<\//,
  c: [ {
   cN: "javadoc",
   b: "/\\*\\*",
   e: "\\*/",
   c: [ {
    cN: "javadoctag",
    b: "(^|\\s)@[A-Za-z]+"
   } ],
   r: 10
  }, e.CLCM, e.CBLCLM, e.ASM, e.QSM, {
   bK: "protected public private",
   e: /[{;=]/,
   k: t,
   c: [ {
    cN: "class",
    bK: "class interface",
    eW: !0,
    i: /[:"<>]/,
    c: [ {
     bK: "extends implements",
     r: 10
    }, e.UTM ]
   }, {
    b: e.UIR + "\\s*\\(",
    rB: !0,
    c: [ e.UTM ]
   } ]
  }, e.CNM, {
   cN: "annotation",
   b: "@[A-Za-z]+"
  } ]
 };
}), hljs.registerLanguage("fsharp", function(e) {
 return {
  k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
  c: [ {
   cN: "string",
   b: '@"',
   e: '"',
   c: [ {
    b: '""'
   } ]
  }, {
   cN: "string",
   b: '"""',
   e: '"""'
  }, {
   cN: "comment",
   b: "\\(\\*",
   e: "\\*\\)"
  }, {
   cN: "class",
   bK: "type",
   e: "\\(|=|$",
   c: [ e.UTM ]
  }, {
   cN: "annotation",
   b: "\\[<",
   e: ">\\]"
  }, {
   cN: "attribute",
   b: "\\B('[A-Za-z])\\b",
   c: [ e.BE ]
  }, e.CLCM, e.inherit(e.QSM, {
   i: null
  }), e.CNM ]
 };
}), hljs.registerLanguage("mathematica", function(e) {
 return {
  aliases: [ "mma" ],
  l: "(\\$|\\b)" + e.IR + "\\b",
  k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
  c: [ {
   cN: "comment",
   b: /\(\*/,
   e: /\*\)/
  }, e.ASM, e.QSM, e.CNM, {
   cN: "list",
   b: /\{/,
   e: /\}/,
   i: /:/
  } ]
 };
}), hljs.registerLanguage("php", function(e) {
 var t = {
  cN: "variable",
  b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
 }, n = {
  cN: "preprocessor",
  b: /<\?(php)?|\?>/
 }, r = {
  cN: "string",
  c: [ e.BE, n ],
  v: [ {
   b: 'b"',
   e: '"'
  }, {
   b: "b'",
   e: "'"
  }, e.inherit(e.ASM, {
   i: null
  }), e.inherit(e.QSM, {
   i: null
  }) ]
 }, i = {
  v: [ e.BNM, e.CNM ]
 };
 return {
  cI: !0,
  k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
  c: [ e.CLCM, e.HCM, {
   cN: "comment",
   b: "/\\*",
   e: "\\*/",
   c: [ {
    cN: "phpdoc",
    b: "\\s@[A-Za-z]+"
   }, n ]
  }, {
   cN: "comment",
   b: "__halt_compiler.+?;",
   eW: !0,
   k: "__halt_compiler",
   l: e.UIR
  }, {
   cN: "string",
   b: "<<<['\"]?\\w+['\"]?$",
   e: "^\\w+;",
   c: [ e.BE ]
  }, n, t, {
   cN: "function",
   bK: "function",
   e: /[;{]/,
   i: "\\$|\\[|%",
   c: [ e.UTM, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ "self", t, e.CBLCLM, r, i ]
   } ]
  }, {
   cN: "class",
   bK: "class interface",
   e: "{",
   i: /[:\(\$"]/,
   c: [ {
    bK: "extends implements",
    r: 10
   }, e.UTM ]
  }, {
   bK: "namespace",
   e: ";",
   i: /[\.']/,
   c: [ e.UTM ]
  }, {
   bK: "use",
   e: ";",
   c: [ e.UTM ]
  }, {
   b: "=>"
  }, r, i ]
 };
}), hljs.registerLanguage("haskell", function(e) {
 var t = {
  cN: "comment",
  v: [ {
   b: "--",
   e: "$"
  }, {
   b: "{-",
   e: "-}",
   c: [ "self" ]
  } ]
 }, n = {
  cN: "pragma",
  b: "{-#",
  e: "#-}"
 }, r = {
  cN: "preprocessor",
  b: "^#",
  e: "$"
 }, i = {
  cN: "type",
  b: "\\b[A-Z][\\w']*",
  r: 0
 }, a = {
  cN: "container",
  b: "\\(",
  e: "\\)",
  i: '"',
  c: [ n, t, r, {
   cN: "type",
   b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
  }, e.inherit(e.TM, {
   b: "[_a-z][\\w']*"
  }) ]
 }, o = {
  cN: "container",
  b: "{",
  e: "}",
  c: a.c
 };
 return {
  k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
  c: [ {
   cN: "module",
   b: "\\bmodule\\b",
   e: "where",
   k: "module where",
   c: [ a, t ],
   i: "\\W\\.|;"
  }, {
   cN: "import",
   b: "\\bimport\\b",
   e: "$",
   k: "import|0 qualified as hiding",
   c: [ a, t ],
   i: "\\W\\.|;"
  }, {
   cN: "class",
   b: "^(\\s*)?(class|instance)\\b",
   e: "where",
   k: "class family instance where",
   c: [ i, a, t ]
  }, {
   cN: "typedef",
   b: "\\b(data|(new)?type)\\b",
   e: "$",
   k: "data family type newtype deriving",
   c: [ n, t, i, a, o ]
  }, {
   cN: "default",
   bK: "default",
   e: "$",
   c: [ i, a, t ]
  }, {
   cN: "infix",
   bK: "infix infixl infixr",
   e: "$",
   c: [ e.CNM, t ]
  }, {
   cN: "foreign",
   b: "\\bforeign\\b",
   e: "$",
   k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
   c: [ i, e.QSM, t ]
  }, {
   cN: "shebang",
   b: "#!\\/usr\\/bin\\/env runhaskell",
   e: "$"
  }, n, t, r, e.QSM, e.CNM, i, e.inherit(e.TM, {
   b: "^[_a-z][\\w']*"
  }), {
   b: "->|<-"
  } ]
 };
}), hljs.registerLanguage("1c", function(e) {
 var t = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*", n = "возврат дата для если и или иначе иначеесли исключение конецесли конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл число экспорт", r = "ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты установитьтана установитьтапо фиксшаблон формат цел шаблон", i = {
  cN: "dquote",
  b: '""'
 }, a = {
  cN: "string",
  b: '"',
  e: '"|$',
  c: [ i ]
 }, o = {
  cN: "string",
  b: "\\|",
  e: '"|$',
  c: [ i ]
 };
 return {
  cI: !0,
  l: t,
  k: {
   keyword: n,
   built_in: r
  },
  c: [ e.CLCM, e.NM, a, o, {
   cN: "function",
   b: "(процедура|функция)",
   e: "$",
   l: t,
   k: "процедура функция",
   c: [ e.inherit(e.TM, {
    b: t
   }), {
    cN: "tail",
    eW: !0,
    c: [ {
     cN: "params",
     b: "\\(",
     e: "\\)",
     l: t,
     k: "знач",
     c: [ a, o ]
    }, {
     cN: "export",
     b: "экспорт",
     eW: !0,
     l: t,
     k: "экспорт",
     c: [ e.CLCM ]
    } ]
   }, e.CLCM ]
  }, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "date",
   b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'"
  } ]
 };
}), hljs.registerLanguage("python", function(e) {
 var t = {
  cN: "prompt",
  b: /^(>>>|\.\.\.) /
 }, n = {
  cN: "string",
  c: [ e.BE ],
  v: [ {
   b: /(u|b)?r?'''/,
   e: /'''/,
   c: [ t ],
   r: 10
  }, {
   b: /(u|b)?r?"""/,
   e: /"""/,
   c: [ t ],
   r: 10
  }, {
   b: /(u|r|ur)'/,
   e: /'/,
   r: 10
  }, {
   b: /(u|r|ur)"/,
   e: /"/,
   r: 10
  }, {
   b: /(b|br)'/,
   e: /'/
  }, {
   b: /(b|br)"/,
   e: /"/
  }, e.ASM, e.QSM ]
 }, r = {
  cN: "number",
  r: 0,
  v: [ {
   b: e.BNR + "[lLjJ]?"
  }, {
   b: "\\b(0o[0-7]+)[lLjJ]?"
  }, {
   b: e.CNR + "[lLjJ]?"
  } ]
 }, i = {
  cN: "params",
  b: /\(/,
  e: /\)/,
  c: [ "self", t, r, n ]
 }, a = {
  e: /:/,
  i: /[${=;\n]/,
  c: [ e.UTM, i ]
 };
 return {
  k: {
   keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
   built_in: "Ellipsis NotImplemented"
  },
  i: /(<\/|->|\?)/,
  c: [ t, r, n, e.HCM, e.inherit(a, {
   cN: "function",
   bK: "def",
   r: 10
  }), e.inherit(a, {
   cN: "class",
   bK: "class"
  }), {
   cN: "decorator",
   b: /@/,
   e: /$/
  }, {
   b: /\b(print|exec)\(/
  } ]
 };
}), hljs.registerLanguage("smalltalk", function(e) {
 var t = "[a-z][a-zA-Z0-9_]*", n = {
  cN: "char",
  b: "\\$.{1}"
 }, r = {
  cN: "symbol",
  b: "#" + e.UIR
 };
 return {
  k: "self super nil true false thisContext",
  c: [ {
   cN: "comment",
   b: '"',
   e: '"'
  }, e.ASM, {
   cN: "class",
   b: "\\b[A-Z][A-Za-z0-9_]*",
   r: 0
  }, {
   cN: "method",
   b: t + ":",
   r: 0
  }, e.CNM, r, n, {
   cN: "localvars",
   b: "\\|[ ]*" + t + "([ ]+" + t + ")*[ ]*\\|",
   rB: !0,
   e: /\|/,
   i: /\S/,
   c: [ {
    b: "(\\|[ ]*)?" + t
   } ]
  }, {
   cN: "array",
   b: "\\#\\(",
   e: "\\)",
   c: [ e.ASM, n, e.CNM, r ]
  } ]
 };
}), hljs.registerLanguage("tex", function() {
 var e = {
  cN: "command",
  b: "\\\\[a-zA-Zа-яА-я]+[\\*]?"
 }, t = {
  cN: "command",
  b: "\\\\[^a-zA-Zа-яА-я0-9]"
 }, n = {
  cN: "special",
  b: "[{}\\[\\]\\&#~]",
  r: 0
 };
 return {
  c: [ {
   b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
   rB: !0,
   c: [ e, t, {
    cN: "number",
    b: " *=",
    e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
    eB: !0
   } ],
   r: 10
  }, e, t, n, {
   cN: "formula",
   b: "\\$\\$",
   e: "\\$\\$",
   c: [ e, t, n ],
   r: 0
  }, {
   cN: "formula",
   b: "\\$",
   e: "\\$",
   c: [ e, t, n ],
   r: 0
  }, {
   cN: "comment",
   b: "%",
   e: "$",
   r: 0
  } ]
 };
}), hljs.registerLanguage("actionscript", function(e) {
 var t = "[a-zA-Z_$][a-zA-Z0-9_$]*", n = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)", r = {
  cN: "rest_arg",
  b: "[.]{3}",
  e: t,
  r: 10
 };
 return {
  k: {
   keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
   literal: "true false null undefined"
  },
  c: [ e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM, {
   cN: "package",
   bK: "package",
   e: "{",
   c: [ e.TM ]
  }, {
   cN: "class",
   bK: "class interface",
   e: "{",
   c: [ {
    bK: "extends implements"
   }, e.TM ]
  }, {
   cN: "preprocessor",
   bK: "import include",
   e: ";"
  }, {
   cN: "function",
   bK: "function",
   e: "[{;]",
   i: "\\S",
   c: [ e.TM, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ e.ASM, e.QSM, e.CLCM, e.CBLCLM, r ]
   }, {
    cN: "type",
    b: ":",
    e: n,
    r: 10
   } ]
  } ]
 };
}), hljs.registerLanguage("sql", function(e) {
 return {
  cI: !0,
  i: /[<>]/,
  c: [ {
   cN: "operator",
   b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
   e: ";",
   eW: !0,
   k: {
    keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
    aggregate: "count sum min max avg"
   },
   c: [ {
    cN: "string",
    b: "'",
    e: "'",
    c: [ e.BE, {
     b: "''"
    } ]
   }, {
    cN: "string",
    b: '"',
    e: '"',
    c: [ e.BE, {
     b: '""'
    } ]
   }, {
    cN: "string",
    b: "`",
    e: "`",
    c: [ e.BE ]
   }, e.CNM ]
  }, e.CBLCLM, {
   cN: "comment",
   b: "--",
   e: "$"
  } ]
 };
}), hljs.registerLanguage("handlebars", function() {
 var e = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
 return {
  cI: !0,
  sL: "xml",
  subLanguageMode: "continuous",
  c: [ {
   cN: "expression",
   b: "{{",
   e: "}}",
   c: [ {
    cN: "begin-block",
    b: "#[a-zA-Z- .]+",
    k: e
   }, {
    cN: "string",
    b: '"',
    e: '"'
   }, {
    cN: "end-block",
    b: "\\/[a-zA-Z- .]+",
    k: e
   }, {
    cN: "variable",
    b: "[a-zA-Z-.]+",
    k: e
   } ]
  } ]
 };
}), hljs.registerLanguage("vala", function(e) {
 return {
  k: {
   keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
   built_in: "DBus GLib CCode Gee Object",
   literal: "false true null"
  },
  c: [ {
   cN: "class",
   bK: "class interface delegate namespace",
   e: "{",
   i: "[^,:\\n\\s\\.]",
   c: [ e.UTM ]
  }, e.CLCM, e.CBLCLM, {
   cN: "string",
   b: '"""',
   e: '"""',
   r: 5
  }, e.ASM, e.QSM, e.CNM, {
   cN: "preprocessor",
   b: "^#",
   e: "$",
   r: 2
  }, {
   cN: "constant",
   b: " [A-Z_]+ ",
   r: 0
  } ]
 };
}), hljs.registerLanguage("ini", function(e) {
 return {
  cI: !0,
  i: /\S/,
  c: [ {
   cN: "comment",
   b: ";",
   e: "$"
  }, {
   cN: "title",
   b: "^\\[",
   e: "\\]"
  }, {
   cN: "setting",
   b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
   e: "$",
   c: [ {
    cN: "value",
    eW: !0,
    k: "on off true false yes no",
    c: [ e.QSM, e.NM ],
    r: 0
   } ]
  } ]
 };
}), hljs.registerLanguage("livecodeserver", function(e) {
 var t = {
  cN: "variable",
  b: "\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+",
  r: 0
 }, n = {
  cN: "comment",
  e: "$",
  v: [ e.CBLCLM, e.HCM, {
   b: "--"
  }, {
   b: "[^:]//"
  } ]
 }, r = e.inherit(e.TM, {
  v: [ {
   b: "\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*"
  }, {
   b: "\\b_[a-z0-9\\-]+"
  } ]
 }), i = e.inherit(e.TM, {
  b: "\\b([A-Za-z0-9_\\-]+)\\b"
 });
 return {
  cI: !1,
  k: {
   keyword: "after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if",
   constant: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
   operator: "div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
   built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg base64Decode base64Encode baseConvert binaryDecode binaryEncode byteToNum cachedURL cachedURLs charToNum cipherNames commandNames compound compress constantNames cos date dateFormat decompress directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames global globals hasMemory hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec millisecs millisecond milliseconds min monthNames num number numToByte numToChar offset open openfiles openProcesses openProcessIDs openSockets paramCount param params peerAddress pendingMessages platform processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_Execute revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sec secs seconds sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName tick ticks time to toLower toUpper transpose trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus value variableNames version waitDepth weekdayNames wordOffset add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load multiply socket process post seek rel relative read from process rename replace require resetAll revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split subtract union unload wait write"
  },
  c: [ t, {
   cN: "keyword",
   b: "\\bend\\sif\\b"
  }, {
   cN: "function",
   bK: "function",
   e: "$",
   c: [ t, i, e.ASM, e.QSM, e.BNM, e.CNM, r ]
  }, {
   cN: "function",
   bK: "end",
   e: "$",
   c: [ i, r ]
  }, {
   cN: "command",
   bK: "command on",
   e: "$",
   c: [ t, i, e.ASM, e.QSM, e.BNM, e.CNM, r ]
  }, {
   cN: "command",
   bK: "end",
   e: "$",
   c: [ i, r ]
  }, {
   cN: "preprocessor",
   b: "<\\?rev|<\\?lc|<\\?livecode",
   r: 10
  }, {
   cN: "preprocessor",
   b: "<\\?"
  }, {
   cN: "preprocessor",
   b: "\\?>"
  }, n, e.ASM, e.QSM, e.BNM, e.CNM, r ],
  i: ";$|^\\[|^="
 };
}), hljs.registerLanguage("d", function(e) {
 var t = {
  keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
  built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
  literal: "false null true"
 }, n = "(0|[1-9][\\d_]*)", r = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)", i = "0[bB][01_]+", a = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)", o = "0[xX]" + a, s = "([eE][+-]?" + r + ")", l = "(" + r + "(\\.\\d*|" + s + ")|\\d+\\." + r + r + "|\\." + n + s + "?)", c = "(0[xX](" + a + "\\." + a + "|\\.?" + a + ")[pP][+-]?" + r + ")", u = "(" + n + "|" + i + "|" + o + ")", d = "(" + c + "|" + l + ")", p = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};", h = {
  cN: "number",
  b: "\\b" + u + "(L|u|U|Lu|LU|uL|UL)?",
  r: 0
 }, f = {
  cN: "number",
  b: "\\b(" + d + "([fF]|L|i|[fF]i|Li)?|" + u + "(i|[fF]i|Li))",
  r: 0
 }, m = {
  cN: "string",
  b: "'(" + p + "|.)",
  e: "'",
  i: "."
 }, g = {
  b: p,
  r: 0
 }, b = {
  cN: "string",
  b: '"',
  c: [ g ],
  e: '"[cwd]?'
 }, v = {
  cN: "string",
  b: '[rq]"',
  e: '"[cwd]?',
  r: 5
 }, y = {
  cN: "string",
  b: "`",
  e: "`[cwd]?"
 }, x = {
  cN: "string",
  b: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
  r: 10
 }, w = {
  cN: "string",
  b: 'q"\\{',
  e: '\\}"'
 }, S = {
  cN: "shebang",
  b: "^#!",
  e: "$",
  r: 5
 }, C = {
  cN: "preprocessor",
  b: "#(line)",
  e: "$",
  r: 5
 }, _ = {
  cN: "keyword",
  b: "@[a-zA-Z_][a-zA-Z_\\d]*"
 }, E = {
  cN: "comment",
  b: "\\/\\+",
  c: [ "self" ],
  e: "\\+\\/",
  r: 10
 };
 return {
  l: e.UIR,
  k: t,
  c: [ e.CLCM, e.CBLCLM, E, x, b, v, y, w, f, h, m, S, C, _ ]
 };
}), hljs.registerLanguage("vbnet", function(e) {
 return {
  cI: !0,
  k: {
   keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
   built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
   literal: "true false nothing"
  },
  i: "//|{|}|endif|gosub|variant|wend",
  c: [ e.inherit(e.QSM, {
   c: [ {
    b: '""'
   } ]
  }), {
   cN: "comment",
   b: "'",
   e: "$",
   rB: !0,
   c: [ {
    cN: "xmlDocTag",
    b: "'''|<!--|-->"
   }, {
    cN: "xmlDocTag",
    b: "</?",
    e: ">"
   } ]
  }, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$",
   k: "if else elseif end region externalsource"
  } ]
 };
}), hljs.registerLanguage("axapta", function(e) {
 return {
  k: "false int abstract private char boolean static null if for true while long throw finally protected final return void enum else break new catch byte super case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod",
  c: [ e.CLCM, e.CBLCLM, e.ASM, e.QSM, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "class",
   bK: "class interface",
   e: "{",
   i: ":",
   c: [ {
    cN: "inheritance",
    bK: "extends implements",
    r: 10
   }, e.UTM ]
  } ]
 };
}), hljs.registerLanguage("perl", function(e) {
 var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when", n = {
  cN: "subst",
  b: "[$@]\\{",
  e: "\\}",
  k: t
 }, r = {
  b: "->{",
  e: "}"
 }, i = {
  cN: "variable",
  v: [ {
   b: /\$\d/
  }, {
   b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
  }, {
   b: /[\$\%\@\*][^\s\w{]/,
   r: 0
  } ]
 }, a = {
  cN: "comment",
  b: "^(__END__|__DATA__)",
  e: "\\n$",
  r: 5
 }, o = [ e.BE, n, i ], s = [ i, e.HCM, a, {
  cN: "comment",
  b: "^\\=\\w",
  e: "\\=cut",
  eW: !0
 }, r, {
  cN: "string",
  c: o,
  v: [ {
   b: "q[qwxr]?\\s*\\(",
   e: "\\)",
   r: 5
  }, {
   b: "q[qwxr]?\\s*\\[",
   e: "\\]",
   r: 5
  }, {
   b: "q[qwxr]?\\s*\\{",
   e: "\\}",
   r: 5
  }, {
   b: "q[qwxr]?\\s*\\|",
   e: "\\|",
   r: 5
  }, {
   b: "q[qwxr]?\\s*\\<",
   e: "\\>",
   r: 5
  }, {
   b: "qw\\s+q",
   e: "q",
   r: 5
  }, {
   b: "'",
   e: "'",
   c: [ e.BE ]
  }, {
   b: '"',
   e: '"'
  }, {
   b: "`",
   e: "`",
   c: [ e.BE ]
  }, {
   b: "{\\w+}",
   c: [],
   r: 0
  }, {
   b: "-?\\w+\\s*\\=\\>",
   c: [],
   r: 0
  } ]
 }, {
  cN: "number",
  b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
  r: 0
 }, {
  b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
  k: "split return print reverse grep",
  r: 0,
  c: [ e.HCM, a, {
   cN: "regexp",
   b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
   r: 10
  }, {
   cN: "regexp",
   b: "(m|qr)?/",
   e: "/[a-z]*",
   c: [ e.BE ],
   r: 0
  } ]
 }, {
  cN: "sub",
  bK: "sub",
  e: "(\\s*\\(.*?\\))?[;{]",
  r: 5
 }, {
  cN: "operator",
  b: "-\\w\\b",
  r: 0
 } ];
 return n.c = s, r.c = s, {
  k: t,
  c: s
 };
}), hljs.registerLanguage("scala", function(e) {
 var t = {
  cN: "annotation",
  b: "@[A-Za-z]+"
 }, n = {
  cN: "string",
  b: 'u?r?"""',
  e: '"""',
  r: 10
 };
 return {
  k: "type yield lazy override def with val var false true sealed abstract private trait object null if for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws",
  c: [ {
   cN: "javadoc",
   b: "/\\*\\*",
   e: "\\*/",
   c: [ {
    cN: "javadoctag",
    b: "@[A-Za-z]+"
   } ],
   r: 10
  }, e.CLCM, e.CBLCLM, n, e.ASM, e.QSM, {
   cN: "class",
   b: "((case )?class |object |trait )",
   e: "({|$)",
   i: ":",
   k: "case class trait object",
   c: [ {
    bK: "extends with",
    r: 10
   }, e.UTM, {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [ e.ASM, e.QSM, n, t ]
   } ]
  }, e.CNM, t ]
 };
}), hljs.registerLanguage("cmake", function(e) {
 return {
  cI: !0,
  k: {
   keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or",
   operator: "equal less greater strless strgreater strequal matches"
  },
  c: [ {
   cN: "envvar",
   b: "\\${",
   e: "}"
  }, e.HCM, e.QSM, e.NM ]
 };
}), hljs.registerLanguage("ocaml", function(e) {
 return {
  k: {
   keyword: "and as assert asr begin class constraint do done downto else end exception external false for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new object of open or private rec ref sig struct then to true try type val virtual when while with parser value",
   built_in: "bool char float int list unit array exn option int32 int64 nativeint format4 format6 lazy_t in_channel out_channel string"
  },
  i: /\/\//,
  c: [ {
   cN: "string",
   b: '"""',
   e: '"""'
  }, {
   cN: "comment",
   b: "\\(\\*",
   e: "\\*\\)",
   c: [ "self" ]
  }, {
   cN: "class",
   bK: "type",
   e: "\\(|=|$",
   c: [ e.UTM ]
  }, {
   cN: "annotation",
   b: "\\[<",
   e: ">\\]"
  }, e.CBLCLM, e.inherit(e.ASM, {
   i: null
  }), e.inherit(e.QSM, {
   i: null
  }), e.CNM ]
 };
}), hljs.registerLanguage("autohotkey", function(e) {
 var t = {
  cN: "escape",
  b: "`[\\s\\S]"
 }, n = {
  cN: "comment",
  b: ";",
  e: "$",
  r: 0
 }, r = [ {
  cN: "built_in",
  b: "A_[a-zA-Z0-9]+"
 }, {
  cN: "built_in",
  bK: "ComSpec Clipboard ClipboardAll ErrorLevel"
 } ];
 return {
  cI: !0,
  k: {
   keyword: "Break Continue Else Gosub If Loop Return While",
   literal: "A true false NOT AND OR"
  },
  c: r.concat([ t, e.inherit(e.QSM, {
   c: [ t ]
  }), n, {
   cN: "number",
   b: e.NR,
   r: 0
  }, {
   cN: "var_expand",
   b: "%",
   e: "%",
   i: "\\n",
   c: [ t ]
  }, {
   cN: "label",
   c: [ t ],
   v: [ {
    b: '^[^\\n";]+::(?!=)'
   }, {
    b: '^[^\\n";]+:(?!=)',
    r: 0
   } ]
  }, {
   b: ",\\s*,",
   r: 10
  } ])
 };
}), hljs.registerLanguage("objectivec", function(e) {
 var t = {
  keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
  literal: "false true FALSE TRUE nil YES NO NULL",
  built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
 }, n = /[a-zA-Z@][a-zA-Z0-9_]*/, r = "@interface @class @protocol @implementation";
 return {
  k: t,
  l: n,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.CNM, e.QSM, {
   cN: "string",
   b: "'",
   e: "[^\\\\]'",
   i: "[^\\\\][^']"
  }, {
   cN: "preprocessor",
   b: "#import",
   e: "$",
   c: [ {
    cN: "title",
    b: '"',
    e: '"'
   }, {
    cN: "title",
    b: "<",
    e: ">"
   } ]
  }, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "class",
   b: "(" + r.split(" ").join("|") + ")\\b",
   e: "({|$)",
   k: r,
   l: n,
   c: [ e.UTM ]
  }, {
   cN: "variable",
   b: "\\." + e.UIR,
   r: 0
  } ]
 };
}), hljs.registerLanguage("avrasm", function(e) {
 return {
  cI: !0,
  k: {
   keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
   built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf"
  },
  c: [ e.CBLCLM, {
   cN: "comment",
   b: ";",
   e: "$",
   r: 0
  }, e.CNM, e.BNM, {
   cN: "number",
   b: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
  }, e.QSM, {
   cN: "string",
   b: "'",
   e: "[^\\\\]'",
   i: "[^\\\\][^']"
  }, {
   cN: "label",
   b: "^[A-Za-z0-9_.$]+:"
  }, {
   cN: "preprocessor",
   b: "#",
   e: "$"
  }, {
   cN: "preprocessor",
   b: "\\.[a-zA-Z]+"
  }, {
   cN: "localvars",
   b: "@[0-9]+"
  } ]
 };
}), hljs.registerLanguage("vhdl", function(e) {
 return {
  cI: !0,
  k: {
   keyword: "abs access after alias all and architecture array assert attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor",
   typename: "boolean bit character severity_level integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector std_logic std_logic_vector unsigned signed boolean_vector integer_vector real_vector time_vector"
  },
  i: "{",
  c: [ e.CBLCLM, {
   cN: "comment",
   b: "--",
   e: "$"
  }, e.QSM, e.CNM, {
   cN: "literal",
   b: "'(U|X|0|1|Z|W|L|H|-)'",
   c: [ e.BE ]
  }, {
   cN: "attribute",
   b: "'[A-Za-z](_?[A-Za-z0-9])*",
   c: [ e.BE ]
  } ]
 };
}), hljs.registerLanguage("coffeescript", function(e) {
 var t = {
  keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
  literal: "true false null undefined yes no on off",
  reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
  built_in: "npm require console print module exports global window document"
 }, n = "[A-Za-z$_][0-9A-Za-z$_]*", r = e.inherit(e.TM, {
  b: n
 }), i = {
  cN: "subst",
  b: /#\{/,
  e: /}/,
  k: t
 }, a = [ e.BNM, e.inherit(e.CNM, {
  starts: {
   e: "(\\s*/)?",
   r: 0
  }
 }), {
  cN: "string",
  v: [ {
   b: /'''/,
   e: /'''/,
   c: [ e.BE ]
  }, {
   b: /'/,
   e: /'/,
   c: [ e.BE ]
  }, {
   b: /"""/,
   e: /"""/,
   c: [ e.BE, i ]
  }, {
   b: /"/,
   e: /"/,
   c: [ e.BE, i ]
  } ]
 }, {
  cN: "regexp",
  v: [ {
   b: "///",
   e: "///",
   c: [ i, e.HCM ]
  }, {
   b: "//[gim]*",
   r: 0
  }, {
   b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
  } ]
 }, {
  cN: "property",
  b: "@" + n
 }, {
  b: "`",
  e: "`",
  eB: !0,
  eE: !0,
  sL: "javascript"
 } ];
 return i.c = a, {
  k: t,
  c: a.concat([ {
   cN: "comment",
   b: "###",
   e: "###"
  }, e.HCM, {
   cN: "function",
   b: "(" + n + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
   e: "[-=]>",
   rB: !0,
   c: [ r, {
    cN: "params",
    b: "\\(",
    rB: !0,
    c: [ {
     b: /\(/,
     e: /\)/,
     k: t,
     c: [ "self" ].concat(a)
    } ]
   } ]
  }, {
   cN: "class",
   bK: "class",
   e: "$",
   i: /[:="\[\]]/,
   c: [ {
    bK: "extends",
    eW: !0,
    i: /[:="\[\]]/,
    c: [ r ]
   }, r ]
  }, {
   cN: "attribute",
   b: n + ":",
   e: ":",
   rB: !0,
   eE: !0,
   r: 0
  } ])
 };
}), hljs.registerLanguage("mizar", function() {
 return {
  k: [ "environ vocabularies notations constructors definitions registrations theorems schemes requirements", "begin end definition registration cluster existence pred func defpred deffunc theorem proof", "let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from", "be being by means equals implies iff redefine define now not or attr is mode suppose per cases set", "thesis contradiction scheme reserve struct", "correctness compatibility coherence symmetry assymetry reflexivity irreflexivity", "connectedness uniqueness commutativity idempotence involutiveness projectivity" ].join(" "),
  c: [ {
   cN: "comment",
   b: "::",
   e: "$"
  } ]
 };
}), hljs.registerLanguage("nginx", function(e) {
 var t = {
  cN: "variable",
  v: [ {
   b: /\$\d+/
  }, {
   b: /\$\{/,
   e: /}/
  }, {
   b: "[\\$\\@]" + e.UIR
  } ]
 }, n = {
  eW: !0,
  l: "[a-z/_]+",
  k: {
   built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
  },
  r: 0,
  i: "=>",
  c: [ e.HCM, {
   cN: "string",
   c: [ e.BE, t ],
   v: [ {
    b: /"/,
    e: /"/
   }, {
    b: /'/,
    e: /'/
   } ]
  }, {
   cN: "url",
   b: "([a-z]+):/",
   e: "\\s",
   eW: !0,
   eE: !0
  }, {
   cN: "regexp",
   c: [ e.BE, t ],
   v: [ {
    b: "\\s\\^",
    e: "\\s|{|;",
    rE: !0
   }, {
    b: "~\\*?\\s+",
    e: "\\s|{|;",
    rE: !0
   }, {
    b: "\\*(\\.[a-z\\-]+)+"
   }, {
    b: "([a-z\\-]+\\.)+\\*"
   } ]
  }, {
   cN: "number",
   b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
  }, {
   cN: "number",
   b: "\\b\\d+[kKmMgGdshdwy]*\\b",
   r: 0
  }, t ]
 };
 return {
  c: [ e.HCM, {
   b: e.UIR + "\\s",
   e: ";|{",
   rB: !0,
   c: [ e.inherit(e.UTM, {
    starts: n
   }) ],
   r: 0
  } ],
  i: "[^\\s\\}]"
 };
}), hljs.registerLanguage("erlang-repl", function(e) {
 return {
  k: {
   special_functions: "spawn spawn_link self",
   reserved: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
  },
  c: [ {
   cN: "prompt",
   b: "^[0-9]+> ",
   r: 10
  }, {
   cN: "comment",
   b: "%",
   e: "$"
  }, {
   cN: "number",
   b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
   r: 0
  }, e.ASM, e.QSM, {
   cN: "constant",
   b: "\\?(::)?([A-Z]\\w*(::)?)+"
  }, {
   cN: "arrow",
   b: "->"
  }, {
   cN: "ok",
   b: "ok"
  }, {
   cN: "exclamation_mark",
   b: "!"
  }, {
   cN: "function_or_atom",
   b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
   r: 0
  }, {
   cN: "variable",
   b: "[A-Z][a-zA-Z0-9_']*",
   r: 0
  } ]
 };
}), hljs.registerLanguage("r", function(e) {
 var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
 return {
  c: [ e.HCM, {
   b: t,
   l: t,
   k: {
    keyword: "function if in break next repeat else for return switch while try tryCatch|10 stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...|10",
    literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
   },
   r: 0
  }, {
   cN: "number",
   b: "0[xX][0-9a-fA-F]+[Li]?\\b",
   r: 0
  }, {
   cN: "number",
   b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
   r: 0
  }, {
   cN: "number",
   b: "\\d+\\.(?!\\d)(?:i\\b)?",
   r: 0
  }, {
   cN: "number",
   b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
   r: 0
  }, {
   cN: "number",
   b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
   r: 0
  }, {
   b: "`",
   e: "`",
   r: 0
  }, {
   cN: "string",
   c: [ e.BE ],
   v: [ {
    b: '"',
    e: '"'
   }, {
    b: "'",
    e: "'"
   } ]
  } ]
 };
}), hljs.registerLanguage("json", function(e) {
 var t = {
  literal: "true false null"
 }, n = [ e.QSM, e.CNM ], r = {
  cN: "value",
  e: ",",
  eW: !0,
  eE: !0,
  c: n,
  k: t
 }, i = {
  b: "{",
  e: "}",
  c: [ {
   cN: "attribute",
   b: '\\s*"',
   e: '"\\s*:\\s*',
   eB: !0,
   eE: !0,
   c: [ e.BE ],
   i: "\\n",
   starts: r
  } ],
  i: "\\S"
 }, a = {
  b: "\\[",
  e: "\\]",
  c: [ e.inherit(r, {
   cN: null
  }) ],
  i: "\\S"
 };
 return n.splice(n.length, 0, i, a), {
  c: n,
  k: t,
  i: "\\S"
 };
}), hljs.registerLanguage("django", function() {
 var e = {
  cN: "filter",
  b: /\|[A-Za-z]+\:?/,
  k: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone",
  c: [ {
   cN: "argument",
   b: /"/,
   e: /"/
  }, {
   cN: "argument",
   b: /'/,
   e: /'/
  } ]
 };
 return {
  cI: !0,
  sL: "xml",
  subLanguageMode: "continuous",
  c: [ {
   cN: "template_comment",
   b: /\{%\s*comment\s*%}/,
   e: /\{%\s*endcomment\s*%}/
  }, {
   cN: "template_comment",
   b: /\{#/,
   e: /#}/
  }, {
   cN: "template_tag",
   b: /\{%/,
   e: /%}/,
   k: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor in ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup by as ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim",
   c: [ e ]
  }, {
   cN: "variable",
   b: /\{\{/,
   e: /}}/,
   c: [ e ]
  } ]
 };
}), hljs.registerLanguage("delphi", function(e) {
 var t = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure", n = {
  cN: "comment",
  v: [ {
   b: /\{/,
   e: /\}/,
   r: 0
  }, {
   b: /\(\*/,
   e: /\*\)/,
   r: 10
  } ]
 }, r = {
  cN: "string",
  b: /'/,
  e: /'/,
  c: [ {
   b: /''/
  } ]
 }, i = {
  cN: "string",
  b: /(#\d+)+/
 }, a = {
  b: e.IR + "\\s*=\\s*class\\s*\\(",
  rB: !0,
  c: [ e.TM ]
 }, o = {
  cN: "function",
  bK: "function constructor destructor procedure",
  e: /[:;]/,
  k: "function constructor|10 destructor|10 procedure|10",
  c: [ e.TM, {
   cN: "params",
   b: /\(/,
   e: /\)/,
   k: t,
   c: [ r, i ]
  }, n ]
 };
 return {
  cI: !0,
  k: t,
  i: /("|\$[G-Zg-z]|\/\*|<\/)/,
  c: [ n, e.CLCM, r, i, e.NM, a, o ]
 };
}), hljs.registerLanguage("vbscript", function(e) {
 return {
  cI: !0,
  k: {
   keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
   built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
   literal: "true false null nothing empty"
  },
  i: "//",
  c: [ e.inherit(e.QSM, {
   c: [ {
    b: '""'
   } ]
  }), {
   cN: "comment",
   b: /'/,
   e: /$/,
   r: 0
  }, e.CNM ]
 };
}), hljs.registerLanguage("oxygene", function(e) {
 var t = "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained", n = {
  cN: "comment",
  b: "{",
  e: "}",
  r: 0
 }, r = {
  cN: "comment",
  b: "\\(\\*",
  e: "\\*\\)",
  r: 10
 }, i = {
  cN: "string",
  b: "'",
  e: "'",
  c: [ {
   b: "''"
  } ]
 }, a = {
  cN: "string",
  b: "(#\\d+)+"
 }, o = {
  cN: "function",
  bK: "function constructor destructor procedure method",
  e: "[:;]",
  k: "function constructor|10 destructor|10 procedure|10 method|10",
  c: [ e.TM, {
   cN: "params",
   b: "\\(",
   e: "\\)",
   k: t,
   c: [ i, a ]
  }, n, r ]
 };
 return {
  cI: !0,
  k: t,
  i: '("|\\$[G-Zg-z]|\\/\\*|</)',
  c: [ n, r, e.CLCM, i, a, e.NM, o, {
   cN: "class",
   b: "=\\bclass\\b",
   e: "end;",
   k: t,
   c: [ i, a, n, r, e.CLCM, o ]
  } ]
 };
}), hljs.registerLanguage("mel", function(e) {
 return {
  k: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform",
  i: "</",
  c: [ e.CNM, e.ASM, e.QSM, {
   cN: "string",
   b: "`",
   e: "`",
   c: [ e.BE ]
  }, {
   cN: "variable",
   v: [ {
    b: "\\$\\d"
   }, {
    b: "[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)"
   }, {
    b: "\\*(\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)",
    r: 0
   } ]
  }, e.CLCM, e.CBLCLM ]
 };
}), hljs.registerLanguage("dos", function() {
 return {
  cI: !0,
  k: {
   flow: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
   keyword: "shift cd dir echo setlocal endlocal set pause copy",
   stream: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux",
   winutils: "ping net ipconfig taskkill xcopy ren del"
  },
  c: [ {
   cN: "envvar",
   b: "%%[^ ]"
  }, {
   cN: "envvar",
   b: "%[^ ]+?%"
  }, {
   cN: "envvar",
   b: "![^ ]+?!"
  }, {
   cN: "number",
   b: "\\b\\d+",
   r: 0
  }, {
   cN: "comment",
   b: "@?rem",
   e: "$"
  } ]
 };
}), hljs.registerLanguage("apache", function(e) {
 var t = {
  cN: "number",
  b: "[\\$%]\\d+"
 };
 return {
  cI: !0,
  c: [ e.HCM, {
   cN: "tag",
   b: "</?",
   e: ">"
  }, {
   cN: "keyword",
   b: /\w+/,
   r: 0,
   k: {
    common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
   },
   starts: {
    e: /$/,
    r: 0,
    k: {
     literal: "on off all"
    },
    c: [ {
     cN: "sqbracket",
     b: "\\s\\[",
     e: "\\]$"
    }, {
     cN: "cbracket",
     b: "[\\$%]\\{",
     e: "\\}",
     c: [ "self", t ]
    }, t, e.QSM ]
   }
  } ],
  i: /\S/
 };
}), hljs.registerLanguage("scss", function(e) {
 {
  var t = "[a-zA-Z-][a-zA-Z0-9_-]*", n = {
   cN: "function",
   b: t + "\\(",
   e: "\\)",
   c: [ "self", e.NM, e.ASM, e.QSM ]
  }, r = {
   cN: "hexcolor",
   b: "#[0-9A-Fa-f]+"
  };
  ({
   cN: "attribute",
   b: "[A-Z\\_\\.\\-]+",
   e: ":",
   eE: !0,
   i: "[^\\s]",
   starts: {
    cN: "value",
    eW: !0,
    eE: !0,
    c: [ n, r, e.NM, e.QSM, e.ASM, e.CBLCLM, {
     cN: "important",
     b: "!important"
    } ]
   }
  });
 }
 return {
  cI: !0,
  i: "[=/|']",
  c: [ e.CLCM, e.CBLCLM, {
   cN: "function",
   b: t + "\\(",
   e: "\\)",
   c: [ "self", e.NM, e.ASM, e.QSM ]
  }, {
   cN: "id",
   b: "\\#[A-Za-z0-9_-]+",
   r: 0
  }, {
   cN: "class",
   b: "\\.[A-Za-z0-9_-]+",
   r: 0
  }, {
   cN: "attr_selector",
   b: "\\[",
   e: "\\]",
   i: "$"
  }, {
   cN: "tag",
   b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
   r: 0
  }, {
   cN: "pseudo",
   b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
  }, {
   cN: "pseudo",
   b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
  }, {
   cN: "attribute",
   b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
   i: "[^\\s]"
  }, {
   cN: "value",
   b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
  }, {
   cN: "value",
   b: ":",
   e: ";",
   c: [ r, e.NM, e.QSM, e.ASM, {
    cN: "important",
    b: "!important"
   } ]
  }, {
   cN: "at_rule",
   b: "@",
   e: "[{;]",
   k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
   c: [ n, e.QSM, e.ASM, r, e.NM, {
    cN: "preprocessor",
    b: "\\s[A-Za-z0-9_.-]+",
    r: 0
   } ]
  } ]
 };
}), hljs.registerLanguage("applescript", function(e) {
 var t = e.inherit(e.QSM, {
  i: ""
 }), n = {
  cN: "params",
  b: "\\(",
  e: "\\)",
  c: [ "self", e.CNM, t ]
 }, r = [ {
  cN: "comment",
  b: "--",
  e: "$"
 }, {
  cN: "comment",
  b: "\\(\\*",
  e: "\\*\\)",
  c: [ "self", {
   b: "--",
   e: "$"
  } ]
 }, e.HCM ];
 return {
  k: {
   keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the then third through thru timeout times to transaction try until where while whose with without",
   constant: "AppleScript false linefeed return pi quote result space tab true",
   type: "alias application boolean class constant date file integer list number real record string text",
   command: "activate beep count delay launch log offset read round run say summarize write",
   property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
  },
  c: [ t, e.CNM, {
   cN: "type",
   b: "\\bPOSIX file\\b"
  }, {
   cN: "command",
   b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
  }, {
   cN: "constant",
   b: "\\b(text item delimiters|current application|missing value)\\b"
  }, {
   cN: "keyword",
   b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
  }, {
   cN: "property",
   b: "\\b(POSIX path|(date|time) string|quoted form)\\b"
  }, {
   cN: "function_start",
   bK: "on",
   i: "[${=;\\n]",
   c: [ e.UTM, n ]
  } ].concat(r),
  i: "//"
 };
}), hljs.registerLanguage("lasso", function(e) {
 var t = "[a-zA-Z_][a-zA-Z0-9_.]*", n = "<\\?(lasso(script)?|=)", r = "\\]|\\?>", i = {
  literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
  built_in: "array date decimal duration integer map pair string tag xml null bytes list queue set stack staticarray tie local var variable global data self inherited",
  keyword: "error_code error_msg error_pop error_push error_reset cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
 }, a = {
  cN: "comment",
  b: "<!--",
  e: "-->",
  r: 0
 }, o = {
  cN: "preprocessor",
  b: "\\[noprocess\\]",
  starts: {
   cN: "markup",
   e: "\\[/noprocess\\]",
   rE: !0,
   c: [ a ]
  }
 }, s = {
  cN: "preprocessor",
  b: "\\[/noprocess|" + n
 }, l = {
  cN: "variable",
  b: "'" + t + "'"
 }, c = [ e.CLCM, {
  cN: "javadoc",
  b: "/\\*\\*!",
  e: "\\*/"
 }, e.CBLCLM, e.inherit(e.CNM, {
  b: e.CNR + "|-?(infinity|nan)\\b"
 }), e.inherit(e.ASM, {
  i: null
 }), e.inherit(e.QSM, {
  i: null
 }), {
  cN: "string",
  b: "`",
  e: "`"
 }, {
  cN: "variable",
  v: [ {
   b: "[#$]" + t
  }, {
   b: "#",
   e: "\\d+",
   i: "\\W"
  } ]
 }, {
  cN: "tag",
  b: "::\\s*",
  e: t,
  i: "\\W"
 }, {
  cN: "attribute",
  b: "\\.\\.\\.|-" + e.UIR
 }, {
  cN: "subst",
  v: [ {
   b: "->\\s*",
   c: [ l ]
  }, {
   b: ":=|/(?!\\w)=?|[-+*%=<>&|!?\\\\]+",
   r: 0
  } ]
 }, {
  cN: "built_in",
  b: "\\.\\.?",
  r: 0,
  c: [ l ]
 }, {
  cN: "class",
  bK: "define",
  rE: !0,
  e: "\\(|=>",
  c: [ e.inherit(e.TM, {
   b: e.UIR + "(=(?!>))?"
  }) ]
 } ];
 return {
  aliases: [ "ls", "lassoscript" ],
  cI: !0,
  l: t + "|&[lg]t;",
  k: i,
  c: [ {
   cN: "preprocessor",
   b: r,
   r: 0,
   starts: {
    cN: "markup",
    e: "\\[|" + n,
    rE: !0,
    r: 0,
    c: [ a ]
   }
  }, o, s, {
   cN: "preprocessor",
   b: "\\[no_square_brackets",
   starts: {
    e: "\\[/no_square_brackets\\]",
    l: t + "|&[lg]t;",
    k: i,
    c: [ {
     cN: "preprocessor",
     b: r,
     r: 0,
     starts: {
      cN: "markup",
      e: n,
      rE: !0,
      c: [ a ]
     }
    }, o, s ].concat(c)
   }
  }, {
   cN: "preprocessor",
   b: "\\[",
   r: 0
  }, {
   cN: "shebang",
   b: "^#!.+lasso9\\b",
   r: 10
  } ].concat(c)
 };
}), hljs.registerLanguage("cpp", function(e) {
 var t = {
  keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
  built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
 };
 return {
  aliases: [ "c" ],
  k: t,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.QSM, {
   cN: "string",
   b: "'\\\\?.",
   e: "'",
   i: "."
  }, {
   cN: "number",
   b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
  }, e.CNM, {
   cN: "preprocessor",
   b: "#",
   e: "$",
   c: [ {
    b: "include\\s*<",
    e: ">",
    i: "\\n"
   }, e.CLCM ]
  }, {
   cN: "stl_container",
   b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
   e: ">",
   k: t,
   r: 10,
   c: [ "self" ]
  } ]
 };
}), hljs.registerLanguage("matlab", function(e) {
 var t = [ e.CNM, {
  cN: "string",
  b: "'",
  e: "'",
  c: [ e.BE, {
   b: "''"
  } ]
 } ];
 return {
  k: {
   keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
   built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
  },
  i: '(//|"|#|/\\*|\\s+/\\w+)',
  c: [ {
   cN: "function",
   bK: "function",
   e: "$",
   c: [ e.UTM, {
    cN: "params",
    b: "\\(",
    e: "\\)"
   }, {
    cN: "params",
    b: "\\[",
    e: "\\]"
   } ]
  }, {
   cN: "transposed_variable",
   b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
   e: "",
   r: 0
  }, {
   cN: "matrix",
   b: "\\[",
   e: "\\]'*[\\.']*",
   c: t,
   r: 0
  }, {
   cN: "cell",
   b: "\\{",
   e: "\\}'*[\\.']*",
   c: t,
   i: /:/
  }, {
   cN: "comment",
   b: "\\%",
   e: "$"
  } ].concat(t)
 };
}), hljs.registerLanguage("scilab", function(e) {
 var t = [ e.CNM, {
  cN: "string",
  b: "'|\"",
  e: "'|\"",
  c: [ e.BE, {
   b: "''"
  } ]
 } ];
 return {
  k: {
   keyword: "abort break case clear catch continue do elseif else endfunction end for functionglobal if pause return resume select try then while%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
   built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp errorexec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isemptyisinfisnan isvector lasterror length load linspace list listfiles log10 log2 logmax min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand realround sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tantype typename warning zeros matrix"
  },
  i: '("|#|/\\*|\\s+/\\w+)',
  c: [ {
   cN: "function",
   bK: "function endfunction",
   e: "$",
   k: "function endfunction|10",
   c: [ e.UTM, {
    cN: "params",
    b: "\\(",
    e: "\\)"
   } ]
  }, {
   cN: "transposed_variable",
   b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
   e: "",
   r: 0
  }, {
   cN: "matrix",
   b: "\\[",
   e: "\\]'*[\\.']*",
   r: 0,
   c: t
  }, {
   cN: "comment",
   b: "//",
   e: "$"
  } ].concat(t)
 };
}), hljs.registerLanguage("makefile", function(e) {
 var t = {
  cN: "variable",
  b: /\$\(/,
  e: /\)/,
  c: [ e.BE ]
 };
 return {
  c: [ e.HCM, {
   b: /^\w+\s*\W*=/,
   rB: !0,
   r: 0,
   starts: {
    cN: "constant",
    e: /\s*\W*=/,
    eE: !0,
    starts: {
     e: /$/,
     r: 0,
     c: [ t ]
    }
   }
  }, {
   cN: "title",
   b: /^[\w]+:\s*$/
  }, {
   cN: "phony",
   b: /^\.PHONY:/,
   e: /$/,
   k: ".PHONY",
   l: /[\.\w]+/
  }, {
   b: /^\t+/,
   e: /$/,
   c: [ e.QSM, t ]
  } ]
 };
}), hljs.registerLanguage("asciidoc", function() {
 return {
  c: [ {
   cN: "comment",
   b: "^/{4,}\\n",
   e: "\\n/{4,}$",
   r: 10
  }, {
   cN: "comment",
   b: "^//",
   e: "$",
   r: 0
  }, {
   cN: "title",
   b: "^\\.\\w.*$"
  }, {
   b: "^[=\\*]{4,}\\n",
   e: "\\n^[=\\*]{4,}$",
   r: 10
  }, {
   cN: "header",
   b: "^(={1,5}) .+?( \\1)?$",
   r: 10
  }, {
   cN: "header",
   b: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$",
   r: 10
  }, {
   cN: "attribute",
   b: "^:.+?:",
   e: "\\s",
   eE: !0,
   r: 10
  }, {
   cN: "attribute",
   b: "^\\[.+?\\]$",
   r: 0
  }, {
   cN: "blockquote",
   b: "^_{4,}\\n",
   e: "\\n_{4,}$",
   r: 10
  }, {
   cN: "code",
   b: "^[\\-\\.]{4,}\\n",
   e: "\\n[\\-\\.]{4,}$",
   r: 10
  }, {
   b: "^\\+{4,}\\n",
   e: "\\n\\+{4,}$",
   c: [ {
    b: "<",
    e: ">",
    sL: "xml",
    r: 0
   } ],
   r: 10
  }, {
   cN: "bullet",
   b: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+"
  }, {
   cN: "label",
   b: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
   r: 10
  }, {
   cN: "strong",
   b: "\\B\\*(?![\\*\\s])",
   e: "(\\n{2}|\\*)",
   c: [ {
    b: "\\\\*\\w",
    r: 0
   } ]
  }, {
   cN: "emphasis",
   b: "\\B'(?!['\\s])",
   e: "(\\n{2}|')",
   c: [ {
    b: "\\\\'\\w",
    r: 0
   } ],
   r: 0
  }, {
   cN: "emphasis",
   b: "_(?![_\\s])",
   e: "(\\n{2}|_)",
   r: 0
  }, {
   cN: "smartquote",
   b: "``.+?''",
   r: 10
  }, {
   cN: "smartquote",
   b: "`.+?'",
   r: 10
  }, {
   cN: "code",
   b: "(`.+?`|\\+.+?\\+)",
   r: 0
  }, {
   cN: "code",
   b: "^[ \\t]",
   e: "$",
   r: 0
  }, {
   cN: "horizontal_rule",
   b: "^'{3,}[ \\t]*$",
   r: 10
  }, {
   b: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
   rB: !0,
   c: [ {
    b: "(link|image:?):",
    r: 0
   }, {
    cN: "link_url",
    b: "\\w",
    e: "[^\\[]+",
    r: 0
   }, {
    cN: "link_label",
    b: "\\[",
    e: "\\]",
    eB: !0,
    eE: !0,
    r: 0
   } ],
   r: 10
  } ]
 };
}), hljs.registerLanguage("parser3", function(e) {
 return {
  sL: "xml",
  r: 0,
  c: [ {
   cN: "comment",
   b: "^#",
   e: "$"
  }, {
   cN: "comment",
   b: "\\^rem{",
   e: "}",
   r: 10,
   c: [ {
    b: "{",
    e: "}",
    c: [ "self" ]
   } ]
  }, {
   cN: "preprocessor",
   b: "^@(?:BASE|USE|CLASS|OPTIONS)$",
   r: 10
  }, {
   cN: "title",
   b: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
  }, {
   cN: "variable",
   b: "\\$\\{?[\\w\\-\\.\\:]+\\}?"
  }, {
   cN: "keyword",
   b: "\\^[\\w\\-\\.\\:]+"
  }, {
   cN: "number",
   b: "\\^#[0-9a-fA-F]+"
  }, e.CNM ]
 };
}), hljs.registerLanguage("clojure", function(e) {
 var t = {
  built_in: "def cond apply if-not if-let if not not= = &lt; < > &lt;= <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
 }, n = "[a-zA-Z_0-9\\!\\.\\?\\-\\+\\*\\/\\<\\=\\>\\&\\#\\$';]+", r = "[\\s:\\(\\{]+\\d+(\\.\\d+)?", i = {
  cN: "number",
  b: r,
  r: 0
 }, a = e.inherit(e.QSM, {
  i: null
 }), o = {
  cN: "comment",
  b: ";",
  e: "$",
  r: 0
 }, s = {
  cN: "collection",
  b: "[\\[\\{]",
  e: "[\\]\\}]"
 }, l = {
  cN: "comment",
  b: "\\^" + n
 }, c = {
  cN: "comment",
  b: "\\^\\{",
  e: "\\}"
 }, u = {
  cN: "attribute",
  b: "[:]" + n
 }, d = {
  cN: "list",
  b: "\\(",
  e: "\\)"
 }, p = {
  eW: !0,
  k: {
   literal: "true false nil"
  },
  r: 0
 }, h = {
  k: t,
  l: n,
  cN: "title",
  b: n,
  starts: p
 };
 return d.c = [ {
  cN: "comment",
  b: "comment"
 }, h, p ], p.c = [ d, a, l, c, o, u, s, i ], s.c = [ d, a, l, o, u, s, i ], {
  i: /\S/,
  c: [ o, d, {
   cN: "prompt",
   b: /^=> /,
   starts: {
    e: /\n\n|\Z/
   }
  } ]
 };
}), hljs.registerLanguage("go", function(e) {
 var t = {
  keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",
  constant: "true false iota nil",
  typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
  built_in: "append cap close complex copy imag len make new panic print println real recover delete"
 };
 return {
  aliases: [ "golang" ],
  k: t,
  i: "</",
  c: [ e.CLCM, e.CBLCLM, e.QSM, {
   cN: "string",
   b: "'",
   e: "[^\\\\]'"
  }, {
   cN: "string",
   b: "`",
   e: "`"
  }, {
   cN: "number",
   b: "[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",
   r: 0
  }, e.CNM ]
 };
}), define("highlightjs", function(e) {
 return function() {
  var t;
  return t || e.hljs;
 };
}(this));

var Markdown;

Markdown = "object" == typeof exports && "function" == typeof require ? exports : {}, 
function() {
 function e(e) {
  return e;
 }
 function t() {
  return !1;
 }
 function n() {}
 function r() {}
 n.prototype = {
  chain: function(t, n) {
   var r = this[t];
   if (!r) throw new Error("unknown hook " + t);
   this[t] = r === e ? n : function() {
    var e = Array.prototype.slice.call(arguments, 0);
    return e[0] = r.apply(null, e), n.apply(null, e);
   };
  },
  set: function(e, t) {
   if (!this[e]) throw new Error("unknown hook " + e);
   this[e] = t;
  },
  addNoop: function(t) {
   this[t] = e;
  },
  addFalse: function(e) {
   this[e] = t;
  }
 }, Markdown.HookCollection = n, r.prototype = {
  set: function(e, t) {
   this["s_" + e] = t;
  },
  get: function(e) {
   return this["s_" + e];
  }
 }, Markdown.Converter = function() {
  function e(e) {
   return e = e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t, n, r, i, a) {
    return t = t.toLowerCase(), P.set(t, C(n)), i ? r : (a && F.set(t, a.replace(/"/g, "&quot;")), 
    "");
   });
  }
  function t(e) {
   return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, i), 
   e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm, i), 
   e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, i), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, i), 
   e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, i);
  }
  function i(e, t) {
   var n = t;
   return n = n.replace(/^\n+/, ""), n = n.replace(/\n+$/g, ""), n = "\n\n~K" + (O.push(n) - 1) + "K\n\n";
  }
  function a(e, n) {
   e = R.preBlockGamut(e, $), e = h(e);
   var r = "<hr />\n";
   return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, r), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, r), 
   e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, r), e = f(e), e = g(e), e = w(e), 
   e = R.postBlockGamut(e, $), e = t(e), e = S(e, n);
  }
  function o(e) {
   return e = R.preSpanGamut(e), e = v(e), e = s(e), e = _(e), e = u(e), e = l(e), 
   e = k(e), e = e.replace(/~P/g, "://"), e = C(e), e = L._DoItalicsAndBold ? L._DoItalicsAndBold(e) : x(e), 
   e = e.replace(/  +\n/g, " <br>\n"), e = R.postSpanGamut(e);
  }
  function s(e) {
   var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
   return e = e.replace(t, function(e) {
    var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
    return t = I(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_");
   });
  }
  function l(e) {
   return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, c), 
   e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, c), 
   e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, c);
  }
  function c(e, t, n, r, i, a, o, s) {
   void 0 == s && (s = "");
   var l = t, c = n.replace(/:\/\//g, "~P"), u = r.toLowerCase(), p = i, h = s;
   if ("" == p) if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, 
   void 0 != P.get(u)) p = P.get(u), void 0 != F.get(u) && (h = F.get(u)); else {
    if (!(l.search(/\(\s*\)$/m) > -1)) return l;
    p = "";
   }
   p = M(p), p = I(p, "*_");
   var f = '<a href="' + p + '"';
   return "" != h && (h = d(h), h = I(h, "*_"), f += ' title="' + h + '"'), f += ">" + c + "</a>";
  }
  function u(e) {
   return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p);
  }
  function d(e) {
   return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  function p(e, t, n, r, i, a, o, s) {
   var l = t, c = n, u = r.toLowerCase(), p = i, h = s;
   if (h || (h = ""), "" == p) {
    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, void 0 == P.get(u)) return l;
    p = P.get(u), void 0 != F.get(u) && (h = F.get(u));
   }
   c = I(d(c), "*_[]()"), p = I(p, "*_");
   var f = '<img src="' + p + '" alt="' + c + '"';
   return h = d(h), h = I(h, "*_"), f += ' title="' + h + '"', f += " />";
  }
  function h(e) {
   return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
    return "<h1>" + o(t) + "</h1>\n\n";
   }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
    return "<h2>" + o(t) + "</h2>\n\n";
   }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
    var r = t.length;
    return "<h" + r + ">" + o(n) + "</h" + r + ">\n\n";
   });
  }
  function f(e, t) {
   e += "~0";
   var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
   return B ? e = e.replace(n, function(e, n, r) {
    var i = n, a = r.search(/[*+-]/g) > -1 ? "ul" : "ol", o = m(i, a, t);
    return o = o.replace(/\s+$/, ""), o = "<" + a + ">" + o + "</" + a + ">\n";
   }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
   e = e.replace(n, function(e, t, n, r) {
    var i = t, a = n, o = r.search(/[*+-]/g) > -1 ? "ul" : "ol", s = m(a, o);
    return s = i + "<" + o + ">\n" + s + "</" + o + ">\n";
   })), e = e.replace(/~0/, "");
  }
  function m(e, t, n) {
   B++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
   var r = G[t], i = new RegExp("(^[ \\t]*)(" + r + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + r + ")[ \\t]+))", "gm"), s = !1;
   return e = e.replace(i, function(e, t, r, i) {
    var l = i, c = /\n\n$/.test(l), u = c || l.search(/\n{2,}/) > -1;
    return u || s ? l = a(N(l), !0) : (l = f(N(l), !0), l = l.replace(/\n$/, ""), n || (l = o(l))), 
    s = c, "<li>" + l + "</li>\n";
   }), e = e.replace(/~0/g, ""), B--, e;
  }
  function g(e) {
   return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
    var r = t, i = n;
    return r = y(N(r)), r = D(r), r = r.replace(/^\n+/g, ""), r = r.replace(/\n+$/g, ""), 
    r = "<pre><code>" + r + "\n</code></pre>", "\n\n" + r + "\n\n" + i;
   }), e = e.replace(/~0/, "");
  }
  function b(e) {
   return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (O.push(e) - 1) + "K\n\n";
  }
  function v(e) {
   return e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, r) {
    var i = r;
    return i = i.replace(/^([ \t]*)/g, ""), i = i.replace(/[ \t]*$/g, ""), i = y(i), 
    i = i.replace(/:\/\//g, "~P"), t + "<code>" + i + "</code>";
   });
  }
  function y(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = I(e, "*_{}[]\\", !1);
  }
  function x(e) {
   return e = e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g, "$1<strong>$3</strong>$4"), 
   e = e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g, "$1<em>$3</em>$4");
  }
  function w(e) {
   return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, t) {
    var n = t;
    return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), 
    n = a(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
     var n = t;
     return n = n.replace(/^  /gm, "~0"), n = n.replace(/~0/g, "");
    }), b("<blockquote>\n" + n + "\n</blockquote>");
   });
  }
  function S(e, t) {
   e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
   for (var n = e.split(/\n{2,}/g), r = [], i = /~K(\d+)K/, a = n.length, s = 0; a > s; s++) {
    var l = n[s];
    i.test(l) ? r.push(l) : /\S/.test(l) && (l = o(l), l = l.replace(/^([ \t]*)/g, "<p>"), 
    l += "</p>", r.push(l));
   }
   if (!t) {
    a = r.length;
    for (var s = 0; a > s; s++) for (var c = !0; c; ) c = !1, r[s] = r[s].replace(/~K(\d+)K/g, function(e, t) {
     return c = !0, O[t];
    });
   }
   return r.join("\n\n");
  }
  function C(e) {
   return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
  }
  function _(e) {
   return e = e.replace(/\\(\\)/g, A), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, A);
  }
  function E(e, t, n, r) {
   if (t) return e;
   if (")" !== r.charAt(r.length - 1)) return "<" + n + r + ">";
   for (var i = r.match(/[()]/g), a = 0, o = 0; o < i.length; o++) "(" === i[o] ? 0 >= a ? a = 1 : a++ : a--;
   var s = "";
   if (0 > a) {
    var l = new RegExp("\\){1," + -a + "}$");
    r = r.replace(l, function(e) {
     return s = e, "";
    });
   }
   if (s) {
    var c = r.charAt(r.length - 1);
    z.test(c) || (s = c + s, r = r.substr(0, r.length - 1));
   }
   return "<" + n + r + ">" + s;
  }
  function k(e) {
   e = e.replace(H, E);
   var t = function(e, t) {
    return '<a href="' + t + '">' + R.plainLinkText(t) + "</a>";
   };
   return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, t);
  }
  function T(e) {
   return e = e.replace(/~E(\d+)E/g, function(e, t) {
    var n = parseInt(t);
    return String.fromCharCode(n);
   });
  }
  function N(e) {
   return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "");
  }
  function D(e) {
   if (!/\t/.test(e)) return e;
   var t, n = [ "    ", "   ", "  ", " " ], r = 0;
   return e.replace(/[\n\t]/g, function(e, i) {
    return "\n" === e ? (r = i + 1, e) : (t = (i - r) % 4, r = i + 1, n[t]);
   });
  }
  function M(e) {
   if (!e) return "";
   e.length;
   return e.replace(q, function(e) {
    return "~D" == e ? "%24" : ":" == e ? ":" : "%" + e.charCodeAt(0).toString(16);
   });
  }
  function I(e, t, n) {
   var r = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
   n && (r = "\\\\" + r);
   var i = new RegExp(r, "g");
   return e = e.replace(i, A);
  }
  function A(e, t) {
   var n = t.charCodeAt(0);
   return "~E" + n + "E";
  }
  var L = {};
  this.setOptions = function(e) {
   L = e;
  };
  var R = this.hooks = new n();
  R.addNoop("plainLinkText"), R.addNoop("preConversion"), R.addNoop("postNormalization"), 
  R.addNoop("preBlockGamut"), R.addNoop("postBlockGamut"), R.addNoop("preSpanGamut"), 
  R.addNoop("postSpanGamut"), R.addNoop("postConversion");
  var P, F, O, B;
  this.makeHtml = function(n) {
   if (P) throw new Error("Recursive call to converter.makeHtml");
   return P = new r(), F = new r(), O = [], B = 0, n = R.preConversion(n), n = n.replace(/~/g, "~T"), 
   n = n.replace(/\$/g, "~D"), n = n.replace(/\r\n/g, "\n"), n = n.replace(/\r/g, "\n"), 
   n = "\n\n" + n + "\n\n", n = D(n), n = n.replace(/^[ \t]+$/gm, ""), n = R.postNormalization(n), 
   n = t(n), n = e(n), n = a(n), n = T(n), n = n.replace(/~D/g, "$$"), n = n.replace(/~T/g, "~"), 
   n = R.postConversion(n), O = F = P = null, n;
  };
  var $ = function(e) {
   return a(e);
  }, G = {
   ol: "\\d+[.]",
   ul: "[*+-]"
  }, j = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]", U = "[-A-Z0-9+&@#/%=~_|[\\])]", H = new RegExp('(="|<)?\\b(https?|ftp)(://' + j + "*" + U + ")(?=$|\\W)", "gi"), z = new RegExp(U, "i"), q = /(?:["'*()[\]:]|~D)/g;
 };
}(), define("libs/Markdown.Converter", function() {}), function() {
 function e(e) {
  return e.replace(/^\s+|\s+$/g, "");
 }
 function t(e) {
  return e.replace(/\s+$/g, "");
 }
 function n(e) {
  return e.replace(new RegExp("^(\\t|[ ]{1,4})", "gm"), "");
 }
 function r(e, t) {
  return -1 != e.indexOf(t);
 }
 function i(e, t) {
  return e.replace(/<[^>]*>?/gi, function(e) {
   return e.match(t) ? e : "";
  });
 }
 function a(e, t) {
  for (var n = {}, r = 0; r < e.length; r++) n[e[r]] = e[r];
  for (r = 0; r < t.length; r++) n[t[r]] = t[r];
  var i = [];
  for (var a in n) n.hasOwnProperty(a) && i.push(n[a]);
  return i;
 }
 function o(e) {
  return "" != e.charAt(0) && (e = "" + e), "" != e.charAt(e.length - 1) && (e += ""), 
  e;
 }
 function s(e) {
  return "" == e.charAt(0) && (e = e.substr(1)), "" == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), 
  e;
 }
 function l(e, t) {
  return i(c(e, t), m);
 }
 function c(e, t) {
  var n = t.blockGamutHookCallback(e);
  return n = p(n), n = n.replace(/~D/g, "$$").replace(/~T/g, "~"), n = t.previousPostConversion(n);
 }
 function u(e) {
  return e.replace(/\\\|/g, "~I").replace(/\\:/g, "~i");
 }
 function d(e) {
  return e.replace(/~I/g, "|").replace(/~i/g, ":");
 }
 function p(e) {
  return e = e.replace(/~E(\d+)E/g, function(e, t) {
   var n = parseInt(t);
   return String.fromCharCode(n);
  });
 }
 function h(e) {
  return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
 }
 function f(e, t) {
  var n = t;
  return n = n.replace(/&\#8220;/g, '"'), n = n.replace(/&\#8221;/g, '"'), n = n.replace(/&\#8216;/g, "'"), 
  n = n.replace(/&\#8217;/g, "'"), n = n.replace(/&\#8212;/g, "---"), n = n.replace(/&\#8211;/g, "--"), 
  n = n.replace(/&\#8230;/g, "...");
 }
 var m = new RegExp([ "^(<\\/?(a|abbr|acronym|applet|area|b|basefont|", "bdo|big|button|cite|code|del|dfn|em|figcaption|", "font|i|iframe|img|input|ins|kbd|label|map|", "mark|meter|object|param|progress|q|ruby|rp|rt|s|", "samp|script|select|small|span|strike|strong|", "sub|sup|textarea|time|tt|u|var|wbr)[^>]*>|", "<(br)\\s?\\/?>)$" ].join(""), "i");
 Array.indexOf || (Array.prototype.indexOf = function(e) {
  for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
  return -1;
 }), Markdown.Extra = function() {
  this.converter = null, this.hashBlocks = [], this.footnotes = {}, this.usedFootnotes = [], 
  this.attributeBlocks = !1, this.googleCodePrettify = !1, this.highlightJs = !1, 
  this.tableClass = "", this.tabWidth = 4;
 }, Markdown.Extra.init = function(e, t) {
  var n = new Markdown.Extra(), i = [], a = [], o = [], s = [ "unHashExtraBlocks" ];
  return t = t || {}, t.extensions = t.extensions || [ "all" ], r(t.extensions, "all") && (t.extensions = [ "tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes", "smartypants", "strikethrough", "newlines" ]), 
  a.push("wrapHeaders"), r(t.extensions, "attr_list") && (i.push("hashFcbAttributeBlocks"), 
  a.push("hashHeaderAttributeBlocks"), s.push("applyAttributeBlocks"), n.attributeBlocks = !0), 
  r(t.extensions, "fenced_code_gfm") && (a.push("fencedCodeBlocks"), i.push("fencedCodeBlocks")), 
  r(t.extensions, "tables") && a.push("tables"), r(t.extensions, "def_list") && a.push("definitionLists"), 
  r(t.extensions, "footnotes") && (i.push("stripFootnoteDefinitions"), a.push("doFootnotes"), 
  s.push("printFootnotes")), r(t.extensions, "smartypants") && s.push("runSmartyPants"), 
  r(t.extensions, "strikethrough") && o.push("strikethrough"), r(t.extensions, "newlines") && o.push("newlines"), 
  e.hooks.chain("postNormalization", function(e) {
   return n.doTransform(i, e) + "\n";
  }), e.hooks.chain("preBlockGamut", function(e, t) {
   return n.blockGamutHookCallback = t, e = u(e), e = n.doTransform(a, e) + "\n", e = d(e);
  }), e.hooks.chain("postSpanGamut", function(e) {
   return n.doTransform(o, e);
  }), n.previousPostConversion = e.hooks.postConversion, e.hooks.chain("postConversion", function(e) {
   return e = n.doTransform(s, e), n.hashBlocks = [], n.footnotes = {}, n.usedFootnotes = [], 
   e;
  }), "highlighter" in t && (n.googleCodePrettify = "prettify" === t.highlighter, 
  n.highlightJs = "highlight" === t.highlighter), "table_class" in t && (n.tableClass = t.table_class), 
  n.converter = e, n;
 }, Markdown.Extra.prototype.doTransform = function(e, t) {
  for (var n = 0; n < e.length; n++) t = this[e[n]](t);
  return t;
 }, Markdown.Extra.prototype.hashExtraBlock = function(e) {
  return "\n<p>~X" + (this.hashBlocks.push(e) - 1) + "X</p>\n";
 }, Markdown.Extra.prototype.hashExtraInline = function(e) {
  return "~X" + (this.hashBlocks.push(e) - 1) + "X";
 }, Markdown.Extra.prototype.unHashExtraBlocks = function(e) {
  function t() {
   var r = !1;
   e = e.replace(/(?:<p>)?~X(\d+)X(?:<\/p>)?/g, function(e, t) {
    r = !0;
    var i = parseInt(t, 10);
    return n.hashBlocks[i];
   }), r === !0 && t();
  }
  var n = this;
  return t(), e;
 }, Markdown.Extra.prototype.wrapHeaders = function(e) {
  function t(e) {
   return "\n" + e + "\n";
  }
  return e = e.replace(/^.+[ \t]*\n=+[ \t]*\n+/gm, t), e = e.replace(/^.+[ \t]*\n-+[ \t]*\n+/gm, t), 
  e = e.replace(/^\#{1,6}[ \t]*.+?[ \t]*\#*\n+/gm, t);
 };
 var g = "\\{[ \\t]*((?:[#.][-_:a-zA-Z0-9]+[ \\t]*)+)\\}", b = new RegExp("^(#{1,6}.*#{0,6})[ \\t]+" + g + "[ \\t]*(?:\\n|0x03)", "gm"), v = new RegExp("^(.*)[ \\t]+" + g + "[ \\t]*\\n(?=[\\-|=]+\\s*(?:\\n|0x03))", "gm"), y = new RegExp("^(```[^`\\n]*)[ \\t]+" + g + "[ \\t]*\\n(?=([\\s\\S]*?)\\n```[ \\t]*(\\n|0x03))", "gm");
 Markdown.Extra.prototype.hashHeaderAttributeBlocks = function(e) {
  function t(e, t, r) {
   return "<p>~XX" + (n.hashBlocks.push(r) - 1) + "XX</p>\n" + t + "\n";
  }
  var n = this;
  return e = e.replace(b, t), e = e.replace(v, t);
 }, Markdown.Extra.prototype.hashFcbAttributeBlocks = function(e) {
  function t(e, t, r) {
   return "<p>~XX" + (n.hashBlocks.push(r) - 1) + "XX</p>\n" + t + "\n";
  }
  var n = this;
  return e.replace(y, t);
 }, Markdown.Extra.prototype.applyAttributeBlocks = function(e) {
  var t = this, n = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))', "gm");
  return e = e.replace(n, function(e, n, r, i, o) {
   if (!r) return "";
   for (var s = parseInt(n, 10), l = t.hashBlocks[s], c = l.match(/#[^\s#.]+/g) || [], u = c[0] ? ' id="' + c[0].substr(1, c[0].length - 1) + '"' : "", d = l.match(/\.[^\s#.]+/g) || [], p = 0; p < d.length; p++) d[p] = d[p].substr(1, d[p].length - 1);
   var h = "";
   return i && (d = a(d, [ i ])), d.length > 0 && (h = ' class="' + d.join(" ") + '"'), 
   "<" + r + u + h + o;
  });
 }, Markdown.Extra.prototype.tables = function(t) {
  function n(t, n, i, a) {
   n = n.replace(/^ *[|]/m, ""), i = i.replace(/^ *[|]/m, ""), a = a.replace(/^ *[|]/gm, ""), 
   n = n.replace(/[|] *$/m, ""), i = i.replace(/[|] *$/m, ""), a = a.replace(/[|] *$/gm, ""), 
   alignspecs = i.split(/ *[|] */), align = [];
   for (var o = 0; o < alignspecs.length; o++) {
    var s = alignspecs[o];
    align[o] = s.match(/^ *-+: *$/m) ? ' align="right"' : s.match(/^ *:-+: *$/m) ? ' align="center"' : s.match(/^ *:-+ *$/m) ? ' align="left"' : "";
   }
   var c = n.split(/ *[|] */), u = c.length, d = r.tableClass ? ' class="' + r.tableClass + '"' : "", p = [ "<table", d, ">\n", "<thead>\n", "<tr>\n" ].join("");
   for (o = 0; u > o; o++) {
    var h = l(e(c[o]), r);
    p += [ "  <th", align[o], ">", h, "</th>\n" ].join("");
   }
   p += "</tr>\n</thead>\n";
   var f = a.split("\n");
   for (o = 0; o < f.length; o++) if (!f[o].match(/^\s*$/)) {
    for (var m = f[o].split(/ *[|] */), g = u - m.length, b = 0; g > b; b++) m.push("");
    for (p += "<tr>\n", b = 0; u > b; b++) {
     var v = l(e(m[b]), r);
     p += [ "  <td", align[b], ">", v, "</td>\n" ].join("");
    }
    p += "</tr>\n";
   }
   return p += "</table>\n", r.hashExtraBlock(p);
  }
  var r = this, i = new RegExp([ "^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm"), a = new RegExp([ "^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm");
  return t = t.replace(i, n), t = t.replace(a, n);
 }, Markdown.Extra.prototype.stripFootnoteDefinitions = function(e) {
  var t = this;
  return e = e.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, n, r) {
   return n = h(n), r += "\n", r = r.replace(/^[ ]{0,3}/g, ""), t.footnotes[n] = r, 
   "\n";
  });
 }, Markdown.Extra.prototype.doFootnotes = function(e) {
  var t = this;
  if (t.isConvertingFootnote === !0) return e;
  var n = 0;
  return e = e.replace(/\[\^(.+?)\]/g, function(e, r) {
   var i = h(r), a = t.footnotes[i];
   if (void 0 === a) return e;
   n++, t.usedFootnotes.push(i);
   var o = '<a href="#fn:' + i + '" id="fnref:' + i + '" title="See footnote" class="footnote">' + n + "</a>";
   return t.hashExtraInline(o);
  });
 }, Markdown.Extra.prototype.printFootnotes = function(e) {
  var t = this;
  if (0 === t.usedFootnotes.length) return e;
  e += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
  for (var n = 0; n < t.usedFootnotes.length; n++) {
   var r = t.usedFootnotes[n], i = t.footnotes[r];
   t.isConvertingFootnote = !0;
   var a = l(i, t);
   delete t.isConvertingFootnote, e += '<li id="fn:' + r + '">' + a + ' <a href="#fnref:' + r + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n';
  }
  return e += "</ol>\n</div>";
 }, Markdown.Extra.prototype.fencedCodeBlocks = function(t) {
  function n(e) {
   return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), 
   e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~");
  }
  var r = this;
  return t = t.replace(/(?:^|\n)```([^`\n]*)\n([\s\S]*?)\n```[ \t]*(?=\n)/g, function(t, i, a) {
   var o = e(i), s = a, l = r.googleCodePrettify ? ' class="prettyprint"' : "", c = "";
   o && (c = r.googleCodePrettify || r.highlightJs ? ' class="language-' + o + '"' : ' class="' + o + '"');
   var u = [ "<pre", l, "><code", c, ">", n(s), "</code></pre>" ].join("");
   return r.hashExtraBlock(u);
  });
 }, Markdown.Extra.prototype.educatePants = function(e) {
  var t = this, n = "", r = 0;
  e.replace(/(?:<!--[\s\S]*?-->)|(<)([a-zA-Z1-6]+)([^\n]*?>)([\s\S]*?)(<\/\2>)/g, function(i, a, o, s, l, c, u) {
   var d = e.substring(r, u);
   return n += t.applyPants(d), t.smartyPantsLastChar = n.substring(n.length - 1), 
   r = u + i.length, a ? (/code|kbd|pre|script|noscript|iframe|math|ins|del|pre/i.test(o) ? t.smartyPantsLastChar = l.substring(l.length - 1) : l = t.educatePants(l), 
   void (n += a + o + s + l + c)) : void (n += i);
  });
  var i = e.substring(r);
  return n += t.applyPants(i), t.smartyPantsLastChar = n.substring(n.length - 1), 
  n;
 }, Markdown.Extra.prototype.applyPants = function(e) {
  return e = e.replace(/---/g, "&#8212;").replace(/--/g, "&#8211;"), e = e.replace(/\.\.\./g, "&#8230;").replace(/\.\s\.\s\./g, "&#8230;"), 
  e = e.replace(/``/g, "&#8220;").replace(/''/g, "&#8221;"), /^'$/.test(e) ? /\S/.test(this.smartyPantsLastChar) ? "&#8217;" : "&#8216;" : /^"$/.test(e) ? /\S/.test(this.smartyPantsLastChar) ? "&#8221;" : "&#8220;" : (e = e.replace(/^'(?=[!"#\$\%'()*+,\-.\/:;<=>?\@\[\\]\^_`{|}~]\B)/, "&#8217;"), 
  e = e.replace(/^"(?=[!"#\$\%'()*+,\-.\/:;<=>?\@\[\\]\^_`{|}~]\B)/, "&#8221;"), e = e.replace(/"'(?=\w)/g, "&#8220;&#8216;"), 
  e = e.replace(/'"(?=\w)/g, "&#8216;&#8220;"), e = e.replace(/'(?=\d{2}s)/g, "&#8217;"), 
  e = e.replace(/(\s|&nbsp;|--|&[mn]dash;|&\#8211;|&\#8212;|&\#x201[34];)'(?=\w)/g, "$1&#8216;"), 
  e = e.replace(/([^\s\[\{\(\-])'/g, "$1&#8217;"), e = e.replace(/'(?=\s|s\b)/g, "&#8217;"), 
  e = e.replace(/'/g, "&#8216;"), e = e.replace(/(\s|&nbsp;|--|&[mn]dash;|&\#8211;|&\#8212;|&\#x201[34];)"(?=\w)/g, "$1&#8220;"), 
  e = e.replace(/([^\s\[\{\(\-])"/g, "$1&#8221;"), e = e.replace(/"(?=\s)/g, "&#8221;"), 
  e = e.replace(/"/gi, "&#8220;"));
 }, Markdown.Extra.prototype.runSmartyPants = function(e) {
  return this.smartyPantsLastChar = "", e = this.educatePants(e), e = e.replace(/(<([a-zA-Z1-6]+)\b([^\n>]*?)(\/)?>)/g, f);
 }, Markdown.Extra.prototype.definitionLists = function(t) {
  var n = new RegExp([ "(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")" ].join(""), "gm"), r = this;
  return t = o(t), t = t.replace(n, function(t, n, i) {
   var a = e(r.processDefListItems(i));
   return a = "<dl>\n" + a + "\n</dl>", n + r.hashExtraBlock(a) + "\n\n";
  }), s(t);
 }, Markdown.Extra.prototype.processDefListItems = function(r) {
  var i = this, a = new RegExp([ "(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])" ].join(""), "gm"), u = new RegExp([ "\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")" ].join(""), "gm");
  return r = o(r), r = r.replace(/\n{2,}(?=\\x03)/, "\n"), r = r.replace(a, function(t, n, r) {
   for (var a = e(r).split("\n"), o = "", s = 0; s < a.length; s++) {
    var c = a[s];
    c = l(e(c), i), o += "\n<dt>" + c + "</dt>";
   }
   return o + "\n";
  }), r = r.replace(u, function(e, r, a, o) {
   return r || o.match(/\n{2,}/) ? (o = Array(a.length + 1).join(" ") + o, o = n(o) + "\n\n", 
   o = "\n" + c(o, i) + "\n") : (o = t(o), o = l(n(o), i)), "\n<dd>" + o + "</dd>\n";
  }), s(r);
 }, Markdown.Extra.prototype.strikethrough = function(e) {
  return e.replace(/([\W_]|^)~T~T(?=\S)([^\r]*?\S[\*_]*)~T~T([\W_]|$)/g, "$1<del>$2</del>$3");
 }, Markdown.Extra.prototype.newlines = function(e) {
  return e.replace(/(<(?:br|\/li)>)?\n/g, function(e, t) {
   return t ? e : " <br>\n";
  });
 };
}(), define("pagedownExtra", function() {}), define("extensions/markdownExtra", [ "underscore", "utils", "logger", "classes/Extension", "text!html/markdownExtraSettingsBlock.html", "google-code-prettify", "highlightjs", "crel", "pagedownExtra" ], function(e, t, n, r, i, a, o) {
 var s = new r("markdownExtra", "Markdown Extra", !0);
 s.settingsBlock = i, s.defaultConfig = {
  extensions: [ "fenced_code_gfm", "tables", "def_list", "attr_list", "footnotes", "smartypants", "strikethrough", "newlines" ],
  intraword: !0,
  comments: !0,
  highlighter: "highlight"
 }, s.onLoadSettings = function() {
  function n(t) {
   return e.some(s.config.extensions, function(e) {
    return e == t;
   });
  }
  t.setInputChecked("#input-markdownextra-fencedcodegfm", n("fenced_code_gfm")), t.setInputChecked("#input-markdownextra-tables", n("tables")), 
  t.setInputChecked("#input-markdownextra-deflist", n("def_list")), t.setInputChecked("#input-markdownextra-attrlist", n("attr_list")), 
  t.setInputChecked("#input-markdownextra-footnotes", n("footnotes")), t.setInputChecked("#input-markdownextra-smartypants", n("smartypants")), 
  t.setInputChecked("#input-markdownextra-strikethrough", n("strikethrough")), t.setInputChecked("#input-markdownextra-newlines", n("newlines")), 
  t.setInputChecked("#input-markdownextra-intraword", s.config.intraword), t.setInputChecked("#input-markdownextra-comments", s.config.comments), 
  t.setInputValue("#input-markdownextra-highlighter", s.config.highlighter);
 }, s.onSaveSettings = function(e) {
  e.extensions = [], t.getInputChecked("#input-markdownextra-fencedcodegfm") && e.extensions.push("fenced_code_gfm"), 
  t.getInputChecked("#input-markdownextra-tables") && e.extensions.push("tables"), 
  t.getInputChecked("#input-markdownextra-deflist") && e.extensions.push("def_list"), 
  t.getInputChecked("#input-markdownextra-attrlist") && e.extensions.push("attr_list"), 
  t.getInputChecked("#input-markdownextra-footnotes") && e.extensions.push("footnotes"), 
  t.getInputChecked("#input-markdownextra-smartypants") && e.extensions.push("smartypants"), 
  t.getInputChecked("#input-markdownextra-strikethrough") && e.extensions.push("strikethrough"), 
  t.getInputChecked("#input-markdownextra-newlines") && e.extensions.push("newlines"), 
  e.intraword = t.getInputChecked("#input-markdownextra-intraword"), e.comments = t.getInputChecked("#input-markdownextra-comments"), 
  e.highlighter = t.getInputValue("#input-markdownextra-highlighter");
 };
 var l;
 s.onEventMgrCreated = function(e) {
  l = e;
 };
 var c;
 return s.onReady = function() {
  c = document.getElementById("preview-contents");
 }, s.onPagedownConfigure = function(t) {
  var n = t.getConverter(), r = {
   extensions: s.config.extensions,
   highlighter: "prettify"
  };
  if (s.config.intraword === !0) {
   var i = {
    _DoItalicsAndBold: function(e) {
     return e = e.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>"), 
     e = e.replace(/([^\w*]|^)(\*|_)(?=\S)(.+?)(?=\S)\2(?=[^\w*]|$)/g, "$1<em>$3</em>"), 
     e = e.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>");
    }
   };
   n.setOptions(i);
  }
  if (s.config.comments === !0 && n.hooks.chain("postConversion", function(e) {
   return e.replace(/<!--.*?-->/g, function(e) {
    return e.replace(/^<!---(.+?)-?-->$/, ' <span class="comment label label-danger">$1</span> ');
   });
  }), "highlight" == s.config.highlighter) {
   var l = document.getElementById("preview-contents");
   t.hooks.chain("onPreviewRefresh", function() {
    e.each(l.querySelectorAll(".prettyprint > code"), function(e) {
     !e.highlighted && o.highlightBlock(e), e.highlighted = !0;
    });
   });
  } else "prettify" == s.config.highlighter && t.hooks.chain("onPreviewRefresh", a.prettyPrint);
  Markdown.Extra.init(n, r);
 }, s;
}), define("text!html/mathJaxSettingsBlock.html", [], function() {
 return '<p>Allows StackEdit to interpret LaTeX mathematical expressions.</p>\n<div class="form-horizontal">\n    <div class="form-group">\n        <label class="col-sm-4 control-label"\n            for="input-mathjax-config-tex">TeX configuration</label>\n        <div class="col-sm-7">\n            <input type="text" id="input-mathjax-config-tex" class="form-control">\n        </div>\n    </div>\n    <div class="form-group">\n        <label class="col-sm-4 control-label"\n            for="input-mathjax-config-tex2jax">tex2jax configuration</label>\n        <div class="col-sm-7">\n            <input type="text" id="input-mathjax-config-tex2jax" class="form-control">\n        </div>\n    </div>\n</div>\n<span class="help-block pull-right"><a target="_blank" href="http://docs.mathjax.org/en/latest/options/index.html">More info</a></span>';
}), define("text!libs/mathjax_config.js", [], function() {
 return 'MathJax.Hub.Config({\n	skipStartupTypeset: true,\n    "HTML-CSS": {\n        preferredFont: "TeX",\n        availableFonts: [\n            "STIX",\n            "TeX"\n        ],\n        linebreaks: {\n            automatic: true\n        },\n        EqnChunk: 10,\n        imageFont: null\n    },\n    tex2jax: <%= tex2jax || \'{ inlineMath: [["$","$"],["\\\\\\\\\\\\\\\\(","\\\\\\\\\\\\\\\\)"]], displayMath: [["$$","$$"],["\\\\\\\\[","\\\\\\\\]"]], processEscapes: true }\' %>,\n    TeX: $.extend({\n        noUndefined: {\n            attributes: {\n                mathcolor: "red",\n                mathbackground: "#FFEEEE",\n                mathsize: "90%"\n            }\n        },\n        Safe: {\n            allow: {\n                URLs: "safe",\n                classes: "safe",\n                cssIDs: "safe",\n                styles: "safe",\n                fontsize: "all"\n            }\n        }\n    }, <%= tex %>),\n    messageStyle: "none"\n});\n';
}), define("libs/mathjax_init", [ "settings", "text!libs/mathjax_config.js" ], function(e, t) {
 var n = document.createElement("script");
 n.type = "text/x-mathjax-config", n.innerHTML = _.template(t, {
  tex: e.extensionSettings.mathJax ? e.extensionSettings.mathJax.tex : "undefined",
  tex2jax: e.extensionSettings.mathJax ? e.extensionSettings.mathJax.tex2jax : void 0
 }), document.getElementsByTagName("head")[0].appendChild(n);
}), define("extensions/mathJax", [ "utils", "classes/Extension", "text!html/mathJaxSettingsBlock.html", "mathjax" ], function(e, t, n) {
 function r(e, t, n) {
  var r = u.slice(e, t + 1).join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (x.Browser.isMSIE && (r = r.replace(/(%[^\n]*)\n/g, "$1<br/>\n")); t > e; ) u[t] = "", 
  t--;
  u[e] = "@@" + m.length + "@@", n && (r = n(r)), m.push(r), d = p = h = null;
 }
 function i(e) {
  d = p = h = null, m = [];
  var t;
  /`/.test(e) ? (e = e.replace(/~/g, "~T").replace(/(^|[^\\])(`+)([^\n]*?[^`\n])\2(?!`)/gm, function(e) {
   return e.replace(/\$/g, "~D");
  }), t = function(e) {
   return e.replace(/~([TD])/g, function(e, t) {
    return {
     T: "~",
     D: "$"
    }[t];
   });
  }) : t = function(e) {
   return e;
  }, u = w(e.replace(/\r\n?/g, "\n"), S);
  for (var n = 1, i = u.length; i > n; n += 2) {
   var a = u[n];
   "@" === a.charAt(0) ? (u[n] = "@@" + m.length + "@@", m.push(a)) : d ? p == y && "\n" == a.charAt(0) ? (h && (n = h, 
   r(d, n, t)), d = p = h = null, f = 0) : a === p ? f ? h = n : r(d, n, t) : a.match(/\n.*\n/) ? (h && (n = h, 
   r(d, n, t)), d = p = h = null, f = 0) : "{" === a ? f++ : "}" === a && f && f-- : a === y || "$$" === a ? (d = n, 
   p = a, f = 0) : "begin" === a.substr(1, 5) && (d = n, p = "\\end" + a.substr(6), 
   f = 0);
  }
  return h && r(d, h, t), t(u.join(""));
 }
 function a(e) {
  return e = e.replace(/@@(\d+)@@/g, function(e, t) {
   return m[t];
  }), m = null, e;
 }
 function o() {
  b = !1, x.cancelTypeset = !1, x.Queue([ "Typeset", x, v ]), x.Queue(c);
 }
 function s() {
  b || (b = !0, x.Cancel(), x.Queue(o));
 }
 var l = new t("mathJax", "MathJax", !0);
 l.settingsBlock = n, l.defaultConfig = {
  tex: "{}",
  tex2jax: '{ inlineMath: [["$","$"],["\\\\\\\\(","\\\\\\\\)"]], displayMath: [["$$","$$"],["\\\\[","\\\\]"]], processEscapes: true }'
 }, l.onLoadSettings = function() {
  e.setInputValue("#input-mathjax-config-tex", l.config.tex), e.setInputValue("#input-mathjax-config-tex2jax", l.config.tex2jax);
 }, l.onSaveSettings = function(t, n) {
  t.tex = e.getInputJsValue("#input-mathjax-config-tex", n), t.tex2jax = e.getInputJsValue("#input-mathjax-config-tex2jax", n);
 }, l.onPagedownConfigure = function(e) {
  v = document.getElementById("preview-contents");
  var t = e.getConverter();
  t.hooks.chain("preConversion", i), t.hooks.chain("postConversion", a);
 };
 var c;
 l.onAsyncPreview = function(e) {
  c = e, s();
 };
 var u, d, p, h, f, m, g = !1, b = !1, v = null, y = "$", x = MathJax.Hub;
 x.Queue(function() {
  g = !0, x.processUpdateTime = 50, x.Config({
   "HTML-CSS": {
    EqnChunk: 10,
    EqnChunkFactor: 1
   },
   SVG: {
    EqnChunk: 10,
    EqnChunkFactor: 1
   }
  });
 });
 var w, S = /(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@)/i;
 return w = 3 === "aba".split(/(b)/).length ? function(e, t) {
  return e.split(t);
 } : function(e, t) {
  var n, r = [];
  if (!t.global) {
   n = t.toString();
   var i = "";
   n = n.replace(/^\/(.*)\/([im]*)$/, function(e, t, n) {
    return i = n, t;
   }), t = RegExp(n, i + "g");
  }
  for (var a = t.lastIndex = 0; n = t.exec(e); ) r.push(e.substring(a, n.index)), 
  r.push.apply(r, n.slice(1)), a = n.index + n[0].length;
  return r.push(e.substring(a)), r;
 }, function() {
  var e = MathJax.Hub;
  if (!e.Cancel) {
   e.cancelTypeset = !1, e.Register.StartupHook("HTML-CSS Jax Config", function() {
    var t = MathJax.OutputJax["HTML-CSS"], n = t.Translate;
    t.Augment({
     Translate: function(r, i) {
      if (e.cancelTypeset || i.cancelled) throw Error("MathJax Canceled");
      return n.call(t, r, i);
     }
    });
   }), e.Register.StartupHook("SVG Jax Config", function() {
    var t = MathJax.OutputJax.SVG, n = t.Translate;
    t.Augment({
     Translate: function(r, i) {
      if (e.cancelTypeset || i.cancelled) throw Error("MathJax Canceled");
      return n.call(t, r, i);
     }
    });
   }), e.Register.StartupHook("TeX Jax Config", function() {
    var t = MathJax.InputJax.TeX, n = t.Translate;
    t.Augment({
     Translate: function(r, i) {
      if (e.cancelTypeset || i.cancelled) throw Error("MathJax Canceled");
      return n.call(t, r, i);
     }
    });
   });
   var t = e.processError;
   e.processError = function(n, r, i) {
    return "MathJax Canceled" !== n.message ? t.call(e, n, r, i) : (MathJax.Message.Clear(0, 0), 
    r.jaxIDs = [], r.jax = {}, r.scripts = [], r.i = r.j = 0, r.cancelled = !0, null);
   }, e.Cancel = function() {
    this.cancelTypeset = !0;
   };
  }
 }(), l;
}), define("text!html/partialRenderingSettingsBlock.html", [], function() {
 return "<p>Renders modified sections only.</p>\n<blockquote>\n	<p><b>Note:</b> Document sections are based on title elements (h1, h2...). Therefore if\n	your document does not contain any title, performance will not be increased.</p>\n</blockquote>";
}), define("extensions/partialRendering", [ "underscore", "crel", "extensions/markdownExtra", "classes/Extension", "text!html/partialRenderingSettingsBlock.html" ], function(e, t, n, r, i) {
 function a() {
  var t = [], n = "\n";
  if (m = !1, e.each(g, function(e) {
   var r = '\n<div class="se-preview-section-delimiter"></div>\n\n' + e.text + "\n\n";
   f && (r = r.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/gm, function(e, t) {
    return t ? (m = !0, n += e.replace(/^\s*\n/gm, "") + "\n", "") : e;
   })), r = r.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t) {
    return t ? (n += e.replace(/^\s*\n/gm, "") + "\n", "") : e;
   }), t.push({
    id: e.id,
    text: r + "\n"
   });
  }), y = [], v = [], d = void 0, x === !0 || u != n) return x = !1, u = n, v = b, 
  b = t, void (y = t);
  var r = b.length;
  e.some(b, function(e, n) {
   return n >= t.length || e.text != t[n].text ? (r = n, !0) : void 0;
  });
  var i = -b.length;
  e.some(b.slice().reverse(), function(e, n) {
   return n >= t.length || e.text != t[t.length - n - 1].text ? (i = -n, !0) : void 0;
  }), r - i > b.length && (i = r - b.length);
  var a = b.slice(0, r);
  y = t.slice(r, t.length + i);
  var o = b.slice(b.length + i, b.length);
  d = e.first(o), v = b.slice(r, b.length + i), b = a.concat(y).concat(o);
 }
 function o(e) {
  var t = e.id.substring(3), n = w[t];
  n && S.removeChild(n), w[t] = e, S.appendChild(e);
 }
 function s() {
  function n(n) {
   for (var r = t("div", {
    id: "wmd-preview-section-" + n.id,
    "class": "wmd-preview-section preview-content"
   }), a = !1; i; ) {
    var s = i.nextSibling, l = "se-preview-section-delimiter" == i.className;
    if (a === !0 && "DIV" == i.tagName && l) break;
    a = !0, "DIV" == i.tagName && "footnotes" == i.className ? e.each(i.querySelectorAll("ol > li"), o) : l || r.appendChild(i), 
    i = s;
   }
   return r;
  }
  e.each(v, function(e) {
   var t = document.getElementById("wmd-preview-section-" + e.id);
   h.removeChild(t);
  });
  var r = document.getElementById("wmd-preview"), i = r.firstChild, a = document.createDocumentFragment();
  e.each(y, function(e) {
   a.appendChild(n(e));
  }), r.innerHTML = "";
  var s = p;
  void 0 !== d && (s = document.getElementById("wmd-preview-section-" + d.id)), h.insertBefore(a, s), 
  p.innerHTML = "";
  var l = [];
  if (m === !0) {
   var c = t("ol");
   e.each(h.querySelectorAll("a.footnote"), function(e, t) {
    e.textContent = t + 1;
    var n = e.id.substring(6);
    l.push(n);
    var r = w[n];
    r && c.appendChild(r.cloneNode(!0));
   }), l.length > 0 && p.appendChild(t("div", {
    "class": "footnotes"
   }, t("hr"), c)), Object.keys(w).forEach(function(e) {
    -1 === l.indexOf(e) && (S.removeChild(w[e]), delete w[e]);
   });
  }
 }
 var l = new r("partialRendering", "Partial Rendering", !0);
 l.settingsBlock = i;
 var c, u, d, p, h, f = !1, m = !1, g = [], b = [], v = [], y = [], x = !1, w = {}, S = document.createDocumentFragment();
 return l.onSectionsCreated = function(e) {
  g = e;
 }, l.onPagedownConfigure = function(t) {
  c = t.getConverter(), c.hooks.chain("preConversion", function() {
   a();
   var t = e.map(y, function(e) {
    return e.text;
   });
   return t.push(u + "\n\n"), t.join("");
  }), t.hooks.chain("onPreviewRefresh", function() {
   s();
  });
 }, l.onInit = function() {
  n.enabled && e.some(n.config.extensions, function(e) {
   return "footnotes" == e;
  }) && (f = !0);
 }, l.onReady = function() {
  p = t("div", {
   id: "wmd-preview-section-footnotes",
   "class": "preview-content"
  }), h = document.getElementById("preview-contents"), h.appendChild(p);
 }, l.onFileSelected = function() {
  x = !0;
 }, l;
}), define("extensions/markdownSectionParser", [ "underscore", "extensions/markdownExtra", "extensions/mathJax", "extensions/partialRendering", "classes/Extension", "crel" ], function(e, t, n, r, i, a) {
 function o(e, t) {
  function n(e, t) {
   var n = a.substring(o, t);
   u.push({
    id: ++h,
    text: n,
    textWithFrontMatter: r + n
   }), r = "";
  }
  if (e === p) {
   var r = (p.frontMatter || {})._frontMatter || "", i = t.substring(r.length), a = i + "\n\n";
   u = [];
   var o = 0;
   a.replace(d, function(e, t) {
    n(o, t), o = t;
   }), n(o, i.length), s.onSectionsCreated(u);
  }
 }
 var s, l = new i("markdownSectionParser", "Markdown section parser");
 l.onEventMgrCreated = function(e) {
  s = e;
 };
 var c, u = [], d = "^.+[ \\t]*\\n=+[ \\t]*\\n+|^.+[ \\t]*\\n-+[ \\t]*\\n+|^\\#{1,6}[ \\t]*.+?[ \\t]*\\#*\\n+";
 l.onPagedownConfigure = function(i) {
  t.enabled && e.some(t.config.extensions, function(e) {
   return "fenced_code_gfm" == e;
  }) && (d = "^```[^`\\n]*\\n[\\s\\S]*?\\n```|" + d), n.enabled && (d = "^[ \\t]*\\n\\$\\$[\\s\\S]*?\\$\\$|" + d, 
  d = "^[ \\t]*\\n\\\\\\\\[[\\s\\S]*?\\\\\\\\]|" + d, d = "^[ \\t]*\\n\\\\?\\\\begin\\{[a-z]*\\*?\\}[\\s\\S]*?\\\\end\\{[a-z]*\\*?\\}|" + d), 
  d = new RegExp(d, "gm");
  var o = i.getConverter();
  r.enabled || (o.hooks.chain("preConversion", function() {
   return e.reduce(u, function(e, t) {
    return e + '\n<div class="se-preview-section-delimiter"></div>\n\n' + t.text + "\n\n";
   }, "");
  }), i.hooks.chain("onPreviewRefresh", function() {
   function e() {
    for (var e = a("div", {
     "class": "wmd-preview-section preview-content"
    }), t = !1; n; ) {
     var r = n.nextSibling, i = "se-preview-section-delimiter" == n.className;
     if (t === !0 && "DIV" == n.tagName && i) break;
     t = !0, i || e.appendChild(n), n = r;
    }
    return e;
   }
   var t = document.getElementById("wmd-preview"), n = t.firstChild, r = document.createDocumentFragment();
   u.forEach(function(t) {
    r.appendChild(e(t));
   }), c.innerHTML = "", c.appendChild(t), c.appendChild(r);
  }));
 }, l.onReady = function() {
  c = document.getElementById("preview-contents");
 };
 var p;
 l.onFileSelected = function(e) {
  p = e;
 };
 var h = 0;
 return l.onFileOpen = o, l.onContentChanged = o, l;
}), define("extensions/workingIndicator", [ "underscore", "crel", "classes/Extension" ], function(e, t, n) {
 var r, i, a = new n("workingIndicator", "Working Indicator"), o = [ "@<%= prefix %>keyframes <%= name %> {", "    0% { opacity:<%= z %>; }", "    <%= start %>.01% { opacity:<%= alpha %>; }", "    <%= start %>.02% { opacity:1; }", "    <%= ((start + trail) % 100) %>.01% { opacity:<%= alpha %>; }", "    100% { opacity:<%= z %>; }", "}" ].join("\n");
 return a.onAsyncRunning = function(e) {
  r.toggleClass("working", e), i.toggleClass("hide", !e);
 }, a.onReady = function() {
  function n(t) {
   t.z = Math.max(1 - (1 - t.alpha) / t.trail * (100 - t.start), t.alpha), a += e.template(o, e.extend({
    prefix: ""
   }, t)), a += e.template(o, e.extend({
    prefix: "-webkit-"
   }, t));
  }
  var a = "";
  r = $(document.body), i = $('<div class="hide">'), $(".working-indicator").append(i);
  for (var s = 0; 3 > s; s++) {
   var l = "working-indicator-bar" + s;
   n({
    name: l,
    alpha: .25,
    start: 20 * s,
    trail: 50
   });
   var c = l + " 0.7s linear infinite";
   i.append($('<div class="bar">').css({
    animation: c,
    "-webkit-animation": c
   }));
  }
  var u = t("style", {
   type: "text/css"
  });
  document.head.appendChild(u), u.innerHTML = a;
 }, a;
}), function(e) {
 var t = function() {
  return !1 === e.support.boxModel && e.support.objectAll && e.support.leadingWhitespace;
 }();
 e.jGrowl = function(t, n) {
  0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(n && n.position ? n.position : e.jGrowl.defaults.position).appendTo("body"), 
  e("#jGrowl").jGrowl(t, n);
 }, e.fn.jGrowl = function(t, n) {
  if (e.isFunction(this.each)) {
   var r = arguments;
   return this.each(function() {
    void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl(), {
     notifications: [],
     element: null,
     interval: null
    })), e(this).data("jGrowl.instance").startup(this)), e.isFunction(e(this).data("jGrowl.instance")[t]) ? e(this).data("jGrowl.instance")[t].apply(e(this).data("jGrowl.instance"), e.makeArray(r).slice(1)) : e(this).data("jGrowl.instance").create(t, n);
   });
  }
 }, e.extend(e.fn.jGrowl.prototype, {
  defaults: {
   pool: 0,
   header: "",
   group: "",
   sticky: !1,
   position: "top-right",
   glue: "after",
   theme: "default",
   themeState: "highlight",
   corners: "10px",
   check: 250,
   life: 3e3,
   closeDuration: "normal",
   openDuration: "normal",
   easing: "swing",
   closer: !0,
   closeTemplate: "&times;",
   closerTemplate: "<div>[ close all ]</div>",
   log: function() {},
   beforeOpen: function() {},
   afterOpen: function() {},
   open: function() {},
   beforeClose: function() {},
   close: function() {},
   animateOpen: {
    opacity: "show"
   },
   animateClose: {
    opacity: "hide"
   }
  },
  notifications: [],
  element: null,
  interval: null,
  create: function(t, n) {
   var n = e.extend({}, this.defaults, n);
   "undefined" != typeof n.speed && (n.openDuration = n.speed, n.closeDuration = n.speed), 
   this.notifications.push({
    message: t,
    options: n
   }), n.log.apply(this.element, [ this.element, t, n ]);
  },
  render: function(t) {
   var n = this, r = t.message, i = t.options;
   i.themeState = "" == i.themeState ? "" : "ui-state-" + i.themeState;
   var t = e("<div/>").addClass("jGrowl-notification " + i.themeState + " ui-corner-all" + (void 0 != i.group && "" != i.group ? " " + i.group : "")).append(e("<div/>").addClass("jGrowl-close").html(i.closeTemplate)).append(e("<div/>").addClass("jGrowl-header").html(i.header)).append(e("<div/>").addClass("jGrowl-message").html(r)).data("jGrowl", i).addClass(i.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
    e(this).parent().trigger("jGrowl.beforeClose");
   }).parent();
   e(t).bind("mouseover.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !0);
   }).bind("mouseout.jGrowl", function() {
    e("div.jGrowl-notification", n.element).data("jGrowl.pause", !1);
   }).bind("jGrowl.beforeOpen", function() {
    i.beforeOpen.apply(t, [ t, r, i, n.element ]) !== !1 && e(this).trigger("jGrowl.open");
   }).bind("jGrowl.open", function() {
    i.open.apply(t, [ t, r, i, n.element ]) !== !1 && ("after" == i.glue ? e("div.jGrowl-notification:last", n.element).after(t) : e("div.jGrowl-notification:first", n.element).before(t), 
    e(this).animate(i.animateOpen, i.openDuration, i.easing, function() {
     e.support.opacity === !1 && this.style.removeAttribute("filter"), null !== e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date()), 
     e(this).trigger("jGrowl.afterOpen");
    }));
   }).bind("jGrowl.afterOpen", function() {
    i.afterOpen.apply(t, [ t, r, i, n.element ]);
   }).bind("jGrowl.beforeClose", function() {
    i.beforeClose.apply(t, [ t, r, i, n.element ]) !== !1 && e(this).trigger("jGrowl.close");
   }).bind("jGrowl.close", function() {
    e(this).data("jGrowl.pause", !0), e(this).animate(i.animateClose, i.closeDuration, i.easing, function() {
     e.isFunction(i.close) ? i.close.apply(t, [ t, r, i, n.element ]) !== !1 && e(this).remove() : e(this).remove();
    });
   }).trigger("jGrowl.beforeOpen"), "" != i.corners && void 0 != e.fn.corner && e(t).corner(i.corners), 
   e("div.jGrowl-notification:parent", n.element).size() > 1 && 0 == e("div.jGrowl-closer", n.element).size() && this.defaults.closer !== !1 && e(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(n.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
    e(this).siblings().trigger("jGrowl.beforeClose"), e.isFunction(n.defaults.closer) && n.defaults.closer.apply(e(this).parent()[0], [ e(this).parent()[0] ]);
   });
  },
  update: function() {
   e(this.element).find("div.jGrowl-notification:parent").each(function() {
    void 0 != e(this).data("jGrowl") && void 0 !== e(this).data("jGrowl").created && e(this).data("jGrowl").created.getTime() + parseInt(e(this).data("jGrowl").life) < new Date().getTime() && e(this).data("jGrowl").sticky !== !0 && (void 0 == e(this).data("jGrowl.pause") || e(this).data("jGrowl.pause") !== !0) && e(this).trigger("jGrowl.beforeClose");
   }), this.notifications.length > 0 && (0 == this.defaults.pool || e(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()), 
   e(this.element).find("div.jGrowl-notification:parent").size() < 2 && e(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
    e(this).remove();
   });
  },
  startup: function(n) {
   this.element = e(n).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'), 
   this.interval = setInterval(function() {
    e(n).data("jGrowl.instance").update();
   }, parseInt(this.defaults.check)), t && e(this.element).addClass("ie6");
  },
  shutdown: function() {
   e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").trigger("jGrowl.close").parent().empty(), 
   clearInterval(this.interval);
  },
  close: function() {
   e(this.element).find("div.jGrowl-notification").each(function() {
    e(this).trigger("jGrowl.beforeClose");
   });
  }
 }), e.jGrowl.defaults = e.fn.jGrowl.prototype.defaults;
}(jQuery), define("jgrowl", function(e) {
 return function() {
  var t;
  return t || e.jQuery.jGrowl;
 };
}(this)), define("text!html/notificationsSettingsBlock.html", [], function() {
 return '<p>Shows notification messages in the bottom-right corner of the\n	screen.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-sm-4 control-label" for="input-notifications-timeout">Timeout</label>\n		<div class="col-sm-7 form-inline">\n			<input type="text" id="input-notifications-timeout"\n				class="col-sm-5 form-control"> <span class="help-inline">ms</span>\n		</div>\n	</div>\n</div>';
}), define("extensions/notifications", [ "underscore", "utils", "logger", "classes/Extension", "jgrowl", "text!html/notificationsSettingsBlock.html" ], function(e, t, n, r, i, a) {
 function o() {
  p === !1 && (i.defaults.life = c.config.timeout, i.defaults.closer = !1, i.defaults.closeTemplate = "", 
  i.defaults.position = "bottom-right", p = !0);
 }
 function s(t, r, a) {
  if (n.info(t), o(), t) {
   var s = t.indexOf("|");
   (-1 === s || (t = t.substring(0, s))) && (a = a || {}, r = r || "icon-info-circled", 
   i("<i class='icon-white " + r + "'></i> " + e.escape(t).replace(/\n/g, "<br/>"), a));
  }
 }
 function l() {
  h !== !1 && (u.toggleClass("hide", !f), d.toggleClass("hide", f));
 }
 var c = new r("notifications", "Notifications");
 c.settingsBlock = a, c.defaultConfig = {
  timeout: 8e3
 }, c.onLoadSettings = function() {
  t.setInputValue("#input-notifications-timeout", c.config.timeout);
 }, c.onSaveSettings = function(e, n) {
  e.timeout = t.getInputIntValue("#input-notifications-timeout", n, 1, 6e4);
 };
 var u, d, p = !1, h = !1;
 c.onReady = function() {
  h = !0, u = $(".navbar .offline-status"), d = $(".navbar .extension-buttons"), l();
 }, c.onMessage = function(e) {
  s(e);
 }, c.onError = function(t) {
  n.error(t), e.isString(t) ? s(t, "icon-attention") : e.isObject(t) && s(t.message, "icon-attention");
 };
 var f = !1;
 return c.onOfflineChanged = function(e) {
  f = e, l(), f === !0 ? s("You are offline.", "icon-attention-circled msg-offline") : s("You are back online!", "icon-signal");
 }, c.onSyncImportSuccess = function(t, n) {
  var r = e.map(t, function(e) {
   return e.title;
  }).join(", ");
  s(r + " imported successfully from " + n.providerName + ".");
 }, c.onSyncExportSuccess = function(e, t) {
  s('"' + e.title + '" will now be synchronized on ' + t.provider.providerName + ".");
 }, c.onSyncRemoved = function(e, t) {
  s(t.provider.providerName + " synchronized location has been removed.");
 }, c.onPublishSuccess = function(e) {
  s('"' + e.title + '" successfully published.');
 }, c.onNewPublishSuccess = function(e, t) {
  s('"' + e.title + '" is now published on ' + t.provider.providerName + ".");
 }, c.onPublishRemoved = function(e, t) {
  s(t.provider.providerName + " publish location has been removed.");
 }, c;
}), define("text!html/umlDiagramsSettingsBlock.html", [], function() {
 return '<p>Creates UML diagrams from plain text description.</p>\n\n<div class="form-horizontal">\n    <div class="form-group">\n        <label class="col-sm-4 control-label" for="textarea-umldiagram-flowchart-options">Flow charts options (JSON)\n        </label>\n        <div class="col-sm-7">\n            <textarea id="textarea-umldiagram-flowchart-options" class="form-control"></textarea>\n        </div>\n    </div>\n</div>\n<br>\n<p>Sequence diagrams:</p>\n<pre><div class="help-block pull-right"><a target="_blank" href="http://bramp.github.io/js-sequence-diagrams/">More info</a></div><code>```sequence\nAlice->Bob: Hello Bob, how are you?\nBob-->Alice: I am good thanks!\n```</code>\n</pre>\n\n<p>Flow charts:</p>\n<pre><div class="help-block pull-right"><a target="_blank" href="http://adrai.github.io/flowchart.js/">More info</a></div><code>```flow\nst=>start: Start\ne=>end\nop=>operation: My Operation\ncond=>condition: Yes or No?\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```</code>\n</pre>\n<blockquote>\n    <p><b>Note:</b> Markdown Extra extension has to be enabled with GFM fenced code blocks option.</p>\n</blockquote>\n';
}), function(e) {
 var t, n, r = "0.4.2", i = "hasOwnProperty", a = /[\.\/]/, o = "*", s = function() {}, l = function(e, t) {
  return e - t;
 }, c = {
  n: {}
 }, u = function(e, r) {
  e = String(e);
  var i, a = n, o = Array.prototype.slice.call(arguments, 2), s = u.listeners(e), c = 0, d = [], p = {}, h = [], f = t;
  t = e, n = 0;
  for (var m = 0, g = s.length; g > m; m++) "zIndex" in s[m] && (d.push(s[m].zIndex), 
  s[m].zIndex < 0 && (p[s[m].zIndex] = s[m]));
  for (d.sort(l); d[c] < 0; ) if (i = p[d[c++]], h.push(i.apply(r, o)), n) return n = a, 
  h;
  for (m = 0; g > m; m++) if (i = s[m], "zIndex" in i) if (i.zIndex == d[c]) {
   if (h.push(i.apply(r, o)), n) break;
   do if (c++, i = p[d[c]], i && h.push(i.apply(r, o)), n) break; while (i);
  } else p[i.zIndex] = i; else if (h.push(i.apply(r, o)), n) break;
  return n = a, t = f, h.length ? h : null;
 };
 u._events = c, u.listeners = function(e) {
  var t, n, r, i, s, l, u, d, p = e.split(a), h = c, f = [ h ], m = [];
  for (i = 0, s = p.length; s > i; i++) {
   for (d = [], l = 0, u = f.length; u > l; l++) for (h = f[l].n, n = [ h[p[i]], h[o] ], 
   r = 2; r--; ) t = n[r], t && (d.push(t), m = m.concat(t.f || []));
   f = d;
  }
  return m;
 }, u.on = function(e, t) {
  if (e = String(e), "function" != typeof t) return function() {};
  for (var n = e.split(a), r = c, i = 0, o = n.length; o > i; i++) r = r.n, r = r.hasOwnProperty(n[i]) && r[n[i]] || (r[n[i]] = {
   n: {}
  });
  for (r.f = r.f || [], i = 0, o = r.f.length; o > i; i++) if (r.f[i] == t) return s;
  return r.f.push(t), function(e) {
   +e == +e && (t.zIndex = +e);
  };
 }, u.f = function(e) {
  var t = [].slice.call(arguments, 1);
  return function() {
   u.apply(null, [ e, null ].concat(t).concat([].slice.call(arguments, 0)));
  };
 }, u.stop = function() {
  n = 1;
 }, u.nt = function(e) {
  return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(t) : t;
 }, u.nts = function() {
  return t.split(a);
 }, u.off = u.unbind = function(e, t) {
  if (!e) return void (u._events = c = {
   n: {}
  });
  var n, r, s, l, d, p, h, f = e.split(a), m = [ c ];
  for (l = 0, d = f.length; d > l; l++) for (p = 0; p < m.length; p += s.length - 2) {
   if (s = [ p, 1 ], n = m[p].n, f[l] != o) n[f[l]] && s.push(n[f[l]]); else for (r in n) n[i](r) && s.push(n[r]);
   m.splice.apply(m, s);
  }
  for (l = 0, d = m.length; d > l; l++) for (n = m[l]; n.n; ) {
   if (t) {
    if (n.f) {
     for (p = 0, h = n.f.length; h > p; p++) if (n.f[p] == t) {
      n.f.splice(p, 1);
      break;
     }
     !n.f.length && delete n.f;
    }
    for (r in n.n) if (n.n[i](r) && n.n[r].f) {
     var g = n.n[r].f;
     for (p = 0, h = g.length; h > p; p++) if (g[p] == t) {
      g.splice(p, 1);
      break;
     }
     !g.length && delete n.n[r].f;
    }
   } else {
    delete n.f;
    for (r in n.n) n.n[i](r) && n.n[r].f && delete n.n[r].f;
   }
   n = n.n;
  }
 }, u.once = function(e, t) {
  var n = function() {
   return u.unbind(e, n), t.apply(this, arguments);
  };
  return u.on(e, n);
 }, u.version = r, u.toString = function() {
  return "You are running Eve " + r;
 }, "undefined" != typeof module && module.exports ? module.exports = u : "undefined" != typeof define ? define("eve", [], function() {
  return u;
 }) : e.eve = u;
}(this), function(e, t) {
 "function" == typeof define && define.amd ? define("raphael", [ "eve" ], function(n) {
  return t(e, n);
 }) : t(e, e.eve);
}(this, function(e, t) {
 function n(e) {
  if (n.is(e, "function")) return x ? e() : t.on("raphael.DOMload", e);
  if (n.is(e, W)) return n._engine.create[D](n, e.splice(0, 3 + n.is(e[0], q))).add(e);
  var r = Array.prototype.slice.call(arguments, 0);
  if (n.is(r[r.length - 1], "function")) {
   var i = r.pop();
   return x ? i.call(n._engine.create[D](n, r)) : t.on("raphael.DOMload", function() {
    i.call(n._engine.create[D](n, r));
   });
  }
  return n._engine.create[D](n, arguments);
 }
 function r(e) {
  if ("function" == typeof e || Object(e) !== e) return e;
  var t = new e.constructor();
  for (var n in e) e[E](n) && (t[n] = r(e[n]));
  return t;
 }
 function i(e, t) {
  for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return e.push(e.splice(n, 1)[0]);
 }
 function a(e, t, n) {
  function r() {
   var a = Array.prototype.slice.call(arguments, 0), o = a.join("␀"), s = r.cache = r.cache || {}, l = r.count = r.count || [];
   return s[E](o) ? (i(l, o), n ? n(s[o]) : s[o]) : (l.length >= 1e3 && delete s[l.shift()], 
   l.push(o), s[o] = e[D](t, a), n ? n(s[o]) : s[o]);
  }
  return r;
 }
 function o() {
  return this.hex;
 }
 function s(e, t) {
  for (var n = [], r = 0, i = e.length; i - 2 * !t > r; r += 2) {
   var a = [ {
    x: +e[r - 2],
    y: +e[r - 1]
   }, {
    x: +e[r],
    y: +e[r + 1]
   }, {
    x: +e[r + 2],
    y: +e[r + 3]
   }, {
    x: +e[r + 4],
    y: +e[r + 5]
   } ];
   t ? r ? i - 4 == r ? a[3] = {
    x: +e[0],
    y: +e[1]
   } : i - 2 == r && (a[2] = {
    x: +e[0],
    y: +e[1]
   }, a[3] = {
    x: +e[2],
    y: +e[3]
   }) : a[0] = {
    x: +e[i - 2],
    y: +e[i - 1]
   } : i - 4 == r ? a[3] = a[2] : r || (a[0] = {
    x: +e[r],
    y: +e[r + 1]
   }), n.push([ "C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y ]);
  }
  return n;
 }
 function l(e, t, n, r, i) {
  var a = -3 * t + 9 * n - 9 * r + 3 * i, o = e * a + 6 * t - 12 * n + 6 * r;
  return e * o - 3 * t + 3 * n;
 }
 function c(e, t, n, r, i, a, o, s, c) {
  null == c && (c = 1), c = c > 1 ? 1 : 0 > c ? 0 : c;
  for (var u = c / 2, d = 12, p = [ -.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816 ], h = [ .2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472 ], f = 0, m = 0; d > m; m++) {
   var g = u * p[m] + u, b = l(g, e, n, i, o), v = l(g, t, r, a, s), y = b * b + v * v;
   f += h[m] * $.sqrt(y);
  }
  return u * f;
 }
 function u(e, t, n, r, i, a, o, s, l) {
  if (!(0 > l || c(e, t, n, r, i, a, o, s) < l)) {
   var u, d = 1, p = d / 2, h = d - p, f = .01;
   for (u = c(e, t, n, r, i, a, o, s, h); U(u - l) > f; ) p /= 2, h += (l > u ? 1 : -1) * p, 
   u = c(e, t, n, r, i, a, o, s, h);
   return h;
  }
 }
 function d(e, t, n, r, i, a, o, s) {
  if (!(G(e, n) < j(i, o) || j(e, n) > G(i, o) || G(t, r) < j(a, s) || j(t, r) > G(a, s))) {
   var l = (e * r - t * n) * (i - o) - (e - n) * (i * s - a * o), c = (e * r - t * n) * (a - s) - (t - r) * (i * s - a * o), u = (e - n) * (a - s) - (t - r) * (i - o);
   if (u) {
    var d = l / u, p = c / u, h = +d.toFixed(2), f = +p.toFixed(2);
    if (!(h < +j(e, n).toFixed(2) || h > +G(e, n).toFixed(2) || h < +j(i, o).toFixed(2) || h > +G(i, o).toFixed(2) || f < +j(t, r).toFixed(2) || f > +G(t, r).toFixed(2) || f < +j(a, s).toFixed(2) || f > +G(a, s).toFixed(2))) return {
     x: d,
     y: p
    };
   }
  }
 }
 function p(e, t, r) {
  var i = n.bezierBBox(e), a = n.bezierBBox(t);
  if (!n.isBBoxIntersect(i, a)) return r ? 0 : [];
  for (var o = c.apply(0, e), s = c.apply(0, t), l = G(~~(o / 5), 1), u = G(~~(s / 5), 1), p = [], h = [], f = {}, m = r ? 0 : [], g = 0; l + 1 > g; g++) {
   var b = n.findDotsAtSegment.apply(n, e.concat(g / l));
   p.push({
    x: b.x,
    y: b.y,
    t: g / l
   });
  }
  for (g = 0; u + 1 > g; g++) b = n.findDotsAtSegment.apply(n, t.concat(g / u)), h.push({
   x: b.x,
   y: b.y,
   t: g / u
  });
  for (g = 0; l > g; g++) for (var v = 0; u > v; v++) {
   var y = p[g], x = p[g + 1], w = h[v], S = h[v + 1], C = U(x.x - y.x) < .001 ? "y" : "x", _ = U(S.x - w.x) < .001 ? "y" : "x", E = d(y.x, y.y, x.x, x.y, w.x, w.y, S.x, S.y);
   if (E) {
    if (f[E.x.toFixed(4)] == E.y.toFixed(4)) continue;
    f[E.x.toFixed(4)] = E.y.toFixed(4);
    var k = y.t + U((E[C] - y[C]) / (x[C] - y[C])) * (x.t - y.t), T = w.t + U((E[_] - w[_]) / (S[_] - w[_])) * (S.t - w.t);
    k >= 0 && 1.001 >= k && T >= 0 && 1.001 >= T && (r ? m++ : m.push({
     x: E.x,
     y: E.y,
     t1: j(k, 1),
     t2: j(T, 1)
    }));
   }
  }
  return m;
 }
 function h(e, t, r) {
  e = n._path2curve(e), t = n._path2curve(t);
  for (var i, a, o, s, l, c, u, d, h, f, m = r ? 0 : [], g = 0, b = e.length; b > g; g++) {
   var v = e[g];
   if ("M" == v[0]) i = l = v[1], a = c = v[2]; else {
    "C" == v[0] ? (h = [ i, a ].concat(v.slice(1)), i = h[6], a = h[7]) : (h = [ i, a, i, a, l, c, l, c ], 
    i = l, a = c);
    for (var y = 0, x = t.length; x > y; y++) {
     var w = t[y];
     if ("M" == w[0]) o = u = w[1], s = d = w[2]; else {
      "C" == w[0] ? (f = [ o, s ].concat(w.slice(1)), o = f[6], s = f[7]) : (f = [ o, s, o, s, u, d, u, d ], 
      o = u, s = d);
      var S = p(h, f, r);
      if (r) m += S; else {
       for (var C = 0, _ = S.length; _ > C; C++) S[C].segment1 = g, S[C].segment2 = y, 
       S[C].bez1 = h, S[C].bez2 = f;
       m = m.concat(S);
      }
     }
    }
   }
  }
  return m;
 }
 function f(e, t, n, r, i, a) {
  null != e ? (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +a) : (this.a = 1, 
  this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0);
 }
 function m() {
  return this.x + L + this.y + L + this.width + " × " + this.height;
 }
 function g(e, t, n, r, i, a) {
  function o(e) {
   return ((d * e + u) * e + c) * e;
  }
  function s(e, t) {
   var n = l(e, t);
   return ((f * n + h) * n + p) * n;
  }
  function l(e, t) {
   var n, r, i, a, s, l;
   for (i = e, l = 0; 8 > l; l++) {
    if (a = o(i) - e, U(a) < t) return i;
    if (s = (3 * d * i + 2 * u) * i + c, U(s) < 1e-6) break;
    i -= a / s;
   }
   if (n = 0, r = 1, i = e, n > i) return n;
   if (i > r) return r;
   for (;r > n; ) {
    if (a = o(i), U(a - e) < t) return i;
    e > a ? n = i : r = i, i = (r - n) / 2 + n;
   }
   return i;
  }
  var c = 3 * t, u = 3 * (r - t) - c, d = 1 - c - u, p = 3 * n, h = 3 * (i - n) - p, f = 1 - p - h;
  return s(e, 1 / (200 * a));
 }
 function b(e, t) {
  var n = [], r = {};
  if (this.ms = t, this.times = 1, e) {
   for (var i in e) e[E](i) && (r[Z(i)] = e[i], n.push(Z(i)));
   n.sort(dt);
  }
  this.anim = r, this.top = n[n.length - 1], this.percents = n;
 }
 function v(e, r, i, a, o, s) {
  i = Z(i);
  var l, c, u, d, p, h, m = e.ms, b = {}, v = {}, y = {};
  if (a) for (w = 0, C = cn.length; C > w; w++) {
   var x = cn[w];
   if (x.el.id == r.id && x.anim == e) {
    x.percent != i ? (cn.splice(w, 1), u = 1) : c = x, r.attr(x.totalOrigin);
    break;
   }
  } else a = +v;
  for (var w = 0, C = e.percents.length; C > w; w++) {
   if (e.percents[w] == i || e.percents[w] > a * e.top) {
    i = e.percents[w], p = e.percents[w - 1] || 0, m = m / e.top * (i - p), d = e.percents[w + 1], 
    l = e.anim[i];
    break;
   }
   a && r.attr(e.anim[e.percents[w]]);
  }
  if (l) {
   if (c) c.initstatus = a, c.start = new Date() - c.ms * a; else {
    for (var _ in l) if (l[E](_) && (rt[E](_) || r.paper.customAttributes[E](_))) switch (b[_] = r.attr(_), 
    null == b[_] && (b[_] = nt[_]), v[_] = l[_], rt[_]) {
    case q:
     y[_] = (v[_] - b[_]) / m;
     break;

    case "colour":
     b[_] = n.getRGB(b[_]);
     var k = n.getRGB(v[_]);
     y[_] = {
      r: (k.r - b[_].r) / m,
      g: (k.g - b[_].g) / m,
      b: (k.b - b[_].b) / m
     };
     break;

    case "path":
     var T = Ft(b[_], v[_]), N = T[1];
     for (b[_] = T[0], y[_] = [], w = 0, C = b[_].length; C > w; w++) {
      y[_][w] = [ 0 ];
      for (var D = 1, I = b[_][w].length; I > D; D++) y[_][w][D] = (N[w][D] - b[_][w][D]) / m;
     }
     break;

    case "transform":
     var A = r._, L = jt(A[_], v[_]);
     if (L) for (b[_] = L.from, v[_] = L.to, y[_] = [], y[_].real = !0, w = 0, C = b[_].length; C > w; w++) for (y[_][w] = [ b[_][w][0] ], 
     D = 1, I = b[_][w].length; I > D; D++) y[_][w][D] = (v[_][w][D] - b[_][w][D]) / m; else {
      var F = r.matrix || new f(), O = {
       _: {
        transform: A.transform
       },
       getBBox: function() {
        return r.getBBox(1);
       }
      };
      b[_] = [ F.a, F.b, F.c, F.d, F.e, F.f ], $t(O, v[_]), v[_] = O._.transform, y[_] = [ (O.matrix.a - F.a) / m, (O.matrix.b - F.b) / m, (O.matrix.c - F.c) / m, (O.matrix.d - F.d) / m, (O.matrix.e - F.e) / m, (O.matrix.f - F.f) / m ];
     }
     break;

    case "csv":
     var B = R(l[_])[P](S), $ = R(b[_])[P](S);
     if ("clip-rect" == _) for (b[_] = $, y[_] = [], w = $.length; w--; ) y[_][w] = (B[w] - b[_][w]) / m;
     v[_] = B;
     break;

    default:
     for (B = [][M](l[_]), $ = [][M](b[_]), y[_] = [], w = r.paper.customAttributes[_].length; w--; ) y[_][w] = ((B[w] || 0) - ($[w] || 0)) / m;
    }
    var G = l.easing, j = n.easing_formulas[G];
    if (!j) if (j = R(G).match(Y), j && 5 == j.length) {
     var U = j;
     j = function(e) {
      return g(e, +U[1], +U[2], +U[3], +U[4], m);
     };
    } else j = ht;
    if (h = l.start || e.start || +new Date(), x = {
     anim: e,
     percent: i,
     timestamp: h,
     start: h + (e.del || 0),
     status: 0,
     initstatus: a || 0,
     stop: !1,
     ms: m,
     easing: j,
     from: b,
     diff: y,
     to: v,
     el: r,
     callback: l.callback,
     prev: p,
     next: d,
     repeat: s || e.times,
     origin: r.attr(),
     totalOrigin: o
    }, cn.push(x), a && !c && !u && (x.stop = !0, x.start = new Date() - m * a, 1 == cn.length)) return dn();
    u && (x.start = new Date() - x.ms * a), 1 == cn.length && un(dn);
   }
   t("raphael.anim.start." + r.id, r, e);
  }
 }
 function y(e) {
  for (var t = 0; t < cn.length; t++) cn[t].el.paper == e && cn.splice(t--, 1);
 }
 n.version = "2.1.0", n.eve = t;
 var x, w, S = /[, ]+/, C = {
  circle: 1,
  rect: 1,
  path: 1,
  ellipse: 1,
  text: 1,
  image: 1
 }, _ = /\{(\d+)\}/g, E = "hasOwnProperty", k = {
  doc: document,
  win: e
 }, T = {
  was: Object.prototype[E].call(k.win, "Raphael"),
  is: k.win.Raphael
 }, N = function() {
  this.ca = this.customAttributes = {};
 }, D = "apply", M = "concat", I = "ontouchstart" in k.win || k.win.DocumentTouch && k.doc instanceof DocumentTouch, A = "", L = " ", R = String, P = "split", F = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[P](L), O = {
  mousedown: "touchstart",
  mousemove: "touchmove",
  mouseup: "touchend"
 }, B = R.prototype.toLowerCase, $ = Math, G = $.max, j = $.min, U = $.abs, H = $.pow, z = $.PI, q = "number", V = "string", W = "array", Q = Object.prototype.toString, X = (n._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, 
 /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), K = {
  NaN: 1,
  Infinity: 1,
  "-Infinity": 1
 }, Y = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, J = $.round, Z = parseFloat, et = parseInt, tt = R.prototype.toUpperCase, nt = n._availableAttrs = {
  "arrow-end": "none",
  "arrow-start": "none",
  blur: 0,
  "clip-rect": "0 0 1e9 1e9",
  cursor: "default",
  cx: 0,
  cy: 0,
  fill: "#fff",
  "fill-opacity": 1,
  font: '10px "Arial"',
  "font-family": '"Arial"',
  "font-size": "10",
  "font-style": "normal",
  "font-weight": 400,
  gradient: 0,
  height: 0,
  href: "http://raphaeljs.com/",
  "letter-spacing": 0,
  opacity: 1,
  path: "M0,0",
  r: 0,
  rx: 0,
  ry: 0,
  src: "",
  stroke: "#000",
  "stroke-dasharray": "",
  "stroke-linecap": "butt",
  "stroke-linejoin": "butt",
  "stroke-miterlimit": 0,
  "stroke-opacity": 1,
  "stroke-width": 1,
  target: "_blank",
  "text-anchor": "middle",
  title: "Raphael",
  transform: "",
  width: 0,
  x: 0,
  y: 0
 }, rt = n._availableAnimAttrs = {
  blur: q,
  "clip-rect": "csv",
  cx: q,
  cy: q,
  fill: "colour",
  "fill-opacity": q,
  "font-size": q,
  height: q,
  opacity: q,
  path: "path",
  r: q,
  rx: q,
  ry: q,
  stroke: "colour",
  "stroke-opacity": q,
  "stroke-width": q,
  transform: "transform",
  width: q,
  x: q,
  y: q
 }, it = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, at = {
  hs: 1,
  rg: 1
 }, ot = /,?([achlmqrstvxz]),?/gi, st = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, lt = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, ct = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, ut = (n._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, 
 {}), dt = function(e, t) {
  return Z(e) - Z(t);
 }, pt = function() {}, ht = function(e) {
  return e;
 }, ft = n._rectPath = function(e, t, n, r, i) {
  return i ? [ [ "M", e + i, t ], [ "l", n - 2 * i, 0 ], [ "a", i, i, 0, 0, 1, i, i ], [ "l", 0, r - 2 * i ], [ "a", i, i, 0, 0, 1, -i, i ], [ "l", 2 * i - n, 0 ], [ "a", i, i, 0, 0, 1, -i, -i ], [ "l", 0, 2 * i - r ], [ "a", i, i, 0, 0, 1, i, -i ], [ "z" ] ] : [ [ "M", e, t ], [ "l", n, 0 ], [ "l", 0, r ], [ "l", -n, 0 ], [ "z" ] ];
 }, mt = function(e, t, n, r) {
  return null == r && (r = n), [ [ "M", e, t ], [ "m", 0, -r ], [ "a", n, r, 0, 1, 1, 0, 2 * r ], [ "a", n, r, 0, 1, 1, 0, -2 * r ], [ "z" ] ];
 }, gt = n._getPath = {
  path: function(e) {
   return e.attr("path");
  },
  circle: function(e) {
   var t = e.attrs;
   return mt(t.cx, t.cy, t.r);
  },
  ellipse: function(e) {
   var t = e.attrs;
   return mt(t.cx, t.cy, t.rx, t.ry);
  },
  rect: function(e) {
   var t = e.attrs;
   return ft(t.x, t.y, t.width, t.height, t.r);
  },
  image: function(e) {
   var t = e.attrs;
   return ft(t.x, t.y, t.width, t.height);
  },
  text: function(e) {
   var t = e._getBBox();
   return ft(t.x, t.y, t.width, t.height);
  },
  set: function(e) {
   var t = e._getBBox();
   return ft(t.x, t.y, t.width, t.height);
  }
 }, bt = n.mapPath = function(e, t) {
  if (!t) return e;
  var n, r, i, a, o, s, l;
  for (e = Ft(e), i = 0, o = e.length; o > i; i++) for (l = e[i], a = 1, s = l.length; s > a; a += 2) n = t.x(l[a], l[a + 1]), 
  r = t.y(l[a], l[a + 1]), l[a] = n, l[a + 1] = r;
  return e;
 };
 if (n._g = k, n.type = k.win.SVGAngle || k.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", 
 "VML" == n.type) {
  var vt, yt = k.doc.createElement("div");
  if (yt.innerHTML = '<v:shape adj="1"/>', vt = yt.firstChild, vt.style.behavior = "url(#default#VML)", 
  !vt || "object" != typeof vt.adj) return n.type = A;
  yt = null;
 }
 n.svg = !(n.vml = "VML" == n.type), n._Paper = N, n.fn = w = N.prototype = n.prototype, 
 n._id = 0, n._oid = 0, n.is = function(e, t) {
  return t = B.call(t), "finite" == t ? !K[E](+e) : "array" == t ? e instanceof Array : "null" == t && null === e || t == typeof e && null !== e || "object" == t && e === Object(e) || "array" == t && Array.isArray && Array.isArray(e) || Q.call(e).slice(8, -1).toLowerCase() == t;
 }, n.angle = function(e, t, r, i, a, o) {
  if (null == a) {
   var s = e - r, l = t - i;
   return s || l ? (180 + 180 * $.atan2(-l, -s) / z + 360) % 360 : 0;
  }
  return n.angle(e, t, a, o) - n.angle(r, i, a, o);
 }, n.rad = function(e) {
  return e % 360 * z / 180;
 }, n.deg = function(e) {
  return 180 * e / z % 360;
 }, n.snapTo = function(e, t, r) {
  if (r = n.is(r, "finite") ? r : 10, n.is(e, W)) {
   for (var i = e.length; i--; ) if (U(e[i] - t) <= r) return e[i];
  } else {
   e = +e;
   var a = t % e;
   if (r > a) return t - a;
   if (a > e - r) return t - a + e;
  }
  return t;
 };
 n.createUUID = function(e, t) {
  return function() {
   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase();
  };
 }(/[xy]/g, function(e) {
  var t = 16 * $.random() | 0, n = "x" == e ? t : 3 & t | 8;
  return n.toString(16);
 });
 n.setWindow = function(e) {
  t("raphael.setWindow", n, k.win, e), k.win = e, k.doc = k.win.document, n._engine.initWin && n._engine.initWin(k.win);
 };
 var xt = function(e) {
  if (n.vml) {
   var t, r = /^\s+|\s+$/g;
   try {
    var i = new ActiveXObject("htmlfile");
    i.write("<body>"), i.close(), t = i.body;
   } catch (o) {
    t = createPopup().document.body;
   }
   var s = t.createTextRange();
   xt = a(function(e) {
    try {
     t.style.color = R(e).replace(r, A);
     var n = s.queryCommandValue("ForeColor");
     return n = (255 & n) << 16 | 65280 & n | (16711680 & n) >>> 16, "#" + ("000000" + n.toString(16)).slice(-6);
    } catch (i) {
     return "none";
    }
   });
  } else {
   var l = k.doc.createElement("i");
   l.title = "Raphaël Colour Picker", l.style.display = "none", k.doc.body.appendChild(l), 
   xt = a(function(e) {
    return l.style.color = e, k.doc.defaultView.getComputedStyle(l, A).getPropertyValue("color");
   });
  }
  return xt(e);
 }, wt = function() {
  return "hsb(" + [ this.h, this.s, this.b ] + ")";
 }, St = function() {
  return "hsl(" + [ this.h, this.s, this.l ] + ")";
 }, Ct = function() {
  return this.hex;
 }, _t = function(e, t, r) {
  if (null == t && n.is(e, "object") && "r" in e && "g" in e && "b" in e && (r = e.b, 
  t = e.g, e = e.r), null == t && n.is(e, V)) {
   var i = n.getRGB(e);
   e = i.r, t = i.g, r = i.b;
  }
  return (e > 1 || t > 1 || r > 1) && (e /= 255, t /= 255, r /= 255), [ e, t, r ];
 }, Et = function(e, t, r, i) {
  e *= 255, t *= 255, r *= 255;
  var a = {
   r: e,
   g: t,
   b: r,
   hex: n.rgb(e, t, r),
   toString: Ct
  };
  return n.is(i, "finite") && (a.opacity = i), a;
 };
 n.color = function(e) {
  var t;
  return n.is(e, "object") && "h" in e && "s" in e && "b" in e ? (t = n.hsb2rgb(e), 
  e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : n.is(e, "object") && "h" in e && "s" in e && "l" in e ? (t = n.hsl2rgb(e), 
  e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : (n.is(e, "string") && (e = n.getRGB(e)), 
  n.is(e, "object") && "r" in e && "g" in e && "b" in e ? (t = n.rgb2hsl(e), e.h = t.h, 
  e.s = t.s, e.l = t.l, t = n.rgb2hsb(e), e.v = t.b) : (e = {
   hex: "none"
  }, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1)), e.toString = Ct, e;
 }, n.hsb2rgb = function(e, t, n, r) {
  this.is(e, "object") && "h" in e && "s" in e && "b" in e && (n = e.b, t = e.s, e = e.h, 
  r = e.o), e *= 360;
  var i, a, o, s, l;
  return e = e % 360 / 60, l = n * t, s = l * (1 - U(e % 2 - 1)), i = a = o = n - l, 
  e = ~~e, i += [ l, s, 0, 0, s, l ][e], a += [ s, l, l, s, 0, 0 ][e], o += [ 0, 0, s, l, l, s ][e], 
  Et(i, a, o, r);
 }, n.hsl2rgb = function(e, t, n, r) {
  this.is(e, "object") && "h" in e && "s" in e && "l" in e && (n = e.l, t = e.s, e = e.h), 
  (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), e *= 360;
  var i, a, o, s, l;
  return e = e % 360 / 60, l = 2 * t * (.5 > n ? n : 1 - n), s = l * (1 - U(e % 2 - 1)), 
  i = a = o = n - l / 2, e = ~~e, i += [ l, s, 0, 0, s, l ][e], a += [ s, l, l, s, 0, 0 ][e], 
  o += [ 0, 0, s, l, l, s ][e], Et(i, a, o, r);
 }, n.rgb2hsb = function(e, t, n) {
  n = _t(e, t, n), e = n[0], t = n[1], n = n[2];
  var r, i, a, o;
  return a = G(e, t, n), o = a - j(e, t, n), r = 0 == o ? null : a == e ? (t - n) / o : a == t ? (n - e) / o + 2 : (e - t) / o + 4, 
  r = (r + 360) % 6 * 60 / 360, i = 0 == o ? 0 : o / a, {
   h: r,
   s: i,
   b: a,
   toString: wt
  };
 }, n.rgb2hsl = function(e, t, n) {
  n = _t(e, t, n), e = n[0], t = n[1], n = n[2];
  var r, i, a, o, s, l;
  return o = G(e, t, n), s = j(e, t, n), l = o - s, r = 0 == l ? null : o == e ? (t - n) / l : o == t ? (n - e) / l + 2 : (e - t) / l + 4, 
  r = (r + 360) % 6 * 60 / 360, a = (o + s) / 2, i = 0 == l ? 0 : .5 > a ? l / (2 * a) : l / (2 - 2 * a), 
  {
   h: r,
   s: i,
   l: a,
   toString: St
  };
 }, n._path2string = function() {
  return this.join(",").replace(ot, "$1");
 };
 n._preload = function(e, t) {
  var n = k.doc.createElement("img");
  n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function() {
   t.call(this), this.onload = null, k.doc.body.removeChild(this);
  }, n.onerror = function() {
   k.doc.body.removeChild(this);
  }, k.doc.body.appendChild(n), n.src = e;
 };
 n.getRGB = a(function(e) {
  if (!e || (e = R(e)).indexOf("-") + 1) return {
   r: -1,
   g: -1,
   b: -1,
   hex: "none",
   error: 1,
   toString: o
  };
  if ("none" == e) return {
   r: -1,
   g: -1,
   b: -1,
   hex: "none",
   toString: o
  };
  !(at[E](e.toLowerCase().substring(0, 2)) || "#" == e.charAt()) && (e = xt(e));
  var t, r, i, a, s, l, c = e.match(X);
  return c ? (c[2] && (i = et(c[2].substring(5), 16), r = et(c[2].substring(3, 5), 16), 
  t = et(c[2].substring(1, 3), 16)), c[3] && (i = et((s = c[3].charAt(3)) + s, 16), 
  r = et((s = c[3].charAt(2)) + s, 16), t = et((s = c[3].charAt(1)) + s, 16)), c[4] && (l = c[4][P](it), 
  t = Z(l[0]), "%" == l[0].slice(-1) && (t *= 2.55), r = Z(l[1]), "%" == l[1].slice(-1) && (r *= 2.55), 
  i = Z(l[2]), "%" == l[2].slice(-1) && (i *= 2.55), "rgba" == c[1].toLowerCase().slice(0, 4) && (a = Z(l[3])), 
  l[3] && "%" == l[3].slice(-1) && (a /= 100)), c[5] ? (l = c[5][P](it), t = Z(l[0]), 
  "%" == l[0].slice(-1) && (t *= 2.55), r = Z(l[1]), "%" == l[1].slice(-1) && (r *= 2.55), 
  i = Z(l[2]), "%" == l[2].slice(-1) && (i *= 2.55), ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (t /= 360), 
  "hsba" == c[1].toLowerCase().slice(0, 4) && (a = Z(l[3])), l[3] && "%" == l[3].slice(-1) && (a /= 100), 
  n.hsb2rgb(t, r, i, a)) : c[6] ? (l = c[6][P](it), t = Z(l[0]), "%" == l[0].slice(-1) && (t *= 2.55), 
  r = Z(l[1]), "%" == l[1].slice(-1) && (r *= 2.55), i = Z(l[2]), "%" == l[2].slice(-1) && (i *= 2.55), 
  ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (t /= 360), "hsla" == c[1].toLowerCase().slice(0, 4) && (a = Z(l[3])), 
  l[3] && "%" == l[3].slice(-1) && (a /= 100), n.hsl2rgb(t, r, i, a)) : (c = {
   r: t,
   g: r,
   b: i,
   toString: o
  }, c.hex = "#" + (16777216 | i | r << 8 | t << 16).toString(16).slice(1), n.is(a, "finite") && (c.opacity = a), 
  c)) : {
   r: -1,
   g: -1,
   b: -1,
   hex: "none",
   error: 1,
   toString: o
  };
 }, n), n.hsb = a(function(e, t, r) {
  return n.hsb2rgb(e, t, r).hex;
 }), n.hsl = a(function(e, t, r) {
  return n.hsl2rgb(e, t, r).hex;
 }), n.rgb = a(function(e, t, n) {
  return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1);
 }), n.getColor = function(e) {
  var t = this.getColor.start = this.getColor.start || {
   h: 0,
   s: 1,
   b: e || .75
  }, n = this.hsb2rgb(t.h, t.s, t.b);
  return t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {
   h: 0,
   s: 1,
   b: t.b
  })), n.hex;
 }, n.getColor.reset = function() {
  delete this.start;
 }, n.parsePathString = function(e) {
  if (!e) return null;
  var t = kt(e);
  if (t.arr) return Nt(t.arr);
  var r = {
   a: 7,
   c: 6,
   h: 1,
   l: 2,
   m: 2,
   r: 4,
   q: 4,
   s: 4,
   t: 2,
   v: 1,
   z: 0
  }, i = [];
  return n.is(e, W) && n.is(e[0], W) && (i = Nt(e)), i.length || R(e).replace(st, function(e, t, n) {
   var a = [], o = t.toLowerCase();
   if (n.replace(ct, function(e, t) {
    t && a.push(+t);
   }), "m" == o && a.length > 2 && (i.push([ t ][M](a.splice(0, 2))), o = "l", t = "m" == t ? "l" : "L"), 
   "r" == o) i.push([ t ][M](a)); else for (;a.length >= r[o] && (i.push([ t ][M](a.splice(0, r[o]))), 
   r[o]); ) ;
  }), i.toString = n._path2string, t.arr = Nt(i), i;
 }, n.parseTransformString = a(function(e) {
  if (!e) return null;
  var t = [];
  return n.is(e, W) && n.is(e[0], W) && (t = Nt(e)), t.length || R(e).replace(lt, function(e, n, r) {
   {
    var i = [];
    B.call(n);
   }
   r.replace(ct, function(e, t) {
    t && i.push(+t);
   }), t.push([ n ][M](i));
  }), t.toString = n._path2string, t;
 });
 var kt = function(e) {
  var t = kt.ps = kt.ps || {};
  return t[e] ? t[e].sleep = 100 : t[e] = {
   sleep: 100
  }, setTimeout(function() {
   for (var n in t) t[E](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n]);
  }), t[e];
 };
 n.findDotsAtSegment = function(e, t, n, r, i, a, o, s, l) {
  var c = 1 - l, u = H(c, 3), d = H(c, 2), p = l * l, h = p * l, f = u * e + 3 * d * l * n + 3 * c * l * l * i + h * o, m = u * t + 3 * d * l * r + 3 * c * l * l * a + h * s, g = e + 2 * l * (n - e) + p * (i - 2 * n + e), b = t + 2 * l * (r - t) + p * (a - 2 * r + t), v = n + 2 * l * (i - n) + p * (o - 2 * i + n), y = r + 2 * l * (a - r) + p * (s - 2 * a + r), x = c * e + l * n, w = c * t + l * r, S = c * i + l * o, C = c * a + l * s, _ = 90 - 180 * $.atan2(g - v, b - y) / z;
  return (g > v || y > b) && (_ += 180), {
   x: f,
   y: m,
   m: {
    x: g,
    y: b
   },
   n: {
    x: v,
    y: y
   },
   start: {
    x: x,
    y: w
   },
   end: {
    x: S,
    y: C
   },
   alpha: _
  };
 }, n.bezierBBox = function(e, t, r, i, a, o, s, l) {
  n.is(e, "array") || (e = [ e, t, r, i, a, o, s, l ]);
  var c = Pt.apply(null, e);
  return {
   x: c.min.x,
   y: c.min.y,
   x2: c.max.x,
   y2: c.max.y,
   width: c.max.x - c.min.x,
   height: c.max.y - c.min.y
  };
 }, n.isPointInsideBBox = function(e, t, n) {
  return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2;
 }, n.isBBoxIntersect = function(e, t) {
  var r = n.isPointInsideBBox;
  return r(t, e.x, e.y) || r(t, e.x2, e.y) || r(t, e.x, e.y2) || r(t, e.x2, e.y2) || r(e, t.x, t.y) || r(e, t.x2, t.y) || r(e, t.x, t.y2) || r(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y);
 }, n.pathIntersection = function(e, t) {
  return h(e, t);
 }, n.pathIntersectionNumber = function(e, t) {
  return h(e, t, 1);
 }, n.isPointInsidePath = function(e, t, r) {
  var i = n.pathBBox(e);
  return n.isPointInsideBBox(i, t, r) && h(e, [ [ "M", t, r ], [ "H", i.x2 + 10 ] ], 1) % 2 == 1;
 }, n._removedFactory = function(e) {
  return function() {
   t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e);
  };
 };
 var Tt = n.pathBBox = function(e) {
  var t = kt(e);
  if (t.bbox) return r(t.bbox);
  if (!e) return {
   x: 0,
   y: 0,
   width: 0,
   height: 0,
   x2: 0,
   y2: 0
  };
  e = Ft(e);
  for (var n, i = 0, a = 0, o = [], s = [], l = 0, c = e.length; c > l; l++) if (n = e[l], 
  "M" == n[0]) i = n[1], a = n[2], o.push(i), s.push(a); else {
   var u = Pt(i, a, n[1], n[2], n[3], n[4], n[5], n[6]);
   o = o[M](u.min.x, u.max.x), s = s[M](u.min.y, u.max.y), i = n[5], a = n[6];
  }
  var d = j[D](0, o), p = j[D](0, s), h = G[D](0, o), f = G[D](0, s), m = h - d, g = f - p, b = {
   x: d,
   y: p,
   x2: h,
   y2: f,
   width: m,
   height: g,
   cx: d + m / 2,
   cy: p + g / 2
  };
  return t.bbox = r(b), b;
 }, Nt = function(e) {
  var t = r(e);
  return t.toString = n._path2string, t;
 }, Dt = n._pathToRelative = function(e) {
  var t = kt(e);
  if (t.rel) return Nt(t.rel);
  n.is(e, W) && n.is(e && e[0], W) || (e = n.parsePathString(e));
  var r = [], i = 0, a = 0, o = 0, s = 0, l = 0;
  "M" == e[0][0] && (i = e[0][1], a = e[0][2], o = i, s = a, l++, r.push([ "M", i, a ]));
  for (var c = l, u = e.length; u > c; c++) {
   var d = r[c] = [], p = e[c];
   if (p[0] != B.call(p[0])) switch (d[0] = B.call(p[0]), d[0]) {
   case "a":
    d[1] = p[1], d[2] = p[2], d[3] = p[3], d[4] = p[4], d[5] = p[5], d[6] = +(p[6] - i).toFixed(3), 
    d[7] = +(p[7] - a).toFixed(3);
    break;

   case "v":
    d[1] = +(p[1] - a).toFixed(3);
    break;

   case "m":
    o = p[1], s = p[2];

   default:
    for (var h = 1, f = p.length; f > h; h++) d[h] = +(p[h] - (h % 2 ? i : a)).toFixed(3);
   } else {
    d = r[c] = [], "m" == p[0] && (o = p[1] + i, s = p[2] + a);
    for (var m = 0, g = p.length; g > m; m++) r[c][m] = p[m];
   }
   var b = r[c].length;
   switch (r[c][0]) {
   case "z":
    i = o, a = s;
    break;

   case "h":
    i += +r[c][b - 1];
    break;

   case "v":
    a += +r[c][b - 1];
    break;

   default:
    i += +r[c][b - 2], a += +r[c][b - 1];
   }
  }
  return r.toString = n._path2string, t.rel = Nt(r), r;
 }, Mt = n._pathToAbsolute = function(e) {
  var t = kt(e);
  if (t.abs) return Nt(t.abs);
  if (n.is(e, W) && n.is(e && e[0], W) || (e = n.parsePathString(e)), !e || !e.length) return [ [ "M", 0, 0 ] ];
  var r = [], i = 0, a = 0, o = 0, l = 0, c = 0;
  "M" == e[0][0] && (i = +e[0][1], a = +e[0][2], o = i, l = a, c++, r[0] = [ "M", i, a ]);
  for (var u, d, p = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), h = c, f = e.length; f > h; h++) {
   if (r.push(u = []), d = e[h], d[0] != tt.call(d[0])) switch (u[0] = tt.call(d[0]), 
   u[0]) {
   case "A":
    u[1] = d[1], u[2] = d[2], u[3] = d[3], u[4] = d[4], u[5] = d[5], u[6] = +(d[6] + i), 
    u[7] = +(d[7] + a);
    break;

   case "V":
    u[1] = +d[1] + a;
    break;

   case "H":
    u[1] = +d[1] + i;
    break;

   case "R":
    for (var m = [ i, a ][M](d.slice(1)), g = 2, b = m.length; b > g; g++) m[g] = +m[g] + i, 
    m[++g] = +m[g] + a;
    r.pop(), r = r[M](s(m, p));
    break;

   case "M":
    o = +d[1] + i, l = +d[2] + a;

   default:
    for (g = 1, b = d.length; b > g; g++) u[g] = +d[g] + (g % 2 ? i : a);
   } else if ("R" == d[0]) m = [ i, a ][M](d.slice(1)), r.pop(), r = r[M](s(m, p)), 
   u = [ "R" ][M](d.slice(-2)); else for (var v = 0, y = d.length; y > v; v++) u[v] = d[v];
   switch (u[0]) {
   case "Z":
    i = o, a = l;
    break;

   case "H":
    i = u[1];
    break;

   case "V":
    a = u[1];
    break;

   case "M":
    o = u[u.length - 2], l = u[u.length - 1];

   default:
    i = u[u.length - 2], a = u[u.length - 1];
   }
  }
  return r.toString = n._path2string, t.abs = Nt(r), r;
 }, It = function(e, t, n, r) {
  return [ e, t, n, r, n, r ];
 }, At = function(e, t, n, r, i, a) {
  var o = 1 / 3, s = 2 / 3;
  return [ o * e + s * n, o * t + s * r, o * i + s * n, o * a + s * r, i, a ];
 }, Lt = function(e, t, n, r, i, o, s, l, c, u) {
  var d, p = 120 * z / 180, h = z / 180 * (+i || 0), f = [], m = a(function(e, t, n) {
   var r = e * $.cos(n) - t * $.sin(n), i = e * $.sin(n) + t * $.cos(n);
   return {
    x: r,
    y: i
   };
  });
  if (u) _ = u[0], E = u[1], S = u[2], C = u[3]; else {
   d = m(e, t, -h), e = d.x, t = d.y, d = m(l, c, -h), l = d.x, c = d.y;
   var g = ($.cos(z / 180 * i), $.sin(z / 180 * i), (e - l) / 2), b = (t - c) / 2, v = g * g / (n * n) + b * b / (r * r);
   v > 1 && (v = $.sqrt(v), n = v * n, r = v * r);
   var y = n * n, x = r * r, w = (o == s ? -1 : 1) * $.sqrt(U((y * x - y * b * b - x * g * g) / (y * b * b + x * g * g))), S = w * n * b / r + (e + l) / 2, C = w * -r * g / n + (t + c) / 2, _ = $.asin(((t - C) / r).toFixed(9)), E = $.asin(((c - C) / r).toFixed(9));
   _ = S > e ? z - _ : _, E = S > l ? z - E : E, 0 > _ && (_ = 2 * z + _), 0 > E && (E = 2 * z + E), 
   s && _ > E && (_ -= 2 * z), !s && E > _ && (E -= 2 * z);
  }
  var k = E - _;
  if (U(k) > p) {
   var T = E, N = l, D = c;
   E = _ + p * (s && E > _ ? 1 : -1), l = S + n * $.cos(E), c = C + r * $.sin(E), f = Lt(l, c, n, r, i, 0, s, N, D, [ E, T, S, C ]);
  }
  k = E - _;
  var I = $.cos(_), A = $.sin(_), L = $.cos(E), R = $.sin(E), F = $.tan(k / 4), O = 4 / 3 * n * F, B = 4 / 3 * r * F, G = [ e, t ], j = [ e + O * A, t - B * I ], H = [ l + O * R, c - B * L ], q = [ l, c ];
  if (j[0] = 2 * G[0] - j[0], j[1] = 2 * G[1] - j[1], u) return [ j, H, q ][M](f);
  f = [ j, H, q ][M](f).join()[P](",");
  for (var V = [], W = 0, Q = f.length; Q > W; W++) V[W] = W % 2 ? m(f[W - 1], f[W], h).y : m(f[W], f[W + 1], h).x;
  return V;
 }, Rt = function(e, t, n, r, i, a, o, s, l) {
  var c = 1 - l;
  return {
   x: H(c, 3) * e + 3 * H(c, 2) * l * n + 3 * c * l * l * i + H(l, 3) * o,
   y: H(c, 3) * t + 3 * H(c, 2) * l * r + 3 * c * l * l * a + H(l, 3) * s
  };
 }, Pt = a(function(e, t, n, r, i, a, o, s) {
  var l, c = i - 2 * n + e - (o - 2 * i + n), u = 2 * (n - e) - 2 * (i - n), d = e - n, p = (-u + $.sqrt(u * u - 4 * c * d)) / 2 / c, h = (-u - $.sqrt(u * u - 4 * c * d)) / 2 / c, f = [ t, s ], m = [ e, o ];
  return U(p) > "1e12" && (p = .5), U(h) > "1e12" && (h = .5), p > 0 && 1 > p && (l = Rt(e, t, n, r, i, a, o, s, p), 
  m.push(l.x), f.push(l.y)), h > 0 && 1 > h && (l = Rt(e, t, n, r, i, a, o, s, h), 
  m.push(l.x), f.push(l.y)), c = a - 2 * r + t - (s - 2 * a + r), u = 2 * (r - t) - 2 * (a - r), 
  d = t - r, p = (-u + $.sqrt(u * u - 4 * c * d)) / 2 / c, h = (-u - $.sqrt(u * u - 4 * c * d)) / 2 / c, 
  U(p) > "1e12" && (p = .5), U(h) > "1e12" && (h = .5), p > 0 && 1 > p && (l = Rt(e, t, n, r, i, a, o, s, p), 
  m.push(l.x), f.push(l.y)), h > 0 && 1 > h && (l = Rt(e, t, n, r, i, a, o, s, h), 
  m.push(l.x), f.push(l.y)), {
   min: {
    x: j[D](0, m),
    y: j[D](0, f)
   },
   max: {
    x: G[D](0, m),
    y: G[D](0, f)
   }
  };
 }), Ft = n._path2curve = a(function(e, t) {
  var n = !t && kt(e);
  if (!t && n.curve) return Nt(n.curve);
  for (var r = Mt(e), i = t && Mt(t), a = {
   x: 0,
   y: 0,
   bx: 0,
   by: 0,
   X: 0,
   Y: 0,
   qx: null,
   qy: null
  }, o = {
   x: 0,
   y: 0,
   bx: 0,
   by: 0,
   X: 0,
   Y: 0,
   qx: null,
   qy: null
  }, s = (function(e, t, n) {
   var r, i;
   if (!e) return [ "C", t.x, t.y, t.x, t.y, t.x, t.y ];
   switch (!(e[0] in {
    T: 1,
    Q: 1
   }) && (t.qx = t.qy = null), e[0]) {
   case "M":
    t.X = e[1], t.Y = e[2];
    break;

   case "A":
    e = [ "C" ][M](Lt[D](0, [ t.x, t.y ][M](e.slice(1))));
    break;

   case "S":
    "C" == n || "S" == n ? (r = 2 * t.x - t.bx, i = 2 * t.y - t.by) : (r = t.x, i = t.y), 
    e = [ "C", r, i ][M](e.slice(1));
    break;

   case "T":
    "Q" == n || "T" == n ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, 
    t.qy = t.y), e = [ "C" ][M](At(t.x, t.y, t.qx, t.qy, e[1], e[2]));
    break;

   case "Q":
    t.qx = e[1], t.qy = e[2], e = [ "C" ][M](At(t.x, t.y, e[1], e[2], e[3], e[4]));
    break;

   case "L":
    e = [ "C" ][M](It(t.x, t.y, e[1], e[2]));
    break;

   case "H":
    e = [ "C" ][M](It(t.x, t.y, e[1], t.y));
    break;

   case "V":
    e = [ "C" ][M](It(t.x, t.y, t.x, e[1]));
    break;

   case "Z":
    e = [ "C" ][M](It(t.x, t.y, t.X, t.Y));
   }
   return e;
  }), l = function(e, t) {
   if (e[t].length > 7) {
    e[t].shift();
    for (var n = e[t]; n.length; ) e.splice(t++, 0, [ "C" ][M](n.splice(0, 6)));
    e.splice(t, 1), d = G(r.length, i && i.length || 0);
   }
  }, c = function(e, t, n, a, o) {
   e && t && "M" == e[o][0] && "M" != t[o][0] && (t.splice(o, 0, [ "M", a.x, a.y ]), 
   n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], d = G(r.length, i && i.length || 0));
  }, u = 0, d = G(r.length, i && i.length || 0); d > u; u++) {
   r[u] = s(r[u], a), l(r, u), i && (i[u] = s(i[u], o)), i && l(i, u), c(r, i, a, o, u), 
   c(i, r, o, a, u);
   var p = r[u], h = i && i[u], f = p.length, m = i && h.length;
   a.x = p[f - 2], a.y = p[f - 1], a.bx = Z(p[f - 4]) || a.x, a.by = Z(p[f - 3]) || a.y, 
   o.bx = i && (Z(h[m - 4]) || o.x), o.by = i && (Z(h[m - 3]) || o.y), o.x = i && h[m - 2], 
   o.y = i && h[m - 1];
  }
  return i || (n.curve = Nt(r)), i ? [ r, i ] : r;
 }, null, Nt), Ot = (n._parseDots = a(function(e) {
  for (var t = [], r = 0, i = e.length; i > r; r++) {
   var a = {}, o = e[r].match(/^([^:]*):?([\d\.]*)/);
   if (a.color = n.getRGB(o[1]), a.color.error) return null;
   a.color = a.color.hex, o[2] && (a.offset = o[2] + "%"), t.push(a);
  }
  for (r = 1, i = t.length - 1; i > r; r++) if (!t[r].offset) {
   for (var s = Z(t[r - 1].offset || 0), l = 0, c = r + 1; i > c; c++) if (t[c].offset) {
    l = t[c].offset;
    break;
   }
   l || (l = 100, c = i), l = Z(l);
   for (var u = (l - s) / (c - r + 1); c > r; r++) s += u, t[r].offset = s + "%";
  }
  return t;
 }), n._tear = function(e, t) {
  e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), 
  e.prev && (e.prev.next = e.next);
 }), Bt = (n._tofront = function(e, t) {
  t.top !== e && (Ot(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e);
 }, n._toback = function(e, t) {
  t.bottom !== e && (Ot(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, 
  t.bottom = e);
 }, n._insertafter = function(e, t, n) {
  Ot(e, n), t == n.top && (n.top = e), t.next && (t.next.prev = e), e.next = t.next, 
  e.prev = t, t.next = e;
 }, n._insertbefore = function(e, t, n) {
  Ot(e, n), t == n.bottom && (n.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, 
  t.prev = e, e.next = t;
 }, n.toMatrix = function(e, t) {
  var n = Tt(e), r = {
   _: {
    transform: A
   },
   getBBox: function() {
    return n;
   }
  };
  return $t(r, t), r.matrix;
 }), $t = (n.transformPath = function(e, t) {
  return bt(e, Bt(e, t));
 }, n._extractTransform = function(e, t) {
  if (null == t) return e._.transform;
  t = R(t).replace(/\.{3}|\u2026/g, e._.transform || A);
  var r = n.parseTransformString(t), i = 0, a = 0, o = 0, s = 1, l = 1, c = e._, u = new f();
  if (c.transform = r || [], r) for (var d = 0, p = r.length; p > d; d++) {
   var h, m, g, b, v, y = r[d], x = y.length, w = R(y[0]).toLowerCase(), S = y[0] != w, C = S ? u.invert() : 0;
   "t" == w && 3 == x ? S ? (h = C.x(0, 0), m = C.y(0, 0), g = C.x(y[1], y[2]), b = C.y(y[1], y[2]), 
   u.translate(g - h, b - m)) : u.translate(y[1], y[2]) : "r" == w ? 2 == x ? (v = v || e.getBBox(1), 
   u.rotate(y[1], v.x + v.width / 2, v.y + v.height / 2), i += y[1]) : 4 == x && (S ? (g = C.x(y[2], y[3]), 
   b = C.y(y[2], y[3]), u.rotate(y[1], g, b)) : u.rotate(y[1], y[2], y[3]), i += y[1]) : "s" == w ? 2 == x || 3 == x ? (v = v || e.getBBox(1), 
   u.scale(y[1], y[x - 1], v.x + v.width / 2, v.y + v.height / 2), s *= y[1], l *= y[x - 1]) : 5 == x && (S ? (g = C.x(y[3], y[4]), 
   b = C.y(y[3], y[4]), u.scale(y[1], y[2], g, b)) : u.scale(y[1], y[2], y[3], y[4]), 
   s *= y[1], l *= y[2]) : "m" == w && 7 == x && u.add(y[1], y[2], y[3], y[4], y[5], y[6]), 
   c.dirtyT = 1, e.matrix = u;
  }
  e.matrix = u, c.sx = s, c.sy = l, c.deg = i, c.dx = a = u.e, c.dy = o = u.f, 1 == s && 1 == l && !i && c.bbox ? (c.bbox.x += +a, 
  c.bbox.y += +o) : c.dirtyT = 1;
 }), Gt = function(e) {
  var t = e[0];
  switch (t.toLowerCase()) {
  case "t":
   return [ t, 0, 0 ];

  case "m":
   return [ t, 1, 0, 0, 1, 0, 0 ];

  case "r":
   return 4 == e.length ? [ t, 0, e[2], e[3] ] : [ t, 0 ];

  case "s":
   return 5 == e.length ? [ t, 1, 1, e[3], e[4] ] : 3 == e.length ? [ t, 1, 1 ] : [ t, 1 ];
  }
 }, jt = n._equaliseTransform = function(e, t) {
  t = R(t).replace(/\.{3}|\u2026/g, e), e = n.parseTransformString(e) || [], t = n.parseTransformString(t) || [];
  for (var r, i, a, o, s = G(e.length, t.length), l = [], c = [], u = 0; s > u; u++) {
   if (a = e[u] || Gt(t[u]), o = t[u] || Gt(a), a[0] != o[0] || "r" == a[0].toLowerCase() && (a[2] != o[2] || a[3] != o[3]) || "s" == a[0].toLowerCase() && (a[3] != o[3] || a[4] != o[4])) return;
   for (l[u] = [], c[u] = [], r = 0, i = G(a.length, o.length); i > r; r++) r in a && (l[u][r] = a[r]), 
   r in o && (c[u][r] = o[r]);
  }
  return {
   from: l,
   to: c
  };
 };
 n._getContainer = function(e, t, r, i) {
  var a;
  return a = null != i || n.is(e, "object") ? e : k.doc.getElementById(e), null != a ? a.tagName ? null == t ? {
   container: a,
   width: a.style.pixelWidth || a.offsetWidth,
   height: a.style.pixelHeight || a.offsetHeight
  } : {
   container: a,
   width: t,
   height: r
  } : {
   container: 1,
   x: e,
   y: t,
   width: r,
   height: i
  } : void 0;
 }, n.pathToRelative = Dt, n._engine = {}, n.path2curve = Ft, n.matrix = function(e, t, n, r, i, a) {
  return new f(e, t, n, r, i, a);
 }, function(e) {
  function t(e) {
   return e[0] * e[0] + e[1] * e[1];
  }
  function r(e) {
   var n = $.sqrt(t(e));
   e[0] && (e[0] /= n), e[1] && (e[1] /= n);
  }
  e.add = function(e, t, n, r, i, a) {
   var o, s, l, c, u = [ [], [], [] ], d = [ [ this.a, this.c, this.e ], [ this.b, this.d, this.f ], [ 0, 0, 1 ] ], p = [ [ e, n, i ], [ t, r, a ], [ 0, 0, 1 ] ];
   for (e && e instanceof f && (p = [ [ e.a, e.c, e.e ], [ e.b, e.d, e.f ], [ 0, 0, 1 ] ]), 
   o = 0; 3 > o; o++) for (s = 0; 3 > s; s++) {
    for (c = 0, l = 0; 3 > l; l++) c += d[o][l] * p[l][s];
    u[o][s] = c;
   }
   this.a = u[0][0], this.b = u[1][0], this.c = u[0][1], this.d = u[1][1], this.e = u[0][2], 
   this.f = u[1][2];
  }, e.invert = function() {
   var e = this, t = e.a * e.d - e.b * e.c;
   return new f(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t);
  }, e.clone = function() {
   return new f(this.a, this.b, this.c, this.d, this.e, this.f);
  }, e.translate = function(e, t) {
   this.add(1, 0, 0, 1, e, t);
  }, e.scale = function(e, t, n, r) {
   null == t && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), 
   (n || r) && this.add(1, 0, 0, 1, -n, -r);
  }, e.rotate = function(e, t, r) {
   e = n.rad(e), t = t || 0, r = r || 0;
   var i = +$.cos(e).toFixed(9), a = +$.sin(e).toFixed(9);
   this.add(i, a, -a, i, t, r), this.add(1, 0, 0, 1, -t, -r);
  }, e.x = function(e, t) {
   return e * this.a + t * this.c + this.e;
  }, e.y = function(e, t) {
   return e * this.b + t * this.d + this.f;
  }, e.get = function(e) {
   return +this[R.fromCharCode(97 + e)].toFixed(4);
  }, e.toString = function() {
   return n.svg ? "matrix(" + [ this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5) ].join() + ")" : [ this.get(0), this.get(2), this.get(1), this.get(3), 0, 0 ].join();
  }, e.toFilter = function() {
   return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
  }, e.offset = function() {
   return [ this.e.toFixed(4), this.f.toFixed(4) ];
  }, e.split = function() {
   var e = {};
   e.dx = this.e, e.dy = this.f;
   var i = [ [ this.a, this.c ], [ this.b, this.d ] ];
   e.scalex = $.sqrt(t(i[0])), r(i[0]), e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], 
   i[1] = [ i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear ], e.scaley = $.sqrt(t(i[1])), 
   r(i[1]), e.shear /= e.scaley;
   var a = -i[0][1], o = i[1][1];
   return 0 > o ? (e.rotate = n.deg($.acos(o)), 0 > a && (e.rotate = 360 - e.rotate)) : e.rotate = n.deg($.asin(a)), 
   e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate), 
   e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, 
   e.noRotation = !+e.shear.toFixed(9) && !e.rotate, e;
  }, e.toTransformString = function(e) {
   var t = e || this[P]();
   return t.isSimple ? (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), 
   t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [ t.dx, t.dy ] : A) + (1 != t.scalex || 1 != t.scaley ? "s" + [ t.scalex, t.scaley, 0, 0 ] : A) + (t.rotate ? "r" + [ t.rotate, 0, 0 ] : A)) : "m" + [ this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5) ];
  };
 }(f.prototype);
 var Ut = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
 w.safari = "Apple Computer, Inc." == navigator.vendor && (Ut && Ut[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Ut && Ut[1] < 8 ? function() {
  var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
   stroke: "none"
  });
  setTimeout(function() {
   e.remove();
  });
 } : pt;
 for (var Ht = function() {
  this.returnValue = !1;
 }, zt = function() {
  return this.originalEvent.preventDefault();
 }, qt = function() {
  this.cancelBubble = !0;
 }, Vt = function() {
  return this.originalEvent.stopPropagation();
 }, Wt = function(e) {
  var t = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, n = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft;
  return {
   x: e.clientX + n,
   y: e.clientY + t
  };
 }, Qt = function() {
  return k.doc.addEventListener ? function(e, t, n, r) {
   var i = function(e) {
    var t = Wt(e);
    return n.call(r, e, t.x, t.y);
   };
   if (e.addEventListener(t, i, !1), I && O[t]) {
    var a = function(t) {
     for (var i = Wt(t), a = t, o = 0, s = t.targetTouches && t.targetTouches.length; s > o; o++) if (t.targetTouches[o].target == e) {
      t = t.targetTouches[o], t.originalEvent = a, t.preventDefault = zt, t.stopPropagation = Vt;
      break;
     }
     return n.call(r, t, i.x, i.y);
    };
    e.addEventListener(O[t], a, !1);
   }
   return function() {
    return e.removeEventListener(t, i, !1), I && O[t] && e.removeEventListener(O[t], i, !1), 
    !0;
   };
  } : k.doc.attachEvent ? function(e, t, n, r) {
   var i = function(e) {
    e = e || k.win.event;
    var t = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, i = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft, a = e.clientX + i, o = e.clientY + t;
    return e.preventDefault = e.preventDefault || Ht, e.stopPropagation = e.stopPropagation || qt, 
    n.call(r, e, a, o);
   };
   e.attachEvent("on" + t, i);
   var a = function() {
    return e.detachEvent("on" + t, i), !0;
   };
   return a;
  } : void 0;
 }(), Xt = [], Kt = function(e) {
  for (var n, r = e.clientX, i = e.clientY, a = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, o = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft, s = Xt.length; s--; ) {
   if (n = Xt[s], I && e.touches) {
    for (var l, c = e.touches.length; c--; ) if (l = e.touches[c], l.identifier == n.el._drag.id) {
     r = l.clientX, i = l.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
     break;
    }
   } else e.preventDefault();
   var u, d = n.el.node, p = d.nextSibling, h = d.parentNode, f = d.style.display;
   k.win.opera && h.removeChild(d), d.style.display = "none", u = n.el.paper.getElementByPoint(r, i), 
   d.style.display = f, k.win.opera && (p ? h.insertBefore(d, p) : h.appendChild(d)), 
   u && t("raphael.drag.over." + n.el.id, n.el, u), r += o, i += a, t("raphael.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e);
  }
 }, Yt = function(e) {
  n.unmousemove(Kt).unmouseup(Yt);
  for (var r, i = Xt.length; i--; ) r = Xt[i], r.el._drag = {}, t("raphael.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, e);
  Xt = [];
 }, Jt = n.el = {}, Zt = F.length; Zt--; ) !function(e) {
  n[e] = Jt[e] = function(t, r) {
   return n.is(t, "function") && (this.events = this.events || [], this.events.push({
    name: e,
    f: t,
    unbind: Qt(this.shape || this.node || k.doc, e, t, r || this)
   })), this;
  }, n["un" + e] = Jt["un" + e] = function(t) {
   for (var r = this.events || [], i = r.length; i--; ) r[i].name != e || !n.is(t, "undefined") && r[i].f != t || (r[i].unbind(), 
   r.splice(i, 1), !r.length && delete this.events);
   return this;
  };
 }(F[Zt]);
 Jt.data = function(e, r) {
  var i = ut[this.id] = ut[this.id] || {};
  if (0 == arguments.length) return i;
  if (1 == arguments.length) {
   if (n.is(e, "object")) {
    for (var a in e) e[E](a) && this.data(a, e[a]);
    return this;
   }
   return t("raphael.data.get." + this.id, this, i[e], e), i[e];
  }
  return i[e] = r, t("raphael.data.set." + this.id, this, r, e), this;
 }, Jt.removeData = function(e) {
  return null == e ? ut[this.id] = {} : ut[this.id] && delete ut[this.id][e], this;
 }, Jt.getData = function() {
  return r(ut[this.id] || {});
 }, Jt.hover = function(e, t, n, r) {
  return this.mouseover(e, n).mouseout(t, r || n);
 }, Jt.unhover = function(e, t) {
  return this.unmouseover(e).unmouseout(t);
 };
 var en = [];
 Jt.drag = function(e, r, i, a, o, s) {
  function l(l) {
   (l.originalEvent || l).preventDefault();
   var c = l.clientX, u = l.clientY, d = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, p = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft;
   if (this._drag.id = l.identifier, I && l.touches) for (var h, f = l.touches.length; f--; ) if (h = l.touches[f], 
   this._drag.id = h.identifier, h.identifier == this._drag.id) {
    c = h.clientX, u = h.clientY;
    break;
   }
   this._drag.x = c + p, this._drag.y = u + d, !Xt.length && n.mousemove(Kt).mouseup(Yt), 
   Xt.push({
    el: this,
    move_scope: a,
    start_scope: o,
    end_scope: s
   }), r && t.on("raphael.drag.start." + this.id, r), e && t.on("raphael.drag.move." + this.id, e), 
   i && t.on("raphael.drag.end." + this.id, i), t("raphael.drag.start." + this.id, o || a || this, l.clientX + p, l.clientY + d, l);
  }
  return this._drag = {}, en.push({
   el: this,
   start: l
  }), this.mousedown(l), this;
 }, Jt.onDragOver = function(e) {
  e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id);
 }, Jt.undrag = function() {
  for (var e = en.length; e--; ) en[e].el == this && (this.unmousedown(en[e].start), 
  en.splice(e, 1), t.unbind("raphael.drag.*." + this.id));
  !en.length && n.unmousemove(Kt).unmouseup(Yt), Xt = [];
 }, w.circle = function(e, t, r) {
  var i = n._engine.circle(this, e || 0, t || 0, r || 0);
  return this.__set__ && this.__set__.push(i), i;
 }, w.rect = function(e, t, r, i, a) {
  var o = n._engine.rect(this, e || 0, t || 0, r || 0, i || 0, a || 0);
  return this.__set__ && this.__set__.push(o), o;
 }, w.ellipse = function(e, t, r, i) {
  var a = n._engine.ellipse(this, e || 0, t || 0, r || 0, i || 0);
  return this.__set__ && this.__set__.push(a), a;
 }, w.path = function(e) {
  e && !n.is(e, V) && !n.is(e[0], W) && (e += A);
  var t = n._engine.path(n.format[D](n, arguments), this);
  return this.__set__ && this.__set__.push(t), t;
 }, w.image = function(e, t, r, i, a) {
  var o = n._engine.image(this, e || "about:blank", t || 0, r || 0, i || 0, a || 0);
  return this.__set__ && this.__set__.push(o), o;
 }, w.text = function(e, t, r) {
  var i = n._engine.text(this, e || 0, t || 0, R(r));
  return this.__set__ && this.__set__.push(i), i;
 }, w.set = function(e) {
  !n.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
  var t = new hn(e);
  return this.__set__ && this.__set__.push(t), t.paper = this, t.type = "set", t;
 }, w.setStart = function(e) {
  this.__set__ = e || this.set();
 }, w.setFinish = function() {
  var e = this.__set__;
  return delete this.__set__, e;
 }, w.setSize = function(e, t) {
  return n._engine.setSize.call(this, e, t);
 }, w.setViewBox = function(e, t, r, i, a) {
  return n._engine.setViewBox.call(this, e, t, r, i, a);
 }, w.top = w.bottom = null, w.raphael = n;
 var tn = function(e) {
  var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, a = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0, s = t.top + (k.win.pageYOffset || i.scrollTop || r.scrollTop) - a, l = t.left + (k.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
  return {
   y: s,
   x: l
  };
 };
 w.getElementByPoint = function(e, t) {
  var n = this, r = n.canvas, i = k.doc.elementFromPoint(e, t);
  if (k.win.opera && "svg" == i.tagName) {
   var a = tn(r), o = r.createSVGRect();
   o.x = e - a.x, o.y = t - a.y, o.width = o.height = 1;
   var s = r.getIntersectionList(o, null);
   s.length && (i = s[s.length - 1]);
  }
  if (!i) return null;
  for (;i.parentNode && i != r.parentNode && !i.raphael; ) i = i.parentNode;
  return i == n.canvas.parentNode && (i = r), i = i && i.raphael ? n.getById(i.raphaelid) : null;
 }, w.getElementsByBBox = function(e) {
  var t = this.set();
  return this.forEach(function(r) {
   n.isBBoxIntersect(r.getBBox(), e) && t.push(r);
  }), t;
 }, w.getById = function(e) {
  for (var t = this.bottom; t; ) {
   if (t.id == e) return t;
   t = t.next;
  }
  return null;
 }, w.forEach = function(e, t) {
  for (var n = this.bottom; n; ) {
   if (e.call(t, n) === !1) return this;
   n = n.next;
  }
  return this;
 }, w.getElementsByPoint = function(e, t) {
  var n = this.set();
  return this.forEach(function(r) {
   r.isPointInside(e, t) && n.push(r);
  }), n;
 }, Jt.isPointInside = function(e, t) {
  var r = this.realPath = gt[this.type](this);
  return this.attr("transform") && this.attr("transform").length && (r = n.transformPath(r, this.attr("transform"))), 
  n.isPointInsidePath(r, e, t);
 }, Jt.getBBox = function(e) {
  if (this.removed) return {};
  var t = this._;
  return e ? ((t.dirty || !t.bboxwt) && (this.realPath = gt[this.type](this), t.bboxwt = Tt(this.realPath), 
  t.bboxwt.toString = m, t.dirty = 0), t.bboxwt) : ((t.dirty || t.dirtyT || !t.bbox) && ((t.dirty || !this.realPath) && (t.bboxwt = 0, 
  this.realPath = gt[this.type](this)), t.bbox = Tt(bt(this.realPath, this.matrix)), 
  t.bbox.toString = m, t.dirty = t.dirtyT = 0), t.bbox);
 }, Jt.clone = function() {
  if (this.removed) return null;
  var e = this.paper[this.type]().attr(this.attr());
  return this.__set__ && this.__set__.push(e), e;
 }, Jt.glow = function(e) {
  if ("text" == this.type) return null;
  e = e || {};
  var t = {
   width: (e.width || 10) + (+this.attr("stroke-width") || 1),
   fill: e.fill || !1,
   opacity: e.opacity || .5,
   offsetx: e.offsetx || 0,
   offsety: e.offsety || 0,
   color: e.color || "#000"
  }, n = t.width / 2, r = this.paper, i = r.set(), a = this.realPath || gt[this.type](this);
  a = this.matrix ? bt(a, this.matrix) : a;
  for (var o = 1; n + 1 > o; o++) i.push(r.path(a).attr({
   stroke: t.color,
   fill: t.fill ? t.color : "none",
   "stroke-linejoin": "round",
   "stroke-linecap": "round",
   "stroke-width": +(t.width / n * o).toFixed(3),
   opacity: +(t.opacity / n).toFixed(3)
  }));
  return i.insertBefore(this).translate(t.offsetx, t.offsety);
 };
 var nn = function(e, t, r, i, a, o, s, l, d) {
  return null == d ? c(e, t, r, i, a, o, s, l) : n.findDotsAtSegment(e, t, r, i, a, o, s, l, u(e, t, r, i, a, o, s, l, d));
 }, rn = function(e, t) {
  return function(r, i, a) {
   r = Ft(r);
   for (var o, s, l, c, u, d = "", p = {}, h = 0, f = 0, m = r.length; m > f; f++) {
    if (l = r[f], "M" == l[0]) o = +l[1], s = +l[2]; else {
     if (c = nn(o, s, l[1], l[2], l[3], l[4], l[5], l[6]), h + c > i) {
      if (t && !p.start) {
       if (u = nn(o, s, l[1], l[2], l[3], l[4], l[5], l[6], i - h), d += [ "C" + u.start.x, u.start.y, u.m.x, u.m.y, u.x, u.y ], 
       a) return d;
       p.start = d, d = [ "M" + u.x, u.y + "C" + u.n.x, u.n.y, u.end.x, u.end.y, l[5], l[6] ].join(), 
       h += c, o = +l[5], s = +l[6];
       continue;
      }
      if (!e && !t) return u = nn(o, s, l[1], l[2], l[3], l[4], l[5], l[6], i - h), {
       x: u.x,
       y: u.y,
       alpha: u.alpha
      };
     }
     h += c, o = +l[5], s = +l[6];
    }
    d += l.shift() + l;
   }
   return p.end = d, u = e ? h : t ? p : n.findDotsAtSegment(o, s, l[0], l[1], l[2], l[3], l[4], l[5], 1), 
   u.alpha && (u = {
    x: u.x,
    y: u.y,
    alpha: u.alpha
   }), u;
  };
 }, an = rn(1), on = rn(), sn = rn(0, 1);
 n.getTotalLength = an, n.getPointAtLength = on, n.getSubpath = function(e, t, n) {
  if (this.getTotalLength(e) - n < 1e-6) return sn(e, t).end;
  var r = sn(e, n, 1);
  return t ? sn(r, t).end : r;
 }, Jt.getTotalLength = function() {
  var e = this.getPath();
  if (e) return this.node.getTotalLength ? this.node.getTotalLength() : an(e);
 }, Jt.getPointAtLength = function(e) {
  var t = this.getPath();
  if (t) return on(t, e);
 }, Jt.getPath = function() {
  var e, t = n._getPath[this.type];
  if ("text" != this.type && "set" != this.type) return t && (e = t(this)), e;
 }, Jt.getSubpath = function(e, t) {
  var r = this.getPath();
  if (r) return n.getSubpath(r, e, t);
 };
 var ln = n.easing_formulas = {
  linear: function(e) {
   return e;
  },
  "<": function(e) {
   return H(e, 1.7);
  },
  ">": function(e) {
   return H(e, .48);
  },
  "<>": function(e) {
   var t = .48 - e / 1.04, n = $.sqrt(.1734 + t * t), r = n - t, i = H(U(r), 1 / 3) * (0 > r ? -1 : 1), a = -n - t, o = H(U(a), 1 / 3) * (0 > a ? -1 : 1), s = i + o + .5;
   return 3 * (1 - s) * s * s + s * s * s;
  },
  backIn: function(e) {
   var t = 1.70158;
   return e * e * ((t + 1) * e - t);
  },
  backOut: function(e) {
   e -= 1;
   var t = 1.70158;
   return e * e * ((t + 1) * e + t) + 1;
  },
  elastic: function(e) {
   return e == !!e ? e : H(2, -10 * e) * $.sin(2 * (e - .075) * z / .3) + 1;
  },
  bounce: function(e) {
   var t, n = 7.5625, r = 2.75;
   return 1 / r > e ? t = n * e * e : 2 / r > e ? (e -= 1.5 / r, t = n * e * e + .75) : 2.5 / r > e ? (e -= 2.25 / r, 
   t = n * e * e + .9375) : (e -= 2.625 / r, t = n * e * e + .984375), t;
  }
 };
 ln.easeIn = ln["ease-in"] = ln["<"], ln.easeOut = ln["ease-out"] = ln[">"], ln.easeInOut = ln["ease-in-out"] = ln["<>"], 
 ln["back-in"] = ln.backIn, ln["back-out"] = ln.backOut;
 var cn = [], un = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
  setTimeout(e, 16);
 }, dn = function() {
  for (var e = +new Date(), r = 0; r < cn.length; r++) {
   var i = cn[r];
   if (!i.el.removed && !i.paused) {
    var a, o, s = e - i.start, l = i.ms, c = i.easing, u = i.from, d = i.diff, p = i.to, h = (i.t, 
    i.el), f = {}, m = {};
    if (i.initstatus ? (s = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * l, 
    i.status = i.initstatus, delete i.initstatus, i.stop && cn.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (s / l)) / i.anim.top, 
    !(0 > s)) if (l > s) {
     var g = c(s / l);
     for (var b in u) if (u[E](b)) {
      switch (rt[b]) {
      case q:
       a = +u[b] + g * l * d[b];
       break;

      case "colour":
       a = "rgb(" + [ pn(J(u[b].r + g * l * d[b].r)), pn(J(u[b].g + g * l * d[b].g)), pn(J(u[b].b + g * l * d[b].b)) ].join(",") + ")";
       break;

      case "path":
       a = [];
       for (var y = 0, x = u[b].length; x > y; y++) {
        a[y] = [ u[b][y][0] ];
        for (var w = 1, S = u[b][y].length; S > w; w++) a[y][w] = +u[b][y][w] + g * l * d[b][y][w];
        a[y] = a[y].join(L);
       }
       a = a.join(L);
       break;

      case "transform":
       if (d[b].real) for (a = [], y = 0, x = u[b].length; x > y; y++) for (a[y] = [ u[b][y][0] ], 
       w = 1, S = u[b][y].length; S > w; w++) a[y][w] = u[b][y][w] + g * l * d[b][y][w]; else {
        var C = function(e) {
         return +u[b][e] + g * l * d[b][e];
        };
        a = [ [ "m", C(0), C(1), C(2), C(3), C(4), C(5) ] ];
       }
       break;

      case "csv":
       if ("clip-rect" == b) for (a = [], y = 4; y--; ) a[y] = +u[b][y] + g * l * d[b][y];
       break;

      default:
       var _ = [][M](u[b]);
       for (a = [], y = h.paper.customAttributes[b].length; y--; ) a[y] = +_[y] + g * l * d[b][y];
      }
      f[b] = a;
     }
     h.attr(f), function(e, n, r) {
      setTimeout(function() {
       t("raphael.anim.frame." + e, n, r);
      });
     }(h.id, h, i.anim);
    } else {
     if (function(e, r, i) {
      setTimeout(function() {
       t("raphael.anim.frame." + r.id, r, i), t("raphael.anim.finish." + r.id, r, i), n.is(e, "function") && e.call(r);
      });
     }(i.callback, h, i.anim), h.attr(p), cn.splice(r--, 1), i.repeat > 1 && !i.next) {
      for (o in p) p[E](o) && (m[o] = i.totalOrigin[o]);
      i.el.attr(m), v(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1);
     }
     i.next && !i.stop && v(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat);
    }
   }
  }
  n.svg && h && h.paper && h.paper.safari(), cn.length && un(dn);
 }, pn = function(e) {
  return e > 255 ? 255 : 0 > e ? 0 : e;
 };
 Jt.animateWith = function(e, t, r, i, a, o) {
  var s = this;
  if (s.removed) return o && o.call(s), s;
  var l = r instanceof b ? r : n.animation(r, i, a, o);
  v(l, s, l.percents[0], null, s.attr());
  for (var c = 0, u = cn.length; u > c; c++) if (cn[c].anim == t && cn[c].el == e) {
   cn[u - 1].start = cn[c].start;
   break;
  }
  return s;
 }, Jt.onAnimation = function(e) {
  return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), 
  this;
 }, b.prototype.delay = function(e) {
  var t = new b(this.anim, this.ms);
  return t.times = this.times, t.del = +e || 0, t;
 }, b.prototype.repeat = function(e) {
  var t = new b(this.anim, this.ms);
  return t.del = this.del, t.times = $.floor(G(e, 0)) || 1, t;
 }, n.animation = function(e, t, r, i) {
  if (e instanceof b) return e;
  (n.is(r, "function") || !r) && (i = i || r || null, r = null), e = Object(e), t = +t || 0;
  var a, o, s = {};
  for (o in e) e[E](o) && Z(o) != o && Z(o) + "%" != o && (a = !0, s[o] = e[o]);
  return a ? (r && (s.easing = r), i && (s.callback = i), new b({
   100: s
  }, t)) : new b(e, t);
 }, Jt.animate = function(e, t, r, i) {
  var a = this;
  if (a.removed) return i && i.call(a), a;
  var o = e instanceof b ? e : n.animation(e, t, r, i);
  return v(o, a, o.percents[0], null, a.attr()), a;
 }, Jt.setTime = function(e, t) {
  return e && null != t && this.status(e, j(t, e.ms) / e.ms), this;
 }, Jt.status = function(e, t) {
  var n, r, i = [], a = 0;
  if (null != t) return v(e, this, -1, j(t, 1)), this;
  for (n = cn.length; n > a; a++) if (r = cn[a], r.el.id == this.id && (!e || r.anim == e)) {
   if (e) return r.status;
   i.push({
    anim: r.anim,
    status: r.status
   });
  }
  return e ? 0 : i;
 }, Jt.pause = function(e) {
  for (var n = 0; n < cn.length; n++) cn[n].el.id != this.id || e && cn[n].anim != e || t("raphael.anim.pause." + this.id, this, cn[n].anim) !== !1 && (cn[n].paused = !0);
  return this;
 }, Jt.resume = function(e) {
  for (var n = 0; n < cn.length; n++) if (cn[n].el.id == this.id && (!e || cn[n].anim == e)) {
   var r = cn[n];
   t("raphael.anim.resume." + this.id, this, r.anim) !== !1 && (delete r.paused, this.status(r.anim, r.status));
  }
  return this;
 }, Jt.stop = function(e) {
  for (var n = 0; n < cn.length; n++) cn[n].el.id != this.id || e && cn[n].anim != e || t("raphael.anim.stop." + this.id, this, cn[n].anim) !== !1 && cn.splice(n--, 1);
  return this;
 }, t.on("raphael.remove", y), t.on("raphael.clear", y), Jt.toString = function() {
  return "Raphaël’s object";
 };
 var hn = function(e) {
  if (this.items = [], this.length = 0, this.type = "set", e) for (var t = 0, n = e.length; n > t; t++) !e[t] || e[t].constructor != Jt.constructor && e[t].constructor != hn || (this[this.items.length] = this.items[this.items.length] = e[t], 
  this.length++);
 }, fn = hn.prototype;
 fn.push = function() {
  for (var e, t, n = 0, r = arguments.length; r > n; n++) e = arguments[n], !e || e.constructor != Jt.constructor && e.constructor != hn || (t = this.items.length, 
  this[t] = this.items[t] = e, this.length++);
  return this;
 }, fn.pop = function() {
  return this.length && delete this[this.length--], this.items.pop();
 }, fn.forEach = function(e, t) {
  for (var n = 0, r = this.items.length; r > n; n++) if (e.call(t, this.items[n], n) === !1) return this;
  return this;
 };
 for (var mn in Jt) Jt[E](mn) && (fn[mn] = function(e) {
  return function() {
   var t = arguments;
   return this.forEach(function(n) {
    n[e][D](n, t);
   });
  };
 }(mn));
 return fn.attr = function(e, t) {
  if (e && n.is(e, W) && n.is(e[0], "object")) for (var r = 0, i = e.length; i > r; r++) this.items[r].attr(e[r]); else for (var a = 0, o = this.items.length; o > a; a++) this.items[a].attr(e, t);
  return this;
 }, fn.clear = function() {
  for (;this.length; ) this.pop();
 }, fn.splice = function(e, t) {
  e = 0 > e ? G(this.length + e, 0) : e, t = G(0, j(this.length - e, t));
  var n, r = [], i = [], a = [];
  for (n = 2; n < arguments.length; n++) a.push(arguments[n]);
  for (n = 0; t > n; n++) i.push(this[e + n]);
  for (;n < this.length - e; n++) r.push(this[e + n]);
  var o = a.length;
  for (n = 0; n < o + r.length; n++) this.items[e + n] = this[e + n] = o > n ? a[n] : r[n - o];
  for (n = this.items.length = this.length -= t - o; this[n]; ) delete this[n++];
  return new hn(i);
 }, fn.exclude = function(e) {
  for (var t = 0, n = this.length; n > t; t++) if (this[t] == e) return this.splice(t, 1), 
  !0;
 }, fn.animate = function(e, t, r, i) {
  (n.is(r, "function") || !r) && (i = r || null);
  var a, o, s = this.items.length, l = s, c = this;
  if (!s) return this;
  i && (o = function() {
   !--s && i.call(c);
  }), r = n.is(r, V) ? r : o;
  var u = n.animation(e, t, r, o);
  for (a = this.items[--l].animate(u); l--; ) this.items[l] && !this.items[l].removed && this.items[l].animateWith(a, u, u), 
  this.items[l] && !this.items[l].removed || s--;
  return this;
 }, fn.insertAfter = function(e) {
  for (var t = this.items.length; t--; ) this.items[t].insertAfter(e);
  return this;
 }, fn.getBBox = function() {
  for (var e = [], t = [], n = [], r = [], i = this.items.length; i--; ) if (!this.items[i].removed) {
   var a = this.items[i].getBBox();
   e.push(a.x), t.push(a.y), n.push(a.x + a.width), r.push(a.y + a.height);
  }
  return e = j[D](0, e), t = j[D](0, t), n = G[D](0, n), r = G[D](0, r), {
   x: e,
   y: t,
   x2: n,
   y2: r,
   width: n - e,
   height: r - t
  };
 }, fn.clone = function(e) {
  e = this.paper.set();
  for (var t = 0, n = this.items.length; n > t; t++) e.push(this.items[t].clone());
  return e;
 }, fn.toString = function() {
  return "Raphaël‘s set";
 }, fn.glow = function(e) {
  var t = this.paper.set();
  return this.forEach(function(n) {
   var r = n.glow(e);
   null != r && r.forEach(function(e) {
    t.push(e);
   });
  }), t;
 }, fn.isPointInside = function(e, t) {
  var n = !1;
  return this.forEach(function(r) {
   return r.isPointInside(e, t) ? (console.log("runned"), n = !0, !1) : void 0;
  }), n;
 }, n.registerFont = function(e) {
  if (!e.face) return e;
  this.fonts = this.fonts || {};
  var t = {
   w: e.w,
   face: {},
   glyphs: {}
  }, n = e.face["font-family"];
  for (var r in e.face) e.face[E](r) && (t.face[r] = e.face[r]);
  if (this.fonts[n] ? this.fonts[n].push(t) : this.fonts[n] = [ t ], !e.svg) {
   t.face["units-per-em"] = et(e.face["units-per-em"], 10);
   for (var i in e.glyphs) if (e.glyphs[E](i)) {
    var a = e.glyphs[i];
    if (t.glyphs[i] = {
     w: a.w,
     k: {},
     d: a.d && "M" + a.d.replace(/[mlcxtrv]/g, function(e) {
      return {
       l: "L",
       c: "C",
       x: "z",
       t: "m",
       r: "l",
       v: "c"
      }[e] || "M";
     }) + "z"
    }, a.k) for (var o in a.k) a[E](o) && (t.glyphs[i].k[o] = a.k[o]);
   }
  }
  return e;
 }, w.getFont = function(e, t, r, i) {
  if (i = i || "normal", r = r || "normal", t = +t || {
   normal: 400,
   bold: 700,
   lighter: 300,
   bolder: 800
  }[t] || 400, n.fonts) {
   var a = n.fonts[e];
   if (!a) {
    var o = new RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, A) + "(\\s|$)", "i");
    for (var s in n.fonts) if (n.fonts[E](s) && o.test(s)) {
     a = n.fonts[s];
     break;
    }
   }
   var l;
   if (a) for (var c = 0, u = a.length; u > c && (l = a[c], l.face["font-weight"] != t || l.face["font-style"] != r && l.face["font-style"] || l.face["font-stretch"] != i); c++) ;
   return l;
  }
 }, w.print = function(e, t, r, i, a, o, s, l) {
  o = o || "middle", s = G(j(s || 0, 1), -1), l = G(j(l || 1, 3), 1);
  var c, u = R(r)[P](A), d = 0, p = 0, h = A;
  if (n.is(i, "string") && (i = this.getFont(i)), i) {
   c = (a || 16) / i.face["units-per-em"];
   for (var f = i.face.bbox[P](S), m = +f[0], g = f[3] - f[1], b = 0, v = +f[1] + ("baseline" == o ? g + +i.face.descent : g / 2), y = 0, x = u.length; x > y; y++) {
    if ("\n" == u[y]) d = 0, C = 0, p = 0, b += g * l; else {
     var w = p && i.glyphs[u[y - 1]] || {}, C = i.glyphs[u[y]];
     d += p ? (w.w || i.w) + (w.k && w.k[u[y]] || 0) + i.w * s : 0, p = 1;
    }
    C && C.d && (h += n.transformPath(C.d, [ "t", d * c, b * c, "s", c, c, m, v, "t", (e - m) / c, (t - v) / c ]));
   }
  }
  return this.path(h).attr({
   fill: "#000",
   stroke: "none"
  });
 }, w.add = function(e) {
  if (n.is(e, "array")) for (var t, r = this.set(), i = 0, a = e.length; a > i; i++) t = e[i] || {}, 
  C[E](t.type) && r.push(this[t.type]().attr(t));
  return r;
 }, n.format = function(e, t) {
  var r = n.is(t, W) ? [ 0 ][M](t) : arguments;
  return e && n.is(e, V) && r.length - 1 && (e = e.replace(_, function(e, t) {
   return null == r[++t] ? A : r[t];
  })), e || A;
 }, n.fullfill = function() {
  var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function(e, n, r) {
   var i = r;
   return n.replace(t, function(e, t, n, r, a) {
    t = t || r, i && (t in i && (i = i[t]), "function" == typeof i && a && (i = i()));
   }), i = (null == i || i == r ? e : i) + "";
  };
  return function(t, r) {
   return String(t).replace(e, function(e, t) {
    return n(e, t, r);
   });
  };
 }(), n.ninja = function() {
  return T.was ? k.win.Raphael = T.is : delete Raphael, n;
 }, n.st = fn, function(e, t, r) {
  function i() {
   /in/.test(e.readyState) ? setTimeout(i, 9) : n.eve("raphael.DOMload");
  }
  null == e.readyState && e.addEventListener && (e.addEventListener(t, r = function() {
   e.removeEventListener(t, r, !1), e.readyState = "complete";
  }, !1), e.readyState = "loading"), i();
 }(document, "DOMContentLoaded"), t.on("raphael.DOMload", function() {
  x = !0;
 }), function() {
  if (n.svg) {
   var e = "hasOwnProperty", t = String, r = parseFloat, i = parseInt, a = Math, o = a.max, s = a.abs, l = a.pow, c = /[, ]+/, u = n.eve, d = "", p = " ", h = "http://www.w3.org/1999/xlink", f = {
    block: "M5,0 0,2.5 5,5z",
    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
    open: "M6,1 1,3.5 6,6",
    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
   }, m = {};
   n.toString = function() {
    return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
   };
   var g = function(r, i) {
    if (i) {
     "string" == typeof r && (r = g(r));
     for (var a in i) i[e](a) && ("xlink:" == a.substring(0, 6) ? r.setAttributeNS(h, a.substring(6), t(i[a])) : r.setAttribute(a, t(i[a])));
    } else r = n._g.doc.createElementNS("http://www.w3.org/2000/svg", r), r.style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
    return r;
   }, b = function(e, i) {
    var c = "linear", u = e.id + i, p = .5, h = .5, f = e.node, m = e.paper, b = f.style, v = n._g.doc.getElementById(u);
    if (!v) {
     if (i = t(i).replace(n._radial_gradient, function(e, t, n) {
      if (c = "radial", t && n) {
       p = r(t), h = r(n);
       var i = 2 * (h > .5) - 1;
       l(p - .5, 2) + l(h - .5, 2) > .25 && (h = a.sqrt(.25 - l(p - .5, 2)) * i + .5) && .5 != h && (h = h.toFixed(5) - 1e-5 * i);
      }
      return d;
     }), i = i.split(/\s*\-\s*/), "linear" == c) {
      var y = i.shift();
      if (y = -r(y), isNaN(y)) return null;
      var x = [ 0, 0, a.cos(n.rad(y)), a.sin(n.rad(y)) ], w = 1 / (o(s(x[2]), s(x[3])) || 1);
      x[2] *= w, x[3] *= w, x[2] < 0 && (x[0] = -x[2], x[2] = 0), x[3] < 0 && (x[1] = -x[3], 
      x[3] = 0);
     }
     var S = n._parseDots(i);
     if (!S) return null;
     if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && u != e.gradient.id && (m.defs.removeChild(e.gradient), 
     delete e.gradient), !e.gradient) {
      v = g(c + "Gradient", {
       id: u
      }), e.gradient = v, g(v, "radial" == c ? {
       fx: p,
       fy: h
      } : {
       x1: x[0],
       y1: x[1],
       x2: x[2],
       y2: x[3],
       gradientTransform: e.matrix.invert()
      }), m.defs.appendChild(v);
      for (var C = 0, _ = S.length; _ > C; C++) v.appendChild(g("stop", {
       offset: S[C].offset ? S[C].offset : C ? "100%" : "0%",
       "stop-color": S[C].color || "#fff"
      }));
     }
    }
    return g(f, {
     fill: "url(#" + u + ")",
     opacity: 1,
     "fill-opacity": 1
    }), b.fill = d, b.opacity = 1, b.fillOpacity = 1, 1;
   }, v = function(e) {
    var t = e.getBBox(1);
    g(e.pattern, {
     patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"
    });
   }, y = function(r, i, a) {
    if ("path" == r.type) {
     for (var o, s, l, c, u, p = t(i).toLowerCase().split("-"), h = r.paper, b = a ? "end" : "start", v = r.node, y = r.attrs, x = y["stroke-width"], w = p.length, S = "classic", C = 3, _ = 3, E = 5; w--; ) switch (p[w]) {
     case "block":
     case "classic":
     case "oval":
     case "diamond":
     case "open":
     case "none":
      S = p[w];
      break;

     case "wide":
      _ = 5;
      break;

     case "narrow":
      _ = 2;
      break;

     case "long":
      C = 5;
      break;

     case "short":
      C = 2;
     }
     if ("open" == S ? (C += 2, _ += 2, E += 2, l = 1, c = a ? 4 : 1, u = {
      fill: "none",
      stroke: y.stroke
     }) : (c = l = C / 2, u = {
      fill: y.stroke,
      stroke: "none"
     }), r._.arrows ? a ? (r._.arrows.endPath && m[r._.arrows.endPath]--, r._.arrows.endMarker && m[r._.arrows.endMarker]--) : (r._.arrows.startPath && m[r._.arrows.startPath]--, 
     r._.arrows.startMarker && m[r._.arrows.startMarker]--) : r._.arrows = {}, "none" != S) {
      var k = "raphael-marker-" + S, T = "raphael-marker-" + b + S + C + _;
      n._g.doc.getElementById(k) ? m[k]++ : (h.defs.appendChild(g(g("path"), {
       "stroke-linecap": "round",
       d: f[S],
       id: k
      })), m[k] = 1);
      var N, D = n._g.doc.getElementById(T);
      D ? (m[T]++, N = D.getElementsByTagName("use")[0]) : (D = g(g("marker"), {
       id: T,
       markerHeight: _,
       markerWidth: C,
       orient: "auto",
       refX: c,
       refY: _ / 2
      }), N = g(g("use"), {
       "xlink:href": "#" + k,
       transform: (a ? "rotate(180 " + C / 2 + " " + _ / 2 + ") " : d) + "scale(" + C / E + "," + _ / E + ")",
       "stroke-width": (1 / ((C / E + _ / E) / 2)).toFixed(4)
      }), D.appendChild(N), h.defs.appendChild(D), m[T] = 1), g(N, u);
      var M = l * ("diamond" != S && "oval" != S);
      a ? (o = r._.arrows.startdx * x || 0, s = n.getTotalLength(y.path) - M * x) : (o = M * x, 
      s = n.getTotalLength(y.path) - (r._.arrows.enddx * x || 0)), u = {}, u["marker-" + b] = "url(#" + T + ")", 
      (s || o) && (u.d = n.getSubpath(y.path, o, s)), g(v, u), r._.arrows[b + "Path"] = k, 
      r._.arrows[b + "Marker"] = T, r._.arrows[b + "dx"] = M, r._.arrows[b + "Type"] = S, 
      r._.arrows[b + "String"] = i;
     } else a ? (o = r._.arrows.startdx * x || 0, s = n.getTotalLength(y.path) - o) : (o = 0, 
     s = n.getTotalLength(y.path) - (r._.arrows.enddx * x || 0)), r._.arrows[b + "Path"] && g(v, {
      d: n.getSubpath(y.path, o, s)
     }), delete r._.arrows[b + "Path"], delete r._.arrows[b + "Marker"], delete r._.arrows[b + "dx"], 
     delete r._.arrows[b + "Type"], delete r._.arrows[b + "String"];
     for (u in m) if (m[e](u) && !m[u]) {
      var I = n._g.doc.getElementById(u);
      I && I.parentNode.removeChild(I);
     }
    }
   }, x = {
    "": [ 0 ],
    none: [ 0 ],
    "-": [ 3, 1 ],
    ".": [ 1, 1 ],
    "-.": [ 3, 1, 1, 1 ],
    "-..": [ 3, 1, 1, 1, 1, 1 ],
    ". ": [ 1, 3 ],
    "- ": [ 4, 3 ],
    "--": [ 8, 3 ],
    "- .": [ 4, 3, 1, 3 ],
    "--.": [ 8, 3, 1, 3 ],
    "--..": [ 8, 3, 1, 3, 1, 3 ]
   }, w = function(e, n, r) {
    if (n = x[t(n).toLowerCase()]) {
     for (var i = e.attrs["stroke-width"] || "1", a = {
      round: i,
      square: i,
      butt: 0
     }[e.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, o = [], s = n.length; s--; ) o[s] = n[s] * i + (s % 2 ? 1 : -1) * a;
     g(e.node, {
      "stroke-dasharray": o.join(",")
     });
    }
   }, S = function(r, a) {
    var l = r.node, u = r.attrs, p = l.style.visibility;
    l.style.visibility = "hidden";
    for (var f in a) if (a[e](f)) {
     if (!n._availableAttrs[e](f)) continue;
     var m = a[f];
     switch (u[f] = m, f) {
     case "blur":
      r.blur(m);
      break;

     case "href":
     case "title":
      var x = g("title"), S = n._g.doc.createTextNode(m);
      x.appendChild(S), l.appendChild(x);
      break;

     case "target":
      var C = l.parentNode;
      if ("a" != C.tagName.toLowerCase()) {
       var x = g("a");
       C.insertBefore(x, l), x.appendChild(l), C = x;
      }
      "target" == f ? C.setAttributeNS(h, "show", "blank" == m ? "new" : m) : C.setAttributeNS(h, f, m);
      break;

     case "cursor":
      l.style.cursor = m;
      break;

     case "transform":
      r.transform(m);
      break;

     case "arrow-start":
      y(r, m);
      break;

     case "arrow-end":
      y(r, m, 1);
      break;

     case "clip-rect":
      var E = t(m).split(c);
      if (4 == E.length) {
       r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
       var k = g("clipPath"), T = g("rect");
       k.id = n.createUUID(), g(T, {
        x: E[0],
        y: E[1],
        width: E[2],
        height: E[3]
       }), k.appendChild(T), r.paper.defs.appendChild(k), g(l, {
        "clip-path": "url(#" + k.id + ")"
       }), r.clip = T;
      }
      if (!m) {
       var N = l.getAttribute("clip-path");
       if (N) {
        var D = n._g.doc.getElementById(N.replace(/(^url\(#|\)$)/g, d));
        D && D.parentNode.removeChild(D), g(l, {
         "clip-path": d
        }), delete r.clip;
       }
      }
      break;

     case "path":
      "path" == r.type && (g(l, {
       d: m ? u.path = n._pathToAbsolute(m) : "M0,0"
      }), r._.dirty = 1, r._.arrows && ("startString" in r._.arrows && y(r, r._.arrows.startString), 
      "endString" in r._.arrows && y(r, r._.arrows.endString, 1)));
      break;

     case "width":
      if (l.setAttribute(f, m), r._.dirty = 1, !u.fx) break;
      f = "x", m = u.x;

     case "x":
      u.fx && (m = -u.x - (u.width || 0));

     case "rx":
      if ("rx" == f && "rect" == r.type) break;

     case "cx":
      l.setAttribute(f, m), r.pattern && v(r), r._.dirty = 1;
      break;

     case "height":
      if (l.setAttribute(f, m), r._.dirty = 1, !u.fy) break;
      f = "y", m = u.y;

     case "y":
      u.fy && (m = -u.y - (u.height || 0));

     case "ry":
      if ("ry" == f && "rect" == r.type) break;

     case "cy":
      l.setAttribute(f, m), r.pattern && v(r), r._.dirty = 1;
      break;

     case "r":
      "rect" == r.type ? g(l, {
       rx: m,
       ry: m
      }) : l.setAttribute(f, m), r._.dirty = 1;
      break;

     case "src":
      "image" == r.type && l.setAttributeNS(h, "href", m);
      break;

     case "stroke-width":
      (1 != r._.sx || 1 != r._.sy) && (m /= o(s(r._.sx), s(r._.sy)) || 1), r.paper._vbSize && (m *= r.paper._vbSize), 
      l.setAttribute(f, m), u["stroke-dasharray"] && w(r, u["stroke-dasharray"], a), r._.arrows && ("startString" in r._.arrows && y(r, r._.arrows.startString), 
      "endString" in r._.arrows && y(r, r._.arrows.endString, 1));
      break;

     case "stroke-dasharray":
      w(r, m, a);
      break;

     case "fill":
      var M = t(m).match(n._ISURL);
      if (M) {
       k = g("pattern");
       var I = g("image");
       k.id = n.createUUID(), g(k, {
        x: 0,
        y: 0,
        patternUnits: "userSpaceOnUse",
        height: 1,
        width: 1
       }), g(I, {
        x: 0,
        y: 0,
        "xlink:href": M[1]
       }), k.appendChild(I), function(e) {
        n._preload(M[1], function() {
         var t = this.offsetWidth, n = this.offsetHeight;
         g(e, {
          width: t,
          height: n
         }), g(I, {
          width: t,
          height: n
         }), r.paper.safari();
        });
       }(k), r.paper.defs.appendChild(k), g(l, {
        fill: "url(#" + k.id + ")"
       }), r.pattern = k, r.pattern && v(r);
       break;
      }
      var A = n.getRGB(m);
      if (A.error) {
       if (("circle" == r.type || "ellipse" == r.type || "r" != t(m).charAt()) && b(r, m)) {
        if ("opacity" in u || "fill-opacity" in u) {
         var L = n._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, d));
         if (L) {
          var R = L.getElementsByTagName("stop");
          g(R[R.length - 1], {
           "stop-opacity": ("opacity" in u ? u.opacity : 1) * ("fill-opacity" in u ? u["fill-opacity"] : 1)
          });
         }
        }
        u.gradient = m, u.fill = "none";
        break;
       }
      } else delete a.gradient, delete u.gradient, !n.is(u.opacity, "undefined") && n.is(a.opacity, "undefined") && g(l, {
       opacity: u.opacity
      }), !n.is(u["fill-opacity"], "undefined") && n.is(a["fill-opacity"], "undefined") && g(l, {
       "fill-opacity": u["fill-opacity"]
      });
      A[e]("opacity") && g(l, {
       "fill-opacity": A.opacity > 1 ? A.opacity / 100 : A.opacity
      });

     case "stroke":
      A = n.getRGB(m), l.setAttribute(f, A.hex), "stroke" == f && A[e]("opacity") && g(l, {
       "stroke-opacity": A.opacity > 1 ? A.opacity / 100 : A.opacity
      }), "stroke" == f && r._.arrows && ("startString" in r._.arrows && y(r, r._.arrows.startString), 
      "endString" in r._.arrows && y(r, r._.arrows.endString, 1));
      break;

     case "gradient":
      ("circle" == r.type || "ellipse" == r.type || "r" != t(m).charAt()) && b(r, m);
      break;

     case "opacity":
      u.gradient && !u[e]("stroke-opacity") && g(l, {
       "stroke-opacity": m > 1 ? m / 100 : m
      });

     case "fill-opacity":
      if (u.gradient) {
       L = n._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, d)), 
       L && (R = L.getElementsByTagName("stop"), g(R[R.length - 1], {
        "stop-opacity": m
       }));
       break;
      }

     default:
      "font-size" == f && (m = i(m, 10) + "px");
      var P = f.replace(/(\-.)/g, function(e) {
       return e.substring(1).toUpperCase();
      });
      l.style[P] = m, r._.dirty = 1, l.setAttribute(f, m);
     }
    }
    _(r, a), l.style.visibility = p;
   }, C = 1.2, _ = function(r, a) {
    if ("text" == r.type && (a[e]("text") || a[e]("font") || a[e]("font-size") || a[e]("x") || a[e]("y"))) {
     var o = r.attrs, s = r.node, l = s.firstChild ? i(n._g.doc.defaultView.getComputedStyle(s.firstChild, d).getPropertyValue("font-size"), 10) : 10;
     if (a[e]("text")) {
      for (o.text = a.text; s.firstChild; ) s.removeChild(s.firstChild);
      for (var c, u = t(a.text).split("\n"), p = [], h = 0, f = u.length; f > h; h++) c = g("tspan"), 
      h && g(c, {
       dy: l * C,
       x: o.x
      }), c.appendChild(n._g.doc.createTextNode(u[h])), s.appendChild(c), p[h] = c;
     } else for (p = s.getElementsByTagName("tspan"), h = 0, f = p.length; f > h; h++) h ? g(p[h], {
      dy: l * C,
      x: o.x
     }) : g(p[0], {
      dy: 0
     });
     g(s, {
      x: o.x,
      y: o.y
     }), r._.dirty = 1;
     var m = r._getBBox(), b = o.y - (m.y + m.height / 2);
     b && n.is(b, "finite") && g(p[0], {
      dy: b
     });
    }
   }, E = function(e, t) {
    this[0] = this.node = e, e.raphael = !0, this.id = n._oid++, e.raphaelid = this.id, 
    this.matrix = n.matrix(), this.realPath = null, this.paper = t, this.attrs = this.attrs || {}, 
    this._ = {
     transform: [],
     sx: 1,
     sy: 1,
     deg: 0,
     dx: 0,
     dy: 0,
     dirty: 1
    }, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), 
    t.top = this, this.next = null;
   }, k = n.el;
   E.prototype = k, k.constructor = E, n._engine.path = function(e, t) {
    var n = g("path");
    t.canvas && t.canvas.appendChild(n);
    var r = new E(n, t);
    return r.type = "path", S(r, {
     fill: "none",
     stroke: "#000",
     path: e
    }), r;
   }, k.rotate = function(e, n, i) {
    if (this.removed) return this;
    if (e = t(e).split(c), e.length - 1 && (n = r(e[1]), i = r(e[2])), e = r(e[0]), 
    null == i && (n = i), null == n || null == i) {
     var a = this.getBBox(1);
     n = a.x + a.width / 2, i = a.y + a.height / 2;
    }
    return this.transform(this._.transform.concat([ [ "r", e, n, i ] ])), this;
   }, k.scale = function(e, n, i, a) {
    if (this.removed) return this;
    if (e = t(e).split(c), e.length - 1 && (n = r(e[1]), i = r(e[2]), a = r(e[3])), 
    e = r(e[0]), null == n && (n = e), null == a && (i = a), null == i || null == a) var o = this.getBBox(1);
    return i = null == i ? o.x + o.width / 2 : i, a = null == a ? o.y + o.height / 2 : a, 
    this.transform(this._.transform.concat([ [ "s", e, n, i, a ] ])), this;
   }, k.translate = function(e, n) {
    return this.removed ? this : (e = t(e).split(c), e.length - 1 && (n = r(e[1])), 
    e = r(e[0]) || 0, n = +n || 0, this.transform(this._.transform.concat([ [ "t", e, n ] ])), 
    this);
   }, k.transform = function(t) {
    var r = this._;
    if (null == t) return r.transform;
    if (n._extractTransform(this, t), this.clip && g(this.clip, {
     transform: this.matrix.invert()
    }), this.pattern && v(this), this.node && g(this.node, {
     transform: this.matrix
    }), 1 != r.sx || 1 != r.sy) {
     var i = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
     this.attr({
      "stroke-width": i
     });
    }
    return this;
   }, k.hide = function() {
    return !this.removed && this.paper.safari(this.node.style.display = "none"), this;
   }, k.show = function() {
    return !this.removed && this.paper.safari(this.node.style.display = ""), this;
   }, k.remove = function() {
    if (!this.removed && this.node.parentNode) {
     var e = this.paper;
     e.__set__ && e.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), 
     n._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
     for (var t in this) this[t] = "function" == typeof this[t] ? n._removedFactory(t) : null;
     this.removed = !0;
    }
   }, k._getBBox = function() {
    if ("none" == this.node.style.display) {
     this.show();
     var e = !0;
    }
    var t = {};
    try {
     t = this.node.getBBox();
    } catch (n) {} finally {
     t = t || {};
    }
    return e && this.hide(), t;
   }, k.attr = function(t, r) {
    if (this.removed) return this;
    if (null == t) {
     var i = {};
     for (var a in this.attrs) this.attrs[e](a) && (i[a] = this.attrs[a]);
     return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, 
     i.transform = this._.transform, i;
    }
    if (null == r && n.is(t, "string")) {
     if ("fill" == t && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
     if ("transform" == t) return this._.transform;
     for (var o = t.split(c), s = {}, l = 0, d = o.length; d > l; l++) t = o[l], s[t] = t in this.attrs ? this.attrs[t] : n.is(this.paper.customAttributes[t], "function") ? this.paper.customAttributes[t].def : n._availableAttrs[t];
     return d - 1 ? s : s[o[0]];
    }
    if (null == r && n.is(t, "array")) {
     for (s = {}, l = 0, d = t.length; d > l; l++) s[t[l]] = this.attr(t[l]);
     return s;
    }
    if (null != r) {
     var p = {};
     p[t] = r;
    } else null != t && n.is(t, "object") && (p = t);
    for (var h in p) u("raphael.attr." + h + "." + this.id, this, p[h]);
    for (h in this.paper.customAttributes) if (this.paper.customAttributes[e](h) && p[e](h) && n.is(this.paper.customAttributes[h], "function")) {
     var f = this.paper.customAttributes[h].apply(this, [].concat(p[h]));
     this.attrs[h] = p[h];
     for (var m in f) f[e](m) && (p[m] = f[m]);
    }
    return S(this, p), this;
   }, k.toFront = function() {
    if (this.removed) return this;
    "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
    var e = this.paper;
    return e.top != this && n._tofront(this, e), this;
   }, k.toBack = function() {
    if (this.removed) return this;
    var e = this.node.parentNode;
    "a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), 
    n._toback(this, this.paper);
    this.paper;
    return this;
   }, k.insertAfter = function(e) {
    if (this.removed) return this;
    var t = e.node || e[e.length - 1].node;
    return t.nextSibling ? t.parentNode.insertBefore(this.node, t.nextSibling) : t.parentNode.appendChild(this.node), 
    n._insertafter(this, e, this.paper), this;
   }, k.insertBefore = function(e) {
    if (this.removed) return this;
    var t = e.node || e[0].node;
    return t.parentNode.insertBefore(this.node, t), n._insertbefore(this, e, this.paper), 
    this;
   }, k.blur = function(e) {
    var t = this;
    if (0 !== +e) {
     var r = g("filter"), i = g("feGaussianBlur");
     t.attrs.blur = e, r.id = n.createUUID(), g(i, {
      stdDeviation: +e || 1.5
     }), r.appendChild(i), t.paper.defs.appendChild(r), t._blur = r, g(t.node, {
      filter: "url(#" + r.id + ")"
     });
    } else t._blur && (t._blur.parentNode.removeChild(t._blur), delete t._blur, delete t.attrs.blur), 
    t.node.removeAttribute("filter");
    return t;
   }, n._engine.circle = function(e, t, n, r) {
    var i = g("circle");
    e.canvas && e.canvas.appendChild(i);
    var a = new E(i, e);
    return a.attrs = {
     cx: t,
     cy: n,
     r: r,
     fill: "none",
     stroke: "#000"
    }, a.type = "circle", g(i, a.attrs), a;
   }, n._engine.rect = function(e, t, n, r, i, a) {
    var o = g("rect");
    e.canvas && e.canvas.appendChild(o);
    var s = new E(o, e);
    return s.attrs = {
     x: t,
     y: n,
     width: r,
     height: i,
     r: a || 0,
     rx: a || 0,
     ry: a || 0,
     fill: "none",
     stroke: "#000"
    }, s.type = "rect", g(o, s.attrs), s;
   }, n._engine.ellipse = function(e, t, n, r, i) {
    var a = g("ellipse");
    e.canvas && e.canvas.appendChild(a);
    var o = new E(a, e);
    return o.attrs = {
     cx: t,
     cy: n,
     rx: r,
     ry: i,
     fill: "none",
     stroke: "#000"
    }, o.type = "ellipse", g(a, o.attrs), o;
   }, n._engine.image = function(e, t, n, r, i, a) {
    var o = g("image");
    g(o, {
     x: n,
     y: r,
     width: i,
     height: a,
     preserveAspectRatio: "none"
    }), o.setAttributeNS(h, "href", t), e.canvas && e.canvas.appendChild(o);
    var s = new E(o, e);
    return s.attrs = {
     x: n,
     y: r,
     width: i,
     height: a,
     src: t
    }, s.type = "image", s;
   }, n._engine.text = function(e, t, r, i) {
    var a = g("text");
    e.canvas && e.canvas.appendChild(a);
    var o = new E(a, e);
    return o.attrs = {
     x: t,
     y: r,
     "text-anchor": "middle",
     text: i,
     font: n._availableAttrs.font,
     stroke: "none",
     fill: "#000"
    }, o.type = "text", S(o, o.attrs), o;
   }, n._engine.setSize = function(e, t) {
    return this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), 
    this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), 
    this;
   }, n._engine.create = function() {
    var e = n._getContainer.apply(0, arguments), t = e && e.container, r = e.x, i = e.y, a = e.width, o = e.height;
    if (!t) throw new Error("SVG container not found.");
    var s, l = g("svg"), c = "overflow:hidden;";
    return r = r || 0, i = i || 0, a = a || 512, o = o || 342, g(l, {
     height: o,
     version: 1.1,
     width: a,
     xmlns: "http://www.w3.org/2000/svg"
    }), 1 == t ? (l.style.cssText = c + "position:absolute;left:" + r + "px;top:" + i + "px", 
    n._g.doc.body.appendChild(l), s = 1) : (l.style.cssText = c + "position:relative", 
    t.firstChild ? t.insertBefore(l, t.firstChild) : t.appendChild(l)), t = new n._Paper(), 
    t.width = a, t.height = o, t.canvas = l, t.clear(), t._left = t._top = 0, s && (t.renderfix = function() {}), 
    t.renderfix(), t;
   }, n._engine.setViewBox = function(e, t, n, r, i) {
    u("raphael.setViewBox", this, this._viewBox, [ e, t, n, r, i ]);
    var a, s, l = o(n / this.width, r / this.height), c = this.top, d = i ? "meet" : "xMinYMin";
    for (null == e ? (this._vbSize && (l = 1), delete this._vbSize, a = "0 0 " + this.width + p + this.height) : (this._vbSize = l, 
    a = e + p + t + p + n + p + r), g(this.canvas, {
     viewBox: a,
     preserveAspectRatio: d
    }); l && c; ) s = "stroke-width" in c.attrs ? c.attrs["stroke-width"] : 1, c.attr({
     "stroke-width": s
    }), c._.dirty = 1, c._.dirtyT = 1, c = c.prev;
    return this._viewBox = [ e, t, n, r, !!i ], this;
   }, n.prototype.renderfix = function() {
    var e, t = this.canvas, n = t.style;
    try {
     e = t.getScreenCTM() || t.createSVGMatrix();
    } catch (r) {
     e = t.createSVGMatrix();
    }
    var i = -e.e % 1, a = -e.f % 1;
    (i || a) && (i && (this._left = (this._left + i) % 1, n.left = this._left + "px"), 
    a && (this._top = (this._top + a) % 1, n.top = this._top + "px"));
   }, n.prototype.clear = function() {
    n.eve("raphael.clear", this);
    for (var e = this.canvas; e.firstChild; ) e.removeChild(e.firstChild);
    this.bottom = this.top = null, (this.desc = g("desc")).appendChild(n._g.doc.createTextNode("Created with Raphaël " + n.version)), 
    e.appendChild(this.desc), e.appendChild(this.defs = g("defs"));
   }, n.prototype.remove = function() {
    u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
    for (var e in this) this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
   };
   var T = n.st;
   for (var N in k) k[e](N) && !T[e](N) && (T[N] = function(e) {
    return function() {
     var t = arguments;
     return this.forEach(function(n) {
      n[e].apply(n, t);
     });
    };
   }(N));
  }
 }(), function() {
  if (n.vml) {
   var e = "hasOwnProperty", t = String, r = parseFloat, i = Math, a = i.round, o = i.max, s = i.min, l = i.abs, c = "fill", u = /[, ]+/, d = n.eve, p = " progid:DXImageTransform.Microsoft", h = " ", f = "", m = {
    M: "m",
    L: "l",
    C: "c",
    Z: "x",
    m: "t",
    l: "r",
    c: "v",
    z: "x"
   }, g = /([clmz]),?([^clmz]*)/gi, b = / progid:\S+Blur\([^\)]+\)/g, v = /-?[^,\s-]+/g, y = "position:absolute;left:0;top:0;width:1px;height:1px", x = 21600, w = {
    path: 1,
    rect: 1,
    image: 1
   }, S = {
    circle: 1,
    ellipse: 1
   }, C = function(e) {
    var r = /[ahqstv]/gi, i = n._pathToAbsolute;
    if (t(e).match(r) && (i = n._path2curve), r = /[clmz]/g, i == n._pathToAbsolute && !t(e).match(r)) {
     var o = t(e).replace(g, function(e, t, n) {
      var r = [], i = "m" == t.toLowerCase(), o = m[t];
      return n.replace(v, function(e) {
       i && 2 == r.length && (o += r + m["m" == t ? "l" : "L"], r = []), r.push(a(e * x));
      }), o + r;
     });
     return o;
    }
    var s, l, c = i(e);
    o = [];
    for (var u = 0, d = c.length; d > u; u++) {
     s = c[u], l = c[u][0].toLowerCase(), "z" == l && (l = "x");
     for (var p = 1, b = s.length; b > p; p++) l += a(s[p] * x) + (p != b - 1 ? "," : f);
     o.push(l);
    }
    return o.join(h);
   }, _ = function(e, t, r) {
    var i = n.matrix();
    return i.rotate(-e, .5, .5), {
     dx: i.x(t, r),
     dy: i.y(t, r)
    };
   }, E = function(e, t, n, r, i, a) {
    var o = e._, s = e.matrix, u = o.fillpos, d = e.node, p = d.style, f = 1, m = "", g = x / t, b = x / n;
    if (p.visibility = "hidden", t && n) {
     if (d.coordsize = l(g) + h + l(b), p.rotation = a * (0 > t * n ? -1 : 1), a) {
      var v = _(a, r, i);
      r = v.dx, i = v.dy;
     }
     if (0 > t && (m += "x"), 0 > n && (m += " y") && (f = -1), p.flip = m, d.coordorigin = r * -g + h + i * -b, 
     u || o.fillsize) {
      var y = d.getElementsByTagName(c);
      y = y && y[0], d.removeChild(y), u && (v = _(a, s.x(u[0], u[1]), s.y(u[0], u[1])), 
      y.position = v.dx * f + h + v.dy * f), o.fillsize && (y.size = o.fillsize[0] * l(t) + h + o.fillsize[1] * l(n)), 
      d.appendChild(y);
     }
     p.visibility = "visible";
    }
   };
   n.toString = function() {
    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
   };
   var k = function(e, n, r) {
    for (var i = t(n).toLowerCase().split("-"), a = r ? "end" : "start", o = i.length, s = "classic", l = "medium", c = "medium"; o--; ) switch (i[o]) {
    case "block":
    case "classic":
    case "oval":
    case "diamond":
    case "open":
    case "none":
     s = i[o];
     break;

    case "wide":
    case "narrow":
     c = i[o];
     break;

    case "long":
    case "short":
     l = i[o];
    }
    var u = e.node.getElementsByTagName("stroke")[0];
    u[a + "arrow"] = s, u[a + "arrowlength"] = l, u[a + "arrowwidth"] = c;
   }, T = function(i, l) {
    i.attrs = i.attrs || {};
    var d = i.node, p = i.attrs, m = d.style, g = w[i.type] && (l.x != p.x || l.y != p.y || l.width != p.width || l.height != p.height || l.cx != p.cx || l.cy != p.cy || l.rx != p.rx || l.ry != p.ry || l.r != p.r), b = S[i.type] && (p.cx != l.cx || p.cy != l.cy || p.r != l.r || p.rx != l.rx || p.ry != l.ry), v = i;
    for (var y in l) l[e](y) && (p[y] = l[y]);
    if (g && (p.path = n._getPath[i.type](i), i._.dirty = 1), l.href && (d.href = l.href), 
    l.title && (d.title = l.title), l.target && (d.target = l.target), l.cursor && (m.cursor = l.cursor), 
    "blur" in l && i.blur(l.blur), (l.path && "path" == i.type || g) && (d.path = C(~t(p.path).toLowerCase().indexOf("r") ? n._pathToAbsolute(p.path) : p.path), 
    "image" == i.type && (i._.fillpos = [ p.x, p.y ], i._.fillsize = [ p.width, p.height ], 
    E(i, 1, 1, 0, 0, 0))), "transform" in l && i.transform(l.transform), b) {
     var _ = +p.cx, T = +p.cy, D = +p.rx || +p.r || 0, M = +p.ry || +p.r || 0;
     d.path = n.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a((_ - D) * x), a((T - M) * x), a((_ + D) * x), a((T + M) * x), a(_ * x)), 
     i._.dirty = 1;
    }
    if ("clip-rect" in l) {
     var A = t(l["clip-rect"]).split(u);
     if (4 == A.length) {
      A[2] = +A[2] + +A[0], A[3] = +A[3] + +A[1];
      var L = d.clipRect || n._g.doc.createElement("div"), R = L.style;
      R.clip = n.format("rect({1}px {2}px {3}px {0}px)", A), d.clipRect || (R.position = "absolute", 
      R.top = 0, R.left = 0, R.width = i.paper.width + "px", R.height = i.paper.height + "px", 
      d.parentNode.insertBefore(L, d), L.appendChild(d), d.clipRect = L);
     }
     l["clip-rect"] || d.clipRect && (d.clipRect.style.clip = "auto");
    }
    if (i.textpath) {
     var P = i.textpath.style;
     l.font && (P.font = l.font), l["font-family"] && (P.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, f) + '"'), 
     l["font-size"] && (P.fontSize = l["font-size"]), l["font-weight"] && (P.fontWeight = l["font-weight"]), 
     l["font-style"] && (P.fontStyle = l["font-style"]);
    }
    if ("arrow-start" in l && k(v, l["arrow-start"]), "arrow-end" in l && k(v, l["arrow-end"], 1), 
    null != l.opacity || null != l["stroke-width"] || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
     var F = d.getElementsByTagName(c), O = !1;
     if (F = F && F[0], !F && (O = F = I(c)), "image" == i.type && l.src && (F.src = l.src), 
     l.fill && (F.on = !0), (null == F.on || "none" == l.fill || null === l.fill) && (F.on = !1), 
     F.on && l.fill) {
      var B = t(l.fill).match(n._ISURL);
      if (B) {
       F.parentNode == d && d.removeChild(F), F.rotate = !0, F.src = B[1], F.type = "tile";
       var $ = i.getBBox(1);
       F.position = $.x + h + $.y, i._.fillpos = [ $.x, $.y ], n._preload(B[1], function() {
        i._.fillsize = [ this.offsetWidth, this.offsetHeight ];
       });
      } else F.color = n.getRGB(l.fill).hex, F.src = f, F.type = "solid", n.getRGB(l.fill).error && (v.type in {
       circle: 1,
       ellipse: 1
      } || "r" != t(l.fill).charAt()) && N(v, l.fill, F) && (p.fill = "none", p.gradient = l.fill, 
      F.rotate = !1);
     }
     if ("fill-opacity" in l || "opacity" in l) {
      var G = ((+p["fill-opacity"] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+n.getRGB(l.fill).o + 1 || 2) - 1);
      G = s(o(G, 0), 1), F.opacity = G, F.src && (F.color = "none");
     }
     d.appendChild(F);
     var j = d.getElementsByTagName("stroke") && d.getElementsByTagName("stroke")[0], U = !1;
     !j && (U = j = I("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (j.on = !0), 
     ("none" == l.stroke || null === l.stroke || null == j.on || 0 == l.stroke || 0 == l["stroke-width"]) && (j.on = !1);
     var H = n.getRGB(l.stroke);
     j.on && l.stroke && (j.color = H.hex), G = ((+p["stroke-opacity"] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+H.o + 1 || 2) - 1);
     var z = .75 * (r(l["stroke-width"]) || 1);
     if (G = s(o(G, 0), 1), null == l["stroke-width"] && (z = p["stroke-width"]), l["stroke-width"] && (j.weight = z), 
     z && 1 > z && (G *= z) && (j.weight = 1), j.opacity = G, l["stroke-linejoin"] && (j.joinstyle = l["stroke-linejoin"] || "miter"), 
     j.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (j.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), 
     l["stroke-dasharray"]) {
      var q = {
       "-": "shortdash",
       ".": "shortdot",
       "-.": "shortdashdot",
       "-..": "shortdashdotdot",
       ". ": "dot",
       "- ": "dash",
       "--": "longdash",
       "- .": "dashdot",
       "--.": "longdashdot",
       "--..": "longdashdotdot"
      };
      j.dashstyle = q[e](l["stroke-dasharray"]) ? q[l["stroke-dasharray"]] : f;
     }
     U && d.appendChild(j);
    }
    if ("text" == v.type) {
     v.paper.canvas.style.display = f;
     var V = v.paper.span, W = 100, Q = p.font && p.font.match(/\d+(?:\.\d*)?(?=px)/);
     m = V.style, p.font && (m.font = p.font), p["font-family"] && (m.fontFamily = p["font-family"]), 
     p["font-weight"] && (m.fontWeight = p["font-weight"]), p["font-style"] && (m.fontStyle = p["font-style"]), 
     Q = r(p["font-size"] || Q && Q[0]) || 10, m.fontSize = Q * W + "px", v.textpath.string && (V.innerHTML = t(v.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
     var X = V.getBoundingClientRect();
     v.W = p.w = (X.right - X.left) / W, v.H = p.h = (X.bottom - X.top) / W, v.X = p.x, 
     v.Y = p.y + v.H / 2, ("x" in l || "y" in l) && (v.path.v = n.format("m{0},{1}l{2},{1}", a(p.x * x), a(p.y * x), a(p.x * x) + 1));
     for (var K = [ "x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size" ], Y = 0, J = K.length; J > Y; Y++) if (K[Y] in l) {
      v._.dirty = 1;
      break;
     }
     switch (p["text-anchor"]) {
     case "start":
      v.textpath.style["v-text-align"] = "left", v.bbx = v.W / 2;
      break;

     case "end":
      v.textpath.style["v-text-align"] = "right", v.bbx = -v.W / 2;
      break;

     default:
      v.textpath.style["v-text-align"] = "center", v.bbx = 0;
     }
     v.textpath.style["v-text-kern"] = !0;
    }
   }, N = function(e, a, o) {
    e.attrs = e.attrs || {};
    var s = (e.attrs, Math.pow), l = "linear", c = ".5 .5";
    if (e.attrs.gradient = a, a = t(a).replace(n._radial_gradient, function(e, t, n) {
     return l = "radial", t && n && (t = r(t), n = r(n), s(t - .5, 2) + s(n - .5, 2) > .25 && (n = i.sqrt(.25 - s(t - .5, 2)) * (2 * (n > .5) - 1) + .5), 
     c = t + h + n), f;
    }), a = a.split(/\s*\-\s*/), "linear" == l) {
     var u = a.shift();
     if (u = -r(u), isNaN(u)) return null;
    }
    var d = n._parseDots(a);
    if (!d) return null;
    if (e = e.shape || e.node, d.length) {
     e.removeChild(o), o.on = !0, o.method = "none", o.color = d[0].color, o.color2 = d[d.length - 1].color;
     for (var p = [], m = 0, g = d.length; g > m; m++) d[m].offset && p.push(d[m].offset + h + d[m].color);
     o.colors = p.length ? p.join() : "0% " + o.color, "radial" == l ? (o.type = "gradientTitle", 
     o.focus = "100%", o.focussize = "0 0", o.focusposition = c, o.angle = 0) : (o.type = "gradient", 
     o.angle = (270 - u) % 360), e.appendChild(o);
    }
    return 1;
   }, D = function(e, t) {
    this[0] = this.node = e, e.raphael = !0, this.id = n._oid++, e.raphaelid = this.id, 
    this.X = 0, this.Y = 0, this.attrs = {}, this.paper = t, this.matrix = n.matrix(), 
    this._ = {
     transform: [],
     sx: 1,
     sy: 1,
     dx: 0,
     dy: 0,
     deg: 0,
     dirty: 1,
     dirtyT: 1
    }, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), 
    t.top = this, this.next = null;
   }, M = n.el;
   D.prototype = M, M.constructor = D, M.transform = function(e) {
    if (null == e) return this._.transform;
    var r, i = this.paper._viewBoxShift, a = i ? "s" + [ i.scale, i.scale ] + "-1-1t" + [ i.dx, i.dy ] : f;
    i && (r = e = t(e).replace(/\.{3}|\u2026/g, this._.transform || f)), n._extractTransform(this, a + e);
    var o, s = this.matrix.clone(), l = this.skew, c = this.node, u = ~t(this.attrs.fill).indexOf("-"), d = !t(this.attrs.fill).indexOf("url(");
    if (s.translate(1, 1), d || u || "image" == this.type) if (l.matrix = "1 0 0 1", 
    l.offset = "0 0", o = s.split(), u && o.noRotation || !o.isSimple) {
     c.style.filter = s.toFilter();
     var p = this.getBBox(), m = this.getBBox(1), g = p.x - m.x, b = p.y - m.y;
     c.coordorigin = g * -x + h + b * -x, E(this, 1, 1, g, b, 0);
    } else c.style.filter = f, E(this, o.scalex, o.scaley, o.dx, o.dy, o.rotate); else c.style.filter = f, 
    l.matrix = t(s), l.offset = s.offset();
    return r && (this._.transform = r), this;
   }, M.rotate = function(e, n, i) {
    if (this.removed) return this;
    if (null != e) {
     if (e = t(e).split(u), e.length - 1 && (n = r(e[1]), i = r(e[2])), e = r(e[0]), 
     null == i && (n = i), null == n || null == i) {
      var a = this.getBBox(1);
      n = a.x + a.width / 2, i = a.y + a.height / 2;
     }
     return this._.dirtyT = 1, this.transform(this._.transform.concat([ [ "r", e, n, i ] ])), 
     this;
    }
   }, M.translate = function(e, n) {
    return this.removed ? this : (e = t(e).split(u), e.length - 1 && (n = r(e[1])), 
    e = r(e[0]) || 0, n = +n || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += n), 
    this.transform(this._.transform.concat([ [ "t", e, n ] ])), this);
   }, M.scale = function(e, n, i, a) {
    if (this.removed) return this;
    if (e = t(e).split(u), e.length - 1 && (n = r(e[1]), i = r(e[2]), a = r(e[3]), isNaN(i) && (i = null), 
    isNaN(a) && (a = null)), e = r(e[0]), null == n && (n = e), null == a && (i = a), 
    null == i || null == a) var o = this.getBBox(1);
    return i = null == i ? o.x + o.width / 2 : i, a = null == a ? o.y + o.height / 2 : a, 
    this.transform(this._.transform.concat([ [ "s", e, n, i, a ] ])), this._.dirtyT = 1, 
    this;
   }, M.hide = function() {
    return !this.removed && (this.node.style.display = "none"), this;
   }, M.show = function() {
    return !this.removed && (this.node.style.display = f), this;
   }, M._getBBox = function() {
    return this.removed ? {} : {
     x: this.X + (this.bbx || 0) - this.W / 2,
     y: this.Y - this.H,
     width: this.W,
     height: this.H
    };
   }, M.remove = function() {
    if (!this.removed && this.node.parentNode) {
     this.paper.__set__ && this.paper.__set__.exclude(this), n.eve.unbind("raphael.*.*." + this.id), 
     n._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
     for (var e in this) this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
     this.removed = !0;
    }
   }, M.attr = function(t, r) {
    if (this.removed) return this;
    if (null == t) {
     var i = {};
     for (var a in this.attrs) this.attrs[e](a) && (i[a] = this.attrs[a]);
     return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, 
     i.transform = this._.transform, i;
    }
    if (null == r && n.is(t, "string")) {
     if (t == c && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
     for (var o = t.split(u), s = {}, l = 0, p = o.length; p > l; l++) t = o[l], s[t] = t in this.attrs ? this.attrs[t] : n.is(this.paper.customAttributes[t], "function") ? this.paper.customAttributes[t].def : n._availableAttrs[t];
     return p - 1 ? s : s[o[0]];
    }
    if (this.attrs && null == r && n.is(t, "array")) {
     for (s = {}, l = 0, p = t.length; p > l; l++) s[t[l]] = this.attr(t[l]);
     return s;
    }
    var h;
    null != r && (h = {}, h[t] = r), null == r && n.is(t, "object") && (h = t);
    for (var f in h) d("raphael.attr." + f + "." + this.id, this, h[f]);
    if (h) {
     for (f in this.paper.customAttributes) if (this.paper.customAttributes[e](f) && h[e](f) && n.is(this.paper.customAttributes[f], "function")) {
      var m = this.paper.customAttributes[f].apply(this, [].concat(h[f]));
      this.attrs[f] = h[f];
      for (var g in m) m[e](g) && (h[g] = m[g]);
     }
     h.text && "text" == this.type && (this.textpath.string = h.text), T(this, h);
    }
    return this;
   }, M.toFront = function() {
    return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && n._tofront(this, this.paper), 
    this;
   }, M.toBack = function() {
    return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), 
    n._toback(this, this.paper)), this);
   }, M.insertAfter = function(e) {
    return this.removed ? this : (e.constructor == n.st.constructor && (e = e[e.length - 1]), 
    e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), 
    n._insertafter(this, e, this.paper), this);
   }, M.insertBefore = function(e) {
    return this.removed ? this : (e.constructor == n.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), 
    n._insertbefore(this, e, this.paper), this);
   }, M.blur = function(e) {
    var t = this.node.runtimeStyle, r = t.filter;
    return r = r.replace(b, f), 0 !== +e ? (this.attrs.blur = e, t.filter = r + h + p + ".Blur(pixelradius=" + (+e || 1.5) + ")", 
    t.margin = n.format("-{0}px 0 0 -{0}px", a(+e || 1.5))) : (t.filter = r, t.margin = 0, 
    delete this.attrs.blur), this;
   }, n._engine.path = function(e, t) {
    var n = I("shape");
    n.style.cssText = y, n.coordsize = x + h + x, n.coordorigin = t.coordorigin;
    var r = new D(n, t), i = {
     fill: "none",
     stroke: "#000"
    };
    e && (i.path = e), r.type = "path", r.path = [], r.Path = f, T(r, i), t.canvas.appendChild(n);
    var a = I("skew");
    return a.on = !0, n.appendChild(a), r.skew = a, r.transform(f), r;
   }, n._engine.rect = function(e, t, r, i, a, o) {
    var s = n._rectPath(t, r, i, a, o), l = e.path(s), c = l.attrs;
    return l.X = c.x = t, l.Y = c.y = r, l.W = c.width = i, l.H = c.height = a, c.r = o, 
    c.path = s, l.type = "rect", l;
   }, n._engine.ellipse = function(e, t, n, r, i) {
    {
     var a = e.path();
     a.attrs;
    }
    return a.X = t - r, a.Y = n - i, a.W = 2 * r, a.H = 2 * i, a.type = "ellipse", T(a, {
     cx: t,
     cy: n,
     rx: r,
     ry: i
    }), a;
   }, n._engine.circle = function(e, t, n, r) {
    {
     var i = e.path();
     i.attrs;
    }
    return i.X = t - r, i.Y = n - r, i.W = i.H = 2 * r, i.type = "circle", T(i, {
     cx: t,
     cy: n,
     r: r
    }), i;
   }, n._engine.image = function(e, t, r, i, a, o) {
    var s = n._rectPath(r, i, a, o), l = e.path(s).attr({
     stroke: "none"
    }), u = l.attrs, d = l.node, p = d.getElementsByTagName(c)[0];
    return u.src = t, l.X = u.x = r, l.Y = u.y = i, l.W = u.width = a, l.H = u.height = o, 
    u.path = s, l.type = "image", p.parentNode == d && d.removeChild(p), p.rotate = !0, 
    p.src = t, p.type = "tile", l._.fillpos = [ r, i ], l._.fillsize = [ a, o ], d.appendChild(p), 
    E(l, 1, 1, 0, 0, 0), l;
   }, n._engine.text = function(e, r, i, o) {
    var s = I("shape"), l = I("path"), c = I("textpath");
    r = r || 0, i = i || 0, o = o || "", l.v = n.format("m{0},{1}l{2},{1}", a(r * x), a(i * x), a(r * x) + 1), 
    l.textpathok = !0, c.string = t(o), c.on = !0, s.style.cssText = y, s.coordsize = x + h + x, 
    s.coordorigin = "0 0";
    var u = new D(s, e), d = {
     fill: "#000",
     stroke: "none",
     font: n._availableAttrs.font,
     text: o
    };
    u.shape = s, u.path = l, u.textpath = c, u.type = "text", u.attrs.text = t(o), u.attrs.x = r, 
    u.attrs.y = i, u.attrs.w = 1, u.attrs.h = 1, T(u, d), s.appendChild(c), s.appendChild(l), 
    e.canvas.appendChild(s);
    var p = I("skew");
    return p.on = !0, s.appendChild(p), u.skew = p, u.transform(f), u;
   }, n._engine.setSize = function(e, t) {
    var r = this.canvas.style;
    return this.width = e, this.height = t, e == +e && (e += "px"), t == +t && (t += "px"), 
    r.width = e, r.height = t, r.clip = "rect(0 " + e + " " + t + " 0)", this._viewBox && n._engine.setViewBox.apply(this, this._viewBox), 
    this;
   }, n._engine.setViewBox = function(e, t, r, i, a) {
    n.eve("raphael.setViewBox", this, this._viewBox, [ e, t, r, i, a ]);
    var s, l, c = this.width, u = this.height, d = 1 / o(r / c, i / u);
    return a && (s = u / i, l = c / r, c > r * s && (e -= (c - r * s) / 2 / s), u > i * l && (t -= (u - i * l) / 2 / l)), 
    this._viewBox = [ e, t, r, i, !!a ], this._viewBoxShift = {
     dx: -e,
     dy: -t,
     scale: d
    }, this.forEach(function(e) {
     e.transform("...");
    }), this;
   };
   var I;
   n._engine.initWin = function(e) {
    var t = e.document;
    t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    try {
     !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), 
     I = function(e) {
      return t.createElement("<rvml:" + e + ' class="rvml">');
     };
    } catch (n) {
     I = function(e) {
      return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
     };
    }
   }, n._engine.initWin(n._g.win), n._engine.create = function() {
    var e = n._getContainer.apply(0, arguments), t = e.container, r = e.height, i = e.width, a = e.x, o = e.y;
    if (!t) throw new Error("VML container not found.");
    var s = new n._Paper(), l = s.canvas = n._g.doc.createElement("div"), c = l.style;
    return a = a || 0, o = o || 0, i = i || 512, r = r || 342, s.width = i, s.height = r, 
    i == +i && (i += "px"), r == +r && (r += "px"), s.coordsize = 1e3 * x + h + 1e3 * x, 
    s.coordorigin = "0 0", s.span = n._g.doc.createElement("span"), s.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", 
    l.appendChild(s.span), c.cssText = n.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", i, r), 
    1 == t ? (n._g.doc.body.appendChild(l), c.left = a + "px", c.top = o + "px", c.position = "absolute") : t.firstChild ? t.insertBefore(l, t.firstChild) : t.appendChild(l), 
    s.renderfix = function() {}, s;
   }, n.prototype.clear = function() {
    n.eve("raphael.clear", this), this.canvas.innerHTML = f, this.span = n._g.doc.createElement("span"), 
    this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", 
    this.canvas.appendChild(this.span), this.bottom = this.top = null;
   }, n.prototype.remove = function() {
    n.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
    for (var e in this) this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
    return !0;
   };
   var A = n.st;
   for (var L in M) M[e](L) && !A[e](L) && (A[L] = function(e) {
    return function() {
     var t = arguments;
     return this.forEach(function(n) {
      n[e].apply(n, t);
     });
    };
   }(L));
  }
 }(), T.was ? k.win.Raphael = n : Raphael = n, n;
}), function() {
 function e() {
  this.title = void 0, this.actors = [], this.signals = [];
 }
 function t(e, t) {
  _.extend(this, t), this.name = "ParseError", this.message = e || "";
 }
 e.prototype.getActor = function(t) {
  var n = /^(.+) as (\S+)$/i.exec(t.trim());
  n ? (name = n[1].trim(), t = n[2].trim()) : name = t.trim(), name = name.replace(/\\n/gm, "\n");
  var r, i = this.actors;
  for (r in i) if (i[r].alias == t) return i[r];
  return r = i.push(new e.Actor(t, name, i.length)), i[r - 1];
 }, e.prototype.setTitle = function(e) {
  this.title = e;
 }, e.prototype.addSignal = function(e) {
  this.signals.push(e);
 }, e.Actor = function(e, t, n) {
  this.alias = e, this.name = t, this.index = n;
 }, e.Signal = function(e, t, n, r) {
  this.type = "Signal", this.actorA = e, this.actorB = n, this.linetype = 3 & t, this.arrowtype = t >> 2 & 3, 
  this.message = r;
 }, e.Signal.prototype.isSelf = function() {
  return this.actorA.index == this.actorB.index;
 }, e.Note = function(e, t, n) {
  if (this.type = "Note", this.actor = e, this.placement = t, this.message = n, this.hasManyActors() && e[0] == e[1]) throw new Error("Note should be over two different actors");
 }, e.Note.prototype.hasManyActors = function() {
  return _.isArray(this.actor);
 }, e.LINETYPE = {
  SOLID: 0,
  DOTTED: 1
 }, e.ARROWTYPE = {
  FILLED: 0,
  OPEN: 1
 }, e.PLACEMENT = {
  LEFTOF: 0,
  RIGHTOF: 1,
  OVER: 2
 };
 var n = function() {
  function t() {
   this.yy = {};
  }
  var n = {
   trace: function() {},
   yy: {},
   symbols_: {
    error: 2,
    start: 3,
    document: 4,
    EOF: 5,
    line: 6,
    statement: 7,
    NL: 8,
    participant: 9,
    actor: 10,
    signal: 11,
    note_statement: 12,
    title: 13,
    message: 14,
    note: 15,
    placement: 16,
    over: 17,
    actor_pair: 18,
    ",": 19,
    left_of: 20,
    right_of: 21,
    signaltype: 22,
    ACTOR: 23,
    linetype: 24,
    arrowtype: 25,
    LINE: 26,
    DOTLINE: 27,
    ARROW: 28,
    OPENARROW: 29,
    MESSAGE: 30,
    $accept: 0,
    $end: 1
   },
   terminals_: {
    2: "error",
    5: "EOF",
    8: "NL",
    9: "participant",
    13: "title",
    15: "note",
    17: "over",
    19: ",",
    20: "left_of",
    21: "right_of",
    23: "ACTOR",
    26: "LINE",
    27: "DOTLINE",
    28: "ARROW",
    29: "OPENARROW",
    30: "MESSAGE"
   },
   productions_: [ 0, [ 3, 2 ], [ 4, 0 ], [ 4, 2 ], [ 6, 1 ], [ 6, 1 ], [ 7, 2 ], [ 7, 1 ], [ 7, 1 ], [ 7, 2 ], [ 12, 4 ], [ 12, 4 ], [ 18, 1 ], [ 18, 3 ], [ 16, 1 ], [ 16, 1 ], [ 11, 4 ], [ 10, 1 ], [ 22, 2 ], [ 22, 1 ], [ 24, 1 ], [ 24, 1 ], [ 25, 1 ], [ 25, 1 ], [ 14, 1 ] ],
   performAction: function(t, n, r, i, a, o) {
    var s = o.length - 1;
    switch (a) {
    case 1:
     return i;

    case 4:
     break;

    case 6:
     o[s];
     break;

    case 7:
     i.addSignal(o[s]);
     break;

    case 8:
     i.addSignal(o[s]);
     break;

    case 9:
     i.setTitle(o[s]);
     break;

    case 10:
     this.$ = new e.Note(o[s - 1], o[s - 2], o[s]);
     break;

    case 11:
     this.$ = new e.Note(o[s - 1], e.PLACEMENT.OVER, o[s]);
     break;

    case 12:
     this.$ = o[s];
     break;

    case 13:
     this.$ = [ o[s - 2], o[s] ];
     break;

    case 14:
     this.$ = e.PLACEMENT.LEFTOF;
     break;

    case 15:
     this.$ = e.PLACEMENT.RIGHTOF;
     break;

    case 16:
     this.$ = new e.Signal(o[s - 3], o[s - 2], o[s - 1], o[s]);
     break;

    case 17:
     this.$ = i.getActor(o[s]);
     break;

    case 18:
     this.$ = o[s - 1] | o[s] << 2;
     break;

    case 19:
     this.$ = o[s];
     break;

    case 20:
     this.$ = e.LINETYPE.SOLID;
     break;

    case 21:
     this.$ = e.LINETYPE.DOTTED;
     break;

    case 22:
     this.$ = e.ARROWTYPE.FILLED;
     break;

    case 23:
     this.$ = e.ARROWTYPE.OPEN;
     break;

    case 24:
     this.$ = o[s].substring(1).trim().replace(/\\n/gm, "\n");
    }
   },
   table: [ {
    3: 1,
    4: 2,
    5: [ 2, 2 ],
    8: [ 2, 2 ],
    9: [ 2, 2 ],
    13: [ 2, 2 ],
    15: [ 2, 2 ],
    23: [ 2, 2 ]
   }, {
    1: [ 3 ]
   }, {
    5: [ 1, 3 ],
    6: 4,
    7: 5,
    8: [ 1, 6 ],
    9: [ 1, 7 ],
    10: 11,
    11: 8,
    12: 9,
    13: [ 1, 10 ],
    15: [ 1, 12 ],
    23: [ 1, 13 ]
   }, {
    1: [ 2, 1 ]
   }, {
    5: [ 2, 3 ],
    8: [ 2, 3 ],
    9: [ 2, 3 ],
    13: [ 2, 3 ],
    15: [ 2, 3 ],
    23: [ 2, 3 ]
   }, {
    5: [ 2, 4 ],
    8: [ 2, 4 ],
    9: [ 2, 4 ],
    13: [ 2, 4 ],
    15: [ 2, 4 ],
    23: [ 2, 4 ]
   }, {
    5: [ 2, 5 ],
    8: [ 2, 5 ],
    9: [ 2, 5 ],
    13: [ 2, 5 ],
    15: [ 2, 5 ],
    23: [ 2, 5 ]
   }, {
    10: 14,
    23: [ 1, 13 ]
   }, {
    5: [ 2, 7 ],
    8: [ 2, 7 ],
    9: [ 2, 7 ],
    13: [ 2, 7 ],
    15: [ 2, 7 ],
    23: [ 2, 7 ]
   }, {
    5: [ 2, 8 ],
    8: [ 2, 8 ],
    9: [ 2, 8 ],
    13: [ 2, 8 ],
    15: [ 2, 8 ],
    23: [ 2, 8 ]
   }, {
    14: 15,
    30: [ 1, 16 ]
   }, {
    22: 17,
    24: 18,
    26: [ 1, 19 ],
    27: [ 1, 20 ]
   }, {
    16: 21,
    17: [ 1, 22 ],
    20: [ 1, 23 ],
    21: [ 1, 24 ]
   }, {
    5: [ 2, 17 ],
    8: [ 2, 17 ],
    9: [ 2, 17 ],
    13: [ 2, 17 ],
    15: [ 2, 17 ],
    19: [ 2, 17 ],
    23: [ 2, 17 ],
    26: [ 2, 17 ],
    27: [ 2, 17 ],
    30: [ 2, 17 ]
   }, {
    5: [ 2, 6 ],
    8: [ 2, 6 ],
    9: [ 2, 6 ],
    13: [ 2, 6 ],
    15: [ 2, 6 ],
    23: [ 2, 6 ]
   }, {
    5: [ 2, 9 ],
    8: [ 2, 9 ],
    9: [ 2, 9 ],
    13: [ 2, 9 ],
    15: [ 2, 9 ],
    23: [ 2, 9 ]
   }, {
    5: [ 2, 24 ],
    8: [ 2, 24 ],
    9: [ 2, 24 ],
    13: [ 2, 24 ],
    15: [ 2, 24 ],
    23: [ 2, 24 ]
   }, {
    10: 25,
    23: [ 1, 13 ]
   }, {
    23: [ 2, 19 ],
    25: 26,
    28: [ 1, 27 ],
    29: [ 1, 28 ]
   }, {
    23: [ 2, 20 ],
    28: [ 2, 20 ],
    29: [ 2, 20 ]
   }, {
    23: [ 2, 21 ],
    28: [ 2, 21 ],
    29: [ 2, 21 ]
   }, {
    10: 29,
    23: [ 1, 13 ]
   }, {
    10: 31,
    18: 30,
    23: [ 1, 13 ]
   }, {
    23: [ 2, 14 ]
   }, {
    23: [ 2, 15 ]
   }, {
    14: 32,
    30: [ 1, 16 ]
   }, {
    23: [ 2, 18 ]
   }, {
    23: [ 2, 22 ]
   }, {
    23: [ 2, 23 ]
   }, {
    14: 33,
    30: [ 1, 16 ]
   }, {
    14: 34,
    30: [ 1, 16 ]
   }, {
    19: [ 1, 35 ],
    30: [ 2, 12 ]
   }, {
    5: [ 2, 16 ],
    8: [ 2, 16 ],
    9: [ 2, 16 ],
    13: [ 2, 16 ],
    15: [ 2, 16 ],
    23: [ 2, 16 ]
   }, {
    5: [ 2, 10 ],
    8: [ 2, 10 ],
    9: [ 2, 10 ],
    13: [ 2, 10 ],
    15: [ 2, 10 ],
    23: [ 2, 10 ]
   }, {
    5: [ 2, 11 ],
    8: [ 2, 11 ],
    9: [ 2, 11 ],
    13: [ 2, 11 ],
    15: [ 2, 11 ],
    23: [ 2, 11 ]
   }, {
    10: 36,
    23: [ 1, 13 ]
   }, {
    30: [ 2, 13 ]
   } ],
   defaultActions: {
    3: [ 2, 1 ],
    23: [ 2, 14 ],
    24: [ 2, 15 ],
    26: [ 2, 18 ],
    27: [ 2, 22 ],
    28: [ 2, 23 ],
    36: [ 2, 13 ]
   },
   parseError: function(e, t) {
    if (!t.recoverable) throw new Error(e);
    this.trace(e);
   },
   parse: function(e) {
    function t() {
     var e;
     return e = n.lexer.lex() || p, "number" != typeof e && (e = n.symbols_[e] || e), 
     e;
    }
    var n = this, r = [ 0 ], i = [ null ], a = [], o = this.table, s = "", l = 0, c = 0, u = 0, d = 2, p = 1;
    this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, 
    "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
    var h = this.lexer.yylloc;
    a.push(h);
    var f = this.lexer.options && this.lexer.options.ranges;
    this.parseError = "function" == typeof this.yy.parseError ? this.yy.parseError : Object.getPrototypeOf(this).parseError;
    for (var m, g, b, v, y, x, w, S, C, _ = {}; ;) {
     if (b = r[r.length - 1], this.defaultActions[b] ? v = this.defaultActions[b] : ((null === m || "undefined" == typeof m) && (m = t()), 
     v = o[b] && o[b][m]), "undefined" == typeof v || !v.length || !v[0]) {
      var E = "";
      C = [];
      for (x in o[b]) this.terminals_[x] && x > d && C.push("'" + this.terminals_[x] + "'");
      E = this.lexer.showPosition ? "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + C.join(", ") + ", got '" + (this.terminals_[m] || m) + "'" : "Parse error on line " + (l + 1) + ": Unexpected " + (m == p ? "end of input" : "'" + (this.terminals_[m] || m) + "'"), 
      this.parseError(E, {
       text: this.lexer.match,
       token: this.terminals_[m] || m,
       line: this.lexer.yylineno,
       loc: h,
       expected: C
      });
     }
     if (v[0] instanceof Array && v.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + m);
     switch (v[0]) {
     case 1:
      r.push(m), i.push(this.lexer.yytext), a.push(this.lexer.yylloc), r.push(v[1]), m = null, 
      g ? (m = g, g = null) : (c = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, 
      h = this.lexer.yylloc, u > 0 && u--);
      break;

     case 2:
      if (w = this.productions_[v[1]][1], _.$ = i[i.length - w], _._$ = {
       first_line: a[a.length - (w || 1)].first_line,
       last_line: a[a.length - 1].last_line,
       first_column: a[a.length - (w || 1)].first_column,
       last_column: a[a.length - 1].last_column
      }, f && (_._$.range = [ a[a.length - (w || 1)].range[0], a[a.length - 1].range[1] ]), 
      y = this.performAction.call(_, s, c, l, this.yy, v[1], i, a), "undefined" != typeof y) return y;
      w && (r = r.slice(0, -1 * w * 2), i = i.slice(0, -1 * w), a = a.slice(0, -1 * w)), 
      r.push(this.productions_[v[1]][0]), i.push(_.$), a.push(_._$), S = o[r[r.length - 2]][r[r.length - 1]], 
      r.push(S);
      break;

     case 3:
      return !0;
     }
    }
    return !0;
   }
  }, r = function() {
   var e = {
    EOF: 1,
    parseError: function(e, t) {
     if (!this.yy.parser) throw new Error(e);
     this.yy.parser.parseError(e, t);
    },
    setInput: function(e) {
     return this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, 
     this.yytext = this.matched = this.match = "", this.conditionStack = [ "INITIAL" ], 
     this.yylloc = {
      first_line: 1,
      first_column: 0,
      last_line: 1,
      last_column: 0
     }, this.options.ranges && (this.yylloc.range = [ 0, 0 ]), this.offset = 0, this;
    },
    input: function() {
     var e = this._input[0];
     this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
     var t = e.match(/(?:\r\n?|\n).*/g);
     return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, 
     this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), 
     e;
    },
    unput: function(e) {
     var t = e.length, n = e.split(/(?:\r\n?|\n)/g);
     this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), 
     this.offset -= t;
     var r = this.match.split(/(?:\r\n?|\n)/g);
     this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), 
     n.length - 1 && (this.yylineno -= n.length - 1);
     var i = this.yylloc.range;
     return this.yylloc = {
      first_line: this.yylloc.first_line,
      last_line: this.yylineno + 1,
      first_column: this.yylloc.first_column,
      last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t
     }, this.options.ranges && (this.yylloc.range = [ i[0], i[0] + this.yyleng - t ]), 
     this.yyleng = this.yytext.length, this;
    },
    more: function() {
     return this._more = !0, this;
    },
    reject: function() {
     return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
      text: "",
      token: null,
      line: this.yylineno
     });
    },
    less: function(e) {
     this.unput(this.match.slice(e));
    },
    pastInput: function() {
     var e = this.matched.substr(0, this.matched.length - this.match.length);
     return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "");
    },
    upcomingInput: function() {
     var e = this.match;
     return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "");
    },
    showPosition: function() {
     var e = this.pastInput(), t = new Array(e.length + 1).join("-");
     return e + this.upcomingInput() + "\n" + t + "^";
    },
    test_match: function(e, t) {
     var n, r, i;
     if (this.options.backtrack_lexer && (i = {
      yylineno: this.yylineno,
      yylloc: {
       first_line: this.yylloc.first_line,
       last_line: this.last_line,
       first_column: this.yylloc.first_column,
       last_column: this.yylloc.last_column
      },
      yytext: this.yytext,
      match: this.match,
      matches: this.matches,
      matched: this.matched,
      yyleng: this.yyleng,
      offset: this.offset,
      _more: this._more,
      _input: this._input,
      yy: this.yy,
      conditionStack: this.conditionStack.slice(0),
      done: this.done
     }, this.options.ranges && (i.yylloc.range = this.yylloc.range.slice(0))), r = e[0].match(/(?:\r\n?|\n).*/g), 
     r && (this.yylineno += r.length), this.yylloc = {
      first_line: this.yylloc.last_line,
      last_line: this.yylineno + 1,
      first_column: this.yylloc.last_column,
      last_column: r ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
     }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, 
     this.options.ranges && (this.yylloc.range = [ this.offset, this.offset += this.yyleng ]), 
     this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), 
     this.matched += e[0], n = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]), 
     this.done && this._input && (this.done = !1), n) return n;
     if (this._backtrack) {
      for (var a in i) this[a] = i[a];
      return !1;
     }
     return !1;
    },
    next: function() {
     if (this.done) return this.EOF;
     this._input || (this.done = !0);
     var e, t, n, r;
     this._more || (this.yytext = "", this.match = "");
     for (var i = this._currentRules(), a = 0; a < i.length; a++) if (n = this._input.match(this.rules[i[a]]), 
     n && (!t || n[0].length > t[0].length)) {
      if (t = n, r = a, this.options.backtrack_lexer) {
       if (e = this.test_match(n, i[a]), e !== !1) return e;
       if (this._backtrack) {
        t = !1;
        continue;
       }
       return !1;
      }
      if (!this.options.flex) break;
     }
     return t ? (e = this.test_match(t, i[r]), e !== !1 ? e : !1) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
      text: "",
      token: null,
      line: this.yylineno
     });
    },
    lex: function() {
     var e = this.next();
     return e ? e : this.lex();
    },
    begin: function(e) {
     this.conditionStack.push(e);
    },
    popState: function() {
     var e = this.conditionStack.length - 1;
     return e > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    },
    _currentRules: function() {
     return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    },
    topState: function(e) {
     return e = this.conditionStack.length - 1 - Math.abs(e || 0), e >= 0 ? this.conditionStack[e] : "INITIAL";
    },
    pushState: function(e) {
     this.begin(e);
    },
    stateStackSize: function() {
     return this.conditionStack.length;
    },
    options: {
     "case-insensitive": !0
    },
    performAction: function(e, t, n, r) {
     switch (n) {
     case 0:
      return 8;

     case 1:
      break;

     case 2:
      break;

     case 3:
      return 9;

     case 4:
      return 20;

     case 5:
      return 21;

     case 6:
      return 17;

     case 7:
      return 15;

     case 8:
      return 13;

     case 9:
      return 19;

     case 10:
      return 23;

     case 11:
      return 27;

     case 12:
      return 26;

     case 13:
      return 29;

     case 14:
      return 28;

     case 15:
      return 30;

     case 16:
      return 5;

     case 17:
      return "INVALID";
     }
    },
    rules: [ /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:participant\b)/i, /^(?:left of\b)/i, /^(?:right of\b)/i, /^(?:over\b)/i, /^(?:note\b)/i, /^(?:title\b)/i, /^(?:,)/i, /^(?:[^\->:\n,]+)/i, /^(?:--)/i, /^(?:-)/i, /^(?:>>)/i, /^(?:>)/i, /^(?:[^#\n]+)/i, /^(?:$)/i, /^(?:.)/i ],
    conditions: {
     INITIAL: {
      rules: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
      inclusive: !0
     }
    }
   };
   return e;
  }();
  return n.lexer = r, t.prototype = n, n.Parser = t, new t();
 }();
 "undefined" != typeof require && "undefined" != typeof exports && (exports.parser = n, 
 exports.Parser = n.Parser, exports.parse = function() {
  return n.parse.apply(n, arguments);
 }, exports.main = function(e) {
  e[1] || (console.log("Usage: " + e[0] + " FILE"), process.exit(1));
  var t = require("fs").readFileSync(require("path").normalize(e[1]), "utf8");
  return exports.parser.parse(t);
 }, "undefined" != typeof module && require.main === module && exports.main(process.argv.slice(1))), 
 t.prototype = new Error(), e.ParseError = t, n.parseError = function(e, n) {
  throw new t(e, n);
 }, e.parse = function(t) {
  return n.yy = new e(), n.parse(t);
 }, this.Diagram = e;
}.call(this), define("diagram-grammar", function() {}), function(e) {
 "function" == typeof define && define.amd ? define("Diagram", [ "raphael" ], function(t) {
  return e(t), Diagram;
 }) : e(Raphael);
}(function(e) {
 function t(e) {
  this.message = e;
 }
 function n(e, n) {
  if (!e) throw new t(n);
 }
 function r(e) {
  return e.x + e.width / 2;
 }
 function i(e) {
  return e.y + e.height / 2;
 }
 var a = 10, o = 10, s = 10, l = 5, c = 5, u = 10, d = 5, p = 15, h = 0, f = 5, m = 20, g = Diagram.PLACEMENT, b = Diagram.LINETYPE, v = Diagram.ARROWTYPE, y = {
  stroke: "#000",
  "stroke-width": 2
 }, x = {
  fill: "#fff"
 };
 t.prototype.toString = function() {
  return "AssertException: " + this.message;
 }, String.prototype.trim || (String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
 }), e.fn.line = function(e, t, r, i) {
  return n(_.all([ e, r, t, i ], _.isFinite), "x1,x2,y1,y2 must be numeric"), this.path("M{0},{1} L{2},{3}", e, t, r, i);
 }, e.fn.wobble = function(e, t, r, i) {
  n(_.all([ e, r, t, i ], _.isFinite), "x1,x2,y1,y2 must be numeric");
  var a = Math.sqrt((r - e) * (r - e) + (i - t) * (i - t)) / 25, o = Math.random(), s = Math.random(), l = Math.random() > .5 ? a : -a, c = Math.random() > .5 ? a : -a, u = {
   x: (r - e) * o + e + l,
   y: (i - t) * o + t + c
  }, d = {
   x: (r - e) * s + e - l,
   y: (i - t) * s + t - c
  };
  return "C" + u.x + "," + u.y + " " + d.x + "," + d.y + " " + r + "," + i;
 }, e.fn.text_bbox = function(e, t) {
  var n;
  t._obj ? n = this.print_center(0, 0, e, t._obj, t["font-size"]) : (n = this.text(0, 0, e), 
  n.attr(t));
  var r = n.getBBox();
  return n.remove(), r;
 }, e.fn.handRect = function(e, t, r, i) {
  return n(_.all([ e, t, r, i ], _.isFinite), "x, y, w, h must be numeric"), this.path("M" + e + "," + t + this.wobble(e, t, e + r, t) + this.wobble(e + r, t, e + r, t + i) + this.wobble(e + r, t + i, e, t + i) + this.wobble(e, t + i, e, t)).attr(x);
 }, e.fn.handLine = function(e, t, r, i) {
  return n(_.all([ e, r, t, i ], _.isFinite), "x1,x2,y1,y2 must be numeric"), this.path("M" + e + "," + t + this.wobble(e, t, r, i));
 }, e.fn.print_center = function(t, n, r, i, a, o) {
  var s = this.print(t, n, r, i, a, "baseline", o), l = s.getBBox(), c = t - l.x - l.width / 2, u = n - l.y - l.height / 2, d = new e.matrix();
  return d.translate(c, u), s.attr("path", e.mapPath(s.attr("path"), d));
 };
 var w = function(e) {
  this.init(e);
 };
 _.extend(w.prototype, {
  init: function(e) {
   this.diagram = e, this._paper = void 0, this._font = void 0, this._title = void 0, 
   this._actors_height = 0, this._signals_height = 0;
   var t = this.arrow_types = {};
   t[v.FILLED] = "block", t[v.OPEN] = "open";
   var n = this.line_types = {};
   n[b.SOLID] = "", n[b.DOTTED] = "-";
  },
  init_paper: function(t) {
   this._paper = new e(t, 320, 200);
  },
  init_font: function() {},
  draw_line: function(e, t, n, r) {
   return this._paper.line(e, t, n, r);
  },
  draw_rect: function(e, t, n, r) {
   return this._paper.rect(e, t, n, r);
  },
  draw: function(e) {
   var t = this.diagram;
   this.init_paper(e), this.init_font(), this.layout();
   var n = this._title ? this._title.height : 0;
   this._paper.setStart(), this._paper.setSize(t.width, t.height);
   var r = a + n;
   this.draw_title(), this.draw_actors(r), this.draw_signals(r + this._actors_height), 
   this._paper.setFinish();
  },
  layout: function() {
   function e(e, t, r) {
    n(t > e, "a must be less than or equal to b"), 0 > e ? (t = b[t], t.x = Math.max(r - t.width / 2, t.x)) : t >= b.length ? (e = b[e], 
    e.padding_right = Math.max(r, e.padding_right)) : (e = b[e], e.distances[t] = Math.max(r, e.distances[t] ? e.distances[t] : 0));
   }
   var t = this.diagram, r = this._paper, i = this._font, b = t.actors, v = t.signals;
   if (t.width = 0, t.height = 0, t.title) {
    var y = this._title = {}, x = r.text_bbox(t.title, i);
    y.text_bb = x, y.message = t.title, y.width = x.width + 2 * (f + h), y.height = x.height + 2 * (f + h), 
    y.x = a, y.y = a, t.width += y.width, t.height += y.height;
   }
   _.each(b, function(e) {
    var t = r.text_bbox(e.name, i);
    e.text_bb = t, e.x = 0, e.y = 0, e.width = t.width + 2 * (s + o), e.height = t.height + 2 * (s + o), 
    e.distances = [], e.padding_right = 0, this._actors_height = Math.max(e.height, this._actors_height);
   }, this), _.each(v, function(t) {
    var n, a, s = r.text_bbox(t.message, i);
    t.text_bb = s, t.width = s.width, t.height = s.height;
    var h = 0;
    if ("Signal" == t.type) t.width += 2 * (l + c), t.height += 2 * (l + c), t.isSelf() ? (n = t.actorA.index, 
    a = n + 1, t.width += m) : (n = Math.min(t.actorA.index, t.actorB.index), a = Math.max(t.actorA.index, t.actorB.index)); else {
     if ("Note" != t.type) throw new Error("Unhandled signal type:" + t.type);
     if (t.width += 2 * (u + d), t.height += 2 * (u + d), h = 2 * o, t.placement == g.LEFTOF) a = t.actor.index, 
     n = a - 1; else if (t.placement == g.RIGHTOF) n = t.actor.index, a = n + 1; else if (t.placement == g.OVER && t.hasManyActors()) n = Math.min(t.actor[0].index, t.actor[1].index), 
     a = Math.max(t.actor[0].index, t.actor[1].index), h = -(2 * d + 2 * p); else if (t.placement == g.OVER) return n = t.actor.index, 
     e(n - 1, n, t.width / 2), e(n, n + 1, t.width / 2), void (this._signals_height += t.height);
    }
    e(n, a, t.width + h), this._signals_height += t.height;
   }, this);
   var w = 0;
   return _.each(b, function(e) {
    e.x = Math.max(w, e.x), _.each(e.distances, function(t, n) {
     "undefined" != typeof t && (n = b[n], t = Math.max(t, e.width / 2, n.width / 2), 
     n.x = Math.max(n.x, e.x + e.width / 2 + t - n.width / 2));
    }), w = e.x + e.width + e.padding_right;
   }, this), t.width = Math.max(w, t.width), t.width += 2 * a, t.height += 2 * a + 2 * this._actors_height + this._signals_height, 
   this;
  },
  draw_title: function() {
   var e = this._title;
   e && this.draw_text_box(e, e.message, h, f, this._font);
  },
  draw_actors: function(e) {
   var t = e;
   _.each(this.diagram.actors, function(e) {
    this.draw_actor(e, t, this._actors_height), this.draw_actor(e, t + this._actors_height + this._signals_height, this._actors_height);
    var n = r(e), i = this.draw_line(n, t + this._actors_height - o, n, t + this._actors_height + o + this._signals_height);
    i.attr(y);
   }, this);
  },
  draw_actor: function(e, t, n) {
   e.y = t, e.height = n, this.draw_text_box(e, e.name, o, s, this._font);
  },
  draw_signals: function(e) {
   var t = e;
   _.each(this.diagram.signals, function(e) {
    "Signal" == e.type ? e.isSelf() ? this.draw_self_signal(e, t) : this.draw_signal(e, t) : "Note" == e.type && this.draw_note(e, t), 
    t += e.height;
   }, this);
  },
  draw_self_signal: function(e, t) {
   n(e.isSelf(), "signal must be a self signal");
   var i = e.text_bb, a = r(e.actorA), o = a + m + c - i.x, s = t + e.height / 2;
   this.draw_text(o, s, e.message, this._font);
   var u, d = _.extend({}, y, {
    "stroke-dasharray": this.line_types[e.linetype]
   }), p = t + l, h = p + e.height - l;
   u = this.draw_line(a, p, a + m, p), u.attr(d), u = this.draw_line(a + m, p, a + m, h), 
   u.attr(d), u = this.draw_line(a + m, h, a, h), d["arrow-end"] = this.arrow_types[e.arrowtype] + "-wide-long", 
   u.attr(d);
  },
  draw_signal: function(e, t) {
   var n = r(e.actorA), i = r(e.actorB), a = (i - n) / 2 + n, o = t + l + 2 * c;
   this.draw_text(a, o, e.message, this._font), o = t + e.height - l - c;
   var s = this.draw_line(n, o, i, o);
   s.attr(y), s.attr({
    "arrow-end": this.arrow_types[e.arrowtype] + "-wide-long",
    "stroke-dasharray": this.line_types[e.linetype]
   });
  },
  draw_note: function(e, t) {
   e.y = t;
   var n = e.hasManyActors() ? e.actor[0] : e.actor, i = r(n);
   switch (e.placement) {
   case g.RIGHTOF:
    e.x = i + o;
    break;

   case g.LEFTOF:
    e.x = i - o - e.width;
    break;

   case g.OVER:
    if (e.hasManyActors()) {
     var a = r(e.actor[1]), s = p + d;
     e.x = i - s, e.width = a + s - e.x;
    } else e.x = i - e.width / 2;
    break;

   default:
    throw new Error("Unhandled note placement:" + e.placement);
   }
   this.draw_text_box(e, e.message, u, d, this._font);
  },
  draw_text: function(e, t, n, r) {
   var i, a = this._paper, o = r || {};
   o._obj ? i = a.print_center(e, t, n, o._obj, o["font-size"]) : (i = a.text(e, t, n), 
   i.attr(o));
   var s = i.getBBox(), l = a.rect(s.x, s.y, s.width, s.height);
   l.attr({
    fill: "#fff",
    stroke: "none"
   }), i.toFront();
  },
  draw_text_box: function(e, t, n, a, o) {
   var s = e.x + n, l = e.y + n, c = e.width - 2 * n, u = e.height - 2 * n, d = this.draw_rect(s, l, c, u);
   d.attr(y), s = r(e), l = i(e), this.draw_text(s, l, t, o);
  }
 });
 var S = function(e) {
  this.init(e);
 };
 _.extend(S.prototype, w.prototype, {
  init_font: function() {
   this._font = {
    "font-size": 16,
    "font-family": "Andale Mono, monospace"
   };
  }
 });
 var C = function(e) {
  this.init(e);
 };
 _.extend(C.prototype, w.prototype, {
  init_font: function() {
   this._font = {
    "font-size": 16,
    "font-family": "daniel"
   }, this._font._obj = this._paper.getFont("daniel");
  },
  draw_line: function(e, t, n, r) {
   return this._paper.handLine(e, t, n, r);
  },
  draw_rect: function(e, t, n, r) {
   return this._paper.handRect(e, t, n, r);
  }
 });
 var E = {
  simple: S,
  hand: C
 };
 Diagram.prototype.drawSVG = function(e, t) {
  var n = {
   theme: "hand"
  };
  if (t = _.defaults(t || {}, n), !(t.theme in E)) throw new Error("Unsupported theme: " + t.theme);
  var r = new E[t.theme](this);
  r.draw(e);
 };
}), !function(e, t) {
 "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd && define("flow-chart", [], t);
}(this, function() {
 function e(t, n) {
  if (!t || "function" == typeof t) return n;
  var r = {};
  for (var i in n) r[i] = n[i];
  for (i in t) t[i] && (r[i] = "object" == typeof r[i] ? e(r[i], t[i]) : t[i]);
  return r;
 }
 function t(e, t) {
  if ("function" == typeof Object.create) e.super_ = t, e.prototype = Object.create(t.prototype, {
   constructor: {
    value: e,
    enumerable: !1,
    writable: !0,
    configurable: !0
   }
  }); else {
   e.super_ = t;
   var n = function() {};
   n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
  }
 }
 function n(e, t, n) {
  var r, i, a = "M{0},{1}";
  for (r = 2, i = 2 * n.length + 2; i > r; r += 2) a += " L{" + r + "},{" + (r + 1) + "}";
  var o = [ t.x, t.y ];
  for (r = 0, i = n.length; i > r; r++) o.push(n[r].x), o.push(n[r].y);
  var s = e.paper.path(a, o);
  s.attr("stroke", e.options["element-color"]), s.attr("stroke-width", e.options["line-width"]);
  var l = e.options.font, c = e.options["font-family"], u = e.options["font-weight"];
  return l && s.attr({
   font: l
  }), c && s.attr({
   "font-family": c
  }), u && s.attr({
   "font-weight": u
  }), s;
 }
 function r(e, t, n, r) {
  var i, a;
  "[object Array]" !== Object.prototype.toString.call(n) && (n = [ n ]);
  var o = "M{0},{1}";
  for (i = 2, a = 2 * n.length + 2; a > i; i += 2) o += " L{" + i + "},{" + (i + 1) + "}";
  var s = [ t.x, t.y ];
  for (i = 0, a = n.length; a > i; i++) s.push(n[i].x), s.push(n[i].y);
  var l = e.paper.path(o, s);
  l.attr({
   stroke: e.options["line-color"],
   "stroke-width": e.options["line-width"],
   "arrow-end": e.options["arrow-end"]
  });
  var c = e.options.font, u = e.options["font-family"], d = e.options["font-weight"];
  if (c && l.attr({
   font: c
  }), u && l.attr({
   "font-family": u
  }), d && l.attr({
   "font-weight": d
  }), r) {
   var p = !1, h = e.paper.text(0, 0, r), f = !1, m = n[0];
   t.y === m.y && (f = !0);
   var g = 0, b = 0;
   p ? (g = t.x > m.x ? t.x - (t.x - m.x) / 2 : m.x - (m.x - t.x) / 2, b = t.y > m.y ? t.y - (t.y - m.y) / 2 : m.y - (m.y - t.y) / 2, 
   f ? (g -= h.getBBox().width / 2, b -= e.options["text-margin"]) : (g += e.options["text-margin"], 
   b -= h.getBBox().height / 2)) : (g = t.x, b = t.y, f ? (g += e.options["text-margin"] / 2, 
   b -= e.options["text-margin"]) : (g += e.options["text-margin"] / 2, b += e.options["text-margin"])), 
   h.attr({
    "text-anchor": "start",
    "font-size": e.options["font-size"],
    fill: e.options["font-color"],
    x: g,
    y: b
   }), c && h.attr({
    font: c
   }), u && h.attr({
    "font-family": u
   }), d && h.attr({
    "font-weight": d
   });
  }
  return l;
 }
 function i(e, t, n, r, i, a, o, s) {
  var l, c, u, d, p, h = {
   x: null,
   y: null,
   onLine1: !1,
   onLine2: !1
  };
  return l = (s - a) * (n - e) - (o - i) * (r - t), 0 === l ? h : (c = t - a, u = e - i, 
  d = (o - i) * c - (s - a) * u, p = (n - e) * c - (r - t) * u, c = d / l, u = p / l, 
  h.x = e + c * (n - e), h.y = t + c * (r - t), c > 0 && 1 > c && (h.onLine1 = !0), 
  u > 0 && 1 > u && (h.onLine2 = !0), h);
 }
 function a(e, t) {
  t = t || {}, this.paper = new Raphael(e), this.options = g.defaults(t, m), this.symbols = [], 
  this.lines = [], this.start = null;
 }
 function o(e, t, n) {
  this.chart = e, this.group = this.chart.paper.set(), this.symbol = n, this.connectedTo = [], 
  this.symbolType = t.symbolType, this.flowstate = t.flowstate || "future", this.next_direction = t.next && t.direction_next ? t.direction_next : void 0, 
  this.text = this.chart.paper.text(0, 0, t.text), t.key && (this.text.node.id = t.key + "t"), 
  this.text.node.setAttribute("class", this.getAttr("class") + "t"), this.text.attr({
   "text-anchor": "start",
   x: this.getAttr("text-margin"),
   fill: this.getAttr("font-color"),
   "font-size": this.getAttr("font-size")
  });
  var r = this.getAttr("font"), i = this.getAttr("font-family"), a = this.getAttr("font-weight");
  r && this.text.attr({
   font: r
  }), i && this.text.attr({
   "font-family": i
  }), a && this.text.attr({
   "font-weight": a
  }), t.link && this.text.attr("href", t.link), t.target && this.text.attr("target", t.target);
  var o = this.getAttr("maxWidth");
  if (o) {
   for (var s = t.text.split(" "), l = "", c = 0, u = s.length; u > c; c++) {
    var d = s[c];
    this.text.attr("text", l + " " + d), l += this.text.getBBox().width > o ? "\n" + d : " " + d;
   }
   this.text.attr("text", l.substring(1));
  }
  if (this.group.push(this.text), n) {
   var p = this.getAttr("text-margin");
   n.attr({
    fill: this.getAttr("fill"),
    stroke: this.getAttr("element-color"),
    "stroke-width": this.getAttr("line-width"),
    width: this.text.getBBox().width + 2 * p,
    height: this.text.getBBox().height + 2 * p
   }), n.node.setAttribute("class", this.getAttr("class")), t.link && n.attr("href", t.link), 
   t.target && n.attr("target", t.target), t.key && (n.node.id = t.key), this.group.push(n), 
   n.insertBefore(this.text), this.text.attr({
    y: n.getBBox().height / 2
   }), this.initialize();
  }
 }
 function s(e, t) {
  var n = e.paper.rect(0, 0, 0, 0, 20);
  t = t || {}, t.text = t.text || "Start", o.call(this, e, t, n);
 }
 function l(e, t) {
  var n = e.paper.rect(0, 0, 0, 0, 20);
  t = t || {}, t.text = t.text || "End", o.call(this, e, t, n);
 }
 function c(e, t) {
  var n = e.paper.rect(0, 0, 0, 0);
  t = t || {}, o.call(this, e, t, n);
 }
 function u(e, t) {
  var n = e.paper.rect(0, 0, 0, 0);
  t = t || {}, o.call(this, e, t, n), n.attr({
   width: this.text.getBBox().width + 4 * this.getAttr("text-margin")
  }), this.text.attr({
   x: 2 * this.getAttr("text-margin")
  });
  var r = e.paper.rect(0, 0, 0, 0);
  r.attr({
   x: this.getAttr("text-margin"),
   stroke: this.getAttr("element-color"),
   "stroke-width": this.getAttr("line-width"),
   width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
   height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
   fill: this.getAttr("fill")
  }), t.key && (r.node.id = t.key + "i");
  var i = this.getAttr("font"), a = this.getAttr("font-family"), s = this.getAttr("font-weight");
  i && r.attr({
   font: i
  }), a && r.attr({
   "font-family": a
  }), s && r.attr({
   "font-weight": s
  }), t.link && r.attr("href", t.link), t.target && r.attr("target", t.target), this.group.push(r), 
  r.insertBefore(this.text), this.initialize();
 }
 function d(e, t) {
  t = t || {}, o.call(this, e, t), this.textMargin = this.getAttr("text-margin"), 
  this.text.attr({
   x: 3 * this.textMargin
  });
  var r = this.text.getBBox().width + 4 * this.textMargin, i = this.text.getBBox().height + 2 * this.textMargin, a = this.textMargin, s = i / 2, l = {
   x: a,
   y: s
  }, c = [ {
   x: a - this.textMargin,
   y: i
  }, {
   x: a - this.textMargin + r,
   y: i
  }, {
   x: a - this.textMargin + r + 2 * this.textMargin,
   y: 0
  }, {
   x: a - this.textMargin + 2 * this.textMargin,
   y: 0
  }, {
   x: a,
   y: s
  } ], u = n(e, l, c);
  u.attr({
   stroke: this.getAttr("element-color"),
   "stroke-width": this.getAttr("line-width"),
   fill: this.getAttr("fill")
  }), t.link && u.attr("href", t.link), t.target && u.attr("target", t.target), t.key && (u.node.id = t.key), 
  u.node.setAttribute("class", this.getAttr("class")), this.text.attr({
   y: u.getBBox().height / 2
  }), this.group.push(u), u.insertBefore(this.text), this.initialize();
 }
 function p(e, t) {
  t = t || {}, o.call(this, e, t), this.textMargin = this.getAttr("text-margin"), 
  this.yes_direction = "bottom", this.no_direction = "right", t.yes && t.direction_yes && t.no && !t.direction_no ? "right" === t.direction_yes ? (this.no_direction = "bottom", 
  this.yes_direction = "right") : (this.no_direction = "right", this.yes_direction = "bottom") : t.yes && !t.direction_yes && t.no && t.direction_no ? "right" === t.direction_no ? (this.yes_direction = "bottom", 
  this.no_direction = "right") : (this.yes_direction = "right", this.no_direction = "bottom") : (this.yes_direction = "bottom", 
  this.no_direction = "right"), this.yes_direction = this.yes_direction || "bottom", 
  this.no_direction = this.no_direction || "right", this.text.attr({
   x: 2 * this.textMargin
  });
  var r = this.text.getBBox().width + 3 * this.textMargin;
  r += r / 2;
  var i = this.text.getBBox().height + 2 * this.textMargin;
  i += i / 2, i = Math.max(.5 * r, i);
  var a = r / 4, s = i / 4;
  this.text.attr({
   x: a + this.textMargin / 2
  });
  var l = {
   x: a,
   y: s
  }, c = [ {
   x: a - r / 4,
   y: s + i / 4
  }, {
   x: a - r / 4 + r / 2,
   y: s + i / 4 + i / 2
  }, {
   x: a - r / 4 + r,
   y: s + i / 4
  }, {
   x: a - r / 4 + r / 2,
   y: s + i / 4 - i / 2
  }, {
   x: a - r / 4,
   y: s + i / 4
  } ], u = n(e, l, c);
  u.attr({
   stroke: this.getAttr("element-color"),
   "stroke-width": this.getAttr("line-width"),
   fill: this.getAttr("fill")
  }), t.link && u.attr("href", t.link), t.target && u.attr("target", t.target), t.key && (u.node.id = t.key), 
  u.node.setAttribute("class", this.getAttr("class")), this.text.attr({
   y: u.getBBox().height / 2
  }), this.group.push(u), u.insertBefore(this.text), this.initialize();
 }
 function h(e) {
  function t(e) {
   var t = e.indexOf("(") + 1, n = e.indexOf(")");
   return t >= 0 && n >= 0 ? r.symbols[e.substring(0, t - 1)] : r.symbols[e];
  }
  function n(e) {
   var t = "next", n = e.indexOf("(") + 1, r = e.indexOf(")");
   return n >= 0 && r >= 0 && (t = D.substring(n, r), t.indexOf(",") < 0 && "yes" !== t && "no" !== t && (t = "next, " + t)), 
   t;
  }
  e = e || "", e = e.trim();
  for (var r = {
   symbols: {},
   start: null,
   drawSVG: function(e, t) {
    function n(e) {
     if (o[e.key]) return o[e.key];
     switch (e.symbolType) {
     case "start":
      o[e.key] = new s(i, e);
      break;

     case "end":
      o[e.key] = new l(i, e);
      break;

     case "operation":
      o[e.key] = new c(i, e);
      break;

     case "inputoutput":
      o[e.key] = new d(i, e);
      break;

     case "subroutine":
      o[e.key] = new u(i, e);
      break;

     case "condition":
      o[e.key] = new p(i, e);
      break;

     default:
      return new Error("Wrong symbol type!");
     }
     return o[e.key];
    }
    var r = this;
    this.diagram && this.diagram.clean();
    var i = new a(e, t);
    this.diagram = i;
    var o = {};
    !function h(e, t, a) {
     var o = n(e);
     return r.start === e ? i.startWith(o) : t && a && !t.pathOk && (t instanceof p ? (a.yes === e && t.yes(o), 
     a.no === e && t.no(o)) : t.then(o)), o.pathOk ? o : (o instanceof p ? (e.yes && h(e.yes, o, e), 
     e.no && h(e.no, o, e)) : e.next && h(e.next, o, e), o);
    }(this.start), i.render();
   },
   clean: function() {
    this.diagram.clean();
   }
  }, i = [], o = 0, h = 1, f = e.length; f > h; h++) if ("\n" === e[h] && "\\" !== e[h - 1]) {
   var m = e.substring(o, h);
   o = h + 1, i.push(m.replace(/\\\n/g, "\n"));
  }
  o < e.length && i.push(e.substr(o));
  for (var g = 1, b = i.length; b > g; ) {
   var v = i[g];
   v.indexOf(": ") < 0 && v.indexOf("(") < 0 && v.indexOf(")") < 0 && v.indexOf("->") < 0 && v.indexOf("=>") < 0 ? (i[g - 1] += "\n" + v, 
   i.splice(g, 1), b--) : g++;
  }
  for (;i.length > 0; ) {
   var y = i.splice(0, 1)[0];
   if (y.indexOf("=>") >= 0) {
    var x, w = y.split("=>"), S = {
     key: w[0],
     symbolType: w[1],
     text: null,
     link: null,
     target: null,
     flowstate: null
    };
    if (S.symbolType.indexOf(": ") >= 0 && (x = S.symbolType.split(": "), S.symbolType = x[0], 
    S.text = x[1]), S.text && S.text.indexOf(":>") >= 0 ? (x = S.text.split(":>"), S.text = x[0], 
    S.link = x[1]) : S.symbolType.indexOf(":>") >= 0 && (x = S.symbolType.split(":>"), 
    S.symbolType = x[0], S.link = x[1]), S.symbolType.indexOf("\n") >= 0 && (S.symbolType = S.symbolType.split("\n")[0]), 
    S.link) {
     var C = S.link.indexOf("[") + 1, _ = S.link.indexOf("]");
     C >= 0 && _ >= 0 && (S.target = S.link.substring(C, _), S.link = S.link.substring(0, C - 1));
    }
    if (S.text && S.text.indexOf("|") >= 0) {
     var E = S.text.split("|");
     S.text = E[0], S.flowstate = E[1].trim();
    }
    r.symbols[S.key] = S;
   } else if (y.indexOf("->") >= 0) for (var k = y.split("->"), T = 0, N = k.length; N > T; T++) {
    var D = k[T], M = t(D), I = n(D), A = null;
    if (I.indexOf(",") >= 0) {
     var L = I.split(",");
     I = L[0], A = L[1].trim();
    }
    if (r.start || (r.start = M), N > T + 1) {
     var R = k[T + 1];
     M[I] = t(R), M["direction_" + I] = A, A = null;
    }
   }
  }
  return r;
 }
 Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
  if (null === this) throw new TypeError();
  var t = Object(this), n = t.length >>> 0;
  if (0 === n) return -1;
  var r = 0;
  if (arguments.length > 0 && (r = Number(arguments[1]), r != r ? r = 0 : 0 !== r && 1 / 0 != r && r != -1 / 0 && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), 
  r >= n) return -1;
  for (var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0); n > i; i++) if (i in t && t[i] === e) return i;
  return -1;
 }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(e) {
  if (null === this) throw new TypeError();
  var t = Object(this), n = t.length >>> 0;
  if (0 === n) return -1;
  var r = n;
  arguments.length > 1 && (r = Number(arguments[1]), r != r ? r = 0 : 0 !== r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
  for (var i = r >= 0 ? Math.min(r, n - 1) : n - Math.abs(r); i >= 0; i--) if (i in t && t[i] === e) return i;
  return -1;
 }), String.prototype.trim || (String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
 });
 var f = {}, m = {
  x: 0,
  y: 0,
  "line-width": 3,
  "line-length": 50,
  "text-margin": 10,
  "font-size": 14,
  "font-color": "black",
  "line-color": "black",
  "element-color": "black",
  fill: "white",
  "yes-text": "yes",
  "no-text": "no",
  "arrow-end": "block",
  "class": "flowchart",
  symbols: {
   start: {},
   end: {},
   condition: {},
   inputoutput: {},
   operation: {},
   subroutine: {}
  }
 }, g = {
  defaults: e,
  inherits: t
 };
 return a.prototype.handle = function(e) {
  this.symbols.indexOf(e) <= -1 && this.symbols.push(e);
  var t = this;
  return e instanceof p ? (e.yes = function(n) {
   return e.yes_symbol = n, e.no_symbol && (e.pathOk = !0), t.handle(n);
  }, e.no = function(n) {
   return e.no_symbol = n, e.yes_symbol && (e.pathOk = !0), t.handle(n);
  }) : e.then = function(n) {
   return e.next = n, e.pathOk = !0, t.handle(n);
  }, e;
 }, a.prototype.startWith = function(e) {
  return this.start = e, this.handle(e);
 }, a.prototype.render = function() {
  var e, t = 0, n = 0, r = 0, i = 0, a = 0, o = 0;
  for (r = 0, i = this.symbols.length; i > r; r++) e = this.symbols[r], e.width > t && (t = e.width), 
  e.height > n && (n = e.height);
  for (r = 0, i = this.symbols.length; i > r; r++) e = this.symbols[r], e.shiftX(this.options.x + (t - e.width) / 2 + this.options["line-width"]), 
  e.shiftY(this.options.y + (n - e.height) / 2 + this.options["line-width"]);
  for (this.start.render(), r = 0, i = this.symbols.length; i > r; r++) e = this.symbols[r], 
  e.renderLines();
  for (a = this.maxXFromLine, r = 0, i = this.symbols.length; i > r; r++) {
   e = this.symbols[r];
   var s = e.getX() + e.width, l = e.getY() + e.height;
   s > a && (a = s), l > o && (o = l);
  }
  this.paper.setSize(a + this.options["line-width"], o + this.options["line-width"]);
 }, a.prototype.clean = function() {
  if (this.paper) {
   var e = this.paper.canvas;
   e.parentNode.removeChild(e);
  }
 }, o.prototype.getAttr = function(e) {
  if (!this.chart) return void 0;
  var t, n = this.chart.options ? this.chart.options[e] : void 0, r = this.chart.options.symbols ? this.chart.options.symbols[this.symbolType][e] : void 0;
  return this.chart.options.flowstate && this.chart.options.flowstate[this.flowstate] && (t = this.chart.options.flowstate[this.flowstate][e]), 
  t || r || n;
 }, o.prototype.initialize = function() {
  this.group.transform("t" + this.getAttr("line-width") + "," + this.getAttr("line-width")), 
  this.width = this.group.getBBox().width, this.height = this.group.getBBox().height;
 }, o.prototype.getCenter = function() {
  return {
   x: this.getX() + this.width / 2,
   y: this.getY() + this.height / 2
  };
 }, o.prototype.getX = function() {
  return this.group.getBBox().x;
 }, o.prototype.getY = function() {
  return this.group.getBBox().y;
 }, o.prototype.shiftX = function(e) {
  this.group.transform("t" + (this.getX() + e) + "," + this.getY());
 }, o.prototype.setX = function(e) {
  this.group.transform("t" + e + "," + this.getY());
 }, o.prototype.shiftY = function(e) {
  this.group.transform("t" + this.getX() + "," + (this.getY() + e));
 }, o.prototype.setY = function(e) {
  this.group.transform("t" + this.getX() + "," + e);
 }, o.prototype.getTop = function() {
  var e = this.getY(), t = this.getX() + this.width / 2;
  return {
   x: t,
   y: e
  };
 }, o.prototype.getBottom = function() {
  var e = this.getY() + this.height, t = this.getX() + this.width / 2;
  return {
   x: t,
   y: e
  };
 }, o.prototype.getLeft = function() {
  var e = this.getY() + this.group.getBBox().height / 2, t = this.getX();
  return {
   x: t,
   y: e
  };
 }, o.prototype.getRight = function() {
  var e = this.getY() + this.group.getBBox().height / 2, t = this.getX() + this.group.getBBox().width;
  return {
   x: t,
   y: e
  };
 }, o.prototype.render = function() {
  if (this.next) {
   var e = this.getAttr("line-length");
   if ("right" === this.next_direction) {
    var t = this.getRight();
    if (this.next.getLeft(), !this.next.isPositioned) {
     this.next.setY(t.y - this.next.height / 2), this.next.shiftX(this.group.getBBox().x + this.width + e);
     var n = this;
     !function i() {
      for (var t, r = !1, a = 0, o = n.chart.symbols.length; o > a; a++) {
       t = n.chart.symbols[a];
       var s = Math.abs(t.getCenter().x - n.next.getCenter().x);
       if (t.getCenter().y > n.next.getCenter().y && s <= n.next.width / 2) {
        r = !0;
        break;
       }
      }
      r && (n.next.setX(t.getX() + t.width + e), i());
     }(), this.next.isPositioned = !0, this.next.render();
    }
   } else {
    var r = this.getBottom();
    this.next.getTop(), this.next.isPositioned || (this.next.shiftY(this.getY() + this.height + e), 
    this.next.setX(r.x - this.next.width / 2), this.next.isPositioned = !0, this.next.render());
   }
  }
 }, o.prototype.renderLines = function() {
  this.next && (this.next_direction ? this.drawLineTo(this.next, "", this.next_direction) : this.drawLineTo(this.next));
 }, o.prototype.drawLineTo = function(e, t, n) {
  this.connectedTo.indexOf(e) < 0 && this.connectedTo.push(e);
  var a, o = this.getCenter().x, s = this.getCenter().y, l = (this.getTop(), this.getRight()), c = this.getBottom(), u = this.getLeft(), d = e.getCenter().x, p = e.getCenter().y, h = e.getTop(), f = e.getRight(), m = (e.getBottom(), 
  e.getLeft()), g = o === d, b = s === p, v = p > s, y = s > p, x = o > d, w = d > o, S = 0, C = this.getAttr("line-length"), _ = this.getAttr("line-width");
  if (n && "bottom" !== n || !g || !v) if (n && "right" !== n || !b || !w) if (n && "left" !== n || !b || !x) if (n && "right" !== n || !g || !y) if (n && "right" !== n || !g || !v) if (n && "bottom" !== n || !x) if (n && "bottom" !== n || !w) if (n && "right" === n && x) a = r(this.chart, l, [ {
   x: l.x + C / 2,
   y: l.y
  }, {
   x: l.x + C / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.rightStart = !0, e.topEnd = !0, S = l.x + C / 2; else if (n && "right" === n && w) a = r(this.chart, l, [ {
   x: h.x,
   y: l.y
  }, {
   x: h.x,
   y: h.y
  } ], t), this.rightStart = !0, e.topEnd = !0, S = l.x + C / 2; else if (n && "bottom" === n && g && y) a = r(this.chart, c, [ {
   x: c.x,
   y: c.y + C / 2
  }, {
   x: l.x + C / 2,
   y: c.y + C / 2
  }, {
   x: l.x + C / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.bottomStart = !0, e.topEnd = !0, S = c.x + C / 2; else if ("left" === n && g && y) {
   var E = u.x - C / 2;
   m.x < u.x && (E = m.x - C / 2), a = r(this.chart, u, [ {
    x: E,
    y: u.y
   }, {
    x: E,
    y: h.y - C / 2
   }, {
    x: h.x,
    y: h.y - C / 2
   }, {
    x: h.x,
    y: h.y
   } ], t), this.leftStart = !0, e.topEnd = !0, S = u.x;
  } else "left" === n && (a = r(this.chart, u, [ {
   x: h.x + (u.x - h.x) / 2,
   y: u.y
  }, {
   x: h.x + (u.x - h.x) / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.leftStart = !0, e.topEnd = !0, S = u.x); else a = r(this.chart, c, [ {
   x: c.x,
   y: c.y + C / 2
  }, {
   x: c.x + (c.x - h.x) / 2,
   y: c.y + C / 2
  }, {
   x: c.x + (c.x - h.x) / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.bottomStart = !0, e.topEnd = !0, S = c.x + (c.x - h.x) / 2; else a = this.leftEnd && y ? r(this.chart, c, [ {
   x: c.x,
   y: c.y + C / 2
  }, {
   x: c.x + (c.x - h.x) / 2,
   y: c.y + C / 2
  }, {
   x: c.x + (c.x - h.x) / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t) : r(this.chart, c, [ {
   x: c.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.bottomStart = !0, e.topEnd = !0, S = c.x + (c.x - h.x) / 2; else a = r(this.chart, l, [ {
   x: l.x + C / 2,
   y: l.y
  }, {
   x: l.x + C / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.rightStart = !0, e.topEnd = !0, S = l.x + C / 2; else a = r(this.chart, l, [ {
   x: l.x + C / 2,
   y: l.y
  }, {
   x: l.x + C / 2,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y - C / 2
  }, {
   x: h.x,
   y: h.y
  } ], t), this.rightStart = !0, e.topEnd = !0, S = l.x + C / 2; else a = r(this.chart, u, f, t), 
  this.leftStart = !0, e.rightEnd = !0, S = f.x; else a = r(this.chart, l, m, t), 
  this.rightStart = !0, e.leftEnd = !0, S = m.x; else a = r(this.chart, c, h, t), 
  this.bottomStart = !0, e.topEnd = !0, S = c.x;
  if (a) {
   for (var k = 0, T = this.chart.lines.length; T > k; k++) for (var N, D = this.chart.lines[k], M = D.attr("path"), I = a.attr("path"), A = 0, L = M.length - 1; L > A; A++) {
    var R = [];
    R.push([ "M", M[A][1], M[A][2] ]), R.push([ "L", M[A + 1][1], M[A + 1][2] ]);
    for (var P = R[0][1], F = R[0][2], O = R[1][1], B = R[1][2], $ = 0, G = I.length - 1; G > $; $++) {
     var j = [];
     j.push([ "M", I[$][1], I[$][2] ]), j.push([ "L", I[$ + 1][1], I[$ + 1][2] ]);
     var U = j[0][1], H = j[0][2], z = j[1][1], q = j[1][2], V = i(P, F, O, B, U, H, z, q);
     if (V.onLine1 && V.onLine2) {
      var W;
      H === q ? U > z ? (W = [ "L", V.x + 2 * _, H ], I.splice($ + 1, 0, W), W = [ "C", V.x + 2 * _, H, V.x, H - 4 * _, V.x - 2 * _, H ], 
      I.splice($ + 2, 0, W), a.attr("path", I)) : (W = [ "L", V.x - 2 * _, H ], I.splice($ + 1, 0, W), 
      W = [ "C", V.x - 2 * _, H, V.x, H - 4 * _, V.x + 2 * _, H ], I.splice($ + 2, 0, W), 
      a.attr("path", I)) : H > q ? (W = [ "L", U, V.y + 2 * _ ], I.splice($ + 1, 0, W), 
      W = [ "C", U, V.y + 2 * _, U + 4 * _, V.y, U, V.y - 2 * _ ], I.splice($ + 2, 0, W), 
      a.attr("path", I)) : (W = [ "L", U, V.y - 2 * _ ], I.splice($ + 1, 0, W), W = [ "C", U, V.y - 2 * _, U + 4 * _, V.y, U, V.y + 2 * _ ], 
      I.splice($ + 2, 0, W), a.attr("path", I)), $ += 2, N += 2;
     }
    }
   }
   this.chart.lines.push(a);
  }
  (!this.chart.maxXFromLine || this.chart.maxXFromLine && S > this.chart.maxXFromLine) && (this.chart.maxXFromLine = S);
 }, g.inherits(s, o), g.inherits(l, o), g.inherits(c, o), g.inherits(u, o), g.inherits(d, o), 
 d.prototype.getLeft = function() {
  var e = this.getY() + this.group.getBBox().height / 2, t = this.getX() + this.textMargin;
  return {
   x: t,
   y: e
  };
 }, d.prototype.getRight = function() {
  var e = this.getY() + this.group.getBBox().height / 2, t = this.getX() + this.group.getBBox().width - this.textMargin;
  return {
   x: t,
   y: e
  };
 }, g.inherits(p, o), p.prototype.render = function() {
  this.yes_direction && (this[this.yes_direction + "_symbol"] = this.yes_symbol), 
  this.no_direction && (this[this.no_direction + "_symbol"] = this.no_symbol);
  var e = this.getAttr("line-length");
  if (this.bottom_symbol) {
   var t = this.getBottom();
   this.bottom_symbol.getTop(), this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + e), 
   this.bottom_symbol.setX(t.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, 
   this.bottom_symbol.render());
  }
  if (this.right_symbol) {
   var n = this.getRight();
   if (this.right_symbol.getLeft(), !this.right_symbol.isPositioned) {
    this.right_symbol.setY(n.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + e);
    var r = this;
    !function i() {
     for (var t, n = !1, a = 0, o = r.chart.symbols.length; o > a; a++) {
      t = r.chart.symbols[a];
      var s = Math.abs(t.getCenter().x - r.right_symbol.getCenter().x);
      if (t.getCenter().y > r.right_symbol.getCenter().y && s <= r.right_symbol.width / 2) {
       n = !0;
       break;
      }
     }
     n && (r.right_symbol.setX(t.getX() + t.width + e), i());
    }(), this.right_symbol.isPositioned = !0, this.right_symbol.render();
   }
  }
 }, p.prototype.renderLines = function() {
  this.yes_symbol && this.drawLineTo(this.yes_symbol, this.getAttr("yes-text"), this.yes_direction), 
  this.no_symbol && this.drawLineTo(this.no_symbol, this.getAttr("no-text"), this.no_direction);
 }, f.parse = h, f;
}), define("extensions/umlDiagrams", [ "underscore", "utils", "logger", "classes/Extension", "text!html/umlDiagramsSettingsBlock.html", "crel", "Diagram", "flow-chart" ], function(e, t, n, r, i, a, o, s) {
 var l = new r("umlDiagrams", "UML Diagrams", !0);
 return l.settingsBlock = i, l.defaultConfig = {
  flowchartOptions: [ "{", '   "line-width": 2,', '   "font-family": "sans-serif",', '   "font-weight": "normal"', "}" ].join("\n")
 }, l.onLoadSettings = function() {
  t.setInputValue("#textarea-umldiagram-flowchart-options", l.config.flowchartOptions);
 }, l.onSaveSettings = function(e, n) {
  e.flowchartOptions = t.getInputJSONValue("#textarea-umldiagram-flowchart-options", n);
 }, l.onPagedownConfigure = function(t) {
  var n = document.getElementById("preview-contents");
  t.hooks.chain("onPreviewRefresh", function() {
   e.each(n.querySelectorAll(".prettyprint > .language-sequence"), function(e) {
    try {
     var t = o.parse(e.textContent), n = e.parentNode, r = a("div", {
      "class": "sequence-diagram"
     });
     n.parentNode.replaceChild(r, n), t.drawSVG(r, {
      theme: "simple"
     });
    } catch (i) {}
   }), e.each(n.querySelectorAll(".prettyprint > .language-flow"), function(e) {
    try {
     var t = s.parse(e.textContent), n = e.parentNode, r = a("div", {
      "class": "flow-chart"
     });
     n.parentNode.replaceChild(r, n), t.drawSVG(r, JSON.parse(l.config.flowchartOptions));
    } catch (i) {}
   });
  });
 }, l;
}), define("text!html/buttonToc.html", [], function() {
 return '<button class="btn btn-success dropdown-toggle" title="Table of contents" data-toggle="dropdown">\n    <i class="icon-list"></i>\n</button>\n<div class="dropdown-menu pull-right">\n    <h3>Table of contents</h3>\n    <hr>\n    <div class="table-of-contents">\n    </div>\n    <hr>\n</div>\n';
}), define("text!html/tocSettingsBlock.html", [], function() {
 return '<p>Generates a table of contents when a [TOC] marker is found.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-sm-4 control-label" for="input-toc-marker">Marker\n			RegExp</label>\n		<div class="col-sm-7">\n		\n			<input type="text" id="input-toc-marker" class="col-sm-4 form-control">\n		</div>\n	</div>\n	<div class="form-group">\n		<label class="col-sm-4 control-label" for="input-toc-maxdepth">Max depth</label>\n		<div class="col-sm-7 form-inline">\n			<input type="text" id="input-toc-maxdepth"\n				class="col-sm-5 form-control" placeholder="6">\n		</div>\n	</div>\n	<div class="form-group">\n        <label class="col-sm-4 control-label" for="input-toc-button">Button over preview</label>\n        <div class="col-sm-7">\n        <div class="checkbox">\n            <input type="checkbox" id="input-toc-button">\n            </div>\n        </div>\n    </div>\n	\n</div>';
}), define("extensions/toc", [ "underscore", "utils", "classes/Extension", "text!html/buttonToc.html", "text!html/tocSettingsBlock.html" ], function(e, t, n, r, i) {
 function a(e, t, n) {
  this.tagName = e, this.anchor = t, this.text = n, this.children = [];
 }
 function o(t, n) {
  function r() {
   void 0 !== i && (i.children.length > 0 && (i.children = o(i.children, n + 1)), c.push(i));
  }
  n = n || 1;
  var i, s = "H" + n, c = [];
  return e.each(t, function(e) {
   e.tagName != s ? n !== l.config.maxDepth && (void 0 === i && (i = new a()), i.children.push(e)) : (r(), 
   i = e);
  }), r(), c;
 }
 function s() {
  function n(n) {
   for (var i = n.id || t.slugify(n.textContent) || "title", a = i, o = 0; e.has(r, a); ) a = i + "-" + ++o;
   return r[a] = !0, n.id = a, a;
  }
  var r = {}, i = [];
  return e.each(c.querySelectorAll("h1, h2, h3, h4, h5, h6"), function(e) {
   i.push(new a(e.tagName, n(e), e.textContent));
  }), i = o(i), '<div class="toc">\n<ul>\n' + i.join("") + "</ul>\n</div>\n";
 }
 var l = new n("toc", "Table of Contents", !0);
 l.settingsBlock = i, l.defaultConfig = {
  marker: "\\[(TOC|toc)\\]",
  maxDepth: 6,
  button: !0
 }, l.onLoadSettings = function() {
  t.setInputValue("#input-toc-marker", l.config.marker), t.setInputValue("#input-toc-maxdepth", l.config.maxDepth), 
  t.setInputChecked("#input-toc-button", l.config.button);
 }, l.onSaveSettings = function(e, n) {
  e.marker = t.getInputRegExpValue("#input-toc-marker", n), e.maxDepth = t.getInputIntValue("#input-toc-maxdepth"), 
  e.button = t.getInputChecked("#input-toc-button");
 }, l.onCreatePreviewButton = function() {
  return l.config.button ? r : void 0;
 }, a.prototype.childrenToString = function() {
  if (0 === this.children.length) return "";
  var t = "<ul>\n";
  return e.each(this.children, function(e) {
   t += e.toString();
  }), t += "</ul>\n";
 }, a.prototype.toString = function() {
  var e = "<li>";
  return this.anchor && this.text && (e += '<a href="#' + this.anchor + '">' + this.text + "</a>"), 
  e += this.childrenToString() + "</li>\n";
 };
 var c;
 return l.onPagedownConfigure = function(t) {
  c = document.getElementById("preview-contents");
  var n = new RegExp("^\\s*" + l.config.marker + "\\s*$");
  t.hooks.chain("onPreviewRefresh", function() {
   var t = document.querySelectorAll(".table-of-contents, .toc"), r = s();
   e.each(c.getElementsByTagName("p"), function(e) {
    n.test(e.innerHTML) && (e.innerHTML = r);
   }), e.each(t, function(e) {
    e.innerHTML = r;
   });
  });
 }, l.onReady = function() {
  var e = !0;
  $(".preview-panel").on("hide.layout.toggle", function() {
   e = !1;
  }).on("shown.layout.toggle", function() {
   e = !0;
  }), $(".extension-preview-buttons .table-of-contents").on("click", "a", function(t) {
   !e && t.preventDefault();
  });
 }, l;
}), define("extensions/emailConverter", [ "classes/Extension" ], function(e) {
 var t = new e("emailConverter", "Markdown Email", !0);
 return t.settingsBlock = "<p>Converts email addresses in the form &lt;email@example.com&gt; into clickable links.</p>", 
 t.onPagedownConfigure = function(e) {
  e.getConverter().hooks.chain("postConversion", function(e) {
   return e.replace(/<(mailto\:)?([^\s>]+@[^\s>]+\.\S+?)>/g, function(e, t, n) {
    return '<a href="mailto:' + n + '">' + n + "</a>";
   });
  });
 }, t;
}), define("text!html/scrollSyncSettingsBlock.html", [], function() {
 return "<p>Binds together editor and preview scrollbars.</p>\n<blockquote>\n	<p><b>Note:</b> The mapping between Markdown and HTML is based on the\n	position of the title elements (h1, h2...) in the page. Therefore if\n	your document does not contain any title, the mapping will be linear and\n	consequently less accurate.</p>\n</blockquote>";
}), define("extensions/scrollSync", [ "underscore", "classes/Extension", "text!html/scrollSyncSettingsBlock.html" ], function(e, t, n) {
 function r(t, n, r) {
  var i, a = e.find(n, function(e, n) {
   return i = n, t < e.endOffset;
  });
  if (void 0 !== a) {
   var o = (t - a.startOffset) / (a.height || 1), s = r[i];
   return s.startOffset + s.height * o;
  }
 }
 function i(e, t, n, r, i) {
  function a() {
   var l = Date.now(), c = (l - s) / 200;
   if (1 > c) {
    var u = t + o * Math.cos((1 - c) * Math.PI / 2);
    e.scrollTop = u, r(u), d = setTimeout(a, 1);
   } else p = void 0, e.scrollTop = n, setTimeout(i, 100);
  }
  p && (clearTimeout(d), p()), p = i;
  var o = n - t, s = Date.now();
  a();
 }
 var a = new t("scrollSync", "Scroll Sync", !0, !0);
 a.settingsBlock = n;
 var o;
 a.onSectionsCreated = function(e) {
  o = e;
 };
 var s, l, c, u, d, p, h = [], f = [], m = e.debounce(function() {
  h = [];
  var t, n;
  e.each(s.querySelectorAll(".wmd-input-section"), function(e) {
   if (void 0 === t) return void (t = 0);
   e = e.firstChild;
   var n = e.offsetTop;
   h.push({
    startOffset: t,
    endOffset: n,
    height: n - t
   }), t = n;
  }), n = s.scrollHeight, h.push({
   startOffset: t,
   endOffset: n,
   height: n - t
  }), f = [];
  var r;
  e.each(l.querySelectorAll(".wmd-preview-section"), function(e) {
   if (void 0 === r) return void (r = 0);
   var t = e.offsetTop;
   f.push({
    startOffset: r,
    endOffset: t,
    height: t - r
   }), r = t;
  }), n = l.scrollHeight, f.push({
   startOffset: r,
   endOffset: n,
   height: n - r
  }), c = -10, u = -10, w();
 }, 500), g = !0, b = !1, v = !1, y = !1, x = !1, w = e.throttle(function() {
  if (g && 0 !== h.length && h.length === f.length) {
   var t = s.scrollTop;
   0 > t && (t = 0);
   var n, a = l.scrollTop;
   if (b === !0) {
    if (Math.abs(t - c) <= 9) return;
    if (b = !1, c = t, n = r(t, h, f), n = e.min([ n, l.scrollHeight - l.offsetHeight ]), 
    Math.abs(n - a) <= 9) return void (u = a);
    i(l, a, n, function(e) {
     x = !0, u = e;
    }, function() {
     x = !1;
    });
   } else if (v === !0) {
    if (Math.abs(a - u) <= 9) return;
    if (v = !1, u = a, n = r(a, f, h), n = e.min([ n, s.scrollHeight - s.offsetHeight ]), 
    Math.abs(n - t) <= 9) return void (c = t);
    i(s, t, n, function(e) {
     y = !0, c = e;
    }, function() {
     y = !1;
    });
   }
  }
 }, 100);
 a.onLayoutResize = function() {
  b = !0, m();
 }, a.onFileClosed = function() {
  h = [];
 };
 var S = !1;
 a.onReady = function() {
  l = document.querySelector(".preview-container"), s = document.querySelector("#wmd-input"), 
  $(l).scroll(function() {
   x === !1 && S === !1 && (v = !0, b = !1, w()), S = !1;
  }), $(s).scroll(function() {
   y === !1 && (b = !0, v = !1, w());
  }), $(".preview-panel").on("hide.layout.toggle", function() {
   g = !1;
  }).on("shown.layout.toggle", function() {
   g = !0;
  }), $(".extension-preview-buttons .table-of-contents").on("click", "a", function(e) {
   e.preventDefault();
   var t = this.hash, n = $(t);
   if (n.length) {
    var i = n[0].getBoundingClientRect().top - l.getBoundingClientRect().top + l.scrollTop;
    l.scrollTop = i;
    var a = r(i, f, h);
    s.scrollTop = a;
   }
  });
 };
 var C, _;
 return a.onPagedownConfigure = function(e) {
  C = document.getElementById("preview-contents"), e.getConverter().hooks.chain("postConversion", function(e) {
   return _ = C.offsetHeight, C.style.height = _ + "px", e;
  });
 }, a.onPreviewFinished = function() {
  C.style.removeProperty("height");
  var e = C.offsetHeight;
  b = !0, _ > e && (S = !0), m();
 }, a;
}), define("text!html/findReplace.html", [], function() {
 return '<button type="button" class="close button-find-replace-dismiss">×</button>\n<div class="form-inline">\n    <div class="form-group">\n        <label for="input-find-replace-search-for">Search for</label>\n        <input class="form-control" id="input-find-replace-search-for" placeholder="Search for">\n    </div>\n    <div class="form-group">\n        <label for="input-find-replace-replace-with">Replace with</label>\n        <input class="form-control" id="input-find-replace-replace-with" placeholder="Replace with">\n    </div>\n</div>\n<div class="pull-right">\n    <div class="help-block text-right">\n        <span class="found-counter">0</span> found\n    </div>\n    <div>\n        <button type="button" class="btn btn-primary search-button">Search</button>\n        <button type="button" class="btn btn-default replace-button">Replace</button>\n        <button type="button" class="btn btn-default replace-all-button">All</button>\n    </div>\n</div>\n<div class="pull-left">\n    <div class="checkbox">\n        <label>\n            <input type="checkbox" class="checkbox-case-sensitive"> Case sensitive\n        </label>\n    </div>\n    <div class="checkbox">\n        <label>\n            <input type="checkbox" class="checkbox-regexp"> Regular expression\n        </label>\n    </div>\n</div>\n';
}), define("text!html/findReplaceSettingsBlock.html", [], function() {
 return '<p>Helps find and replace text in the current document.</p>\n<div class="form-horizontal">\n	<div class="form-group">\n		<label class="col-sm-5 control-label"\n			for="input-find-replace-shortcut">Shortcut <a href="http://craig.is/killing/mice#keys" target="_blank">(?)</a></label>\n		<div class="col-sm-6">\n			<input type="text" id="input-find-replace-shortcut"\n				class="form-control">\n		</div>\n	</div>\n</div>';
}), define("extensions/findReplace", [ "underscore", "crel", "utils", "classes/Extension", "mousetrap", "rangy", "text!html/findReplace.html", "text!html/findReplaceSettingsBlock.html" ], function(e, t, n, r, i, a, o, s) {
 function l() {
  c(), M.forEach(function(e) {
   try {
    y.undoToRange(e);
   } catch (t) {}
  }), M = [];
 }
 function c() {
  if (w) {
   try {
    w && x.undoToRange(w);
   } catch (e) {}
   w = void 0;
  }
 }
 function u(e) {
  function t(e) {
   return e.container === s.container ? {
    container: o.endContainer.parentElement.nextSibling,
    offsetInContainer: e.offsetInContainer - s.offsetInContainer,
    offset: e.offset
   } : e;
  }
  if (P) {
   var n = _.val(), r = T.prop("checked"), i = N.prop("checked");
   if (e || n != A || r != L || i != R) {
    A = n, L = r, R = i, l();
    var o, s = {};
    I = [];
    var c = 0, u = n.length;
    if (u) try {
     var d = r ? "gm" : "gmi";
     if (n = i ? n : n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), D = new RegExp(n, d), 
     b.getValue().replace(D, function(e, t) {
      I.push({
       start: t,
       end: t + e.length
      });
     }), c = I.length, I.length < 200) {
      var p = [];
      I.forEach(function(e) {
       p.push(e.start), p.push(e.end);
      }), p = b.selectionMgr.findOffsets(p);
      for (var h = 0; h < p.length; h += 2) {
       var f = p[h], m = p[h + 1], g = t(f), v = t(m), x = a.createRange();
       x.setStart(g.container, g.offsetInContainer), x.setEnd(v.container, v.offsetInContainer), 
       s = m, o = x, y.applyToRange(x), M[f.offset] = x;
      }
      b.selectionMgr.hasFocus && b.selectionMgr.updateSelectionRange();
     }
    } catch (w) {}
    k.innerHTML = c;
   }
  }
 }
 function d() {
  v.onEditorPopover(), P = !0, C.show(), _.focus()[0].setSelectionRange(0, _.val().length), 
  b.selectionMgr.adjustTop = 50, b.selectionMgr.adjustBottom = 220, u(!0);
 }
 function p() {
  P = !1, C.hide(), l(), b.selectionMgr.adjustTop = 0, b.selectionMgr.adjustBottom = 0, 
  b.focus();
 }
 function h() {
  c();
  var t = Math.min(b.selectionMgr.selectionStart, b.selectionMgr.selectionEnd), n = e.find(I, function(e) {
   return e.start > t;
  });
  if (n || (n = e.first(I)), n) {
   if (w = M[n.start], !w) {
    var r = b.selectionMgr.createRange(n.start, n.end);
    w = a.createRange(), w.setStart(r.startContainer, r.startOffset), w.setEnd(r.endContainer, r.endOffset);
   }
   x.applyToRange(w), w.start = n.start, w.end = n.end, b.selectionMgr.setSelectionStartEnd(n.start, n.end), 
   b.selectionMgr.updateCursorCoordinates(!0);
  }
 }
 function f() {
  if (!w) return h();
  var e = E.val();
  b.replace(w.start, w.end, e), setTimeout(function() {
   h(), E.focus();
  }, 1);
 }
 function m() {
  var e = E.val();
  b.replaceAll(D, e);
 }
 var g = new r("findReplace", "Find and Replace", !0, !0);
 g.settingsBlock = s, g.defaultConfig = {
  findReplaceShortcut: "mod+f"
 }, g.onLoadSettings = function() {
  n.setInputValue("#input-find-replace-shortcut", g.config.findReplaceShortcut);
 }, g.onSaveSettings = function(e, t) {
  e.findReplaceShortcut = n.getInputTextValue("#input-find-replace-shortcut", t);
 };
 var b;
 g.onEditorCreated = function(e) {
  b = e;
 };
 var v;
 g.onEventMgrCreated = function(e) {
  v = e;
 };
 var y, x, w, S, C, _, E, k, T, N, D, M = [], I = [], A = "", L = !1, R = !1, P = !1;
 return g.onEditorPopover = function() {
  p();
 }, g.onContentChanged = e.bind(u, null, !0), g.onFileOpen = e.bind(u, null, !0), 
 g.onReady = function() {
  y = a.createCssClassApplier("find-replace-highlight", {
   normalize: !1
  }), x = a.createCssClassApplier("find-replace-select", {
   normalize: !1
  }), S = document.querySelector("#wmd-input .editor-content");
  var n = t("div", {
   "class": "find-replace"
  });
  C = $(n).hide(), n.innerHTML = o, document.querySelector(".layout-wrapper-l2").appendChild(n), 
  $(".button-find-replace-dismiss").click(function() {
   p();
  }), k = n.querySelector(".found-counter"), T = C.find(".checkbox-case-sensitive").change(e.bind(u, null, !1)), 
  N = C.find(".checkbox-regexp").change(e.bind(u, null, !1)), C.find(".search-button").click(h), 
  _ = $("#input-find-replace-search-for").keyup(e.bind(u, null, !1)), C.find(".replace-button").click(f), 
  E = $("#input-find-replace-replace-with"), C.find(".replace-all-button").click(m), 
  $().add(_).add(E).keydown(function(e) {
   13 === e.which && (e.preventDefault(), h());
  }), i.bind(g.config.findReplaceShortcut, function(e) {
   var t = b.selectionMgr.getSelectedText();
   t && _.val(t), d(), e.preventDefault();
  });
 }, g;
}), define("text!html/htmlSanitizerSettingsBlock.html", [], function() {
 return '<p>Prevents cross-site-scripting attacks (XSS).</p>\n<p class="alert alert-danger"><i class="icon-attention"></i> <b>Careful:</b> Disable at your own risk!</p>\n';
}), define("extensions/htmlSanitizer", [ "underscore", "utils", "logger", "classes/Extension", "text!html/htmlSanitizerSettingsBlock.html" ], function(e, t, n, r, i) {
 function a(e, n) {
  var r, i = n ? f : h;
  return r = t.urlResolve(e).href, "" === r || r.match(i) ? void 0 : "unsafe:" + r;
 }
 function o(e) {
  var t, n = {}, r = e.split(",");
  for (t = 0; t < r.length; t++) n[r[t]] = !0;
  return n;
 }
 function s(e, t) {
  function n(e, n, i, a) {
   if (n = n && n.toLowerCase(), N[n]) for (;s.last() && D[s.last()]; ) r("", s.last());
   T[n] && s.last() == n && r("", n), a = _[n] || !!a, a || s.push(n);
   var o = {};
   i.replace(b, function(e, t, n, r, i) {
    var a = n || r || i || "";
    o[t] = l(a);
   }), t.start && t.start(n, o, a);
  }
  function r(e, n) {
   var r, i = 0;
   if (n = n && n.toLowerCase()) for (i = s.length - 1; i >= 0 && s[i] != n; i--) ;
   if (i >= 0) {
    for (r = s.length - 1; r >= i; r--) t.end && t.end(s[r]);
    s.length = i;
   }
  }
  var i, a, o, s = [], c = e;
  for (s.last = function() {
   return s[s.length - 1];
  }; e; ) {
   if (a = !0, s.last() && M[s.last()]) e = e.replace(new RegExp("(.*)<\\s*\\/\\s*" + s.last() + "[^>]*>", "i"), function(e, n) {
    return n = n.replace(x, "$1").replace(S, "$1"), t.chars && t.chars(l(n)), "";
   }), r("", s.last()); else if (0 === e.indexOf("<!--") ? (i = e.indexOf("--", 4), 
   i >= 0 && e.lastIndexOf("-->", i) === i && (t.comment && t.comment(e.substring(4, i)), 
   e = e.substring(i + 3), a = !1)) : w.test(e) ? (o = e.match(w), o && (e = e.replace(o[0], ""), 
   a = !1)) : y.test(e) ? (o = e.match(g), o && (e = e.substring(o[0].length), o[0].replace(g, r), 
   a = !1)) : v.test(e) && (o = e.match(m), o && (e = e.substring(o[0].length), o[0].replace(m, n), 
   a = !1)), a) {
    i = e.indexOf("<");
    var u = 0 > i ? e : e.substring(0, i);
    e = 0 > i ? "" : e.substring(i), t.chars && t.chars(l(u));
   }
   if (e == c) return s.reverse(), s.forEach(function(e) {
    p.push("</"), p.push(e), p.push(">");
   });
   c = e;
  }
  r();
 }
 function l(e) {
  if (!e) return "";
  var t = P.exec(e), n = t[1], r = t[3], i = t[2];
  return i && (R.innerHTML = i.replace(/</g, "&lt;"), i = "textContent" in R ? R.textContent : R.innerText), 
  n + i + r;
 }
 function c(e) {
  return e.replace(/&/g, "&amp;").replace(C, function(e) {
   return "&#" + e.charCodeAt(0) + ";";
  }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
 }
 function u(t, n) {
  var r = !1, i = e.bind(t.push, t);
  return {
   start: function(t, a, o) {
    t = t && t.toLowerCase(), !r && M[t] && (r = t), r || I[t] !== !0 || (i("<"), i(t), 
    e.forEach(a, function(e, r) {
     var a = r && r.toLowerCase(), o = "img" === t && "src" === a || "background" === a;
     L[a] !== !0 || A[a] === !0 && !n(e, o) || (i(" "), i(r), i('="'), i(c(e)), i('"'));
    }), i(o ? "/>" : ">"));
   },
   end: function(e) {
    e = e && e.toLowerCase(), r || I[e] !== !0 || (i("</"), i(e), i(">")), e == r && (r = !1);
   },
   chars: function(e) {
    r || i(c(e));
   },
   comment: function(e) {
    r || (i("<!--"), i(c(e)), i("-->"));
   }
  };
 }
 var d = new r("htmlSanitizer", "HTML Sanitizer", !0);
 d.settingsBlock = i;
 var p;
 d.onPagedownConfigure = function(e) {
  var t = e.getConverter();
  t.hooks.chain("postConversion", function(e) {
   return p = [], e.split('<div class="se-preview-section-delimiter"></div>').forEach(function(e) {
    s(e, u(p, function(e, t) {
     return !/^unsafe/.test(a(e, t));
    })), p.push('<div class="se-preview-section-delimiter"></div>');
   }), p.slice(0, -1).join("");
  });
 };
 var h = /^\s*(https?|ftp|mailto|tel|file):/, f = /^\s*(https?|ftp|file):|data:image\//, m = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, g = /^<\s*\/\s*([\w:-]+)[^>]*>/, b = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, v = /^</, y = /^<\s*\//, x = /<!--(.*?)-->/g, w = /<!DOCTYPE([^>]*?)>/i, S = /<!\[CDATA\[(.*?)]]>/g, C = /([^\#-~| |!])/g, _ = o("area,br,col,hr,img,wbr"), E = o("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), k = o("rp,rt"), T = e.extend({}, k, E), N = e.extend({}, E, o("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), D = e.extend({}, k, o("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), M = o("script,style");
 N.iframe = !0;
 var I = e.extend({}, _, N, D, T), A = o("background,cite,href,longdesc,src,usemap"), L = e.extend({}, A, o("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"));
 L.id = !0, L.allowfullscreen = !0;
 var R = document.createElement("pre"), P = /^(\s*)([\s\S]*?)(\s*)$/;
 return d;
}), function(e) {
 var t = "waitForImages";
 e.waitForImages = {
  hasImageProperties: [ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage" ]
 }, e.expr[":"].uncached = function(t) {
  if (!e(t).is('img[src!=""]')) return !1;
  var n = new Image();
  return n.src = t.src, !n.complete;
 }, e.fn.waitForImages = function(n, r, i) {
  var a = 0, o = 0;
  if (e.isPlainObject(arguments[0]) && (i = arguments[0].waitForAll, r = arguments[0].each, 
  n = arguments[0].finished), n = n || e.noop, r = r || e.noop, i = !!i, !e.isFunction(n) || !e.isFunction(r)) throw new TypeError("An invalid callback was supplied.");
  return this.each(function() {
   var s = e(this), l = [], c = e.waitForImages.hasImageProperties || [], u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
   i ? s.find("*").andSelf().each(function() {
    var t = e(this);
    t.is("img:uncached") && l.push({
     src: t.attr("src"),
     element: t[0]
    }), e.each(c, function(e, n) {
     var r, i = t.css(n);
     if (!i) return !0;
     for (;r = u.exec(i); ) l.push({
      src: r[2],
      element: t[0]
     });
    });
   }) : s.find("img:uncached").each(function() {
    l.push({
     src: this.src,
     element: this
    });
   }), a = l.length, o = 0, 0 === a && n.call(s[0]), e.each(l, function(i, l) {
    var c = new Image();
    e(c).bind("load." + t + " error." + t, function(e) {
     return o++, r.call(l.element, o, a, "load" == e.type), o == a ? (n.call(s[0]), !1) : void 0;
    }), c.src = l.src;
   });
  });
 };
}(jQuery), define("jquery-waitforimages", function() {}), define("eventMgr", [ "underscore", "crel", "mousetrap", "utils", "logger", "classes/Extension", "settings", "text!html/settingsExtensionsAccordion.html", "extensions/yamlFrontMatterParser", "extensions/markdownSectionParser", "extensions/partialRendering", "extensions/workingIndicator", "extensions/notifications", "extensions/umlDiagrams", "extensions/markdownExtra", "extensions/toc", "extensions/mathJax", "extensions/emailConverter", "extensions/scrollSync", "extensions/findReplace", "extensions/htmlSanitizer", "jquery-waitforimages" ], function(e, t, n, r, i, a, o) {
 function s(t) {
  return e.chain(d).map(function(e) {
   return e.enabled && e[t];
  }).compact().value();
 }
 function l(t) {
  return h[t] = s(t), function() {
   i.log(t, arguments);
   var n = arguments;
   e.each(h[t], function(t) {
    try {
     t.apply(null, n);
    } catch (r) {
     console.error(e.isObject(r) ? r.stack : r);
    }
   });
  };
 }
 function c(e) {
  u[e] = l(e);
 }
 var u = {}, d = e.chain(arguments).map(function(e) {
  return e instanceof a && e;
 }).compact().value(), p = o.extensionSettings || {};
 e.each(d, function(t) {
  t.config = e.extend({}, t.defaultConfig, p[t.extensionId]), t.enabled = window.viewerMode === !0 && t.disableInViewer === !0 ? !1 : !t.isOptional || void 0 === t.config.enabled || t.config.enabled === !0;
 });
 var h = {};
 u.addListener = function(e, t) {
  try {
   h[e].push(t);
  } catch (n) {
   console.error("No event listener called " + e);
  }
 }, l("onInit")(), u.onLoadSettings = function() {
  i.log("onLoadSettings"), e.each(d, function(e) {
   var t = !e.isOptional || void 0 === e.config.enabled || e.config.enabled === !0;
   r.setInputChecked("#input-enable-extension-" + e.extensionId, t), "markdownExtra" == e.extensionId ? r.setInputChecked("#input-settings-markdown-extra", t) : "mathJax" == e.extensionId && r.setInputChecked("#input-settings-mathjax", t);
   var n = e.onLoadSettings;
   n && n();
  });
 }, u.onSaveSettings = function(t, n) {
  i.log("onSaveSettings"), e.each(d, function(i) {
   var a = e.extend({}, i.defaultConfig);
   a.enabled = r.getInputChecked("#input-enable-extension-" + i.extensionId);
   var o;
   "markdownExtra" == i.extensionId ? (o = r.getInputChecked("#input-settings-markdown-extra"), 
   o != i.enabled && (a.enabled = o)) : "mathJax" == i.extensionId && (o = r.getInputChecked("#input-settings-mathjax"), 
   o != i.enabled && (a.enabled = o));
   var s = i.onSaveSettings;
   s && s(a, n), t[i.extensionId] = a;
  });
 }, c("onMessage"), c("onError"), c("onOfflineChanged"), c("onUserActive"), c("onAsyncRunning"), 
 c("onPeriodicRun"), c("onEditorCreated"), c("onFileMgrCreated"), c("onSynchronizerCreated"), 
 c("onPublisherCreated"), c("onSharingCreated"), c("onEventMgrCreated"), c("onFileCreated"), 
 c("onFileDeleted"), c("onFileSelected"), c("onFileOpen"), c("onFileClosed"), c("onContentChanged"), 
 c("onTitleChanged"), c("onFoldersChanged"), c("onSyncRunning"), c("onSyncSuccess"), 
 c("onSyncImportSuccess"), c("onSyncExportSuccess"), c("onSyncRemoved"), c("onPublishRunning"), 
 c("onPublishSuccess"), c("onNewPublishSuccess"), c("onPublishRemoved"), c("onLayoutCreated"), 
 c("onLayoutResize"), c("onExtensionButtonResize"), c("onPagedownConfigure"), c("onSectionsCreated"), 
 c("onCursorCoordinates"), c("onEditorPopover"), c("onDiscussionCreated"), c("onDiscussionRemoved"), 
 c("onCommentsChanged"), c("onTweet");
 var f, m, g = l("onPreviewFinished"), b = s("onAsyncPreview");
 u.onAsyncPreview = function() {
  function t(n) {
   var i = n.length ? n.shift() : function() {
    setTimeout(function() {
     var t = "";
     e.each(f.children, function(e) {
      t += e.innerHTML;
     });
     var n = r.trim(t), i = n.replace(/ <span class="comment label label-danger">.*?<\/span> /g, "");
     g(n, i);
    }, 10);
   };
   i(function() {
    t(n);
   });
  }
  i.log("onAsyncPreview"), t(b.concat([ function(e) {
   m.waitForImages(e);
  } ]));
 };
 var v = l("onReady");
 return u.onReady = function() {
  f = document.getElementById("preview-contents"), m = $(f);
  var r = function(n) {
   var r = t("div", {
    "class": "btn-group"
   }), i = n();
   return e.isString(i) ? r.innerHTML = i : e.isElement(i) && r.appendChild(i), r;
  };
  window.viewerMode === !1, i.log("onCreatePreviewButton");
  var a = s("onCreatePreviewButton"), o = document.createDocumentFragment();
  e.each(a, function(e) {
   o.appendChild(r(e));
  });
  var l = document.querySelector(".extension-preview-buttons");
  l.appendChild(o), n.bind("escape", function() {
   u.onEditorPopover();
  }), v();
 }, u.onEventMgrCreated(u), u;
}), function() {
 var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, t = self.Prism = {
  util: {
   type: function(e) {
    return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
   },
   clone: function(e) {
    var n = t.util.type(e);
    switch (n) {
    case "Object":
     var r = {};
     for (var i in e) e.hasOwnProperty(i) && (r[i] = t.util.clone(e[i]));
     return r;

    case "Array":
     return e.slice();
    }
    return e;
   }
  },
  languages: {
   extend: function(e, n) {
    var r = t.util.clone(t.languages[e]);
    for (var i in n) r[i] = n[i];
    return r;
   },
   insertBefore: function(e, n, r, i) {
    i = i || t.languages;
    var a = i[e], o = {};
    for (var s in a) if (a.hasOwnProperty(s)) {
     if (s == n) for (var l in r) r.hasOwnProperty(l) && (o[l] = r[l]);
     o[s] = a[s];
    }
    return i[e] = o;
   },
   DFS: function(e, n) {
    for (var r in e) n.call(e, r, e[r]), "Object" === t.util.type(e) && t.languages.DFS(e[r], n);
   }
  },
  highlightAll: function(e, n) {
   for (var r, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), a = 0; r = i[a++]; ) t.highlightElement(r, e === !0, n);
  },
  highlightElement: function(r, i, a) {
   for (var o, s, l = r; l && !e.test(l.className); ) l = l.parentNode;
   if (l && (o = (l.className.match(e) || [ , "" ])[1], s = t.languages[o]), s) {
    r.className = r.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o, 
    l = r.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
    var c = r.textContent;
    if (c) {
     c = c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
     var u = {
      element: r,
      language: o,
      grammar: s,
      code: c
     };
     if (t.hooks.run("before-highlight", u), i && self.Worker) {
      var d = new Worker(t.filename);
      d.onmessage = function(e) {
       u.highlightedCode = n.stringify(JSON.parse(e.data), o), t.hooks.run("before-insert", u), 
       u.element.innerHTML = u.highlightedCode, a && a.call(u.element), t.hooks.run("after-highlight", u);
      }, d.postMessage(JSON.stringify({
       language: u.language,
       code: u.code
      }));
     } else u.highlightedCode = t.highlight(u.code, u.grammar, u.language), t.hooks.run("before-insert", u), 
     u.element.innerHTML = u.highlightedCode, a && a.call(r), t.hooks.run("after-highlight", u);
    }
   }
  },
  highlight: function(e, r, i) {
   return n.stringify(t.tokenize(e, r), i);
  },
  tokenize: function(e, n) {
   var r = t.Token, i = [ e ], a = n.rest;
   if (a) {
    for (var o in a) n[o] = a[o];
    delete n.rest;
   }
   e: for (var o in n) if (n.hasOwnProperty(o) && n[o]) {
    var s = n[o], l = s.inside, c = !!s.lookbehind, u = 0;
    s = s.pattern || s;
    for (var d = 0; d < i.length; d++) {
     var p = i[d];
     if (i.length > e.length) break e;
     if (!(p instanceof r)) {
      s.lastIndex = 0;
      var h = s.exec(p);
      if (h) {
       c && (u = h[1].length);
       var f = h.index - 1 + u, h = h[0].slice(u), m = h.length, g = f + m, b = p.slice(0, f + 1), v = p.slice(g + 1), y = [ d, 1 ];
       b && y.push(b);
       var x = new r(o, l ? t.tokenize(h, l) : h);
       y.push(x), v && y.push(v), Array.prototype.splice.apply(i, y);
      }
     }
    }
   }
   return i;
  },
  hooks: {
   all: {},
   add: function(e, n) {
    var r = t.hooks.all;
    r[e] = r[e] || [], r[e].push(n);
   },
   run: function(e, n) {
    var r = t.hooks.all[e];
    if (r && r.length) for (var i, a = 0; i = r[a++]; ) i(n);
   }
  }
 }, n = t.Token = function(e, t) {
  this.type = e, this.content = t;
 };
 if (n.stringify = function(e, r, i) {
  if ("string" == typeof e) return e;
  if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function(t) {
   return n.stringify(t, r, e);
  }).join("");
  var a = {
   type: e.type,
   content: n.stringify(e.content, r, i),
   tag: "span",
   classes: [ "token", e.type ],
   attributes: {},
   language: r,
   parent: i
  };
  "comment" == a.type && (a.attributes.spellcheck = "true"), t.hooks.run("wrap", a);
  var o = "";
  for (var s in a.attributes) o += s + '="' + (a.attributes[s] || "") + '"';
  return "<" + a.tag + ' class="' + a.classes.join(" ") + '" ' + o + ">" + a.content + "</" + a.tag + ">";
 }, !self.document) return void self.addEventListener("message", function(e) {
  var n = JSON.parse(e.data), r = n.language, i = n.code;
  self.postMessage(JSON.stringify(t.tokenize(i, t.languages[r]))), self.close();
 }, !1);
 var r = document.getElementsByTagName("script");
 r = r[r.length - 1], r && (t.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll));
}(), define("prism-core", function(e) {
 return function() {
  var t;
  return t || e.Prism;
 };
}(this));

var DIFF_DELETE = -1, DIFF_INSERT = 1, DIFF_EQUAL = 0;

diff_match_patch.Diff, diff_match_patch.prototype.diff_main = function(e, t, n, r) {
 "undefined" == typeof r && (r = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : new Date().getTime() + 1e3 * this.Diff_Timeout);
 var i = r;
 if (null == e || null == t) throw new Error("Null input. (diff_main)");
 if (e == t) return e ? [ [ DIFF_EQUAL, e ] ] : [];
 "undefined" == typeof n && (n = !0);
 var a = n, o = this.diff_commonPrefix(e, t), s = e.substring(0, o);
 e = e.substring(o), t = t.substring(o), o = this.diff_commonSuffix(e, t);
 var l = e.substring(e.length - o);
 e = e.substring(0, e.length - o), t = t.substring(0, t.length - o);
 var c = this.diff_compute_(e, t, a, i);
 return s && c.unshift([ DIFF_EQUAL, s ]), l && c.push([ DIFF_EQUAL, l ]), this.diff_cleanupMerge(c), 
 c;
}, diff_match_patch.prototype.diff_compute_ = function(e, t, n, r) {
 var i;
 if (!e) return [ [ DIFF_INSERT, t ] ];
 if (!t) return [ [ DIFF_DELETE, e ] ];
 var a = e.length > t.length ? e : t, o = e.length > t.length ? t : e, s = a.indexOf(o);
 if (-1 != s) return i = [ [ DIFF_INSERT, a.substring(0, s) ], [ DIFF_EQUAL, o ], [ DIFF_INSERT, a.substring(s + o.length) ] ], 
 e.length > t.length && (i[0][0] = i[2][0] = DIFF_DELETE), i;
 if (1 == o.length) return [ [ DIFF_DELETE, e ], [ DIFF_INSERT, t ] ];
 var l = this.diff_halfMatch_(e, t);
 if (l) {
  var c = l[0], u = l[1], d = l[2], p = l[3], h = l[4], f = this.diff_main(c, d, n, r), m = this.diff_main(u, p, n, r);
  return f.concat([ [ DIFF_EQUAL, h ] ], m);
 }
 return n && e.length > 100 && t.length > 100 ? this.diff_lineMode_(e, t, r) : this.diff_bisect_(e, t, r);
}, diff_match_patch.prototype.diff_lineMode_ = function(e, t, n) {
 var r = this.diff_linesToChars_(e, t);
 e = r.chars1, t = r.chars2;
 var i = r.lineArray, a = this.diff_main(e, t, !1, n);
 this.diff_charsToLines_(a, i), this.diff_cleanupSemantic(a), a.push([ DIFF_EQUAL, "" ]);
 for (var o = 0, s = 0, l = 0, c = "", u = ""; o < a.length; ) {
  switch (a[o][0]) {
  case DIFF_INSERT:
   l++, u += a[o][1];
   break;

  case DIFF_DELETE:
   s++, c += a[o][1];
   break;

  case DIFF_EQUAL:
   if (s >= 1 && l >= 1) {
    a.splice(o - s - l, s + l), o = o - s - l;
    for (var r = this.diff_main(c, u, !1, n), d = r.length - 1; d >= 0; d--) a.splice(o, 0, r[d]);
    o += r.length;
   }
   l = 0, s = 0, c = "", u = "";
  }
  o++;
 }
 return a.pop(), a;
}, diff_match_patch.prototype.diff_bisect_ = function(e, t, n) {
 for (var r = e.length, i = t.length, a = Math.ceil((r + i) / 2), o = a, s = 2 * a, l = new Array(s), c = new Array(s), u = 0; s > u; u++) l[u] = -1, 
 c[u] = -1;
 l[o + 1] = 0, c[o + 1] = 0;
 for (var d = r - i, p = d % 2 != 0, h = 0, f = 0, m = 0, g = 0, b = 0; a > b && !(new Date().getTime() > n); b++) {
  for (var v = -b + h; b - f >= v; v += 2) {
   var y, x = o + v;
   y = v == -b || v != b && l[x - 1] < l[x + 1] ? l[x + 1] : l[x - 1] + 1;
   for (var w = y - v; r > y && i > w && e.charAt(y) == t.charAt(w); ) y++, w++;
   if (l[x] = y, y > r) f += 2; else if (w > i) h += 2; else if (p) {
    var S = o + d - v;
    if (S >= 0 && s > S && -1 != c[S]) {
     var C = r - c[S];
     if (y >= C) return this.diff_bisectSplit_(e, t, y, w, n);
    }
   }
  }
  for (var _ = -b + m; b - g >= _; _ += 2) {
   var C, S = o + _;
   C = _ == -b || _ != b && c[S - 1] < c[S + 1] ? c[S + 1] : c[S - 1] + 1;
   for (var E = C - _; r > C && i > E && e.charAt(r - C - 1) == t.charAt(i - E - 1); ) C++, 
   E++;
   if (c[S] = C, C > r) g += 2; else if (E > i) m += 2; else if (!p) {
    var x = o + d - _;
    if (x >= 0 && s > x && -1 != l[x]) {
     var y = l[x], w = o + y - x;
     if (C = r - C, y >= C) return this.diff_bisectSplit_(e, t, y, w, n);
    }
   }
  }
 }
 return [ [ DIFF_DELETE, e ], [ DIFF_INSERT, t ] ];
}, diff_match_patch.prototype.diff_bisectSplit_ = function(e, t, n, r, i) {
 var a = e.substring(0, n), o = t.substring(0, r), s = e.substring(n), l = t.substring(r), c = this.diff_main(a, o, !1, i), u = this.diff_main(s, l, !1, i);
 return c.concat(u);
}, diff_match_patch.prototype.diff_linesToChars_ = function(e, t) {
 function n(e) {
  for (var t = "", n = 0, a = -1, o = r.length; a < e.length - 1; ) {
   a = e.indexOf("\n", n), -1 == a && (a = e.length - 1);
   var s = e.substring(n, a + 1);
   n = a + 1, (i.hasOwnProperty ? i.hasOwnProperty(s) : void 0 !== i[s]) ? t += String.fromCharCode(i[s]) : (t += String.fromCharCode(o), 
   i[s] = o, r[o++] = s);
  }
  return t;
 }
 var r = [], i = {};
 r[0] = "";
 var a = n(e), o = n(t);
 return {
  chars1: a,
  chars2: o,
  lineArray: r
 };
}, diff_match_patch.prototype.diff_charsToLines_ = function(e, t) {
 for (var n = 0; n < e.length; n++) {
  for (var r = e[n][1], i = [], a = 0; a < r.length; a++) i[a] = t[r.charCodeAt(a)];
  e[n][1] = i.join("");
 }
}, diff_match_patch.prototype.diff_commonPrefix = function(e, t) {
 if (!e || !t || e.charAt(0) != t.charAt(0)) return 0;
 for (var n = 0, r = Math.min(e.length, t.length), i = r, a = 0; i > n; ) e.substring(a, i) == t.substring(a, i) ? (n = i, 
 a = n) : r = i, i = Math.floor((r - n) / 2 + n);
 return i;
}, diff_match_patch.prototype.diff_commonSuffix = function(e, t) {
 if (!e || !t || e.charAt(e.length - 1) != t.charAt(t.length - 1)) return 0;
 for (var n = 0, r = Math.min(e.length, t.length), i = r, a = 0; i > n; ) e.substring(e.length - i, e.length - a) == t.substring(t.length - i, t.length - a) ? (n = i, 
 a = n) : r = i, i = Math.floor((r - n) / 2 + n);
 return i;
}, diff_match_patch.prototype.diff_commonOverlap_ = function(e, t) {
 var n = e.length, r = t.length;
 if (0 == n || 0 == r) return 0;
 n > r ? e = e.substring(n - r) : r > n && (t = t.substring(0, n));
 var i = Math.min(n, r);
 if (e == t) return i;
 for (var a = 0, o = 1; ;) {
  var s = e.substring(i - o), l = t.indexOf(s);
  if (-1 == l) return a;
  o += l, (0 == l || e.substring(i - o) == t.substring(0, o)) && (a = o, o++);
 }
}, diff_match_patch.prototype.diff_halfMatch_ = function(e, t) {
 function n(e, t, n) {
  for (var r, i, a, s, l = e.substring(n, n + Math.floor(e.length / 4)), c = -1, u = ""; -1 != (c = t.indexOf(l, c + 1)); ) {
   var d = o.diff_commonPrefix(e.substring(n), t.substring(c)), p = o.diff_commonSuffix(e.substring(0, n), t.substring(0, c));
   u.length < p + d && (u = t.substring(c - p, c) + t.substring(c, c + d), r = e.substring(0, n - p), 
   i = e.substring(n + d), a = t.substring(0, c - p), s = t.substring(c + d));
  }
  return 2 * u.length >= e.length ? [ r, i, a, s, u ] : null;
 }
 if (this.Diff_Timeout <= 0) return null;
 var r = e.length > t.length ? e : t, i = e.length > t.length ? t : e;
 if (r.length < 4 || 2 * i.length < r.length) return null;
 var a, o = this, s = n(r, i, Math.ceil(r.length / 4)), l = n(r, i, Math.ceil(r.length / 2));
 if (!s && !l) return null;
 a = l ? s && s[4].length > l[4].length ? s : l : s;
 var c, u, d, p;
 e.length > t.length ? (c = a[0], u = a[1], d = a[2], p = a[3]) : (d = a[0], p = a[1], 
 c = a[2], u = a[3]);
 var h = a[4];
 return [ c, u, d, p, h ];
}, diff_match_patch.prototype.diff_cleanupSemantic = function(e) {
 for (var t = !1, n = [], r = 0, i = null, a = 0, o = 0, s = 0, l = 0, c = 0; a < e.length; ) e[a][0] == DIFF_EQUAL ? (n[r++] = a, 
 o = l, s = c, l = 0, c = 0, i = e[a][1]) : (e[a][0] == DIFF_INSERT ? l += e[a][1].length : c += e[a][1].length, 
 i && i.length <= Math.max(o, s) && i.length <= Math.max(l, c) && (e.splice(n[r - 1], 0, [ DIFF_DELETE, i ]), 
 e[n[r - 1] + 1][0] = DIFF_INSERT, r--, r--, a = r > 0 ? n[r - 1] : -1, o = 0, s = 0, 
 l = 0, c = 0, i = null, t = !0)), a++;
 for (t && this.diff_cleanupMerge(e), this.diff_cleanupSemanticLossless(e), a = 1; a < e.length; ) {
  if (e[a - 1][0] == DIFF_DELETE && e[a][0] == DIFF_INSERT) {
   var u = e[a - 1][1], d = e[a][1], p = this.diff_commonOverlap_(u, d), h = this.diff_commonOverlap_(d, u);
   p >= h ? (p >= u.length / 2 || p >= d.length / 2) && (e.splice(a, 0, [ DIFF_EQUAL, d.substring(0, p) ]), 
   e[a - 1][1] = u.substring(0, u.length - p), e[a + 1][1] = d.substring(p), a++) : (h >= u.length / 2 || h >= d.length / 2) && (e.splice(a, 0, [ DIFF_EQUAL, u.substring(0, h) ]), 
   e[a - 1][0] = DIFF_INSERT, e[a - 1][1] = d.substring(0, d.length - h), e[a + 1][0] = DIFF_DELETE, 
   e[a + 1][1] = u.substring(h), a++), a++;
  }
  a++;
 }
}, diff_match_patch.prototype.diff_cleanupSemanticLossless = function(e) {
 function t(e, t) {
  if (!e || !t) return 6;
  var n = e.charAt(e.length - 1), r = t.charAt(0), i = n.match(diff_match_patch.nonAlphaNumericRegex_), a = r.match(diff_match_patch.nonAlphaNumericRegex_), o = i && n.match(diff_match_patch.whitespaceRegex_), s = a && r.match(diff_match_patch.whitespaceRegex_), l = o && n.match(diff_match_patch.linebreakRegex_), c = s && r.match(diff_match_patch.linebreakRegex_), u = l && e.match(diff_match_patch.blanklineEndRegex_), d = c && t.match(diff_match_patch.blanklineStartRegex_);
  return u || d ? 5 : l || c ? 4 : i && !o && s ? 3 : o || s ? 2 : i || a ? 1 : 0;
 }
 for (var n = 1; n < e.length - 1; ) {
  if (e[n - 1][0] == DIFF_EQUAL && e[n + 1][0] == DIFF_EQUAL) {
   var r = e[n - 1][1], i = e[n][1], a = e[n + 1][1], o = this.diff_commonSuffix(r, i);
   if (o) {
    var s = i.substring(i.length - o);
    r = r.substring(0, r.length - o), i = s + i.substring(0, i.length - o), a = s + a;
   }
   for (var l = r, c = i, u = a, d = t(r, i) + t(i, a); i.charAt(0) === a.charAt(0); ) {
    r += i.charAt(0), i = i.substring(1) + a.charAt(0), a = a.substring(1);
    var p = t(r, i) + t(i, a);
    p >= d && (d = p, l = r, c = i, u = a);
   }
   e[n - 1][1] != l && (l ? e[n - 1][1] = l : (e.splice(n - 1, 1), n--), e[n][1] = c, 
   u ? e[n + 1][1] = u : (e.splice(n + 1, 1), n--));
  }
  n++;
 }
}, diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, diff_match_patch.whitespaceRegex_ = /\s/, 
diff_match_patch.linebreakRegex_ = /[\r\n]/, diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/, 
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/, diff_match_patch.prototype.diff_cleanupEfficiency = function(e) {
 for (var t = !1, n = [], r = 0, i = null, a = 0, o = !1, s = !1, l = !1, c = !1; a < e.length; ) e[a][0] == DIFF_EQUAL ? (e[a][1].length < this.Diff_EditCost && (l || c) ? (n[r++] = a, 
 o = l, s = c, i = e[a][1]) : (r = 0, i = null), l = c = !1) : (e[a][0] == DIFF_DELETE ? c = !0 : l = !0, 
 i && (o && s && l && c || i.length < this.Diff_EditCost / 2 && o + s + l + c == 3) && (e.splice(n[r - 1], 0, [ DIFF_DELETE, i ]), 
 e[n[r - 1] + 1][0] = DIFF_INSERT, r--, i = null, o && s ? (l = c = !0, r = 0) : (r--, 
 a = r > 0 ? n[r - 1] : -1, l = c = !1), t = !0)), a++;
 t && this.diff_cleanupMerge(e);
}, diff_match_patch.prototype.diff_cleanupMerge = function(e) {
 e.push([ DIFF_EQUAL, "" ]);
 for (var t, n = 0, r = 0, i = 0, a = "", o = ""; n < e.length; ) switch (e[n][0]) {
 case DIFF_INSERT:
  i++, o += e[n][1], n++;
  break;

 case DIFF_DELETE:
  r++, a += e[n][1], n++;
  break;

 case DIFF_EQUAL:
  r + i > 1 ? (0 !== r && 0 !== i && (t = this.diff_commonPrefix(o, a), 0 !== t && (n - r - i > 0 && e[n - r - i - 1][0] == DIFF_EQUAL ? e[n - r - i - 1][1] += o.substring(0, t) : (e.splice(0, 0, [ DIFF_EQUAL, o.substring(0, t) ]), 
  n++), o = o.substring(t), a = a.substring(t)), t = this.diff_commonSuffix(o, a), 
  0 !== t && (e[n][1] = o.substring(o.length - t) + e[n][1], o = o.substring(0, o.length - t), 
  a = a.substring(0, a.length - t))), 0 === r ? e.splice(n - i, r + i, [ DIFF_INSERT, o ]) : 0 === i ? e.splice(n - r, r + i, [ DIFF_DELETE, a ]) : e.splice(n - r - i, r + i, [ DIFF_DELETE, a ], [ DIFF_INSERT, o ]), 
  n = n - r - i + (r ? 1 : 0) + (i ? 1 : 0) + 1) : 0 !== n && e[n - 1][0] == DIFF_EQUAL ? (e[n - 1][1] += e[n][1], 
  e.splice(n, 1)) : n++, i = 0, r = 0, a = "", o = "";
 }
 "" === e[e.length - 1][1] && e.pop();
 var s = !1;
 for (n = 1; n < e.length - 1; ) e[n - 1][0] == DIFF_EQUAL && e[n + 1][0] == DIFF_EQUAL && (e[n][1].substring(e[n][1].length - e[n - 1][1].length) == e[n - 1][1] ? (e[n][1] = e[n - 1][1] + e[n][1].substring(0, e[n][1].length - e[n - 1][1].length), 
 e[n + 1][1] = e[n - 1][1] + e[n + 1][1], e.splice(n - 1, 1), s = !0) : e[n][1].substring(0, e[n + 1][1].length) == e[n + 1][1] && (e[n - 1][1] += e[n + 1][1], 
 e[n][1] = e[n][1].substring(e[n + 1][1].length) + e[n + 1][1], e.splice(n + 1, 1), 
 s = !0)), n++;
 s && this.diff_cleanupMerge(e);
}, diff_match_patch.prototype.diff_xIndex = function(e, t) {
 var n, r = 0, i = 0, a = 0, o = 0;
 for (n = 0; n < e.length && (e[n][0] !== DIFF_INSERT && (r += e[n][1].length), e[n][0] !== DIFF_DELETE && (i += e[n][1].length), 
 !(r > t)); n++) a = r, o = i;
 return e.length != n && e[n][0] === DIFF_DELETE ? o : o + (t - a);
}, diff_match_patch.prototype.diff_prettyHtml = function(e) {
 for (var t = [], n = /&/g, r = /</g, i = />/g, a = /\n/g, o = 0; o < e.length; o++) {
  var s = e[o][0], l = e[o][1], c = l.replace(n, "&amp;").replace(r, "&lt;").replace(i, "&gt;").replace(a, "&para;<br>");
  switch (s) {
  case DIFF_INSERT:
   t[o] = '<ins style="background:#e6ffe6;">' + c + "</ins>";
   break;

  case DIFF_DELETE:
   t[o] = '<del style="background:#ffe6e6;">' + c + "</del>";
   break;

  case DIFF_EQUAL:
   t[o] = "<span>" + c + "</span>";
  }
 }
 return t.join("");
}, diff_match_patch.prototype.diff_text1 = function(e) {
 for (var t = [], n = 0; n < e.length; n++) e[n][0] !== DIFF_INSERT && (t[n] = e[n][1]);
 return t.join("");
}, diff_match_patch.prototype.diff_text2 = function(e) {
 for (var t = [], n = 0; n < e.length; n++) e[n][0] !== DIFF_DELETE && (t[n] = e[n][1]);
 return t.join("");
}, diff_match_patch.prototype.diff_levenshtein = function(e) {
 for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
  var a = e[i][0], o = e[i][1];
  switch (a) {
  case DIFF_INSERT:
   n += o.length;
   break;

  case DIFF_DELETE:
   r += o.length;
   break;

  case DIFF_EQUAL:
   t += Math.max(n, r), n = 0, r = 0;
  }
 }
 return t += Math.max(n, r);
}, diff_match_patch.prototype.diff_toDelta = function(e) {
 for (var t = [], n = 0; n < e.length; n++) switch (e[n][0]) {
 case DIFF_INSERT:
  t[n] = "+" + encodeURI(e[n][1]);
  break;

 case DIFF_DELETE:
  t[n] = "-" + e[n][1].length;
  break;

 case DIFF_EQUAL:
  t[n] = "=" + e[n][1].length;
 }
 return t.join("	").replace(/%20/g, " ");
}, diff_match_patch.prototype.diff_fromDelta = function(e, t) {
 for (var n = [], r = 0, i = 0, a = t.split(/\t/g), o = 0; o < a.length; o++) {
  var s = a[o].substring(1);
  switch (a[o].charAt(0)) {
  case "+":
   try {
    n[r++] = [ DIFF_INSERT, decodeURI(s) ];
   } catch (l) {
    throw new Error("Illegal escape in diff_fromDelta: " + s);
   }
   break;

  case "-":
  case "=":
   var c = parseInt(s, 10);
   if (isNaN(c) || 0 > c) throw new Error("Invalid number in diff_fromDelta: " + s);
   var u = e.substring(i, i += c);
   n[r++] = "=" == a[o].charAt(0) ? [ DIFF_EQUAL, u ] : [ DIFF_DELETE, u ];
   break;

  default:
   if (a[o]) throw new Error("Invalid diff operation in diff_fromDelta: " + a[o]);
  }
 }
 if (i != e.length) throw new Error("Delta length (" + i + ") does not equal source text length (" + e.length + ").");
 return n;
}, diff_match_patch.prototype.match_main = function(e, t, n) {
 if (null == e || null == t || null == n) throw new Error("Null input. (match_main)");
 return n = Math.max(0, Math.min(n, e.length)), e == t ? 0 : e.length ? e.substring(n, n + t.length) == t ? n : this.match_bitap_(e, t, n) : -1;
}, diff_match_patch.prototype.match_bitap_ = function(e, t, n) {
 function r(e, r) {
  var i = e / t.length, o = Math.abs(n - r);
  return a.Match_Distance ? i + o / a.Match_Distance : o ? 1 : i;
 }
 if (t.length > this.Match_MaxBits) throw new Error("Pattern too long for this browser.");
 var i = this.match_alphabet_(t), a = this, o = this.Match_Threshold, s = e.indexOf(t, n);
 -1 != s && (o = Math.min(r(0, s), o), s = e.lastIndexOf(t, n + t.length), -1 != s && (o = Math.min(r(0, s), o)));
 var l = 1 << t.length - 1;
 s = -1;
 for (var c, u, d, p = t.length + e.length, h = 0; h < t.length; h++) {
  for (c = 0, u = p; u > c; ) r(h, n + u) <= o ? c = u : p = u, u = Math.floor((p - c) / 2 + c);
  p = u;
  var f = Math.max(1, n - u + 1), m = Math.min(n + u, e.length) + t.length, g = Array(m + 2);
  g[m + 1] = (1 << h) - 1;
  for (var b = m; b >= f; b--) {
   var v = i[e.charAt(b - 1)];
   if (g[b] = 0 === h ? (g[b + 1] << 1 | 1) & v : (g[b + 1] << 1 | 1) & v | ((d[b + 1] | d[b]) << 1 | 1) | d[b + 1], 
   g[b] & l) {
    var y = r(h, b - 1);
    if (o >= y) {
     if (o = y, s = b - 1, !(s > n)) break;
     f = Math.max(1, 2 * n - s);
    }
   }
  }
  if (r(h + 1, n) > o) break;
  d = g;
 }
 return s;
}, diff_match_patch.prototype.match_alphabet_ = function(e) {
 for (var t = {}, n = 0; n < e.length; n++) t[e.charAt(n)] = 0;
 for (var n = 0; n < e.length; n++) t[e.charAt(n)] |= 1 << e.length - n - 1;
 return t;
}, diff_match_patch.prototype.patch_addContext_ = function(e, t) {
 if (0 != t.length) {
  for (var n = t.substring(e.start2, e.start2 + e.length1), r = 0; t.indexOf(n) != t.lastIndexOf(n) && n.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; ) r += this.Patch_Margin, 
  n = t.substring(e.start2 - r, e.start2 + e.length1 + r);
  r += this.Patch_Margin;
  var i = t.substring(e.start2 - r, e.start2);
  i && e.diffs.unshift([ DIFF_EQUAL, i ]);
  var a = t.substring(e.start2 + e.length1, e.start2 + e.length1 + r);
  a && e.diffs.push([ DIFF_EQUAL, a ]), e.start1 -= i.length, e.start2 -= i.length, 
  e.length1 += i.length + a.length, e.length2 += i.length + a.length;
 }
}, diff_match_patch.prototype.patch_make = function(e, t, n) {
 var r, i;
 if ("string" == typeof e && "string" == typeof t && "undefined" == typeof n) r = e, 
 i = this.diff_main(r, t, !0), i.length > 2 && (this.diff_cleanupSemantic(i), this.diff_cleanupEfficiency(i)); else if (e && "object" == typeof e && "undefined" == typeof t && "undefined" == typeof n) i = e, 
 r = this.diff_text1(i); else if ("string" == typeof e && t && "object" == typeof t && "undefined" == typeof n) r = e, 
 i = t; else {
  if ("string" != typeof e || "string" != typeof t || !n || "object" != typeof n) throw new Error("Unknown call format to patch_make.");
  r = e, i = n;
 }
 if (0 === i.length) return [];
 for (var a = [], o = new diff_match_patch.patch_obj(), s = 0, l = 0, c = 0, u = r, d = r, p = 0; p < i.length; p++) {
  var h = i[p][0], f = i[p][1];
  switch (s || h === DIFF_EQUAL || (o.start1 = l, o.start2 = c), h) {
  case DIFF_INSERT:
   o.diffs[s++] = i[p], o.length2 += f.length, d = d.substring(0, c) + f + d.substring(c);
   break;

  case DIFF_DELETE:
   o.length1 += f.length, o.diffs[s++] = i[p], d = d.substring(0, c) + d.substring(c + f.length);
   break;

  case DIFF_EQUAL:
   f.length <= 2 * this.Patch_Margin && s && i.length != p + 1 ? (o.diffs[s++] = i[p], 
   o.length1 += f.length, o.length2 += f.length) : f.length >= 2 * this.Patch_Margin && s && (this.patch_addContext_(o, u), 
   a.push(o), o = new diff_match_patch.patch_obj(), s = 0, u = d, l = c);
  }
  h !== DIFF_INSERT && (l += f.length), h !== DIFF_DELETE && (c += f.length);
 }
 return s && (this.patch_addContext_(o, u), a.push(o)), a;
}, diff_match_patch.prototype.patch_deepCopy = function(e) {
 for (var t = [], n = 0; n < e.length; n++) {
  var r = e[n], i = new diff_match_patch.patch_obj();
  i.diffs = [];
  for (var a = 0; a < r.diffs.length; a++) i.diffs[a] = r.diffs[a].slice();
  i.start1 = r.start1, i.start2 = r.start2, i.length1 = r.length1, i.length2 = r.length2, 
  t[n] = i;
 }
 return t;
}, diff_match_patch.prototype.patch_apply = function(e, t) {
 if (0 == e.length) return [ t, [] ];
 e = this.patch_deepCopy(e);
 var n = this.patch_addPadding(e);
 t = n + t + n, this.patch_splitMax(e);
 for (var r = 0, i = [], a = 0; a < e.length; a++) {
  var o, s = e[a].start2 + r, l = this.diff_text1(e[a].diffs), c = -1;
  if (l.length > this.Match_MaxBits ? (o = this.match_main(t, l.substring(0, this.Match_MaxBits), s), 
  -1 != o && (c = this.match_main(t, l.substring(l.length - this.Match_MaxBits), s + l.length - this.Match_MaxBits), 
  (-1 == c || o >= c) && (o = -1))) : o = this.match_main(t, l, s), -1 == o) i[a] = !1, 
  r -= e[a].length2 - e[a].length1; else {
   i[a] = !0, r = o - s;
   var u;
   if (u = -1 == c ? t.substring(o, o + l.length) : t.substring(o, c + this.Match_MaxBits), 
   l == u) t = t.substring(0, o) + this.diff_text2(e[a].diffs) + t.substring(o + l.length); else {
    var d = this.diff_main(l, u, !1);
    if (l.length > this.Match_MaxBits && this.diff_levenshtein(d) / l.length > this.Patch_DeleteThreshold) i[a] = !1; else {
     this.diff_cleanupSemanticLossless(d);
     for (var p, h = 0, f = 0; f < e[a].diffs.length; f++) {
      var m = e[a].diffs[f];
      m[0] !== DIFF_EQUAL && (p = this.diff_xIndex(d, h)), m[0] === DIFF_INSERT ? t = t.substring(0, o + p) + m[1] + t.substring(o + p) : m[0] === DIFF_DELETE && (t = t.substring(0, o + p) + t.substring(o + this.diff_xIndex(d, h + m[1].length))), 
      m[0] !== DIFF_DELETE && (h += m[1].length);
     }
    }
   }
  }
 }
 return t = t.substring(n.length, t.length - n.length), [ t, i ];
}, diff_match_patch.prototype.patch_addPadding = function(e) {
 for (var t = this.Patch_Margin, n = "", r = 1; t >= r; r++) n += String.fromCharCode(r);
 for (var r = 0; r < e.length; r++) e[r].start1 += t, e[r].start2 += t;
 var i = e[0], a = i.diffs;
 if (0 == a.length || a[0][0] != DIFF_EQUAL) a.unshift([ DIFF_EQUAL, n ]), i.start1 -= t, 
 i.start2 -= t, i.length1 += t, i.length2 += t; else if (t > a[0][1].length) {
  var o = t - a[0][1].length;
  a[0][1] = n.substring(a[0][1].length) + a[0][1], i.start1 -= o, i.start2 -= o, i.length1 += o, 
  i.length2 += o;
 }
 if (i = e[e.length - 1], a = i.diffs, 0 == a.length || a[a.length - 1][0] != DIFF_EQUAL) a.push([ DIFF_EQUAL, n ]), 
 i.length1 += t, i.length2 += t; else if (t > a[a.length - 1][1].length) {
  var o = t - a[a.length - 1][1].length;
  a[a.length - 1][1] += n.substring(0, o), i.length1 += o, i.length2 += o;
 }
 return n;
}, diff_match_patch.prototype.patch_splitMax = function(e) {
 for (var t = this.Match_MaxBits, n = 0; n < e.length; n++) if (!(e[n].length1 <= t)) {
  var r = e[n];
  e.splice(n--, 1);
  for (var i = r.start1, a = r.start2, o = ""; 0 !== r.diffs.length; ) {
   var s = new diff_match_patch.patch_obj(), l = !0;
   for (s.start1 = i - o.length, s.start2 = a - o.length, "" !== o && (s.length1 = s.length2 = o.length, 
   s.diffs.push([ DIFF_EQUAL, o ])); 0 !== r.diffs.length && s.length1 < t - this.Patch_Margin; ) {
    var c = r.diffs[0][0], u = r.diffs[0][1];
    c === DIFF_INSERT ? (s.length2 += u.length, a += u.length, s.diffs.push(r.diffs.shift()), 
    l = !1) : c === DIFF_DELETE && 1 == s.diffs.length && s.diffs[0][0] == DIFF_EQUAL && u.length > 2 * t ? (s.length1 += u.length, 
    i += u.length, l = !1, s.diffs.push([ c, u ]), r.diffs.shift()) : (u = u.substring(0, t - s.length1 - this.Patch_Margin), 
    s.length1 += u.length, i += u.length, c === DIFF_EQUAL ? (s.length2 += u.length, 
    a += u.length) : l = !1, s.diffs.push([ c, u ]), u == r.diffs[0][1] ? r.diffs.shift() : r.diffs[0][1] = r.diffs[0][1].substring(u.length));
   }
   o = this.diff_text2(s.diffs), o = o.substring(o.length - this.Patch_Margin);
   var d = this.diff_text1(r.diffs).substring(0, this.Patch_Margin);
   "" !== d && (s.length1 += d.length, s.length2 += d.length, 0 !== s.diffs.length && s.diffs[s.diffs.length - 1][0] === DIFF_EQUAL ? s.diffs[s.diffs.length - 1][1] += d : s.diffs.push([ DIFF_EQUAL, d ])), 
   l || e.splice(++n, 0, s);
  }
 }
}, diff_match_patch.prototype.patch_toText = function(e) {
 for (var t = [], n = 0; n < e.length; n++) t[n] = e[n];
 return t.join("");
}, diff_match_patch.prototype.patch_fromText = function(e) {
 var t = [];
 if (!e) return t;
 for (var n = e.split("\n"), r = 0, i = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; r < n.length; ) {
  var a = n[r].match(i);
  if (!a) throw new Error("Invalid patch string: " + n[r]);
  var o = new diff_match_patch.patch_obj();
  for (t.push(o), o.start1 = parseInt(a[1], 10), "" === a[2] ? (o.start1--, o.length1 = 1) : "0" == a[2] ? o.length1 = 0 : (o.start1--, 
  o.length1 = parseInt(a[2], 10)), o.start2 = parseInt(a[3], 10), "" === a[4] ? (o.start2--, 
  o.length2 = 1) : "0" == a[4] ? o.length2 = 0 : (o.start2--, o.length2 = parseInt(a[4], 10)), 
  r++; r < n.length; ) {
   var s = n[r].charAt(0);
   try {
    var l = decodeURI(n[r].substring(1));
   } catch (c) {
    throw new Error("Illegal escape in patch_fromText: " + l);
   }
   if ("-" == s) o.diffs.push([ DIFF_DELETE, l ]); else if ("+" == s) o.diffs.push([ DIFF_INSERT, l ]); else if (" " == s) o.diffs.push([ DIFF_EQUAL, l ]); else {
    if ("@" == s) break;
    if ("" !== s) throw new Error('Invalid patch mode "' + s + '" in: ' + l);
   }
   r++;
  }
 }
 return t;
}, diff_match_patch.patch_obj = function() {
 this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
}, diff_match_patch.patch_obj.prototype.toString = function() {
 var e, t;
 e = 0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1, 
 t = 0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2;
 for (var n, r = [ "@@ -" + e + " +" + t + " @@\n" ], i = 0; i < this.diffs.length; i++) {
  switch (this.diffs[i][0]) {
  case DIFF_INSERT:
   n = "+";
   break;

  case DIFF_DELETE:
   n = "-";
   break;

  case DIFF_EQUAL:
   n = " ";
  }
  r[i + 1] = n + encodeURI(this.diffs[i][1]) + "\n";
 }
 return r.join("").replace(/%20/g, " ");
}, this.diff_match_patch = diff_match_patch, this.DIFF_DELETE = DIFF_DELETE, this.DIFF_INSERT = DIFF_INSERT, 
this.DIFF_EQUAL = DIFF_EQUAL, define("diff_match_patch_uncompressed", function(e) {
 return function() {
  var t;
  return t || e.diff_match_patch;
 };
}(this)), !function(e) {
 if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define("jsondiffpatch", e); else {
  var t;
  "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), 
  t.jsondiffpatch = e();
 }
}(function() {
 return function e(t, n, r) {
  function i(o, s) {
   if (!n[o]) {
    if (!t[o]) {
     var l = "function" == typeof require && require;
     if (!s && l) return l(o, !0);
     if (a) return a(o, !0);
     throw new Error("Cannot find module '" + o + "'");
    }
    var c = n[o] = {
     exports: {}
    };
    t[o][0].call(c.exports, function(e) {
     var n = t[o][1][e];
     return i(n ? n : e);
    }, c, c.exports, e, t, n, r);
   }
   return n[o].exports;
  }
  for (var a = "function" == typeof require && require, o = 0; o < r.length; o++) i(r[o]);
  return i;
 }({
  1: [ function(e, t) {
   var n = t.exports = {};
   n.nextTick = function() {
    var e = "undefined" != typeof window && window.setImmediate, t = "undefined" != typeof window && window.postMessage && window.addEventListener;
    if (e) return function(e) {
     return window.setImmediate(e);
    };
    if (t) {
     var n = [];
     return window.addEventListener("message", function(e) {
      var t = e.source;
      if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), 
      n.length > 0)) {
       var r = n.shift();
       r();
      }
     }, !0), function(e) {
      n.push(e), window.postMessage("process-tick", "*");
     };
    }
    return function(e) {
     setTimeout(e, 0);
    };
   }(), n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.binding = function() {
    throw new Error("process.binding is not supported");
   }, n.cwd = function() {
    return "/";
   }, n.chdir = function() {
    throw new Error("process.chdir is not supported");
   };
  }, {} ],
  2: [ function(e, t, n) {
   var r = e("../pipe").Pipe, i = function() {};
   i.prototype.setResult = function(e) {
    return this.result = e, this.hasResult = !0, this;
   }, i.prototype.exit = function() {
    return this.exiting = !0, this;
   }, i.prototype.switchTo = function(e, t) {
    return "string" == typeof e || e instanceof r ? this.nextPipe = e : (this.next = e, 
    t && (this.nextPipe = t)), this;
   }, i.prototype.push = function(e, t) {
    return e.parent = this, "undefined" != typeof t && (e.childName = t), e.root = this.root || this, 
    e.options = e.options || this.options, this.children ? (this.children[this.children.length - 1].next = e, 
    this.children.push(e)) : (this.children = [ e ], this.nextAfterChildren = this.next || null, 
    this.next = e), e.next = this, this;
   }, n.Context = i;
  }, {
   "../pipe": 15
  } ],
  3: [ function(e, t, n) {
   var r = e("./context").Context, i = function(e, t) {
    this.left = e, this.right = t, this.pipe = "diff";
   };
   i.prototype = new r(), n.DiffContext = i;
  }, {
   "./context": 2
  } ],
  4: [ function(e, t, n) {
   var r = e("./context").Context, i = function(e, t) {
    this.left = e, this.delta = t, this.pipe = "patch";
   };
   i.prototype = new r(), n.PatchContext = i;
  }, {
   "./context": 2
  } ],
  5: [ function(e, t, n) {
   var r = e("./context").Context, i = function(e) {
    this.delta = e, this.pipe = "reverse";
   };
   i.prototype = new r(), n.ReverseContext = i;
  }, {
   "./context": 2
  } ],
  6: [ function(e, t) {
   t.exports = function(e, t) {
    var n;
    return "string" == typeof t && (n = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(t)) ? new Date(Date.UTC(+n[1], +n[2] - 1, +n[3], +n[4], +n[5], +n[6])) : t;
   };
  }, {} ],
  7: [ function(e, t, n) {
   var r = e("./processor").Processor, i = e("./pipe").Pipe, a = e("./contexts/diff").DiffContext, o = e("./contexts/patch").PatchContext, s = e("./contexts/reverse").ReverseContext, l = e("./filters/trivial"), c = e("./filters/nested"), u = e("./filters/arrays"), d = e("./filters/dates"), p = e("./filters/texts"), h = function(e) {
    this.processor = new r(e), this.processor.pipe(new i("diff").append(c.collectChildrenDiffFilter, l.diffFilter, d.diffFilter, p.diffFilter, c.objectsDiffFilter, u.diffFilter).shouldHaveResult()), 
    this.processor.pipe(new i("patch").append(c.collectChildrenPatchFilter, u.collectChildrenPatchFilter, l.patchFilter, p.patchFilter, c.patchFilter, u.patchFilter).shouldHaveResult()), 
    this.processor.pipe(new i("reverse").append(c.collectChildrenReverseFilter, u.collectChildrenReverseFilter, l.reverseFilter, p.reverseFilter, c.reverseFilter, u.reverseFilter).shouldHaveResult());
   };
   h.prototype.options = function() {
    return this.processor.options.apply(this.processor, arguments);
   }, h.prototype.diff = function(e, t) {
    return this.processor.process(new a(e, t));
   }, h.prototype.patch = function(e, t) {
    return this.processor.process(new o(e, t));
   }, h.prototype.reverse = function(e) {
    return this.processor.process(new s(e));
   }, h.prototype.unpatch = function(e, t) {
    return this.patch(e, this.reverse(t));
   }, n.DiffPatcher = h;
  }, {
   "./contexts/diff": 3,
   "./contexts/patch": 4,
   "./contexts/reverse": 5,
   "./filters/arrays": 9,
   "./filters/dates": 10,
   "./filters/nested": 12,
   "./filters/texts": 13,
   "./filters/trivial": 14,
   "./pipe": 15,
   "./processor": 16
  } ],
  8: [ function(e, t, n) {
   (function(t) {
    var r = e("./diffpatcher").DiffPatcher;
    n.DiffPatcher = r, n.create = function(e) {
     return new r(e);
    }, n.dateReviver = e("./date-reviver");
    var i;
    n.diff = function() {
     return i || (i = new r()), i.diff.apply(i, arguments);
    }, n.patch = function() {
     return i || (i = new r()), i.patch.apply(i, arguments);
    }, n.unpatch = function() {
     return i || (i = new r()), i.unpatch.apply(i, arguments);
    }, n.reverse = function() {
     return i || (i = new r()), i.reverse.apply(i, arguments);
    };
    var a = "undefined" != typeof t && "string" == typeof t.execPath;
    if (a) {
     var o = e("./formatters/index");
     n.formatters = o, n.console = o.console;
    } else n.homepage = "https://github.com/benjamine/jsondiffpatch", n.version = "0.1.5";
   }).call(this, e("/home/sheila/proj/JsonDiffPatch/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"));
  }, {
   "./date-reviver": 6,
   "./diffpatcher": 7,
   "/home/sheila/proj/JsonDiffPatch/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 1
  } ],
  9: [ function(e, t, n) {
   var r = e("../contexts/diff").DiffContext, i = e("../contexts/patch").PatchContext, a = e("../contexts/reverse").ReverseContext, o = e("./lcs"), s = 3, l = "function" == typeof Array.isArray ? Array.isArray : function(e) {
    return e instanceof Array;
   }, c = "function" == typeof Array.prototype.indexOf ? function(e, t) {
    return e.indexOf(t);
   } : function(e, t) {
    for (var n = e.length, r = 0; n > r; r++) if (e[r] === t) return r;
    return -1;
   }, u = function(e) {
    if (e.leftIsArray) {
     for (var t, n, i, a, l = e.options && e.options.objectHash, u = function(e, t, n, r, i) {
      var a = e[n], o = t[r];
      if (a === o) return !0;
      if ("object" != typeof a || "object" != typeof o) return !1;
      if (!l) return !1;
      var s, c;
      return "number" == typeof n ? (i.hashCache1 = i.hashCache1 || [], s = i.hashCache1[n], 
      "undefined" == typeof s && (i.hashCache1[n] = s = l(a, n))) : s = l(a), "undefined" == typeof s ? !1 : ("number" == typeof r ? (i.hashCache2 = i.hashCache2 || [], 
      c = i.hashCache2[r], "undefined" == typeof c && (i.hashCache2[r] = c = l(o, r))) : c = l(o), 
      "undefined" == typeof c ? !1 : s === c);
     }, d = {}, p = 0, h = 0, f = e.left, m = e.right, g = f.length, b = m.length; g > p && b > p && u(f, m, p, p, d); ) t = p, 
     a = new r(e.left[t], e.right[t]), e.push(a, t), p++;
     for (;g > h + p && b > h + p && u(f, m, g - 1 - h, b - 1 - h, d); ) n = g - 1 - h, 
     i = b - 1 - h, a = new r(e.left[n], e.right[i]), e.push(a, i), h++;
     var v;
     if (p + h === g) {
      if (g === b) return void e.setResult(void 0).exit();
      for (v = v || {
       _t: "a"
      }, t = p; b - h > t; t++) v[t] = [ m[t] ];
      return void e.setResult(v).exit();
     }
     if (p + h === b) {
      for (v = v || {
       _t: "a"
      }, t = p; g - h > t; t++) v["_" + t] = [ f[t], 0, 0 ];
      return void e.setResult(v).exit();
     }
     d = {};
     var y = f.slice(p, g - h), x = m.slice(p, b - h), w = o.get(y, x, u, d), S = [];
     for (v = v || {
      _t: "a"
     }, t = p; g - h > t; t++) c(w.indices1, t - p) < 0 && (v["_" + t] = [ f[t], 0, 0 ], 
     S.push(t));
     var C = !0;
     e.options && e.options.arrays && e.options.arrays.detectMove === !1 && (C = !1);
     var _ = !1;
     e.options && e.options.arrays && e.options.arrays.includeValueOnMove && (_ = !0);
     var E = S.length;
     for (t = p; b - h > t; t++) {
      var k = c(w.indices2, t - p);
      if (0 > k) {
       var T = !1;
       if (C && E > 0) for (n = 0; E > n; n++) if (u(y, x, S[n] - p, t - p, d)) {
        v["_" + S[n]].splice(1, 2, t, s), _ || (v["_" + S[n]][0] = ""), n = S[n], i = t, 
        a = new r(e.left[n], e.right[i]), e.push(a, i), S.splice(n, 1), T = !0;
        break;
       }
       T || (v[t] = [ m[t] ]);
      } else n = w.indices1[k] + p, i = w.indices2[k] + p, a = new r(e.left[n], e.right[i]), 
      e.push(a, i);
     }
     e.setResult(v).exit();
    }
   };
   u.filterName = "arrays";
   var d = {
    numerically: function(e, t) {
     return e - t;
    },
    numericallyBy: function(e) {
     return function(t, n) {
      return t[e] - n[e];
     };
    }
   }, p = function(e) {
    if (e.nested && "a" === e.delta._t) {
     var t, n, r = e.delta, a = e.left, o = [], l = [], c = [];
     for (t in r) if ("_t" !== t) if ("_" === t[0]) {
      if (0 !== r[t][2] && r[t][2] !== s) throw new Error("only removal or move can be applied at original array indices, invalid diff type: " + r[t][2]);
      o.push(parseInt(t.slice(1), 10));
     } else 1 === r[t].length ? l.push({
      index: parseInt(t, 10),
      value: r[t][0]
     }) : c.push({
      index: parseInt(t, 10),
      delta: r[t]
     });
     for (o = o.sort(d.numerically), t = o.length - 1; t >= 0; t--) {
      n = o[t];
      var u = r["_" + n], p = a.splice(n, 1)[0];
      u[2] === s && l.push({
       index: u[1],
       value: p
      });
     }
     l = l.sort(d.numericallyBy("index"));
     var h = l.length;
     for (t = 0; h > t; t++) {
      var f = l[t];
      a.splice(f.index, 0, f.value);
     }
     var m, g = c.length;
     if (g > 0) for (t = 0; g > t; t++) {
      var b = c[t];
      m = new i(e.left[b.index], b.delta), e.push(m, b.index);
     }
     return e.children ? void e.exit() : void e.setResult(e.left).exit();
    }
   };
   p.filterName = "arrays";
   var h = function(e) {
    if (e && e.children && "a" === e.delta._t) {
     for (var t, n = e.children.length, r = 0; n > r; r++) t = e.children[r], e.left[t.childName] = t.result;
     e.setResult(e.left).exit();
    }
   };
   h.filterName = "arraysCollectChildren";
   var f = function(e) {
    if (!e.nested) return void (e.delta[2] === s && (e.newName = "_" + e.delta[1], e.setResult([ e.delta[0], parseInt(e.childName.substr(1), 10), s ]).exit()));
    if ("a" === e.delta._t) {
     var t, n;
     for (t in e.delta) "_t" !== t && (n = new a(e.delta[t]), e.push(n, t));
     e.exit();
    }
   };
   f.filterName = "arrays";
   var m = function(e, t, n) {
    var r = t;
    if ("string" == typeof t && "_" === t[0]) r = parseInt(t.substr(1), 10); else {
     var i = "_" + t;
     if (l(n) && 0 === n[2]) r = i; else for (var a in e) {
      var o = e[a];
      l(o) && o[2] === s && o[1].toString() === t && (r = a.substr(1));
     }
    }
    return r;
   }, g = function(e) {
    if (e && e.children && "a" === e.delta._t) {
     for (var t, n = e.children.length, r = {
      _t: "a"
     }, i = 0; n > i; i++) {
      t = e.children[i];
      var a = t.newName;
      "undefined" == typeof a && (a = m(e.delta, t.childName, t.result)), r[a] !== t.result && (r[a] = t.result);
     }
     e.setResult(r).exit();
    }
   };
   g.filterName = "arraysCollectChildren", n.diffFilter = u, n.patchFilter = p, n.collectChildrenPatchFilter = h, 
   n.reverseFilter = f, n.collectChildrenReverseFilter = g;
  }, {
   "../contexts/diff": 3,
   "../contexts/patch": 4,
   "../contexts/reverse": 5,
   "./lcs": 11
  } ],
  10: [ function(e, t, n) {
   var r = function(e) {
    e.left instanceof Date ? (e.setResult(e.right instanceof Date ? e.left.getTime() !== e.right.getTime() ? [ e.left, e.right ] : void 0 : [ e.left, e.right ]), 
    e.exit()) : e.right instanceof Date && e.setResult([ e.left, e.right ]).exit();
   };
   r.filterName = "dates", n.diffFilter = r;
  }, {} ],
  11: [ function(e, t, n) {
   var r = function(e, t, n, r) {
    return e[n] === t[r];
   }, i = function(e, t, n, r) {
    var i, a, o = e.length, s = t.length, l = [ o + 1 ];
    for (i = 0; o + 1 > i; i++) for (l[i] = [ s + 1 ], a = 0; s + 1 > a; a++) l[i][a] = 0;
    for (l.match = n, i = 1; o + 1 > i; i++) for (a = 1; s + 1 > a; a++) l[i][a] = n(e, t, i - 1, a - 1, r) ? l[i - 1][a - 1] + 1 : Math.max(l[i - 1][a], l[i][a - 1]);
    return l;
   }, a = function(e, t, n, r, i, o) {
    if (0 === r || 0 === i) return {
     sequence: [],
     indices1: [],
     indices2: []
    };
    if (e.match(t, n, r - 1, i - 1, o)) {
     var s = a(e, t, n, r - 1, i - 1, o);
     return s.sequence.push(t[r - 1]), s.indices1.push(r - 1), s.indices2.push(i - 1), 
     s;
    }
    return e[r][i - 1] > e[r - 1][i] ? a(e, t, n, r, i - 1, o) : a(e, t, n, r - 1, i, o);
   }, o = function(e, t, n, o) {
    o = o || {};
    var s = i(e, t, n || r, o), l = a(s, e, t, e.length, t.length, o);
    return "string" == typeof e && "string" == typeof t && (l.sequence = l.sequence.join("")), 
    l;
   };
   n.get = o;
  }, {} ],
  12: [ function(e, t, n) {
   var r = e("../contexts/diff").DiffContext, i = e("../contexts/patch").PatchContext, a = e("../contexts/reverse").ReverseContext, o = function(e) {
    if (e && e.children) {
     for (var t, n = e.children.length, r = e.result, i = 0; n > i; i++) t = e.children[i], 
     "undefined" != typeof t.result && (r = r || {}, r[t.childName] = t.result);
     r && e.leftIsArray && (r._t = "a"), e.setResult(r).exit();
    }
   };
   o.filterName = "collectChildren";
   var s = function(e) {
    if (!e.leftIsArray && "object" === e.leftType) {
     var t, n;
     for (t in e.left) n = new r(e.left[t], e.right[t]), e.push(n, t);
     for (t in e.right) "undefined" == typeof e.left[t] && (n = new r(void 0, e.right[t]), 
     e.push(n, t));
     return e.children && 0 !== e.children.length ? void e.exit() : void e.setResult(void 0).exit();
    }
   };
   s.filterName = "objects";
   var l = function(e) {
    if (e.nested && !e.delta._t) {
     var t, n;
     for (t in e.delta) n = new i(e.left[t], e.delta[t]), e.push(n, t);
     e.exit();
    }
   };
   l.filterName = "objects";
   var c = function(e) {
    if (e && e.children && !e.delta._t) {
     for (var t, n = e.children.length, r = 0; n > r; r++) t = e.children[r], e.left[t.childName] !== t.result && (e.left[t.childName] = t.result);
     e.setResult(e.left).exit();
    }
   };
   c.filterName = "collectChildren";
   var u = function(e) {
    if (e.nested && !e.delta._t) {
     var t, n;
     for (t in e.delta) n = new a(e.delta[t]), e.push(n, t);
     e.exit();
    }
   };
   u.filterName = "objects";
   var d = function(e) {
    if (e && e.children && !e.delta._t) {
     for (var t, n = e.children.length, r = {}, i = 0; n > i; i++) t = e.children[i], 
     r[t.childName] !== t.result && (r[t.childName] = t.result);
     e.setResult(r).exit();
    }
   };
   d.filterName = "collectChildren", n.collectChildrenDiffFilter = o, n.objectsDiffFilter = s, 
   n.patchFilter = l, n.collectChildrenPatchFilter = c, n.reverseFilter = u, n.collectChildrenReverseFilter = d;
  }, {
   "../contexts/diff": 3,
   "../contexts/patch": 4,
   "../contexts/reverse": 5
  } ],
  13: [ function(e, t, n) {
   var r = 2, i = 60, a = null, o = function() {
    if (!a) {
     var t;
     if ("undefined" != typeof diff_match_patch) t = new diff_match_patch(); else if ("function" == typeof e) {
      var n = e("../../external/diff_match_patch_uncompressed");
      t = new n.diff_match_patch();
     }
     if (!t) {
      var r = new Error("text diff_match_patch library not found");
      throw r.diff_match_patch_not_found = !0, r;
     }
     a = {
      diff: function(e, n) {
       return t.patch_toText(t.patch_make(e, n));
      },
      patch: function(e, n) {
       for (var r = t.patch_apply(t.patch_fromText(n), e), i = 0; i < r[1].length; i++) if (!r[1][i]) {
        var a = new Error("text patch failed");
        a.textPatchFailed = !0;
       }
       return r[0];
      }
     };
    }
    return a;
   }, s = function(e) {
    if ("string" === e.leftType) {
     var t = e.options && e.options.textDiff && e.options.textDiff.minLength || i;
     if (e.left.length < t || e.right.length < t) return void e.setResult([ e.left, e.right ]).exit();
     var n = o().diff;
     e.setResult([ n(e.left, e.right), 0, r ]).exit();
    }
   };
   s.filterName = "texts";
   var l = function(e) {
    if (!e.nested && e.delta[2] === r) {
     var t = o().patch;
     e.setResult(t(e.left, e.delta[0])).exit();
    }
   };
   l.filterName = "texts";
   var c = function(e) {
    var t, n, r, i, a, o, s, l, c = null, u = /^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/;
    for (r = e.split("\n"), t = 0, n = r.length; n > t; t++) {
     i = r[t];
     var d = i.slice(0, 1);
     "@" === d ? (c = u.exec(i), o = t, s = null, l = null, r[o] = "@@ -" + c[3] + "," + c[4] + " +" + c[1] + "," + c[2] + " @@") : "+" === d ? (s = t, 
     r[t] = "-" + r[t].slice(1), "+" === r[t - 1].slice(0, 1) && (a = r[t], r[t] = r[t - 1], 
     r[t - 1] = a)) : "-" === d && (l = t, r[t] = "+" + r[t].slice(1));
    }
    return r.join("\n");
   }, u = function(e) {
    e.nested || e.delta[2] === r && e.setResult([ c(e.delta[0]), 0, r ]).exit();
   };
   u.filterName = "texts", n.diffFilter = s, n.patchFilter = l, n.reverseFilter = u;
  }, {} ],
  14: [ function(e, t, n) {
   var r = "function" == typeof Array.isArray ? Array.isArray : function(e) {
    return e instanceof Array;
   }, i = function(e) {
    if (e.left === e.right) return void e.setResult(void 0).exit();
    if ("undefined" == typeof e.left) {
     if ("function" == typeof e.right) throw new Error("functions are not supported");
     return void e.setResult([ e.right ]).exit();
    }
    if ("undefined" == typeof e.right) return void e.setResult([ e.left, 0, 0 ]).exit();
    if ("function" == typeof e.left || "function" == typeof e.right) throw new Error("functions are not supported");
    return e.leftType = null === e.left ? "null" : typeof e.left, e.rightType = null === e.right ? "null" : typeof e.right, 
    e.leftType !== e.rightType ? void e.setResult([ e.left, e.right ]).exit() : "boolean" === e.leftType || "number" === e.leftType ? void e.setResult([ e.left, e.right ]).exit() : ("object" === e.leftType && (e.leftIsArray = r(e.left)), 
    "object" === e.rightType && (e.rightIsArray = r(e.right)), e.leftIsArray !== e.rightIsArray ? void e.setResult([ e.left, e.right ]).exit() : void 0);
   };
   i.filterName = "trivial";
   var a = function(e) {
    return "undefined" == typeof e.delta ? void e.setResult(e.left).exit() : (e.nested = !r(e.delta), 
    e.nested ? void 0 : 1 === e.delta.length ? void e.setResult(e.delta[0]).exit() : 2 === e.delta.length ? void e.setResult(e.delta[1]).exit() : 3 === e.delta.length && 0 === e.delta[2] ? void e.setResult(void 0).exit() : void 0);
   };
   a.filterName = "trivial";
   var o = function(e) {
    return "undefined" == typeof e.delta ? void e.setResult(e.delta).exit() : (e.nested = !r(e.delta), 
    e.nested ? void 0 : 1 === e.delta.length ? void e.setResult([ e.delta[0], 0, 0 ]).exit() : 2 === e.delta.length ? void e.setResult([ e.delta[1], e.delta[0] ]).exit() : 3 === e.delta.length && 0 === e.delta[2] ? void e.setResult([ e.delta[0] ]).exit() : void 0);
   };
   o.filterName = "trivial", n.diffFilter = i, n.patchFilter = a, n.reverseFilter = o;
  }, {} ],
  15: [ function(e, t, n) {
   var r = function(e) {
    this.name = e, this.filters = [];
   };
   r.prototype.process = function(e) {
    if (!this.processor) throw new Error("add this pipe to a processor before using it");
    for (var t = this.debug, n = this.filters.length, r = e, i = 0; n > i; i++) {
     var a = this.filters[i];
     if (t && this.log("filter: " + a.filterName), a(r), "object" == typeof r && r.exiting) {
      r.exiting = !1;
      break;
     }
    }
    !r.next && this.resultCheck && this.resultCheck(r);
   }, r.prototype.log = function(e) {
    console.log("[jsondiffpatch] " + this.name + " pipe, " + e);
   }, r.prototype.append = function() {
    return this.filters.push.apply(this.filters, arguments), this;
   }, r.prototype.prepend = function() {
    return this.filters.unshift.apply(this.filters, arguments), this;
   }, r.prototype.indexOf = function(e) {
    if (!e) throw new Error("a filter name is required");
    for (var t = 0; t < this.filters.length; t++) {
     var n = this.filters[t];
     if (n.filterName === e) return t;
    }
    throw new Error("filter not found: " + e);
   }, r.prototype.list = function() {
    for (var e = [], t = 0; t < this.filters.length; t++) {
     var n = this.filters[t];
     e.push(n.filterName);
    }
    return e;
   }, r.prototype.after = function(e) {
    var t = this.indexOf(e), n = Array.prototype.slice.call(arguments, 1);
    if (!n.length) throw new Error("a filter is required");
    return n.unshift(t + 1, 0), Array.prototype.splice.apply(this.filters, n), this;
   }, r.prototype.before = function(e) {
    var t = this.indexOf(e), n = Array.prototype.slice.call(arguments, 1);
    if (!n.length) throw new Error("a filter is required");
    return n.unshift(t, 0), Array.prototype.splice.apply(this.filters, n), this;
   }, r.prototype.clear = function() {
    return this.filters.length = 0, this;
   }, r.prototype.shouldHaveResult = function(e) {
    if (e === !1) return void (this.resultCheck = null);
    if (!this.resultCheck) {
     var t = this;
     return this.resultCheck = function(e) {
      if (!e.hasResult) {
       console.log(e);
       var n = new Error(t.name + " failed");
       throw n.noResult = !0, n;
      }
     }, this;
    }
   }, n.Pipe = r;
  }, {} ],
  16: [ function(e, t, n) {
   var r = function(e) {
    this.selfOptions = e, this.pipes = {};
   };
   r.prototype.options = function(e) {
    return e && (this.selfOptions = e), this.selfOptions;
   }, r.prototype.pipe = function(e, t) {
    if ("string" == typeof e) {
     if ("undefined" == typeof t) return this.pipes[e];
     this.pipes[e] = t;
    }
    if (e && e.name) {
     if (t = e, t.processor === this) return t;
     this.pipes[t.name] = t;
    }
    return t.processor = this, t;
   }, r.prototype.process = function(e, t) {
    var n = e;
    n.options = this.options();
    for (var r, i, a = t || e.pipe || "default"; a; ) "undefined" != typeof n.nextAfterChildren && (n.next = n.nextAfterChildren, 
    n.nextAfterChildren = null), "string" == typeof a && (a = this.pipe(a)), a.process(n), 
    i = n, r = a, a = null, n && n.next && (n = n.next, a = i.nextPipe || n.pipe || r);
    return n.hasResult ? n.result : void 0;
   }, n.Processor = r;
  }, {} ]
 }, {}, [ 8 ])(8);
}), "undefined" == typeof WeakMap && !function() {
 var e = Object.defineProperty, t = Date.now() % 1e9, n = function() {
  this.name = "__st" + (1e9 * Math.random() >>> 0) + (t++ + "__");
 };
 n.prototype = {
  set: function(t, n) {
   var r = t[this.name];
   r && r[0] === t ? r[1] = n : e(t, this.name, {
    value: [ t, n ],
    writable: !0
   });
  },
  get: function(e) {
   var t;
   return (t = e[this.name]) && t[0] === e ? t[1] : void 0;
  },
  "delete": function(e) {
   this.set(e, void 0);
  }
 }, window.WeakMap = n;
}(), define("WeakMap", function() {}), function(e) {
 function t(e) {
  x.push(e), y || (y = !0, g(r));
 }
 function n(e) {
  return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e;
 }
 function r() {
  y = !1;
  var e = x;
  x = [], e.sort(function(e, t) {
   return e.uid_ - t.uid_;
  });
  var t = !1;
  e.forEach(function(e) {
   var n = e.takeRecords();
   i(e), n.length && (e.callback_(n, e), t = !0);
  }), t && r();
 }
 function i(e) {
  e.nodes_.forEach(function(t) {
   var n = m.get(t);
   n && n.forEach(function(t) {
    t.observer === e && t.removeTransientObservers();
   });
  });
 }
 function a(e, t) {
  for (var n = e; n; n = n.parentNode) {
   var r = m.get(n);
   if (r) for (var i = 0; i < r.length; i++) {
    var a = r[i], o = a.options;
    if (n === e || o.subtree) {
     var s = t(o);
     s && a.enqueue(s);
    }
   }
  }
 }
 function o(e) {
  this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++w;
 }
 function s(e, t) {
  this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, 
  this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, 
  this.oldValue = null;
 }
 function l(e) {
  var t = new s(e.type, e.target);
  return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), 
  t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, 
  t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t;
 }
 function c(e, t) {
  return S = new s(e, t);
 }
 function u(e) {
  return C ? C : (C = l(S), C.oldValue = e, C);
 }
 function d() {
  S = C = void 0;
 }
 function p(e) {
  return e === C || e === S;
 }
 function h(e, t) {
  return e === t ? e : C && p(e) ? C : null;
 }
 function f(e, t, n) {
  this.observer = e, this.target = t, this.options = n, this.transientObservedNodes = [];
 }
 var m = new WeakMap(), g = window.msSetImmediate;
 if (!g) {
  var b = [], v = String(Math.random());
  window.addEventListener("message", function(e) {
   if (e.data === v) {
    var t = b;
    b = [], t.forEach(function(e) {
     e();
    });
   }
  }), g = function(e) {
   b.push(e), window.postMessage(v, "*");
  };
 }
 var y = !1, x = [], w = 0;
 o.prototype = {
  observe: function(e, t) {
   if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData) throw new SyntaxError();
   var r = m.get(e);
   r || m.set(e, r = []);
   for (var i, a = 0; a < r.length; a++) if (r[a].observer === this) {
    i = r[a], i.removeListeners(), i.options = t;
    break;
   }
   i || (i = new f(this, e, t), r.push(i), this.nodes_.push(e)), i.addListeners();
  },
  disconnect: function() {
   this.nodes_.forEach(function(e) {
    for (var t = m.get(e), n = 0; n < t.length; n++) {
     var r = t[n];
     if (r.observer === this) {
      r.removeListeners(), t.splice(n, 1);
      break;
     }
    }
   }, this), this.records_ = [];
  },
  takeRecords: function() {
   var e = this.records_;
   return this.records_ = [], e;
  }
 };
 var S, C;
 f.prototype = {
  enqueue: function(e) {
   var n = this.observer.records_, r = n.length;
   if (n.length > 0) {
    var i = n[r - 1], a = h(i, e);
    if (a) return void (n[r - 1] = a);
   } else t(this.observer);
   n[r] = e;
  },
  addListeners: function() {
   this.addListeners_(this.target);
  },
  addListeners_: function(e) {
   var t = this.options;
   t.attributes && e.addEventListener("DOMAttrModified", this, !0), t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0), 
   t.childList && e.addEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0);
  },
  removeListeners: function() {
   this.removeListeners_(this.target);
  },
  removeListeners_: function(e) {
   var t = this.options;
   t.attributes && e.removeEventListener("DOMAttrModified", this, !0), t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0), 
   t.childList && e.removeEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0);
  },
  addTransientObserver: function(e) {
   if (e !== this.target) {
    this.addListeners_(e), this.transientObservedNodes.push(e);
    var t = m.get(e);
    t || m.set(e, t = []), t.push(this);
   }
  },
  removeTransientObservers: function() {
   var e = this.transientObservedNodes;
   this.transientObservedNodes = [], e.forEach(function(e) {
    this.removeListeners_(e);
    for (var t = m.get(e), n = 0; n < t.length; n++) if (t[n] === this) {
     t.splice(n, 1);
     break;
    }
   }, this);
  },
  handleEvent: function(e) {
   switch (e.stopImmediatePropagation(), e.type) {
   case "DOMAttrModified":
    var t = e.attrName, n = e.relatedNode.namespaceURI, r = e.target, i = new c("attributes", r);
    i.attributeName = t, i.attributeNamespace = n;
    var o = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
    a(r, function(e) {
     return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? u(o) : i;
    });
    break;

   case "DOMCharacterDataModified":
    var r = e.target, i = c("characterData", r), o = e.prevValue;
    a(r, function(e) {
     return e.characterData ? e.characterDataOldValue ? u(o) : i : void 0;
    });
    break;

   case "DOMNodeRemoved":
    this.addTransientObserver(e.target);

   case "DOMNodeInserted":
    var s, l, r = e.relatedNode, p = e.target;
    "DOMNodeInserted" === e.type ? (s = [ p ], l = []) : (s = [], l = [ p ]);
    var h = p.previousSibling, f = p.nextSibling, i = c("childList", r);
    i.addedNodes = s, i.removedNodes = l, i.previousSibling = h, i.nextSibling = f, 
    a(r, function(e) {
     return e.childList ? i : void 0;
    });
   }
   d();
  }
 }, e.JsMutationObserver = o, e.MutationObserver || (e.MutationObserver = o);
}(this), define("MutationObservers", function() {}), Prism.languages.markup = {
 comment: /&lt;!--[\w\W]*?-->/g,
 prolog: /&lt;\?.+?\?>/,
 doctype: /&lt;!DOCTYPE.+?>/,
 cdata: /&lt;!\[CDATA\[[\w\W]*?]]>/i,
 tag: {
  pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
  inside: {
   tag: {
    pattern: /^&lt;\/?[\w:-]+/i,
    inside: {
     punctuation: /^&lt;\/?/,
     namespace: /^[\w-]+?:/
    }
   },
   "attr-value": {
    pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
    inside: {
     punctuation: /=|>|"/g
    }
   },
   punctuation: /\/?>/g,
   "attr-name": {
    pattern: /[\w:-]+/g,
    inside: {
     namespace: /^[\w-]+?:/
    }
   }
  }
 },
 entity: /&amp;#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function(e) {
 "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
}), define("bower-libs/prism/components/prism-markup", function() {}), Prism.languages.latex = {
 keyword: /\\(?:[^a-zA-Z]|[a-zA-Z]+)/g,
 lparen: /[[({]/g,
 rparen: /[\])}]/g,
 comment: /%.*/g
}, define("libs/prism-latex", function() {}), Prism.languages.md = function() {
 var e = "(&amp;|[-A-Z0-9+@#/%?=~_|[\\]()!:,.;])", t = "(&amp;|[-A-Z0-9+@#/%=~_|[\\])])", n = new RegExp("(https?|ftp)(://" + e + "*" + t + ")(?=$|\\W)", "gi"), r = /(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)/gi, i = Prism.languages.latex, a = /\n/gm, o = {};
 o["pre gfm"] = {
  pattern: /^`{3}.*\n(?:[\s\S]*?)\n`{3} *$/gm,
  inside: {
   "md md-pre": /`{3}/,
   lf: a
  }
 }, o["h1 alt"] = {
  pattern: /^(.+)[ \t]*\n=+[ \t]*$/gm,
  inside: {}
 }, o["h2 alt"] = {
  pattern: /^(.+)[ \t]*\n-+[ \t]*$/gm,
  inside: {}
 };
 for (var s = 6; s >= 1; s--) o["h" + s] = {
  pattern: new RegExp("^#{" + s + "}.+$", "gm"),
  inside: {
   "md md-hash": new RegExp("^#{" + s + "}")
  }
 };
 o.li = {
  pattern: /^[ \t]*([*+\-]|\d+\.)[ \t].+(?:\n|[ \t].*\n)*/gm,
  inside: {
   "md md-li": /^[ \t]*([*+\-]|\d+\.)[ \t]/m,
   "pre gfm": {
    pattern: /^((?: {4}|\t)+)`{3}.*\n(?:[\s\S]*?)\n\1`{3} *$/gm,
    inside: {
     "md md-pre": /`{3}/,
     lf: a
    }
   },
   lf: a
  }
 }, o.pre = {
  pattern: /(^|(?:^|(?:^|\n)(?![ \t]*([*+\-]|\d+\.)[ \t]).*\n)\s*?\n)(\s*(?: {4}|\t).*(?:\n|$))+/g,
  lookbehind: !0,
  inside: {
   lf: a
  }
 }, o.table = {
  pattern: new RegExp([ "^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm"),
  inside: {
   lf: a
  }
 }, o["table alt"] = {
  pattern: new RegExp([ "^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)" ].join(""), "gm"),
  inside: {
   lf: a
  }
 }, o.hr = {
  pattern: /^([*\-_] *){3,}$/gm
 }, o.blockquote = {
  pattern: /^ {0,3}> *[^\n]+$/gm,
  inside: {
   "md md-gt": /^ {0,3}> */,
   li: o.li
  }
 }, o["math block"] = {
  pattern: /(\$\$|\\\\\[|\\\\\\\\\()[\s\S]*?(\$\$|\\\\\]|\\\\\\\\\))/g,
  inside: {
   "md md-bracket-start": /^(\$\$|\\\\\[|\\\\\\\\\()/,
   "md md-bracket-end": /(\$\$|\\\\\]|\\\\\\\\\))/,
   lf: a,
   rest: i
  }
 }, o["latex block"] = {
  pattern: /\\?\\begin\{([a-z]*\*?)\}[\s\S]*?\\?\\end\{\1\}/g,
  inside: {
   keyword: /\\?\\(begin|end)/,
   lf: a,
   rest: i
  }
 }, o.fndef = {
  pattern: /^ {0,3}\[\^.*?\]:[ \t]+.*$/gm,
  inside: {
   "ref-id": {
    pattern: /\[\^.*?\]/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-bracket-end": /\]/
    }
   }
  }
 }, o.linkdef = {
  pattern: /^ {0,3}\[.*?\]:[ \t]+.*$/gm,
  inside: {
   "link-id": {
    pattern: /\[.*?\]/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-bracket-end": /\]/
    }
   },
   url: n,
   linktitle: /['\"\(][^\'\"\)]*['\"\)]/
  }
 }, o.p = {
  pattern: /.+/g,
  inside: {
   "md md-toc": /^\s*\[(toc|TOC)\]\s*$/g
  }
 }, o.lf = /^\n$/gm, o.img = {
  pattern: /!\[[^\]]*\]\([^\)]+\)/g,
  inside: {
   "md md-bang": /^!/,
   "md md-bracket-start": /\[/,
   "md md-alt": /[^\[]+(?=\])/,
   "md md-bracket-end": /\](?=\()/,
   "md img-parens": {
    pattern: /\([^\)]+\)/,
    inside: {
     "md md-paren-start": /^\(/,
     "md md-title": /(['‘][^'’]*['’]|["“][^"”]*["”])(?=\)$)/,
     "md md-src": /[^\('" \t]+(?=[\)'" \t])/,
     "md md-paren-end": /\)$/
    }
   }
  }
 }, o.link = {
  pattern: /\[(?:(\\.)|[^\[\]])*\]\([^\(\)\s]+(\(\S*?\))??[^\(\)\s]*?(\s(['‘][^'’]*['’]|["“][^"”]*["”]))?\)/gm,
  inside: {
   "md md-bracket-start": {
    pattern: /(^|[^\\])\[/,
    lookbehind: !0
   },
   "md md-underlined-text": {
    pattern: /(?:(\\.)|[^\[\]])+(?=\])/
   },
   "md md-bracket-end": /\]\s?\(/,
   "md md-paren-end": /\)$/,
   "md md-href": /.*/
  }
 }, o.fn = {
  pattern: /\[\^(.*?)\]/g,
  inside: {
   ref: {
    pattern: /^\[[^\[\]]+\] ?/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-ref": /^[^\[\]]+/,
     "md md-bracket-end": /\]/
    }
   }
  }
 }, o.imgref = {
  pattern: /!\[(.*?)\] ?\[(.*?)\]/g,
  inside: {
   "md md-bang": /^!/,
   "ref-end": {
    pattern: /\[[^\[\]]+\]$/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-href": /[^\[\]]+(?=]$)/,
     "md md-bracket-end": /\]/
    }
   },
   "ref-start": {
    pattern: /^\[[^\[\]]+\] ?/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-alt": /^[^\[\]]+/,
     "md md-bracket-end": /\]/
    }
   }
  }
 }, o.linkref = {
  pattern: /\[(.*?)\] ?\[(.*?)\]/g,
  inside: {
   "ref-end": {
    pattern: /\[[^\[\]]+\]$/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-href": /[^\[\]]+(?=]$)/,
     "md md-bracket-end": /\]/
    }
   },
   "ref-start": {
    pattern: /^\[[^\[\]]+\] ?/,
    inside: {
     "md md-bracket-start": /\[/,
     "md md-underlined-text": /^[^\[\]]+/,
     "md md-bracket-end": /\]/
    }
   }
  }
 }, o.code = {
  pattern: /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/g,
  lookbehind: !0,
  inside: {
   "md md-code": /`/
  }
 }, o.math = {
  pattern: /\$.*?\$/g,
  inside: {
   "md md-bracket-start": /^\$/,
   "md md-bracket-end": /\$$/,
   rest: i
  }
 }, o.strong = {
  pattern: /([_\*])\1((?!\1{2}).)*\1{2}/g,
  inside: {
   "md md-strong": /([_\*])\1/g
  }
 }, o.em = {
  pattern: /(^|[^\\])(\*|_)(\S[^\2]*?)??[^\s\\]+?\2/g,
  lookbehind: !0,
  inside: {
   "md md-em md-start": /^(\*|_)/,
   "md md-em md-close": /(\*|_)$/
  }
 }, o.strike = {
  pattern: /(^|\n|\W)(~~)(?=\S)([^\r]*?\S)\2/gm,
  lookbehind: !0,
  inside: {
   "md md-s": /(~~)/,
   "md-strike-text": /[^~]+/
  }
 };
 for (var l = {
  code: o.code,
  math: o.math,
  fn: o.fn,
  img: o.img,
  link: o.link,
  imgref: o.imgref,
  linkref: o.linkref,
  url: n,
  email: r,
  strong: o.strong,
  em: o.em,
  strike: o.strike,
  conflict: /⧸⧸/g,
  comment: Prism.languages.markup.comment,
  tag: Prism.languages.markup.tag,
  entity: Prism.languages.markup.entity
 }, c = 6; c >= 1; c--) o["h" + c].inside.rest = l;
 o["h1 alt"].inside.rest = l, o["h2 alt"].inside.rest = l, o.table.inside.rest = l, 
 o["table alt"].inside.rest = l, o.p.inside.rest = l, o.blockquote.inside.rest = l, 
 o.li.inside.rest = l, o.fndef.inside.rest = l, l = {
  code: o.code,
  fn: o.fn,
  link: o.link,
  linkref: o.linkref,
  conflict: /⧸⧸/g
 }, o.strong.inside.rest = l, o.em.inside.rest = l, o.strike.inside.rest = l;
 var u = {
  code: o.code,
  strong: o.strong,
  em: o.em,
  strike: o.strike,
  conflict: /⧸⧸/g,
  comment: Prism.languages.markup.comment,
  tag: Prism.languages.markup.tag,
  entity: Prism.languages.markup.entity
 };
 return o.link.inside["md md-underlined-text"].inside = u, o.linkref.inside["ref-start"].inside["md md-underlined-text"].inside = u, 
 o;
}(), define("libs/prism-markdown", function() {}), define("editor", [ "underscore", "utils", "settings", "eventMgr", "prism-core", "diff_match_patch_uncompressed", "jsondiffpatch", "crel", "rangy", "MutationObservers", "libs/prism-markdown" ], function(e, t, n, r, i, a, o, s, l) {
 function c() {
  this.isWatching = !1;
  var e;
  this.startWatching = function() {
   this.isWatching = !0, e = e || new MutationObserver(w), e.observe(D, {
    childList: !0,
    subtree: !0,
    characterData: !0
   });
  }, this.stopWatching = function() {
   e.disconnect(), this.isWatching = !1;
  }, this.noWatch = function(e) {
   this.isWatching === !0 ? (this.stopWatching(), e(), this.startWatching()) : e();
  };
 }
 function u() {
  var i = this, a = 0, o = 0;
  this.selectionStart = 0, this.selectionEnd = 0, this.cursorY = 0, this.adjustTop = 0, 
  this.adjustBottom = 0, this.findOffsets = function(e) {
   var t = [];
   if (!e.length) return t;
   for (var n = e.shift(), r = document.createTreeWalker(D, 4, null, !1), i = "", a = 0; r.nextNode(); ) {
    i = r.currentNode.nodeValue || "";
    for (var o = a + i.length; o > n; ) {
     if (t.push({
      container: r.currentNode,
      offsetInContainer: n - a,
      offset: n
     }), !e.length) return t;
     n = e.shift();
    }
    a = o;
   }
   do t.push({
    container: r.currentNode,
    offsetInContainer: i.length,
    offset: n
   }), n = e.shift(); while (n);
   return t;
  }, this.createRange = function(t, n) {
   t = 0 > t ? 0 : t, n = 0 > n ? 0 : n;
   var r, i, a = document.createRange(), o = [];
   e.isNumber(t) && (o.push(t), r = o.length - 1), e.isNumber(n) && (o.push(n), i = o.length - 1), 
   o = this.findOffsets(o);
   var s = e.isObject(t) ? t : o[r];
   a.setStart(s.container, s.offsetInContainer);
   var l = s;
   return n && n != t && (l = e.isObject(n) ? n : o[i]), a.setEnd(l.container, l.offsetInContainer), 
   a;
  };
  var s, c = t.debounce(function() {
   N.toggleClass("has-selection", this.selectionStart !== this.selectionEnd);
   var e = this.getCoordinates(this.selectionEnd, this.selectionEndContainer, this.selectionEndOffset);
   if (this.cursorY !== e.y && (this.cursorY = e.y, r.onCursorCoordinates(e.x, e.y)), 
   s) {
    var t, i;
    if (t = i = T.offsetHeight / 2 * n.cursorFocusRatio, t = this.adjustTop || t, i = this.adjustBottom || t, 
    t && i) {
     var a = T.scrollTop + t, o = T.scrollTop + T.offsetHeight - i;
     V.cursorY < a ? T.scrollTop += V.cursorY - a : V.cursorY > o && (T.scrollTop += V.cursorY - o);
    }
   }
   s = !1;
  }, this);
  this.updateCursorCoordinates = function(e) {
   s = s || e, c();
  }, this.updateSelectionRange = function() {
   var e = Math.min(this.selectionStart, this.selectionEnd), t = Math.max(this.selectionStart, this.selectionEnd), n = this.createRange(e, t), r = l.getSelection();
   r.removeAllRanges(), r.addRange(n, this.selectionStart > this.selectionEnd);
  };
  var u = e.debounce(function() {
   a = i.selectionStart, o = i.selectionEnd;
  }, 50);
  this.setSelectionStartEnd = function(e, t) {
   void 0 === e && (e = this.selectionStart), 0 > e && (e = 0), void 0 === t && (t = this.selectionEnd), 
   0 > t && (t = 0), this.selectionStart = e, this.selectionEnd = t, j.editorStart = e, 
   j.editorEnd = t, u();
  }, this.saveSelectionState = function() {
   function e() {
    if (U === !1) {
     var e = i.selectionStart, t = i.selectionEnd, n = l.getSelection();
     if (n.rangeCount > 0) {
      var r = n.getRangeAt(0), a = r.startContainer;
      if (D.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY || D === a) {
       var o = r.startOffset;
       a.hasChildNodes() && o > 0 && (a = a.childNodes[o - 1], o = a.textContent.length);
       for (var s = a; a != D; ) {
        for (;a = a.previousSibling; ) a.textContent && (o += a.textContent.length);
        a = s = s.parentNode;
       }
       n.isBackwards() ? (e = o + r.toString().length, t = o) : (e = o, t = o + r.toString().length), 
       e === t && "\n" == r.startContainer.textContent && 1 == r.startOffset && (e = --t, 
       i.setSelectionStartEnd(e, t), i.updateSelectionRange());
      }
     }
     i.setSelectionStartEnd(e, t);
    }
    X.saveSelectionState();
   }
   var n = !1, r = t.debounce(function() {
    e(), i.updateCursorCoordinates(n), s();
   }), s = t.debounce(function() {
    e(), a === i.selectionStart && o === i.selectionEnd && (n = !1), i.updateCursorCoordinates(n), 
    n = !1;
   }, 10);
   return function(t, i, s) {
    return s && (a = void 0, o = void 0), t ? (n = n || i, r()) : void e();
   };
  }(), this.getSelectedText = function() {
   var e = Math.min(this.selectionStart, this.selectionEnd), t = Math.max(this.selectionStart, this.selectionEnd);
   return W.substring(e, t);
  }, this.getCoordinates = function(e, t, n) {
   if (!t) {
    var r = this.findOffsets([ e ])[0];
    t = r.container, n = r.offsetInContainer;
   }
   var i = 0, a = 0;
   if ("\n" == t.textContent) a = t.parentNode.offsetTop + t.parentNode.offsetHeight / 2; else {
    var o = W[e], s = {
     container: t,
     offsetInContainer: n,
     offset: e
    }, l = {
     container: t,
     offsetInContainer: n,
     offset: e
    };
    e > 0 && (void 0 === o || "\n" == o) ? 0 === s.offset ? s = e - 1 : s.offsetInContainer -= 1 : l.offset === t.textContent.length ? l = e + 1 : l.offsetInContainer += 1;
    var c = this.createRange(s, l), u = c.getBoundingClientRect();
    a = u.top + u.height / 2 - T.getBoundingClientRect().top + T.scrollTop;
   }
   return {
    x: i,
    y: a
   };
  }, this.getClosestWordOffset = function(e) {
   var t = 0, n = 0, r = 0;
   return W.split(/\s/).some(function(i) {
    return i && (t = r, n = r + i.length, n > e) ? !0 : void (r += i.length + 1);
   }), {
    start: t,
    end: n
   };
  };
 }
 function d(e) {
  void 0 !== T && V.saveSelectionState(!0, !0, e);
 }
 function p(e) {
  var t = z.diff_commonPrefix(W, e);
  t === W.length && t--;
  var n = Math.min(z.diff_commonSuffix(W, e), W.length - t, e.length - t), r = e.substring(t, e.length - n), i = V.createRange(t, W.length - n);
  return i.deleteContents(), i.insertNode(document.createTextNode(r)), {
   start: t,
   end: e.length - n
  };
 }
 function h(e, t, n) {
  X.currentMode = X.currentMode || "replace";
  var r = V.createRange(Math.min(e, t), Math.max(e, t));
  "" + r != n && (r.deleteContents(), r.insertNode(document.createTextNode(n)));
  var i = e + n.length;
  V.setSelectionStartEnd(i, i), V.updateSelectionRange(), V.updateCursorCoordinates(!0);
 }
 function f(e, t) {
  X.currentMode = X.currentMode || "replace";
  var n = W.replace(e, t);
  if (n != W) {
   var r = F.setValue(n);
   V.setSelectionStartEnd(r.end, r.end), V.updateSelectionRange(), V.updateCursorCoordinates(!0);
  }
 }
 function m(e, t) {
  var n = V.selectionStart;
  if (n !== V.selectionEnd) return !1;
  var r = V.createRange(n - e.length, n);
  return "" + r != e ? !1 : (r.deleteContents(), r.insertNode(document.createTextNode(t)), 
  n = n - e.length + t.length, V.setSelectionStartEnd(n, n), V.updateSelectionRange(), 
  V.updateCursorCoordinates(!0), !0);
 }
 function g(e) {
  p(e), W = e;
 }
 function b() {
  return W;
 }
 function v() {
  M.focus(), V.updateSelectionRange(), T.scrollTop = O;
 }
 function y() {
  function n(t, n, i) {
   H.noWatch(function() {
    W != t.content && (g(t.content), j.content = t.content, r.onContentChanged(j, t.content)), 
    V.setSelectionStartEnd(n, i), V.updateSelectionRange(), V.updateCursorCoordinates(!0);
    var a = j.discussionListJSON;
    if (a != t.discussionListJSON) {
     var o = j.discussionList;
     j.discussionListJSON = t.discussionListJSON;
     var s = j.discussionList, l = q.diff(o, s), c = !1;
     e.each(l, function(t, n) {
      e.isArray(t) ? 1 === t.length ? r.onDiscussionCreated(j, s[n]) : r.onDiscussionRemoved(j, o[n]) : c = !0;
     }), c && r.onCommentsChanged(j);
    }
   }), s = n, l = i, o = t, this.currentMode = void 0, a = void 0, this.onButtonStateChange(), 
   d();
  }
  var i, a, o, s, l, c = [], u = [];
  this.setCommandMode = function() {
   this.currentMode = "command";
  }, this.setMode = function() {}, this.onButtonStateChange = function() {}, this.saveState = t.debounce(function() {
   u = [];
   var e = Date.now();
   if ("comment" == this.currentMode || "replace" == this.currentMode || "newlines" == a || this.currentMode != a || e - i > 1e3) for (c.push(o); c.length > 100; ) c.shift(); else s = o.selectionStartBefore, 
   l = o.selectionEndBefore;
   o = {
    selectionStartBefore: s,
    selectionEndBefore: l,
    selectionStartAfter: V.selectionStart,
    selectionEndAfter: V.selectionEnd,
    content: W,
    discussionListJSON: j.discussionListJSON
   }, i = e, a = this.currentMode, this.currentMode = void 0, this.onButtonStateChange();
  }, this), this.saveSelectionState = e.debounce(function() {
   void 0 === this.currentMode && (s = V.selectionStart, l = V.selectionEnd);
  }, 50), this.canUndo = function() {
   return c.length;
  }, this.canRedo = function() {
   return u.length;
  }, this.undo = function() {
   var e = c.pop();
   e && (u.push(o), n.call(this, e, o.selectionStartBefore, o.selectionEndBefore));
  }, this.redo = function() {
   var e = u.pop();
   e && (c.push(o), n.call(this, e, e.selectionStartAfter, e.selectionEndAfter));
  }, this.init = function() {
   var e = j.content;
   c = [], u = [], i = 0, o = {
    selectionStartAfter: j.selectionStart,
    selectionEndAfter: j.selectionEnd,
    content: e,
    discussionListJSON: j.discussionListJSON
   }, this.currentMode = void 0, a = void 0, D.textContent = e, w();
  };
 }
 function x() {
  H.isWatching === !0 && (X.currentMode = X.currentMode || "comment", X.saveState());
 }
 function w() {
  var t = T.textContent;
  if (D.lastChild === P && "\n" == P.textContent.slice(-1) && (t = t.slice(0, -1)), 
  t = t.replace(/\r\n?/g, "\n"), U === !1) {
   if (t == W) return void (0 === D.children.length && (D.innerHTML = "", J.forEach(function(e) {
    D.appendChild(e.elt);
   }), E()));
   X.currentMode = X.currentMode || "typing";
   var n = e.values(j.discussionList);
   j.newDiscussion && n.push(j.newDiscussion);
   var i = S(W, t, n);
   W = t, i === !0 && (j.discussionList = j.discussionList), j.content = W, V.saveSelectionState(), 
   r.onContentChanged(j, W), i && r.onCommentsChanged(j), X.saveState(), K();
  } else W = t, j.content = W, V.setSelectionStartEnd(j.editorStart, j.editorEnd), 
  V.updateSelectionRange(), V.updateCursorCoordinates(), X.saveSelectionState(), r.onFileOpen(j, W), 
  L.scrollTop = j.previewScrollTop, O = j.editorScrollTop, T.scrollTop = O, U = !1;
 }
 function S(e, t, n) {
  if (n.length) {
   var r = z.diff_main(e, t), i = !1, a = 0;
   return r.forEach(function(e) {
    var t = e[0], r = e[1];
    if (0 === t) return void (a += r.length);
    var o = a, s = r.length;
    -1 === t && (o += s, s = -s), n.forEach(function(e) {
     e.selectionEnd > o ? (e.selectionEnd += s, e.discussionIndex && (i = !0)) : e.selectionEnd > a && (e.selectionEnd = a, 
     e.discussionIndex && (i = !0)), e.selectionStart >= o ? (e.selectionStart += s, 
     e.discussionIndex && (i = !0)) : e.selectionStart > a && (e.selectionStart = a, 
     e.discussionIndex && (i = !0));
    }), 1 === t && (a += r.length);
   }), i;
  }
 }
 function C(t) {
  if (et = [], Z = [], Y = void 0, U === !0) return Z = J, J = t, void (et = t);
  var n = J.length;
  e.some(J, function(e, r) {
   var i = t[r];
   return r >= t.length || e.textWithFrontMatter != i.textWithFrontMatter || e.elt.parentNode !== D || e.elt.textContent != i.textWithFrontMatter ? (n = r, 
   !0) : void 0;
  });
  var r = -J.length;
  e.some(J.slice().reverse(), function(e, n) {
   var i = t[t.length - n - 1];
   return n >= t.length || e.textWithFrontMatter != i.textWithFrontMatter || e.elt.parentNode !== D || e.elt.textContent != i.textWithFrontMatter ? (r = -n, 
   !0) : void 0;
  }), n - r > J.length && (r = n - J.length);
  var i = J.slice(0, n);
  et = t.slice(n, t.length + r);
  var a = J.slice(J.length + r, J.length);
  Y = e.first(a), Z = J.slice(n, J.length + r), J = i.concat(et).concat(a);
 }
 function _() {
  var e = document.createDocumentFragment();
  et.forEach(function(t) {
   k(t), e.appendChild(t.elt);
  }), H.noWatch(function() {
   if (U === !0) D.innerHTML = "", D.appendChild(e); else {
    Z.forEach(function(e) {
     e.elt.parentNode === D && D.removeChild(e.elt), e.elt.generated = !1;
    }), void 0 !== Y ? D.insertBefore(e, Y.elt) : D.appendChild(e);
    for (var t = D.firstChild; t; ) {
     var n = t.nextSibling;
     t.generated || D.removeChild(t), t = n;
    }
   }
   E(), V.updateSelectionRange(), V.updateCursorCoordinates();
  });
 }
 function E() {
  P = s("span", {
   "class": "token lf"
  }), P.textContent = "\n", D.appendChild(P);
 }
 function k(e) {
  var t = tt(e.text);
  window.viewerMode || (t = i.highlight(t, i.languages.md));
  var n = e.textWithFrontMatter.substring(0, e.textWithFrontMatter.length - e.text.length);
  n.length && (n = tt(n), n = n.replace(/\n/g, '<span class="token lf">\n</span>'), 
  t = '<span class="token md">' + n + "</span>" + t);
  var r = s("span", {
   id: "wmd-input-section-" + e.id,
   "class": "wmd-input-section"
  });
  r.generated = !0, r.innerHTML = t, e.elt = r;
 }
 var T, N, D, M, I, A, L, R, P, F = {}, O = 0, B = function() {
  var t, r = 0, i = function() {
   var e = Date.now();
   R.refreshPreview(), r = Date.now() - e;
  };
  return n.lazyRendering === !0 ? e.debounce(i, 500) : function() {
   clearTimeout(t), t = setTimeout(i, 2e3 > r ? r : 2e3);
  };
 }();
 r.addListener("onPagedownConfigure", function(e) {
  R = e;
 });
 var G = 0;
 r.addListener("onSectionsCreated", function(e) {
  G || (C(e), _()), U === !0 ? R.refreshPreview() : B();
 });
 var j, U = !0;
 r.addListener("onFileSelected", function(e) {
  U = !0, j = e;
 });
 var H = new c();
 F.watcher = H;
 var z = new a(), q = o.create({
  objectHash: function(e) {
   return JSON.stringify(e);
  },
  arrays: {
   detectMove: !1
  },
  textDiff: {
   minLength: 9999999
  }
 }), V = new u();
 F.selectionMgr = V, $(document).on("selectionchange", ".editor-content", e.bind(V.saveSelectionState, V, !0, !1)), 
 F.adjustCursorPosition = d;
 var W;
 F.setValue = p;
 var Q = !1;
 F.setContent = function(e) {
  j || (j = {
   content: e
  }), D ? (j = {
   content: e
  }, r.onFileSelected(j), log(D), log(e), D.textContent = e, w(), Q = !1) : Q = e;
 }, window.we = F, F.replace = h, F.replaceAll = f, F.replacePreviousText = m, F.setValueNoWatch = g, 
 F.getValue = b, F.getContent = b, MD = F, F.focus = v;
 var X = new y();
 F.undoMgr = X, r.addListener("onDiscussionCreated", x), r.addListener("onDiscussionRemoved", x), 
 r.addListener("onCommentsChanged", x);
 var K = e.debounce(function() {
  var e = window.getSelection();
  V.hasFocus && !G && V.selectionStart === V.selectionEnd && e.modify && (V.selectionStart ? (e.modify("move", "backward", "character"), 
  e.modify("move", "forward", "character")) : (e.modify("move", "forward", "character"), 
  e.modify("move", "backward", "character")));
 }, 10);
 F.adjustCommentOffsets = S, F.init = function() {
  if (T = document.getElementById("wmd-input"), N = $(T), D = T.querySelector(".editor-content"), 
  M = $(D), I = T.querySelector(".editor-margin"), A = $(I), L = document.querySelector(".preview-container"), 
  N.addClass(n.editorFontClass), H.startWatching(), $(T).scroll(function() {
   O = T.scrollTop, U === !1 && (j.editorScrollTop = O);
  }), $(L).scroll(function() {
   U === !1 && (j.previewScrollTop = L.scrollTop);
  }), /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) {
   var t = $('<input style="width:1px;height:1px;border:none;margin:0;padding:0;" tabIndex="-1">').appendTo("html");
   M.blur(function() {
    t[0].setSelectionRange(0, 0), t.blur();
   });
  }
  T.focus = v, T.adjustCursorPosition = d, Object.defineProperty(T, "value", {
   get: function() {
    return W;
   },
   set: p
  }), Object.defineProperty(T, "selectionStart", {
   get: function() {
    return Math.min(V.selectionStart, V.selectionEnd);
   },
   set: function(e) {
    V.setSelectionStartEnd(e), V.updateSelectionRange(), V.updateCursorCoordinates();
   },
   enumerable: !0,
   configurable: !0
  }), Object.defineProperty(T, "selectionEnd", {
   get: function() {
    return Math.max(V.selectionStart, V.selectionEnd);
   },
   set: function(e) {
    V.setSelectionStartEnd(void 0, e), V.updateSelectionRange(), V.updateCursorCoordinates();
   },
   enumerable: !0,
   configurable: !0
  });
  var r = !1;
  M.on("keydown", function(e) {
   if (17 !== e.which && 91 !== e.which && 18 !== e.which && 16 !== e.which) {
    V.saveSelectionState(), d();
    var t = e.metaKey || e.ctrlKey;
    switch (e.which) {
    case 9:
     t || (i("indent", {
      inverse: e.shiftKey
     }), e.preventDefault());
     break;

    case 13:
     i("newline"), e.preventDefault();
    }
    13 !== e.which && (r = !1);
   }
  }).on("compositionstart", function() {
   G++;
  }).on("compositionend", function() {
   setTimeout(function() {
    G--;
   }, 0);
  }).on("mouseup", e.bind(V.saveSelectionState, V, !0, !1)).on("paste", function(e) {
   X.currentMode = "paste", e.preventDefault();
   var t, n = (e.originalEvent || e).clipboardData;
   n ? t = n.getData("text/plain") : (n = window.clipboardData, t = n && n.getData("Text")), 
   t && (h(V.selectionStart, V.selectionEnd, t), d());
  }).on("cut", function() {
   X.currentMode = "cut", d();
  }).on("focus", function() {
   V.hasFocus = !0;
  }).on("blur", function() {
   V.hasFocus = !1;
  });
  var i = function(e, t) {
   var n = b(), r = Math.min(V.selectionStart, V.selectionEnd), i = Math.max(V.selectionStart, V.selectionEnd), a = {
    selectionStart: r,
    selectionEnd: i,
    before: n.slice(0, r),
    after: n.slice(i),
    selection: n.slice(r, i)
   };
   o[e](a, t || {}), p(a.before + a.selection + a.after), V.setSelectionStartEnd(a.selectionStart, a.selectionEnd), 
   V.updateSelectionRange();
  }, a = /^ {0,3}>[ ]*|^[ \t]*(?:[*+\-]|(\d+)\.)[ \t]|^\s+/, o = {
   indent: function(e, t) {
    function n(e, t, n, r) {
     return n = +n || 0, r = r || "", e.slice(0, t) + r + e.slice(t + n);
    }
    var r = e.before.lastIndexOf("\n") + 1;
    if (t.inverse) /\s/.test(e.before.charAt(r)) && (e.before = n(e.before, r, 1), e.selectionStart--, 
    e.selectionEnd--), e.selection = e.selection.replace(/^[ \t]/gm, ""); else {
     var i = e.before.slice(r);
     if (!e.selection && !i.match(a)) return e.before += "	", e.selectionStart++, void e.selectionEnd++;
     e.before = n(e.before, r, 0, "	"), e.selection = e.selection.replace(/\r?\n(?=[\s\S])/g, "\n	"), 
     e.selectionStart++, e.selectionEnd++;
    }
    e.selectionEnd = e.selectionStart + e.selection.length;
   },
   newline: function(e) {
    var t = e.before.lastIndexOf("\n") + 1;
    if (r) return e.before = e.before.substring(0, t), e.selection = "", e.selectionStart = t, 
    e.selectionEnd = t, void (r = !1);
    r = !1;
    var n = e.before.slice(t), i = n.match(a), o = (i || [ "" ])[0];
    if (i && i[1]) {
     var s = parseInt(i[1], 10);
     o = o.replace(/\d+/, s + 1);
    }
    o.length && (r = !0), X.currentMode = "newlines", e.before += "\n" + o, e.selection = "", 
    e.selectionStart += o.length + 1, e.selectionEnd = e.selectionStart;
   }
  };
  Q !== !1 && F.setContent(Q);
 };
 var Y, J = [], Z = [], et = [], tt = function() {
  var e = {
   "&": "&amp;",
   "<": "&lt;",
   " ": " "
  };
  return function(t) {
   return t.replace(/[&<\u00a0]/g, function(t) {
    return e[t];
   });
  };
 }();
 return r.onEditorCreated(F), F;
}), function(e, t) {
 function n() {
  r.READY || (v.determineEventTypes(), f.each(r.gestures, function(e) {
   x.register(e);
  }), v.onTouch(r.DOCUMENT, p, x.detect), v.onTouch(r.DOCUMENT, h, x.detect), r.READY = !0);
 }
 var r = function(e, t) {
  return new r.Instance(e, t || {});
 };
 r.VERSION = "1.0.11", r.defaults = {
  stop_browser_behavior: {
   userSelect: "none",
   touchAction: "pan-y",
   touchCallout: "none",
   contentZooming: "none",
   userDrag: "none",
   tapHighlightColor: "rgba(0,0,0,0)"
  }
 }, r.HAS_POINTEREVENTS = e.navigator.pointerEnabled || e.navigator.msPointerEnabled, 
 r.HAS_TOUCHEVENTS = "ontouchstart" in e, r.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, 
 r.NO_MOUSEEVENTS = r.HAS_TOUCHEVENTS && e.navigator.userAgent.match(r.MOBILE_REGEX), 
 r.EVENT_TYPES = {}, r.UPDATE_VELOCITY_INTERVAL = 16, r.DOCUMENT = e.document;
 var i = r.DIRECTION_DOWN = "down", a = r.DIRECTION_LEFT = "left", o = r.DIRECTION_UP = "up", s = r.DIRECTION_RIGHT = "right", l = r.POINTER_MOUSE = "mouse", c = r.POINTER_TOUCH = "touch", u = r.POINTER_PEN = "pen", d = r.EVENT_START = "start", p = r.EVENT_MOVE = "move", h = r.EVENT_END = "end";
 r.plugins = r.plugins || {}, r.gestures = r.gestures || {}, r.READY = !1;
 var f = r.utils = {
  extend: function(e, n, r) {
   for (var i in n) e[i] !== t && r || (e[i] = n[i]);
   return e;
  },
  each: function(e, n, r) {
   var i, a;
   if ("forEach" in e) e.forEach(n, r); else if (e.length !== t) {
    for (i = -1; a = e[++i]; ) if (n.call(r, a, i, e) === !1) return;
   } else for (i in e) if (e.hasOwnProperty(i) && n.call(r, e[i], i, e) === !1) return;
  },
  inStr: function(e, t) {
   return e.indexOf(t) > -1;
  },
  hasParent: function(e, t) {
   for (;e; ) {
    if (e == t) return !0;
    e = e.parentNode;
   }
   return !1;
  },
  getCenter: function(e) {
   var t = [], n = [], r = [], i = [], a = Math.min, o = Math.max;
   return 1 === e.length ? {
    pageX: e[0].pageX,
    pageY: e[0].pageY,
    clientX: e[0].clientX,
    clientY: e[0].clientY
   } : (f.each(e, function(e) {
    t.push(e.pageX), n.push(e.pageY), r.push(e.clientX), i.push(e.clientY);
   }), {
    pageX: (a.apply(Math, t) + o.apply(Math, t)) / 2,
    pageY: (a.apply(Math, n) + o.apply(Math, n)) / 2,
    clientX: (a.apply(Math, r) + o.apply(Math, r)) / 2,
    clientY: (a.apply(Math, i) + o.apply(Math, i)) / 2
   });
  },
  getVelocity: function(e, t, n) {
   return {
    x: Math.abs(t / e) || 0,
    y: Math.abs(n / e) || 0
   };
  },
  getAngle: function(e, t) {
   var n = t.clientX - e.clientX, r = t.clientY - e.clientY;
   return 180 * Math.atan2(r, n) / Math.PI;
  },
  getDirection: function(e, t) {
   var n = Math.abs(e.clientX - t.clientX), r = Math.abs(e.clientY - t.clientY);
   return n >= r ? e.clientX - t.clientX > 0 ? a : s : e.clientY - t.clientY > 0 ? o : i;
  },
  getDistance: function(e, t) {
   var n = t.clientX - e.clientX, r = t.clientY - e.clientY;
   return Math.sqrt(n * n + r * r);
  },
  getScale: function(e, t) {
   return e.length >= 2 && t.length >= 2 ? this.getDistance(t[0], t[1]) / this.getDistance(e[0], e[1]) : 1;
  },
  getRotation: function(e, t) {
   return e.length >= 2 && t.length >= 2 ? this.getAngle(t[1], t[0]) - this.getAngle(e[1], e[0]) : 0;
  },
  isVertical: function(e) {
   return e == o || e == i;
  },
  toggleDefaultBehavior: function(e, t, n) {
   if (t && e && e.style) {
    f.each([ "webkit", "moz", "Moz", "ms", "o", "" ], function(r) {
     f.each(t, function(t, i) {
      r && (i = r + i.substring(0, 1).toUpperCase() + i.substring(1)), i in e.style && (e.style[i] = !n && t);
     });
    });
    var r = function() {
     return !1;
    };
    "none" == t.userSelect && (e.onselectstart = !n && r), "none" == t.userDrag && (e.ondragstart = !n && r);
   }
  }
 };
 r.Instance = function(e, t) {
  var i = this;
  return n(), this.element = e, this.enabled = !0, this.options = f.extend(f.extend({}, r.defaults), t || {}), 
  this.options.stop_browser_behavior && f.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !1), 
  this.eventStartHandler = v.onTouch(e, d, function(e) {
   i.enabled && x.startDetect(i, e);
  }), this.eventHandlers = [], this;
 }, r.Instance.prototype = {
  on: function(e, t) {
   var n = e.split(" ");
   return f.each(n, function(e) {
    this.element.addEventListener(e, t, !1), this.eventHandlers.push({
     gesture: e,
     handler: t
    });
   }, this), this;
  },
  off: function(e, t) {
   var n, r, i = e.split(" ");
   return f.each(i, function(e) {
    for (this.element.removeEventListener(e, t, !1), n = -1; r = this.eventHandlers[++n]; ) r.gesture === e && r.handler === t && this.eventHandlers.splice(n, 1);
   }, this), this;
  },
  trigger: function(e, t) {
   t || (t = {});
   var n = r.DOCUMENT.createEvent("Event");
   n.initEvent(e, !0, !0), n.gesture = t;
   var i = this.element;
   return f.hasParent(t.target, i) && (i = t.target), i.dispatchEvent(n), this;
  },
  enable: function(e) {
   return this.enabled = e, this;
  },
  dispose: function() {
   var e, t;
   for (this.options.stop_browser_behavior && f.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !0), 
   e = -1; t = this.eventHandlers[++e]; ) this.element.removeEventListener(t.gesture, t.handler, !1);
   return this.eventHandlers = [], v.unbindDom(this.element, r.EVENT_TYPES[d], this.eventStartHandler), 
   null;
  }
 };
 var m = null, g = !1, b = !1, v = r.event = {
  bindDom: function(e, t, n) {
   var r = t.split(" ");
   f.each(r, function(t) {
    e.addEventListener(t, n, !1);
   });
  },
  unbindDom: function(e, t, n) {
   var r = t.split(" ");
   f.each(r, function(t) {
    e.removeEventListener(t, n, !1);
   });
  },
  onTouch: function(e, t, n) {
   var i = this, a = function(a) {
    var o = a.type.toLowerCase();
    if (!f.inStr(o, "mouse") || !b) {
     f.inStr(o, "touch") || f.inStr(o, "pointerdown") || f.inStr(o, "mouse") && 1 === a.which ? g = !0 : f.inStr(o, "mouse") && !a.which && (g = !1), 
     (f.inStr(o, "touch") || f.inStr(o, "pointer")) && (b = !0);
     var s = 0;
     g && (r.HAS_POINTEREVENTS && t != h ? s = y.updatePointer(t, a) : f.inStr(o, "touch") ? s = a.touches.length : b || (s = f.inStr(o, "up") ? 0 : 1), 
     s > 0 && t == h ? t = p : s || (t = h), (s || null === m) && (m = a), n.call(x, i.collectEventData(e, t, i.getTouchList(m, t), a)), 
     r.HAS_POINTEREVENTS && t == h && (s = y.updatePointer(t, a))), s || (m = null, g = !1, 
     b = !1, y.reset());
    }
   };
   return this.bindDom(e, r.EVENT_TYPES[t], a), a;
  },
  determineEventTypes: function() {
   var e;
   e = r.HAS_POINTEREVENTS ? y.getEvents() : r.NO_MOUSEEVENTS ? [ "touchstart", "touchmove", "touchend touchcancel" ] : [ "touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup" ], 
   r.EVENT_TYPES[d] = e[0], r.EVENT_TYPES[p] = e[1], r.EVENT_TYPES[h] = e[2];
  },
  getTouchList: function(e) {
   return r.HAS_POINTEREVENTS ? y.getTouchList() : e.touches ? e.touches : (e.identifier = 1, 
   [ e ]);
  },
  collectEventData: function(e, t, n, r) {
   var i = c;
   return (f.inStr(r.type, "mouse") || y.matchType(l, r)) && (i = l), {
    center: f.getCenter(n),
    timeStamp: Date.now(),
    target: r.target,
    touches: n,
    eventType: t,
    pointerType: i,
    srcEvent: r,
    preventDefault: function() {
     var e = this.srcEvent;
     e.preventManipulation && e.preventManipulation(), e.preventDefault && e.preventDefault();
    },
    stopPropagation: function() {
     this.srcEvent.stopPropagation();
    },
    stopDetect: function() {
     return x.stopDetect();
    }
   };
  }
 }, y = r.PointerEvent = {
  pointers: {},
  getTouchList: function() {
   var e = [];
   return f.each(this.pointers, function(t) {
    e.push(t);
   }), e;
  },
  updatePointer: function(e, t) {
   return e == h ? delete this.pointers[t.pointerId] : (t.identifier = t.pointerId, 
   this.pointers[t.pointerId] = t), Object.keys(this.pointers).length;
  },
  matchType: function(e, t) {
   if (!t.pointerType) return !1;
   var n = t.pointerType, r = {};
   return r[l] = n === l, r[c] = n === c, r[u] = n === u, r[e];
  },
  getEvents: function() {
   return [ "pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel" ];
  },
  reset: function() {
   this.pointers = {};
  }
 }, x = r.detection = {
  gestures: [],
  current: null,
  previous: null,
  stopped: !1,
  startDetect: function(e, t) {
   this.current || (this.stopped = !1, this.current = {
    inst: e,
    startEvent: f.extend({}, t),
    lastEvent: !1,
    lastVelocityEvent: !1,
    velocity: !1,
    name: ""
   }, this.detect(t));
  },
  detect: function(e) {
   if (this.current && !this.stopped) {
    e = this.extendEventData(e);
    var t = this.current.inst, n = t.options;
    return f.each(this.gestures, function(r) {
     return this.stopped || n[r.name] === !1 || t.enabled === !1 || r.handler.call(r, e, t) !== !1 ? void 0 : (this.stopDetect(), 
     !1);
    }, this), this.current && (this.current.lastEvent = e), e.eventType == h && !e.touches.length - 1 && this.stopDetect(), 
    e;
   }
  },
  stopDetect: function() {
   this.previous = f.extend({}, this.current), this.current = null, this.stopped = !0;
  },
  getVelocityData: function(e, t, n, i) {
   var a = this.current, o = a.lastVelocityEvent, s = a.velocity;
   o && e.timeStamp - o.timeStamp > r.UPDATE_VELOCITY_INTERVAL ? (s = f.getVelocity(e.timeStamp - o.timeStamp, e.center.clientX - o.center.clientX, e.center.clientY - o.center.clientY), 
   a.lastVelocityEvent = e) : a.velocity || (s = f.getVelocity(t, n, i), a.lastVelocityEvent = e), 
   a.velocity = s, e.velocityX = s.x, e.velocityY = s.y;
  },
  getInterimData: function(e) {
   var t, n, r = this.current.lastEvent;
   e.eventType == h ? (t = r && r.interimAngle, n = r && r.interimDirection) : (t = r && f.getAngle(r.center, e.center), 
   n = r && f.getDirection(r.center, e.center)), e.interimAngle = t, e.interimDirection = n;
  },
  extendEventData: function(e) {
   var t = this.current, n = t.startEvent;
   (e.touches.length != n.touches.length || e.touches === n.touches) && (n.touches = [], 
   f.each(e.touches, function(e) {
    n.touches.push(f.extend({}, e));
   }));
   var r = e.timeStamp - n.timeStamp, i = e.center.clientX - n.center.clientX, a = e.center.clientY - n.center.clientY;
   return this.getVelocityData(e, r, i, a), this.getInterimData(e), f.extend(e, {
    startEvent: n,
    deltaTime: r,
    deltaX: i,
    deltaY: a,
    distance: f.getDistance(n.center, e.center),
    angle: f.getAngle(n.center, e.center),
    direction: f.getDirection(n.center, e.center),
    scale: f.getScale(n.touches, e.touches),
    rotation: f.getRotation(n.touches, e.touches)
   }), e;
  },
  register: function(e) {
   var n = e.defaults || {};
   return n[e.name] === t && (n[e.name] = !0), f.extend(r.defaults, n, !0), e.index = e.index || 1e3, 
   this.gestures.push(e), this.gestures.sort(function(e, t) {
    return e.index < t.index ? -1 : e.index > t.index ? 1 : 0;
   }), this.gestures;
  }
 };
 r.gestures.Drag = {
  name: "drag",
  index: 50,
  defaults: {
   drag_min_distance: 10,
   correct_for_drag_min_distance: !0,
   drag_max_touches: 1,
   drag_block_horizontal: !1,
   drag_block_vertical: !1,
   drag_lock_to_axis: !1,
   drag_lock_min_distance: 25
  },
  triggered: !1,
  handler: function(e, t) {
   var n = x.current;
   if (n.name != this.name && this.triggered) return t.trigger(this.name + "end", e), 
   void (this.triggered = !1);
   if (!(t.options.drag_max_touches > 0 && e.touches.length > t.options.drag_max_touches)) switch (e.eventType) {
   case d:
    this.triggered = !1;
    break;

   case p:
    if (e.distance < t.options.drag_min_distance && n.name != this.name) return;
    var r = n.startEvent.center;
    if (n.name != this.name && (n.name = this.name, t.options.correct_for_drag_min_distance && e.distance > 0)) {
     var l = Math.abs(t.options.drag_min_distance / e.distance);
     r.pageX += e.deltaX * l, r.pageY += e.deltaY * l, r.clientX += e.deltaX * l, r.clientY += e.deltaY * l, 
     e = x.extendEventData(e);
    }
    (n.lastEvent.drag_locked_to_axis || t.options.drag_lock_to_axis && t.options.drag_lock_min_distance <= e.distance) && (e.drag_locked_to_axis = !0);
    var c = n.lastEvent.direction;
    e.drag_locked_to_axis && c !== e.direction && (e.direction = f.isVertical(c) ? e.deltaY < 0 ? o : i : e.deltaX < 0 ? a : s), 
    this.triggered || (t.trigger(this.name + "start", e), this.triggered = !0), t.trigger(this.name, e), 
    t.trigger(this.name + e.direction, e);
    var u = f.isVertical(e.direction);
    (t.options.drag_block_vertical && u || t.options.drag_block_horizontal && !u) && e.preventDefault();
    break;

   case h:
    this.triggered && t.trigger(this.name + "end", e), this.triggered = !1;
   }
  }
 }, r.gestures.Hold = {
  name: "hold",
  index: 10,
  defaults: {
   hold_timeout: 500,
   hold_threshold: 2
  },
  timer: null,
  handler: function(e, t) {
   switch (e.eventType) {
   case d:
    clearTimeout(this.timer), x.current.name = this.name, this.timer = setTimeout(function() {
     "hold" == x.current.name && t.trigger("hold", e);
    }, t.options.hold_timeout);
    break;

   case p:
    e.distance > t.options.hold_threshold && clearTimeout(this.timer);
    break;

   case h:
    clearTimeout(this.timer);
   }
  }
 }, r.gestures.Release = {
  name: "release",
  index: 1/0,
  handler: function(e, t) {
   e.eventType == h && t.trigger(this.name, e);
  }
 }, r.gestures.Swipe = {
  name: "swipe",
  index: 40,
  defaults: {
   swipe_min_touches: 1,
   swipe_max_touches: 1,
   swipe_velocity: .7
  },
  handler: function(e, t) {
   if (e.eventType == h) {
    if (e.touches.length < t.options.swipe_min_touches || e.touches.length > t.options.swipe_max_touches) return;
    (e.velocityX > t.options.swipe_velocity || e.velocityY > t.options.swipe_velocity) && (t.trigger(this.name, e), 
    t.trigger(this.name + e.direction, e));
   }
  }
 }, r.gestures.Tap = {
  name: "tap",
  index: 100,
  defaults: {
   tap_max_touchtime: 250,
   tap_max_distance: 10,
   tap_always: !0,
   doubletap_distance: 20,
   doubletap_interval: 300
  },
  has_moved: !1,
  handler: function(e, t) {
   var n, r, i;
   e.eventType == d ? this.has_moved = !1 : e.eventType != p || this.moved ? e.eventType == h && "touchcancel" != e.srcEvent.type && e.deltaTime < t.options.tap_max_touchtime && !this.has_moved && (n = x.previous, 
   r = n && n.lastEvent && e.timeStamp - n.lastEvent.timeStamp, i = !1, n && "tap" == n.name && r && r < t.options.doubletap_interval && e.distance < t.options.doubletap_distance && (t.trigger("doubletap", e), 
   i = !0), (!i || t.options.tap_always) && (x.current.name = "tap", t.trigger(x.current.name, e))) : this.has_moved = e.distance > t.options.tap_max_distance;
  }
 }, r.gestures.Touch = {
  name: "touch",
  index: -1/0,
  defaults: {
   prevent_default: !1,
   prevent_mouseevents: !1
  },
  handler: function(e, t) {
   return t.options.prevent_mouseevents && e.pointerType == l ? void e.stopDetect() : (t.options.prevent_default && e.preventDefault(), 
   void (e.eventType == d && t.trigger(this.name, e)));
  }
 }, r.gestures.Transform = {
  name: "transform",
  index: 45,
  defaults: {
   transform_min_scale: .01,
   transform_min_rotation: 1,
   transform_always_block: !1,
   transform_within_instance: !1
  },
  triggered: !1,
  handler: function(e, t) {
   if (x.current.name != this.name && this.triggered) return t.trigger(this.name + "end", e), 
   void (this.triggered = !1);
   if (!(e.touches.length < 2)) {
    if (t.options.transform_always_block && e.preventDefault(), t.options.transform_within_instance) for (var n = -1; e.touches[++n]; ) if (!f.hasParent(e.touches[n].target, t.element)) return;
    switch (e.eventType) {
    case d:
     this.triggered = !1;
     break;

    case p:
     var r = Math.abs(1 - e.scale), i = Math.abs(e.rotation);
     if (r < t.options.transform_min_scale && i < t.options.transform_min_rotation) return;
     x.current.name = this.name, this.triggered || (t.trigger(this.name + "start", e), 
     this.triggered = !0), t.trigger(this.name, e), i > t.options.transform_min_rotation && t.trigger("rotate", e), 
     r > t.options.transform_min_scale && (t.trigger("pinch", e), t.trigger("pinch" + (e.scale < 1 ? "in" : "out"), e));
     break;

    case h:
     this.triggered && t.trigger(this.name + "end", e), this.triggered = !1;
    }
   }
  }
 }, "function" == typeof define && define.amd ? define("hammerjs", [], function() {
  return r;
 }) : "object" == typeof module && module.exports ? module.exports = r : e.Hammer = r;
}(window), define("layout", [ "underscore", "utils", "constants", "settings", "eventMgr", "crel", "mousetrap", "hammerjs" ], function(e, t, n, r, i, a, o, s) {
 function l() {
  H = !0, b.$elt.addClass("layout-animate");
 }
 function c() {
  H = !1, b.$elt.removeClass("layout-animate");
 }
 function u(e) {
  this.selector = e, this.elt = document.querySelector(e), this.$elt = $(this.elt);
 }
 function d(e) {
  e && e.target !== b.elt && e.target !== v.elt && e.target !== _.elt || (z.forEach(function(e) {
   e();
  }), c(), 0 !== z.length && h(), z = []);
 }
 function p() {
  return e.find(et, function(e) {
   return g.width > e.screenWidth;
  }).maxWidth;
 }
 function h() {
  var e = y.height - 60, t = (C.elt.offsetWidth - p()) / 2;
  t < n.EDITOR_DEFAULT_PADDING && (t = n.EDITOR_DEFAULT_PADDING), q.style.paddingLeft = t + "px", 
  q.style.paddingRight = t + "px", q.style.paddingBottom = e + "px", W.style.width = t + "px";
  var r = (E.elt.offsetWidth - p()) / 2;
  r < n.EDITOR_DEFAULT_PADDING && (r = n.EDITOR_DEFAULT_PADDING), V.style.paddingLeft = r + "px", 
  V.style.paddingRight = r + "px", V.style.paddingBottom = e + "px";
  var a = nt + at + G + rt;
  window.viewerMode && (a = nt + at + G + it);
  var o = g.width - a + G;
  tt.forEach(function(e, t) {
   a += e.width, t === tt.length - 1 && (a -= rt), g.width < a ? X.appendChild(e.elt) : (Q.insertBefore(e.elt, Y), 
   o = g.width - a + G);
  }), J.css({
   maxWidth: o
  }), K.toggleClass("hide", 0 === X.children.length), i.onLayoutResize();
 }
 function f() {
  b.width = g.width + O + (S.isShown ? B : 0), b.elt.style.width = b.width + "px";
 }
 function m() {
  for (g = {
   width: window.innerWidth,
   height: window.innerHeight
  }; ;) {
   if (b.y = x.isOpen ? 0 : -R, b.x = w.isOpen ? 0 : S.isOpen ? -(O + B) : -O, b.width = g.width + O + B, 
   b.height = g.height - b.y, v.left = O, v.width = g.width, v.height = b.height, y.top = R, 
   y.width = g.width, y.height = b.height - R, b.applyCss(), v.applyCss(), y.applyCss(), 
   window.viewerMode) return _.width = y.width, _.height = y.height, E.width = y.width, 
   E.height = y.height, _.applyCss(), E.applyCss(), h();
   if (!(x.isOpen && y.height < P.height + A)) {
    if (ot) {
     if (_.isOpen) {
      if (_.halfSize && (_.height = (y.height + A) / 2), _.height < F.height && (_.height = F.height), 
      _.y = y.height - _.height, _.y < P.height) {
       var e = y.height - P.height;
       if (e < F.height) {
        _.isOpen = !1, _.$elt.trigger("hide.layout.toggle").trigger("hidden.layout.toggle");
        continue;
       }
       _.height = e, _.y = y.height - _.height;
      }
     } else _.y = y.height - A;
     _.width = y.width, C.height = _.y, C.width = y.width, E.top = A, E.height = _.height - A, 
     E.width = _.width, k.width = L, T.width = L, T.x = (_.width - L) / 2, N.width = E.width;
    } else {
     if (_.isOpen) {
      if (_.halfSize && (_.width = (y.width + A) / 2), _.width < F.width && (_.width = F.width), 
      _.x = y.width - _.width, _.x < P.width) {
       var t = y.width - P.width;
       if (t < F.width) {
        _.isOpen = !1, _.$elt.trigger("hide.layout.toggle").trigger("hidden.layout.toggle");
        continue;
       }
       _.width = t, _.x = y.width - _.width;
      }
     } else _.x = y.width - A;
     _.height = y.height, C.width = _.x, C.height = y.height, E.left = A, E.width = _.width - A, 
     E.height = _.height, k.height = L, T.height = L, T.y = (_.height - L) / 2, N.height = E.height;
    }
    break;
   }
   x.isOpen = !1, x.$elt.trigger("hide.layout.toggle").trigger("hidden.layout.toggle");
  }
  k.$elt.toggleClass("open", x.isOpen), T.$elt.toggleClass("open", _.isOpen), N.$elt.toggleClass("open", _.isOpen), 
  C.applyCss(), _.applyCss(), E.applyCss(), T.applyCss(), N.applyCss(), k.applyCss(), 
  f(), D.adjustPosition(), h();
 }
 var g, b, v, y, x, w, S, C, _, E, k, T, N, D, M, I = {}, A = 32, L = 60, R = 50, P = {
  width: 250,
  height: 140
 }, F = {
  width: 330,
  height: 160
 }, O = 280, B = 320, G = 200, j = 18, U = {
  x: -45,
  y: -6
 }, H = !1, z = [];
 u.prototype.applyCss = function() {
  void 0 !== this.top && (this.elt.style.top = this.top + "px"), void 0 !== this.left && (this.elt.style.left = this.left + "px"), 
  void 0 !== this.bottom && (this.elt.style.bottom = this.bottom + "px"), void 0 !== this.right && (this.elt.style.right = this.right + "px"), 
  (void 0 !== this.x || void 0 !== this.y) && (this.x = this.x || 0, this.y = this.y || 0, 
  this.elt.style["-webkit-transform"] = "translate(" + this.x + "px, " + this.y + "px)", 
  this.elt.style["-ms-transform"] = "translate(" + this.x + "px, " + this.y + "px)", 
  this.elt.style.transform = "translate(" + this.x + "px, " + this.y + "px)"), H && this.width < this.oldWidth ? z.push(e.bind(function() {
   this.elt.style.width = this.width + "px";
  }, this)) : void 0 !== this.width && (this.elt.style.width = this.width + "px"), 
  this.oldWidth = this.width, H && this.height < this.oldHeight ? z.push(e.bind(function() {
   this.elt.style.height = this.height + "px";
  }, this)) : void 0 !== this.height && (this.elt.style.height = this.height + "px"), 
  this.oldHeight = this.height, clearTimeout(M), H && (M = setTimeout(d, 800));
 }, u.prototype.createToggler = function(n) {
  var r, i = 0;
  this.toggle = function(a) {
   a !== this.isOpen && (this.isOpen = e.isBoolean(a) ? a : !this.isOpen, this.isOpen ? (this.isShown = !0, 
   this.$elt.addClass("panel-open").trigger("show.layout.toggle"), n && (r = $(t.createBackdrop(b.elt)).on("click.backdrop", e.bind(function() {
    this.toggle(!1);
   }, this)), this.$elt.addClass("bring-to-front")), z.push(e.bind(function() {
    0 === --i && this.isOpen && this.$elt.trigger("shown.layout.toggle");
   }, this))) : (this.$elt.trigger("hide.layout.toggle"), r && (r.off("click.backdrop"), 
   r[0].removeBackdrop(), r = void 0), z.push(e.bind(function() {
    0 === --i && (this.isOpen || (this.isShown = !1, this.$elt.removeClass("panel-open bring-to-front").trigger("hidden.layout.toggle")));
   }, this))), i++, l(), m());
  };
 }, u.prototype.initHammer = function(e) {
  this.hammer = s(this.elt, {
   drag: e ? !0 : !1,
   drag_max_touches: 0,
   gesture: !1,
   hold: !1,
   release: !1,
   swipe: e ? !1 : !0,
   tap: !1,
   touch: !1,
   transform: !1
  });
 };
 var q, V, W, Q, X, K, Y, J, Z = [ {
  screenWidth: 0,
  maxWidth: 600 * r.maxWidthRatio
 }, {
  screenWidth: 1e3,
  maxWidth: 700 * r.maxWidthRatio
 }, {
  screenWidth: 1200,
  maxWidth: 800 * r.maxWidthRatio
 }, {
  screenWidth: 1400,
  maxWidth: 900 * r.maxWidthRatio
 } ], et = Z.slice(0).reverse(), tt = [], nt = ([ 80, 80, 160, 160, 80, 40 ].map(function(e) {
  return e + 18;
 }), 86), rt = 40, it = 100, at = 88, ot = "vertical" == r.layoutOrientation;
 return I.init = function() {
  var e = 0;
  return $(document.body).on("show.bs.modal", ".modal", function() {
   e++;
  }).on("hidden.bs.modal", ".modal", function() {
   e--;
  }), function(e) {
   e.position = "absolute", e.top = 0, e.left = 0, e.bottom = 0, e.right = 0, e.overflow = "hidden";
  }(document.body.style), document.documentElement.style.overflow = "hidden", b = new u(".layout-wrapper-l1"), 
  v = new u(".layout-wrapper-l2"), y = new u(".layout-wrapper-l3"), x = new u(".navbar"), 
  w = new u(".menu-panel"), S = new u(".document-panel"), C = new u("#wmd-input"), 
  _ = new u(".preview-panel"), E = new u(".preview-container"), k = new u(".layout-toggler-navbar"), 
  T = new u(".layout-toggler-preview"), N = new u(".layout-resizer-preview"), D = new u(".extension-preview-buttons"), 
  q = C.elt.querySelector(".editor-content"), V = document.getElementById("preview-contents"), 
  W = C.elt.querySelector(".editor-margin"), Q = x.elt.querySelector(".navbar-inner"), 
  X = x.elt.querySelector(".buttons-dropdown .dropdown-menu"), K = x.$elt.find(".buttons-dropdown"), 
  Y = x.elt.querySelector(".title-container"), void (J = x.$elt.find(".file-title-navbar, .input-file-title"));
 }, i.addListener("onReady", function() {
  return;
 }), i.addListener("onExtensionButtonResize", function() {
  D.isDragged ? D.adjustPosition() : D.isOpen || (D.$elt.removeClass("animate"), D.x = U.x + D.elt.offsetWidth + j, 
  D.applyCss(), setTimeout(function() {
   D.$elt.addClass("animate");
  }, 0));
 }), i.onLayoutCreated(I), I;
}), define("text!html/bodyEditor.html", [], function() {
 return '\nlife\n\n<div class="layout-wrapper-l1">\n	<div class="layout-wrapper-l2">\n		<div class="navbar navbar-default">\n			<div class="navbar-inner">\n				<div class="nav left-space"></div>\n				<div class="nav right-space pull-right"></div>\n				<div class="buttons-dropdown dropdown">\n		    		<div class="nav">\n		        		<button class="btn btn-success" data-toggle="dropdown"\n		            		title="Show buttons">\n		            		<i class="icon-th-large"></i>\n		            	</button>\n		    		    <div class="dropdown-menu">\n		        		</div>\n		        	</div>\n				</div>\n				<ul class="nav left-buttons">\n					<li class="wmd-button-group1 btn-group"></li>\n				</ul>\n				<ul class="nav left-buttons">\n					<li class="wmd-button-group2 btn-group"></li>\n				</ul>\n				<ul class="nav left-buttons">\n					<li class="wmd-button-group3 btn-group"></li>\n				</ul>\n				<ul class="nav left-buttons">\n					<li class="wmd-button-group5 btn-group"></li>\n				</ul>\n				<ul class="nav left-buttons">\n					<li class="wmd-button-group4 btn-group">\n						<a class="btn btn-success button-open-discussion" title="Comments Ctrl/Cmd+M"><i class="icon-comment-alt"></i></a>\n					</li>\n				</ul>\n				<ul class="nav pull-right right-buttons">\n					<li class="offline-status hide">\n					    <div class="text-danger">\n					        <i class="icon-attention-circled"></i>offline\n					    </div>\n					</li>\n					<li class="extension-buttons"></li>\n				</ul>\n				<ul class="nav pull-right title-container">\n					<li><div class="working-indicator"></div></li>\n					<li><a class="btn btn-success file-title-navbar" href="#"\n						title="Rename document"> </a></li>\n					<li><div class="input-file-title-container"><input type="text"\n						class="col-sm-4 form-control hide input-file-title"\n						placeholder="Document title" /></div></li>\n				</ul>\n			</div>\n		</div>\n		<div class="layout-wrapper-l3">\n			<pre id="wmd-input" class="form-control"><div class="editor-content" contenteditable=true></div><div class="editor-margin"></div></pre>\n			<div class="preview-panel">\n				<div class="layout-resizer layout-resizer-preview"></div>\n				<div class="layout-toggler layout-toggler-navbar btn btn-info" title="Toggle navigation bar"><i class="icon-th"></i></div>\n				<div class="layout-toggler layout-toggler-preview btn btn-info" title="Toggle preview"><i class="icon-none"></i></div>\n				<div class="preview-container">\n					<div id="preview-contents">\n						<div id="wmd-preview" class="preview-content"></div>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class="extension-preview-buttons">\n			<div class="btn-group drag-me" title="Drag me!">\n				<i class="icon-ellipsis-vert"></i>\n			</div>\n		</div>\n	</div>\n	<div id="wmd-button-bar" class="hide"></div>\n</div>\n\n<div class="modal fade modal-document-manager">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Manage documents</h2>\n			</div>\n			<div class="modal-body">\n				<div></div>\n				<ul class="nav nav-pills document-list">\n					<li class="pull-right dropdown"><a href="#"\n						data-toggle="dropdown"><i class="icon-check"></i> Selection <b\n							class="caret"></b></a>\n						<ul class="dropdown-menu">\n							<li><a href="#" class="action-select-all"><i\n									class="icon-check"></i> Select all</a></li>\n							<li><a href="#" class="action-unselect-all"><i\n									class="icon-check-empty"></i> Unselect all</a></li>\n							<li class="divider"></li>\n							<li><a href="#" class="action-move-items"><i\n									class="icon-forward"></i> Move to folder</a></li>\n							<li><a href="#" class="action-delete-items"><i\n									class="icon-trash"></i> Delete</a></li>\n						</ul></li>\n					<li class="pull-right"><a href="#"\n						class="action-create-folder"> <i class="icon-folder"></i>\n							Create folder\n					</a></li>\n					<li class="disabled"><a><i class="icon-file"></i> <span\n							class="document-count"></span></a></li>\n					<li class="disabled"><a><i class="icon-folder"></i> <span\n							class="folder-count"></span></a></li>\n				</ul>\n				<div class="list-group document-list"></div>\n				<p class="confirm-delete hide">The following documents will be\n					deleted locally:</p>\n				<p class="choose-folder hide">Please choose a destination\n					folder:</p>\n				<div class="list-group selected-document-list hide"></div>\n				<div class="list-group select-folder-list hide"></div>\n			</div>\n			<div class="modal-footer">\n				<a href="#"\n					class="btn btn-default confirm-delete choose-folder action-cancel hide">Cancel</a>\n				<a href="#"\n					class="btn btn-primary confirm-delete action-delete-items-confirm hide">OK</a>\n				<a href="#" class="btn btn-primary document-list"\n					data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-insert-link">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Hyperlink</h2>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the link URL and an optional title:</p>\n				<div class="input-group">\n					<span class="input-group-addon"><i class="icon-globe"></i></span><input\n						id="input-insert-link" type="text" class="col-sm-5 form-control"\n						placeholder=\'http://example.com/ "optional title"\' />\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-insert-link"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-insert-image">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Image</h2>\n			</div>\n			<div class="modal-body">\n				<p>Please provide the image URL and an optional title:</p>\n				<div class="input-group">\n					<span class="input-group-addon"><i class="icon-picture"></i></span><input\n						id="input-insert-image" type="text" class="col-sm-5 form-control"\n						placeholder=\'http://example.com/image.jpg "optional title"\' />\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default pull-left action-import-image-gplus"\n					data-dismiss="modal"><i class="icon-provider-gplus"></i> Import\n					from Google+</a> <a href="#" class="btn btn-default"\n					data-dismiss="modal">Cancel</a> <a href="#"\n					class="btn btn-primary action-insert-image" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-import-image">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Google+ image import</h2>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group">\n						<div class="col-sm-7">\n							<img>\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-sm-4 control-label"\n							for="input-import-image-title">Title (optional)</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-import-image-title"\n								placeholder="Image title" class="form-control">\n						</div>\n					</div>\n					<div class="form-group">\n						<label class="col-sm-4 control-label"\n							for="input-import-image-size">Size limit (optional)</label>\n						<div class="col-sm-7 form-inline">\n							<input type="text" id="input-import-image-size" placeholder="0"\n								class="col-sm-3 form-control"> px\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-import-image"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-remove-file-confirm">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Delete</h2>\n			</div>\n			<div class="modal-body">\n				<p>\n					Are you sure you want to delete "<span class="file-title"></span>"?\n				</p>\n				<blockquote>\n					<p><b>Note:</b> It won\'t delete the file on synchronized locations.</p>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-remove-file"\n					data-dismiss="modal">Delete</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-import-url">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Import from URL</h2>\n			</div>\n			<div class="modal-body">\n				<p>Please provide a link to a Markdown document.</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-sm-3 control-label" for="input-import-url">URL</label>\n						<div class="col-sm-8">\n							<input type="text" id="input-import-url"\n								placeholder="http://www.abc.com/xyz.md" class="form-control">\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-import-url">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-import-harddrive-markdown">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Import from disk</h2>\n			</div>\n			<div class="modal-body">\n				<p>Please select your Markdown files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-markdown"\n						multiple class="form-control" />\n				</p>\n				<p>Or drag and drop your Markdown files here:</p>\n				<p id="dropzone-import-harddrive-markdown" class="drop-zone">Drop\n					files here</p>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-import-harddrive-html">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Convert HTML to Markdown</h2>\n			</div>\n			<div class="modal-body">\n				<p>Please select your HTML files here:</p>\n				<p>\n					<input type="file" id="input-file-import-harddrive-html" multiple\n						class="form-control" />\n				</p>\n				<p>Or drag and drop your HTML files here:</p>\n				<p id="dropzone-import-harddrive-html" class="drop-zone">Drop\n					files here</p>\n				<p>Or insert your HTML code here:</p>\n				<textarea id="input-convert-html" class="form-control"></textarea>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Close</a> <a\n					href="#" class="btn btn-primary action-convert-html"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-upload-gdrive">\n</div>\n<div class="modal fade modal-upload-gdrivesec">\n</div>\n<div class="modal fade modal-upload-gdriveter">\n</div>\n\n\n<div class="modal fade modal-autosync-gdrive">\n</div>\n<div class="modal fade modal-autosync-gdrivesec">\n</div>\n<div class="modal fade modal-autosync-gdriveter">\n</div>\n\n\n<div class="modal fade modal-upload-dropbox">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Save on Dropbox</h2>\n			</div>\n			<div class="modal-body">\n				<p>\n					This will save "<span class="file-title"></span>" to your <i\n						class="icon-provider-dropbox"></i>\n					<code>Dropbox</code>\n					account and keep it synchronized.\n				</p>\n				<div class="form-horizontal">\n					<div class="form-group">\n						<label class="col-sm-3 control-label"\n							for="input-sync-export-dropbox-path">File path</label>\n						<div class="col-sm-8">\n							<input type="text" id="input-sync-export-dropbox-path"\n								placeholder="/path/to/My Document.md" class="form-control">\n							<span class="help-block"> File path is composed of both\n								folder and filename. </span>\n						</div>\n					</div>\n				</div>\n				<blockquote>\n					<b>Note:</b>\n					<ul>\n						<li>Dropbox file path does not depend on document title.</li>\n						<li>The title of your document will not be synchronized.</li>\n						<li>Destination folder must exist.</li>\n						<li>Any existing file at this location will be overwritten.</li>\n					</ul>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-sync-export-dropbox">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-download-couchdb">\n    <div class="modal-dialog">\n        <div class="modal-content">\n\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"\n                        aria-hidden="true">&times;</button>\n                <h2 class="modal-title">Open from CouchDB</h2>\n                <div class="form-horizontal list-mode">\n                    <br>\n                    <div class="form-group form-inline">\n                        <label for="input-sync-import-couchdb-tag" class="col-sm-3 control-label">Filter by tag</label>\n                        <select id="input-sync-import-couchdb-tag" class="col-sm-4 form-control">\n                        </select>\n                        <span class="col-sm-5">\n                            <a class="btn btn-link action-add-tag"><i class="icon-tag"></i> Add\n                            </a>\n                            <a class="btn btn-link action-remove-tag"><i class="icon-tag"></i> Remove\n                            </a>\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class="modal-body">\n                <p class="msg-default-couchdb hide alert alert-danger"><i class="icon-attention"></i> <b>Careful:</b>\n                    You\'re using the public CouchDB instance.\n                    <b>Anybody can open, edit and delete your files there!</b> To setup your own CouchDB instance <a\n                            target="blank" href="https://github.com/benweet/stackedit/blob/master/doc/couchdb-setup.md">click\n                        here</a>.\n                </p>\n\n                <div class="form-horizontal byid-mode">\n                    <div class="form-group">\n                        <label for="input-sync-import-couchdb-documentid" class="col-sm-3 control-label">Document\n                            ID</label>\n\n                        <div class="col-sm-9">\n                            <input id="input-sync-import-couchdb-documentid" class="form-control"\n                                   placeholder="DocumentID">\n                            <span class="help-block">Multiple IDs can be provided (space separated)</span>\n                        </div>\n                    </div>\n                </div>\n                    <ul class="list-mode nav nav-pills">\n                        <li class="pull-right dropdown"><a href="#"\n                                                           data-toggle="dropdown"><i class="icon-check"></i> Selection\n                            <b class="caret"></b></a>\n                            <ul class="dropdown-menu">\n                                <li><a href="#" class="action-unselect-all"><i\n                                        class="icon-check-empty"></i> Unselect all</a></li>\n                                <li class="divider"></li>\n                                <li><a href="#" class="action-delete-items"><i\n                                        class="icon-trash"></i> Delete</a></li>\n                            </ul>\n                        </li>\n                    </ul>\n                    <p class="list-mode">\n                    </p>\n                    <div class="list-group document-list list-mode"></div>\n                <div class="list-mode text-center">\n                    <div class="please-wait"><b>Please wait...</b></div>\n                    <div class="no-document"><b>No document.</b></div>\n                    <button class="more-documents btn btn-link"><i class="icon-angle-double-down"></i> More documents!</button>\n                </div>\n                <p class="delete-mode hide">The following documents will be\n                    removed from CouchDB:</p>\n\n                <div class="delete-mode list-group selected-document-list hide"></div>\n            </div>\n            <div class="modal-footer">\n                <a href="#" class="btn btn-default pull-left list-mode action-byid-mode">Open by ID...</a>\n                <a href="#"\n                   class="btn btn-default delete-mode action-cancel hide">Cancel</a>\n                <a href="#"\n                   class="btn btn-primary delete-mode action-delete-items-confirm hide">Delete</a>\n                <a href="#" class="btn btn-default byid-mode action-cancel">Cancel</a>\n                <a href="#" data-dismiss="modal"\n                   class="btn btn-primary action-sync-import-couchdb byid-mode">Open</a>\n                <a href="#" class="btn btn-default list-mode" data-dismiss="modal">Cancel</a>\n                <a href="#" data-dismiss="modal"\n                   class="btn btn-primary action-sync-import-couchdb list-mode">Open</a>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class="modal fade modal-upload-couchdb">\n    <div class="modal-dialog">\n        <div class="modal-content">\n\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal"\n                        aria-hidden="true">&times;</button>\n                <h2 class="modal-title">Save on CouchDB</h2>\n            </div>\n            <div class="modal-body">\n                <p class="msg-default-couchdb hide alert alert-danger"><i class="icon-attention"></i> <b>Careful:</b>\n                    You\'re using the public CouchDB instance.\n                    <b>Anybody can open, edit and delete your files there!</b> To setup your own CouchDB instance <a\n                            target="blank" href="https://github.com/benweet/stackedit/blob/master/doc/couchdb-setup.md">click\n                        here</a>.\n                </p>\n\n                <p>\n                    This will save "<span class="file-title"></span>" to CouchDB and keep it synchronized.\n                </p>\n                <blockquote>\n                    <p><b>Tip:</b> You can use a\n                    <a href="http://jekyllrb.com/docs/frontmatter/"\n                       target="_blank">YAML front matter</a> to specify tags for your document.</p>\n                    <p>Alternatively, you can place comma separated tags in square brackets at the beginning of the document title.</p>\n                </blockquote>\n            </div>\n            <div class="modal-footer">\n                <a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n                <a href="#" data-dismiss="modal"\n                   class="btn btn-primary action-sync-export-couchdb">OK</a>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class="modal fade modal-manage-sync">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Synchronization</h2>\n			</div>\n			<div class="modal-body">\n				<p>\n					"<span class="file-title"></span>" is synchronized with the\n					following location(s):\n				</p>\n				<div class="sync-list"></div>\n				<blockquote>\n					<p><b>Note:</b> Removing a synchronized location will not delete any\n					file.</p>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-publish">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">\n					Publish on <span class="publish-provider-name"></span>\n				</h2>\n			</div>\n			<div class="modal-body">\n				<div class="form-horizontal">\n					<div class="form-group modal-publish-ssh">\n						<label class="col-sm-4 control-label" for="input-publish-ssh-host">Host</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-ssh-host"\n								placeholder="hostname.or.ip" class="form-control"> <span\n								class="help-block"> Host must be accessible publicly,\n								unless you\'re hosting your own StackEdit instance.\n							</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-sm-4 control-label" for="input-publish-ssh-port">Port\n							(optional)</label>\n						<div class="col-sm-2">\n							<input type="text" id="input-publish-ssh-port" placeholder="22"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-sm-4 control-label"\n							for="input-publish-ssh-username">Username</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-ssh-username"\n								placeholder="username" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh">\n						<label class="col-sm-4 control-label"\n							for="input-publish-ssh-password">Password</label>\n						<div class="col-sm-7">\n							<input type="password" id="input-publish-ssh-password"\n								placeholder="password" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-sm-4 control-label"\n							for="input-publish-github-repo">Repository</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-github-repo"\n								placeholder="Repository name or URL" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-github">\n						<label class="col-sm-4 control-label"\n							for="input-publish-github-branch">Branch</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-github-branch"\n								placeholder="branch-name" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-ssh modal-publish-github">\n						<label class="col-sm-4 control-label"\n							for="input-publish-file-path">File path</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-file-path"\n								placeholder="path/to/file.md" class="form-control">\n							<span class="help-block"> File path is composed of both\n								folder and filename. </span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-sm-4 control-label" for="input-publish-filename">Filename</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-filename"\n								placeholder="filename" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-sm-4 control-label" for="input-publish-gist-id">Existing\n							ID (optional)</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-gist-id"\n								placeholder="GistID" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-gist">\n						<label class="col-sm-4 control-label"\n							for="input-publish-gist-public">Public</label>\n						<div class="col-sm-7">\n							<div class="checkbox">\n								<input type="checkbox" id="input-publish-gist-public"\n									checked="checked" />\n							</div>\n						</div>\n					</div>\n					<div class="form-group modal-publish-blogger modal-publish-bloggerpage">\n						<label class="col-sm-4 control-label"\n							for="input-publish-blogger-url">Blog URL</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-blogger-url"\n								placeholder="http://exemple.blogger.com/" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-tumblr">\n						<label class="col-sm-4 control-label"\n							for="input-publish-tumblr-hostname">Blog hostname</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-tumblr-hostname"\n								placeholder="exemple.tumblr.com" class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-wordpress">\n						<label class="col-sm-4 control-label"\n							for="input-publish-tumblr-hostname">WordPress site</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-wordpress-site"\n								placeholder="exemple.wordpress.com" class="form-control">\n							<span class="help-block"> <a target="_blank"\n								href="http://jetpack.me/">Jetpack plugin</a> is required for\n								self-hosted sites.\n							</span>\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-blogger modal-publish-tumblr modal-publish-wordpress">\n						<label class="col-sm-4 control-label" for="input-publish-postid">Update\n							existing post ID (optional)</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-postid" placeholder="PostID"\n								class="form-control">\n						</div>\n					</div>\n					<div\n						class="form-group modal-publish-bloggerpage">\n						<label class="col-sm-4 control-label" for="input-publish-pageid">Update\n							existing page ID (optional)</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-pageid" placeholder="PageID"\n								class="form-control">\n						</div>\n					</div>\n					<div class="form-group modal-publish-dropbox">\n						<label class="col-sm-4 control-label"\n							for="input-publish-dropbox-path">File path</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-dropbox-path"\n								placeholder="/path/to/My Document.html" class="form-control">\n							<span class="help-block"> File path is composed of both\n								folder and filename. </span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-sm-4 control-label"\n							for="input-publish-gdrive-fileid">File ID (optional)</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-gdrive-fileid"\n								placeholder="FileID" class="form-control"> <span\n								class="help-block">If no file ID is supplied, a new file\n								will be created in your Google Drive root folder. You can move\n								the file afterwards within Google Drive.</span>\n						</div>\n					</div>\n					<div class="form-group modal-publish-gdrive">\n						<label class="col-sm-4 control-label"\n							for="input-publish-gdrive-filename">Force filename\n							(optional)</label>\n						<div class="col-sm-7">\n							<input type="text" id="input-publish-gdrive-filename"\n								placeholder="Filename" class="form-control"> <span\n								class="help-block">If no file name is supplied, the\n								document title will be used.</span>\n						</div>\n					</div>\n\n					<div class="form-group">\n						<label class="col-sm-4 control-label">Format</label>\n						<div class="col-sm-7">\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="markdown"> Markdown\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="html"> HTML\n								</label>\n							</div>\n							<div class="radio">\n								<label> <input type="radio" name="radio-publish-format"\n									value="template"> Template\n								</label>\n							</div>\n						</div>\n					</div>\n					<div class="collapse publish-custom-template-collapse">\n						<div class="form-group">\n							<div class="col-sm-4"></div>\n							<div class="col-sm-7">\n								<div class="checkbox">\n									<label> <input type="checkbox"\n										id="checkbox-publish-custom-template"> Custom template\n									</label> <a href="#" class="tooltip-template">(?)</a>\n								</div>\n							</div>\n						</div>\n						<div class="form-group">\n							<div class="col-sm-4"></div>\n							<div class="col-sm-7">\n								<textarea class="form-control"\n									id="textarea-publish-custom-template"></textarea>\n							</div>\n						</div>\n					</div>\n				</div>\n				<blockquote class="front-matter-info modal-publish-blogger modal-publish-tumblr modal-publish-wordpress">\n                    <p><b>Tip:</b> You can use a\n                    <a href="http://jekyllrb.com/docs/frontmatter/"\n                    target="_blank">YAML front matter</a> to specify the title and the tags/labels of your publication.</p>\n                    <p><b>Interpreted variables:</b> <code>title</code>, <code>tags</code>, <code>published</code>, <code>date</code>.</p>\n				</blockquote>\n				<blockquote class="front-matter-info modal-publish-bloggerpage">\n                    <p><b>Tip:</b> You can use a\n                    <a href="http://jekyllrb.com/docs/frontmatter/"\n                    target="_blank">YAML front matter</a> to specify the title of your page.</p>\n                    <p><b>Interpreted variables:</b> <code>title</code>.</p>\n				</blockquote>\n				<blockquote class="url-info modal-publish-bloggerpage">\n                    <p><b>About URL:</b> For newly created page , Blogger API will append a generated number to the url like <code>about-me-1234.html</code>, if you deeply care about your URL naming, you should first create the page on Blogger and then update them with StackEdit specifying the pageId when publishing.\n                    </p>\n                    <p><b>About page visibility:</b> Blogger API does not respect published status for pages.When publishing the page to Blogger, the page will be <strong>live</strong> but not added to the page listing. You should arrange the page listing from Blogger dashboard.\n                    </p>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" data-dismiss="modal"\n					class="btn btn-primary action-process-publish">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-manage-publish">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Publication</h2>\n			</div>\n			<div class="modal-body">\n				<p>\n					"<span class="file-title"></span>" is published on the following\n					location(s):\n				</p>\n				<div class="publish-list"></div>\n				<blockquote>\n					<p><b>Note:</b> Removing a publish location will not delete the actual publication.</p>\n				</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-manage-sharing">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Sharing</h2>\n			</div>\n			<div class="modal-body">\n                <p>Collaborate on "<span class="file-title"></span>" using the following link(s):</p>\n            	<p class="msg-no-share-editor"><b>No sharing link yet!</b>\n            	</p>\n                <div class="share-editor-list"></div>\n            	<blockquote>\n                    <p><b>Note:</b> To collaborate on this document, just <a\n                        href="#" class="action-sync-export-dialog-couchdb" data-dismiss="modal">save it on CouchDB</a>.\n                    To collaborate via Google Drive or Dropbox, you have to share the file manually from Google Drive/Dropbox websites.</p>\n            	</blockquote>\n                <hr>\n                <p>Share a read-only version of "<span class="file-title"></span>" using the following link(s):</p>\n            	<p class="msg-no-share-viewer"><b>No sharing link yet!</b>\n            	</p>\n                <div class="share-viewer-list"></div>\n            	<blockquote>\n                    <p><b>Note:</b> To share a read-only version of this document, just <a\n                        href="#" class="action-publish-gist" data-dismiss="modal">publish it as a Gist</a> in\n                    Markdown format.</p>\n            	</blockquote>\n            	<blockquote>\n            		<p><b>Tip:</b> You can open any markdown URL within StackEdit Viewer using <a\n            			href="viewer#!url=https://raw.github.com/benweet/stackedit/master/README.md"\n            			title="Sharing example"><code>viewer#!url=</code></a>.</p>\n            	</blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary" data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-settings">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<button type="button" class="close" data-dismiss="modal"\n					aria-hidden="true">&times;</button>\n				<h2 class="modal-title">Settings</h2>\n				<ul class="nav nav-tabs">\n					<li class="active"><a class="action-load-settings"\n						href="#tabpane-settings-basic" data-toggle="tab">Basic</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-advanced" data-toggle="tab">Advanced</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-extensions" data-toggle="tab">Extensions</a></li>\n					<li><a class="action-load-settings"\n						href="#tabpane-settings-utils" data-toggle="tab">Utils</a></li>\n				</ul>\n			</div>\n			<div class="modal-body">\n\n				<div class="tab-content clearfix">\n					<div class="tab-pane active" id="tabpane-settings-basic">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-sm-4 control-label">Layout orientation</label>\n								<div class="col-sm-7">\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="horizontal">\n											Horizontal\n										</label>\n									</div>\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-layout-orientation" value="vertical">\n											Vertical\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label" for="input-settings-theme">Theme</label>\n								<div class="col-sm-7">\n									<select id="input-settings-theme" class="form-control">\n									</select>\n								</div>\n							</div>\n							<div class="form-group">\n								<div class="col-sm-4"></div>\n								<div class="col-sm-7">\n									<div class="checkbox">\n									    <label>\n										    <input type="checkbox" id="input-settings-markdown-extra" />\n										    <b>Markdown Extra/GitHub Flavored Markdown</b> syntax\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<div class="col-sm-4"></div>\n								<div class="col-sm-7">\n									<div class="checkbox">\n									    <label>\n										    <input type="checkbox" id="input-settings-mathjax" />\n										    <b>LaTeX mathematical expressions</b> using <code>$</code> and <code>$$</code> delimiters\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-gdrive-multiaccount">Google Drive multi-accounts\n								</label>\n								<div class="col-sm-7">\n									<select id="input-settings-gdrive-multiaccount" class="form-control">\n    									<option value="1">1 account</option>\n    									<option value="2">2 accounts</option>\n    									<option value="3">3 accounts</option>\n									</select>\n									<span class="help-block"><b>Please sign in first with Google.</b> Once linked with your Google accounts, changing account is not possible unless you reset the application.</span>\n								</div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-advanced">\n						<div class="form-horizontal">\n							<div class="form-group">\n								<label class="col-sm-4 control-label">Edit mode</label>\n								<div class="col-sm-7">\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-settings-edit-mode" value="ltr">\n											Left-To-Right\n										</label>\n									</div>\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-settings-edit-mode" value="rtl">\n											Right-To-Left\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label">Editor\'s font style</label>\n								<div class="col-sm-7">\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-settings-editor-font-class" value="font-rich">\n											Rich\n										</label>\n									</div>\n									<div class="radio">\n										<label> <input type="radio"\n											name="radio-settings-editor-font-class" value="font-monospaced">\n											Monospaced\n										</label>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-font-size">Font size ratio</label>\n								<div class="col-sm-8 form-inline">\n									<input type="text" id="input-settings-font-size"\n										class="form-control col-sm-2">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-max-width">Max width ratio</label>\n								<div class="col-sm-8 form-inline">\n									<input type="text" id="input-settings-max-width"\n										class="form-control col-sm-2">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-cursor-focus">Cursor focus ratio</label>\n								<div class="col-sm-8 form-inline">\n									<input type="text" id="input-settings-cursor-focus"\n										class="form-control col-sm-2">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-lazy-rendering">Lazy rendering <a\n									href="#" class="tooltip-lazy-rendering">(?)</a>\n								</label>\n								<div class="col-sm-7">\n									<div class="checkbox">\n										<input type="checkbox" id="input-settings-lazy-rendering" />\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="textarea-settings-default-content">Default content\n									<a href="#" class="tooltip-default-content">(?)</a>\n								</label>\n								<div class="col-sm-7">\n									<textarea id="textarea-settings-default-content"\n										class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="textarea-settings-publish-template">Default\n									template <a href="#" class="tooltip-template">(?)</a>\n								</label>\n								<div class="col-sm-7">\n									<textarea id="textarea-settings-publish-template"\n										class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="textarea-settings-pdf-template">PDF\n									template <a href="#" class="tooltip-template">(?)</a>\n								</label>\n								<div class="col-sm-7">\n									<textarea id="textarea-settings-pdf-template"\n										class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label" for="textarea-settings-pdf-options">PDF options\n                                    <a href="#" class="tooltip-pdf-options">(?)</a>\n                                </label>\n								<div class="col-sm-7">\n                                    <textarea id="textarea-settings-pdf-options"\n                                              class="form-control"></textarea>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-markdown-mime-type">Markdown MIME type\n								</label>\n								<div class="col-sm-7">\n									<select id="input-settings-markdown-mime-type" class="form-control">\n										<option value="text/plain">text/plain</option>\n										<option value="text/x-markdown">text/x-markdown</option>\n									</select>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label">Permissions</label>\n								<div class="col-sm-7">\n									<div class="checkbox">\n									    <label>\n										    <input type="checkbox" id="input-settings-gdrive-full-access" />\n										    Allow StackEdit to open any document in Google Drive\n										</label> <span class="help-block">Existing authorization has to be revoked in\n										<a href="https://www.google.com/settings/dashboard" target="_blank">Google Dashboard</a>\n										for this change to take effect.</span>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<div class="col-sm-4"></div>\n								<div class="col-sm-7">\n									<div class="checkbox">\n									    <label>\n										    <input type="checkbox" id="input-settings-dropbox-full-access" />\n										    Allow StackEdit to open any document in Dropbox\n										</label> <span class="help-block">If unchecked, access will be restricted to folder\n										<b>/Applications/StackEdit</b> for existing files.</span>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<div class="col-sm-4"></div>\n								<div class="col-sm-7">\n									<div class="checkbox">\n									    <label>\n										    <input type="checkbox" id="input-settings-github-full-access" />\n										    Allow StackEdit to access private repositories in GitHub\n										</label> <span class="help-block">Existing authorization has to be revoked in\n										<a href="https://github.com/settings/applications" target="_blank">GitHub settings</a>\n										for this change to take effect.</span>\n									</div>\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-publish-commit-msg">GitHub commit message</label>\n								<div class="col-sm-7">\n									<input type="text" id="input-settings-publish-commit-msg"\n										class="form-control">\n								</div>\n							</div>\n							<div class="form-group">\n								<label class="col-sm-4 control-label"\n									for="input-settings-couchdb-url">CouchDB URL</label>\n								<div class="col-sm-7">\n									<input type="text" id="input-settings-couchdb-url"\n										class="form-control">\n                                    <span class="help-block pull-right"><a\n                                            target="blank"\n                                            href="https://github.com/benweet/stackedit/blob/master/doc/couchdb-setup.md">Setup\n                                        your own CouchDB...</a></span>\n                                </div>\n							</div>\n						</div>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-extensions">\n						<div class="panel-group accordion-extensions"></div>\n						<span class="help-block pull-right"><a target="_blank"\n							href="https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#developer-guide">Create\n								your own extension...</a></span>\n					</div>\n					<div class="tab-pane" id="tabpane-settings-utils">\n						<div class="tab-pane-button-container">\n							<a href="#" class="btn btn-block btn-default action-welcome-file"\n								data-dismiss="modal"><i class="icon-help-circled"></i>\n								Hello! document</a> <a href="#"\n								class="btn btn-block btn-default action-welcome-tour"\n								data-dismiss="modal"><i\n								class="icon-help-circled"></i> Welcome tour</a>\n						</div>\n						<div class="tab-pane-button-container">\n							<a href="#"\n								class="btn btn-block btn-default action-import-docs-settings"><i\n								class="icon-cog-alt"></i> Import docs & settings</a> <a href="#"\n								class="btn btn-block btn-default action-export-docs-settings"\n								data-dismiss="modal"><i class="icon-cog-alt"></i>\n								Export docs & settings</a> <input type="file"\n								id="input-file-import-docs-settings" class="hide">\n						</div>\n						<div class="tab-pane-button-container">\n							<a href="#"\n								class="btn btn-block btn-default action-default-settings"\n								data-dismiss="modal"><i class="icon-wrench"></i>\n								Load default settings</a> <a href="#" class="btn btn-block btn-default"\n								data-dismiss="modal" data-toggle="modal"\n								data-target=".modal-app-reset"><i\n								class="icon-fire"></i> Reset application</a> <a target="_blank" href="recovery.html" class="btn btn-block btn-default"><i\n								class="icon-medkit"></i> StackEdit recovery</a>\n						</div>\n					</div>\n				</div>\n\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-apply-settings"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-non-unique">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h2 class="modal-title">Ooops...</h2>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote>\n                    <p>If you want to reopen StackEdit, click on\n					"Reload".</p>\n                </blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-redirect-confirm">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h2 class="modal-title">Redirection</h2>\n			</div>\n			<div class="modal-body">\n			    <p class="redirect-msg"></p>\n				<blockquote>\n                    <p>Please click <b>OK</b> to proceed.</p>\n                </blockquote>\n			</div>\n			<div class="modal-footer">\n				<a class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a class="btn btn-primary action-redirect-confirm" data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-app-reset">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h2 class="modal-title">Reset application</h2>\n			</div>\n			<div class="modal-body">\n				<p>This will delete all your local documents.</p>\n				<blockquote><b>Are you sure?</b></blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-app-reset"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-import-docs-settings">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h2 class="modal-title">Import documents and settings</h2>\n			</div>\n			<div class="modal-body">\n				<p>This will delete all existing local documents.</p>\n				<blockquote><b>Are you sure?</b></blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>\n				<a href="#" class="btn btn-primary action-import-docs-settings-confirm"\n					data-dismiss="modal">OK</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-add-google-drive-account">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h2 class="modal-title">Add Google Drive account</h2>\n			</div>\n			<div class="modal-body">\n				<p>To perform this request, you need to configure another Google Drive account in StackEdit.</p>\n				<blockquote><b>Do you want to proceed?</b></blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-default action-remove-google-drive-state"\n					data-dismiss="modal">No</a>\n				<a href="#" class="btn btn-primary action-add-google-drive-account"\n					data-dismiss="modal">Yes</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div class="modal fade modal-sponsor-only">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h2 class="modal-title">Sponsor only!</h2>\n			</div>\n			<div class="modal-body">\n				<p>This feature is restricted to sponsor users as it\'s a web service hosted on Amazon EC2.\n                    Note that sponsoring StackEdit would cost you only $5/year.</p>\n				<p>To see how a PDF looks <a target="_blank" href="/Welcome%20document.pdf">click here</a>.</p>\n				<blockquote>\n                    <p><b>Tip:</b> PDFs are fully customizable via Settings>Advanced>PDF template/options.</p>\n                </blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="#" class="btn btn-primary"\n					data-dismiss="modal">Close</a>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n<div id="dropboxjs" data-app-key="x0k2l8puemfvg0o"></div>\n';
}), define("text!html/bodyViewer.html", [], function() {
 return '<div class="layout-wrapper-l1">\n	<div class="layout-wrapper-l2">\n		<div class="navbar navbar-default">\n			<div class="navbar-inner">\n				<div class="nav left-space"></div>\n				<div class="nav right-space pull-right"></div>\n				<div class="buttons-dropdown dropdown">\n					<div class="nav">\n						<button class="btn btn-success" data-toggle="dropdown"\n							title="Show buttons">\n							<i class="icon-th-large"></i>\n						</button>\n						<div class="dropdown-menu">\n						</div>\n					</div>\n				</div>\n				<ul class="nav pull-right">\n					<li class="btn-group">\n						<button class="btn btn-success action-edit-document hide"\n							title="Edit this document">\n							<i class="icon-pencil"></i>\n						</button>\n					</li>\n					<li class="btn-group">\n						<button class="btn btn-success dropdown-toggle"\n							data-toggle="dropdown" title="Save this document">\n							<i class="icon-download"></i>\n						</button>\n						<ul class="dropdown-menu">\n							<li><a class="action-download-md" href="#"><i\n								class="icon-download"></i> Export as Markdown</a></li>\n							<li><a class="action-download-html" href="#"><i\n								class="icon-download"></i> Export as HTML</a></li>\n							<li><a class="action-download-template" href="#"><i\n								class="icon-download"></i> Export using template</a></li>\n						</ul>\n					</li>\n				</ul>\n				<ul class="nav pull-right title-container">\n					<li><div class="working-indicator"></div></li>\n					<li><span class="btn btn-success file-title-navbar"></span></li>\n				</ul>\n			</div>\n		</div>\n		<div class="layout-wrapper-l3">\n			<pre id="wmd-input" class="form-control"><div class="editor-content"></div><div class="editor-margin"></div></pre>\n			<div class="preview-panel">\n				<div class="preview-container">\n					<div id="preview-contents">\n						<div id="wmd-preview" class="preview-content"></div>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class="extension-preview-buttons">\n			<div class="btn-group drag-me" title="Drag me!">\n				<i class="icon-ellipsis-vert"></i>\n			</div>\n		</div>\n	</div>\n	<div id="wmd-button-bar" class="hide"></div>\n\n	<div class="menu-panel">\n		<button class="btn toggle-button action-open-stackedit"\n			title="Open StackEdit">\n			<img\n				data-stackedit-src="menu-icon.png" width="24" height="24" />\n		</button>\n	</div>\n\n\n	<div class="document-panel">\n		<button class="btn toggle-button" title="Select document Ctrl+[ Ctrl+]">\n			<i class="icon-folder-open"></i>\n		</button>\n		<div class="search-bar clearfix">\n			<div class="input-group">\n				<span class="input-group-addon"><i class="icon-search"></i></span><input\n					type="text" class="form-control" placeholder="Find document"></input>\n			</div>\n		</div>\n		<div class="panel-content">\n			<div class="list-group document-list"></div>\n			<div class="list-group document-list-filtered hide"></div>\n		</div>\n	</div>\n</div>\n<div id="wmd-button-bar" class="hide"></div>\n\n<div class="modal modal-non-unique">\n	<div class="modal-dialog">\n		<div class="modal-content">\n\n			<div class="modal-header">\n				<h3 class="modal-title">Ooops...</h3>\n			</div>\n			<div class="modal-body">\n				<p>StackEdit has stopped because another instance was running in\n					the same browser.</p>\n				<blockquote>\n                    <p>If you want to reopen StackEdit, click on\n					"Reload".</p>\n                </blockquote>\n			</div>\n			<div class="modal-footer">\n				<a href="javascript:window.location.reload();"\n					class="btn btn-primary">Reload</a>\n			</div>\n		</div>\n	</div>\n</div>\n';
}), define("text!html/tooltipSettingsTemplate.html", [], function() {
 return 'Available variables:\n<br>\n<ul>\n    <li>\n        <b>documentTitle</b>: document title</li>\n    <li>\n        <b>documentMarkdown</b>: document in Markdown format</li>\n    <li>\n        <b>strippedDocumentMarkdown</b>: document without front matter</li>\n    <li>\n        <b>documentHTML</b>: document in HTML format</li>\n    <li>\n        <b>documentHTMLWithFrontMatter</b></li>\n    <li>\n        <b>frontMatter</b>: undefined if no front matter</li>\n    <li>\n        <b>publishAttributes</b>: undefined if\n        not publishing</li>\n</ul>\n<b>Examples:</b>\n<br />&lt;title&gt;&lt;%= documentTitle %&gt;&lt;&#x2F;title&gt;\n<br />&lt;div&gt;&lt;%- documentHTML %&gt;&lt;&#x2F;div&gt;\n<br />&lt;%\n<br />if(publishAttributes.provider.providerId == &quot;github&quot;) print(documentMarkdown);\n<br\n/>%&gt;\n<br />\n<br />\n<a target="_blank" href="http://underscorejs.org/#template">More\n	info</a>\n<br />\n<br />\n<b class="text-danger">\n    <i class="icon-attention"></i>Careful! Template is subject to malicious code. Don\'t copy/paste untrusted\n    content.</b>\n';
}), define("text!html/tooltipSettingsPdfOptions.html", [], function() {
 return 'Option object in JSON format. Possible attributes:\n<br><br>\n<b>marginTop</b>,\n<b>marginRight</b>,\n<b>marginBottom</b>,\n<b>marginLeft</b>,<br>\n<b>headerCenter</b>,\n<b>headerLeft</b>,\n<b>headerRight</b>,\n<b>headerFontName</b>,\n<b>headerFontSize</b>,<br>\n<b>footerCenter</b>,\n<b>footerLeft</b>,\n<b>footerRight</b>,\n<b>footerFontName</b>,\n<b>footerFontSize</b><br>\n<b>pageSize</b><br><br>\nPlease check out the\n<a target="_blank" href="http://wkhtmltopdf.org/usage/wkhtmltopdf.txt">wkhtmltopdf documentation</a> for more info.\n';
}), function() {
 function e() {}
 function t(e) {
  this.buttonBar = d.getElementById("wmd-button-bar" + e), this.preview = d.getElementById("wmd-preview" + e), 
  this.input = d.getElementById("wmd-input" + e);
 }
 function n(e, t) {
  var n, i, a, o = this, s = [], c = 0, u = "none", d = function(e, t) {
   u != e && (u = e, t || h()), m.isIE && "moving" == u ? a = null : i = setTimeout(p, 1);
  }, p = function(e) {
   a = new r(t, e), i = void 0;
  };
  this.setCommandMode = function() {
   u = "command", h(), i = setTimeout(p, 0);
  }, this.canUndo = function() {
   return c > 1;
  }, this.canRedo = function() {
   return s[c + 1] ? !0 : !1;
  }, this.undo = function() {
   o.canUndo() && (n ? (n.restore(), n = null) : (s[c] = new r(t), s[--c].restore(), 
   e && e())), u = "none", t.input.focus(), p();
  }, this.redo = function() {
   o.canRedo() && (s[++c].restore(), e && e()), u = "none", t.input.focus(), p();
  };
  var h = function() {
   var i = a || new r(t);
   return i ? "moving" == u ? void (n || (n = i)) : (n && (s[c - 1].text != n.text && (s[c++] = n), 
   n = null), s[c++] = i, s[c + 1] = null, void (e && e())) : !1;
  }, f = function(e) {
   if (!e.ctrlKey && !e.metaKey) {
    var t = e.keyCode;
    t >= 33 && 40 >= t || t >= 63232 && 63235 >= t ? d("moving") : 8 == t || 46 == t || 127 == t ? d("deleting") : 13 == t ? d("newlines") : 27 == t ? d("escape") : (16 > t || t > 20) && 91 != t && d("typing");
   }
  }, g = function() {
   l.addEvent(t.input, "keypress", function(e) {
    !e.ctrlKey && !e.metaKey || e.altKey || 89 != e.keyCode && 90 != e.keyCode || e.preventDefault();
   });
   var e = function() {
    (m.isIE || a && a.text != t.input.value) && void 0 == i && (u = "paste", h(), p());
   };
   l.addEvent(t.input, "keydown", f), l.addEvent(t.input, "mousedown", function() {
    d("moving");
   }), t.input.onpaste = e, t.input.ondrop = e;
  }, b = function() {
   g(), p(!0);
  };
  this.reinit = function(e, t, r, o) {
   s = [], c = 0, u = "none", n = void 0, i = void 0, p(), a.text = e, a.start = t, 
   a.end = r, a.scrollTop = o, a.setInputAreaSelection(), h();
  }, this.setMode = d, b();
 }
 function r(t) {
  var n = this, r = t.input;
  this.init = function() {
   l.isVisible(r) && (this.setInputAreaSelectionStartEnd(), this.scrollTop = r.scrollTop, 
   (!this.text && r.selectionStart || 0 === r.selectionStart) && (this.text = r.value));
  }, this.setInputAreaSelection = function() {
   l.isVisible(r) && (r.focus(), r.selectionStart = n.start, r.selectionEnd = n.end);
  }, this.setInputAreaSelectionStartEnd = function() {
   n.start = r.selectionStart, n.end = r.selectionEnd;
  }, this.restore = function() {
   void 0 != n.text && n.text != r.value && (r.value = n.text), this.setInputAreaSelection();
  }, this.getChunks = function() {
   var t = new e();
   return t.before = l.fixEolChars(n.text.substring(0, n.start)), t.startTag = "", 
   t.selection = l.fixEolChars(n.text.substring(n.start, n.end)), t.endTag = "", t.after = l.fixEolChars(n.text.substring(n.end)), 
   t.scrollTop = n.scrollTop, t;
  }, this.setChunks = function(e) {
   e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, 
   this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, 
   this.scrollTop = e.scrollTop;
  }, this.init();
 }
 function i(e, t, n) {
  var r, i, a, o = 3e3, s = "manual", c = function(e, t) {
   l.addEvent(e, "input", t), e.onpaste = t, e.ondrop = t, l.addEvent(e, "keypress", t), 
   l.addEvent(e, "keydown", t);
  }, u = function() {
   if (t.preview) {
    var n = t.input.value;
    if (!n || n != a) {
     a = n;
     var r = new Date().getTime();
     n = e.makeHtml(n);
     var o = new Date().getTime();
     i = o - r, g(n);
    }
   }
  }, d = function() {
   if (r && (clearTimeout(r), r = void 0), "manual" !== s) {
    var e = 0;
    "delayed" === s && (e = i), e > o && (e = o), r = setTimeout(u, e);
   }
  };
  this.refresh = function(e) {
   e ? (a = "", u()) : d();
  }, this.processingTime = function() {
   return i;
  };
  var p, h = function(e) {
   var n = t.preview, r = n.parentNode, i = n.nextSibling;
   r.removeChild(n), n.innerHTML = e, i ? r.insertBefore(n, i) : r.appendChild(n);
  }, f = function(e) {
   t.preview.innerHTML = e;
  }, m = function(e) {
   if (p) return p(e);
   try {
    f(e), p = f;
   } catch (t) {
    p = h, p(e);
   }
  }, g = function(e) {
   t.preview && (m(e), n());
  }, b = function() {
   c(t.input, d), t.preview && (t.preview.scrollTop = 0);
  };
  b();
 }
 function a(e, t, n, i, a, o, s) {
  function l(e) {
   h.focus();
   var a = "wmd-link-button" == e.id || "wmd-image-button" == e.id;
   if (e.textOp) {
    n && !a && n.setCommandMode();
    var o = new r(t);
    if (!o) return;
    var s = o.getChunks(), l = function() {
     h.focus(), s && o.setChunks(s), o.restore(), i.refresh();
    }, c = e.textOp(s, l);
    c || (l(), a || h.adjustCursorPosition());
   }
   e.execute && e.execute(n);
  }
  function c(e, n) {
   var r = "0px", i = "-20px", a = "-40px", o = e.getElementsByTagName("span")[0];
   e.className = e.className.replace(/ disabled/g, ""), n ? (o.style.backgroundPosition = e.XShift + " " + r, 
   e.onmouseover = function() {
    o.style.backgroundPosition = this.XShift + " " + a;
   }, e.onmouseout = function() {
    o.style.backgroundPosition = this.XShift + " " + r;
   }, m.isIE && (e.onmousedown = function() {
    t.ieCachedRange = document.selection.createRange(), t.ieCachedScrollTop = t.input.scrollTop;
   }), e.isHelp || (e.onclick = function() {
    return this.onmouseout && this.onmouseout(), l(this), !1;
   })) : (o.style.backgroundPosition = e.XShift + " " + i, e.onmouseover = e.onmouseout = e.onclick = function() {}, 
   e.className += " disabled");
  }
  function u(e) {
   return "string" == typeof e && (e = a[e]), function() {
    e.apply(a, arguments);
   };
  }
  function d() {
   var n = t.buttonBar, r = document.createElement("ul");
   r.id = "wmd-button-row" + e, r.className = "wmd-button-row", r = n.appendChild(r);
   var i = 0, a = function(t, n, a, o) {
    var s = document.createElement("li");
    s.className = "wmd-button", s.style.left = i + "px", i += 25;
    var l = document.createElement("span");
    return s.id = t + e, s.appendChild(l), s.title = n, s.XShift = a, o && (s.textOp = o), 
    c(s, !0), r.appendChild(s), s;
   }, l = function(t) {
    var n = document.createElement("li");
    n.className = "wmd-spacer wmd-spacer" + t, n.id = "wmd-spacer" + t + e, r.appendChild(n), 
    i += 25;
   };
   if (f.bold = a("wmd-bold-button", s("bold"), "0px", u("doBold")), f.italic = a("wmd-italic-button", s("italic"), "-20px", u("doItalic")), 
   l(1), f.link = a("wmd-link-button", s("link"), "-40px", u(function(e, t) {
    return this.doLinkOrImage(e, t, !1);
   })), f.quote = a("wmd-quote-button", s("quote"), "-60px", u("doBlockquote")), f.code = a("wmd-code-button", s("code"), "-80px", u("doCode")), 
   f.image = a("wmd-image-button", s("image"), "-100px", u(function(e, t) {
    return this.doLinkOrImage(e, t, !0);
   })), l(2), f.olist = a("wmd-olist-button", s("olist"), "-120px", u(function(e, t) {
    this.doList(e, t, !0);
   })), f.ulist = a("wmd-ulist-button", s("ulist"), "-140px", u(function(e, t) {
    this.doList(e, t, !1);
   })), f.heading = a("wmd-heading-button", s("heading"), "-160px", u("doHeading")), 
   f.hr = a("wmd-hr-button", s("hr"), "-180px", u("doHorizontalRule")), l(3), f.undo = a("wmd-undo-button", s("undo"), "-200px", null), 
   f.undo.execute = function(e) {
    e && e.undo();
   }, f.redo = a("wmd-redo-button", s("redo"), "-220px", null), f.redo.execute = function(e) {
    e && e.redo();
   }, o) {
    var d = document.createElement("li"), h = document.createElement("span");
    d.appendChild(h), d.className = "wmd-button wmd-help-button", d.id = "wmd-help-button" + e, 
    d.XShift = "-240px", d.isHelp = !0, d.style.right = "0px", d.title = s("help"), 
    d.onclick = o.handler, c(d, !0), r.appendChild(d), f.help = d;
   }
   p();
  }
  function p() {
   n && (c(f.undo, n.canUndo()), c(f.redo, n.canRedo()));
  }
  var h = t.input, f = {};
  d();
  var g = "keydown";
  m.isOpera && (g = "keypress"), this.setUndoRedoButtonStates = p, this.buttons = f, 
  this.doClick = l;
 }
 function o(e, t) {
  this.hooks = e, this.getString = t;
 }
 function s(e) {
  return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function(e, t, n) {
   return t = t.replace(/\?.*$/, function(e) {
    return e.replace(/\+/g, " ");
   }), t = decodeURIComponent(t), t = encodeURI(t).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), 
   t = t.replace(/\?.*$/, function(e) {
    return e.replace(/\+/g, "%2b");
   }), n && (n = n.trim ? n.trim() : n.replace(/^\s*/, "").replace(/\s*$/, ""), n = n.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), 
   n ? t + ' "' + n + '"' : t;
  });
 }
 var l = {}, c = {}, u = {}, d = window.document, p = window.RegExp, h = window.navigator, f = {
  lineLength: 72
 }, m = {
  isIE: /msie/.test(h.userAgent.toLowerCase()),
  isIE_5or6: /msie 6/.test(h.userAgent.toLowerCase()) || /msie 5/.test(h.userAgent.toLowerCase()),
  isOpera: /opera/.test(h.userAgent.toLowerCase())
 }, g = {
  bold: "Strong <strong> Ctrl/Cmd+B",
  boldexample: "strong text",
  italic: "Emphasis <em> Ctrl/Cmd+I",
  italicexample: "emphasized text",
  link: "Hyperlink <a> Ctrl/Cmd+L",
  linkdescription: "enter link description here",
  linkdialog: '<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',
  quote: "Blockquote <blockquote> Ctrl/Cmd+Q",
  quoteexample: "Blockquote",
  code: "Code Sample <pre><code> Ctrl/Cmd+K",
  codeexample: "enter code here",
  image: "Image <img> Ctrl/Cmd+G",
  imagedescription: "enter image description here",
  imagedialog: "<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br><br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",
  olist: "Numbered List <ol> Ctrl/Cmd+O",
  ulist: "Bulleted List <ul> Ctrl/Cmd+U",
  litem: "List item",
  heading: "Heading <h1>/<h2> Ctrl/Cmd+H",
  headingexample: "Heading",
  hr: "Horizontal Rule <hr> Ctrl/Cmd+R",
  undo: "Undo - Ctrl/Cmd+Z",
  redo: "Redo - Ctrl/Cmd+Y",
  help: "Markdown Editing Help"
 }, b = "http://", v = "http://";
 Markdown.Editor = function(e, r, s) {
  s = s || {}, "function" == typeof s.handler && (s = {
   helpButton: s
  }), s.strings = s.strings || {}, s.helpButton && (s.strings.help = s.strings.help || s.helpButton.title);
  var l = function(e) {
   return s.strings[e] || g[e];
  };
  r = r || "";
  var c = this.hooks = new Markdown.HookCollection();
  c.addNoop("onPreviewRefresh"), c.addNoop("postBlockquoteCreation"), c.addFalse("insertImageDialog"), 
  c.addFalse("insertLinkDialog"), this.getConverter = function() {
   return e;
  };
  var u, p, h = this;
  this.run = function() {
   if (!u) {
    u = new t(r);
    var f, m = new o(c, l), g = new i(e, u, function() {
     c.onPreviewRefresh();
    });
    s.undoManager ? (p = s.undoManager, p.onButtonStateChange = function() {
     f.setUndoRedoButtonStates();
    }, f && f.setUndoRedoButtonStates()) : /\?noundo/.test(d.location.href) || (p = new n(function() {
     g.refresh(), f && f.setUndoRedoButtonStates();
    }, u), this.textOperation = function(e) {
     p.setCommandMode(), e(), h.refreshPreview();
    }), f = new a(r, u, p, g, m, s.helpButton, l), f.setUndoRedoButtonStates();
    {
     h.refreshPreview = function() {
      g.refresh(!0);
     };
    }
    h.undoManager = p, h.uiManager = f;
   }
  };
 }, e.prototype.findTags = function(e, t) {
  var n, r = this;
  e && (n = l.extendRegExp(e, "", "$"), this.before = this.before.replace(n, function(e) {
   return r.startTag = r.startTag + e, "";
  }), n = l.extendRegExp(e, "^", ""), this.selection = this.selection.replace(n, function(e) {
   return r.startTag = r.startTag + e, "";
  })), t && (n = l.extendRegExp(t, "", "$"), this.selection = this.selection.replace(n, function(e) {
   return r.endTag = e + r.endTag, "";
  }), n = l.extendRegExp(t, "^", ""), this.after = this.after.replace(n, function(e) {
   return r.endTag = e + r.endTag, "";
  }));
 }, e.prototype.trimWhitespace = function(e) {
  var t, n, r = this;
  e ? t = n = "" : (t = function(e) {
   return r.before += e, "";
  }, n = function(e) {
   return r.after = e + r.after, "";
  }), this.selection = this.selection.replace(/^(\s*)/, t).replace(/(\s*)$/, n);
 }, e.prototype.skipLines = function(e, t, n) {
  void 0 === e && (e = 1), void 0 === t && (t = 1), e++, t++;
  var r, i;
  if (navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), 
  this.startTag = this.startTag + p.$1, this.selection = this.selection.replace(/(\n*$)/, ""), 
  this.endTag = this.endTag + p.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), 
  this.before = this.before + p.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), 
  this.after = this.after + p.$1, this.before) {
   for (r = i = ""; e--; ) r += "\\n?", i += "\n";
   n && (r = "\\n*"), this.before = this.before.replace(new p(r + "$", ""), i);
  }
  if (this.after) {
   for (r = i = ""; t--; ) r += "\\n?", i += "\n";
   n && (r = "\\n*"), this.after = this.after.replace(new p(r, ""), i);
  }
 }, l.isVisible = function(e) {
  return window.getComputedStyle ? "none" !== window.getComputedStyle(e, null).getPropertyValue("display") : e.currentStyle ? "none" !== e.currentStyle.display : void 0;
 }, l.addEvent = function(e, t, n) {
  e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1);
 }, l.removeEvent = function(e, t, n) {
  e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n, !1);
 }, l.fixEolChars = function(e) {
  return e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n");
 }, l.extendRegExp = function(e, t, n) {
  (null === t || void 0 === t) && (t = ""), (null === n || void 0 === n) && (n = "");
  var r, i = e.toString();
  return i = i.replace(/\/([gim]*)$/, function(e, t) {
   return r = t, "";
  }), i = i.replace(/(^\/|\/$)/g, ""), i = t + i + n, new p(i, r);
 }, c.getTop = function(e, t) {
  var n = e.offsetTop;
  if (!t) for (;e = e.offsetParent; ) n += e.offsetTop;
  return n;
 }, c.getHeight = function(e) {
  return e.offsetHeight || e.scrollHeight;
 }, c.getWidth = function(e) {
  return e.offsetWidth || e.scrollWidth;
 }, c.getPageSize = function() {
  var e, t, n, r;
  self.innerHeight && self.scrollMaxY ? (e = d.body.scrollWidth, t = self.innerHeight + self.scrollMaxY) : d.body.scrollHeight > d.body.offsetHeight ? (e = d.body.scrollWidth, 
  t = d.body.scrollHeight) : (e = d.body.offsetWidth, t = d.body.offsetHeight), self.innerHeight ? (n = self.innerWidth, 
  r = self.innerHeight) : d.documentElement && d.documentElement.clientHeight ? (n = d.documentElement.clientWidth, 
  r = d.documentElement.clientHeight) : d.body && (n = d.body.clientWidth, r = d.body.clientHeight);
  var i = Math.max(e, n), a = Math.max(t, r);
  return [ i, a, n, r ];
 }, u.createBackground = function() {
  var e = d.createElement("div"), t = e.style;
  e.className = "wmd-prompt-background", t.position = "absolute", t.top = "0", t.zIndex = "1000", 
  m.isIE ? t.filter = "alpha(opacity=50)" : t.opacity = "0.5";
  var n = c.getPageSize();
  return t.height = n[1] + "px", m.isIE ? (t.left = d.documentElement.scrollLeft, 
  t.width = d.documentElement.clientWidth) : (t.left = "0", t.width = "100%"), d.body.appendChild(e), 
  e;
 }, u.prompt = function(e, t, n) {
  var r, i;
  void 0 === t && (t = "");
  var a = function(e) {
   var t = e.charCode || e.keyCode;
   27 === t && o(!0);
  }, o = function(e) {
   l.removeEvent(d.body, "keydown", a);
   var t = i.value;
   return e ? t = null : (t = t.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(t) || (t = "http://" + t)), 
   r.parentNode.removeChild(r), n(t), !1;
  }, s = function() {
   r = d.createElement("div"), r.className = "wmd-prompt-dialog", r.style.padding = "10px;", 
   r.style.position = "fixed", r.style.width = "400px", r.style.zIndex = "1001";
   var n = d.createElement("div");
   n.innerHTML = e, n.style.padding = "5px", r.appendChild(n);
   var s = d.createElement("form"), u = s.style;
   s.onsubmit = function() {
    return o(!1);
   }, u.padding = "0", u.margin = "0", u.cssFloat = "left", u.width = "100%", u.textAlign = "center", 
   u.position = "relative", r.appendChild(s), i = d.createElement("input"), i.type = "text", 
   i.value = t, u = i.style, u.display = "block", u.width = "80%", u.marginLeft = u.marginRight = "auto", 
   s.appendChild(i);
   var p = d.createElement("input");
   p.type = "button", p.onclick = function() {
    return o(!1);
   }, p.value = "OK", u = p.style, u.margin = "10px", u.display = "inline", u.width = "7em";
   var h = d.createElement("input");
   h.type = "button", h.onclick = function() {
    return o(!0);
   }, h.value = "Cancel", u = h.style, u.margin = "10px", u.display = "inline", u.width = "7em", 
   s.appendChild(p), s.appendChild(h), l.addEvent(d.body, "keydown", a), r.style.top = "50%", 
   r.style.left = "50%", r.style.display = "block", m.isIE_5or6 && (r.style.position = "absolute", 
   r.style.top = d.documentElement.scrollTop + 200 + "px", r.style.left = "50%"), d.body.appendChild(r), 
   r.style.marginTop = -(c.getHeight(r) / 2) + "px", r.style.marginLeft = -(c.getWidth(r) / 2) + "px";
  };
  setTimeout(function() {
   s();
   var e = t.length;
   if (void 0 !== i.selectionStart) i.selectionStart = 0, i.selectionEnd = e; else if (i.createTextRange) {
    var n = i.createTextRange();
    n.collapse(!1), n.moveStart("character", -e), n.moveEnd("character", e), n.select();
   }
   i.focus();
  }, 0);
 };
 var y = o.prototype;
 y.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", 
 y.unwrap = function(e) {
  var t = new p("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
  e.selection = e.selection.replace(t, "$1 $2");
 }, y.wrap = function(e, t) {
  this.unwrap(e);
  var n = new p("(.{1," + t + "})( +|$\\n?)", "gm"), r = this;
  e.selection = e.selection.replace(n, function(e, t) {
   return new p("^" + r.prefixes, "").test(e) ? e : t + "\n";
  }), e.selection = e.selection.replace(/\s+$/, "");
 }, y.doBold = function(e, t) {
  return this.doBorI(e, t, 2, this.getString("boldexample"));
 }, y.doItalic = function(e, t) {
  return this.doBorI(e, t, 1, this.getString("italicexample"));
 }, y.doBorI = function(e, t, n, r) {
  e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
  var i = /(\**$)/.exec(e.before)[0], a = /(^\**)/.exec(e.after)[0], o = Math.min(i.length, a.length);
  if (o >= n && (2 != o || 1 != n)) e.before = e.before.replace(p("[*]{" + n + "}$", ""), ""), 
  e.after = e.after.replace(p("^[*]{" + n + "}", ""), ""); else if (!e.selection && a) {
   e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
   var s = p.$1;
   e.before = e.before + a + s;
  } else {
   e.selection || a || (e.selection = r);
   var l = 1 >= n ? "*" : "**";
   e.before = e.before + l, e.after = l + e.after;
  }
 }, y.stripLinkDefs = function(e, t) {
  return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(e, n, r, i, a) {
   return t[n] = e.replace(/\s*$/, ""), i ? (t[n] = e.replace(/["(](.+?)[")]$/, ""), 
   i + a) : "";
  });
 }, y.addLinkDef = function(e, t) {
  var n = 0, r = {};
  e.before = this.stripLinkDefs(e.before, r), e.selection = this.stripLinkDefs(e.selection, r), 
  e.after = this.stripLinkDefs(e.after, r);
  var i = "", a = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g, o = function(e) {
   n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), i += "\n" + e;
  }, s = function(e, t, i, l, c, u) {
   return i = i.replace(a, s), r[c] ? (o(r[c]), t + i + l + n + u) : e;
  };
  e.before = e.before.replace(a, s), t ? o(t) : e.selection = e.selection.replace(a, s);
  var l = n;
  return e.after = e.after.replace(a, s), e.after && (e.after = e.after.replace(/\n*$/, "")), 
  e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + i, 
  l;
 }, y.doLinkOrImage = function(e, t, n) {
  e.trimWhitespace(), e.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\(.*?\))?/);
  var r;
  if (!(e.endTag.length > 1 && e.startTag.length > 0)) {
   if (e.selection = e.startTag + e.selection + e.endTag, e.startTag = e.endTag = "", 
   /\n\n/.test(e.selection)) return void this.addLinkDef(e, null);
   var i = this, a = function(a) {
    r.parentNode.removeChild(r), null !== a && (e.selection = (" " + e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1), 
    e.startTag = n ? "![" : "[", e.endTag = "](" + s(a) + ")", e.selection || (e.selection = i.getString(n ? "imagedescription" : "linkdescription"))), 
    t();
   };
   return r = u.createBackground(), n ? this.hooks.insertImageDialog(a) || u.prompt(this.getString("imagedialog"), b, a) : this.hooks.insertLinkDialog(a) || u.prompt(this.getString("linkdialog"), v, a), 
   !0;
  }
  e.startTag = e.startTag.replace(/!?\[/, ""), e.endTag = "", this.addLinkDef(e, null);
 }, y.doAutoindent = function(e) {
  var t = this, n = !1;
  e.before = e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), 
  e.before = e.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), e.selection || /^[ \t]*(?:\n|$)/.test(e.after) || (e.after = e.after.replace(/^[^\n]*/, function(t) {
   return e.selection = t, "";
  }), n = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before) && t.doList && t.doList(e), 
  /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before) && t.doBlockquote && t.doBlockquote(e), 
  /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && t.doCode && t.doCode(e), n && (e.after = e.selection + e.after, 
  e.selection = "");
 }, y.doBlockquote = function(e) {
  e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(t, n, r, i) {
   return e.before += n, e.after = i + e.after, r;
  }), e.before = e.before.replace(/(>[ \t]*)$/, function(t, n) {
   return e.selection = n + e.selection, "";
  }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
  var t, n = "", r = "";
  if (e.before) {
   for (var i = e.before.replace(/\n$/, "").split("\n"), a = !1, o = 0; o < i.length; o++) {
    var s = !1;
    t = i[o], a = a && t.length > 0, /^>/.test(t) ? (s = !0, !a && t.length > 1 && (a = !0)) : s = /^[ \t]*$/.test(t) ? !0 : a, 
    s ? n += t + "\n" : (r += n + t, n = "\n");
   }
   /(^|\n)>/.test(n) || (r += n, n = "");
  }
  e.startTag = n, e.before = r, e.after && (e.after = e.after.replace(/^\n?/, "\n")), 
  e.after = e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function(t) {
   return e.endTag = t, "";
  });
  var l = function(t) {
   var n = t ? "> " : "";
   e.startTag && (e.startTag = e.startTag.replace(/\n((>|\s)*)\n$/, function(e, t) {
    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n";
   })), e.endTag && (e.endTag = e.endTag.replace(/^\n((>|\s)*)\n/, function(e, t) {
    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n";
   }));
  };
  /^(?![ ]{0,3}>)/m.test(e.selection) ? (this.wrap(e, f.lineLength - 2), e.selection = e.selection.replace(/^/gm, "> "), 
  l(!0), e.skipLines()) : (e.selection = e.selection.replace(/^[ ]{0,3}> ?/gm, ""), 
  this.unwrap(e), l(!1), !/^(\n|^)[ ]{0,3}>/.test(e.selection) && e.startTag && (e.startTag = e.startTag.replace(/\n{0,2}$/, "\n\n")), 
  !/(\n|^)[ ]{0,3}>.*$/.test(e.selection) && e.endTag && (e.endTag = e.endTag.replace(/^\n{0,2}/, "\n\n"))), 
  e.selection = this.hooks.postBlockquoteCreation(e.selection), /\n/.test(e.selection) || (e.selection = e.selection.replace(/^(> *)/, function(t, n) {
   return e.startTag += n, "";
  }));
 }, y.doCode = function(e) {
  var t = /\S[ ]*$/.test(e.before), n = /^[ ]*\S/.test(e.after);
  if (!n && !t || /\n/.test(e.selection)) {
   e.before = e.before.replace(/[ ]{4}$/, function(t) {
    return e.selection = t + e.selection, "";
   });
   var r = 1, i = 1;
   /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (r = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (i = 0), 
   e.skipLines(r, i), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "    ", 
   e.selection = this.getString("codeexample"));
  } else e.trimWhitespace(), e.findTags(/`/, /`/), e.startTag || e.endTag ? e.endTag && !e.startTag ? (e.before += e.endTag, 
  e.endTag = "") : e.startTag = e.endTag = "" : (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample")));
 }, y.doList = function(e, t, n) {
  var r = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/, i = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/, a = "-", o = 1, s = function() {
   var e;
   return n ? (e = " " + o + ". ", o++) : e = " " + a + " ", e;
  }, l = function(e) {
   return void 0 === n && (n = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function() {
    return s();
   });
  };
  if (e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !e.before || /\n$/.test(e.before) || /^\n/.test(e.startTag) || (e.before += e.startTag, 
  e.startTag = ""), e.startTag) {
   var c = /\d+[.]/.test(e.startTag);
   if (e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), 
   e.skipLines(), c && (e.after = e.after.replace(i, l)), n == c) return;
  }
  var u = 1;
  e.before = e.before.replace(r, function(e) {
   return /^\s*([*+-])/.test(e) && (a = p.$1), u = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, 
   l(e);
  }), e.selection || (e.selection = this.getString("litem"));
  var d = s(), h = 1;
  e.after = e.after.replace(i, function(e) {
   return h = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e);
  }), e.trimWhitespace(!0), e.skipLines(u, h, !0), e.startTag = d;
  var m = d.replace(/./g, " ");
  this.wrap(e, f.lineLength - m.length), e.selection = e.selection.replace(/\n/g, "\n" + m);
 }, y.doHeading = function(e) {
  if (e.selection = e.selection.replace(/\s+/g, " "), e.selection = e.selection.replace(/(^\s+|\s+$)/g, ""), 
  !e.selection) return e.startTag = "## ", e.selection = this.getString("headingexample"), 
  void (e.endTag = " ##");
  var t = 0;
  e.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(e.startTag) && (t = p.lastMatch.length), 
  e.startTag = e.endTag = "", e.findTags(null, /\s?(-+|=+)/), /=+/.test(e.endTag) && (t = 1), 
  /-+/.test(e.endTag) && (t = 2), e.startTag = e.endTag = "", e.skipLines(1, 1);
  var n = 0 == t ? 2 : t - 1;
  if (n > 0) {
   var r = n >= 2 ? "-" : "=", i = e.selection.length;
   for (i > f.lineLength && (i = f.lineLength), e.endTag = "\n"; i--; ) e.endTag += r;
  }
 }, y.doHorizontalRule = function(e) {
  e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0);
 };
}(), define("pagedown", function() {}), define("core", [ "underscore", "crel", "editor", "layout", "constants", "utils", "storage", "settings", "eventMgr", "text!html/bodyEditor.html", "text!html/bodyViewer.html", "text!html/tooltipSettingsTemplate.html", "text!html/tooltipSettingsPdfOptions.html", "storage", "pagedown" ], function(e, t, n, r, i, a, o, s, l) {
 function c() {
  g = !0, b = !0;
  var e = a.currentTime;
  e > v + 1e3 && (v = e, l.onUserActive());
 }
 function u() {
  a.setInputRadio("radio-layout-orientation", s.layoutOrientation), a.setInputValue(p, window.theme), 
  p.change(), a.setInputChecked("#input-settings-lazy-rendering", s.lazyRendering), 
  a.setInputRadio("radio-settings-editor-font-class", s.editorFontClass), a.setInputValue("#input-settings-font-size", s.fontSizeRatio), 
  a.setInputValue("#input-settings-max-width", s.maxWidthRatio), a.setInputValue("#input-settings-cursor-focus", s.cursorFocusRatio), 
  a.setInputValue("#textarea-settings-default-content", s.defaultContent), a.setInputRadio("radio-settings-edit-mode", s.editMode), 
  a.setInputValue("#input-settings-publish-commit-msg", s.commitMsg), a.setInputValue("#input-settings-markdown-mime-type", s.markdownMimeType), 
  a.setInputValue("#input-settings-gdrive-multiaccount", s.gdriveMultiAccount), a.setInputChecked("#input-settings-gdrive-full-access", s.gdriveFullAccess), 
  a.setInputChecked("#input-settings-dropbox-full-access", s.dropboxFullAccess), a.setInputChecked("#input-settings-github-full-access", s.githubFullAccess), 
  a.setInputValue("#textarea-settings-publish-template", s.template), a.setInputValue("#textarea-settings-pdf-template", s.pdfTemplate), 
  a.setInputValue("#textarea-settings-pdf-options", s.pdfOptions), a.setInputValue("#input-settings-couchdb-url", s.couchdbUrl), 
  l.onLoadSettings();
 }
 function d(e) {
  var t = {};
  t.layoutOrientation = a.getInputRadio("radio-layout-orientation");
  var n = a.getInputValue(p);
  t.lazyRendering = a.getInputChecked("#input-settings-lazy-rendering"), t.editorFontClass = a.getInputRadio("radio-settings-editor-font-class"), 
  t.fontSizeRatio = a.getInputFloatValue("#input-settings-font-size", e, .1, 10), 
  t.maxWidthRatio = a.getInputFloatValue("#input-settings-max-width", e, .1, 10), 
  t.cursorFocusRatio = a.getInputFloatValue("#input-settings-cursor-focus", e, 0, 1), 
  t.defaultContent = a.getInputValue("#textarea-settings-default-content"), t.editMode = a.getInputRadio("radio-settings-edit-mode"), 
  t.commitMsg = a.getInputTextValue("#input-settings-publish-commit-msg", e), t.gdriveMultiAccount = a.getInputIntValue("#input-settings-gdrive-multiaccount"), 
  t.markdownMimeType = a.getInputValue("#input-settings-markdown-mime-type"), t.gdriveFullAccess = a.getInputChecked("#input-settings-gdrive-full-access"), 
  t.dropboxFullAccess = a.getInputChecked("#input-settings-dropbox-full-access"), 
  t.githubFullAccess = a.getInputChecked("#input-settings-github-full-access"), t.template = a.getInputTextValue("#textarea-settings-publish-template", e), 
  t.pdfTemplate = a.getInputTextValue("#textarea-settings-pdf-template", e), t.pdfOptions = a.getInputJSONValue("#textarea-settings-pdf-options", e), 
  t.couchdbUrl = a.getInputValue("#input-settings-couchdb-url", e), t.extensionSettings = {}, 
  l.onSaveSettings(t.extensionSettings, e), e.isPropagationStopped() || (s.dropboxFullAccess !== t.dropboxFullAccess && o.removeItem("dropbox.lastChangeId"), 
  $.extend(s, t), o.settings = JSON.stringify(s), o.themeV4 = n);
 }
 var p, h, f, m = {}, g = !1, b = !1, v = 0;
 return m.initEditorFirst = function() {
  var e = new Markdown.Converter(), t = {
   _DoItalicsAndBold: function(e) {
    return e = e.replace(/(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\1/g, "<strong>$2</strong>"), 
    e = e.replace(/(\*|_)(?=\S)(.+?)(?=\S)\1/g, "<em>$2</em>");
   }
  };
  e.setOptions(t), h = new Markdown.Editor(e, void 0, {
   undoManager: n.undoMgr
  }), h.hooks.set("insertLinkDialog", function(e) {
   return m.insertLinkCallback = e, a.resetModalInputs(), $(".modal-insert-link").modal(), 
   !0;
  }), h.hooks.set("insertImageDialog", function(e) {
   return m.insertLinkCallback = e, m.catchModal ? !0 : (a.resetModalInputs(), $(".modal-insert-image").modal(), 
   !0);
  }), l.onPagedownConfigure(h), h.hooks.chain("onPreviewRefresh", l.onAsyncPreview), 
  h.run(), $(".wmd-button-row li").addClass("btn btn-success").css("left", 0).find("span").hide();
  var r = $(".wmd-button-group1");
  $("#wmd-bold-button").append($('<i class="icon-bold">')).appendTo(r), $("#wmd-italic-button").append($('<i class="icon-italic">')).appendTo(r), 
  r = $(".wmd-button-group2"), $("#wmd-link-button").append($('<i class="icon-globe">')).appendTo(r), 
  $("#wmd-quote-button").append($('<i class="icon-indent-right">')).appendTo(r), $("#wmd-code-button").append($('<i class="icon-code">')).appendTo(r), 
  $("#wmd-image-button").append($('<i class="icon-picture">')).appendTo(r), r = $(".wmd-button-group3"), 
  $("#wmd-olist-button").append($('<i class="icon-list-numbered">')).appendTo(r), 
  $("#wmd-ulist-button").append($('<i class="icon-list-bullet">')).appendTo(r), $("#wmd-heading-button").append($('<i class="icon-text-height">')).appendTo(r), 
  $("#wmd-hr-button").append($('<i class="icon-ellipsis">')).appendTo(r), r = $(".wmd-button-group5"), 
  $("#wmd-undo-button").append($('<i class="icon-reply">')).appendTo(r), $("#wmd-redo-button").append($('<i class="icon-forward">')).appendTo(r);
 }, m.initEditor = function(e) {
  return void 0 !== f && l.onFileClosed(f), f = e, void 0 !== h ? (n.undoMgr.init(), 
  h.uiManager.setUndoRedoButtonStates()) : (m.initEditorFirst(), void n.undoMgr.init());
 }, m.onReady = function() {
  document.body.className += " " + s.editMode, a.init(), $(document).mousemove(c).keypress(c), 
  l.onReady(), m.initEditorFirst(), n.init();
 }, l.addListener("onReady", function() {
  function t(e) {
   if (e = e || "default", r != e) {
    var t = "less!themes/" + e;
    -1 !== window.baseDir.indexOf("-min") && (t = "css!themes/" + e), requirejs.undef(t), 
    require([ t ]), r = e;
   }
  }
  $(document.body).on("shown.bs.modal", ".modal", function() {
   var e = $(this);
   setTimeout(function() {
    e.find(".btn:first").focus(), e.find("button:first").focus(), e.find("input:enabled:visible:first").focus();
   }, 50);
  }).on("hidden.bs.modal", ".modal", function() {
   n.focus(), t(window.theme);
  }).on("keypress", ".modal", function(e) {
   13 != e.which || $(e.target).is("textarea") || $(this).find(".modal-footer a:last").click();
  }), $(".action-insert-link").click(function(e) {
   var t = a.getInputTextValue($("#input-insert-link"), e);
   void 0 !== t && (m.insertLinkCallback(t), m.insertLinkCallback = void 0);
  }), $(".action-insert-image").click(function(e) {
   var t = a.getInputTextValue($("#input-insert-image"), e);
   void 0 !== t && (m.insertLinkCallback(t), m.insertLinkCallback = void 0);
  }), $(".modal-insert-link, .modal-insert-image").on("hidden.bs.modal", function() {
   void 0 !== m.insertLinkCallback && (m.insertLinkCallback(null), m.insertLinkCallback = void 0);
  }), $(".action-load-settings").click(function() {
   u();
  }), $(".action-apply-settings").click(function(e) {
   d(e), e.isPropagationStopped() || window.location.reload();
  }), $(".action-add-google-drive-account").click(function() {
   3 !== s.gdriveMultiAccount && (s.gdriveMultiAccount++, o.settings = JSON.stringify(s), 
   window.location.reload());
  });
  var r = window.theme;
  p = $("#input-settings-theme"), p.on("change", function() {
   t(this.value);
  }), $(".action-import-docs-settings").click(function() {
   $("#input-file-import-docs-settings").click();
  });
  var c;
  if ($("#input-file-import-docs-settings").change(function(t) {
   var n = (t.dataTransfer || t.target).files;
   $(".modal-settings").modal("hide"), e.each(n, function(e) {
    var t = new FileReader();
    t.onload = function(e) {
     return function(t) {
      try {
       c = JSON.parse(t.target.result);
       var n = parseInt(c.version.match(/^v(\d+)$/)[1], 10), r = parseInt(o.version.match(/^v(\d+)$/)[1], 10);
       n > r ? l.onError("Incompatible version. Please upgrade StackEdit.") : $(".modal-import-docs-settings").modal("show");
      } catch (i) {
       l.onError("Wrong format: " + e.name);
      }
      $("#input-file-import-docs-settings").val("");
     };
    }(e), t.readAsText(e);
   });
  }), $(".action-import-docs-settings-confirm").click(function() {
   o.clear();
   var t = /^file\.|^folder\.|^publish\.|^settings$|^sync\.|^google\.|^author\.|^themeV4$|^version$/;
   e.each(c, function(e, n) {
    t.test(n) && (o[n] = e);
   }), window.location.reload();
  }), $(".action-export-docs-settings").click(function() {
   a.saveAs(JSON.stringify(o), "StackEdit local storage.json");
  }), $(".action-default-settings").click(function() {
   o.removeItem("settings"), o.removeItem("theme"), s.dropboxFullAccess || o.removeItem("dropbox.lastChangeId"), 
   window.location.reload();
  }), $(".action-app-reset").click(function() {
   o.clear(), window.location.reload();
  }), $(".action-reset-input").click(function() {
   a.resetModalInputs();
  }), $("div.dropdown-menu").click(function(e) {
   e.stopPropagation();
  }), e.each(document.querySelectorAll("img"), function(e) {
   var t = $(e), n = t.data("stackeditSrc");
   n && t.attr("src", window.baseDir + "/img/" + n);
  }), window.viewerMode === !1) {
   var h = e.reduce(i.THEME_LIST, function(e, t, n) {
    return e + '<option value="' + n + '">' + t + "</option>";
   }, "");
   document.getElementById("input-settings-theme").innerHTML = h;
  }
 }), m;
}), define("css/css", [], function() {
 if ("undefined" == typeof window) return {
  load: function(e, t, n) {
   n();
  }
 };
 var e = document.getElementsByTagName("head")[0], t = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/) || 0, n = !1, r = !0;
 t[1] || t[7] ? n = parseInt(t[1]) < 6 || parseInt(t[7]) <= 9 : t[2] ? r = !1 : t[4] && (n = parseInt(t[4]) < 18);
 var i = {};
 i.pluginBuilder = "./css-builder";
 var a, o, s, l = function() {
  a = document.createElement("style"), e.appendChild(a), o = a.styleSheet || a.sheet;
 }, c = 0, u = [], d = function(e) {
  c++, 32 == c && (l(), c = 0), o.addImport(e), a.onload = function() {
   p();
  };
 }, p = function() {
  s();
  var e = u.shift();
  return e ? (s = e[1], void d(e[0])) : void (s = null);
 }, h = function(e, t) {
  if (o && o.addImport || l(), o && o.addImport) s ? u.push([ e, t ]) : (d(e), s = t); else {
   a.textContent = '@import "' + e + '";';
   var n = setInterval(function() {
    try {
     a.sheet.cssRules, clearInterval(n), t();
    } catch (e) {}
   }, 10);
  }
 }, f = function(t, n) {
  var i = document.createElement("link");
  if (i.type = "text/css", i.rel = "stylesheet", r) i.onload = function() {
   i.onload = function() {}, setTimeout(n, 7);
  }; else var a = setInterval(function() {
   for (var e = 0; e < document.styleSheets.length; e++) {
    var t = document.styleSheets[e];
    if (t.href == i.href) return clearInterval(a), n();
   }
  }, 10);
  i.href = t, e.appendChild(i);
 };
 return i.normalize = function(e, t) {
  return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e);
 }, i.load = function(e, t, r) {
  (n ? h : f)(t.toUrl(e + ".css"), r);
 }, i;
}), define("css", [ "css/css" ], function(e) {
 return e;
}), rangy.createModule("CssClassApplier", function(e, t) {
 function n(e) {
  return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
 }
 function r(e, t) {
  return e.className && new RegExp("(?:^|\\s)" + t + "(?:\\s|$)").test(e.className);
 }
 function i(e, t) {
  e.className ? r(e, t) || (e.className += " " + t) : e.className = t;
 }
 function a(e) {
  return e.split(/\s+/).sort().join(" ");
 }
 function o(e) {
  return a(e.className);
 }
 function s(e, t) {
  return o(e) == o(t);
 }
 function l(e) {
  for (var t = e.parentNode; e.hasChildNodes(); ) t.insertBefore(e.firstChild, e);
  t.removeChild(e);
 }
 function c(e, t) {
  var n = e.cloneRange();
  n.selectNodeContents(t);
  var r = n.intersection(e), i = r ? r.toString() : "";
  return n.detach(), "" != i;
 }
 function u(e) {
  return e.getNodes([ 3 ], function(t) {
   return c(e, t);
  });
 }
 function d(e, t) {
  if (e.attributes.length != t.attributes.length) return !1;
  for (var n, r, i, a = 0, o = e.attributes.length; o > a; ++a) if (n = e.attributes[a], 
  i = n.name, "class" != i) {
   if (r = t.attributes.getNamedItem(i), n.specified != r.specified) return !1;
   if (n.specified && n.nodeValue !== r.nodeValue) return !1;
  }
  return !0;
 }
 function p(e, t) {
  for (var n, r = 0, i = e.attributes.length; i > r; ++r) if (n = e.attributes[r].name, 
  (!t || !k.arrayContains(t, n)) && e.attributes[r].specified && "class" != n) return !0;
  return !1;
 }
 function h(e, t) {
  for (var n in t) if (t.hasOwnProperty(n) && e[n] !== t[n]) return !1;
  return !0;
 }
 function f(e) {
  var t;
  return e && 1 == e.nodeType && ((t = e.parentNode) && 9 == t.nodeType && "on" == t.designMode || D(e) && !D(e.parentNode));
 }
 function m(e) {
  return (D(e) || 1 != e.nodeType && D(e.parentNode)) && !f(e);
 }
 function g(e) {
  return e && 1 == e.nodeType && !M.test(E(e, "display"));
 }
 function b(e) {
  if (0 == e.data.length) return !0;
  if (I.test(e.data)) return !1;
  var t = E(e.parentNode, "whiteSpace");
  switch (t) {
  case "pre":
  case "pre-wrap":
  case "-moz-pre-wrap":
   return !1;

  case "pre-line":
   if (/[\r\n]/.test(e.data)) return !1;
  }
  return g(e.previousSibling) || g(e.nextSibling);
 }
 function v(e, t) {
  return k.isCharacterDataNode(e) ? 0 == t ? !!e.previousSibling : t == e.length ? !!e.nextSibling : !0 : t > 0 && t < e.childNodes.length;
 }
 function y(e, n, r, i) {
  var a, o = 0 == r;
  if (k.isAncestorOf(n, e)) return e;
  if (k.isCharacterDataNode(n)) if (0 == r) r = k.getNodeIndex(n), n = n.parentNode; else {
   if (r != n.length) throw t.createError("splitNodeAt should not be called with offset in the middle of a data node (" + r + " in " + n.data);
   r = k.getNodeIndex(n) + 1, n = n.parentNode;
  }
  if (v(n, r)) {
   if (!a) {
    a = n.cloneNode(!1), a.id && a.removeAttribute("id");
    for (var s; s = n.childNodes[r]; ) a.appendChild(s);
    k.insertAfter(a, n);
   }
   return n == e ? a : y(e, a.parentNode, k.getNodeIndex(a), i);
  }
  if (e != n) {
   a = n.parentNode;
   var l = k.getNodeIndex(n);
   return o || l++, y(e, a, l, i);
  }
  return e;
 }
 function x(e, t) {
  return e.tagName == t.tagName && s(e, t) && d(e, t);
 }
 function w(e) {
  var t = e ? "nextSibling" : "previousSibling";
  return function(n, r) {
   var i = n.parentNode, a = n[t];
   if (a) {
    if (a && 3 == a.nodeType) return a;
   } else if (r && (a = i[t], a && 1 == a.nodeType && x(i, a))) return a[e ? "firstChild" : "lastChild"];
   return null;
  };
 }
 function S(e) {
  this.isElementMerge = 1 == e.nodeType, this.firstTextNode = this.isElementMerge ? e.lastChild : e, 
  this.textNodes = [ this.firstTextNode ];
 }
 function C(e, t, r) {
  this.cssClass = e;
  var i, o, s, l, c = null;
  if ("object" == typeof t && null !== t) {
   for (r = t.tagNames, c = t.elementProperties, o = 0; l = R[o++]; ) t.hasOwnProperty(l) && (this[l] = t[l]);
   i = t.normalize;
  } else i = t;
  this.normalize = "undefined" == typeof i ? !0 : i, this.attrExceptions = [];
  var u = document.createElement(this.elementTagName);
  this.elementProperties = {};
  for (var d in c) c.hasOwnProperty(d) && (P.hasOwnProperty(d) && (d = P[d]), u[d] = c[d], 
  this.elementProperties[d] = u[d], this.attrExceptions.push(d));
  this.elementSortedClassName = this.elementProperties.hasOwnProperty("className") ? a(this.elementProperties.className + " " + e) : e, 
  this.applyToAnyTagName = !1;
  var p = typeof r;
  if ("string" == p) "*" == r ? this.applyToAnyTagName = !0 : this.tagNames = n(r.toLowerCase()).split(/\s*,\s*/); else if ("object" == p && "number" == typeof r.length) for (this.tagNames = [], 
  o = 0, s = r.length; s > o; ++o) "*" == r[o] ? this.applyToAnyTagName = !0 : this.tagNames.push(r[o].toLowerCase()); else this.tagNames = [ this.elementTagName ];
 }
 function _(e, t, n) {
  return new C(e, t, n);
 }
 e.requireModules([ "WrappedSelection", "WrappedRange" ]);
 var E, k = e.dom, T = "span", N = function() {
  function e(e, t, n) {
   return t && n ? " " : "";
  }
  return function(t, n) {
   t.className && (t.className = t.className.replace(new RegExp("(?:^|\\s)" + n + "(?:\\s|$)"), e));
  };
 }();
 "undefined" != typeof window.getComputedStyle ? E = function(e, t) {
  return k.getWindow(e).getComputedStyle(e, null)[t];
 } : "undefined" != typeof document.documentElement.currentStyle ? E = function(e, t) {
  return e.currentStyle[t];
 } : t.fail("No means of obtaining computed style properties found");
 var D;
 !function() {
  var e = document.createElement("div");
  D = "boolean" == typeof e.isContentEditable ? function(e) {
   return e && 1 == e.nodeType && e.isContentEditable;
  } : function(e) {
   return e && 1 == e.nodeType && "false" != e.contentEditable ? "true" == e.contentEditable || D(e.parentNode) : !1;
  };
 }();
 var M = /^inline(-block|-table)?$/i, I = /[^\r\n\t\f \u200B]/, A = w(!1), L = w(!0);
 S.prototype = {
  doMerge: function() {
   for (var e, t, n, r = [], i = 0, a = this.textNodes.length; a > i; ++i) e = this.textNodes[i], 
   t = e.parentNode, r[i] = e.data, i && (t.removeChild(e), t.hasChildNodes() || t.parentNode.removeChild(t));
   return this.firstTextNode.data = n = r.join(""), n;
  },
  getLength: function() {
   for (var e = this.textNodes.length, t = 0; e--; ) t += this.textNodes[e].length;
   return t;
  },
  toString: function() {
   for (var e = [], t = 0, n = this.textNodes.length; n > t; ++t) e[t] = "'" + this.textNodes[t].data + "'";
   return "[Merge(" + e.join(",") + ")]";
  }
 };
 var R = [ "elementTagName", "ignoreWhiteSpace", "applyToEditableOnly" ], P = {
  "class": "className"
 };
 C.prototype = {
  elementTagName: T,
  elementProperties: {},
  ignoreWhiteSpace: !0,
  applyToEditableOnly: !1,
  hasClass: function(e) {
   return 1 == e.nodeType && k.arrayContains(this.tagNames, e.tagName.toLowerCase()) && r(e, this.cssClass);
  },
  getSelfOrAncestorWithClass: function(e) {
   for (;e; ) {
    if (this.hasClass(e, this.cssClass)) return e;
    e = e.parentNode;
   }
   return null;
  },
  isModifiable: function(e) {
   return !this.applyToEditableOnly || m(e);
  },
  isIgnorableWhiteSpaceNode: function(e) {
   return this.ignoreWhiteSpace && e && 3 == e.nodeType && b(e);
  },
  postApply: function(e, t, n) {
   for (var r, i, a, o = e[0], s = e[e.length - 1], l = [], c = o, u = s, d = 0, p = s.length, h = 0, f = e.length; f > h; ++h) i = e[h], 
   a = A(i, !n), a ? (r || (r = new S(a), l.push(r)), r.textNodes.push(i), i === o && (c = r.firstTextNode, 
   d = c.length), i === s && (u = r.firstTextNode, p = r.getLength())) : r = null;
   var m = L(s, !n);
   if (m && (r || (r = new S(s), l.push(r)), r.textNodes.push(m)), l.length) {
    for (h = 0, f = l.length; f > h; ++h) l[h].doMerge();
    t.setStart(c, d), t.setEnd(u, p);
   }
  },
  createContainer: function(t) {
   var n = t.createElement(this.elementTagName);
   return e.util.extend(n, this.elementProperties), i(n, this.cssClass), n;
  },
  applyToTextNode: function(e) {
   var t = e.parentNode;
   if (1 == t.childNodes.length && k.arrayContains(this.tagNames, t.tagName.toLowerCase())) i(t, this.cssClass); else {
    var n = this.createContainer(k.getDocument(e));
    e.parentNode.insertBefore(n, e), n.appendChild(e);
   }
  },
  isRemovable: function(e) {
   return e.tagName.toLowerCase() == this.elementTagName && o(e) == this.elementSortedClassName && h(e, this.elementProperties) && !p(e, this.attrExceptions) && this.isModifiable(e);
  },
  undoToTextNode: function(e, t, n) {
   if (!t.containsNode(n)) {
    var r = t.cloneRange();
    r.selectNode(n), r.isPointInRange(t.endContainer, t.endOffset) && (y(n, t.endContainer, t.endOffset, [ t ]), 
    t.setEndAfter(n)), r.isPointInRange(t.startContainer, t.startOffset) && (n = y(n, t.startContainer, t.startOffset, [ t ]));
   }
   this.isRemovable(n) ? l(n) : N(n, this.cssClass);
  },
  applyToRange: function(e) {
   e.splitBoundaries();
   var t = u(e);
   if (t.length) {
    for (var n, r = 0, i = t.length; i > r; ++r) n = t[r], this.isIgnorableWhiteSpaceNode(n) || this.getSelfOrAncestorWithClass(n) || !this.isModifiable(n) || this.applyToTextNode(n);
    e.setStart(t[0], 0), n = t[t.length - 1], e.setEnd(n, n.length), this.normalize && this.postApply(t, e, !1);
   }
  },
  applyToSelection: function(t) {
   t = t || window;
   var n, r = e.getSelection(t), i = r.getAllRanges();
   r.removeAllRanges();
   for (var a = i.length; a--; ) n = i[a], this.applyToRange(n), r.addRange(n);
  },
  undoToRange: function(e) {
   e.splitBoundaries();
   var t, n, r = u(e), i = r[r.length - 1];
   if (r.length) {
    for (var a = 0, o = r.length; o > a; ++a) t = r[a], n = this.getSelfOrAncestorWithClass(t), 
    n && this.isModifiable(t) && this.undoToTextNode(t, e, n), e.setStart(r[0], 0), 
    e.setEnd(i, i.length);
    this.normalize && this.postApply(r, e, !0);
   }
  },
  undoToSelection: function(t) {
   t = t || window;
   var n, r = e.getSelection(t), i = r.getAllRanges();
   r.removeAllRanges();
   for (var a = 0, o = i.length; o > a; ++a) n = i[a], this.undoToRange(n), r.addRange(n);
  },
  getTextSelectedByRange: function(e, t) {
   var n = t.cloneRange();
   n.selectNodeContents(e);
   var r = n.intersection(t), i = r ? r.toString() : "";
   return n.detach(), i;
  },
  isAppliedToRange: function(e) {
   if (e.collapsed) return !!this.getSelfOrAncestorWithClass(e.commonAncestorContainer);
   for (var t, n = e.getNodes([ 3 ]), r = 0; t = n[r++]; ) if (!this.isIgnorableWhiteSpaceNode(t) && c(e, t) && this.isModifiable(t) && !this.getSelfOrAncestorWithClass(t)) return !1;
   return !0;
  },
  isAppliedToSelection: function(t) {
   t = t || window;
   for (var n = e.getSelection(t), r = n.getAllRanges(), i = r.length; i--; ) if (!this.isAppliedToRange(r[i])) return !1;
   return !0;
  },
  toggleRange: function(e) {
   this.isAppliedToRange(e) ? this.undoToRange(e) : this.applyToRange(e);
  },
  toggleSelection: function(e) {
   this.isAppliedToSelection(e) ? this.undoToSelection(e) : this.applyToSelection(e);
  },
  detach: function() {}
 }, C.util = {
  hasClass: r,
  addClass: i,
  removeClass: N,
  hasSameClasses: s,
  replaceWithOwnChildren: l,
  elementsHaveSameNonClassAttributes: d,
  elementHasNonClassAttributes: p,
  splitNodeAt: y,
  isEditableElement: D,
  isEditingHost: f,
  isEditable: m
 }, e.CssClassApplier = C, e.createCssClassApplier = _;
}), define("rangy-cssclassapplier", function() {}), requirejs.config({
 waitSeconds: 0,
 packages: [ {
  name: "css",
  location: "bower-libs/require-css",
  main: "css"
 }, {
  name: "less",
  location: "bower-libs/require-less",
  main: "less"
 } ],
 paths: {
  underscore: "bower-libs/underscore/underscore",
  crel: "bower-libs/crel/crel",
  jgrowl: "bower-libs/jgrowl/jquery.jgrowl",
  mousetrap: "bower-libs/mousetrap/mousetrap",
  "mousetrap-record": "bower-libs/mousetrap/plugins/record/mousetrap-record",
  toMarkdown: "bower-libs/to-markdown/src/to-markdown",
  text: "bower-libs/requirejs-text/text",
  mathjax: "../res/bower-libs/MathJax/MathJax.js?config=TeX-AMS_HTML",
  bootstrap: "bower-libs/bootstrap/dist/js/bootstrap",
  requirejs: "bower-libs/requirejs/require",
  "google-code-prettify": "bower-libs/google-code-prettify/src/prettify",
  highlightjs: "libs/highlight/highlight.pack",
  "jquery-waitforimages": "bower-libs/waitForImages/src/jquery.waitforimages",
  "jquery-ui": "bower-libs/jquery-ui/ui/jquery-ui",
  "jquery-ui-core": "bower-libs/jquery-ui/ui/jquery.ui.core",
  "jquery-ui-widget": "bower-libs/jquery-ui/ui/jquery.ui.widget",
  "jquery-ui-mouse": "bower-libs/jquery-ui/ui/jquery.ui.mouse",
  "jquery-ui-draggable": "bower-libs/jquery-ui/ui/jquery.ui.draggable",
  "jquery-ui-effect": "bower-libs/jquery-ui/ui/jquery.ui.effect",
  "jquery-ui-effect-slide": "bower-libs/jquery-ui/ui/jquery.ui.effect-slide",
  FileSaver: "bower-libs/FileSaver/FileSaver",
  stacktrace: "bower-libs/stacktrace/stacktrace",
  "requirejs-text": "bower-libs/requirejs-text/text",
  "bootstrap-tour": "bower-libs/bootstrap-tour/build/js/bootstrap-tour",
  css_browser_selector: "bower-libs/css_browser_selector/css_browser_selector",
  "pagedown-extra": "bower-libs/pagedown-extra/node-pagedown-extra",
  pagedownExtra: "bower-libs/pagedown-extra/Markdown.Extra",
  pagedown: "libs/Markdown.Editor",
  "require-css": "bower-libs/require-css/css",
  xregexp: "bower-libs/xregexp/xregexp-all",
  yaml: "bower-libs/yaml.js/bin/yaml",
  "yaml.js": "bower-libs/yaml.js",
  "yaml-js": "bower-libs/yaml.js/bin/yaml",
  css: "bower-libs/require-css/css",
  "css-builder": "bower-libs/require-css/css-builder",
  normalize: "bower-libs/require-css/normalize",
  prism: "bower-libs/prism/prism",
  "prism-core": "bower-libs/prism/components/prism-core",
  MutationObservers: "bower-libs/MutationObservers/MutationObserver",
  WeakMap: "bower-libs/WeakMap/weakmap",
  rangy: "bower-libs/rangy/rangy-core",
  "rangy-cssclassapplier": "bower-libs/rangy/rangy-cssclassapplier",
  diff_match_patch: "bower-libs/google-diff-match-patch-js/diff_match_patch",
  diff_match_patch_uncompressed: "bower-libs/google-diff-match-patch-js/diff_match_patch_uncompressed",
  jsondiffpatch: "bower-libs/jsondiffpatch/build/bundle",
  hammerjs: "bower-libs/hammerjs/hammer",
  Diagram: "bower-libs/js-sequence-diagrams/src/sequence-diagram",
  "diagram-grammar": "bower-libs/js-sequence-diagrams/build/diagram-grammar",
  raphael: "bower-libs/raphael/raphael",
  "flow-chart": "bower-libs/flowchart/release/flowchart.amd-1.3.4.min",
  flowchart: "bower-libs/flowchart/release/flowchart-1.3.4.min",
  monetizejs: "bower-libs/monetizejs/src/monetize",
  "to-markdown": "bower-libs/to-markdown/src/to-markdown",
  waitForImages: "bower-libs/waitForImages/dist/jquery.waitforimages",
  MathJax: "bower-libs/MathJax/MathJax",
  alertify: "bower-libs/alertify.js/lib/alertify"
 },
 shim: {
  underscore: {
   exports: "_"
  },
  mathjax: [ "libs/mathjax_init" ],
  jgrowl: {
   deps: [],
   exports: "jQuery.jGrowl"
  },
  diff_match_patch_uncompressed: {
   exports: "diff_match_patch"
  },
  jsondiffpatch: [ "diff_match_patch_uncompressed" ],
  rangy: {
   exports: "rangy"
  },
  "rangy-cssclassapplier": [ "rangy" ],
  mousetrap: {
   exports: "Mousetrap"
  },
  "yaml-js": {
   exports: "YAML"
  },
  "prism-core": {
   exports: "Prism"
  },
  "bower-libs/prism/components/prism-markup": [ "prism-core" ],
  "libs/prism-latex": [ "prism-core" ],
  "libs/prism-markdown": [ "bower-libs/prism/components/prism-markup", "libs/prism-latex" ],
  "bootstrap-record": [ "mousetrap" ],
  toMarkdown: {
   deps: [],
   exports: "toMarkdown"
  },
  stacktrace: {
   exports: "printStackTrace"
  },
  FileSaver: {
   exports: "saveAs"
  },
  MutationObservers: [ "WeakMap" ],
  highlightjs: {
   exports: "hljs"
  },
  "bootstrap-tour": {
   deps: [ "bootstrap" ],
   exports: "Tour"
  },
  bootstrap: [],
  "jquery-waitforimages": [],
  pagedown: [ "libs/Markdown.Converter" ],
  pagedownExtra: [ "libs/Markdown.Converter" ],
  "flow-chart": [ "raphael" ],
  "diagram-grammar": [ "underscore" ],
  Diagram: [ "raphael", "diagram-grammar" ]
 }
}), window.viewerMode = !1, window.theme = "default";

var themeModule = "less!themes/" + window.theme;

-1 !== window.baseDir.indexOf("-min") && (themeModule = "css!themes/" + window.theme), 
require([ "rangy", "core", "eventMgr", "css", "rangy-cssclassapplier", themeModule ], function(e, t) {
 window.noStart || $(function() {
  e.init(), t.onReady();
 });
}), define("main", function() {});