const Z = (e, s) => {
  const r = {};
  return s === "width" ? Object.keys(e).map((t) => ({
    alias: t,
    width: e[t].width
  })).sort(
    (t, i) => t.width > i.width ? 1 : i.width > t.width ? -1 : 0
  ).forEach((t, i) => {
    r[t.alias] = i ? e[t.alias][s] : 0;
  }) : Object.keys(e).forEach((t) => {
    r[t] = e[t][s];
  }), r;
}, R = ({
  bridge: e,
  bp: s,
  insertionType: r,
  node: t,
  context: i
}) => {
  let n = i.document.getElementById("layouter-" + s);
  if (!n) {
    n = i.document.createElement("style"), n.appendChild(i.document.createTextNode(""));
    const l = t.parentNode;
    switch (r) {
      case "before":
        l.insertBefore(n, t);
        break;
      case "after":
        t.nextSibling ? l.insertBefore(n, t.nextSibling) : l.appendChild(n);
        break;
      case "append":
        t.appendChild(n);
        break;
    }
    n.id = "layouter-" + s;
  }
  let o;
  return e ? o = {
    method: n.sheet,
    node: n
  } : o = {
    method: {
      insertRule: (l) => {
        n.appendChild(
          i.document.createTextNode(l)
        );
      },
      rules: []
    },
    node: n
  }, o;
}, je = ({
  breakpoints: e,
  bridge: s,
  scope: r,
  context: t
}) => {
  const i = r || {};
  return Object.keys(e).forEach((n) => {
    i[n] || (i[n] = R({
      bridge: s,
      bp: n,
      insertionType: "append",
      node: t.document.body,
      context: t
    }));
  }), i;
}, Ae = (e, s) => {
  const r = {};
  return Object.keys(s).forEach((t) => r[t] = e[t]), r;
}, Oe = {
  xs: {
    width: 360,
    cols: 15
  },
  sm: {
    width: 600,
    cols: 25
  },
  md: {
    width: 900,
    cols: 31
  },
  lg: {
    width: 1200,
    cols: 41
  },
  xlg: {
    width: 1536,
    cols: 51
  }
};
let M = {
  prefix: "",
  breakpoints: Oe,
  bridge: !0,
  debug: !0,
  searchOnInit: !0,
  observer: !0
}, x;
const se = ({
  bps: e,
  bridge: s,
  scope: r,
  context: t
}) => {
  const i = Z(e, "width"), n = Ae(e, i);
  return {
    sizes: i,
    cols: Z(e, "cols"),
    scope: je({
      breakpoints: n,
      bridge: s,
      scope: r,
      context: t
    }),
    breakpoints: n
  };
}, Me = (e, s = {}) => {
  const r = e.layouterConfig || {};
  return M = {
    ...M,
    ...s,
    ...r
  }, x = {
    context: e,
    ...M,
    ...se({
      bps: M.breakpoints,
      bridge: M.bridge,
      context: e
    }),
    styles: {},
    version: "1.9.1"
  }, x;
}, g = () => x, Be = (e, s) => {
  x.styles[e] = s;
}, Se = (e) => (x = {
  ...x,
  ...e
}, e.breakpoints && (x = {
  ...x,
  ...se({
    bps: x.breakpoints,
    bridge: x.bridge,
    scope: x.scope,
    context: x.context
  })
}), x), S = (e) => {
  let s, r = e, t = !1;
  const i = r.includes("@");
  if (i) {
    const n = r.split("@");
    r = n[0], s = n[1];
  } else {
    const n = g();
    s = Object.keys(n.breakpoints)[0];
  }
  return e.includes("!") && (t = !0, s = s.replace(/!/g, ""), r = r.replace(/!/g, "")), {
    widthBp: i,
    numbers: r,
    breakPoints: s,
    important: t
  };
}, O = (e, s, r) => {
  const t = new Error();
  return t.name = e, t.message = s, g().debug && (console.error(t), r && console.log(r)), t;
}, te = (e, s) => {
  const r = e * 100 / s;
  return (r - Math.floor(r) !== 0 ? r.toFixed(3) : r) + "%";
}, Ee = (e) => {
  const s = e.replace(/!/g, ""), r = s.indexOf("@"), t = g(), i = t.scope, n = t.bridge, o = t.context;
  if (r === -1) {
    const u = Object.keys(t.breakpoints)[0];
    return i[u];
  }
  const l = s.substring(r + 1);
  if (!l.includes("-"))
    return i[l];
  if (l.substring(0, 1) === "-") {
    if (i[l])
      return i[l];
    const u = l.substring(1);
    return i[l] = R({
      bridge: n,
      bp: l,
      insertionType: "before",
      node: i[u].node,
      context: o
    }), i[l];
  }
  if (i[l])
    return i[l];
  const a = l.split("-")[0];
  return i[l] = R({
    bridge: n,
    bp: l,
    insertionType: "after",
    node: i[a].node,
    context: o
  }), i[l];
}, re = (e) => {
  const s = g();
  for (const r in e)
    if (!s.styles[r]) {
      const t = Ee(r), i = e[r], n = t.method.rules;
      t.method.insertRule(i, n ? n.length : 0), Be(r, i);
    }
}, p = {
  jc: {
    ruleCss: "justify-content",
    classPrefix: "jc"
  },
  ai: {
    ruleCss: "align-items",
    classPrefix: "ai"
  },
  ce: {
    ruleCss: "center",
    classPrefix: "ce"
  },
  fs: {
    ruleCss: "flex-start",
    classPrefix: "fs"
  },
  fe: {
    ruleCss: "flex-end",
    classPrefix: "fe"
  },
  sb: {
    ruleCss: "space-between",
    classPrefix: "sb"
  },
  sa: {
    ruleCss: "space-around",
    classPrefix: "sa"
  },
  fw: {
    ruleCss: "flex-wrap",
    classPrefix: "fw"
  },
  nw: {
    ruleCss: "nowrap",
    classPrefix: "nw"
  },
  w: {
    ruleCss: "wrap",
    classPrefix: "w"
  },
  wr: {
    ruleCss: "wrap-reverse",
    classPrefix: "wr"
  },
  fd: {
    ruleCss: "flex-direction",
    classPrefix: "fd"
  },
  r: {
    ruleCss: "row",
    classPrefix: "r"
  },
  rr: {
    ruleCss: "row-reverse",
    classPrefix: "rr"
  },
  co: {
    ruleCss: "column",
    classPrefix: "co"
  },
  cor: {
    ruleCss: "column-reverse",
    classPrefix: "co"
  },
  au: {
    ruleCss: "auto",
    classPrefix: "au"
  },
  st: {
    ruleCss: "stretch",
    classPrefix: "st"
  },
  bl: {
    ruleCss: "baseline",
    classPrefix: "bl"
  },
  in: {
    ruleCss: "initial",
    classPrefix: "in"
  },
  ih: {
    ruleCss: "inherit",
    classPrefix: "ih"
  }
}, B = {
  fg: {
    ruleCss: "flex-grow",
    classPrefix: "fg"
  },
  fh: {
    ruleCss: "flex-shrink",
    classPrefix: "fh"
  },
  as: {
    ruleCss: "align-self",
    classPrefix: "as"
  },
  or: {
    ruleCss: "order",
    classPrefix: "or"
  }
}, ie = {
  ...B,
  "flex-grow": B.fg,
  "flex-shrink": B.fh,
  "align-self": B.as,
  order: B.or
}, A = {
  ...p,
  ...ie,
  "justify-content": p.jc,
  "align-items": p.ai,
  center: p.ce,
  "flex-start": p.fs,
  "flex-end": p.fe,
  "space-between": p.sb,
  "space-around": p.fs,
  "flex-wrap": p.fw,
  nowrap: p.nw,
  w: p.w,
  "wrap-reverse": p.wr,
  "flex-direction": p.fd,
  row: p.r,
  "row-reverse": p.rr,
  column: p.co,
  "column-reverse": p.cor,
  auto: p.au,
  stretch: p.st,
  baseline: p.bl,
  initial: p.in,
  inherit: p.ih
}, ne = Object.keys(ie), Te = (e) => "0¯" + e.replace("%", ""), Le = (e, s) => {
  const r = g(), t = r.sizes, i = r.prefix, n = v[e].ruleCss, o = {};
  return Object.keys(s).forEach((l) => {
    const a = s[l].name;
    let u = a;
    if (a.includes("%") && (u = a.replace(
      a,
      Te(a)
    )), u = (i ? i + "-" : "") + v[e].classPrefix + "-" + u.replace(/\//g, "\\/").replace(/:/g, "\\:").replace("@", "\\@").split(".").join("_"), r.styles[u])
      o[u] = r.styles[u];
    else {
      let h;
      if (e === "flex") {
        h = s[l].value;
        const C = a.includes("!") ? ";display:flex !important;" : ";display:flex;", P = ne.filter(
          (j) => a.includes(j + ":")
        );
        P.length ? P.length + 1 !== a.split(":").length && (h += C) : h += C;
      } else
        h = n + ":" + s[l].value;
      let f = "@media screen and ", y = !1;
      if (!l.includes("-"))
        t[l] ? f += "(min-width: " + t[l] + "px)" : (f = "." + u.replace(/!/g, "\\!") + "{" + h + "}", y = !0);
      else {
        const C = l.split("-"), P = C[0];
        P && (f += "(min-width: " + t[P] + "px) and ");
        const j = C[1];
        f += "(max-width: " + (t[j] - 1) + "px)";
      }
      y || (f += "{." + u.replace(/!/g, "\\!") + "{" + h + "}}"), o[u] = f;
    }
  }), o;
}, Ne = [
  ["/", ""],
  ["\\", "/"],
  ["/:", ":"],
  ["\\:", ":"],
  ["\\@", "@"],
  ["/@", "@"]
], De = (e) => {
  const s = {};
  for (const r in e) {
    let t = r;
    Ne.forEach((i) => {
      t = t.split(i[0]).join(i[1]);
    }), s[t] = e[r];
  }
  return s;
}, E = (e) => {
  const s = Le(e.type, e.bps);
  return e.deep && re(s), De(s);
}, H = (e, s = !1) => {
  let r, t;
  const i = {}, n = g();
  let o, l, a;
  const u = Object.keys(n.breakpoints)[0];
  let d = !1;
  for (const h of e.split(" ")) {
    let f = h;
    if (o = f, a = S(f), t = a.breakPoints, f = a.numbers, f.includes("/")) {
      const y = f.split("/");
      r = [Number(y[0]), Number(y[1])];
    } else if (a.widthBp)
      if (t.includes("-")) {
        d = O(
          "SyntaxError",
          "You can't determine a 'until breakpoint' when use the explicit columns max: " + e
        );
        break;
      } else
        r = [Number(f), n.cols[t]];
    else
      r = [Number(f), n.cols[u]];
    l = te(r[0], r[1]), a.important && (l += " !important"), i[t] = {
      name: o,
      value: l
    };
  }
  return d || E({
    type: "cols",
    bps: i,
    deep: s
  });
}, Y = (e, s = !1) => {
  const r = {};
  let t = !1;
  const i = g(), n = Object.keys(i.breakpoints)[0];
  for (const o of e.split(" ")) {
    let l;
    const a = S(o), u = a.breakPoints, d = a.numbers.split(":"), h = d[0], f = d[1];
    let y;
    if (ne.includes(h))
      l = A[h].ruleCss + ":" + f, y = f;
    else {
      if (!A[h]) {
        t = O(
          "Non-existent Alias",
          "Don't exists the alias '" + h + "' in Flex vault."
        );
        break;
      }
      if (!A[f]) {
        t = O(
          "Non-existent Alias",
          "Don't exists the alias '" + f + "' in Flex vault."
        );
        break;
      }
      l = A[h].ruleCss + ":" + A[f].ruleCss, y = A[f].classPrefix;
    }
    let C = u === n ? "" : "@" + u;
    a.important && (l += " !important", C += "!");
    let P = A[h].classPrefix + ":" + y + C;
    if (!r[u])
      r[u] = {
        name: P,
        value: l
      };
    else {
      P.includes("@") && (P = P.split("@")[0]);
      let j = r[u].name.split("@")[0];
      r[u].name.includes("!") && !j.includes("!") && (j += "!"), r[u].name = j + "-" + P + C, r[u].value += ";" + l;
    }
  }
  return t || E({
    type: "flex",
    bps: r,
    deep: s
  });
}, Fe = ["%", "rem", "em", "ex", "vw", "vh", "pt", "cm", "pc"], Ve = (e) => {
  let s;
  return e.includes("/") ? (s = e.split("/"), s = te(
    parseFloat(s[0]),
    parseFloat(s[1])
  )) : e === "auto" ? s = "auto" : Fe.filter((t) => e.includes(t)).length ? s = e : s = e === "0" ? e : e + "px", s;
}, m = (e, s, r = !1) => {
  const t = {};
  return e.split(" ").forEach((i) => {
    const n = S(i), o = n.breakPoints;
    let l = n.numbers.split("-").map((a) => Ve(a)).join(" ");
    n.important && (l += " !important"), t[o] = {
      name: i,
      value: l
    };
  }), E({
    type: s,
    bps: t,
    deep: r
  });
}, le = (e, s = !1) => m(e, "pad", s), I = (e, s = !1) => m(e, "padt", s), W = (e, s = !1) => m(e, "padr", s), X = (e, s = !1) => m(e, "padb", s), z = (e, s = !1) => m(e, "padl", s), ae = (e, s = !1) => m(e, "mar", s), G = (e, s = !1) => m(e, "mart", s), U = (e, s = !1) => m(e, "marr", s), q = (e, s = !1) => m(e, "marb", s), _ = (e, s = !1) => m(e, "marl", s), oe = (e, s = !1) => m(e, "mxw", s), ce = (e, s = !1) => m(e, "mxh", s), ue = (e, s = !1) => m(e, "miw", s), fe = (e, s = !1) => m(e, "mih", s), de = (e, s = !1) => m(e, "hgt", s), pe = (e, s = !1) => m(e, "wdh", s), k = {
  st: {
    ruleCss: "static",
    classPrefix: "st"
  },
  ab: {
    ruleCss: "absolute",
    classPrefix: "ab"
  },
  fi: {
    ruleCss: "fixed",
    classPrefix: "fi"
  },
  re: {
    ruleCss: "relative",
    classPrefix: "re"
  },
  si: {
    ruleCss: "sticky",
    classPrefix: "si"
  },
  in: {
    ruleCss: "initial",
    classPrefix: "in"
  },
  ih: {
    ruleCss: "inherit",
    classPrefix: "ih"
  }
}, F = {
  ...k,
  static: k.st,
  absolute: k.ab,
  fixed: k.fi,
  relative: k.re,
  sticky: k.si,
  initial: k.in,
  inherit: k.ih
}, me = (e, s = !1) => {
  const r = {};
  let t = !1;
  const i = g(), n = Object.keys(i.breakpoints)[0];
  for (const o of e.split(" ")) {
    let l;
    const a = S(o), u = a.breakPoints, d = a.numbers;
    if (!F[d]) {
      t = O(
        "Non-existent Alias",
        "Don't exists the alias '" + d + "' in Position vault."
      );
      break;
    }
    l = F[d].ruleCss;
    const h = F[d].classPrefix;
    let f = u === n ? "" : "@" + u;
    a.important && (l += " !important", f += "!"), r[u] = {
      name: h + f,
      value: l
    };
  }
  return t || E({
    type: "pos",
    bps: r,
    deep: s
  });
}, be = (e, s = !1) => m(e, "t", s), he = (e, s = !1) => m(e, "r", s), xe = (e, s = !1) => m(e, "b", s), ge = (e, s = !1) => m(e, "l", s), w = {
  bl: {
    ruleCss: "block",
    classPrefix: "bl"
  },
  il: {
    ruleCss: "inline",
    classPrefix: "il"
  },
  ib: {
    ruleCss: "inline-block",
    classPrefix: "ib"
  },
  fx: {
    ruleCss: "flex",
    classPrefix: "fx"
  },
  if: {
    ruleCss: "inline-flex",
    classPrefix: "if"
  },
  no: {
    ruleCss: "none",
    classPrefix: "no"
  },
  in: {
    ruleCss: "initial",
    classPrefix: "in"
  },
  ih: {
    ruleCss: "inherit",
    classPrefix: "ih"
  }
}, V = {
  ...w,
  block: w.bl,
  inline: w.il,
  "inline-block": w.ib,
  flex: w.fx,
  "inline-flex": w.if,
  none: w.no,
  initial: w.in,
  inherit: w.ih
}, Re = (e, s = !1) => {
  const r = {};
  let t = !1;
  const i = g(), n = Object.keys(i.breakpoints)[0];
  for (const o of e.split(" ")) {
    let l;
    const a = S(o), u = a.breakPoints, d = a.numbers;
    if (!V[d]) {
      t = O(
        "Non-existent Alias",
        "Don't exists the alias '" + d + "' in display vault."
      );
      break;
    }
    l = V[d].ruleCss;
    const h = V[d].classPrefix;
    let f = u === n ? "" : "@" + u;
    a.important && (l += " !important", f += "!"), r[u] = {
      name: h + f,
      value: l
    };
  }
  return t || E({
    type: "d",
    bps: r,
    deep: s
  });
}, L = (e) => {
  const s = e.builderA(e.values, e.insertStyles), r = e.builderB(e.values, e.insertStyles), t = {};
  for (const i in s)
    t[i] = s[i];
  for (const i in r)
    t[i] = r[i];
  return t;
}, $ = (e, s = !1) => L({
  values: e,
  builderA: W,
  builderB: z,
  insertStyles: s
}), J = (e, s = !1) => L({
  values: e,
  builderA: I,
  builderB: X,
  insertStyles: s
}), K = (e, s = !1) => L({
  values: e,
  builderA: U,
  builderB: _,
  insertStyles: s
}), Q = (e, s = !1) => L({
  values: e,
  builderA: G,
  builderB: q,
  insertStyles: s
}), c = {
  cols: {
    build: H,
    ruleCss: "width",
    classPrefix: "c"
  },
  // Paddings
  pad: {
    build: le,
    ruleCss: "padding",
    classPrefix: "p"
  },
  padt: {
    build: I,
    ruleCss: "padding-top",
    classPrefix: "pt"
  },
  padr: {
    build: W,
    ruleCss: "padding-right",
    classPrefix: "pr"
  },
  padb: {
    build: X,
    ruleCss: "padding-bottom",
    classPrefix: "pb"
  },
  padl: {
    build: z,
    ruleCss: "padding-left",
    classPrefix: "pl"
  },
  padx: {
    build: $,
    ruleCss: ["padding-left", "padding-right"],
    classPrefix: "px"
  },
  pady: {
    build: J,
    ruleCss: ["padding-top", "padding-bottom"],
    classPrefix: "py"
  },
  // Margin
  mar: {
    build: ae,
    ruleCss: "margin",
    classPrefix: "m"
  },
  mart: {
    build: G,
    ruleCss: "margin-top",
    classPrefix: "mt"
  },
  marr: {
    build: U,
    ruleCss: "margin-right",
    classPrefix: "mr"
  },
  marb: {
    build: q,
    ruleCss: "margin-bottom",
    classPrefix: "mb"
  },
  marl: {
    build: _,
    ruleCss: "margin-left",
    classPrefix: "ml"
  },
  marx: {
    build: K,
    ruleCss: ["margin-left", "margin-right"],
    classPrefix: "px"
  },
  mary: {
    build: Q,
    ruleCss: ["margin-top", "margin-bottom"],
    classPrefix: "py"
  },
  // Flex Box
  flex: {
    build: Y,
    ruleCss: "display: flex",
    classPrefix: "fx"
  },
  // Max & Min Width & Height
  mxw: {
    build: oe,
    ruleCss: "max-width",
    classPrefix: "mxw"
  },
  mxh: {
    build: ce,
    ruleCss: "max-height",
    classPrefix: "mxh"
  },
  miw: {
    build: ue,
    ruleCss: "min-width",
    classPrefix: "miw"
  },
  mih: {
    build: fe,
    ruleCss: "min-height",
    classPrefix: "mih"
  },
  // Width & Height
  wdh: {
    build: pe,
    ruleCss: "width",
    classPrefix: "w"
  },
  hgt: {
    build: de,
    ruleCss: "height",
    classPrefix: "h"
  },
  // Position
  pos: {
    build: me,
    ruleCss: "position",
    classPrefix: "pos"
  },
  t: {
    build: be,
    ruleCss: "top",
    classPrefix: "t"
  },
  r: {
    build: he,
    ruleCss: "right",
    classPrefix: "r"
  },
  b: {
    build: xe,
    ruleCss: "bottom",
    classPrefix: "b"
  },
  l: {
    build: ge,
    ruleCss: "left",
    classPrefix: "l"
  },
  d: {
    build: Re,
    ruleCss: "display",
    classPrefix: "d"
  }
}, v = {
  ...c,
  c: c.cols,
  fx: c.flex,
  p: c.pad,
  padding: c.pad,
  pt: c.padt,
  "padding-top": c.padt,
  pr: c.padr,
  "padding-right": c.padr,
  pb: c.padb,
  "padding-bottom": c.padb,
  pl: c.padl,
  "padding-left": c.padl,
  py: c.pady,
  "padding-y": c.pady,
  px: c.padx,
  "padding-x": c.padx,
  m: c.mar,
  margin: c.mar,
  mt: c.mart,
  "margin-top": c.mart,
  mr: c.marr,
  "margin-right": c.marr,
  mb: c.marb,
  "margin-bottom": c.marb,
  ml: c.marl,
  "margin-left": c.marl,
  my: c.mary,
  "margin-y": c.mary,
  mx: c.marx,
  "margin-x": c.marx,
  w: c.wdh,
  width: c.wdh,
  h: c.hgt,
  height: c.hgt,
  "max-width": c.mxw,
  "max-height": c.mxh,
  "min-width": c.miw,
  "min-height": c.mih,
  position: c.pos,
  top: c.t,
  right: c.r,
  bottom: c.b,
  left: c.l,
  display: c.d
}, Pe = (e) => {
  const s = {}, r = e.attributes, t = Object.keys(v);
  return Array.prototype.forEach.call(r, (i) => {
    t.includes(i.name) && i.value !== "" && (s[i.name] = i.value.trim().split(" ").filter((n) => n).join(" "));
  }), s;
}, ye = (e, s = !1) => {
  const r = {};
  let t = !1;
  for (const i in e) {
    const o = v[i].build(
      e[i],
      s
    );
    if (o instanceof Error) {
      t = o;
      break;
    } else
      r[i] = o;
  }
  return t || r;
}, Ce = (e, s, r) => new Promise((t) => {
  const i = g(), n = s.split(" ");
  let o = n;
  if (!r && (o = n.filter((a) => !e.classList.contains(a)), !o.length)) {
    t();
    return;
  }
  const l = new i.context.MutationObserver((a) => {
    const d = a[0].target.className.split(" ");
    n.every(
      (f) => d.includes(f)
    ) && (l.disconnect(), t());
  });
  if (l.observe(e, {
    childList: !1,
    subtree: !1,
    attributes: !0,
    attributeFilter: ["class"],
    characterData: !1
  }), r)
    e.className = s;
  else {
    const a = e.hasAttribute("class") ? " " : "";
    e.className += a + o.join(" ");
  }
}), we = (e, s, r) => new Promise((t) => {
  if (!e.hasAttribute(s)) {
    t();
    return;
  }
  const i = new r.MutationObserver(() => {
    i.disconnect(), t();
  });
  i.observe(e, {
    childList: !1,
    subtree: !1,
    attributes: !0,
    attributeFilter: [s],
    characterData: !1
  }), e.removeAttribute(s);
}), He = (e, s, r) => new Promise((t) => {
  const i = s.map((n) => we(e, n, r));
  Promise.all(i).then(() => t());
}), ve = (e, s) => new Promise((r) => {
  const t = g();
  Array.isArray(s) ? He(e, s, t.context).then(r) : we(e, s, t.context).then(r);
}), T = ({ node: e, directive: s, classes: r, resolve: t }) => {
  const i = g();
  ve(e, s).then(() => Ce(e, r)).then(() => {
    t();
    const n = new i.context.CustomEvent("layout:ready");
    e.dispatchEvent(n);
  });
}, Ye = (e, s) => new Promise((r, t) => {
  const i = s || Pe(e), n = Object.keys(i);
  if (!n.length) {
    const d = O(
      "Parameter Missing",
      "don't exists any parameter to process",
      e
    );
    t(d);
    return;
  }
  const o = {};
  for (const d in i)
    o[d] = i[d];
  const l = ye(o, !0);
  if (l instanceof Error) {
    t(l);
    return;
  }
  const a = l, u = Object.keys(a).map((d) => Object.keys(a[d])).flat().join(" ");
  T({
    node: e,
    directive: n,
    classes: u,
    resolve: r
  });
}), N = (e, s) => {
  const r = s.map((t) => e.getAttribute(t)).filter((t) => t).join(" ");
  return r || O(
    "Empty",
    'The value of the directives "' + s.join(", ") + '" are empty',
    e
  );
}, Ie = (e, s) => new Promise((r, t) => {
  const i = s || N(e, ["flex", "fx"]);
  if (!i)
    return t(i);
  const n = Y(i, !0);
  if (n instanceof Error) {
    t(n);
    return;
  }
  T({
    node: e,
    directive: "flex",
    classes: Object.keys(n).join(" "),
    resolve: r
  });
}), We = (e, s) => new Promise((r, t) => {
  const i = s || N(e, ["c", "cols"]);
  if (!i)
    return t(i);
  const n = H(i, !0);
  if (n instanceof Error) {
    t(n);
    return;
  }
  const o = Object.keys(n).join(" ");
  T({
    node: e,
    directive: "cols",
    classes: o,
    resolve: r
  });
}), b = (e, s, r) => new Promise((t, i) => {
  const n = r || N(e, s);
  if (!n)
    return i(n);
  const o = s[0], l = m(n, o, !0), a = Object.keys(l).join(" ");
  T({
    node: e,
    directive: o,
    classes: a,
    resolve: t
  });
}), Xe = (e, s) => b(e, ["hgt", "h"], s), ze = (e, s) => b(e, ["marb", "mb", "margin-bottom"], s), Ge = (e, s) => b(e, ["marl", "ml", "margin-left"], s), Ue = (e, s) => b(e, ["marr", "mr", "margin-right"], s), qe = (e, s) => b(e, ["mar", "m", "margin"], s), _e = (e, s) => b(e, ["mart", "mt", "margin-top"], s), $e = (e, s) => b(e, ["mxw", "max-width"], s), Je = (e, s) => b(e, ["mih", "min-height"], s), Ke = (e, s) => b(e, ["miw", "min-width"], s), Qe = (e, s) => b(e, ["padb", "pb", "padding-bottom"], s), Ze = (e, s) => b(e, ["padl", "pl", "padding-left"], s), es = (e, s) => b(e, ["padr", "pr", "padding-right"], s), ss = (e, s) => b(e, ["pad", "p", "padding"], s), ts = (e, s) => b(e, ["padt", "pt", "padding-top"], s), rs = (e, s) => b(e, ["wdh", "width"], s), is = (e, s) => b(e, ["mxh", "max-height"], s), ns = (e, s) => b(e, ["pos", "position"], s), ls = (e, s) => b(e, ["t", "top"], s), as = (e, s) => b(e, ["r", "right"], s), os = (e, s) => b(e, ["b", "bottom"], s), cs = (e, s) => b(e, ["l", "left"], s), D = (e) => new Promise((s, r) => {
  const t = e.vals || N(e.Node, e.directives);
  if (!t)
    return r(t);
  const i = e.builder(t, !0), n = Object.keys(i).join(" ");
  T({
    node: e.Node,
    directive: e.directives,
    classes: n,
    resolve: s
  });
}), us = (e, s) => D({
  Node: e,
  directives: ["padx", "px", "padding-x"],
  builder: $,
  vals: s
}), fs = (e, s) => D({
  Node: e,
  directives: ["pady", "py", "padding-y"],
  builder: J,
  vals: s
}), ds = (e, s) => D({
  Node: e,
  directives: ["marx", "mx", "margin-x"],
  builder: K,
  vals: s
}), ps = (e, s) => D({
  Node: e,
  directives: ["mary", "my", "margin-y"],
  builder: Q,
  vals: s
}), ms = (e) => new Promise((s) => {
  const t = [...new Set(
    Object.keys(v).map(
      (n) => v[n].classPrefix
    )
  )], i = e.className.split(" ").filter((n) => n.includes("-") ? !t.find((l) => {
    const a = l.length;
    return n.substring(0, a + 1) === l + "-";
  }) : !0);
  if (i.length) {
    const n = i.join(" ");
    Ce(e, n, !0).then(() => {
      s();
    });
  } else
    ve(e, "class").then(() => {
      s();
    });
}), bs = [
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "discard",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "hatch",
  "hatchpath",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "title",
  "tspan",
  "use",
  "view"
], ke = (e, s) => new Promise((r) => {
  const i = Object.keys(v).map((a) => `[${a}]`).join(", "), n = s.querySelectorAll(i);
  if (!n.length) {
    r(e);
    return;
  }
  const o = /* @__PURE__ */ new Set();
  Array.prototype.filter.call(
    n,
    (a) => !bs.includes(a.nodeName.toLowerCase())
  ).forEach((a) => o.add(a));
  const l = [];
  o.forEach((a) => {
    l.push(e.set(a));
  }), Promise.all(l).then(r);
}), ee = (e) => {
  const s = g(), r = Object.keys(v), t = new e.context.MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList") {
        if (!o.addedNodes.length)
          continue;
        o.addedNodes.forEach((l) => {
          if (l instanceof HTMLElement) {
            const a = e.getParameters(l);
            Object.keys(a).length && e.set(l, a), ke(e, l);
          }
        });
      } else if (o.type === "attributes") {
        const l = o.target;
        if (l instanceof HTMLElement) {
          const a = e.getParameters(l);
          Object.keys(a).length && e.set(l, a);
        }
      }
  }), i = {
    childList: !0,
    subtree: !0,
    attributes: !0,
    attributeFilter: r,
    characterData: !1
  };
  t.observe(s.context.document.body, i);
}, hs = (e, s = {}) => {
  const r = Me(e, s), t = {
    ...r,
    getParameters: Pe,
    updateConfig: Se,
    insertRules: re,
    build: ye,
    buildCols: H,
    buildFlex: Y,
    buildPad: le,
    buildPadTop: I,
    buildPadRight: W,
    buildPadBottom: X,
    buildPadLeft: z,
    buildPadX: $,
    buildPadY: J,
    buildMar: ae,
    buildMarTop: G,
    buildMarRight: U,
    buildMarBottom: q,
    buildMarLeft: _,
    buildMarX: K,
    buildMarY: Q,
    buildMaxWidth: oe,
    buildMaxHeight: ce,
    buildMinWidth: ue,
    buildMinHeight: fe,
    buildHeight: de,
    buildWidth: pe,
    set: Ye,
    setCols: We,
    setFlex: Ie,
    setMar: qe,
    setMarTop: _e,
    setMarRight: Ue,
    setMarBottom: ze,
    setMarLeft: Ge,
    setMarX: ds,
    setMarY: ps,
    setPad: ss,
    setPadTop: ts,
    setPadRight: es,
    setPadBottom: Qe,
    setPadLeft: Ze,
    setPadX: us,
    setPadY: fs,
    setWidth: rs,
    setMinWidth: Ke,
    setMaxWidth: $e,
    setHeight: Xe,
    setMinHeight: Je,
    setMaxHeight: is,
    buildPosition: me,
    buildTop: be,
    buildRight: he,
    buildBottom: xe,
    buildLeft: ge,
    setPosition: ns,
    setTop: ls,
    setRight: as,
    setBottom: os,
    setLeft: cs,
    reset: ms,
    processors: v
  };
  return r.searchOnInit ? ke(t, e.document).then(() => {
    t.ready && t.ready(t), r.observer && ee(t);
  }) : (r.observer && ee(t), t.ready && t.ready(t)), t;
};
typeof window < "u" && typeof exports > "u" && (window.layouter = hs(window));
export {
  hs as default
};
//# sourceMappingURL=layouter.es.js.map
