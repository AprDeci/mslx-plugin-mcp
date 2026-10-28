(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode("@keyframes t-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.t-icon{display:inline-block;vertical-align:middle;width:1em;height:1em}.t-icon:before{font-family:unset}.t-icon-loading{animation:t-spin 1s linear infinite}.t-icon.t-size-s,i.t-size-s{font-size:14px}.t-icon.t-size-m,i.t-size-m{font-size:16px}.t-icon.t-size-l,i.t-size-l{font-size:18px}@unocss;.relative[data-v-b155a86d]{position:relative}.m-0[data-v-b155a86d]{margin:0}.mt-0\\.5[data-v-b155a86d]{margin-top:.125rem}.h-5[data-v-b155a86d]{height:1.25rem}.h-px[data-v-b155a86d]{height:1px}.w-1\\.5[data-v-b155a86d]{width:.375rem}.flex[data-v-b155a86d]{display:flex}.flex-grow[data-v-b155a86d]{flex-grow:1}.flex-col[data-v-b155a86d]{flex-direction:column}.items-center[data-v-b155a86d]{align-items:center}.justify-center[data-v-b155a86d]{justify-content:center}.justify-between[data-v-b155a86d]{justify-content:space-between}.gap-2[data-v-b155a86d]{gap:.5rem}.gap-3[data-v-b155a86d]{gap:.75rem}.gap-4[data-v-b155a86d]{gap:1rem}.gap-5[data-v-b155a86d]{gap:1.25rem}.overflow-x-auto[data-v-b155a86d]{overflow-x:auto}.border[data-v-b155a86d]{border-width:1px}.border-b[data-v-b155a86d]{border-bottom-width:1px}.border-\\[var\\(--td-component-border\\)\\][data-v-b155a86d]{border-color:var(--td-component-border)}.rounded-2xl[data-v-b155a86d]{border-radius:1rem}.rounded-full[data-v-b155a86d]{border-radius:9999px}.rounded-xl[data-v-b155a86d]{border-radius:.75rem}.bg-\\[\\#1e1e1e\\][data-v-b155a86d]{--un-bg-opacity:1;background-color:rgb(30 30 30 / var(--un-bg-opacity))}.bg-\\[var\\(--color-primary\\)\\][data-v-b155a86d]{background-color:var(--color-primary)}.bg-\\[var\\(--td-bg-color-secondarycontainer\\)\\][data-v-b155a86d]{background-color:var(--td-bg-color-secondarycontainer)}.bg-\\[var\\(--td-component-border\\)\\][data-v-b155a86d]{background-color:var(--td-component-border)}.p-4[data-v-b155a86d]{padding:1rem}.p-5[data-v-b155a86d]{padding:1.25rem}.py-12[data-v-b155a86d]{padding-top:3rem;padding-bottom:3rem}.pb-4[data-v-b155a86d]{padding-bottom:1rem}.pt-5[data-v-b155a86d]{padding-top:1.25rem}.text-\\[13px\\][data-v-b155a86d]{font-size:13px}.text-lg[data-v-b155a86d]{font-size:1.125rem;line-height:1.75rem}.text-sm[data-v-b155a86d]{font-size:.875rem;line-height:1.25rem}.text-xs[data-v-b155a86d]{font-size:.75rem;line-height:1rem}.text-\\[\\#d4d4d4\\][data-v-b155a86d]{--un-text-opacity:1;color:rgb(212 212 212 / var(--un-text-opacity))}.text-\\[var\\(--color-primary\\)\\][data-v-b155a86d]{color:var(--color-primary)}.text-\\[var\\(--td-text-color-placeholder\\)\\][data-v-b155a86d]{color:var(--td-text-color-placeholder)}.text-\\[var\\(--td-text-color-primary\\)\\][data-v-b155a86d]{color:var(--td-text-color-primary)}.text-\\[var\\(--td-text-color-secondary\\)\\][data-v-b155a86d]{color:var(--td-text-color-secondary)}.font-bold[data-v-b155a86d]{font-weight:700}.leading-relaxed[data-v-b155a86d]{line-height:1.625}.font-mono[data-v-b155a86d]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.opacity-90[data-v-b155a86d]{opacity:.9}.shadow-\\[0_0_8px_var\\(--color-primary-light\\)\\][data-v-b155a86d]{--un-shadow:0 0 8px var(--un-shadow-color, var(--color-primary-light));box-shadow:var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-sm[data-v-b155a86d]{--un-shadow:var(--un-shadow-inset) 0 1px 2px 0 var(--un-shadow-color, rgb(0 0 0 / .05));box-shadow:var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.light .light-outline[data-v-b155a86d],.outline[data-v-b155a86d]{outline-style:solid}@media(min-width:640px){.sm\\:flex-row[data-v-b155a86d]{flex-direction:row}.sm\\:items-center[data-v-b155a86d]{align-items:center}.sm\\:p-6[data-v-b155a86d]{padding:1.5rem}}")),document.head.appendChild(a)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
function U(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var O, S;
function J() {
  return S || (S = 1, O = Vue), O;
}
var r = J(), w, E;
function X() {
  return E || (E = 1, w = TDesign), w;
}
var k = X();
function h(e) {
  "@babel/helpers - typeof";
  return h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
    return typeof o;
  } : function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, h(e);
}
function Y(e, o) {
  if (h(e) != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var l = t.call(e, o);
    if (h(l) != "object") return l;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (o === "string" ? String : Number)(e);
}
function G(e) {
  var o = Y(e, "string");
  return h(o) == "symbol" ? o : o + "";
}
function x(e, o, t) {
  return (o = G(o)) in e ? Object.defineProperty(e, o, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[o] = t, e;
}
var _ = (e) => {
  var o = ["strokeLinecap", "fillRule", "clipRule", "strokeWidth"];
  return o.includes(e) ? e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase() : e;
}, p = (e, o) => {
  var t = {};
  if (e.attrs)
    for (var [l, i] of Object.entries(e.attrs))
      if (typeof i == "string" && i.startsWith("props.")) {
        var d = i.split(".")[1];
        t[_(l)] = o[d];
      } else
        t[_(l)] = i;
  e.tag === "svg" && (t.class = o.class, t.style = o.style, t.onClick = o.onClick);
  var f = e.children ? e.children.map((u) => p(u, o)) : [];
  return r.h(e.tag, t, f);
}, Q = "t", ee = {
  classPrefix: Q
};
function re() {
  var {
    classPrefix: e
  } = ee;
  return {
    SIZE: {
      default: "",
      xs: "".concat(e, "-size-xs"),
      small: "".concat(e, "-size-s"),
      medium: "".concat(e, "-size-m"),
      large: "".concat(e, "-size-l"),
      xl: "".concat(e, "-size-xl"),
      block: "".concat(e, "-size-full-width")
    },
    STATUS: {
      loading: "".concat(e, "-is-loading"),
      disabled: "".concat(e, "-is-disabled"),
      focused: "".concat(e, "-is-focused"),
      success: "".concat(e, "-is-success"),
      error: "".concat(e, "-is-error"),
      warning: "".concat(e, "-is-warning"),
      selected: "".concat(e, "-is-selected"),
      active: "".concat(e, "-is-active"),
      checked: "".concat(e, "-is-checked"),
      current: "".concat(e, "-is-current"),
      hidden: "".concat(e, "-is-hidden"),
      visible: "".concat(e, "-is-visible"),
      expanded: "".concat(e, "-is-expanded"),
      indeterminate: "".concat(e, "-is-indeterminate")
    }
  };
}
function b(e) {
  var o = re().SIZE, t = r.computed(() => e.value in o ? o[e.value] : ""), l = r.computed(() => e.value === void 0 || e.value in o ? {} : {
    fontSize: e.value
  });
  return {
    style: l,
    className: t
  };
}
function $(e, o) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    o && (l = l.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), t.push.apply(t, l);
  }
  return t;
}
function M(e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o] != null ? arguments[o] : {};
    o % 2 ? $(Object(t), !0).forEach(function(l) {
      x(e, l, t[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : $(Object(t)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
    });
  }
  return e;
}
var te = {
  tag: "svg",
  attrs: {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em"
  },
  children: [{
    tag: "g",
    attrs: {
      id: "copy"
    },
    children: [{
      tag: "path",
      attrs: {
        id: "fill1",
        fill: "props.fillColor1",
        d: "M10 10H21V21H10z"
      }
    }, {
      tag: "path",
      attrs: {
        id: "stroke1",
        stroke: "props.strokeColor1",
        d: "M10 10H21V21H10V10Z",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }, {
      tag: "path",
      attrs: {
        id: "stroke2",
        stroke: "props.strokeColor2",
        d: "M14 6.5V3L3 3L3 14H6.5",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }]
  }]
}, N = r.defineComponent({
  name: "CopyIcon",
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    },
    fillColor: {
      type: [Array, String]
    },
    strokeColor: {
      type: [Array, String]
    },
    strokeWidth: {
      type: Number
    }
  },
  setup(e, o) {
    var {
      attrs: t
    } = o, l = r.computed(() => e.size), i = r.computed(() => e.strokeColor ? Array.isArray(e.strokeColor) ? e.strokeColor[0] : e.strokeColor : "currentColor"), d = r.computed(() => {
      var a;
      return e.strokeColor ? Array.isArray(e.strokeColor) ? (a = e.strokeColor[1]) !== null && a !== void 0 ? a : e.strokeColor[0] : e.strokeColor : "currentColor";
    }), f = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "transparent"), u = r.computed(() => {
      var a;
      return e.fillColor ? Array.isArray(e.fillColor) ? (a = e.fillColor[1]) !== null && a !== void 0 ? a : e.fillColor[0] : e.fillColor : "transparent";
    }), m = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "currentColor"), {
      className: v,
      style: y
    } = b(l), C = r.computed(() => ["t-icon", "t-icon-copy", v.value]), n = r.computed(() => M(M({
      fill: "none"
    }, y.value), t.style)), c = r.computed(() => ({
      class: C.value,
      style: n.value,
      onClick: (a) => {
        var s;
        return (s = e.onClick) === null || s === void 0 ? void 0 : s.call(e, {
          e: a
        });
      },
      strokeColor1: i.value,
      strokeColor2: d.value,
      fillColor1: f.value,
      fillColor2: u.value,
      strokeWidth: e.strokeWidth || 2,
      filledColor: m.value
    }));
    return () => p(te, c.value);
  }
});
function W(e, o) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    o && (l = l.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), t.push.apply(t, l);
  }
  return t;
}
function L(e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o] != null ? arguments[o] : {};
    o % 2 ? W(Object(t), !0).forEach(function(l) {
      x(e, l, t[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : W(Object(t)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
    });
  }
  return e;
}
var oe = {
  tag: "svg",
  attrs: {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em"
  },
  children: [{
    tag: "g",
    attrs: {
      id: "key"
    },
    children: [{
      tag: "path",
      attrs: {
        id: "fill1",
        fill: "props.fillColor1",
        d: "M11.5355 15.5355C9.58291 17.4882 6.41709 17.4882 4.46447 15.5355C2.51184 13.5829 2.51184 10.4171 4.46447 8.46447C6.41709 6.51184 9.58291 6.51184 11.5355 8.46447C13.4882 10.4171 13.4882 13.5829 11.5355 15.5355Z"
      }
    }, {
      tag: "path",
      attrs: {
        id: "stroke1",
        stroke: "props.strokeColor1",
        d: "M14 12H21M16.5 14.9985V12M19.5 14V12M11.5355 15.5355C9.58291 17.4882 6.41709 17.4882 4.46447 15.5355C2.51184 13.5829 2.51184 10.4171 4.46447 8.46447C6.41709 6.51184 9.58291 6.51184 11.5355 8.46447C13.4882 10.4171 13.4882 13.5829 11.5355 15.5355Z",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }]
  }]
}, le = r.defineComponent({
  name: "KeyIcon",
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    },
    fillColor: {
      type: [Array, String]
    },
    strokeColor: {
      type: [Array, String]
    },
    strokeWidth: {
      type: Number
    }
  },
  setup(e, o) {
    var {
      attrs: t
    } = o, l = r.computed(() => e.size), i = r.computed(() => e.strokeColor ? Array.isArray(e.strokeColor) ? e.strokeColor[0] : e.strokeColor : "currentColor"), d = r.computed(() => {
      var a;
      return e.strokeColor ? Array.isArray(e.strokeColor) ? (a = e.strokeColor[1]) !== null && a !== void 0 ? a : e.strokeColor[0] : e.strokeColor : "currentColor";
    }), f = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "transparent"), u = r.computed(() => {
      var a;
      return e.fillColor ? Array.isArray(e.fillColor) ? (a = e.fillColor[1]) !== null && a !== void 0 ? a : e.fillColor[0] : e.fillColor : "transparent";
    }), m = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "currentColor"), {
      className: v,
      style: y
    } = b(l), C = r.computed(() => ["t-icon", "t-icon-key", v.value]), n = r.computed(() => L(L({
      fill: "none"
    }, y.value), t.style)), c = r.computed(() => ({
      class: C.value,
      style: n.value,
      onClick: (a) => {
        var s;
        return (s = e.onClick) === null || s === void 0 ? void 0 : s.call(e, {
          e: a
        });
      },
      strokeColor1: i.value,
      strokeColor2: d.value,
      fillColor1: f.value,
      fillColor2: u.value,
      strokeWidth: e.strokeWidth || 2,
      filledColor: m.value
    }));
    return () => p(oe, c.value);
  }
});
function T(e, o) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    o && (l = l.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), t.push.apply(t, l);
  }
  return t;
}
function D(e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o] != null ? arguments[o] : {};
    o % 2 ? T(Object(t), !0).forEach(function(l) {
      x(e, l, t[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : T(Object(t)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
    });
  }
  return e;
}
var ae = {
  tag: "svg",
  attrs: {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em"
  },
  children: [{
    tag: "g",
    attrs: {
      id: "link"
    },
    children: [{
      tag: "path",
      attrs: {
        id: "stroke1",
        stroke: "props.strokeColor1",
        d: "M11.6762 6.99023L13.9998 4.6666C15.4726 3.19382 17.8604 3.19382 19.3332 4.6666C20.806 6.13938 20.806 8.52723 19.3332 10L17.0096 12.3236M6.98974 11.6766L4.66611 14.0003C3.19333 15.4731 3.19333 17.8609 4.66611 19.3337C6.13889 20.8065 8.52675 20.8065 9.99953 19.3337L12.3232 17.0101M13.9985 9.99989L9.99847 14",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }]
  }]
}, ne = r.defineComponent({
  name: "LinkIcon",
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    },
    fillColor: {
      type: [Array, String]
    },
    strokeColor: {
      type: [Array, String]
    },
    strokeWidth: {
      type: Number
    }
  },
  setup(e, o) {
    var {
      attrs: t
    } = o, l = r.computed(() => e.size), i = r.computed(() => e.strokeColor ? Array.isArray(e.strokeColor) ? e.strokeColor[0] : e.strokeColor : "currentColor"), d = r.computed(() => {
      var a;
      return e.strokeColor ? Array.isArray(e.strokeColor) ? (a = e.strokeColor[1]) !== null && a !== void 0 ? a : e.strokeColor[0] : e.strokeColor : "currentColor";
    }), f = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "transparent"), u = r.computed(() => {
      var a;
      return e.fillColor ? Array.isArray(e.fillColor) ? (a = e.fillColor[1]) !== null && a !== void 0 ? a : e.fillColor[0] : e.fillColor : "transparent";
    }), m = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "currentColor"), {
      className: v,
      style: y
    } = b(l), C = r.computed(() => ["t-icon", "t-icon-link", v.value]), n = r.computed(() => D(D({
      fill: "none"
    }, y.value), t.style)), c = r.computed(() => ({
      class: C.value,
      style: n.value,
      onClick: (a) => {
        var s;
        return (s = e.onClick) === null || s === void 0 ? void 0 : s.call(e, {
          e: a
        });
      },
      strokeColor1: i.value,
      strokeColor2: d.value,
      fillColor1: f.value,
      fillColor2: u.value,
      strokeWidth: e.strokeWidth || 2,
      filledColor: m.value
    }));
    return () => p(ae, c.value);
  }
});
function z(e, o) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    o && (l = l.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), t.push.apply(t, l);
  }
  return t;
}
function q(e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o] != null ? arguments[o] : {};
    o % 2 ? z(Object(t), !0).forEach(function(l) {
      x(e, l, t[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : z(Object(t)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
    });
  }
  return e;
}
var ie = {
  tag: "svg",
  attrs: {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em"
  },
  children: [{
    tag: "g",
    attrs: {
      id: "lock-on"
    },
    children: [{
      tag: "path",
      attrs: {
        id: "fill1",
        fill: "props.fillColor1",
        d: "M4.49951 10H19.4995V21H4.49951V10Z"
      }
    }, {
      tag: "g",
      attrs: {
        id: "stroke1"
      },
      children: [{
        tag: "path",
        attrs: {
          stroke: "props.strokeColor1",
          d: "M4.49951 11H19.4995V21H4.49951V11Z",
          strokeLinecap: "square",
          strokeWidth: "props.strokeWidth"
        }
      }, {
        tag: "path",
        attrs: {
          stroke: "props.strokeColor1",
          d: "M6.99951 7C6.99951 4.23858 9.23809 2 11.9995 2C14.7609 2 16.9995 4.23858 16.9995 7V11H6.99951V7Z",
          strokeLinecap: "square",
          strokeWidth: "props.strokeWidth"
        }
      }]
    }, {
      tag: "path",
      attrs: {
        id: "stroke2",
        stroke: "props.strokeColor2",
        d: "M9.99951 16H13.9995",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }]
  }]
}, ce = r.defineComponent({
  name: "LockOnIcon",
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    },
    fillColor: {
      type: [Array, String]
    },
    strokeColor: {
      type: [Array, String]
    },
    strokeWidth: {
      type: Number
    }
  },
  setup(e, o) {
    var {
      attrs: t
    } = o, l = r.computed(() => e.size), i = r.computed(() => e.strokeColor ? Array.isArray(e.strokeColor) ? e.strokeColor[0] : e.strokeColor : "currentColor"), d = r.computed(() => {
      var a;
      return e.strokeColor ? Array.isArray(e.strokeColor) ? (a = e.strokeColor[1]) !== null && a !== void 0 ? a : e.strokeColor[0] : e.strokeColor : "currentColor";
    }), f = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "transparent"), u = r.computed(() => {
      var a;
      return e.fillColor ? Array.isArray(e.fillColor) ? (a = e.fillColor[1]) !== null && a !== void 0 ? a : e.fillColor[0] : e.fillColor : "transparent";
    }), m = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "currentColor"), {
      className: v,
      style: y
    } = b(l), C = r.computed(() => ["t-icon", "t-icon-lock-on", v.value]), n = r.computed(() => q(q({
      fill: "none"
    }, y.value), t.style)), c = r.computed(() => ({
      class: C.value,
      style: n.value,
      onClick: (a) => {
        var s;
        return (s = e.onClick) === null || s === void 0 ? void 0 : s.call(e, {
          e: a
        });
      },
      strokeColor1: i.value,
      strokeColor2: d.value,
      fillColor1: f.value,
      fillColor2: u.value,
      strokeWidth: e.strokeWidth || 2,
      filledColor: m.value
    }));
    return () => p(ie, c.value);
  }
});
function H(e, o) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    o && (l = l.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), t.push.apply(t, l);
  }
  return t;
}
function K(e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o] != null ? arguments[o] : {};
    o % 2 ? H(Object(t), !0).forEach(function(l) {
      x(e, l, t[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : H(Object(t)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
    });
  }
  return e;
}
var se = {
  tag: "svg",
  attrs: {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em"
  },
  children: [{
    tag: "g",
    attrs: {
      id: "refresh"
    },
    children: [{
      tag: "path",
      attrs: {
        id: "stroke1",
        stroke: "props.strokeColor1",
        d: "M21.448 13C20.9483 17.7767 16.909 21.5 12 21.5C8.18227 21.5 4.89052 19.248 3.38065 16M2.5 20.5V15.5H5.5M2.55176 11C3.05145 6.22334 7.09079 2.5 11.9998 2.5C15.8175 2.5 19.1092 4.75197 20.6191 8M21.4998 3.5V8.5H18.4998",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }]
  }]
}, I = r.defineComponent({
  name: "RefreshIcon",
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    },
    fillColor: {
      type: [Array, String]
    },
    strokeColor: {
      type: [Array, String]
    },
    strokeWidth: {
      type: Number
    }
  },
  setup(e, o) {
    var {
      attrs: t
    } = o, l = r.computed(() => e.size), i = r.computed(() => e.strokeColor ? Array.isArray(e.strokeColor) ? e.strokeColor[0] : e.strokeColor : "currentColor"), d = r.computed(() => {
      var a;
      return e.strokeColor ? Array.isArray(e.strokeColor) ? (a = e.strokeColor[1]) !== null && a !== void 0 ? a : e.strokeColor[0] : e.strokeColor : "currentColor";
    }), f = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "transparent"), u = r.computed(() => {
      var a;
      return e.fillColor ? Array.isArray(e.fillColor) ? (a = e.fillColor[1]) !== null && a !== void 0 ? a : e.fillColor[0] : e.fillColor : "transparent";
    }), m = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "currentColor"), {
      className: v,
      style: y
    } = b(l), C = r.computed(() => ["t-icon", "t-icon-refresh", v.value]), n = r.computed(() => K(K({
      fill: "none"
    }, y.value), t.style)), c = r.computed(() => ({
      class: C.value,
      style: n.value,
      onClick: (a) => {
        var s;
        return (s = e.onClick) === null || s === void 0 ? void 0 : s.call(e, {
          e: a
        });
      },
      strokeColor1: i.value,
      strokeColor2: d.value,
      fillColor1: f.value,
      fillColor2: u.value,
      strokeWidth: e.strokeWidth || 2,
      filledColor: m.value
    }));
    return () => p(se, c.value);
  }
});
function B(e, o) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    o && (l = l.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), t.push.apply(t, l);
  }
  return t;
}
function R(e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o] != null ? arguments[o] : {};
    o % 2 ? B(Object(t), !0).forEach(function(l) {
      x(e, l, t[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : B(Object(t)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
    });
  }
  return e;
}
var ue = {
  tag: "svg",
  attrs: {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em"
  },
  children: [{
    tag: "g",
    attrs: {
      id: "tools"
    },
    children: [{
      tag: "path",
      attrs: {
        id: "stroke1",
        stroke: "props.strokeColor1",
        d: "M21.7607 16.8119L16.9063 11.9575C17.699 9.38593 17.0789 6.47326 15.0432 4.43757C12.8445 2.23891 9.62043 1.68993 6.91077 2.79202L6.91146 3.37691L11.1541 7.61955L7.61857 11.1551L3.37593 6.91244L2.79105 6.91175C1.68895 9.6214 2.23793 12.8455 4.43659 15.0442C6.47228 17.0799 9.38496 17.7 11.9565 16.9072L16.811 21.7617M15.75 15.7513L19.2855 19.2868",
        strokeLinecap: "square",
        strokeWidth: "props.strokeWidth"
      }
    }]
  }]
}, de = r.defineComponent({
  name: "ToolsIcon",
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    },
    fillColor: {
      type: [Array, String]
    },
    strokeColor: {
      type: [Array, String]
    },
    strokeWidth: {
      type: Number
    }
  },
  setup(e, o) {
    var {
      attrs: t
    } = o, l = r.computed(() => e.size), i = r.computed(() => e.strokeColor ? Array.isArray(e.strokeColor) ? e.strokeColor[0] : e.strokeColor : "currentColor"), d = r.computed(() => {
      var a;
      return e.strokeColor ? Array.isArray(e.strokeColor) ? (a = e.strokeColor[1]) !== null && a !== void 0 ? a : e.strokeColor[0] : e.strokeColor : "currentColor";
    }), f = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "transparent"), u = r.computed(() => {
      var a;
      return e.fillColor ? Array.isArray(e.fillColor) ? (a = e.fillColor[1]) !== null && a !== void 0 ? a : e.fillColor[0] : e.fillColor : "transparent";
    }), m = r.computed(() => e.fillColor ? Array.isArray(e.fillColor) ? e.fillColor[0] : e.fillColor : "currentColor"), {
      className: v,
      style: y
    } = b(l), C = r.computed(() => ["t-icon", "t-icon-tools", v.value]), n = r.computed(() => R(R({
      fill: "none"
    }, y.value), t.style)), c = r.computed(() => ({
      class: C.value,
      style: n.value,
      onClick: (a) => {
        var s;
        return (s = e.onClick) === null || s === void 0 ? void 0 : s.call(e, {
          e: a
        });
      },
      strokeColor1: i.value,
      strokeColor2: d.value,
      fillColor1: f.value,
      fillColor2: u.value,
      strokeWidth: e.strokeWidth || 2,
      filledColor: m.value
    }));
    return () => p(ue, c.value);
  }
}), V, F;
function fe() {
  return F || (F = 1, V = mslxRequest), V;
}
var ve = fe();
const A = /* @__PURE__ */ U(ve), Ce = /* @__PURE__ */ r.defineComponent({
  __name: "McpPage",
  setup(e) {
    const o = r.ref(!0), t = r.ref(null), l = r.ref(!1), i = r.ref(!1), d = (n) => n && typeof n == "object" && "data" in n && n.data != null ? n.data : n, f = async () => {
      o.value = !0;
      try {
        const n = await A.get({ url: "/api/plugin/mslx-plugin-mcp/config" });
        t.value = d(n);
      } catch (n) {
        k.MessagePlugin.error("读取插件配置失败：" + (n?.message || "未知错误"));
      } finally {
        o.value = !1;
      }
    }, u = async (n, c = "已复制") => {
      try {
        await navigator.clipboard.writeText(n), k.MessagePlugin.success(c);
      } catch {
        k.MessagePlugin.warning("复制失败，请手动选择复制");
      }
    }, m = async () => {
      try {
        const n = await A.post({ url: "/api/plugin/mslx-plugin-mcp/regenerate-key" }), c = d(n);
        t.value && (t.value.apiKey = c.apiKey), k.MessagePlugin.success("API Key 已重置，请同步更新 MCP 客户端");
      } catch (n) {
        k.MessagePlugin.error("重置失败：" + (n?.message || "未知错误"));
      }
    }, v = async (n, c) => {
      if (t.value) {
        t.value[n] = c, i.value = !0;
        try {
          const a = {};
          a[n] = c, await A.post({ url: "/api/plugin/mslx-plugin-mcp/settings", data: a }), k.MessagePlugin.success("已保存");
        } catch (a) {
          t.value[n] = !c, k.MessagePlugin.error("保存失败：" + (a?.message || "未知错误"));
        } finally {
          i.value = !1;
        }
      }
    }, y = () => {
      const n = t.value?.apiKey || "";
      return l.value ? n : n.length > 12 ? n.slice(0, 6) + "••••••••" + n.slice(-4) : "••••••••";
    }, C = () => {
      const n = t.value?.mcpUrl || "";
      return JSON.stringify(
        {
          mcpServers: {
            mslx: {
              type: "http",
              url: n,
              headers: { "x-api-key": "<面板 → 用户管理 → API 密钥>" }
            }
          }
        },
        null,
        2
      );
    };
    return r.onMounted(f), (n, c) => {
      const a = r.resolveComponent("t-tag"), s = r.resolveComponent("t-button"), Z = r.resolveComponent("t-loading"), P = r.resolveComponent("t-input"), j = r.resolveComponent("t-switch");
      return r.openBlock(), r.createElementBlock("div", { class: "design-card relative flex flex-col rounded-2xl border border-[var(--td-component-border)] shadow-sm p-5 sm:p-6" }, [
        r.createElementVNode("div", { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--td-component-border)]" }, [
          r.createElementVNode("div", { class: "flex items-center gap-3" }, [
            r.createElementVNode("div", { class: "w-1.5 h-5 bg-[var(--color-primary)] rounded-full shadow-[0_0_8px_var(--color-primary-light)] opacity-90" }),
            r.createElementVNode("div", { class: "flex flex-col" }, [
              r.createElementVNode("h2", { class: "text-lg font-bold m-0 text-[var(--td-text-color-primary)]" }, "MCP 控制台"),
              r.createElementVNode("span", { class: "text-xs text-[var(--td-text-color-secondary)] mt-0.5" }, "为 AI 客户端提供实例命令、控制、配置与文件读写能力")
            ])
          ]),
          r.createElementVNode("div", { class: "flex items-center gap-2" }, [
            t.value ? (r.openBlock(), r.createBlock(a, {
              key: 0,
              theme: "success",
              variant: "light-outline",
              shape: "round",
              size: "small"
            }, {
              default: r.withCtx(() => [
                r.createTextVNode(r.toDisplayString(t.value.toolCount) + " 个工具 ", 1)
              ]),
              _: 1
            })) : r.createCommentVNode("", !0),
            r.createVNode(s, {
              size: "small",
              variant: "outline",
              loading: o.value,
              onClick: f
            }, {
              icon: r.withCtx(() => [
                r.createVNode(r.unref(I))
              ]),
              default: r.withCtx(() => [
                r.createTextVNode(" 刷新 ")
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        o.value && !t.value ? (r.openBlock(), r.createElementBlock("div", {
          key: 0,
          class: "flex justify-center py-12"
        }, [
          r.createVNode(Z, {
            size: "28px",
            text: "加载中..."
          })
        ])) : t.value ? (r.openBlock(), r.createElementBlock("div", {
          key: 1,
          class: "flex flex-col gap-5 pt-5"
        }, [
          r.createElementVNode("section", { class: "flex flex-col gap-3" }, [
            r.createElementVNode("div", { class: "flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]" }, [
              r.createVNode(r.unref(ne), { class: "text-[var(--color-primary)]" }),
              r.createTextVNode(" 连接信息 ")
            ]),
            r.createElementVNode("div", { class: "flex flex-col gap-2" }, [
              r.createElementVNode("label", { class: "text-xs text-[var(--td-text-color-secondary)]" }, "MCP 端点地址（Streamable HTTP）"),
              r.createElementVNode("div", { class: "flex flex-col sm:flex-row gap-2" }, [
                r.createVNode(P, {
                  value: t.value.mcpUrl,
                  readonly: "",
                  class: "flex-grow"
                }, null, 8, ["value"]),
                r.createVNode(s, {
                  variant: "outline",
                  onClick: c[0] || (c[0] = (g) => u(t.value.mcpUrl, "已复制端点地址"))
                }, {
                  icon: r.withCtx(() => [
                    r.createVNode(r.unref(N))
                  ]),
                  default: r.withCtx(() => [
                    r.createTextVNode(" 复制 ")
                  ]),
                  _: 1
                })
              ]),
              r.createElementVNode("p", { class: "text-xs text-[var(--td-text-color-placeholder)] m-0" }, [
                r.createTextVNode(" 自动生成，无需手填：就是当前面板地址 + 固定路径 "),
                r.createElementVNode("code", null, "/api/plugin/mslx-plugin-mcp/mcp"),
                r.createTextVNode("（只读，复制给 AI 客户端即可）。 ")
              ])
            ]),
            r.createElementVNode("div", { class: "flex flex-col gap-2" }, [
              r.createElementVNode("label", { class: "text-xs text-[var(--td-text-color-secondary)]" }, "插件自带 Key（可选，兼容旧客户端）"),
              r.createElementVNode("div", { class: "flex flex-col sm:flex-row gap-2" }, [
                r.createVNode(P, {
                  value: y(),
                  readonly: "",
                  class: "flex-grow font-mono"
                }, null, 8, ["value"]),
                r.createVNode(s, {
                  variant: "outline",
                  onClick: c[1] || (c[1] = (g) => l.value = !l.value)
                }, {
                  icon: r.withCtx(() => [
                    r.createVNode(r.unref(le))
                  ]),
                  default: r.withCtx(() => [
                    r.createTextVNode(" " + r.toDisplayString(l.value ? "隐藏" : "显示"), 1)
                  ]),
                  _: 1
                }),
                r.createVNode(s, {
                  variant: "outline",
                  onClick: c[2] || (c[2] = (g) => u(t.value.apiKey, "已复制 API Key"))
                }, {
                  icon: r.withCtx(() => [
                    r.createVNode(r.unref(N))
                  ]),
                  default: r.withCtx(() => [
                    r.createTextVNode(" 复制 ")
                  ]),
                  _: 1
                }),
                r.createVNode(s, {
                  theme: "warning",
                  variant: "outline",
                  onClick: m
                }, {
                  icon: r.withCtx(() => [
                    r.createVNode(r.unref(I))
                  ]),
                  default: r.withCtx(() => [
                    r.createTextVNode(" 重置 ")
                  ]),
                  _: 1
                })
              ]),
              r.createElementVNode("p", { class: "text-xs text-[var(--td-text-color-placeholder)] m-0" }, [
                r.createTextVNode(" 一般用不上：端点挂在宿主 /api 下，客户端带上宿主的 "),
                r.createElementVNode("code", null, "x-api-key"),
                r.createTextVNode("（面板 → 用户管理 → API 密钥）即可，长期有效。这个 Key 只在需要绕过宿主鉴权直连时才有意义。 ")
              ])
            ])
          ]),
          r.createElementVNode("section", { class: "flex flex-col gap-3" }, [
            r.createElementVNode("div", { class: "flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]" }, [
              r.createVNode(r.unref(ce), { class: "text-[var(--color-primary)]" }),
              r.createTextVNode(" 安全开关 ")
            ]),
            r.createElementVNode("div", { class: "rounded-xl border border-[var(--td-component-border)] bg-[var(--td-bg-color-secondarycontainer)] p-4 flex flex-col gap-4" }, [
              r.createElementVNode("div", { class: "flex items-center justify-between gap-4" }, [
                r.createElementVNode("div", { class: "flex flex-col" }, [
                  r.createElementVNode("span", { class: "text-sm text-[var(--td-text-color-primary)]" }, "允许文件写入（edit_file）"),
                  r.createElementVNode("span", { class: "text-xs text-[var(--td-text-color-secondary)] mt-0.5" }, "关闭后仅可读文件，禁止任何写入。写入前会自动备份。")
                ]),
                r.createVNode(j, {
                  value: t.value.allowFileWrite,
                  loading: i.value,
                  onChange: c[3] || (c[3] = (g) => v("allowFileWrite", !!g))
                }, null, 8, ["value", "loading"])
              ]),
              r.createElementVNode("div", { class: "h-px bg-[var(--td-component-border)]" }),
              r.createElementVNode("div", { class: "flex items-center justify-between gap-4" }, [
                r.createElementVNode("div", { class: "flex flex-col" }, [
                  r.createElementVNode("span", { class: "text-sm text-[var(--td-text-color-primary)]" }, "允许启停 / 结束实例（instance_power）"),
                  r.createElementVNode("span", { class: "text-xs text-[var(--td-text-color-secondary)] mt-0.5" }, "关闭后 AI 无法启动、停止、重启或强杀服务器。")
                ]),
                r.createVNode(j, {
                  value: t.value.allowHeavyOps,
                  loading: i.value,
                  onChange: c[4] || (c[4] = (g) => v("allowHeavyOps", !!g))
                }, null, 8, ["value", "loading"])
              ])
            ])
          ]),
          r.createElementVNode("section", { class: "flex flex-col gap-3" }, [
            r.createElementVNode("div", { class: "flex items-center justify-between gap-2" }, [
              r.createElementVNode("div", { class: "flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]" }, [
                r.createVNode(r.unref(de), { class: "text-[var(--color-primary)]" }),
                r.createTextVNode(" 客户端配置示例 ")
              ]),
              r.createVNode(s, {
                size: "small",
                variant: "text",
                onClick: c[5] || (c[5] = (g) => u(C(), "已复制配置 JSON"))
              }, {
                icon: r.withCtx(() => [
                  r.createVNode(r.unref(N))
                ]),
                default: r.withCtx(() => [
                  r.createTextVNode(" 复制 JSON ")
                ]),
                _: 1
              })
            ]),
            r.createElementVNode("div", { class: "overflow-x-auto rounded-xl border border-[var(--td-component-border)] bg-[#1e1e1e]" }, [
              r.createElementVNode("pre", { class: "m-0 p-4 text-[13px] leading-relaxed font-mono text-[#d4d4d4]" }, [
                r.createElementVNode("code", null, r.toDisplayString(C()), 1)
              ])
            ]),
            r.createElementVNode("p", { class: "text-xs text-[var(--td-text-color-secondary)] m-0 leading-relaxed" }, " 支持纯 JSON 响应模式（Streamable HTTP）。若客户端只支持 SSE，请改用支持 HTTP 的 MCP 客户端（如 Claude Desktop、Cursor、Cherry Studio 等）。 ")
          ])
        ])) : r.createCommentVNode("", !0)
      ]);
    };
  }
}), me = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [l, i] of o)
    t[l] = i;
  return t;
}, ye = /* @__PURE__ */ me(Ce, [["__scopeId", "data-v-b155a86d"]]), ge = {
  name: "MSLX.Plugin.Mcp",
  version: "1.0.0",
  // 注入一级菜单 + 单页
  routes: [
    {
      path: "/plugin-mcp",
      name: "MslxMcpBase",
      component: "HOST_LAYOUT",
      meta: { title: "MCP 控制台", icon: "api", roleCode: ["admin", "user"] },
      children: [
        {
          path: "",
          name: "MslxMcpPage",
          component: ye,
          meta: { title: "MCP 控制台", hidden: !0, roleCode: ["admin", "user"] }
        }
      ]
    }
  ]
};
export {
  ge as pluginConfig
};
