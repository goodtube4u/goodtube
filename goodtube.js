(function () {
	'use strict';
 

	/* Setup the CSP (content security policy)
	------------------------------------------------------------------------------------------ */
	// Include DOM Purify (https://github.com/cure53/DOMPurify/blob/main/dist/purify.min.js)
	// We're placing this inline this because fetching it from an external repo which don't have control over is likely unreliable in the long term
	!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).DOMPurify = t() }(this, (function () { "use strict"; const { entries: e, setPrototypeOf: t, isFrozen: n, getPrototypeOf: o, getOwnPropertyDescriptor: r } = Object; let { freeze: i, seal: a, create: l } = Object, { apply: c, construct: s } = "undefined" != typeof Reflect && Reflect; i || (i = function (e) { return e }), a || (a = function (e) { return e }), c || (c = function (e, t) { for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)o[r - 2] = arguments[r]; return e.apply(t, o) }), s || (s = function (e) { for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)n[o - 1] = arguments[o]; return new e(...n) }); const u = w(Array.prototype.forEach), m = w(Array.prototype.lastIndexOf), p = w(Array.prototype.pop), f = w(Array.prototype.push), d = w(Array.prototype.splice), h = w(String.prototype.toLowerCase), g = w(String.prototype.toString), T = w(String.prototype.match), y = w(String.prototype.replace), E = w(String.prototype.indexOf), A = w(String.prototype.trim), _ = w(Object.prototype.hasOwnProperty), b = w(RegExp.prototype.test), S = (N = TypeError, function () { for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)t[n] = arguments[n]; return s(N, t) }); var N; function w(e) { return function (t) { t instanceof RegExp && (t.lastIndex = 0); for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)o[r - 1] = arguments[r]; return c(e, t, o) } } function R(e, o) { let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : h; t && t(e, null); let i = o.length; for (; i--;) { let t = o[i]; if ("string" == typeof t) { const e = r(t); e !== t && (n(o) || (o[i] = e), t = e) } e[t] = !0 } return e } function D(e) { for (let t = 0; t < e.length; t++) { _(e, t) || (e[t] = null) } return e } function C(t) { const n = l(null); for (const [o, r] of e(t)) { _(t, o) && (Array.isArray(r) ? n[o] = D(r) : r && "object" == typeof r && r.constructor === Object ? n[o] = C(r) : n[o] = r) } return n } function v(e, t) { for (; null !== e;) { const n = r(e, t); if (n) { if (n.get) return w(n.get); if ("function" == typeof n.value) return w(n.value) } e = o(e) } return function () { return null } } const O = i(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), x = i(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), L = i(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), k = i(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), I = i(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), M = i(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), U = i(["#text"]), z = i(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), P = i(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), F = i(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), H = i(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), B = a(/\{\{[\w\W]*|[\w\W]*\}\}/gm), G = a(/<%[\w\W]*|[\w\W]*%>/gm), W = a(/\$\{[\w\W]*/gm), Y = a(/^data-[\-\w.\u00B7-\uFFFF]+$/), j = a(/^aria-[\-\w]+$/), X = a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), q = a(/^(?:\w+script|data):/i), $ = a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), K = a(/^html$/i), V = a(/^[a-z][.\w]*(-[.\w]+)+$/i); var Z = Object.freeze({ __proto__: null, ARIA_ATTR: j, ATTR_WHITESPACE: $, CUSTOM_ELEMENT: V, DATA_ATTR: Y, DOCTYPE_NAME: K, ERB_EXPR: G, IS_ALLOWED_URI: X, IS_SCRIPT_OR_DATA: q, MUSTACHE_EXPR: B, TMPLIT_EXPR: W }); const J = 1, Q = 3, ee = 7, te = 8, ne = 9, oe = function () { return "undefined" == typeof window ? null : window }; var re = function t() { let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : oe(); const o = e => t(e); if (o.version = "3.3.0", o.removed = [], !n || !n.document || n.document.nodeType !== ne || !n.Element) return o.isSupported = !1, o; let { document: r } = n; const a = r, c = a.currentScript, { DocumentFragment: s, HTMLTemplateElement: N, Node: w, Element: D, NodeFilter: B, NamedNodeMap: G = n.NamedNodeMap || n.MozNamedAttrMap, HTMLFormElement: W, DOMParser: Y, trustedTypes: j } = n, q = D.prototype, $ = v(q, "cloneNode"), V = v(q, "remove"), re = v(q, "nextSibling"), ie = v(q, "childNodes"), ae = v(q, "parentNode"); if ("function" == typeof N) { const e = r.createElement("template"); e.content && e.content.ownerDocument && (r = e.content.ownerDocument) } let le, ce = ""; const { implementation: se, createNodeIterator: ue, createDocumentFragment: me, getElementsByTagName: pe } = r, { importNode: fe } = a; let de = { afterSanitizeAttributes: [], afterSanitizeElements: [], afterSanitizeShadowDOM: [], beforeSanitizeAttributes: [], beforeSanitizeElements: [], beforeSanitizeShadowDOM: [], uponSanitizeAttribute: [], uponSanitizeElement: [], uponSanitizeShadowNode: [] }; o.isSupported = "function" == typeof e && "function" == typeof ae && se && void 0 !== se.createHTMLDocument; const { MUSTACHE_EXPR: he, ERB_EXPR: ge, TMPLIT_EXPR: Te, DATA_ATTR: ye, ARIA_ATTR: Ee, IS_SCRIPT_OR_DATA: Ae, ATTR_WHITESPACE: _e, CUSTOM_ELEMENT: be } = Z; let { IS_ALLOWED_URI: Se } = Z, Ne = null; const we = R({}, [...O, ...x, ...L, ...I, ...U]); let Re = null; const De = R({}, [...z, ...P, ...F, ...H]); let Ce = Object.seal(l(null, { tagNameCheck: { writable: !0, configurable: !1, enumerable: !0, value: null }, attributeNameCheck: { writable: !0, configurable: !1, enumerable: !0, value: null }, allowCustomizedBuiltInElements: { writable: !0, configurable: !1, enumerable: !0, value: !1 } })), ve = null, Oe = null; const xe = Object.seal(l(null, { tagCheck: { writable: !0, configurable: !1, enumerable: !0, value: null }, attributeCheck: { writable: !0, configurable: !1, enumerable: !0, value: null } })); let Le = !0, ke = !0, Ie = !1, Me = !0, Ue = !1, ze = !0, Pe = !1, Fe = !1, He = !1, Be = !1, Ge = !1, We = !1, Ye = !0, je = !1, Xe = !0, qe = !1, $e = {}, Ke = null; const Ve = R({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]); let Ze = null; const Je = R({}, ["audio", "video", "img", "source", "image", "track"]); let Qe = null; const et = R({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), tt = "http://www.w3.org/1998/Math/MathML", nt = "http://www.w3.org/2000/svg", ot = "http://www.w3.org/1999/xhtml"; let rt = ot, it = !1, at = null; const lt = R({}, [tt, nt, ot], g); let ct = R({}, ["mi", "mo", "mn", "ms", "mtext"]), st = R({}, ["annotation-xml"]); const ut = R({}, ["title", "style", "font", "a", "script"]); let mt = null; const pt = ["application/xhtml+xml", "text/html"]; let ft = null, dt = null; const ht = r.createElement("form"), gt = function (e) { return e instanceof RegExp || e instanceof Function }, Tt = function () { let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; if (!dt || dt !== e) { if (e && "object" == typeof e || (e = {}), e = C(e), mt = -1 === pt.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE, ft = "application/xhtml+xml" === mt ? g : h, Ne = _(e, "ALLOWED_TAGS") ? R({}, e.ALLOWED_TAGS, ft) : we, Re = _(e, "ALLOWED_ATTR") ? R({}, e.ALLOWED_ATTR, ft) : De, at = _(e, "ALLOWED_NAMESPACES") ? R({}, e.ALLOWED_NAMESPACES, g) : lt, Qe = _(e, "ADD_URI_SAFE_ATTR") ? R(C(et), e.ADD_URI_SAFE_ATTR, ft) : et, Ze = _(e, "ADD_DATA_URI_TAGS") ? R(C(Je), e.ADD_DATA_URI_TAGS, ft) : Je, Ke = _(e, "FORBID_CONTENTS") ? R({}, e.FORBID_CONTENTS, ft) : Ve, ve = _(e, "FORBID_TAGS") ? R({}, e.FORBID_TAGS, ft) : C({}), Oe = _(e, "FORBID_ATTR") ? R({}, e.FORBID_ATTR, ft) : C({}), $e = !!_(e, "USE_PROFILES") && e.USE_PROFILES, Le = !1 !== e.ALLOW_ARIA_ATTR, ke = !1 !== e.ALLOW_DATA_ATTR, Ie = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Me = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR, Ue = e.SAFE_FOR_TEMPLATES || !1, ze = !1 !== e.SAFE_FOR_XML, Pe = e.WHOLE_DOCUMENT || !1, Be = e.RETURN_DOM || !1, Ge = e.RETURN_DOM_FRAGMENT || !1, We = e.RETURN_TRUSTED_TYPE || !1, He = e.FORCE_BODY || !1, Ye = !1 !== e.SANITIZE_DOM, je = e.SANITIZE_NAMED_PROPS || !1, Xe = !1 !== e.KEEP_CONTENT, qe = e.IN_PLACE || !1, Se = e.ALLOWED_URI_REGEXP || X, rt = e.NAMESPACE || ot, ct = e.MATHML_TEXT_INTEGRATION_POINTS || ct, st = e.HTML_INTEGRATION_POINTS || st, Ce = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && gt(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Ce.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && gt(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Ce.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (Ce.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ue && (ke = !1), Ge && (Be = !0), $e && (Ne = R({}, U), Re = [], !0 === $e.html && (R(Ne, O), R(Re, z)), !0 === $e.svg && (R(Ne, x), R(Re, P), R(Re, H)), !0 === $e.svgFilters && (R(Ne, L), R(Re, P), R(Re, H)), !0 === $e.mathMl && (R(Ne, I), R(Re, F), R(Re, H))), e.ADD_TAGS && ("function" == typeof e.ADD_TAGS ? xe.tagCheck = e.ADD_TAGS : (Ne === we && (Ne = C(Ne)), R(Ne, e.ADD_TAGS, ft))), e.ADD_ATTR && ("function" == typeof e.ADD_ATTR ? xe.attributeCheck = e.ADD_ATTR : (Re === De && (Re = C(Re)), R(Re, e.ADD_ATTR, ft))), e.ADD_URI_SAFE_ATTR && R(Qe, e.ADD_URI_SAFE_ATTR, ft), e.FORBID_CONTENTS && (Ke === Ve && (Ke = C(Ke)), R(Ke, e.FORBID_CONTENTS, ft)), Xe && (Ne["#text"] = !0), Pe && R(Ne, ["html", "head", "body"]), Ne.table && (R(Ne, ["tbody"]), delete ve.tbody), e.TRUSTED_TYPES_POLICY) { if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML) throw S('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'); if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL) throw S('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'); le = e.TRUSTED_TYPES_POLICY, ce = le.createHTML("") } else void 0 === le && (le = function (e, t) { if ("object" != typeof e || "function" != typeof e.createPolicy) return null; let n = null; const o = "data-tt-policy-suffix"; t && t.hasAttribute(o) && (n = t.getAttribute(o)); const r = "dompurify" + (n ? "#" + n : ""); try { return e.createPolicy(r, { createHTML: e => e, createScriptURL: e => e }) } catch (e) { return console.warn("TrustedTypes policy " + r + " could not be created."), null } }(j, c)), null !== le && "string" == typeof ce && (ce = le.createHTML("")); i && i(e), dt = e } }, yt = R({}, [...x, ...L, ...k]), Et = R({}, [...I, ...M]), At = function (e) { f(o.removed, { element: e }); try { ae(e).removeChild(e) } catch (t) { V(e) } }, _t = function (e, t) { try { f(o.removed, { attribute: t.getAttributeNode(e), from: t }) } catch (e) { f(o.removed, { attribute: null, from: t }) } if (t.removeAttribute(e), "is" === e) if (Be || Ge) try { At(t) } catch (e) {} else try { t.setAttribute(e, "") } catch (e) {} }, bt = function (e) { let t = null, n = null; if (He) e = "<remove></remove>" + e; else { const t = T(e, /^[\r\n\t ]+/); n = t && t[0] } "application/xhtml+xml" === mt && rt === ot && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>"); const o = le ? le.createHTML(e) : e; if (rt === ot) try { t = (new Y).parseFromString(o, mt) } catch (e) {} if (!t || !t.documentElement) { t = se.createDocument(rt, "template", null); try { t.documentElement.innerHTML = it ? ce : o } catch (e) {} } const i = t.body || t.documentElement; return e && n && i.insertBefore(r.createTextNode(n), i.childNodes[0] || null), rt === ot ? pe.call(t, Pe ? "html" : "body")[0] : Pe ? t.documentElement : i }, St = function (e) { return ue.call(e.ownerDocument || e, e, B.SHOW_ELEMENT | B.SHOW_COMMENT | B.SHOW_TEXT | B.SHOW_PROCESSING_INSTRUCTION | B.SHOW_CDATA_SECTION, null) }, Nt = function (e) { return e instanceof W && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof G) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes) }, wt = function (e) { return "function" == typeof w && e instanceof w }; function Rt(e, t, n) { u(e, (e => { e.call(o, t, n, dt) })) } const Dt = function (e) { let t = null; if (Rt(de.beforeSanitizeElements, e, null), Nt(e)) return At(e), !0; const n = ft(e.nodeName); if (Rt(de.uponSanitizeElement, e, { tagName: n, allowedTags: Ne }), ze && e.hasChildNodes() && !wt(e.firstElementChild) && b(/<[/\w!]/g, e.innerHTML) && b(/<[/\w!]/g, e.textContent)) return At(e), !0; if (e.nodeType === ee) return At(e), !0; if (ze && e.nodeType === te && b(/<[/\w]/g, e.data)) return At(e), !0; if (!(xe.tagCheck instanceof Function && xe.tagCheck(n)) && (!Ne[n] || ve[n])) { if (!ve[n] && vt(n)) { if (Ce.tagNameCheck instanceof RegExp && b(Ce.tagNameCheck, n)) return !1; if (Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(n)) return !1 } if (Xe && !Ke[n]) { const t = ae(e) || e.parentNode, n = ie(e) || e.childNodes; if (n && t) { for (let o = n.length - 1; o >= 0; --o) { const r = $(n[o], !0); r.__removalCount = (e.__removalCount || 0) + 1, t.insertBefore(r, re(e)) } } } return At(e), !0 } return e instanceof D && !function (e) { let t = ae(e); t && t.tagName || (t = { namespaceURI: rt, tagName: "template" }); const n = h(e.tagName), o = h(t.tagName); return !!at[e.namespaceURI] && (e.namespaceURI === nt ? t.namespaceURI === ot ? "svg" === n : t.namespaceURI === tt ? "svg" === n && ("annotation-xml" === o || ct[o]) : Boolean(yt[n]) : e.namespaceURI === tt ? t.namespaceURI === ot ? "math" === n : t.namespaceURI === nt ? "math" === n && st[o] : Boolean(Et[n]) : e.namespaceURI === ot ? !(t.namespaceURI === nt && !st[o]) && !(t.namespaceURI === tt && !ct[o]) && !Et[n] && (ut[n] || !yt[n]) : !("application/xhtml+xml" !== mt || !at[e.namespaceURI])) }(e) ? (At(e), !0) : "noscript" !== n && "noembed" !== n && "noframes" !== n || !b(/<\/no(script|embed|frames)/i, e.innerHTML) ? (Ue && e.nodeType === Q && (t = e.textContent, u([he, ge, Te], (e => { t = y(t, e, " ") })), e.textContent !== t && (f(o.removed, { element: e.cloneNode() }), e.textContent = t)), Rt(de.afterSanitizeElements, e, null), !1) : (At(e), !0) }, Ct = function (e, t, n) { if (Ye && ("id" === t || "name" === t) && (n in r || n in ht)) return !1; if (ke && !Oe[t] && b(ye, t)); else if (Le && b(Ee, t)); else if (xe.attributeCheck instanceof Function && xe.attributeCheck(t, e)); else if (!Re[t] || Oe[t]) { if (!(vt(e) && (Ce.tagNameCheck instanceof RegExp && b(Ce.tagNameCheck, e) || Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(e)) && (Ce.attributeNameCheck instanceof RegExp && b(Ce.attributeNameCheck, t) || Ce.attributeNameCheck instanceof Function && Ce.attributeNameCheck(t, e)) || "is" === t && Ce.allowCustomizedBuiltInElements && (Ce.tagNameCheck instanceof RegExp && b(Ce.tagNameCheck, n) || Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(n)))) return !1 } else if (Qe[t]); else if (b(Se, y(n, _e, ""))); else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== E(n, "data:") || !Ze[e]) { if (Ie && !b(Ae, y(n, _e, ""))); else if (n) return !1 } else; return !0 }, vt = function (e) { return "annotation-xml" !== e && T(e, be) }, Ot = function (e) { Rt(de.beforeSanitizeAttributes, e, null); const { attributes: t } = e; if (!t || Nt(e)) return; const n = { attrName: "", attrValue: "", keepAttr: !0, allowedAttributes: Re, forceKeepAttr: void 0 }; let r = t.length; for (; r--;) { const i = t[r], { name: a, namespaceURI: l, value: c } = i, s = ft(a), m = c; let f = "value" === a ? m : A(m); if (n.attrName = s, n.attrValue = f, n.keepAttr = !0, n.forceKeepAttr = void 0, Rt(de.uponSanitizeAttribute, e, n), f = n.attrValue, !je || "id" !== s && "name" !== s || (_t(a, e), f = "user-content-" + f), ze && b(/((--!?|])>)|<\/(style|title|textarea)/i, f)) { _t(a, e); continue } if ("attributename" === s && T(f, "href")) { _t(a, e); continue } if (n.forceKeepAttr) continue; if (!n.keepAttr) { _t(a, e); continue } if (!Me && b(/\/>/i, f)) { _t(a, e); continue } Ue && u([he, ge, Te], (e => { f = y(f, e, " ") })); const d = ft(e.nodeName); if (Ct(d, s, f)) { if (le && "object" == typeof j && "function" == typeof j.getAttributeType) if (l); else switch (j.getAttributeType(d, s)) { case "TrustedHTML": f = le.createHTML(f); break; case "TrustedScriptURL": f = le.createScriptURL(f) }if (f !== m) try { l ? e.setAttributeNS(l, a, f) : e.setAttribute(a, f), Nt(e) ? At(e) : p(o.removed) } catch (t) { _t(a, e) } } else _t(a, e) } Rt(de.afterSanitizeAttributes, e, null) }, xt = function e(t) { let n = null; const o = St(t); for (Rt(de.beforeSanitizeShadowDOM, t, null); n = o.nextNode();)Rt(de.uponSanitizeShadowNode, n, null), Dt(n), Ot(n), n.content instanceof s && e(n.content); Rt(de.afterSanitizeShadowDOM, t, null) }; return o.sanitize = function (e) { let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = null, r = null, i = null, l = null; if (it = !e, it && (e = "\x3c!--\x3e"), "string" != typeof e && !wt(e)) { if ("function" != typeof e.toString) throw S("toString is not a function"); if ("string" != typeof (e = e.toString())) throw S("dirty is not a string, aborting") } if (!o.isSupported) return e; if (Fe || Tt(t), o.removed = [], "string" == typeof e && (qe = !1), qe) { if (e.nodeName) { const t = ft(e.nodeName); if (!Ne[t] || ve[t]) throw S("root node is forbidden and cannot be sanitized in-place") } } else if (e instanceof w) n = bt("\x3c!----\x3e"), r = n.ownerDocument.importNode(e, !0), r.nodeType === J && "BODY" === r.nodeName || "HTML" === r.nodeName ? n = r : n.appendChild(r); else { if (!Be && !Ue && !Pe && -1 === e.indexOf("<")) return le && We ? le.createHTML(e) : e; if (n = bt(e), !n) return Be ? null : We ? ce : "" } n && He && At(n.firstChild); const c = St(qe ? e : n); for (; i = c.nextNode();)Dt(i), Ot(i), i.content instanceof s && xt(i.content); if (qe) return e; if (Be) { if (Ge) for (l = me.call(n.ownerDocument); n.firstChild;)l.appendChild(n.firstChild); else l = n; return (Re.shadowroot || Re.shadowrootmode) && (l = fe.call(a, l, !0)), l } let m = Pe ? n.outerHTML : n.innerHTML; return Pe && Ne["!doctype"] && n.ownerDocument && n.ownerDocument.doctype && n.ownerDocument.doctype.name && b(K, n.ownerDocument.doctype.name) && (m = "<!DOCTYPE " + n.ownerDocument.doctype.name + ">\n" + m), Ue && u([he, ge, Te], (e => { m = y(m, e, " ") })), le && We ? le.createHTML(m) : m }, o.setConfig = function () { Tt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), Fe = !0 }, o.clearConfig = function () { dt = null, Fe = !1 }, o.isValidAttribute = function (e, t, n) { dt || Tt({}); const o = ft(e), r = ft(t); return Ct(o, r, n) }, o.addHook = function (e, t) { "function" == typeof t && f(de[e], t) }, o.removeHook = function (e, t) { if (void 0 !== t) { const n = m(de[e], t); return -1 === n ? void 0 : d(de[e], n, 1)[0] } return p(de[e]) }, o.removeHooks = function (e) { de[e] = [] }, o.removeAllHooks = function () { de = { afterSanitizeAttributes: [], afterSanitizeElements: [], afterSanitizeShadowDOM: [], beforeSanitizeAttributes: [], beforeSanitizeElements: [], beforeSanitizeShadowDOM: [], uponSanitizeAttribute: [], uponSanitizeElement: [], uponSanitizeShadowNode: [] } }, o }(); return re }));

	// Create a custom CSP policy (using DOM Purify for added security)
	let goodTube_csp = false;
	if (window.trustedTypes && window.trustedTypes.createPolicy && DOMPurify) {
		goodTube_csp = window.trustedTypes.createPolicy("GoodTubePolicy", {
			createHTML: (input) => DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: false })
		});
	}


	/* Helper functions
	------------------------------------------------------------------------------------------ */
	// Setup GET parameters
	function goodTube_helper_setupGetParams() {
		let getParams = {};

		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
			function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
			}

			getParams[decode(arguments[1])] = decode(arguments[2]);
		});

		// For some users, the URL will contain the video ID as part of the URL
		// Example - "/watch/xxxx" or "/live/xxxx"
		// In this case, we want to add it manually as "v" (just like for /watch?v=xxxx)
		if (goodTube_helper_watchingVideo() && typeof getParams['v'] === 'undefined') {
			let splitString = '';
			if (window.location.href.indexOf('/watch/') !== -1) {
				splitString = '/watch/';
			}
			else {
				splitString = '/live/';
			}

			let bits = window.location.href.split(splitString);
			if (bits.length === 2) {
				let endBits = bits[1].split('?');
				getParams['v'] = endBits[endBits.length - 1];
			}
		}

		return getParams;
	}

	// Set a cookie
	function goodTube_helper_setCookie(name, value, days = 399) {
		// Force new cookie names, we had the path attribute wrong...sorry all this will reset your settings (22/10/2025)
		name = name + '_new';

		document.cookie = name + "=" + encodeURIComponent(value) + ";SameSite=Lax;path=/;max-age=" + (days * 24 * 60 * 60);
	}

	// Get a cookie
	function goodTube_helper_getCookie(name) {
		// Force new cookie names, we had the path attribute wrong...sorry all this will reset your settings (22/10/2025)
		name = name + '_new';

		// Split the cookie string and get all individual name=value pairs in an array
		let cookies = document.cookie.split(";");

		// Loop through the array elements
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].split("=");

			// Removing whitespace at the beginning of the cookie name and compare it with the given string
			if (name == cookie[0].trim()) {
				// Decode the cookie value and return
				return decodeURIComponent(cookie[1]);
			}
		}

		// Return null if not found
		return null;
	}

	// Simulate a click (without changing focus)
	function goodTube_helper_click(element) {
		if (element) {
			element.dispatchEvent(new PointerEvent('mousedown', { bubbles: true, cancelable: true, button: 0 }));
			element.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true, button: 0 }));
			element.dispatchEvent(new PointerEvent('mouseup', { bubbles: true, cancelable: true, button: 0 }));
		}
	}

	// Add a CSS class to show or hide elements
	function goodTube_helper_showHide_init() {
		let style = document.createElement('style');
		style.textContent = `
			.goodTube_hidden {
				display: none !important;
			}
		`;
		document.head.appendChild(style);
	}

	// Hide an element
	function goodTube_helper_hideElement(element) {
		if (element && !element.classList.contains('goodTube_hidden')) {
			element.classList.add('goodTube_hidden');
		}
	}

	// Show an element
	function goodTube_helper_showElement(element) {
		if (element && element.classList.contains('goodTube_hidden')) {
			element.classList.remove('goodTube_hidden');
		}
	}

	// Check if we're watching a video
	function goodTube_helper_watchingVideo() {
		// If the URL contains "/watch/" or "/watch?" or "/live/", we're viewing a video
		if (window.location.href.indexOf('/watch/') !== -1 || window.location.href.indexOf('/watch?') !== -1 || window.location.href.indexOf('/live/') !== -1) {
			return true;
		}
		// Otherwise, we're not viewing a video
		else {
			return false;
		}
	}

	// Check if ads are showing
	function goodTube_helper_adsShowing() {
		// If we're viewing a video
		if (goodTube_helper_watchingVideo()) {
			// Get the ads DOM elements
			let adsElement = document.querySelector('.video-ads');
			let sponsoredAdsElement = document.querySelector('.ad-simple-attributed-string');

			// If ads are showing
			if ((adsElement && adsElement.checkVisibility()) || (sponsoredAdsElement && sponsoredAdsElement.checkVisibility())) {
				return true;
			}
			// Otherwise, ads are not showing
			else {
				return false;
			}
		}
	}

	// Set HTML using our CSP policy
	function goodTube_helper_innerHTML(element, html) {
		// If our CSP policy exists, sanitise the HTML using it
		if (goodTube_csp) {
			html = goodTube_csp.createHTML(html);
		}

		// Run the innerHTML function
		element.innerHTML = html;
	}

	function goodTube_helper_insertAdjacentHTML(element, position, html) {
		// If our CSP policy exists, sanitise the HTML using it
		if (goodTube_csp) {
			html = goodTube_csp.createHTML(html);
		}

		// Run the insertAdjacentHTML function
		element.insertAdjacentHTML(position, html);
	}


	/* Global variables
	------------------------------------------------------------------------------------------ */
	// A reference to our player's wrapper
	let goodTube_playerWrapper = false;

	// A reference to our player's iframe
	let goodTube_player = false;

	// The page api
	let goodTube_page_api = false;

	// The iframe api
	let goodTube_iframe_api = false;

	// Are we in picture in picture?
	let goodTube_pip = false;

	// Are we syncing the main Youtube player?
	let goodTube_syncingPlayer = false;

	// A reference to the previous URL (used to detect when the page changes)
	let goodTube_previousUrl = false;

	// Have we already turned off Youtube's default autoplay?
	let goodTube_turnedOffAutoplay = false;

	// Have we already redirected away from a short?
	let goodTube_redirectHappened = false;

	// Is this the first video we're loading?
	let goodTube_firstLoad = true;

	// Has the proxy iframe loaded?
	let goodTube_proxyIframeLoaded = false;

	// Has the player iframe loaded?
	let goodTube_playerIframeLoaded = false;

	// Hold the playlist information
	let goodTube_playlist = false;
	let goodTube_playlistIndex = 0;

	// Is the "hide and mute ads" fallback active?
	let goodTube_fallback = false;

	// Is the tab in focus?
	let goodTube_tabInFocus = document.hasFocus();

	// Are shorts enabled?
	let goodTube_shorts = goodTube_helper_getCookie('goodTube_shorts');
	if (!goodTube_shorts) {
		goodTube_helper_setCookie('goodTube_shorts', 'false');
		goodTube_shorts = 'false';
	}

	// Are info cards enabled?
	let goodTube_hideInfoCards = goodTube_helper_getCookie('goodTube_hideInfoCards');
	if (!goodTube_hideInfoCards) {
		goodTube_helper_setCookie('goodTube_hideInfoCards', 'false');
		goodTube_hideInfoCards = 'false';
	}

	// Is the end screen enabled (suggested videos)?
	let goodTube_hideEndScreen = goodTube_helper_getCookie('goodTube_hideEndScreen');
	if (!goodTube_hideEndScreen) {
		goodTube_helper_setCookie('goodTube_hideEndScreen', 'false');
		goodTube_hideEndScreen = 'false';
	}

	// Are suggested videos enabled (sidebar)?
	let goodTube_hideSuggestedVideos = goodTube_helper_getCookie('goodTube_hideSuggestedVideos');
	if (!goodTube_hideSuggestedVideos) {
		goodTube_helper_setCookie('goodTube_hideSuggestedVideos', 'false');
		goodTube_hideSuggestedVideos = 'false';
	}

	// Are comments enabled?
	let goodTube_hideComments = goodTube_helper_getCookie('goodTube_hideComments');
	if (!goodTube_hideComments) {
		goodTube_helper_setCookie('goodTube_hideComments', 'false');
		goodTube_hideComments = 'false';
	}

	// Are AI summaries enabled?
	let goodTube_hideAiSummaries = goodTube_helper_getCookie('goodTube_hideAiSummaries');
	if (!goodTube_hideAiSummaries) {
		goodTube_helper_setCookie('goodTube_hideAiSummaries', 'false');
		goodTube_hideAiSummaries = 'false';
	}

	// Always play videos from the start?
	let goodTube_alwaysStart = goodTube_helper_getCookie('goodTube_alwaysStart');
	if (!goodTube_alwaysStart) {
		goodTube_helper_setCookie('goodTube_alwaysStart', 'false');
		goodTube_alwaysStart = 'false';
	}

	// Use a black background for the video player?
	let goodTube_blackBackground = goodTube_helper_getCookie('goodTube_blackBackground');
	if (!goodTube_blackBackground) {
		goodTube_helper_setCookie('goodTube_blackBackground', 'true');
		goodTube_blackBackground = 'true';
	}

	// Is autoplay turned on?
	let goodTube_autoplay = goodTube_helper_getCookie('goodTube_autoplay');
	if (!goodTube_autoplay) {
		goodTube_helper_setCookie('goodTube_autoplay', 'true');
		goodTube_autoplay = 'true';
	}

	// Get the playback speed to restore it
	let goodTube_playbackSpeed = goodTube_helper_getCookie('goodTube_playbackSpeed');
	if (!goodTube_playbackSpeed) {
		goodTube_playbackSpeed = '1';
	}

	// Fetch the GET params
	let goodTube_getParams = goodTube_helper_setupGetParams();


	/* Youtube functions
	------------------------------------------------------------------------------------------ */
	// Hide page elements
	function goodTube_youtube_hidePageElements() {
		// Hide ads
		let cssOutput = `
			.ytd-search ytd-shelf-renderer,
			ytd-reel-shelf-renderer,
			ytd-merch-shelf-renderer,
			ytd-action-companion-ad-renderer,
			ytd-display-ad-renderer,

			ytd-video-masthead-ad-advertiser-info-renderer,
			ytd-video-masthead-ad-primary-video-renderer,
			ytd-in-feed-ad-layout-renderer,
			ytd-ad-slot-renderer,
			ytd-statement-banner-renderer,
			ytd-banner-promo-renderer-background
			ytd-ad-slot-renderer,
			ytd-in-feed-ad-layout-renderer,
			ytd-engagement-panel-section-list-renderer:not(.ytd-popup-container):not([target-id='engagement-panel-clip-create']):not(.ytd-shorts),
			ytd-compact-video-renderer:has(.goodTube_hidden),
			ytd-rich-item-renderer:has(> #content > ytd-ad-slot-renderer)
			.ytd-video-masthead-ad-v3-renderer,
			div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
			div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
			div#main-container.style-scope.ytd-promoted-video-renderer,
			div#player-ads.style-scope.ytd-watch-flexy,
			#clarify-box,
			ytd-rich-item-renderer:has(> #content > ytd-ad-slot-renderer),

			ytm-rich-shelf-renderer,
			ytm-search ytm-shelf-renderer,
			ytm-button-renderer.icon-avatar_logged_out,
			ytm-companion-slot,
			ytm-reel-shelf-renderer,
			ytm-merch-shelf-renderer,
			ytm-action-companion-ad-renderer,
			ytm-display-ad-renderer,
			ytm-rich-section-renderer,
			ytm-video-masthead-ad-advertiser-info-renderer,
			ytm-video-masthead-ad-primary-video-renderer,
			ytm-in-feed-ad-layout-renderer,
			ytm-ad-slot-renderer,
			ytm-statement-banner-renderer,
			ytm-banner-promo-renderer-background
			ytm-ad-slot-renderer,
			ytm-in-feed-ad-layout-renderer,
			ytm-compact-video-renderer:has(.goodTube_hidden),
			ytm-rich-item-renderer:has(> #content > ytm-ad-slot-renderer)
			.ytm-video-masthead-ad-v3-renderer,
			div#root.style-scope.ytm-display-ad-renderer.yt-simple-endpoint,
			div#sparkles-container.style-scope.ytm-promoted-sparkles-web-renderer,
			div#main-container.style-scope.ytm-promoted-video-renderer,
			div#player-ads.style-scope.ytm-watch-flexy,
			ytd-compact-movie-renderer,

			yt-about-this-ad-renderer,
			masthead-ad,
			ad-slot-renderer,
			yt-mealbar-promo-renderer,
			statement-banner-style-type-compact,
			ytm-promoted-sparkles-web-renderer,
			tp-yt-iron-overlay-backdrop,
			#masthead-ad
			 {
				display: none !important;
			}

			.style-scope[page-subtype='channels'] ytd-shelf-renderer,
			.style-scope[page-subtype='channels'] ytm-shelf-renderer {
				display: block !important;
			}
		`;

		// Debug message
		console.log('[GoodTube] Ads removed');

		// Hide the main Youtube player
		cssOutput += `
			body:not(.goodTube_fallback) #player:not(.ytd-shorts),
			body:not(.goodTube_fallback) #player-full-bleed-container {
				visibility: hidden !important;
			}
		`;

		// Hide the miniplayer
		cssOutput += `
			ytd-miniplayer,
			.ytp-miniplayer-button {
				display: none !important;
			}
		`;

		// Hide shorts if they're not enabled
		if (goodTube_shorts === 'false') {
			cssOutput += `
				ytm-pivot-bar-item-renderer:has(> .pivot-shorts),
				ytd-rich-section-renderer,
				grid-shelf-view-model {
					display: none !important;
				}
			`;

			// Debug message
			console.log('[GoodTube] Shorts removed');
		}


		// Hide suggested videos if they're not enabled
		if (goodTube_hideSuggestedVideos === 'true') {
			cssOutput += `
				/* Hide suggested videos */
				ytd-watch-flexy #secondary #related {
					display: none !important;
				}

				/* Hide full sidebar if not playlist */
				ytd-watch-flexy #secondary:not(:has(ytd-playlist-panel-video-renderer)) {
					display: none !important;
				}
			`;

			// Debug message
			console.log('[GoodTube] Suggested videos removed');
		}

		// Hide comments if they're not enabled
		if (goodTube_hideComments === 'true') {
			cssOutput += `
				ytd-item-section-renderer.ytd-comments,
				#comments-button,
				#shorts-panel-container ytd-engagement-panel-section-list-renderer {
					display: none !important;
				}
			`;

			// Debug message
			console.log('[GoodTube] Comments removed');
		}

		// Hide AI summaries if they're not enabled
		if (goodTube_hideAiSummaries === 'true') {
			cssOutput += `
				ytd-expandable-metadata-renderer[has-video-summary] {
					display: none !important;
				}
			`;

			// Debug message
			console.log('[GoodTube] AI summaries removed');
		}

		// Add the styles to the page
		let style = document.createElement('style');
		style.textContent = cssOutput;
		document.head.appendChild(style);
	}

	// Hide shorts (real time)
	function goodTube_youtube_hideShortsRealTime() {
		// If shorts are enabled, don't do anything
		if (goodTube_shorts === 'true') {
			return;
		}

		// Redirect from any short to the homepage
		if (window.location.href.indexOf('/shorts') !== -1 && !goodTube_redirectHappened) {
			window.location.href = 'https://youtube.com';
			goodTube_redirectHappened = true;
		}

		// Hide shorts links (we can't mark these as "checked" to save on resources, as the URLs seem to change over time)
		let shortsLinks = document.querySelectorAll('a:not(.goodTube_hidden)');
		shortsLinks.forEach((element) => {
			if (element.href.indexOf('shorts/') !== -1) {
				goodTube_helper_hideElement(element);
				goodTube_helper_hideElement(element.closest('ytd-video-renderer'));
				goodTube_helper_hideElement(element.closest('ytd-compact-video-renderer'));
				goodTube_helper_hideElement(element.closest('ytd-rich-grid-media'));
			}
		});

		// Hide shorts buttons
		let shortsButtons = document.querySelectorAll('yt-chip-cloud-chip-renderer:not(.goodTube_hidden):not(.goodTube_checked), yt-tab-shape:not(.goodTube_hidden):not(.goodTube_checked), ytd-guide-entry-renderer:not(.goodTube_checked)');
		shortsButtons.forEach((element) => {
			if (element.innerHTML.toLowerCase().indexOf('shorts') !== -1) {
				goodTube_helper_hideElement(element);
			}

			// Mark this element as checked to save on resources
			element.classList.add('goodTube_checked');
		});
	}

	// Support timestamp links in comments
	function goodTube_youtube_timestampLinks() {
		// Links in video description and comments
		let timestampLinks = document.querySelectorAll('#description a, ytd-comments .yt-core-attributed-string a, ytm-expandable-video-description-body-renderer a, .comment-content a');

		// For each link
		timestampLinks.forEach((element) => {
			// Make sure we've not touched it yet, this stops doubling up on event listeners
			if (!element.classList.contains('goodTube_timestampLink') && element.getAttribute('href') && element.getAttribute('href').indexOf(goodTube_getParams['v']) !== -1) {
				element.classList.add('goodTube_timestampLink');

				// Add the event listener to send our player to the correct time
				element.addEventListener('click', function () {
					// Define the time to skip to
					let time = 0;

					// Get the time from the link (if it exstis)
					let bits = element.getAttribute('href').split('t=');
					if (typeof bits[1] !== 'undefined') {
						time = parseFloat(bits[1].replace('s', ''));
					}

					// Skip to the time
					goodTube_player_skipTo(time);
				});
			}
		});
	}

	// Mute and pause all Youtube videos
	let goodTube_youtube_pauseMuteVideos_timeout = setTimeout(() => {}, 0);
	function goodTube_youtube_pauseMuteVideos() {
		// IF if shorts are enabled and we're viewing a short
		// OR we're not viewing a video
		if (
			(goodTube_shorts === 'true' && window.location.href.indexOf('/shorts') !== -1)
			||
			!goodTube_helper_watchingVideo()
		) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_youtube_pauseMuteVideos_timeout);

			// Loop this function
			goodTube_youtube_pauseMuteVideos_timeout = setTimeout(goodTube_youtube_pauseMuteVideos, 100);

			// Don't pause or mute videos
			return;
		}

		// Pause and mute all HTML videos on the page
		let youtubeVideos = document.querySelectorAll('video');
		youtubeVideos.forEach((video) => {
			// If the "hide the mute" ads fallback is active
			if (goodTube_fallback) {
				// If the video is playing and it's NOT the main player
				if (!video.paused && !video.closest('#movie_player')) {
					// Pause and mute the video
					video.muted = true;
					video.volume = 0;
					video.pause();
				}
			}
			// Otherwise, the "hide and mute" ads fallback is inactive
			else {
				// IF (the video is playing)
				// AND (we're not syncing the main player OR it's not the main player)
				if (!video.paused && (!goodTube_syncingPlayer || !video.closest('#movie_player'))) {
					// Mute the video
					video.muted = true;
					video.volume = 0;

					// If ads are not showing OR it's not the main player
					if (!goodTube_helper_adsShowing() || !video.closest('#movie_player')) {
						// Pause the video
						video.pause();

						// Restore the playback rate
						video.playbackRate = goodTube_playbackSpeed;
					}
					// Otherwise, it's the main player and ads are showing
					else {
						// Play the video
						video.play();

						// Speed up to 2x (any faster is detected by Youtube)
						video.playbackRate = 2;
					}
				}
			}
		});

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_youtube_pauseMuteVideos_timeout);

		// Loop this function
		goodTube_youtube_pauseMuteVideos_timeout = setTimeout(goodTube_youtube_pauseMuteVideos, 100);
	}

	// Turn off autoplay
	function goodTube_youtube_turnOffAutoplay() {
		// If we've already turned off autoplay, just return
		if (goodTube_turnedOffAutoplay) {
			return;
		}

		// Target the autoplay button
		let autoplayButton = document.querySelector('#movie_player .ytp-autonav-toggle-button');

		// If we found it
		if (autoplayButton) {
			// Turn off autoplay
			if (autoplayButton.getAttribute('aria-checked') === 'true') {
				goodTube_helper_click(autoplayButton);
			}

			// Set a variable if autoplay has been turned off
			goodTube_turnedOffAutoplay = true;
		}
	}

	// Remove the "are you still watching" popup
	function goodTube_youtube_removeAreYouStillWatchingPopup() {
		// Get all the dialogue boxes
		let dialogueBoxes = document.querySelectorAll('yt-confirm-dialog-renderer');

		// For each dialogue box
		dialogueBoxes.forEach((dialogueBox) => {
			// If it has the correct text
			if (dialogueBox.innerHTML.indexOf('Video paused. Continue watching?') !== -1) {
				// Find the confirm button
				let confirmButton = dialogueBox.querySelector('#confirm-button');

				// If we found the confirm button
				if (confirmButton) {
					// Click it
					goodTube_helper_click(confirmButton);
				}
			}
		});
	}

	// Set the video aspect ratio
	function goodTube_youtube_setAspectRatio(widthRatio, heightRatio) {
		// Make sure we've been passed valid data
		if (!widthRatio || !heightRatio) {
			return;
		}

		// Target the aspect ratio element with the CSS variables
		let variableElement = document.querySelector('ytd-watch-flexy');

		// If we found the element, we're watching a video and the "hide and mute ads" fallback is inactive
		if (variableElement && goodTube_helper_watchingVideo() && !goodTube_fallback) {
			// Set the aspect ratio
			variableElement.style.setProperty("--ytd-watch-flexy-width-ratio", widthRatio);
			variableElement.style.setProperty("--ytd-watch-flexy-height-ratio", heightRatio);
		}
	}

	// Unset the video aspect ratio
	function goodTube_youtube_unsetAspectRatio() {
		// Target the aspect ratio element with the CSS variables
		let variableElement = document.querySelector('ytd-watch-flexy');

		// If we found the aspect ratio element
		if (variableElement) {
			// Remove the aspect ratio
			variableElement.style.removeProperty("--ytd-watch-flexy-width-ratio");
			variableElement.style.removeProperty("--ytd-watch-flexy-height-ratio");
		}
	}


	/* Player functions
	------------------------------------------------------------------------------------------ */
	// Init player
	let goodTube_player_init_timeout = setTimeout(() => {}, 0);
	function goodTube_player_init() {
		// Get the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Get the video data to check loading state
		let videoData = false;
		if (goodTube_page_api && typeof goodTube_page_api.getVideoData === 'function') {
			videoData = goodTube_page_api.getVideoData();
		}

		// Keep trying to get the frame API until it exists
		if (!videoData) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_init_timeout);

			// Create a new timeout
			goodTube_player_init_timeout = setTimeout(goodTube_player_init, 100);

			return;
		}

		// Use a black background for the video player? (This is a setting)
		let backgroundColor = 'transparent';
		if (goodTube_blackBackground === 'true') {
			backgroundColor = '#000000';
		}

		// Add CSS styles for the player
		let style = document.createElement('style');
		style.textContent = `
			/* Player wrapper */
			#goodTube_playerWrapper {
				border-radius: 12px;
				background: ` + backgroundColor + `;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 999;
				overflow: hidden;
			}

			/* Theater mode */
			#goodTube_playerWrapper.goodTube_theater {
				border-radius: 0;
				background: #000000;
			}

			/* No black background on dark theme */
			html[darker-dark-theme][dark] #goodTube_playerWrapper {
				background: transparent;
			}

			/* Fix size of Youtube player (this has to do with us setting the aspect ratio inside "goodTube_youtube_setAspectRatio") */
			body:not(.goodTube_fallback) #primary.ytd-watch-flexy {
				max-width: calc(177.77777778vh - var(--ytd-watch-flexy-masthead-height) * 1.7777777778 - var(--ytd-margin-6x) * 1.7777777778 - var(--ytd-watch-flexy-space-below-player) * 1.7777777778) !important;
				min-width: calc(var(--ytd-watch-flexy-min-player-height) * 1.7777777778) !important;
			}
		`;
		document.head.appendChild(style);

		// Setup player layout
		let playerWrapper = document.createElement('div');
		playerWrapper.id = 'goodTube_playerWrapper';
		playerWrapper.classList.add('goodTube_hidden');

		// Add player to the page
		document.body.appendChild(playerWrapper);

		// Add video iframe embed (via proxy iframe)
		let proxyIframe = document.createElement('iframe');
		proxyIframe.src = '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x65\x6e\x2e\x77\x69\x6b\x69\x70\x65\x64\x69\x61\x2e\x6f\x72\x67\x2f\x77\x69\x6b\x69\x2f\x46\x75\x63\x6b\x3f\x67\x6f\x6f\x64\x54\x75\x62\x65\x50\x72\x6f\x78\x79\x3d\x31';
		proxyIframe.setAttribute('width', '100%');
		proxyIframe.setAttribute('height', '100%');
		proxyIframe.setAttribute('frameborder', '0');
		proxyIframe.setAttribute('scrolling', 'yes');
		proxyIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
		proxyIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
		proxyIframe.setAttribute('allowfullscreen', true);
		proxyIframe.style.display = 'none';
		playerWrapper.appendChild(proxyIframe);

		// Expose these globally
		goodTube_playerWrapper = playerWrapper;
		goodTube_player = proxyIframe;

		// Run the actions every 100ms
		goodTube_actions();
		setInterval(goodTube_actions, 100);
	}

	// Position and size the player
	let goodTube_clearedPlayer = false;
	function goodTube_player_positionAndSize() {
		// If the "hide and mute ads" fallback is inactive
		if (goodTube_fallback) {
			if (!goodTube_clearedPlayer) {
				// Hide and clear the embedded player
				goodTube_player_clear(true);
				goodTube_clearedPlayer = true;
			}
		}
		// Otherwise, the "hide and mute ads" fallback is inactive
		else {
			goodTube_clearedPlayer = false;


			// Get the Youtube player
			// We target 4 elements here, it seems to change for different users? Weird stuff.
			let youtubePlayer = document.querySelector('#player.ytd-watch-flexy');

			if (!youtubePlayer || youtubePlayer.offsetHeight <= 0) {
				youtubePlayer = document.querySelector('#ytd-player');
			}

			if (!youtubePlayer || youtubePlayer.offsetHeight <= 0) {
				youtubePlayer = document.querySelector('.player-size');
			}

			// This element helps during the loading of the page (if we use it we see the video a little sooner, which is nice)
			if (!youtubePlayer || youtubePlayer.offsetHeight <= 0) {
				youtubePlayer = document.querySelector('.html5-video-player');
			}


			// If we found the Youtube player
			if (youtubePlayer && youtubePlayer.offsetHeight > 0) {
				// Make our custom player match the position of the Youtube player
				// Note: Our custom player uses "position: absolute" so take into account the window scroll
				let rect = youtubePlayer.getBoundingClientRect();
				goodTube_playerWrapper.style.top = (rect.top + window.scrollY) + 'px';
				goodTube_playerWrapper.style.left = (rect.left + window.scrollX) + 'px';

				// Make our custom player match the size of the Youtube player
				goodTube_playerWrapper.style.width = youtubePlayer.offsetWidth + 'px';
				goodTube_playerWrapper.style.height = youtubePlayer.offsetHeight + 'px';

				// Show the GoodTube player
				goodTube_helper_showElement(goodTube_playerWrapper);
			}
		}
	}

	// Populate the playlist info
	let goodTube_player_populatePlaylistInfo_timeout = setTimeout(() => {}, 0);
	function goodTube_player_populatePlaylistInfo() {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure we have access to the frame API
		if (typeof goodTube_page_api.getPlaylist === 'function' && typeof goodTube_page_api.getPlaylistIndex === 'function') {
			goodTube_playlist = goodTube_page_api.getPlaylist();
			goodTube_playlistIndex = goodTube_page_api.getPlaylistIndex();

			// If the playlist info isn't ready yet
			if (!goodTube_playlist) {
				// Clear timeout first to solve memory leak issues
				clearTimeout(goodTube_player_populatePlaylistInfo_timeout);

				// Try again
				goodTube_player_populatePlaylistInfo_timeout = setTimeout(goodTube_player_populatePlaylistInfo, 100);
			}
		}
	}

	// Load a video
	let goodTube_player_load_timeout = setTimeout(() => {}, 0);
	function goodTube_player_load() {
		// Reset the "hide and mute ads" state (this ensures the fallback will refresh for each new video)
		goodTube_hideAndMuteAds_state = '';

		// Pause the video first (this helps to prevent audio flashes)
		goodTube_player_pause();


		// Make sure the proxy iframe has loaded
		if (!goodTube_proxyIframeLoaded) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_load_timeout);

			// Create a new timeout to try again
			goodTube_player_load_timeout = setTimeout(goodTube_player_load, 100);

			// Don't do anything else
			return;
		}


		// Setup the starting time
		let startTime = 0;

		// Include the startime time from query params (if enabled)
		if (goodTube_alwaysStart === 'false') {
			if (typeof goodTube_getParams['t'] !== 'undefined') {
				startTime = parseFloat(goodTube_getParams['t'].replace('s', ''));
			}
		}


		// If we're viewing a playlist
		let playlist = 'false';
		if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
			// Populate the GET params below to let the iframe know we're viewing a playlist
			playlist = 'true';

			// Populate the playlist info
			goodTube_player_populatePlaylistInfo();
		}
		// Otherwise, remove playlist info
		else {
			goodTube_playlist = false;
			goodTube_playlistIndex = 0;
		}

		// If we're loading for the first time
		if (goodTube_firstLoad) {
			// If we're not viewing a video
			if (!goodTube_helper_watchingVideo()) {
				// Clear and hide the player
				goodTube_player_clear();
			}

			// Include the start time if it exists
			let startTimeParam = '';
			if (startTime > 0) {
				startTimeParam = '&start=' + startTime;
			}

			// Set the video source
			goodTube_player.contentWindow.postMessage('goodTube_src_https://www.youtube.com/embed/' + goodTube_getParams['v'] + '?goodTubeEmbed=1&autoplay=1&goodTube_playlist=' + playlist + '&goodTube_autoplay=' + goodTube_autoplay + '&goodTube_playbackSpeed=' + goodTube_playbackSpeed + '&goodTube_hideInfoCards=' + goodTube_hideInfoCards + '&goodTube_hideEndScreen=' + goodTube_hideEndScreen + startTimeParam, '*');

			// Indicate we've completed the first load
			goodTube_firstLoad = false;
		}
		// Otherwise, for all other loads
		else {
			// Load the video via the iframe api
			goodTube_player.contentWindow.postMessage('goodTube_load_' + goodTube_getParams['v'] + '|||' + startTime + '|||' + playlist, '*');
		}

		// Sync the starting time
		if (goodTube_alwaysStart === 'false') {
			goodTube_player_syncStartingTime();
		}

		// Play the video (this solves some edge cases)
		goodTube_player_play();
	}

	// Sync the starting time
	let goodTube_player_syncStartingTime_timeout = setTimeout(() => {}, 0);
	function goodTube_player_syncStartingTime() {
		// Make sure the player iframe has loaded
		if (!goodTube_playerIframeLoaded) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_syncStartingTime_timeout);

			// Create a new timeout to try again
			goodTube_player_syncStartingTime_timeout = setTimeout(goodTube_player_syncStartingTime, 100);

			// Don't do anything else
			return;
		}


		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Get the video data to check loading state and video id
		let videoData = false;
		let videoId = false;
		if (goodTube_page_api && typeof goodTube_page_api.getVideoData === 'function' && typeof goodTube_page_api.getCurrentTime === 'function') {
			videoData = goodTube_page_api.getVideoData();
			videoId = videoData.video_id;
		}

		// If there's no video data, no video id, or the id doesn't match the one in the query params yet (it hasn't loaded)
		if (!videoData || !videoId || videoId !== goodTube_getParams['v']) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_syncStartingTime_timeout);

			// Create a new timeout to try again
			goodTube_player_syncStartingTime_timeout = setTimeout(goodTube_player_syncStartingTime, 100);

			// Don't do anything else
			return;
		}


		// Setup the sync time
		let syncTime = Math.floor(goodTube_page_api.getCurrentTime());

		// If the sync time is greater than or equal to 10s (this accounts for some delayed loading time)
		if (syncTime >= 10) {
			// Sync our player
			goodTube_player_skipTo(syncTime, videoId);
		}
	}

	// Clear and hide the player
	function goodTube_player_clear(fallbackActive = false) {
		// If we're not in picture in picture mode
		if (!goodTube_pip) {
			// Clear the "hide and mute ads" fallback
			if (fallbackActive) {
				// Refetch the page api
				goodTube_page_api = document.getElementById('movie_player');

				// Make sure the API is all good
				if (goodTube_page_api && typeof goodTube_page_api.stopVideo === 'function') {
					// Stop the video
					goodTube_page_api.stopVideo();
				}
			}
			// Clear the regular player
			else {
				// Stop the video via the iframe api
				goodTube_player.contentWindow.postMessage('goodTube_stopVideo', '*');
			}
		}

		// Hide the player
		goodTube_helper_hideElement(goodTube_playerWrapper);
	}

	// Skip to time
	function goodTube_player_skipTo(time, videoId = '') {
		goodTube_player.contentWindow.postMessage('goodTube_skipTo_' + time + '|||' + videoId, '*');
	}

	// Pause
	function goodTube_player_pause() {
		goodTube_player.contentWindow.postMessage('goodTube_pause', '*');
	}

	// Play
	let goodTube_player_play_timeout = setTimeout(() => {}, 0);
	function goodTube_player_play() {
		// If the tab isn't in focus OR our player hasn't loaded
		if (!goodTube_tabInFocus || !goodTube_playerIframeLoaded) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_play_timeout);

			// Create a new timeout to try again
			goodTube_player_play_timeout = setTimeout(goodTube_player_play, 100);

			// Don't do anything else
			return;
		}

		// If the "hide and mute ads" fallback is disabled
		if (!goodTube_fallback) {
			goodTube_player.contentWindow.postMessage('goodTube_play|||' + goodTube_getParams['v'], '*');
		}
		// Otherwise, the "hide and mute ads" fallback is enabled
		else {
			// Re-fetch the page api
			goodTube_page_api = document.getElementById('movie_player');

			// Get the video data
			let videoData = false;
			if (goodTube_page_api && typeof goodTube_page_api.getVideoData === 'function') {
				videoData = goodTube_page_api.getVideoData();
			}

			// If the correct video hasn't loaded yet (based on the ID in the query params)
			if (!videoData || goodTube_getParams['v'] !== videoData.video_id) {
				// Clear timeout first to solve memory leak issues
				clearTimeout(goodTube_player_play_timeout);

				// Create a new timeout to try again
				goodTube_player_play_timeout = setTimeout(goodTube_player_play, 100);

				// Don't do anything else
				return;
			}

			// Make sure the video has not ended (this solves an edge case)
			let videoElement = document.querySelector('#movie_player video');
			if (videoElement) {
				if (videoElement.currentTime >= videoElement.duration) {
					return;
				}
			}

			// Play the video
			if (goodTube_page_api && typeof goodTube_page_api.playVideo === 'function') {
				// Wait 100ms (this solves an edge case)
				setTimeout(() => {
					// Force the video to play
					goodTube_page_api.playVideo();
				}, 100);
			}
		}
	}


	/* Keyboard shortcuts
	------------------------------------------------------------------------------------------ */
	// Add keyboard shortcuts
	function goodTube_shortcuts_init() {
		// Add event listeners
		document.addEventListener('keydown', goodTube_shortcuts_keypress, true);
		document.addEventListener('keyup', goodTube_shortcuts_keypress, true);
	}

	// Define the keypress function for the event listeners
	function goodTube_shortcuts_keypress(event) {
		// If we're not watching a video OR the "hide and mute ads" fallback is active
		if (!goodTube_helper_watchingVideo() || goodTube_fallback) {
			// Don't do anything
			return;
		}


		// Define the shortcuts we allow
		let allowedShortcuts = [
			// Playback speed
			{
				key: '>',
				code: false,
				ctrl: false,
				shift: true,
				alt: false
			},
			{
				key: '<',
				code: false,
				ctrl: false,
				shift: true,
				alt: false
			},

			// Skip frame
			{
				key: ',',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '.',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Skip 5 seconds
			{
				key: 'arrowleft',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: 'arrowright',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Skip 10 seconds
			{
				key: 'j',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: 'l',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Play / pause
			{
				key: ' ',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: 'k',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Mute
			{
				key: 'm',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Fullscreen
			{
				key: 'f',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Captions
			{
				key: 'c',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Text opacity
			{
				key: 'o',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Window opacity
			{
				key: 'w',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Font size
			{
				key: '=',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '-',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Panning (spherical videos)
			{
				key: 'w',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: 'a',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: 's',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: 'd',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Zooming (spherical videos)
			{
				key: '[',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: ']',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: false,
				code: 'numpadadd',
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: false,
				code: 'numpadsubtract',
				ctrl: false,
				shift: false,
				alt: false
			},

			// Skip to percentage
			{
				key: '0',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '1',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '2',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '3',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '4',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '5',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '6',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '7',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '8',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},
			{
				key: '9',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Picture in picture
			{
				key: 'i',
				code: false,
				ctrl: false,
				shift: false,
				alt: false
			},

			// Seek chapters
			{
				key: 'arrowleft',
				code: false,
				ctrl: true,
				shift: false,
				alt: false
			},
			{
				key: 'arrowright',
				code: false,
				ctrl: true,
				shift: false,
				alt: false
			}
		];


		// Which key was pressed?
		let keyPressed = event.key.toLowerCase();
		let codePressed = event.code.toLowerCase();

		// Is ctrl or meta (mac) pressed?
		let ctrlPressed = event.ctrlKey;
		if (event.metaKey) {
			ctrlPressed = event.metaKey;
		}

		// Is shift pressed?
		let shiftPressed = event.shiftKey;

		// Is alt pressed?
		let altPressed = event.altKey;


		// Ensure we've pressed an allowed shortcut
		let allowKeypress = false;
		allowedShortcuts.forEach((allowedShortcut) => {
			if (
				(keyPressed === allowedShortcut.key || codePressed === allowedShortcut.code) &&
				ctrlPressed === allowedShortcut.ctrl &&
				shiftPressed === allowedShortcut.shift &&
				altPressed === allowedShortcut.alt
			) {
				allowKeypress = true;
			}
		});


		// If we've allowed this keypress (because the shortcut was valid)
		if (allowKeypress) {
			// Get the currently focused element
			let focusedElement = event.srcElement;
			let focusedElement_tag = false;
			let focusedElement_id = false;
			if (focusedElement) {
				if (typeof focusedElement.nodeName !== 'undefined') {
					focusedElement_tag = focusedElement.nodeName.toLowerCase();
				}

				if (typeof focusedElement.getAttribute !== 'undefined') {
					focusedElement_id = focusedElement.getAttribute('id');
				}
			}

			// If we're not focused on a HTML form element
			if (
				!focusedElement ||
				(
					focusedElement_tag.indexOf('input') === -1 &&
					focusedElement_tag.indexOf('label') === -1 &&
					focusedElement_tag.indexOf('select') === -1 &&
					focusedElement_tag.indexOf('textarea') === -1 &&
					focusedElement_tag.indexOf('fieldset') === -1 &&
					focusedElement_tag.indexOf('legend') === -1 &&
					focusedElement_tag.indexOf('datalist') === -1 &&
					focusedElement_tag.indexOf('output') === -1 &&
					focusedElement_tag.indexOf('option') === -1 &&
					focusedElement_tag.indexOf('optgroup') === -1 &&
					focusedElement_id !== 'contenteditable-root'
				)
			) {
				// Prevent default actions
				event.preventDefault();
				event.stopImmediatePropagation();

				// Pass the keyboard shortcut to the iframe
				goodTube_player.contentWindow.postMessage('goodTube_shortcut_' + event.type + '_' + event.key + '_' + event.keyCode + '_' + event.ctrlKey + '_' + event.metaKey + '_' + event.shiftKey + '_' + event.altKey, '*');
			}
		}
	}


	/* Navigation
	------------------------------------------------------------------------------------------ */
	// Play the next video
	function goodTube_nav_next(shuffleLoopMethod = false) {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure it exists
		if (goodTube_page_api && typeof goodTube_page_api.nextVideo === 'function') {
			// Play the previous video
			goodTube_page_api.nextVideo();
		}

		// Debug message
		console.log('[GoodTube] Playing next video...');
	}

	// Play the previous video
	function goodTube_nav_prev() {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure it exists
		if (goodTube_page_api && typeof goodTube_page_api.previousVideo === 'function') {
			// Play the previous video
			goodTube_page_api.previousVideo();
		}

		// Debug message
		console.log('[GoodTube] Playing previous video...');
	}

	// Video has ended
	function goodTube_nav_videoEnded() {
		// Populate the playlist info
		goodTube_player_populatePlaylistInfo();

		// If (autoplay is enabled) OR (we're viewing a playlist AND we're not on the last video)
		if (
			goodTube_autoplay === 'true'
			||
			(goodTube_playlist && (goodTube_playlistIndex < (goodTube_playlist.length - 1)))
		) {
			// Play the next video
			goodTube_nav_next();
		}
	}

	// Show or hide the end screen (based on autoplay, not the setting)
	function goodTube_nav_showHideEndScreen() {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Show the end screen
		let hideEndScreen = false;

		// If autoplay is on, hide the end screen
		if (goodTube_autoplay === 'true') {
			hideEndScreen = true;
		}

		// Otherwise, if we're viewing a playlist
		else if (goodTube_playlist) {
			// Hide the end screen
			hideEndScreen = true;

			// If we're on the last video
			if (goodTube_playlistIndex === (goodTube_playlist.length - 1)) {
				// Show the end screen
				hideEndScreen = false;
			}
		}

		// Hide the end screen
		if (hideEndScreen) {
			goodTube_player.contentWindow.postMessage('goodTube_endScreen_hide', '*');
		}
		// Otherwise show the end screen
		else {
			goodTube_player.contentWindow.postMessage('goodTube_endScreen_show', '*');
		}
	}


	/* Usage stats
	------------------------------------------------------------------------------------------
	Don't worry everyone - these are just simple counters that let me know the following;
	 - Daily unique users
	 - Total unique users
	 - Daily videos played
	 - Total videos played

	This is only in here so I can have some fun and see how many people use this thing I made **no private info is tracked**
	*/

	// Count unique users
	function goodTube_stats_user() {
		/* Get today's date as yyyy-mm-dd (UTC time)
		-------------------------------------------------- */
		let date_local = new Date();
		let date_utc = Date.UTC(date_local.getUTCFullYear(), date_local.getUTCMonth(), date_local.getUTCDate(), date_local.getUTCHours(), date_local.getUTCMinutes(), date_local.getUTCSeconds());
		let date_utc_formatted = new Date(date_utc);
		let date_string = date_utc_formatted.toISOString().split('T')[0];


		/* Daily unique users
		-------------------------------------------------- */
		// If there's no cookie
		if (!goodTube_helper_getCookie('goodTube_uniqueUserStat_' + date_string)) {
			// Count
			fetch(
				'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x75\x73\x65\x72\x73\x5f\x64\x61\x69\x6c\x79\x2e\x70\x68\x70',
				{
					referrerPolicy: 'no-referrer'
				}
			);

			// Set a cookie (2 days exp time - to limit the cookies we create)
			goodTube_helper_setCookie('goodTube_uniqueUserStat_' + date_string, 'true', 2);
		}


		/* Total unique users
		-------------------------------------------------- */
		// If there's no cookie
		if (!goodTube_helper_getCookie('goodTube_uniqueUserStat')) {
			// Count
			fetch(
				'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x75\x73\x65\x72\x73\x5f\x74\x6f\x74\x61\x6c\x2e\x70\x68\x70',
				{
					referrerPolicy: 'no-referrer'
				}
			);

			// Set a cookie
			goodTube_helper_setCookie('goodTube_uniqueUserStat', 'true');
		}
	}

	// Count videos played
	function goodTube_stats_video() {
		/* Videos played (combined total and daily)
		-------------------------------------------------- */
		// Count
		fetch(
			'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x76\x69\x64\x65\x6f\x73\x2e\x70\x68\x70',
			{
				referrerPolicy: 'no-referrer'
			}
		);
	}


	/* Core functions
	------------------------------------------------------------------------------------------ */
	// Init
	let goodTube_initiated = false;
	let goodTube_init_timeout = setTimeout(() => {}, 0);
	function goodTube_init(retrying = false) {
		// If we're not retrying
		if (!retrying) {
			// Debug message
			if (window.top === window.self) {
				console.log('\n==================================================\n    ______                ________      __\n   / ____/___  ____  ____/ /_  __/_  __/ /_  ___\n  / / __/ __ \\/ __ \\/ __  / / / / / / / __ \\/ _ \\\n / /_/ / /_/ / /_/ / /_/ / / / / /_/ / /_/ /  __/\n \\____/\\____/\\____/\\____/ /_/  \\____/_____/\\___/\n\n==================================================');
				console.log('[GoodTube] Initiating...');
			}

			// Listen for messages from the iframes
			window.addEventListener('message', goodTube_receiveMessage);

			// Mute and pause all Youtube videos
			goodTube_youtube_pauseMuteVideos();

			// Init the rest once the DOM is ready
			document.addEventListener('DOMContentLoaded', goodTube_init_domReady);

			// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
			if (document.readyState === 'interactive' || document.readyState === 'complete') {
				goodTube_init_domReady();
			}
		}

		// And try this to check if the DOM is ready, seems to be the only reliable method in all browsers (which is insane, I know...thanks Safari)
		if (!document.body || !document.head) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_init_timeout);

			// Create a new timeout
			goodTube_init_timeout = setTimeout(() => { goodTube_init(true); }, 1);
		}
		// Otherwise, the DOM is ready
		else {
			goodTube_init_domReady();
		}
	}

	// Init when DOM is ready
	function goodTube_init_domReady() {
		// Sanity check - only do this once (this fixes known load issues in Firefox)
		if (goodTube_initiated) {
			return;
		}
		goodTube_initiated = true;

		// Check the tab focus state
		goodTube_checkTabFocus();

		// Add a CSS class to show or hide elements
		goodTube_helper_showHide_init();

		// Hide page elements
		goodTube_youtube_hidePageElements();

		// Init our player
		goodTube_player_init();

		// Init the "hide and mute ads" fallback
		goodTube_hideAndMuteAdsFallback_init();

		// Usage stats
		goodTube_stats_user();

		// Keyboard shortcuts
		goodTube_shortcuts_init();

		// Init the menu
		goodTube_menu();
	}

	// Listen for messages from the iframe
	let goodTube_receiveMessage_timeout = setTimeout(() => {}, 0);
	function goodTube_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Make sure the DOM is ready, if not retry (this ensures that the message will fire eventually)
		// Use this method to check if the DOM is ready, seems to be the only reliable method in all browsers (which is insane, I know...thanks Safari)
		if (!document.body || !document.head) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_receiveMessage_timeout);

			// Create a new timeout
			goodTube_receiveMessage_timeout = setTimeout(() => { goodTube_receiveMessage(event); }, 100);
		}

		// Proxy iframe has loaded
		else if (event.data === 'goodTube_proxyIframe_loaded') {
			goodTube_proxyIframeLoaded = true;
		}

		// Player iframe has loaded
		else if (event.data === 'goodTube_playerIframe_loaded') {
			goodTube_playerIframeLoaded = true;

			// Show the player iframe
			goodTube_player.style.display = 'block';
		}

		// Picture in picture
		if (event.data.indexOf('goodTube_pip_') !== -1) {
			let pipEnabled = event.data.replace('goodTube_pip_', '');

			if (pipEnabled === 'true') {
				goodTube_pip = true;
			}
			else {
				goodTube_pip = false;

				// If we're not viewing a video
				if (typeof goodTube_getParams['v'] === 'undefined') {
					// Clear the player
					goodTube_player_clear();
				}
			}
		}

		// Save the playback speed as a cookie
		else if (event.data.indexOf('goodTube_playbackSpeed_') !== -1) {
			goodTube_helper_setCookie('goodTube_playbackSpeed', event.data.replace('goodTube_playbackSpeed_', ''));
			goodTube_playbackSpeed = event.data.replace('goodTube_playbackSpeed_', '');
		}

		// Previous video
		else if (event.data === 'goodTube_prevVideo') {
			goodTube_nav_prev();
		}

		// Next video
		else if (event.data === 'goodTube_nextVideo') {
			goodTube_nav_next();
		}

		// Video has ended
		else if (event.data === 'goodTube_videoEnded') {
			goodTube_nav_videoEnded();
		}

		// Theater mode (toggle) - this should only work when not in fullscreen
		else if (event.data === 'goodTube_theater' && !document.fullscreenElement) {
			// Find the theater button
			let theaterButton = document.querySelector('.ytp-size-button');

			// If we found the theater button
			if (theaterButton) {
				// Click it
				goodTube_helper_click(theaterButton);
			}
		}

		// Autoplay
		else if (event.data === 'goodTube_autoplay_false') {
			goodTube_helper_setCookie('goodTube_autoplay', 'false');
			goodTube_autoplay = 'false';
		}
		else if (event.data === 'goodTube_autoplay_true') {
			goodTube_helper_setCookie('goodTube_autoplay', 'true');
			goodTube_autoplay = 'true';
		}

		// Sync main player (only if we're viewing a video page AND the "hide and mute ads" fallback is inactive)
		else if (event.data.indexOf('goodTube_syncMainPlayer_') !== -1 && goodTube_helper_watchingVideo() && !goodTube_fallback) {
			// Parse the data
			let syncTime = parseFloat(event.data.replace('goodTube_syncMainPlayer_', ''));

			// Target the youtube video element
			let youtubeVideoElement = document.querySelector('#movie_player video');

			// Re-fetch the page API
			goodTube_page_api = document.getElementById('movie_player');

			// Make sure the API is all good
			if (!goodTube_page_api || typeof goodTube_page_api.seekTo !== 'function' || typeof goodTube_page_api.playVideo !== 'function' || typeof goodTube_page_api.mute !== 'function' || typeof goodTube_page_api.setVolume !== 'function') {
				return;
			}

			// If we found the video element
			// AND we've not already synced to this point (this stops it continuing to sync when ended for no reason, we also need to round it down as it seems to be unreliable)
			// AND ads are not showing (we don't want to touch the the time when ads are playing, this triggers detection)
			if (youtubeVideoElement && Math.floor(youtubeVideoElement.currentTime) !== Math.floor(syncTime) && !goodTube_helper_adsShowing()) {
				// Set a variable to indicate we're syncing the player (this stops the automatic pausing of all videos)
				goodTube_syncingPlayer = true;

				// Play the video via the page API (this is the only reliable way)
				goodTube_page_api.playVideo();

				// Sync the current time using the page API - 500ms (this is the only reliable way)
				goodTube_page_api.seekTo((syncTime - .5));

				// Then mute the video via the page API (this helps to prevent audio flashes)
				goodTube_page_api.mute();
				goodTube_page_api.setVolume(0);

				// Then mute the video via HTML (playing it unmutes it for some reason)
				youtubeVideoElement.volume = 0;
				youtubeVideoElement.muted = true;

				// Clear timeout first to solve memory leak issues
				clearTimeout(goodTube_receiveMessage_timeout);

				// After 1000ms stop syncing (and let the pause actions handle the pausing)
				goodTube_receiveMessage_timeout = setTimeout(() => {
					goodTube_syncingPlayer = false;
				}, 1000);
			}
		}

		// Enable "hide and mute ads" fallback
		else if (event.data === 'goodTube_fallback_enable') {
			goodTube_fallback = true;

			// Add a class to the <body>
			if (document.body && !document.body.classList.contains('goodTube_fallback')) {
				document.body.classList.add('goodTube_fallback');
			}

			// Unset the aspect ratio
			goodTube_youtube_unsetAspectRatio();

			// Sync the autoplay
			goodTube_hideAndMuteAdsFallback_syncAutoplay();

			// Play the video (this solves some edge cases)
			goodTube_player_play();

			// If we're in fullscreen already
			if (document.fullscreenElement) {
				// Exit fullscreen
				document.exitFullscreen();

				// Fullscreen the normal Youtube player (wait 100ms, this delay is required because browsers animate fullscreen animations and we can't change this)
				window.setTimeout(() => {
					let fullscreenButton = document.querySelector('.ytp-fullscreen-button');
					if (fullscreenButton) {
						goodTube_helper_click(fullscreenButton);
					}
				}, 100);
			}
		}

		// Disable "hide and mute ads" fallback
		else if (event.data === 'goodTube_fallback_disable') {
			goodTube_fallback = false;

			// Remove the class from the <body>
			if (document.body && document.body.classList.contains('goodTube_fallback')) {
				document.body.classList.remove('goodTube_fallback');
			}

			// If we're in fullscreen already
			if (document.fullscreenElement) {
				// Exit fullscreen
				document.exitFullscreen();

				// Fullscreen the normal Youtube player (wait 100ms, this delay is required because browsers animate fullscreen animations and we can't change this)
				window.setTimeout(() => {
					goodTube_player.contentWindow.postMessage('goodTube_fullscreen', '*');
				}, 100);
			}
		}

		// Sync the aspect ratio
		else if (event.data.indexOf('goodTube_syncAspectRatio_') !== -1) {
			let aspectRatio = event.data.replace('goodTube_syncAspectRatio_', '').split('_');
			goodTube_youtube_setAspectRatio(aspectRatio[0], aspectRatio[1]);
		}
	}

	// Actions
	function goodTube_actions() {
		// Get the previous and current URL

		// Remove hashes, these mess with things sometimes
		// Also remove "index="
		let previousUrl = goodTube_previousUrl;
		if (previousUrl) {
			previousUrl = previousUrl.split('#')[0];
			previousUrl = previousUrl.split('index=')[0];
		}

		let currentUrl = window.location.href;
		if (currentUrl) {
			currentUrl = currentUrl.split('#')[0];
			currentUrl = currentUrl.split('index=')[0];
		}

		// If the URL has changed (this will always fire on first page load)
		if (previousUrl !== currentUrl) {
			// The URL has changed, so setup our player
			// ----------------------------------------------------------------------------------------------------
			// Setup GET parameters
			goodTube_getParams = goodTube_helper_setupGetParams();

			// If we're viewing a video
			if (goodTube_helper_watchingVideo()) {
				// Load the video
				goodTube_player_load();

				// Usage stats
				goodTube_stats_video();
			}
			// Otherwise if we're not viewing a video
			else {
				// Clear the player
				goodTube_player_clear();
			}

			// Set the previous URL (which pauses this function until the URL changes again)
			goodTube_previousUrl = window.location.href;
		}

		// If we're viewing a video
		if (goodTube_helper_watchingVideo()) {
			// Show or hide the end screen (based on autoplay, not the setting)
			goodTube_nav_showHideEndScreen();

			// Support timestamp links
			goodTube_youtube_timestampLinks();

			// If the "hide and mute ads" fallback is inactive
			if (!goodTube_fallback) {
				// Turn off autoplay
				goodTube_youtube_turnOffAutoplay();
			}

			// Remove the "are you still watching" popup
			goodTube_youtube_removeAreYouStillWatchingPopup();

			// Position and size the player
			goodTube_player_positionAndSize();

			// Check to enable or disable the "hide and mute ads" fallback overlay
			goodTube_hideAndMuteAdsFallback_check();
		}

		// Hide shorts (real time)
		goodTube_youtube_hideShortsRealTime();
	}

	// Init menu
	function goodTube_menu() {
		// Create the menu container
		let menuContainer = document.createElement('div');

		// Add the menu container to the page
		document.body.appendChild(menuContainer);

		// Configure the settings to show their actual values
		let shortsEnabled = ' checked';
		if (goodTube_shorts === 'true') {
			shortsEnabled = '';
		}

		let hideInfoCards = '';
		if (goodTube_hideInfoCards === 'true') {
			hideInfoCards = ' checked';
		}

		let hideEndScreen = '';
		if (goodTube_hideEndScreen === 'true') {
			hideEndScreen = ' checked';
		}

		let hideSuggestedVideos = '';
		if (goodTube_hideSuggestedVideos === 'true') {
			hideSuggestedVideos = ' checked';
		}

		let hideComments = '';
		if (goodTube_hideComments === 'true') {
			hideComments = ' checked';
		}

		let hideAiSummaries = '';
		if (goodTube_hideAiSummaries === 'true') {
			hideAiSummaries = ' checked';
		}

		let alwaysStart = '';
		if (goodTube_alwaysStart === 'true') {
			alwaysStart = ' checked';
		}

		let blackBackground = '';
		if (goodTube_blackBackground === 'true') {
			blackBackground = ' checked';
		}

		// Add content to the menu container
		goodTube_helper_innerHTML(menuContainer, `
			<!-- Menu Button
			==================================================================================================== -->
			<a href='javascript:;' class='goodTube_menuButton'>
				<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAZCAYAAABQDyyRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZBOUIxQTYzNDc0QjExRjA4OTZDRTk5QkFDRDUyNkFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZBOUIxQTY0NDc0QjExRjA4OTZDRTk5QkFDRDUyNkFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkE5QjFBNjE0NzRCMTFGMDg5NkNFOTlCQUNENTI2QUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkE5QjFBNjI0NzRCMTFGMDg5NkNFOTlCQUNENTI2QUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7jrX2zAAADr0lEQVR42qRWzW4TMRCe2W4QFyqkvkARyqFQCXU3W4S48gDwClXzxwM1TVJehRMcaLKukIBeSlW1EufCoRTlZ/B41+txNgktdRRls2OP5/vmm7GRiECOYb2Zv0D9Jaj1uwh3GKrZBhIeo17HswfyT9poU+1tGzbevIYgwDtvzkNvTgaJfppMxjRrD0SkhLzddArnHz7CLDP/O+JeBzGHkWhwSoNkoNYeGuRRnR43XsHDFxsA45EJm1cN6y0zsdbfRzvPeovSHt6ChTwBABPtPwgr4AXATun0TD/8MhM31tcB9FcpBVG3g2WHZXZU3CheyuAYbbVahYuLc4Dra0h2dkwsadSgWPUwtBE6p8QRzUWCiP9ASgVStwZgdfUBPN3cBPjyFaTABQO+o+Nvx3B1dWXy5yd0hVU8NwqLOm20PHqYwewdQhxHBUgLJrSLOb9n70+Balt6atVMYlolnZTrQLIxnZLnFGuhFxhTjckTzc4P+HmpS+Ly0rOHkl6mEJfk2hInU8HlKkVGQKUUANzXD4/g5PsEMD0xfmPVNxac3cSI6XkCNB7nnUkVG/LUuJn43gk87ajuoQhc2zWjBWPa12z14DxFM23GmOjFwyOIGttOW5zHorWh29y6UUeZ3QYTbxUg5pWuC6DbJ4cqe0y7A909tvSeoUPLiMhuTi4xNoD0qFB4mo4BGXVzG2Z9Q7OOngb8ruHKBOVCsymKShObSzbsM8r3YvOSCHsHZB2rdCRkRLKV5QiV+O8CdVFhQQzmQk7V2B1GcSWz856NXd2IDPUIg4FukQH37jZKQRIJBkgExVqQlDL1CI4pcvUQd9uiM3ZIHzeQJBWT9uws0KiTAzcJugdFUtnX4HBk/G5vux4Oh4Psd22tJMQ/v6eCQAQLEpq7aAFyIHEcao009khGKMXI6eAqgFqU9Qh0EimEaZENRzO1r+cOlFkb1yol8Zk1zQ4Fcxq+O8jJ14KXbVsVBMXpCQieQIt3pbJdVoZ6hVKjvI+3kU8zTCdFZ8QkKonZdlEzPg2L8sSX9yDa66DSSI2/qOJgLCpD1kMhRB0U4jNNoxVTC1mYONOmuYEjTY3v6PM7VK39zDwJjI+o6+d97lng17fXGECesmTpFpOzbASAgeslaOwsxpVyimluAARAi65VTqT2EFk2JOJS3mcPuKV3P12Oaa4HRhTpFNzkCpbmOWdAhnKh/IWX0gV3HODUeg3oBgPzD9wg3HCpVUdeg/6tr8cR9wgo1/288VeAAQAP+uu2vDbm2wAAAABJRU5ErkJggg%3D%3D'>
			</a> <!-- .goodTube_menuButton -->
			<a href='javascript:;' class='goodTube_menuClose'>&#10006;</a>


			<!-- Modal
			==================================================================================================== -->
			<div class='goodTube_modal'>
				<div class='goodTube_modal_overlay'></div>

				<div class='goodTube_modal_inner'>
					<a class='goodTube_modal_closeButton' href='javascript:;'>&#10006;</a>

					<div class='goodTube_title'>Settings</div>
					<div class='goodTube_content'>

						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_shorts' name='goodTube_option_shorts' id='goodTube_option_shorts'`+ shortsEnabled + `>
							<label for='goodTube_option_shorts'>Remove all shorts from Youtube</label>
						</div> <!-- .goodTube_setting -->

							<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideInfoCards' name='goodTube_option_hideInfoCards' id='goodTube_option_hideInfoCards'`+ hideInfoCards + `>
							<label for='goodTube_option_hideInfoCards'>Hide info cards from videos</label>
						</div> <!-- .goodTube_setting -->

						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideEndScreen' name='goodTube_option_hideEndScren' id='goodTube_option_hideEndScreen'`+ hideEndScreen + `>
							<label for='goodTube_option_hideEndScreen'>Hide end screen suggested videos</label>
						</div> <!-- .goodTube_setting -->

						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideSuggestedVideos' name='goodTube_option_hideSuggestedVideos' id='goodTube_option_hideSuggestedVideos'`+ hideSuggestedVideos + `>
							<label for='goodTube_option_hideSuggestedVideos'>Hide sidebar suggested videos</label>
						</div> <!-- .goodTube_setting -->

						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideComments' name='goodTube_option_hideComments' id='goodTube_option_hideComments'`+ hideComments + `>
							<label for='goodTube_option_hideComments'>Hide comments</label>
						</div> <!-- .goodTube_setting -->

						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideAiSummaries' name='goodTube_option_hideAiSummaries' id='goodTube_option_hideAiSummaries'`+ hideAiSummaries + `>
							<label for='goodTube_option_hideAiSummaries'>Hide AI summaries</label>
						</div> <!-- .goodTube_setting -->

						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_alwaysStart' name='goodTube_option_alwaysStart' id='goodTube_option_alwaysStart'`+ alwaysStart + `>
							<label for='goodTube_option_alwaysStart'>Always play videos from the start</label>
						</div> <!-- .goodTube_setting -->

							<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_blackBackground' name='goodTube_option_blackBackground' id='goodTube_option_blackBackground'`+ blackBackground + `>
							<label for='goodTube_option_blackBackground'>Use a black background for the video player</label>
						</div> <!-- .goodTube_setting -->

						<button class='goodTube_button' id='goodTube_button_saveSettings'>Save and refresh</button>
					</div> <!-- .goodTube_content -->


					<div class='goodTube_title'>Make a donation <span class='goodTube_heart'>&#9829;</span></div>
					<div class='goodTube_content'>
						<div class='goodTube_donation'>
							<div class="goodTube_text">
								<strong>This adblocker is 100% free to use and always will be.<br>
								It has helped over 170,000 people remove the unbearable ads from Youtube.</strong><br>
								<br>
								This project has been made entirely by myself, as just one developer. Countless hours and late nights have gone into making this and I continue to work on updating and maintaining the project regularly. I remain dedicated to ensuring this solution continues to work for everyone (despite Youtube's best efforts to stop adblockers).<br>
								<br>
								Donations help to keep this project going and support the wider community who use it. If you would like to say thank you and can give something back, it would be greatly appreciated.<br>
								<br>
								<i>Update -<br>Seriously everyone, I am flat broke - so small donations help a lot. If everyone donated just $1 I could finally go travelling with my partner rather than just living week to week.</i> 🙏🏼
							</div>
							<a href='https://tiptopjar.com/goodtube' target='_blank' rel='nofollow' class='goodTube_button'>Donate now</a>
						</div> <!-- .goodTube_donation -->
					</div> <!-- .goodTube_content -->


					<div class='goodTube_title'>FAQs</div>
					<div class='goodTube_content'>
						<div class='goodTube_text'>
							<strong>How can I share this with friends?</strong><br>
							You can send them <a href='https://github.com/goodtube4u/goodtube' target='_blank'>this link</a>. It has all of the install instructions.<br>
							<br>
							<strong>Do I need to manually update this?</strong><br>
							Nope, updates are pushed to you automatically so you don't have to do anything to use the latest version.<br>
							<br>
							<strong>Playlists skip to the next video every few seconds</strong><br>
							This is usually caused by another adblocker which Youtube is detecting. To fix this problem, first disable all of your other adblockers (for Youtube only, you can leave them on for other websites). Then clear your cookies and cache (this is important). Once that's done, refresh Youtube and the problem should be fixed.<br>
							<br>
							<strong>I can't use the miniplayer</strong><br>
							The Youtube miniplayer is not supported. Instead this uses "Picture in Picture" mode, which is the new standard for the web. Unfortunately Firefox does not support the Picture in Picture API, so the button is disabled in Firefox until they decide to include this feature.<br>
							<br>
							<strong>Is this compatible with other Youtube extensions?</strong><br>
							Short answer - probably not. This heavily modifies how Youtube works in order to block ads. A key part of this is replacing the default Youtube player with their "embedded" player. This means that unless your extension also works for embedded Youtube videos (like where you view a Youtube video on another website), it generally won't be compatible. Unfortunately there's not much I can do to support these extensions as a result. Honestly though - you probably never needed them anyway, just play the video and be happy.<br>
							<br>
							<strong>I'm having a different problem</strong><br>
							If you're having a different issue, most of the time you will find it's caused by a conflicting extension you have installed. The first thing to do is turn off all other extensions you have installed. Leave only Tampermonkey and GoodTube enabled. Then refresh Youtube, check if the problem is fixed. If it is, then you know one of them is causing the issue. Turn your other extensions back on back on one at a time until you find the problem.
						</div>
					</div> <!-- .goodTube_content -->


					<div class='goodTube_title'>Report an issue</div>
					<div class='goodTube_content'>
						<div class='goodTube_text goodTube_successText'>Your message has been sent successfully.</div>
						<form class='goodTube_report' onSubmit='javascript:;'>
							<div class='goodTube_text'>
								I am dedicated to helping every single person get this working. Everyone is important and if you have any problems at all, please let me know. I will respond and do my best to help!<br>
								<br>
								<i>* Please read the FAQs above before reporting an issue.</i>
							</div>
							<input class='goodTube_reportEmail' type='email' placeholder='Email address' required>
							<textarea class='goodTube_reportText' placeholder='Enter your message here...\r\rPlease note - most reported issues are caused by a conflicting extension. Please first try turning off all of your other extensions. Refresh Youtube, check if the problem is fixed. If it is, then you know something is conflicting. Turn your other extensions back on one at a time until you find the cause. Please try this first before reporting an issue!' required></textarea>
							<input type='submit' class='goodTube_button' id='goodTube_button_submitReport' value='Submit'>
						</form> <!-- .goodTube_report -->
					</div> <!-- .goodTube_content -->


				</div> <!-- .goodTube_modal_inner -->
			</div> <!-- .goodTube_modal -->
		`);

		// Style the menu
		let style = document.createElement('style');
		style.textContent = `
			/* Menu button
			---------------------------------------------------------------------------------------------------- */
			.goodTube_menuButton {
				display: block;
				position: fixed;
				bottom: 16px;
				right: 16px;
				background: #0f0f0f;
				border-radius: 9999px;
				box-shadow: 0 0 10px rgba(0, 0, 0, .5);
				width: 48px;
				height: 48px;
				z-index: 999;
				transition: background .2s linear, opacity .2s linear, box-shadow .2s linear;
				opacity: 1;
				cursor: pointer;
			}

			.goodTube_menuButton img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				pointer-events: none;
				width: 26px;
			}

			.goodTube_menuButton::before {
				content: 'Settings';
				background: rgba(0, 0, 0, .9);
				border-radius: 4px;
				color: #ffffff;
				font-size: 10px;
				font-weight: 700;
				text-transform: uppercase;
				padding-top: 4px;
				padding-bottom: 4px;
				padding-left: 8px;
				padding-right: 8px;
				position: absolute;
				left: 50%;
				top: -26px;
				transform: translateX(-50%);
				letter-spacing: 0.04em;
				opacity: 0;
				transition: opacity .2s ease-in-out, top .2s ease-in-out;
				pointer-events: none;
				text-decoration: none;
			}

			.goodTube_menuButton::after {
				content: '';
				position: absolute;
				top: -6px;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid rgba(0, 0, 0, .9);
				opacity: 0;
				transition: opacity .2s ease-in-out, top .2s ease-in-out;
				pointer-events: none;
				text-decoration: none;
			}

			.goodTube_menuButton:hover {
				background: #252525;
				box-shadow: 0 0 12px rgba(0, 0, 0, .5);
			}

			.goodTube_menuButton:hover::before,
			.goodTube_menuButton:hover::after {
				opacity: 1;
			}

			.goodTube_menuButton:hover::before {
				top: -29px;
			}

			.goodTube_menuButton:hover::after {
				top: -9px;
			}

			.goodTube_menuClose {
				display: block;
				position: fixed;
				bottom: 51px;
				right: 16px;
				width: 14px;
				height: 14px;
				background: #ffffff;
				color: #000000;
				font-size: 9px;
				font-weight: 700;
				border-radius: 999px;
				text-align: center;
				line-height: 13px;
				z-index: 9999;
				box-shadow: 0 0 4px rgba(0, 0, 0, .5);
				opacity: 1;
				text-decoration: none;
				cursor: pointer;
			}


			/* Modal container
			---------------------------------------------------------------------------------------------------- */
			.goodTube_modal {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 9999;
				opacity: 0;
				transition: opacity .2s linear;
				pointer-events: none;
				backface-visibility: hidden;
				min-width: 320px;
			}
			.goodTube_modal:not(.visible) .goodTube_button {
				pointer-events: none;
			}

			.goodTube_modal.visible {
				pointer-events: all;
				opacity: 1;
			}
			.goodTube_modal.visible .goodTube_button {
				pointer-events: all;
			}

			.goodTube_modal * {
				box-sizing: border-box;
				padding: 0;
				margin: 0;
			}

			.goodTube_modal .goodTube_modal_overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
				background: rgba(0,0,0,.8);
			}

			.goodTube_modal .goodTube_modal_inner {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(round(-50%, 1px), round(-50%, 1px));
				width: 780px;
				max-width: calc(100% - 32px);
				max-height: calc(100% - 32px);
				z-index: 2;
				background: #ffffff;
				border-radius: 12px;
				box-shadow: 0 0 24px rgba(0, 0, 0, .5);
				font-family: Roboto, Arial, sans-serif;
				padding: 24px;
				overflow: auto;
			}

			.goodTube_modal .goodTube_modal_inner .goodTube_modal_closeButton {
				position: absolute;
				top: 17px;
				right: 12px;
				color: #333;
				font-size: 20px;
				font-weight: 400;
				text-decoration: none;
				width: 40px;
				height: 40px;
				background: #ffffff;
				border-radius: 9999px;
				text-align: center;
				line-height: 40px;
				transition: background .2s linear;
				cursor: pointer;
			}

			.goodTube_modal .goodTube_modal_inner .goodTube_modal_closeButton:hover {
				background: #dddddd;
			}


			/* Modal inner
			---------------------------------------------------------------------------------------------------- */
			.goodTube_modal .goodTube_title {
				font-weight: 700;
				font-size: 22px;
				padding-bottom: 16px;
			}

			.goodTube_modal .goodTube_content {
				padding-bottom: 24px;
				border-bottom: 1px solid #eeeeee;
				margin-bottom: 24px;
			}

			.goodTube_modal .goodTube_content:last-child {
				border-bottom: 0;
				margin-bottom: 0;
				padding-bottom: 0;
			}

			.goodTube_modal .goodTube_content .goodTube_setting {
				display: flex;
				gap: 12px;
				align-items: center;
				margin-bottom: 16px;
			}

			.goodTube_modal .goodTube_content .goodTube_setting input {
				width: 24px;
				height: 24x;
				min-width: 24px;
				min-height: 24px;
				border-radius: 4px;
				border: 1px solid #333;
				overflow: hidden;
				cursor: pointer;
			}

			.goodTube_modal .goodTube_content .goodTube_setting label {
				font-size: 15px;
				color: #000000;
				font-weight: 500;
				cursor: pointer;
			}

			.goodTube_modal .goodTube_button {
				all: initial;
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				display: inline-block;
				background: #e84a82;
				color: #ffffff;
				text-align: center;
				font-size: 15px;
				font-weight: 700;
				padding-top: 12px;
				padding-bottom: 12px;
				padding-left: 18px;
				padding-right: 18px;
				letter-spacing: 0.024em;
				border-radius: 4px;
				font-family: Roboto, Arial, sans-serif;
				cursor: pointer;
				transition: background .2s linear;
			}

			.goodTube_modal .goodTube_button:hover {
				background: #fa5b93;
			}

			.goodTube_modal .goodTube_heart {
				color: #e01b6a;
				font-size: 24px;
			}

			.goodTube_modal .goodTube_text {
				display: block;
				font-size: 15px;
				padding-bottom: 16px;
				line-height: 130%;
			}

			.goodTube_modal .goodTube_text:last-child {
				padding-bottom: 0;
			}

			.goodTube_modal .goodTube_text a {
				color: #e84a82;
				text-decoration: underline;
			}

			.goodTube_modal .goodTube_report {
			}

			.goodTube_modal .goodTube_successText {
				font-size: 15px;
				padding-bottom: 16px;
				line-height: 130%;
				display: none;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button),
			.goodTube_modal .goodTube_report textarea {
				border-radius: 4px;
				border: 1px solid #999;
				width: 100%;
				font-size: 14px;
				color: #000000;
				padding-top: 12px;
				padding-bottom: 12px;
				padding-left: 16px;
				padding-right: 16px;
				font-family: Roboto, Arial, sans-serif;
				transition: border .2s linear;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button)::placeholder,
			.goodTube_modal .goodTube_report textarea::placeholder {
				color: #666666;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button):focus,
			.goodTube_modal .goodTube_report textarea:focus {
				border: 1px solid #333;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button) {
				margin-bottom: 12px;
			}

			.goodTube_modal .goodTube_report textarea {
				margin-bottom: 16px;
				height: 128px;
			}
		`;
		document.head.appendChild(style);


		/* Menu button
		-------------------------------------------------- */
		// Target the elements
		let menuButton = document.querySelector('.goodTube_menuButton');
		let menuClose = document.querySelector('.goodTube_menuClose');

		// Support the close button
		if (menuClose) {
			menuClose.addEventListener('click', () => {
				menuButton.remove();
				menuClose.remove();
			});
		}


		/* Modal
		-------------------------------------------------- */
		// Target the elements
		let modal = document.querySelector('.goodTube_modal');
		let modalOverlay = document.querySelector('.goodTube_modal .goodTube_modal_overlay');
		let modalCloseButton = document.querySelector('.goodTube_modal .goodTube_modal_closeButton');

		// Open the modal
		if (menuButton) {
			menuButton.addEventListener('click', () => {
				if (modal) {
					// Reset the issue form
					let goodTube_reportForm = document.querySelector('.goodTube_report');
					if (goodTube_reportForm) {
						goodTube_reportForm.style.display = 'block';
					}

					let goodTube_reportSuccessText = document.querySelector('.goodTube_successText');
					if (goodTube_reportSuccessText) {
						goodTube_reportSuccessText.style.display = 'none';
					}

					let goodTube_reportEmail = document.querySelector('.goodTube_reportEmail');
					if (goodTube_reportEmail) {
						goodTube_reportEmail.value = '';
					}

					let goodTube_reportText = document.querySelector('.goodTube_reportText');
					if (goodTube_reportText) {
						goodTube_reportText.value = '';
					}

					// Show the modal
					modal.classList.add('visible');
				}
			});
		}

		// Close the modal
		if (modalOverlay) {
			modalOverlay.addEventListener('click', () => {
				if (modal && modal.classList.contains('visible')) {
					modal.classList.remove('visible');
				}
			});
		}

		if (modalCloseButton) {
			modalCloseButton.addEventListener('click', () => {
				if (modal && modal.classList.contains('visible')) {
					modal.classList.remove('visible');
				}
			});
		}

		document.addEventListener('keydown', (event) => {
			if (event.key.toLowerCase() === 'escape') {
				if (modal && modal.classList.contains('visible')) {
					modal.classList.remove('visible');
				}
			}
		});


		/* Settings
		-------------------------------------------------- */
		let goodTube_button_saveSettings = document.getElementById('goodTube_button_saveSettings');

		if (goodTube_button_saveSettings) {
			goodTube_button_saveSettings.addEventListener('click', () => {
				// Shorts
				let goodTube_setting_shorts = document.querySelector('.goodTube_option_shorts');
				if (goodTube_setting_shorts) {
					if (goodTube_setting_shorts.checked) {
						goodTube_helper_setCookie('goodTube_shorts', 'false');
					}
					else {
						goodTube_helper_setCookie('goodTube_shorts', 'true');
					}
				}

				// Hide info cards
				let goodTube_setting_hideInfoCards = document.querySelector('.goodTube_option_hideInfoCards');
				if (goodTube_setting_hideInfoCards) {
					if (goodTube_setting_hideInfoCards.checked) {
						goodTube_helper_setCookie('goodTube_hideInfoCards', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideInfoCards', 'false');
					}
				}

				// Hide end screen
				let goodTube_setting_hideEndScreen = document.querySelector('.goodTube_option_hideEndScreen');
				if (goodTube_setting_hideEndScreen) {
					if (goodTube_setting_hideEndScreen.checked) {
						goodTube_helper_setCookie('goodTube_hideEndScreen', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideEndScreen', 'false');
					}
				}

				// Hide suggested videos
				let goodTube_setting_hideSuggestedVideos = document.querySelector('.goodTube_option_hideSuggestedVideos');
				if (goodTube_setting_hideSuggestedVideos) {
					if (goodTube_setting_hideSuggestedVideos.checked) {
						goodTube_helper_setCookie('goodTube_hideSuggestedVideos', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideSuggestedVideos', 'false');
					}
				}

				// Hide comments
				let goodTube_setting_hideComments = document.querySelector('.goodTube_option_hideComments');
				if (goodTube_setting_hideComments) {
					if (goodTube_setting_hideComments.checked) {
						goodTube_helper_setCookie('goodTube_hideComments', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideComments', 'false');
					}
				}

				// Hide AI summaries
				let goodTube_setting_hideAiSummaries = document.querySelector('.goodTube_option_hideAiSummaries');
				if (goodTube_setting_hideAiSummaries) {
					if (goodTube_setting_hideAiSummaries.checked) {
						goodTube_helper_setCookie('goodTube_hideAiSummaries', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideAiSummaries', 'false');
					}
				}

				// Always play videos from the start
				let goodTube_setting_alwaysStart = document.querySelector('.goodTube_option_alwaysStart');
				if (goodTube_setting_alwaysStart) {
					if (goodTube_setting_alwaysStart.checked) {
						goodTube_helper_setCookie('goodTube_alwaysStart', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_alwaysStart', 'false');
					}
				}

				// Use a black background for the video player
				let goodTube_setting_blackBackground = document.querySelector('.goodTube_option_blackBackground');
				if (goodTube_setting_blackBackground) {
					if (goodTube_setting_blackBackground.checked) {
						goodTube_helper_setCookie('goodTube_blackBackground', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_blackBackground', 'false');
					}
				}

				// Refresh the page
				window.location.href = window.location.href;
			});
		}


		/* Report an issue
		-------------------------------------------------- */
		let goodTube_reportForm = document.querySelector('.goodTube_report');
		let goodTube_reportSuccessText = document.querySelector('.goodTube_successText');

		if (goodTube_reportForm && goodTube_reportSuccessText) {
			goodTube_reportForm.addEventListener('submit', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();

				const params = {
					email: document.querySelector('.goodTube_reportEmail')?.value,
					message: document.querySelector('.goodTube_reportText')?.value
				};

				const options = {
					method: 'POST',
					body: JSON.stringify(params),
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					referrerPolicy: 'no-referrer'
				};

				fetch('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x6d\x61\x69\x6c\x2e\x70\x68\x70', options)
					.then(response => response.text())
					.then(response => {
						goodTube_reportForm.style.display = 'none';
						goodTube_reportSuccessText.style.display = 'block';
					});
			});
		}
	}

	// Check the tab focus state
	function goodTube_checkTabFocus() {
		window.addEventListener('focus', () => { goodTube_tabInFocus = true; });
		window.addEventListener('blur', () => { goodTube_tabInFocus = false; });
	}


	/* Hide and mute ads fallback
	------------------------------------------------------------------------------------------ */
	// Init
	function goodTube_hideAndMuteAdsFallback_init() {
		// Style the overlay
		let style = document.createElement('style');

		let cssOutput = `
			.ytp-skip-ad-button {
				bottom: 48px !important;
				right: 32px !important;
				background: rgba(255, 255, 255, .175) !important;
				opacity: 1 !important;
				transition: background .1s linear !important;
			}

			.ytp-skip-ad-button:hover,
			.ytp-skip-ad-button:focus {
				background: rgba(255, 255, 255, .225) !important;
			}

			.ytp-ad-player-overlay-layout__player-card-container {
				display: none !important;
			}

			.ytp-ad-player-overlay-layout__ad-info-container {
				display: none !important;
			}

			.ytp-chrome-top {
				display: none !important;
			}

			#goodTube_hideMuteAdsOverlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: #000000;
				z-index: 851;
				padding: 48px;
				display: flex;
				align-items: center;
				justify-content: center;

				.goodTube_overlay_inner {
					display: flex;
					align-items: flex-start;
					gap: 24px;
					max-width: 560px;

					img {
						width: 64px;
						height: 50px;
						min-width: 64px;
						min-height: 50px;
					}

					.goodTube_overlay_textContainer {
						font-family: Roboto, Arial, sans-serif;
						margin-top: -9px;

						.goodTube_overlay_textContainer_title {
							font-size: 24px;
							font-weight: 700;
						}

						.goodTube_overlay_textContainer_text {
							font-size: 17px;
							font-style: italic;
							padding-top: 8px;
						}
					}
				}
			}
		`;

		// Enable the picture in picture button (unless you're on firefox)
		if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
			cssOutput += `
				.ytp-pip-button {
					display: inline-block !important;
				}
			`;
		}

		// Hide info cards
		if (goodTube_hideInfoCards === 'true') {
			cssOutput += `
				.ytp-ce-covering-overlay,
				.ytp-ce-element {
					display: none !important;
				}
			`;
		}

		// Hide end screen videos
		if (goodTube_hideEndScreen === 'true') {
			cssOutput += `
				.ytp-videowall-still {
					display: none !important;
				}
			`;
		}

		// Add the CSS to the page
		style.textContent = cssOutput;
		document.head.appendChild(style);

		// Disable some shortcuts while the overlay is enabled
		function disableShortcuts(event) {
			// Make sure we're watching a video and the overlay state is disabled
			if (!goodTube_helper_watchingVideo() || goodTube_hideAndMuteAds_state !== 'enabled') {
				return;
			}

			// Don't do anything if we're holding control OR alt OR the command key on mac
			if (event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}

			// Get the key pressed in lower case
			let keyPressed = event.key.toLowerCase();

			// If we're not focused on a HTML form element
			let focusedElement = event.srcElement;
			let focusedElement_tag = false;
			let focusedElement_id = false;
			if (focusedElement) {
				if (typeof focusedElement.nodeName !== 'undefined') {
					focusedElement_tag = focusedElement.nodeName.toLowerCase();
				}

				if (typeof focusedElement.getAttribute !== 'undefined') {
					focusedElement_id = focusedElement.getAttribute('id');
				}
			}

			if (
				!focusedElement ||
				(
					focusedElement_tag.indexOf('input') === -1 &&
					focusedElement_tag.indexOf('label') === -1 &&
					focusedElement_tag.indexOf('select') === -1 &&
					focusedElement_tag.indexOf('textarea') === -1 &&
					focusedElement_tag.indexOf('fieldset') === -1 &&
					focusedElement_tag.indexOf('legend') === -1 &&
					focusedElement_tag.indexOf('datalist') === -1 &&
					focusedElement_tag.indexOf('output') === -1 &&
					focusedElement_tag.indexOf('option') === -1 &&
					focusedElement_tag.indexOf('optgroup') === -1 &&
					focusedElement_id !== 'contenteditable-root'
				)
			) {
				if (keyPressed === ' ' || keyPressed === 'k' || keyPressed === 'm' || keyPressed === 'i') {
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			}
		}
		document.addEventListener('keydown', disableShortcuts, true);
		document.addEventListener('keypress', disableShortcuts, true);
		document.addEventListener('keyup', disableShortcuts, true);

		// Init the autoplay actions to sync the embedded player and cookie with the normal button
		goodTube_hideAndMuteAdsFallback_autoPlay_init();
	}

	// Check to enable or disable the overlay
	function goodTube_hideAndMuteAdsFallback_check() {
		// If the "hide and mute ads" fallback is active AND we're viewing a video
		if (goodTube_fallback && goodTube_helper_watchingVideo()) {
			// If ads are showing
			if (goodTube_helper_adsShowing()) {
				// Enable the "hide and mute ads" overlay
				goodTube_hideAndMuteAdsFallback_enable();
			}
			// Otherwise, ads are not showing
			else {
				// Disable the "hide and mute ads" overlay
				goodTube_hideAndMuteAdsFallback_disable();
			}
		}
		// Otherwise reset the "hide and mute ads" state
		else {
			goodTube_hideAndMuteAds_state = '';
		}
	}

	// Enable the the overlay
	let goodTube_hideAndMuteAds_state = '';
	function goodTube_hideAndMuteAdsFallback_enable() {
		// Only do this once (but trigger again if the overlay is gone)
		let existingOverlay = document.getElementById('goodTube_hideMuteAdsOverlay');
		if (goodTube_hideAndMuteAds_state === 'enabled' && existingOverlay) {
			return;
		}

		// Get the Youtube video element
		let videoElement = document.querySelector('#movie_player video');

		// If we found the video element
		if (videoElement) {
			// Speed up to 2x (any faster is detected by Youtube)
			videoElement.playbackRate = 2;

			// Mute it
			videoElement.muted = true;
			videoElement.volume = 0;

			// Hide the <video> element
			goodTube_helper_hideElement(videoElement);
		}

		// Hide the bottom area (buttons)
		let bottomArea = document.querySelector('.ytp-chrome-bottom');
		if (bottomArea) {
			goodTube_helper_hideElement(bottomArea);
		}

		// Disable click actions
		let playerArea = document.getElementById('movie_player');
		if (playerArea) {
			playerArea.style.pointerEvents = 'none';
		}

		// Hide draggable captions
		let draggableCaptions = document.querySelector('.ytp-caption-window-container');
		if (playerArea) {
			goodTube_helper_hideElement(draggableCaptions);
		}

		// Remove there's no existing overlays
		if (!existingOverlay) {
			// Create a new overlay
			let overlayElement = document.createElement('div');
			overlayElement.setAttribute('id', 'goodTube_hideMuteAdsOverlay');

			// Populate the overlay
			goodTube_helper_innerHTML(overlayElement, `
				<div class='goodTube_overlay_inner'>
					<img src='data:image/gif;base64,R0lGODlhQAAyANU4AM1ml//MzcxlaP/LzM1maMxlZ//MzM1laMtkZspjlstkZ//Exe94ie10h8swZMwuYv+oqv+Vl/iQmdRtb8xldcphY81nl81paMpiZP/DxdZ5e80vY81pmtZ4es0wY/CImdZvcswuYf/Oz81mmfS1ts0xZM1mj8swY8xml++XqPGKjf/Q0ctklslilu51iMwxZcxmls1mlswxZP+Ym/+Zm8xlls0yZf+Ymv///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwRkZBNzNFQkI3RjExRjA4OTVBRDJBREJCNDlGMkY5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwRkZBNzNGQkI3RjExRjA4OTVBRDJBREJCNDlGMkY5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBGRkE3M0NCQjdGMTFGMDg5NUFEMkFEQkI0OUYyRjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBGRkE3M0RCQjdGMTFGMDg5NUFEMkFEQkI0OUYyRjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJEQA4ACwAAAAAQAAyAAAG/0CccEgsGo/I5BCBUCiYTKV0SlUynVBEVYjBFAqCsGBLHhIIJJJIFK52v+JxmXxOr9vJ8OEQCHzPc3NfGhp9Z4BHenx+BYiBW4OFAYcESGEVFX1xj0I2njYyMkROTmcdHQYGKyspKaFGl5kBm5yfoKJDpAqmqKqsrrhCLy8LCxkZxRMTKip4RLaeSKGer0VnN9g3MzPYLi7RQ8PFx8nLzXLP0NIy1MFmBNna3Dfe4EKh2/E0NNiO4S/TbKyzZeTMvn3xGjQYRgTfPGwIb/gTBpCdwCMB7b07yC+bQoZDPMXDFuYLEpNb9lgSAAJEwgYaRY4sWeBkzZQHVrZ8GdMGg/+fDD58oEDBhAmQRPaEOnHCgVMHtkKFchbSRo0aAADAgNHOiCegQYcWPfrCiFIZTJ9C/SRVBtVOVrFq5XprYNytWTUK+TKs7wtobGWoLBLqatYYMQLavYoXgF4cfP3+BXxrcEMZhgEgVizFU9arV4e19RRx27aI8YZFxQyaA4fHSjwDAF1DtFTSHU3PQJ1NdWDarmF3vnUVN0QaA5IPSNWnj/IBfThu84TY76N2xW1E3PecefPn0Q9Ot1G9bxV9HbGVKHE13rbuBvp4T57qdMetw9DHQ6I/2/r22bynnHfzLWeAfdjg90J/2PA3Uj43eLIVR9g0FwB98VnY3HY0lIf/DYT7HTGSPNhICAOFN1iIoYYbdrSPhySOZMQ+9iG21VahIEajbqa599ANKGKzmQw3wqAjDfYRseOLMRSZYww78vgjiEAeFM+QRR6ZJA4fzpBAAlcZEcpWxx0nYHLODeDjcdkZcdWXVG7zZZiEEQlDmVWeCd2FagY4zz5tFvFmAlTSSQSEw1wlwaISjAjBoxBEIGkEPrbQwpeIybSNmzXEY+gQiL6gKKOOQjoppX5aimkMms7AaYIwGIHeVU8iRttVHEW01VW2ykUdlOndYESRsmYDaA21xnBrDbneBwOvyvpKHrAhEkFsEbxtJZuNN2bVZY3R7lpDpnGhN+yNMwar9q0NhzXZLQDf7tZhuM+Oy2q5xtJwLhE+IoaYEBdc8MADIYQwMG2fLWtvRjbg4W8MVDrY5cMAC0ywwQ8gPJvCQ9risL8Ri5jNp9iMMAIKKFhggRAbbOCBB7aN9okQWdUMr7BDANigyNiQfIPJKKvMssswVyQzODZ7i7MQOi9dhH0+2/wvDp74Jtlk1YiL2M5MM4ukq0dAXQO/N0gdA1xWS9YVDlrHwDUOuH4t8Q2fHsvJEVs73fTcddPw6d1C5E3E3mX0XMO1c2RV5KaAk80YuoEofiPjjQsBq82P9MoCC283fnnNmUe7eeeV+/jIiJXzLM/pMm4RBAAh+QQFFAA4ACwAAAAAQAAyAAAG/0CccChEGBEKhZHIbDqf0KjziFQipNisligQiEQkEoGwLQ+73UIBg9F2v+Gx2YwWqNnY8TgQ0GjUc3NjanwHB11PegR8foCBZYMFhYcCTTIyKSkrKwYGHR1jSUlElzamNo9CdXwVFYhMl5mbnZ+hoqQyp6ipqwGtr0SmLi43NzMzxcVysLk2l0+6pk1dKioTEwsLGRnZLy/BNsPFx8k3y7imz07Ru1wC1dfZ293fQ94NDeU0+zTnQ7rqmqST4a3JmGL7yh0LiONevmT8+pFhAlAGNGcE6xE5eCNhsoUW/9nAVw4ECGBMDJVx1ERNl3LFpIkkmcwkSiIqt7Bk4lIAzP8bMtHZgAEDAIAaNYKeEXCp1CkHUB2cOHEpJxFvJkxQoPDhA4OvDJQKcUrUKFKxOLo0bWYqqlSqMqzae5F1a1ewYduJvBQjhtkaDIUYcsrOm+EXO4WYMkr0LMaLfP0eBRwS5wHC0Q57S4xjMYDGSR9LMcWBA1KkmL393HeMXEcaAy95O13DKNoopE2fTv1iNY3WyF7Hzkjbtl4th/uaOhaRz4DnA/jw6QR9gMd9plA3e5Q8xvIZzQNUlx6AOvTrsG1ov+1EH41y3ogi/D3D/HQD96u7Loa0RAn35TwBYDLxwTDfMfaVh5+C+gXHXw3+DViMgDC55k1f6JFHXoJ8zLf/D1GmjONgMhQqFNyFMWSoYX7RSechDSDaIOJPTbAGHg19EUVUZO55NONHwLW2T1+X6AgDhvTtQ4SNQ8ZgJI8Q8WOiiUHeSKQMRiLJHA1CiJhAAkgJpF4NHu13w3POQbflfMXsWNkQSH1p5jFfhknRmGWOiKZ4at7I5g1uNhFnAmbaSYRrpvT1ZQstmBnBoxFAICkEP0lgqQRIqWbMDILWUI6hQyBqg6IJMOoopJNSCtOlmNag6TGdtglDE+4pZ8NffSEl32sR0YZUX1ci5eMNTRhJa5S24hqDrgbyyo+vNQAbwyXCvkciE8YyMaxjudYAmpatFcOYjn0Zt+t8xepY96O1Dya6rLcw/Joifa6NS1S5AJhy7mvpEmGitKoIUFG30P6F1AMPhBACwhdcIIS0Zpa4KcBpCXxKZNAiZXANCCvMsMM4QDyixKCKa9TJil28VkYeeLDBBkJYYAEKKIwwwoRwenrtsQ/6e8PJKHem8lretPxyzDPXfDOxOQfoxJYl39AtUWM1o9kLpngjE75G4SxEtbA+fWPUU8+Kg1NXZ431LlwD4DUOYHPaXjJkx5CKE9USgZTTPN9Q992dKtn0zlscY6RRjxi5N9OAhzrD4QAkruPijfvMAgvyPgL0rpUPUczlmQeyebOd+8y3GRGXbjrhZaSuRRAAOw%3D%3D'>
					<div class='goodTube_overlay_textContainer'>
						<div class='goodTube_overlay_textContainer_title'>Sorry, we can't remove the ads from this video but we can hide and mute them!</div>
						<div class='goodTube_overlay_textContainer_text'>Hang tight. Click the skip button if it appears to speed things up.</div>
					</div>
				</div>
			`);

			// Add it to the page
			let injectElement = document.querySelector('.ytp-ad-player-overlay-layout');
			if (injectElement) {
				injectElement.prepend(overlayElement);
			}
		}

		// Play the video (this solves an edge case)
		goodTube_hideAndMuteAdsFallback_play(true);

		// Make sure we only do this once
		goodTube_hideAndMuteAds_state = 'enabled';
	}

	// Disable the overlay
	function goodTube_hideAndMuteAdsFallback_disable() {
		// Only do this once
		if (goodTube_hideAndMuteAds_state === 'disabled') {
			return;
		}

		// Get the Youtube video element
		let videoElement = document.querySelector('#movie_player video');

		// If we found the video element
		if (videoElement) {
			// Restore the playback speed
			videoElement.playbackRate = goodTube_playbackSpeed;

			// Get the page API
			goodTube_page_api = document.getElementById('movie_player');

			// Make sure we have access to the functions we need
			if (goodTube_page_api && typeof goodTube_page_api.unMute === 'function' && typeof goodTube_page_api.setVolume === 'function' && typeof goodTube_page_api.getVolume === 'function') {
				// Restore the volume (only if muted, otherwise leave it alone)
				if (videoElement.volume <= 0 || videoElement.muted || goodTube_page_api.getVolume() === 0) {
					videoElement.muted = false;
					videoElement.volume = 1;

					// Unmute and set the volume via the API (this is required, doing it via the <video> element alone won't work)
					goodTube_page_api.unMute();
					goodTube_page_api.setVolume(100);
				}
			}

			// Show the <video> element
			goodTube_helper_showElement(videoElement);
		}

		// Show the bottom area (buttons)
		let bottomArea = document.querySelector('.ytp-chrome-bottom');
		if (bottomArea) {
			goodTube_helper_showElement(bottomArea);
		}

		// Enable click actions
		let playerArea = document.getElementById('movie_player');
		if (playerArea) {
			playerArea.style.pointerEvents = 'auto';
		}

		// Show draggable captions
		let draggableCaptions = document.querySelector('.ytp-caption-window-container');
		if (playerArea) {
			goodTube_helper_showElement(draggableCaptions);
		}

		// Remove any existing overlays
		let existingOverlay = document.getElementById('goodTube_hideMuteAdsOverlay');
		if (existingOverlay) {
			existingOverlay.remove();
		}

		// Play the video (this solves an edge case)
		goodTube_hideAndMuteAdsFallback_play();

		// Make sure we only do this once
		goodTube_hideAndMuteAds_state = 'disabled';
	}

	// Init the autoplay actions to sync the embedded player and cookie with the normal button
	let goodTube_hideAndMuteAdsFallback_autoPlay_init_timeout = setTimeout(() => {}, 0);
	function goodTube_hideAndMuteAdsFallback_autoPlay_init() {
		// Target the autoplay button
		let autoplayButton = document.querySelector('#movie_player .ytp-autonav-toggle-button');

		// If we found it
		if (autoplayButton) {
			// On click of the autoplay button
			autoplayButton.addEventListener('click', () => {
				// Get the opposite value of the 'aria-checked' (youtube delays updating this so this is the fastest way to solve that...)
				let oppositeValue = 'true';
				if (autoplayButton.getAttribute('aria-checked') === 'true') {
					oppositeValue = 'false';
				}

				// Update the cookie
				goodTube_helper_setCookie('goodTube_autoplay', oppositeValue);

				// Update the embedded player
				goodTube_player.contentWindow.postMessage('goodTube_autoplay_' + oppositeValue, '*');
			});
		}
		// Otherwise, keep trying until we find the autoplay button
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_hideAndMuteAdsFallback_autoPlay_init_timeout);

			// Create a new timeout
			goodTube_hideAndMuteAdsFallback_autoPlay_init_timeout = setTimeout(goodTube_hideAndMuteAdsFallback_autoPlay_init, 100);
		}
	}

	// Sync autoplay
	let goodTube_hideAndMuteAdsFallback_syncAutoplay_timeout = setTimeout(() => {}, 0);
	function goodTube_hideAndMuteAdsFallback_syncAutoplay() {
		// Target the autoplay button
		let autoplayButton = document.querySelector('#movie_player .ytp-autonav-toggle-button');

		// If we found it and it's visible (this means we can now interact with it)
		if (autoplayButton && autoplayButton.checkVisibility()) {
			if (autoplayButton.getAttribute('aria-checked') !== goodTube_autoplay) {
				goodTube_helper_click(autoplayButton);
			}
		}
		// Otherwise, keep trying until we find the autoplay button
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_hideAndMuteAdsFallback_syncAutoplay_timeout);

			// Create a new timeout
			goodTube_hideAndMuteAdsFallback_syncAutoplay_timeout = setTimeout(goodTube_hideAndMuteAdsFallback_syncAutoplay, 100);
		}
	}

	// Play video
	let goodTube_hideAndMuteAdsFallback_play_timeout = setTimeout(() => {}, 0);
	function goodTube_hideAndMuteAdsFallback_play(mute = false) {
		// Make sure that the "hide and mute ads" fallback is active AND we're viewing a video
		if (!goodTube_fallback || !goodTube_helper_watchingVideo()) {
			return;
		}

		// Re-fetch the page api
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure we have what we need from the API
		if (goodTube_page_api && typeof goodTube_page_api.playVideo === 'function' && typeof goodTube_page_api.mute === 'function' && typeof goodTube_page_api.setVolume === 'function') {
			// Get the video element
			let videoElement = document.querySelector('#movie_player video');

			// Play the video
			goodTube_page_api.playVideo();

			if (mute) {
				// Mute the video via the page API (playing it re-enables audio)
				goodTube_page_api.mute();
				goodTube_page_api.setVolume(0);
			}

			// If we found it
			if (videoElement) {
				if (mute) {
					// Mute the video via HTML (playing it re-enables audio)
					videoElement.muted = true;
					videoElement.volume = 0;
				}

				// Save the starting video time
				let startingVideoTime = videoElement.currentTime;

				// Clear the timeout
				clearTimeout(goodTube_hideAndMuteAdsFallback_play_timeout);

				// Create a new timeout
				goodTube_hideAndMuteAdsFallback_play_timeout = setTimeout(() => {
					// If the time has not progressed
					if (videoElement.currentTime === startingVideoTime) {
						// Try again
						goodTube_hideAndMuteAdsFallback_play();
					}
				}, 100);
			}
		}
	}


	/* Iframe functions
	------------------------------------------------------------------------------------------ */
	// Init
	let goodTube_iframe_initiated = false;
	let goodTube_iframe_init_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_init(retrying = false) {
		// If we're not retrying
		if (!retrying) {
			// Listen for messages from the parent window
			window.addEventListener('message', goodTube_iframe_receiveMessage);

			// Init the rest once the DOM is ready
			document.addEventListener('DOMContentLoaded', goodTube_iframe_init_domReady);

			// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
			if (document.readyState === 'interactive' || document.readyState === 'complete') {
				goodTube_iframe_init_domReady();
			}
		}

		// And try this to check if the DOM is ready, seems to be the only reliable method in all browsers (which is insane, I know...thanks Safari)
		if (!document.body || !document.head) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_init_timeout);

			// Create a new timeout
			goodTube_iframe_init_timeout = setTimeout(() => { goodTube_iframe_init(true); }, 1);
		}
		// Otherwise, the DOM is ready
		else {
			goodTube_iframe_init_domReady();
		}
	}

	// Init when DOM is ready
	let goodTube_iframe_init_domReady_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_init_domReady() {
		// Get the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Get the video data to check loading state
		let videoData = false;
		if (goodTube_iframe_api && typeof goodTube_iframe_api.getVideoData === 'function') {
			videoData = goodTube_iframe_api.getVideoData();
		}

		// Keep trying to get the frame API until it exists
		if (!videoData) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_init_domReady_timeout);

			// Create a new timeout
			goodTube_iframe_init_domReady_timeout = setTimeout(goodTube_iframe_init_domReady, 1);

			return;
		}

		// Sanity check - only do this once (this fixes known load issues in Firefox)
		if (goodTube_iframe_initiated) {
			return;
		}
		goodTube_iframe_initiated = true;

		// Add the main styles
		goodTube_iframe_style();

		// Add custom buttons
		goodTube_iframe_addCustomButtons();

		// Add custom events
		goodTube_iframe_addCustomEvents();

		// Add keyboard shortcuts
		goodTube_iframe_addKeyboardShortcuts();

		// Support double speed shortcuts
		goodTube_iframe_supportDoubleSpeed_init();

		// Support picture in picture
		goodTube_iframe_pip();

		// Sync the main player every 5s
		setInterval(goodTube_iframe_syncMainPlayer, 5000);

		// Restore playback speed, and update it if it changes
		goodTube_iframe_playbackSpeed();

		// Run the iframe actions every 100ms
		goodTube_iframe_actions();
		setInterval(goodTube_iframe_actions, 100);

		// Let the parent frame know it's loaded
		window.top.postMessage('goodTube_playerIframe_loaded', '*');
	}

	// Actions
	function goodTube_iframe_actions() {
		// Check to see if the "hide and mute ads" fallback should be active
		goodTube_iframe_hideMuteAdsFallback();

		// Fix fullscreen button issues
		goodTube_iframe_fixFullScreenButton();

		// Fix links (so they open in the same window)
		goodTube_iframe_fixLinks();

		// Enable picture in picture next and prev buttons
		goodTube_iframe_enablePipButtons();

		// Enable the prev button if required
		if (goodTube_getParams['goodTube_playlist'] !== 'undefined' && goodTube_getParams['goodTube_playlist'] === 'true') {
			goodTube_iframe_enablePrevButton();
		}

		// Sync the aspect ratio
		goodTube_iframe_syncAspectRatio();
	}

	// Check to see if the "hide and mute ads" fallback should be active
	function goodTube_iframe_hideMuteAdsFallback() {
		// Check for an error
		let errorExists = document.querySelector('.ytp-error');

		// If we found an error
		if (errorExists) {
			// Only do this once
			if (!goodTube_fallback) {
				// Enable the "hide and mute ads" fallback
				goodTube_fallback = true;
				window.top.postMessage('goodTube_fallback_enable', '*');

				// Support double speed shortcuts
				goodTube_iframe_supportDoubleSpeed_init();

				// Remove the fullscreen timeout (this stops it looping)
				clearTimeout(goodTube_iframe_fullscreen_timeout);
			}
		}
		// Otherwise, we didn't find an error
		else {
			// Only do this once
			if (goodTube_fallback) {
				// Disable the "hide and mute ads" fallback
				goodTube_fallback = false;
				window.top.postMessage('goodTube_fallback_disable', '*');

				// Support double speed shortcuts
				goodTube_iframe_supportDoubleSpeed_init();

				// Remove the fullscreen timeout (this stops it looping)
				clearTimeout(goodTube_iframe_fullscreen_timeout);
			}
		}
	}

	// Restore playback speed, and update it if it changes
	function goodTube_iframe_playbackSpeed() {
		// Get the playback speed from the get variable
		if (typeof goodTube_getParams['goodTube_playbackSpeed'] !== 'undefined') {
			// Restore the playback speed
			if (goodTube_iframe_api && typeof goodTube_iframe_api.setPlaybackRate === 'function') {
				goodTube_iframe_api.setPlaybackRate(parseFloat(goodTube_getParams['goodTube_playbackSpeed']));
			}
		}

		// Update the playback speed cookie in the top frame every 100ms
		setInterval(() => {
			if (goodTube_iframe_api && typeof goodTube_iframe_api.getPlaybackRate === 'function') {
				// Tell the top frame to save the playback speed
				window.top.postMessage('goodTube_playbackSpeed_' + goodTube_iframe_api.getPlaybackRate(), '*');
			}
		}, 100);
	}

	// Fix links (so they open in the same window)
	function goodTube_iframe_fixLinks() {
		// Get all the video links (info cards and suggested videos that display at the end)
		let videoLinks = document.querySelectorAll('.ytp-videowall-still:not(.goodTube_fixed), .ytp-ce-covering-overlay:not(.goodTube_fixed)');
		videoLinks.forEach(link => {
			// Remove any event listeners that Youtube adds
			link.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();

				// On click, redirect the top window to the correct location
				window.top.location.href = link.href;
			}, true);

			link.addEventListener('mousedown', (event) => {
				// Make sure this is the left mouse button
				if (event.button !== 0) {
					return;
				}

				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			link.addEventListener('mouseup', (event) => {
				// Make sure this is the left mouse button
				if (event.button !== 0) {
					return;
				}

				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			link.addEventListener('touchstart', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			link.addEventListener('touchend', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			// Mark this link as fixed to save on resources
			link.classList.add('goodTube_fixed');
		});
	}

	// Style the iframe
	function goodTube_iframe_style() {
		let style = document.createElement('style');

		let cssOutput = `
			/* Hide unwanted stuff */
			.ytp-gradient-top,
			.ytp-show-cards-title,
			.ytp-pause-overlay,
			.ytp-youtube-button,
			.ytp-cued-thumbnail-overlay,
			.ytp-paid-content-overlay,
			.ytp-impression-link,
			.ytp-ad-progress-list,
			.ytp-endscreen-next,
			.ytp-endscreen-previous,
			.ytp-info-panel-preview,
			.ytp-generic-popup,
			.goodTube_hideEndScreen .html5-endscreen {
				display: none !important;
			}

			.html5-endscreen {
				top: 0 !important;
			}

			/* Disable click events on the top area */
			.ytp-chrome-top {
				pointer-events: none !important;
			}

			/* Always show the next button */
			.ytp-next-button {
				opacity: 1 !important;
				cursor: pointer !important;
				display: block !important;
			}

			/* Show the prev button if it has the right class */
			.ytp-prev-button.goodTube_visible {
				opacity: 1 !important;
				cursor: pointer !important;
				display: block !important;
			}

			/* Show video title in fullscreen */
			:fullscreen .ytp-gradient-top,
			:fullscreen .ytp-show-cards-title {
				display: block !important;
			}
			:fullscreen .ytp-show-cards-title .ytp-button,
			:fullscreen .ytp-show-cards-title .ytp-title-channel {
				display: none !important;
			}
			:fullscreen .ytp-show-cards-title .ytp-title-text {
				padding-left: 36px !important;
			}

			/* Add theater mode button */
			.ytp-size-button {
				display: inline-block !important;
			}

			/* Hide theater button in fullscreen (don't use display none, it causes issues with keyboard shortcuts if this was the last focused element) */
			body .ytp-fullscreen .ytp-size-button {
				position: fixed !important;
				top: -9999px !important;
				left: -9999px !important;
				bottom: auto !important;
				right: auto !important;
				opacity: 0 !important;
				pointer-events: none !important;
			}

			/* Style autoplay button */
			#goodTube_autoplayButton {
				overflow: visible;
				position: relative;
			}

			#goodTube_autoplayButton .ytp-autonav-toggle-button::before {
				pointer-events: none;
				opacity: 0;
				position: absolute;
				top: -49px;
				left: 50%;
				transform: translateX(-50%);
				background: rgba(28, 28, 28, 0.9);
				color: #ffffff;
				border-radius: 4px;
				font-weight: 500;
				font-size: 12.98px;
				padding-left: 9px;
				padding-right: 9px;
				padding-bottom: 0;
				height: 25px;
				box-sizing: border-box;
				line-height: 25px;
				font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
				white-space: nowrap;
			}

			#goodTube_autoplayButton .ytp-autonav-toggle-button[aria-checked='true']::before {
				content: 'Auto-play is on';
			}

			#goodTube_autoplayButton .ytp-autonav-toggle-button[aria-checked='false']::before {
				content: 'Auto-play is off';
			}

			#goodTube_autoplayButton:hover .ytp-autonav-toggle-button::before {
				opacity: 1;
			}

			.ytp-big-mode #goodTube_autoplayButton .ytp-autonav-toggle-button {
				transform: scale(1.4);
				top: 21px;
			}

			.ytp-big-mode #goodTube_autoplayButton .ytp-autonav-toggle-button::before {
				font-size: 14px;
				height: 23px;
				line-height: 23px;
			}

			/* Make sure the background is transparent */
			body,
			.html5-video-player {
				background: transparent !important;
			}
		`;

		// Enable the picture in picture button (unless you're on firefox)
		if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
			cssOutput += `
				.ytp-pip-button {
					display: inline-block !important;
				}
			`;
		}

		// Hide info cards
		if (goodTube_getParams['goodTube_hideInfoCards'] === 'true') {
			cssOutput += `
				.ytp-ce-covering-overlay,
				.ytp-ce-element {
					display: none !important;
				}
			`;
		}

		// Hide end screen videos
		if (goodTube_getParams['goodTube_hideEndScreen'] === 'true') {
			cssOutput += `
				.ytp-videowall-still {
					display: none !important;
				}
			`;
		}

		// Add the CSS to the page
		style.textContent = cssOutput;
		document.head.appendChild(style);
	}

	// Enable the previous button
	function goodTube_iframe_enablePrevButton() {
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton && !prevButton.classList.contains('goodTube_visible')) {
			prevButton.classList.add('goodTube_visible');
		}
	}

	// Disable the previous button
	function goodTube_iframe_disablePrevButton() {
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton && prevButton.classList.contains('goodTube_visible')) {
			prevButton.classList.remove('goodTube_visible');
		}
	}

	// Add custom buttons
	let goodTube_iframe_addCustomButtons_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_addCustomButtons() {
		// Target the play button
		let playButton = document.querySelector('.ytp-play-button');

		// Make sure it exists before continuing
		if (!playButton) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_addCustomButtons_timeout);

			// Create a new timeout
			goodTube_iframe_addCustomButtons_timeout = setTimeout(goodTube_iframe_addCustomButtons, 100);

			return;
		}


		// Previous button
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton) {
			// Add actions
			prevButton.addEventListener('click', function () {
				// Tell the top frame to go to the previous video
				window.top.postMessage('goodTube_prevVideo', '*');
			});
		}


		// Next button
		let nextButton = document.querySelector('.ytp-next-button');
		if (nextButton) {
			// Add actions
			nextButton.addEventListener('click', function () {
				// Tell the top frame to go to the next video
				window.top.postMessage('goodTube_nextVideo', '*');
			});
		}


		// Theater mode button
		let theaterButton = document.querySelector('.ytp-size-button');
		if (theaterButton) {
			// Style button
			theaterButton.setAttribute('data-tooltip-target-id', 'ytp-size-button');
			theaterButton.setAttribute('data-title-no-tooltip', 'Theater mode (t)');
			theaterButton.setAttribute('aria-label', 'Theater mode (t)');
			theaterButton.setAttribute('title', 'Theater mode (t)');
			theaterButton.setAttribute('data-tooltip-title', 'Theater mode (t)');
			goodTube_helper_innerHTML(theaterButton, `
				<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-30"></use><path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-30"></path></svg>
			`)

			// Add actions
			theaterButton.addEventListener('click', function () {
				// Tell the top window to toggle theater mode
				window.top.postMessage('goodTube_theater', '*');
			});
		}


		// Add autoplay button (before subtitles button)
		let subtitlesButton = document.querySelector('.ytp-subtitles-button');
		if (subtitlesButton) {
			// Add button
			goodTube_helper_insertAdjacentHTML(
				subtitlesButton,
				'beforebegin',
				'<button class="ytp-button ytp-autonav-toggle" id="goodTube_autoplayButton"><div class="ytp-autonav-toggle-button-container"><div class="ytp-autonav-toggle-button" aria-checked="' + goodTube_getParams['goodTube_autoplay'] + '"></div></div></button>'
			);

			// Add actions
			let autoplayButton = document.querySelector('#goodTube_autoplayButton');
			if (autoplayButton) {
				autoplayButton.addEventListener('click', function () {
					// Toggle the style of the autoplay button
					let innerButton = autoplayButton.querySelector('.ytp-autonav-toggle-button');
					let innerButtonState = innerButton.getAttribute('aria-checked');

					if (innerButtonState === 'true') {
						innerButton.setAttribute('aria-checked', 'false');
						window.top.postMessage('goodTube_autoplay_false', '*');
					}
					else {
						innerButton.setAttribute('aria-checked', 'true');
						window.top.postMessage('goodTube_autoplay_true', '*');
					}
				});
			}
		}
	}

	// Add custom events
	let goodTube_iframe_addCustomEvents_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_addCustomEvents() {
		// Target the video element
		let videoElement = document.querySelector('#movie_player video');

		// Make sure it exists before continuing
		if (!videoElement) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_addCustomEvents_timeout);

			// Create a new timeout
			goodTube_iframe_addCustomEvents_timeout = setTimeout(goodTube_iframe_addCustomEvents, 100);

			return;
		}

		// When the video ends
		videoElement.addEventListener('ended', function () {
			// Sync the main player, this ensures videos register as finished with the little red play bars
			goodTube_iframe_syncMainPlayer(true);

			// Tell the top frame the video ended
			window.top.postMessage('goodTube_videoEnded', '*');
		});
	}

	// Add keyboard shortcuts
	function goodTube_iframe_addKeyboardShortcuts() {
		document.addEventListener('keydown', function (event) {
			// Don't do anything if we're holding control OR alt OR the command key on mac OR the "hide and mute ads" fallback is active
			if (event.ctrlKey || event.altKey || event.metaKey || goodTube_fallback) {
				return;
			}

			// Get the key pressed (in lowercase)
			let keyPressed = event.key.toLowerCase();

			// Theater mode (t)
			if (keyPressed === 't') {
				// Tell the top window to toggle theater mode
				window.top.postMessage('goodTube_theater', '*');
			}

			// Picture in picture (i)
			if (keyPressed === 'i') {
				let pipButton = document.querySelector('.ytp-pip-button');
				if (pipButton) {
					goodTube_helper_click(pipButton);
				}
			}

			// Prev video (shift+p)
			else if (keyPressed === 'p' && event.shiftKey) {
				// Tell the top window to go to the previous video
				window.top.postMessage('goodTube_prevVideo', '*');
			}

			// Next video (shift+n)
			else if (keyPressed === 'n' && event.shiftKey) {
				// Tell the top window to go to the next video
				window.top.postMessage('goodTube_nextVideo', '*');
			}
		});
	}

	// Support double speed shortcuts
	let goodTube_iframe_supportDoubleSpeed_holdTimeout = setTimeout(() => {}, 0);
	let goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = false;
	let goodTube_iframe_supportDoubleSpeed_currentPlaybackRate = -1;
	let goodTube_iframe_supportDoubleSpeed_keyDownFired = false;
	let goodTube_iframe_supportDoubleSpeed_mouseDownFired = false;
	let goodTube_iframe_supportDoubleSpeed_allowNextClick = false;
	let goodTube_iframe_supportDoubleSpeed_videoElement = document.querySelector('video');
	let goodTube_iframe_supportDoubleSpeed_doubleSpeedElement = document.querySelector('.goodTube_doubleSpeed');
	function goodTube_iframe_supportDoubleSpeed_keydown(event) {
		// Get the key pressed (in lowercase)
		let keyPressed = event.key.toLowerCase();

		// 2x playback rate
		if (keyPressed === ' ' || keyPressed === 'k') {
			// If the "hide mute ads" fallback is active, don't do anything
			if (goodTube_fallback) {
				return;
			}

			// Make sure we're not holding down the mouse
			if (goodTube_iframe_supportDoubleSpeed_mouseDownFired) {
				event.preventDefault();
				event.stopImmediatePropagation();
				return;
			}

			// Don't do anything if we're holding control OR alt OR the command key on mac
			if (event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}

			// Prevent default actions
			event.preventDefault();
			event.stopImmediatePropagation();

			// Make sure 2x playback isn't already active
			if (goodTube_iframe_supportDoubleSpeed_doublePlaybackRate) {
				return;
			}

			// Only do this once
			if (goodTube_iframe_supportDoubleSpeed_keyDownFired) {
				return;
			}

			// Indicate that the keydown has fired
			goodTube_iframe_supportDoubleSpeed_keyDownFired = true;

			// Save the current playback rate
			goodTube_iframe_supportDoubleSpeed_currentPlaybackRate = goodTube_iframe_api.getPlaybackRate();

			// Clear the hold timeout
			clearTimeout(goodTube_iframe_supportDoubleSpeed_holdTimeout);

			// Create a timeout to move into 2x playback rate after 1s
			goodTube_iframe_supportDoubleSpeed_holdTimeout = setTimeout(() => {
				// Set to 2x playback rate
				goodTube_iframe_api.setPlaybackRate(2);

				// Play the video
				goodTube_iframe_api.playVideo();

				// Show the UI element
				goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'block';

				// Indicate that 2x playback rate happened
				goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = true;
			}, 1000);
		}
	}

	function goodTube_iframe_supportDoubleSpeed_keypress(event) {
		// Get the key pressed (in lowercase)
		let keyPressed = event.key.toLowerCase();

		// 2x playback rate
		if (keyPressed === ' ' || keyPressed === 'k') {
			// If the "hide mute ads" fallback is active, don't do anything
			if (goodTube_fallback) {
				return;
			}

			// Make sure we're not holding down the mouse
			if (goodTube_iframe_supportDoubleSpeed_mouseDownFired) {
				event.preventDefault();
				event.stopImmediatePropagation();
				return;
			}

			// Don't do anything if we're holding control OR alt OR the command key on mac
			if (event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}

			// Prevent default actions
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	}

	function goodTube_iframe_supportDoubleSpeed_keyup(event) {
		// Get the key pressed (in lowercase)
		let keyPressed = event.key.toLowerCase();

		// 2x playback rate
		if (keyPressed === ' ' || keyPressed === 'k') {
			// If the "hide mute ads" fallback is active, don't do anything
			if (goodTube_fallback) {
				return;
			}

			// Make sure we're not holding down the mouse
			if (goodTube_iframe_supportDoubleSpeed_mouseDownFired) {
				event.preventDefault();
				event.stopImmediatePropagation();
				return;
			}

			// Don't do anything if we're holding control OR alt OR the command key on mac
			if (event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}

			// Clear the hold timeout
			clearTimeout(goodTube_iframe_supportDoubleSpeed_holdTimeout);

			// If double playback rate did not happen
			if (!goodTube_iframe_supportDoubleSpeed_doublePlaybackRate) {
				// Re-target the video element (this fixes a weird issue where the play/pause doesn't work sometimes...)
				goodTube_iframe_supportDoubleSpeed_videoElement = document.querySelector('video');

				// Click the video element (we must do it this way, it's the only reliable method)
				goodTube_iframe_supportDoubleSpeed_allowNextClick = true;
				goodTube_helper_click(goodTube_iframe_supportDoubleSpeed_videoElement);
				goodTube_iframe_supportDoubleSpeed_allowNextClick = false;
			}
			// Otherwise, double playback rate did happen
			else {
				// Restore the playback rate
				goodTube_iframe_api.setPlaybackRate(goodTube_iframe_supportDoubleSpeed_currentPlaybackRate);

				// Hide the UI element
				goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'none';

				// Indicate that the double playback rate has not happened
				goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = false;
			}

			// Indicate that the keydown has not fired
			goodTube_iframe_supportDoubleSpeed_keyDownFired = false;

			// Prevent default actions
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	}

	function goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart(event) {
		// Make sure this is the left mouse button
		if (event.button !== 0) {
			return;
		}

		// If we're allowing the next click, don't do anything
		if (goodTube_iframe_supportDoubleSpeed_allowNextClick) {
			return;
		}

		// If the "hide mute ads" fallback is active, don't do anything
		if (goodTube_fallback) {
			return;
		}

		// Make sure we're not holding down spacebar
		if (goodTube_iframe_supportDoubleSpeed_keyDownFired) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		// Indicate that the mousedown has fired
		goodTube_iframe_supportDoubleSpeed_mouseDownFired = true;

		// Prevent default actions
		event.preventDefault();
		event.stopImmediatePropagation();

		// Save the current playback rate
		goodTube_iframe_supportDoubleSpeed_currentPlaybackRate = goodTube_iframe_api.getPlaybackRate();

		// Clear the hold timeout
		clearTimeout(goodTube_iframe_supportDoubleSpeed_holdTimeout);

		// Create a timeout to move into 2x playback rate after 1s
		goodTube_iframe_supportDoubleSpeed_holdTimeout = setTimeout(() => {
			// Set to 2x playback rate
			goodTube_iframe_api.setPlaybackRate(2);

			// Play the video
			goodTube_iframe_api.playVideo();

			// Show the UI element
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'block';

			// Indicate that 2x playback rate happened
			goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = true;
		}, 1000);
	}

	function goodTube_iframe_supportDoubleSpeed_click(event) {
		// If we're allowing the next click, don't do anything
		if (goodTube_iframe_supportDoubleSpeed_allowNextClick) {
			return;
		}

		// If the "hide mute ads" fallback is active, don't do anything
		if (goodTube_fallback) {
			return;
		}


		// Prevent default actions
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	function goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd(event) {
		// Make sure this is the left mouse button
		if (event.button !== 0) {
			return;
		}

		// If we're allowing the next click, don't do anything
		if (goodTube_iframe_supportDoubleSpeed_allowNextClick) {
			return;
		}

		// If the "hide mute ads" fallback is active, don't do anything
		if (goodTube_fallback) {
			return;
		}

		// Make sure we're not holding down spacebar
		if (goodTube_iframe_supportDoubleSpeed_keyDownFired) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		// Clear the hold timeout
		clearTimeout(goodTube_iframe_supportDoubleSpeed_holdTimeout);

		// If double playback rate did not happen
		if (!goodTube_iframe_supportDoubleSpeed_doublePlaybackRate) {
			// Re-target the video element (this fixes a weird issue where the play/pause doesn't work sometimes...)
			goodTube_iframe_supportDoubleSpeed_videoElement = document.querySelector('video');

			// Click the video element (we must do it this way, it's the only reliable method)
			goodTube_iframe_supportDoubleSpeed_allowNextClick = true;
			goodTube_helper_click(goodTube_iframe_supportDoubleSpeed_videoElement);
			goodTube_iframe_supportDoubleSpeed_allowNextClick = false;

			// Focus the video element
			setTimeout(goodTube_iframe_supportDoubleSpeed_videoElement.focus());
		}
		// Otherwise, double playback rate did happen
		else {
			// Restore the playback rate
			goodTube_iframe_api.setPlaybackRate(goodTube_iframe_supportDoubleSpeed_currentPlaybackRate);

			// Hide the UI element
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'none';

			// Indicate that the double playback rate has not happened
			goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = false;
		}

		// Indicate that the mousedown has not fired
		goodTube_iframe_supportDoubleSpeed_mouseDownFired = false;

		// Prevent default actions
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	function goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel(event) {
		// If the "hide mute ads" fallback is active, don't do anything
		if (goodTube_fallback) {
			return;
		}

		// Make sure we're not holding down spacebar
		if (goodTube_iframe_supportDoubleSpeed_keyDownFired) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		// Prevent default actions
		event.preventDefault();
		event.stopImmediatePropagation();

		// Clear the hold timeout
		clearTimeout(goodTube_iframe_supportDoubleSpeed_holdTimeout);

		// If double playback rate happened
		if (goodTube_iframe_supportDoubleSpeed_doublePlaybackRate) {
			// Restore the playback rate
			goodTube_iframe_api.setPlaybackRate(goodTube_iframe_supportDoubleSpeed_currentPlaybackRate);

			// Hide the UI element
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'none';

			// Indicate that the double playback rate has not happened
			goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = false;
		}

		// Indicate that the mousedown has not fired
		goodTube_iframe_supportDoubleSpeed_mouseDownFired = false;
	}

	let goodTube_iframe_supportDoubleSpeed_init_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_supportDoubleSpeed_init() {
		/* Setup vars
		-------------------------------------------------- */
		clearTimeout(goodTube_iframe_supportDoubleSpeed_holdTimeout);
		goodTube_iframe_supportDoubleSpeed_doublePlaybackRate = false;
		goodTube_iframe_supportDoubleSpeed_keyDownFired = false;
		goodTube_iframe_supportDoubleSpeed_mouseDownFired = false;
		goodTube_iframe_supportDoubleSpeed_videoElement = document.querySelector('video');
		goodTube_iframe_supportDoubleSpeed_doubleSpeedElement = document.querySelector('.goodTube_doubleSpeed');


		/* If the "hide and mute ads" fallback is active, disable this
		-------------------------------------------------- */
		if (goodTube_fallback) {
			document.removeEventListener('keydown', goodTube_iframe_supportDoubleSpeed_keydown, true);
			document.removeEventListener('keypress', goodTube_iframe_supportDoubleSpeed_keypress, true);
			document.removeEventListener('keyup', goodTube_iframe_supportDoubleSpeed_keyup, true);

			if (goodTube_iframe_supportDoubleSpeed_videoElement) {
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('mousedown', goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart, true);
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('touchstart', goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart, true);
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('click', goodTube_iframe_supportDoubleSpeed_click, true);
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('mouseup', goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd, true);
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('touchend', goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd, true);
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('mouseout', goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel, true);
				goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('touchcancel', goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel, true);
			}

			if (goodTube_iframe_supportDoubleSpeed_doubleSpeedElement) {
				goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'none';
			}

			return;
		}


		/* Make sure the video element exists
		-------------------------------------------------- */
		if (!goodTube_iframe_supportDoubleSpeed_videoElement) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_supportDoubleSpeed_init_timeout);

			// Create a new timeout
			goodTube_iframe_supportDoubleSpeed_init_timeout = setTimeout(goodTube_iframe_supportDoubleSpeed_init, 100);

			return;
		}


		/* Make sure the API is all good
		-------------------------------------------------- */
		// Get the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Check we have what we need from the API
		if (!goodTube_iframe_api || typeof goodTube_iframe_api.getPlaybackRate !== 'function' || typeof goodTube_iframe_api.setPlaybackRate !== 'function' || typeof goodTube_iframe_api.playVideo !== 'function') {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_supportDoubleSpeed_init_timeout);

			// Create a new timeout
			goodTube_iframe_supportDoubleSpeed_init_timeout = setTimeout(goodTube_iframe_supportDoubleSpeed_init, 100);

			return;
		}


		/* Restore the playback speed to start with
		-------------------------------------------------- */
		goodTube_iframe_supportDoubleSpeed_currentPlaybackRate = goodTube_iframe_api.getPlaybackRate();
		goodTube_iframe_api.setPlaybackRate(goodTube_iframe_supportDoubleSpeed_currentPlaybackRate);


		/* Add the UI (2x speed) - first load only
		-------------------------------------------------- */
		// Only add the UI it doesn't exist already
		if (!goodTube_iframe_supportDoubleSpeed_doubleSpeedElement) {
			// Create the element
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement = document.createElement('div');

			// Add the classes
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.classList.add('goodTube_doubleSpeed');

			// Style the element (this is required for fullscreen mode)
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.position = 'relative';
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.zIndex = '999';

			// Hide the element
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'none';

			// Populate the element
			goodTube_helper_innerHTML(goodTube_iframe_supportDoubleSpeed_doubleSpeedElement, `
				<div class="ytp-overlay ytp-speedmaster-overlay" data-layer="4">
					<div class="ytp-speedmaster-user-edu ytp-speedmaster-has-icon">
						<div class="ytp-speedmaster-label">2x</div>
						<div class="ytp-speedmaster-icon">
							<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
								<path class="ytp-svg-fill" d="M 10,24 18.5,18 10,12 V 24 z M 19,12 V 24 L 27.5,18 19,12 z" id="ytp-id-1"></path>
							</svg>
						</div>
					</div>
				</div>
			`);

			// Add the element to the page
			let targetElement = document.querySelector('.html5-video-player');
			if (targetElement) {
				targetElement.appendChild(goodTube_iframe_supportDoubleSpeed_doubleSpeedElement);
			}
		}
		// Otherwise, hide the UI to start
		else {
			goodTube_iframe_supportDoubleSpeed_doubleSpeedElement.style.display = 'none';
		}


		/* Key down
		-------------------------------------------------- */
		document.removeEventListener('keydown', goodTube_iframe_supportDoubleSpeed_keydown, true);
		document.addEventListener('keydown', goodTube_iframe_supportDoubleSpeed_keydown, true);


		/* Key press
		-------------------------------------------------- */
		document.removeEventListener('keypress', goodTube_iframe_supportDoubleSpeed_keypress, true);
		document.addEventListener('keypress', goodTube_iframe_supportDoubleSpeed_keypress, true);


		/* Key up
		-------------------------------------------------- */
		document.removeEventListener('keyup', goodTube_iframe_supportDoubleSpeed_keyup, true);
		document.addEventListener('keyup', goodTube_iframe_supportDoubleSpeed_keyup, true);


		/* Mouse down / touch start
		-------------------------------------------------- */
		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('mousedown', goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('mousedown', goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart, true);

		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('touchstart', goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('touchstart', goodTube_iframe_supportDoubleSpeed_mouseDownTouchStart, true);


		/* Click
		-------------------------------------------------- */
		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('click', goodTube_iframe_supportDoubleSpeed_click, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('click', goodTube_iframe_supportDoubleSpeed_click, true);


		/* Mouse up / touch end
		-------------------------------------------------- */
		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('mouseup', goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('mouseup', goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd, true);

		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('touchend', goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('touchend', goodTube_iframe_supportDoubleSpeed_mouseUpTouchEnd, true);


		/* Mouse out / touch cancel
		-------------------------------------------------- */
		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('mouseout', goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('mouseout', goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel, true);

		goodTube_iframe_supportDoubleSpeed_videoElement.removeEventListener('touchcancel', goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel, true);
		goodTube_iframe_supportDoubleSpeed_videoElement.addEventListener('touchcancel', goodTube_iframe_supportDoubleSpeed_mouseOutTouchCancel, true);
	}

	// Load a video
	function goodTube_iframe_loadVideo(videoId, startSeconds) {
		// Get the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Make sure the API is ready
		if (goodTube_iframe_api && typeof goodTube_iframe_api.loadVideoById === 'function' && typeof goodTube_iframe_api.getVideoData === 'function') {
			// Load the video
			goodTube_iframe_api.loadVideoById(
				{
					'videoId': videoId,
					'startSeconds': startSeconds
				}
			);

			// Support double speed shortcuts
			goodTube_iframe_supportDoubleSpeed_init();
		}
	}

	// Receive a message from the parent window
	let goodTube_iframe_receiveMessage_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Make sure the DOM is ready, if not retry (this ensures that the message will fire eventually)
		// Use this method to check if the DOM is ready, seems to be the only reliable method in all browsers (which is insane, I know...thanks Safari)
		if (!document.body || !document.head) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_receiveMessage_timeout);

			// Create a new timeout
			goodTube_iframe_receiveMessage_timeout = setTimeout(() => { goodTube_iframe_receiveMessage(event); }, 100);

			// Don't do anything else
			return;
		}


		// Re fetch the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Get the video data to check loading state
		let videoData = false;
		if (goodTube_iframe_api && typeof goodTube_iframe_api.getVideoData === 'function') {
			videoData = goodTube_iframe_api.getVideoData();
		}

		// Keep trying to get the frame API until it exists
		if (!videoData) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_receiveMessage_timeout);

			// Create a new timeout
			goodTube_iframe_receiveMessage_timeout = setTimeout(() => { goodTube_iframe_receiveMessage(event); }, 100);

			// Don't do anything else
			return;
		}


		// Load video
		if (event.data.indexOf('goodTube_load_') !== -1) {
			let bits = event.data.replace('goodTube_load_', '').split('|||');
			let videoId = bits[0];
			let startSeconds = parseFloat(bits[1]);
			let viewingPlaylist = bits[2];

			// If we're on a playlist
			if (viewingPlaylist === 'true') {
				// Enable the previous button
				goodTube_iframe_enablePrevButton();
			}
			// Otherwise, we're not on a playlist
			else {
				// Disable the previous button
				goodTube_iframe_disablePrevButton();
			}

			// Then load the new video
			goodTube_iframe_loadVideo(videoId, startSeconds);
		}

		// Stop video
		else if (event.data === 'goodTube_stopVideo') {
			// Pause and mute the video
			goodTube_iframe_pause();
			goodTube_iframe_mute();
		}

		// Skip to time
		else if (event.data.indexOf('goodTube_skipTo_') !== -1) {
			// Get the data
			let data = event.data.replace('goodTube_skipTo_', '').split('|||');
			let time = parseFloat(data[0]);
			let targetVideoId = data[1];

			// If the target video id exists AND the current video id doesn't match the target video id (it hasn't loaded yet)
			if (targetVideoId !== '' && videoData.video_id !== targetVideoId) {
				// Clear timeout first to solve memory leak issues
				clearTimeout(goodTube_iframe_receiveMessage_timeout);

				// Create a new timeout
				goodTube_iframe_receiveMessage_timeout = setTimeout(() => { goodTube_iframe_receiveMessage(event); }, 100);

				// Don't do anything else
				return;
			}

			// Skip to the time
			goodTube_iframe_skipTo(time);
		}

		// Pause
		else if (event.data === 'goodTube_pause') {
			goodTube_iframe_pause();
		}

		// Play
		else if (event.data.indexOf('goodTube_play|||') !== -1) {
			goodTube_iframe_play(event.data.replace('goodTube_play|||', ''));
		}

		// Show the end screen thumbnails
		else if (event.data === 'goodTube_endScreen_show') {
			if (document.body && document.body.classList.contains('goodTube_hideEndScreen')) {
				document.body.classList.remove('goodTube_hideEndScreen');
			}
		}

		// Hide the end screen thumbnails
		else if (event.data === 'goodTube_endScreen_hide') {
			if (document.body && !document.body.classList.contains('goodTube_hideEndScreen')) {
				document.body.classList.add('goodTube_hideEndScreen');
			}
		}

		// Keyboard shortcut
		else if (event.data.indexOf('goodTube_shortcut_') !== -1) {
			// Target the video element
			let videoElement = document.querySelector('video');

			// If the video element exists
			if (videoElement) {
				// Get the key event data
				let keyData = event.data.replace('goodTube_shortcut_', '').split('_');

				// Parse the data
				let eventType = keyData[0];
				let eventData = {
					bubbles: true,
					key: keyData[1],
					keyCode: keyData[2],
					ctrlKey: (keyData[3] === 'true'),
					metaKey: (keyData[4] === 'true'),
					shiftKey: (keyData[5] === 'true'),
					altKey: (keyData[6] === 'true')
				};

				// Simulate the keyboard event on the video element
				videoElement.dispatchEvent(new KeyboardEvent(eventType, eventData));
			}
		}

		// Go fullscreen
		else if (event.data === 'goodTube_fullscreen') {
			goodTube_iframe_fullscreen();
		}

		// Enable autoplay
		else if (event.data === 'goodTube_autoplay_true') {
			goodTube_helper_setCookie('goodTube_autoplay', 'true');
			goodTube_autoplay = 'true';
			goodTube_iframe_setAutoplay('true');
		}

		// Disable autoplay
		else if (event.data === 'goodTube_autoplay_false') {
			goodTube_helper_setCookie('goodTube_autoplay', 'false');
			goodTube_autoplay = 'false';
			goodTube_iframe_setAutoplay('false');
		}
	}

	// Go fullscreen
	let goodTube_iframe_fullscreen_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_fullscreen() {
		// Target the fullscreen button
		let fullscreenButton = document.querySelector('.ytp-fullscreen-button');

		// If we found it
		if (fullscreenButton) {
			// Click it
			goodTube_helper_click(fullscreenButton);
		}
		// Otherwise, we didn't find it
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_fullscreen_timeout);

			// Create a new timeout to try again
			goodTube_iframe_fullscreen_timeout = setTimeout(goodTube_iframe_fullscreen, 100);
		}
	}

	// Set autoplay
	let goodTube_iframe_setAutoplay_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_setAutoplay(enabled) {
		// Target the autoplay button
		let autoplayButton = document.querySelector('#goodTube_autoplayButton');

		// If we found it
		if (autoplayButton) {
			let innerButton = autoplayButton.querySelector('.ytp-autonav-toggle-button');

			// If the button is in the wrong state
			if (innerButton.getAttribute('aria-checked') !== enabled) {
				// Click it
				goodTube_helper_click(autoplayButton);
			}
		}
		// Otherwise, we didn't find it
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_setAutoplay_timeout);

			// Create a new timeout to try again
			goodTube_iframe_setAutoplay_timeout = setTimeout(() => { goodTube_iframe_setAutoplay(enabled); }, 100);
		}
	}

	// Skip to time
	let goodTube_iframe_skipTo_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_skipTo(time) {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, restore the time
		if (videoElement) {
			videoElement.currentTime = parseFloat(time);
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_skipTo_timeout);

			// Create a new timeout
			goodTube_iframe_skipTo_timeout = setTimeout(() => {
				goodTube_iframe_skipTo(time);
			}, 100);
		}
	}

	// Pause
	let goodTube_iframe_pause_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_pause() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video element exists, pause it
		if (videoElement) {
			videoElement.pause();
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_pause_timeout);

			// Create a new timeout
			goodTube_iframe_pause_timeout = setTimeout(goodTube_iframe_pause, 100);
		}
	}

	// Mute
	let goodTube_iframe_mute_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_mute() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, mute it
		if (videoElement) {
			videoElement.muted = true;
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_mute_timeout);

			// Create a new timeout
			goodTube_iframe_mute_timeout = setTimeout(goodTube_iframe_mute, 100);
		}
	}

	// Unmute
	let goodTube_iframe_unmute_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_unmute() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, unmute it
		if (videoElement) {
			videoElement.muted = false;
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_unmute_timeout);

			// Create a new timeout
			goodTube_iframe_unmute_timeout = setTimeout(goodTube_iframe_unmute, 100);
		}
	}

	// Play
	let goodTube_iframe_play_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_play(videoId) {
		// Re-fetch the iframe api
		goodTube_iframe_api = document.getElementById('movie_player');

		// Get the video data
		let videoData = false;
		if (goodTube_iframe_api && typeof goodTube_iframe_api.getVideoData === 'function') {
			videoData = goodTube_iframe_api.getVideoData();
		}

		// If the correct video hasn't loaded yet (based on the ID in the query params)
		if (!videoData || videoId !== videoData.video_id) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_play_timeout);

			// Create a new timeout to try again
			goodTube_iframe_play_timeout = setTimeout(() => { goodTube_iframe_play(videoId); }, 100);

			// Don't do anything else
			return;
		}

		// Make sure the video has not ended (this solves an edge case)
		let videoElement = document.querySelector('#movie_player video');
		if (videoElement) {
			if (videoElement.currentTime >= videoElement.duration) {
				return;
			}
		}

		// Play the video
		if (goodTube_iframe_api && typeof goodTube_iframe_api.playVideo === 'function') {
			// Force the video to play
			goodTube_iframe_api.playVideo();
		}
	}

	// Fix fullscreen button issues
	function goodTube_iframe_fixFullScreenButton() {
		let fullScreenButton = document.querySelector('.ytp-fullscreen-button');
		if (fullScreenButton) {
			fullScreenButton.setAttribute('aria-disabled', 'false');

			if (document.querySelector('.ytp-fullscreen')) {
				fullScreenButton.setAttribute('title', 'Exit full screen (f)');
			}
			else {
				fullScreenButton.setAttribute('title', 'Full screen (f)');
			}
		}
	}

	// Sync the main player
	function goodTube_iframe_syncMainPlayer(syncToEnd = false) {
		// Target the video element
		let videoElement = document.querySelector('video');

		// If we found the video element
		if (videoElement) {
			// Setup the sync time
			let syncTime = videoElement.currentTime;

			// If we're syncing to the end
			if (syncToEnd) {
				syncTime = videoElement.duration;
			}

			// Tell the top level window to sync the video
			window.top.postMessage('goodTube_syncMainPlayer_' + syncTime, '*');
		}
	}

	// Support picture in picture
	function goodTube_iframe_pip() {
		// If we leave the picture in picture
		addEventListener('leavepictureinpicture', (event) => {
			goodTube_pip = false;

			// Set the picture in picture state in the top window
			window.top.postMessage('goodTube_pip_false', '*');
		});

		// If we enter the picture in picture
		addEventListener('enterpictureinpicture', (event) => {
			goodTube_pip = true;

			// Set the picture in picture state in the top window
			window.top.postMessage('goodTube_pip_true', '*');
		});
	}

	// Enable picture in picture next and prev buttons
	function goodTube_iframe_enablePipButtons() {
		if ("mediaSession" in navigator) {
			// Next video
			navigator.mediaSession.setActionHandler("nexttrack", () => {
				// Tell the top frame to go to the next video
				window.top.postMessage('goodTube_nextVideo', '*');
			});

			// Previous video
			navigator.mediaSession.setActionHandler("previoustrack", () => {
				// Tell the top frame to go to the previous video
				window.top.postMessage('goodTube_prevVideo', '*');
			});
		}
	}

	// Sync the aspect ratio
	function goodTube_iframe_syncAspectRatio() {
		// Target the video element
		let videoElement = document.querySelector('video');

		// If we found the video element
		if (videoElement) {
			// Get the the intrinsic width and height of the video
			let videoWidth = videoElement.videoWidth;
			let videoHeight = videoElement.videoHeight;

			// Calculate the aspect radio
			function gcd(a, b) {
				return (b == 0) ? a : gcd(b, a % b);
			}

			function calculateAspectRatio(w, h) {
				var d = gcd(w, h);
				return [w / d, h / d];
			}

			let aspectRatio = calculateAspectRatio(videoWidth, videoHeight);

			// Make sure we found a valid aspect ratio
			if (aspectRatio.length === 2 && !isNaN(aspectRatio[0]) && !isNaN(aspectRatio[1])) {
				// Tell the top level window to sync the aspect ratio
				window.top.postMessage('goodTube_syncAspectRatio_' + aspectRatio[0] + '_' + aspectRatio[1], '*');
			}
		}
	}


	/* Proxy iframe functions
	------------------------------------------------------------------------------------------ */
	// Init
	let goodTube_proxyIframe_initiated = false;
	let goodTube_proxyIframe_init_timeout = setTimeout(() => {}, 0);
	function goodTube_proxyIframe_init() {
		// Listen for messages from the parent window
		window.addEventListener('message', goodTube_proxyIframe_receiveMessage);

		// Init the rest once the DOM is ready
		document.addEventListener('DOMContentLoaded', goodTube_proxyIframe_init_domReady);

		// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			goodTube_proxyIframe_init_domReady();
		}

		// And try this to check if the DOM is ready, seems to be the only reliable method in all browsers (which is insane, I know...thanks Safari)
		if (!document.body || !document.head) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_proxyIframe_init_timeout);

			// Create a new timeout
			goodTube_proxyIframe_init_timeout = setTimeout(goodTube_proxyIframe_init, 1);
		}
		// Otherwise, the DOM is ready
		else {
			goodTube_proxyIframe_init_domReady();
		}
	}

	// Init when DOM is ready
	function goodTube_proxyIframe_init_domReady() {
		// Sanity check - only do this once (this fixes known load issues in Firefox)
		if (goodTube_proxyIframe_initiated) {
			return;
		}
		goodTube_proxyIframe_initiated = true;

		// Style the proxy iframe
		goodTube_proxyIframe_style();

		// Add the Youtube iframe
		goodTube_proxyIframe_addYoutubeIframe();

		// Let the parent frame know it's loaded
		window.top.postMessage('goodTube_proxyIframe_loaded', '*');
	}

	// Style the proxy iframe
	function goodTube_proxyIframe_style() {
		// Hide the DOM elements from the proxy page
		let style = document.createElement('style');
		style.textContent = `
			/* Hide the page */
			body *:not(#goodTube_youtube_iframe) {
				display: none !important;
				opacity: 0 !important;
				visibility: hidden !important;
			}

			body {
				background: transparent !important;
				overflow: hidden !important;
			}

			/* Style the Youtube iframe */
			#goodTube_youtube_iframe {
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 99999;
			}
		`;
		document.head.appendChild(style);
	}

	// Add the Youtube iframe
	function goodTube_proxyIframe_addYoutubeIframe() {
		let youtubeIframe = document.createElement('iframe');
		youtubeIframe.src = '';
		youtubeIframe.setAttribute('width', '100%');
		youtubeIframe.setAttribute('height', '100%');
		youtubeIframe.setAttribute('frameborder', '0');
		youtubeIframe.setAttribute('scrolling', 'yes');
		youtubeIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
		youtubeIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
		youtubeIframe.setAttribute('allowfullscreen', true);
		youtubeIframe.setAttribute('id', 'goodTube_youtube_iframe');
		document.body.appendChild(youtubeIframe);
	}

	// Receive a message from the parent window
	let goodTube_proxyIframe_receiveMessage_timeout = setTimeout(() => {}, 0);
	function goodTube_proxyIframe_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Make sure the DOM is ready, if not retry (this ensures that the message will fire eventually)
		if (!document.body || !document.head) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_proxyIframe_receiveMessage_timeout);

			// Create a new timeout
			goodTube_proxyIframe_receiveMessage_timeout = setTimeout(() => { goodTube_proxyIframe_receiveMessage(event); }, 100);
		}

		// Target the youtube iframe
		let youtubeIframe = document.getElementById('goodTube_youtube_iframe');

		// Make sure we found the youtube iframe
		if (youtubeIframe) {
			// Change the source of the youtube iframe
			if (event.data.indexOf('goodTube_src_') !== -1) {
				// First time just change the src
				if (youtubeIframe.src === '' || youtubeIframe.src.indexOf('?goodTubeProxy=1') !== -1) {
					youtubeIframe.src = event.data.replace('goodTube_src_', '');
				}
				// All other times, we need to use this weird method so it doesn't mess with our browser history
				else {
					youtubeIframe.contentWindow.location.replace(event.data.replace('goodTube_src_', ''));
				}
			}
			// Pass all other messages down to the youtube iframe
			else {
				youtubeIframe.contentWindow.postMessage(event.data, '*');
			}
		}
		// Otherwise, try again
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_proxyIframe_receiveMessage_timeout);

			// Create a new timeout
			goodTube_proxyIframe_receiveMessage_timeout = setTimeout(() => { goodTube_proxyIframe_receiveMessage(event); }, 100);
		}
	}


	/* Start GoodTube
	------------------------------------------------------------------------------------------ */
	function goodTube_start() {
		// Youtube page
		if (window.top === window.self && window.location.href.indexOf('youtube') !== -1) {
			goodTube_init();
		}
		// Proxy iframe embed
		else if (window.location.href.indexOf('?goodTubeProxy=1') !== -1) {
			goodTube_proxyIframe_init();
		}
		// Iframe embed
		else if (window.location.href.indexOf('?goodTubeEmbed=1') !== -1) {
			goodTube_iframe_init();
		}
	}

	// Let's go!
	goodTube_start();
})();
