const breakpointsNums = (objBps, propName) => {
  const sizes = {};
  if (propName === "width") {
    Object.keys(objBps).map((bp) => {
      return {
        alias: bp,
        width: objBps[bp].width
      };
    }).sort((a, b) => a.width > b.width ? 1 : b.width > a.width ? -1 : 0).forEach((bp, index) => {
      sizes[bp.alias] = !index ? 0 : objBps[bp.alias][propName];
    });
  } else {
    Object.keys(objBps).forEach((bp) => {
      sizes[bp] = objBps[bp][propName];
    });
  }
  return sizes;
};
const createScopeStyles = ({
  bridge: withBridge,
  bp,
  insertionType,
  node,
  context
}) => {
  let stylesScope = context.document.getElementById("layouter-" + bp);
  if (!stylesScope) {
    stylesScope = context.document.createElement("style");
    stylesScope.appendChild(context.document.createTextNode(""));
    const nodeParent = node.parentNode;
    switch (insertionType) {
      case "before":
        nodeParent.insertBefore(stylesScope, node);
        break;
      case "after":
        node.nextSibling ? nodeParent.insertBefore(stylesScope, node.nextSibling) : nodeParent.appendChild(stylesScope);
        break;
      case "append":
        node.appendChild(stylesScope);
        break;
    }
    stylesScope.id = "layouter-" + bp;
  }
  let bridge;
  if (withBridge) {
    bridge = {
      method: stylesScope.sheet,
      node: stylesScope
    };
  } else {
    bridge = {
      method: {
        insertRule: (ruleCss) => {
          stylesScope.appendChild(context.document.createTextNode(ruleCss));
        },
        rules: []
      },
      node: stylesScope
    };
  }
  return bridge;
};
const scopesStylesBuilder = ({
  breakpoints,
  bridge,
  scope,
  context
}) => {
  const scopes = scope || {};
  Object.keys(breakpoints).forEach((bp) => {
    if (!scopes[bp]) {
      scopes[bp] = createScopeStyles({
        bridge,
        bp,
        insertionType: "append",
        node: context.document.body,
        context
      });
    }
  });
  return scopes;
};
const breakpointsOrdered = (bps, sizes) => {
  const bpsOrdered = {};
  Object.keys(sizes).forEach((bpName) => bpsOrdered[bpName] = bps[bpName]);
  return bpsOrdered;
};
const version = "1.8.0";
const breakpointsInit = {
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
let baseConfig = {
  prefix: "",
  breakpoints: breakpointsInit,
  bridge: true,
  debug: true,
  searchOnInit: true,
  observer: true
};
let config;
const configNums = ({
  bps,
  bridge,
  scope,
  context
}) => {
  const sizes = breakpointsNums(bps, "width");
  const finalBps = breakpointsOrdered(bps, sizes);
  return {
    sizes,
    cols: breakpointsNums(bps, "cols"),
    scope: scopesStylesBuilder({
      breakpoints: finalBps,
      bridge,
      scope,
      context
    }),
    breakpoints: finalBps
  };
};
const setConfig = (context, customCfg = {}) => {
  const contextConfig = context.layouterConfig || {};
  baseConfig = {
    ...baseConfig,
    ...customCfg,
    ...contextConfig
  };
  config = {
    context,
    ...baseConfig,
    ...configNums({
      bps: baseConfig.breakpoints,
      bridge: baseConfig.bridge,
      context
    }),
    styles: {},
    version
  };
  return config;
};
const getConfig = () => {
  return config;
};
const setStyles = (className, value) => {
  config.styles[className] = value;
};
const updateConfig = (userConfig) => {
  config = {
    ...config,
    ...userConfig
  };
  if (userConfig.breakpoints) {
    config = {
      ...config,
      ...configNums({
        bps: config.breakpoints,
        bridge: config.bridge,
        scope: config.scope,
        context: config.context
      })
    };
  }
  return config;
};
const prepareParam = (param) => {
  let bp;
  let argParam = param;
  let important = false;
  const haveBp = argParam.includes("@");
  if (haveBp) {
    const bpSplited = argParam.split("@");
    argParam = bpSplited[0];
    bp = bpSplited[1];
  } else {
    const config2 = getConfig();
    bp = Object.keys(config2.breakpoints)[0];
  }
  if (param.includes("!")) {
    important = true;
    bp = bp.replace(/!/g, "");
    argParam = argParam.replace(/!/g, "");
  }
  return {
    widthBp: haveBp,
    numbers: argParam,
    breakPoints: bp,
    important
  };
};
const regError = (name, message, Node) => {
  const err = new Error();
  err.name = name;
  err.message = message;
  const intConfig = getConfig();
  if (intConfig.debug) {
    console.error(err);
    if (Node)
      console.log(Node);
  }
  return err;
};
const calPercentage = (n1, n2) => {
  const cal = n1 * 100 / n2;
  const haveDecimal = cal - Math.floor(cal) !== 0;
  const result = haveDecimal ? cal.toFixed(3) : cal;
  return result + "%";
};
const getScopeByclassName = (className) => {
  const nameClass = className.replace(/!/g, "");
  const atIndex = nameClass.indexOf("@");
  const intConfig = getConfig();
  const scope = intConfig.scope;
  const bridge = intConfig.bridge;
  const context = intConfig.context;
  if (atIndex === -1) {
    const firstBp = Object.keys(intConfig.breakpoints)[0];
    return scope[firstBp];
  }
  const bp = nameClass.substring(atIndex + 1);
  if (!bp.includes("-"))
    return scope[bp];
  if (bp.substring(0, 1) === "-") {
    if (scope[bp])
      return scope[bp];
    const bpUntil = bp.substring(1);
    scope[bp] = createScopeStyles({
      bridge,
      bp,
      insertionType: "before",
      node: scope[bpUntil].node,
      context
    });
    return scope[bp];
  }
  if (scope[bp]) {
    return scope[bp];
  }
  const fromBp = bp.split("-")[0];
  scope[bp] = createScopeStyles({
    bridge,
    bp,
    insertionType: "after",
    node: scope[fromBp].node,
    context
  });
  return scope[bp];
};
const insertRules = (objStyles) => {
  const intConfig = getConfig();
  for (const className in objStyles) {
    if (!intConfig.styles[className]) {
      const nodeScope = getScopeByclassName(className);
      const valClass = objStyles[className];
      const rules = nodeScope.method.rules;
      nodeScope.method.insertRule(valClass, rules ? rules.length : 0);
      setStyles(className, valClass);
    }
  }
};
const flexProsAndValsBase = {
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
};
const flexPropsAndValsSelfBase = {
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
};
const flexPropsAndValsSelf = {
  ...flexPropsAndValsSelfBase,
  "flex-grow": flexPropsAndValsSelfBase.fg,
  "flex-shrink": flexPropsAndValsSelfBase.fh,
  "align-self": flexPropsAndValsSelfBase.as,
  order: flexPropsAndValsSelfBase.or
};
const flexProsAndVals = {
  ...flexProsAndValsBase,
  ...flexPropsAndValsSelf,
  "justify-content": flexProsAndValsBase.jc,
  "align-items": flexProsAndValsBase.ai,
  center: flexProsAndValsBase.ce,
  "flex-start": flexProsAndValsBase.fs,
  "flex-end": flexProsAndValsBase.fe,
  "space-between": flexProsAndValsBase.sb,
  "space-around": flexProsAndValsBase.fs,
  "flex-wrap": flexProsAndValsBase.fw,
  nowrap: flexProsAndValsBase.nw,
  w: flexProsAndValsBase.w,
  "wrap-reverse": flexProsAndValsBase.wr,
  "flex-direction": flexProsAndValsBase.fd,
  row: flexProsAndValsBase.r,
  "row-reverse": flexProsAndValsBase.rr,
  column: flexProsAndValsBase.co,
  "column-reverse": flexProsAndValsBase.cor,
  auto: flexProsAndValsBase.au,
  stretch: flexProsAndValsBase.st,
  baseline: flexProsAndValsBase.bl,
  initial: flexProsAndValsBase.in,
  inherit: flexProsAndValsBase.ih
};
const flexAttrsSelf = Object.keys(flexPropsAndValsSelf);
const percentageConverter = (percentage) => {
  return "0\xAF" + percentage.replace("%", "");
};
const createStyles = (directive, bps) => {
  const intConfig = getConfig();
  const sizes = intConfig.sizes;
  const prefix = intConfig.prefix;
  const prop = processors[directive].ruleCss;
  const styles = {};
  Object.keys(bps).forEach((bp) => {
    const shortNameClass = bps[bp].name;
    let nameClass = shortNameClass;
    if (shortNameClass.includes("%")) {
      nameClass = shortNameClass.replace(shortNameClass, percentageConverter(shortNameClass));
    }
    const finalPrefix = prefix ? prefix + "-" : "";
    nameClass = finalPrefix + processors[directive].classPrefix + "-" + nameClass.replace(/\//g, "\\/").replace(/:/g, "\\:").replace("@", "\\@").split(".").join("_");
    if (!intConfig.styles[nameClass]) {
      let propAndVal;
      if (directive === "flex") {
        propAndVal = bps[bp].value;
        const flexImportant = shortNameClass.includes("!") ? ";display:flex !important;" : ";display:flex;";
        const attrsFlexSelfs = flexAttrsSelf.filter((nameAttrFlex) => shortNameClass.includes(nameAttrFlex + ":"));
        if (attrsFlexSelfs.length) {
          if (attrsFlexSelfs.length + 1 !== shortNameClass.split(":").length) {
            propAndVal += flexImportant;
          }
        } else {
          propAndVal += flexImportant;
        }
      } else {
        propAndVal = prop + ":" + bps[bp].value;
      }
      let rule = "@media screen and ";
      let direct = false;
      if (!bp.includes("-")) {
        if (sizes[bp]) {
          rule += "(min-width: " + sizes[bp] + "px)";
        } else {
          rule = "." + nameClass.replace(/!/g, "\\!") + "{" + propAndVal + "}";
          direct = true;
        }
      } else {
        const bpSplited = bp.split("-");
        const bp1 = bpSplited[0];
        if (bp1)
          rule += "(min-width: " + sizes[bp1] + "px) and ";
        const bp2 = bpSplited[1];
        rule += "(max-width: " + (sizes[bp2] - 1) + "px)";
      }
      if (!direct) {
        rule += "{." + nameClass.replace(/!/g, "\\!") + "{" + propAndVal + "}}";
      }
      styles[nameClass] = rule;
    } else {
      styles[nameClass] = intConfig.styles[nameClass];
    }
  });
  return styles;
};
const replaceList = [
  ["/", ""],
  ["\\", "/"],
  ["/:", ":"],
  ["\\:", ":"],
  ["\\@", "@"],
  ["/@", "@"]
];
const nameCleaner = (objStyles) => {
  const obj = {};
  for (const name in objStyles) {
    let newName = name;
    replaceList.forEach((reItem) => {
      newName = newName.split(reItem[0]).join(reItem[1]);
    });
    obj[newName] = objStyles[name];
  }
  return obj;
};
const buildCss = (data) => {
  const objStyles = createStyles(data.type, data.bps);
  if (data.deep) {
    insertRules(objStyles);
  }
  return nameCleaner(objStyles);
};
const buildCols = (values, insertStyles = false) => {
  let cols;
  let bp;
  const bpCals = {};
  const config2 = getConfig();
  let selectorName, propValue, paramPrepared;
  const directBp = Object.keys(config2.breakpoints)[0];
  let err = false;
  for (const item of values.split(" ")) {
    let param = item;
    selectorName = param;
    paramPrepared = prepareParam(param);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;
    if (param.includes("/")) {
      const paramSplited = param.split("/");
      cols = [Number(paramSplited[0]), Number(paramSplited[1])];
    } else {
      if (paramPrepared.widthBp) {
        if (bp.includes("-")) {
          err = regError("SyntaxError", "You can't determine a 'until breakpoint' when use the explicit columns max: " + values);
          break;
        } else {
          cols = [Number(param), config2.cols[bp]];
        }
      } else {
        cols = [Number(param), config2.cols[directBp]];
      }
    }
    propValue = calPercentage(cols[0], cols[1]);
    if (paramPrepared.important)
      propValue += " !important";
    bpCals[bp] = {
      name: selectorName,
      value: propValue
    };
  }
  if (err)
    return err;
  return buildCss({
    type: "cols",
    bps: bpCals,
    deep: insertStyles
  });
};
const buildFlex = (valFlex, insertStyles = false) => {
  const bpCals = {};
  let err = false;
  const config2 = getConfig();
  const firstBp = Object.keys(config2.breakpoints)[0];
  for (const param of valFlex.split(" ")) {
    let propVal;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const flexSplited = paramPrepared.numbers.split(":");
    const nameProp = flexSplited[0];
    const valProp = flexSplited[1];
    let valAlias;
    if (!flexAttrsSelf.includes(nameProp)) {
      if (!flexProsAndVals[nameProp]) {
        err = regError("Non-existent Alias", "Don't exists the alias '" + nameProp + "' in Flex vault.");
        break;
      }
      if (!flexProsAndVals[valProp]) {
        err = regError("Non-existent Alias", "Don't exists the alias '" + valProp + "' in Flex vault.");
        break;
      }
      propVal = flexProsAndVals[nameProp].ruleCss + ":" + flexProsAndVals[valProp].ruleCss;
      valAlias = flexProsAndVals[valProp].classPrefix;
    } else {
      propVal = flexProsAndVals[nameProp].ruleCss + ":" + valProp;
      valAlias = valProp;
    }
    let sufixBp = bpNames === firstBp ? "" : "@" + bpNames;
    if (paramPrepared.important) {
      propVal += " !important";
      sufixBp += "!";
    }
    let selectorName = flexProsAndVals[nameProp].classPrefix + ":" + valAlias + sufixBp;
    if (!bpCals[bpNames]) {
      bpCals[bpNames] = {
        name: selectorName,
        value: propVal
      };
    } else {
      if (selectorName.includes("@"))
        selectorName = selectorName.split("@")[0];
      let prevName = bpCals[bpNames].name.split("@")[0];
      if (bpCals[bpNames].name.includes("!") && !prevName.includes("!"))
        prevName += "!";
      bpCals[bpNames].name = prevName + "-" + selectorName + sufixBp;
      bpCals[bpNames].value += ";" + propVal;
    }
  }
  if (err)
    return err;
  return buildCss({
    type: "flex",
    bps: bpCals,
    deep: insertStyles
  });
};
const relativeMeasures = ["%", "rem", "em", "ex", "vw", "vh", "pt", "cm", "pc"];
const processedNumber = (n) => {
  let nProcessed;
  if (n.includes("/")) {
    nProcessed = n.split("/");
    nProcessed = calPercentage(parseFloat(nProcessed[0]), parseFloat(nProcessed[1]));
  } else if (n === "auto") {
    nProcessed = "auto";
  } else {
    const relativeUnits = relativeMeasures.filter((unit) => {
      return n.includes(unit);
    });
    if (relativeUnits.length) {
      nProcessed = n;
    } else {
      nProcessed = n === "0" ? n : n + "px";
    }
  }
  return nProcessed;
};
const buildAttr = (values, directive, insertStyles = false) => {
  const bpCals = {};
  values.split(" ").forEach((param) => {
    const paramProcessed = prepareParam(param);
    const bpNames = paramProcessed.breakPoints;
    let propValue = paramProcessed.numbers.split("-").map((n) => processedNumber(n)).join(" ");
    if (paramProcessed.important)
      propValue += " !important";
    bpCals[bpNames] = {
      name: param,
      value: propValue
    };
  });
  return buildCss({
    type: directive,
    bps: bpCals,
    deep: insertStyles
  });
};
const buildPad = (valPads, insertStyles = false) => {
  return buildAttr(valPads, "pad", insertStyles);
};
const buildPadTop = (valPadTop, insertStyles = false) => {
  return buildAttr(valPadTop, "padt", insertStyles);
};
const buildPadRight = (valPadRight, insertStyles = false) => {
  return buildAttr(valPadRight, "padr", insertStyles);
};
const buildPadBottom = (valPadBottom, insertStyles = false) => {
  return buildAttr(valPadBottom, "padb", insertStyles);
};
const buildPadLeft = (valPadLeft, insertStyles = false) => {
  return buildAttr(valPadLeft, "padl", insertStyles);
};
const buildMar = (valMars, insertStyles = false) => {
  return buildAttr(valMars, "mar", insertStyles);
};
const buildMarTop = (valMarTop, insertStyles = false) => {
  return buildAttr(valMarTop, "mart", insertStyles);
};
const buildMarRight = (valMarRight, insertStyles = false) => {
  return buildAttr(valMarRight, "marr", insertStyles);
};
const buildMarBottom = (valMarBottom, insertStyles = false) => {
  return buildAttr(valMarBottom, "marb", insertStyles);
};
const buildMarLeft = (valMarLeft, insertStyles = false) => {
  return buildAttr(valMarLeft, "marl", insertStyles);
};
const buildMaxWidth = (valMaxWidth, insertStyles = false) => {
  return buildAttr(valMaxWidth, "mxw", insertStyles);
};
const buildMaxHeight = (valMaxHeight, insertStyles = false) => {
  return buildAttr(valMaxHeight, "mxh", insertStyles);
};
const buildMinWidth = (valMinWidth, insertStyles = false) => {
  return buildAttr(valMinWidth, "miw", insertStyles);
};
const buildMinHeight = (valMinHeight, insertStyles = false) => {
  return buildAttr(valMinHeight, "mih", insertStyles);
};
const buildHeight = (valHeight, insertStyles = false) => {
  return buildAttr(valHeight, "hgt", insertStyles);
};
const buildWidth = (valWidth, insertStyles = false) => {
  return buildAttr(valWidth, "wdh", insertStyles);
};
const positionProsAndValsBase = {
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
};
const positionProsAndVals = {
  ...positionProsAndValsBase,
  static: positionProsAndValsBase.st,
  absolute: positionProsAndValsBase.ab,
  fixed: positionProsAndValsBase.fi,
  relative: positionProsAndValsBase.re,
  sticky: positionProsAndValsBase.si,
  initial: positionProsAndValsBase.in,
  inherit: positionProsAndValsBase.ih
};
const buildPosition = (valPos, insertStyles = false) => {
  const bpCals = {};
  let err = false;
  const config2 = getConfig();
  const firstBp = Object.keys(config2.breakpoints)[0];
  for (const param of valPos.split(" ")) {
    let propVal;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const nameProp = paramPrepared.numbers;
    if (!positionProsAndVals[nameProp]) {
      err = regError("Non-existent Alias", "Don't exists the alias '" + nameProp + "' in Position vault.");
      break;
    }
    propVal = positionProsAndVals[nameProp].ruleCss;
    const className = positionProsAndVals[nameProp].classPrefix;
    let sufixBp = bpNames === firstBp ? "" : "@" + bpNames;
    if (paramPrepared.important) {
      propVal += " !important";
      sufixBp += "!";
    }
    bpCals[bpNames] = {
      name: className + sufixBp,
      value: propVal
    };
  }
  if (err)
    return err;
  return buildCss({
    type: "pos",
    bps: bpCals,
    deep: insertStyles
  });
};
const buildTop = (val, insertStyles = false) => {
  return buildAttr(val, "t", insertStyles);
};
const buildRight = (val, insertStyles = false) => {
  return buildAttr(val, "r", insertStyles);
};
const buildBottom = (val, insertStyles = false) => {
  return buildAttr(val, "b", insertStyles);
};
const buildLeft = (val, insertStyles = false) => {
  return buildAttr(val, "l", insertStyles);
};
const displayProsAndValsBase = {
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
};
const displayProsAndVals = {
  ...displayProsAndValsBase,
  block: displayProsAndValsBase.bl,
  inline: displayProsAndValsBase.il,
  "inline-block": displayProsAndValsBase.ib,
  flex: displayProsAndValsBase.fx,
  "inline-flex": displayProsAndValsBase.if,
  none: displayProsAndValsBase.no,
  initial: displayProsAndValsBase.in,
  inherit: displayProsAndValsBase.ih
};
const buildDisplay = (valDisplay, insertStyles = false) => {
  const bpCals = {};
  let err = false;
  const config2 = getConfig();
  const firstBp = Object.keys(config2.breakpoints)[0];
  for (const param of valDisplay.split(" ")) {
    let propVal;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const nameProp = paramPrepared.numbers;
    if (!displayProsAndVals[nameProp]) {
      err = regError("Non-existent Alias", "Don't exists the alias '" + nameProp + "' in display vault.");
      break;
    }
    propVal = displayProsAndVals[nameProp].ruleCss;
    const className = displayProsAndVals[nameProp].classPrefix;
    let sufixBp = bpNames === firstBp ? "" : "@" + bpNames;
    if (paramPrepared.important) {
      propVal += " !important";
      sufixBp += "!";
    }
    bpCals[bpNames] = {
      name: className + sufixBp,
      value: propVal
    };
  }
  if (err)
    return err;
  return buildCss({
    type: "d",
    bps: bpCals,
    deep: insertStyles
  });
};
const buildXY = (data) => {
  const stylesA = data.builderA(data.values, data.insertStyles);
  const stylesB = data.builderB(data.values, data.insertStyles);
  const allStyles = {};
  for (const style in stylesA) {
    allStyles[style] = stylesA[style];
  }
  for (const style in stylesB) {
    allStyles[style] = stylesB[style];
  }
  return allStyles;
};
const buildPadX = (valPadX, insertStyles = false) => {
  return buildXY({
    values: valPadX,
    builderA: buildPadRight,
    builderB: buildPadLeft,
    insertStyles
  });
};
const buildPadY = (valPadX, insertStyles = false) => {
  return buildXY({
    values: valPadX,
    builderA: buildPadTop,
    builderB: buildPadBottom,
    insertStyles
  });
};
const buildMarX = (valMarX, insertStyles = false) => {
  return buildXY({
    values: valMarX,
    builderA: buildMarRight,
    builderB: buildMarLeft,
    insertStyles
  });
};
const buildMarY = (valMarY, insertStyles = false) => {
  return buildXY({
    values: valMarY,
    builderA: buildMarTop,
    builderB: buildMarBottom,
    insertStyles
  });
};
const processorsBase = {
  cols: {
    build: buildCols,
    ruleCss: "width",
    classPrefix: "c"
  },
  pad: {
    build: buildPad,
    ruleCss: "padding",
    classPrefix: "p"
  },
  padt: {
    build: buildPadTop,
    ruleCss: "padding-top",
    classPrefix: "pt"
  },
  padr: {
    build: buildPadRight,
    ruleCss: "padding-right",
    classPrefix: "pr"
  },
  padb: {
    build: buildPadBottom,
    ruleCss: "padding-bottom",
    classPrefix: "pb"
  },
  padl: {
    build: buildPadLeft,
    ruleCss: "padding-left",
    classPrefix: "pl"
  },
  padx: {
    build: buildPadX,
    ruleCss: ["padding-left", "padding-right"],
    classPrefix: "px"
  },
  pady: {
    build: buildPadY,
    ruleCss: ["padding-top", "padding-bottom"],
    classPrefix: "py"
  },
  mar: {
    build: buildMar,
    ruleCss: "margin",
    classPrefix: "m"
  },
  mart: {
    build: buildMarTop,
    ruleCss: "margin-top",
    classPrefix: "mt"
  },
  marr: {
    build: buildMarRight,
    ruleCss: "margin-right",
    classPrefix: "mr"
  },
  marb: {
    build: buildMarBottom,
    ruleCss: "margin-bottom",
    classPrefix: "mb"
  },
  marl: {
    build: buildMarLeft,
    ruleCss: "margin-left",
    classPrefix: "ml"
  },
  marx: {
    build: buildMarX,
    ruleCss: ["margin-left", "margin-right"],
    classPrefix: "px"
  },
  mary: {
    build: buildMarY,
    ruleCss: ["margin-top", "margin-bottom"],
    classPrefix: "py"
  },
  flex: {
    build: buildFlex,
    ruleCss: "display: flex",
    classPrefix: "fx"
  },
  mxw: {
    build: buildMaxWidth,
    ruleCss: "max-width",
    classPrefix: "mxw"
  },
  mxh: {
    build: buildMaxHeight,
    ruleCss: "max-height",
    classPrefix: "mxh"
  },
  miw: {
    build: buildMinWidth,
    ruleCss: "min-width",
    classPrefix: "miw"
  },
  mih: {
    build: buildMinHeight,
    ruleCss: "min-height",
    classPrefix: "mih"
  },
  wdh: {
    build: buildWidth,
    ruleCss: "width",
    classPrefix: "w"
  },
  hgt: {
    build: buildHeight,
    ruleCss: "height",
    classPrefix: "h"
  },
  pos: {
    build: buildPosition,
    ruleCss: "position",
    classPrefix: "pos"
  },
  t: {
    build: buildTop,
    ruleCss: "top",
    classPrefix: "t"
  },
  r: {
    build: buildRight,
    ruleCss: "right",
    classPrefix: "r"
  },
  b: {
    build: buildBottom,
    ruleCss: "bottom",
    classPrefix: "b"
  },
  l: {
    build: buildLeft,
    ruleCss: "left",
    classPrefix: "l"
  },
  d: {
    build: buildDisplay,
    ruleCss: "display",
    classPrefix: "d"
  }
};
const processors = {
  ...processorsBase,
  c: processorsBase.cols,
  fx: processorsBase.flex,
  p: processorsBase.pad,
  padding: processorsBase.pad,
  pt: processorsBase.padt,
  "padding-top": processorsBase.padt,
  pr: processorsBase.padr,
  "padding-right": processorsBase.padr,
  pb: processorsBase.padb,
  "padding-bottom": processorsBase.padb,
  pl: processorsBase.padl,
  "padding-left": processorsBase.padl,
  py: processorsBase.pady,
  "padding-y": processorsBase.pady,
  px: processorsBase.padx,
  "padding-x": processorsBase.padx,
  m: processorsBase.mar,
  margin: processorsBase.mar,
  mt: processorsBase.mart,
  "margin-top": processorsBase.mart,
  mr: processorsBase.marr,
  "margin-right": processorsBase.marr,
  mb: processorsBase.marb,
  "margin-bottom": processorsBase.marb,
  ml: processorsBase.marl,
  "margin-left": processorsBase.marl,
  my: processorsBase.mary,
  "margin-y": processorsBase.mary,
  mx: processorsBase.marx,
  "margin-x": processorsBase.marx,
  w: processorsBase.wdh,
  width: processorsBase.wdh,
  h: processorsBase.hgt,
  height: processorsBase.hgt,
  "max-width": processorsBase.mxw,
  "max-height": processorsBase.mxh,
  "min-width": processorsBase.miw,
  "min-height": processorsBase.mih,
  position: processorsBase.pos,
  top: processorsBase.t,
  right: processorsBase.r,
  bottom: processorsBase.b,
  left: processorsBase.l,
  display: processorsBase.d
};
const getParameters = (Node) => {
  const params = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(processors);
  Array.prototype.forEach.call(attrs, (attr) => {
    if (paramNames.includes(attr.name)) {
      if (attr.value !== "")
        params[attr.name] = attr.value.trim().split(" ").filter((item) => item).join(" ");
    }
  });
  return params;
};
const build = (obj, insertStyles = false) => {
  const rObj = {};
  let err = false;
  for (const prop in obj) {
    const propData = processors[prop];
    const objStyles = propData.build(obj[prop], insertStyles);
    if (objStyles instanceof Error) {
      err = objStyles;
      break;
    } else {
      rObj[prop] = objStyles;
    }
  }
  if (err)
    return err;
  return rObj;
};
const addClasses = (Node, classesNames, overwrite) => {
  return new Promise((resolve) => {
    const config2 = getConfig();
    const names = classesNames.split(" ");
    let classesToAdd = names;
    if (!overwrite) {
      classesToAdd = names.filter((name) => !Node.classList.contains(name));
      if (!classesToAdd.length) {
        resolve();
        return;
      }
    }
    const obsNode = new config2.context.MutationObserver((mutations) => {
      const target = mutations[0].target;
      const currentClasses = target.className.split(" ");
      const containsAll = names.every((element) => currentClasses.includes(element));
      if (containsAll) {
        obsNode.disconnect();
        resolve();
      }
    });
    obsNode.observe(Node, {
      childList: false,
      subtree: false,
      attributes: true,
      attributeFilter: ["class"],
      characterData: false
    });
    if (overwrite) {
      Node.className = classesNames;
    } else {
      const space = Node.hasAttribute("class") ? " " : "";
      Node.className += space + classesToAdd.join(" ");
    }
  });
};
const removeProp = (Node, propName, context) => {
  return new Promise((resolve) => {
    if (!Node.hasAttribute(propName)) {
      resolve();
      return;
    }
    const obsNode = new context.MutationObserver(() => {
      obsNode.disconnect();
      resolve();
    });
    obsNode.observe(Node, {
      childList: false,
      subtree: false,
      attributes: true,
      attributeFilter: [propName],
      characterData: false
    });
    Node.removeAttribute(propName);
  });
};
const removeProps = (Node, propNames, context) => {
  return new Promise((resolve) => {
    const promises = propNames.map((name) => removeProp(Node, name, context));
    Promise.all(promises).then(() => resolve());
  });
};
const removeAttr = (Node, propNames) => {
  return new Promise((resolve) => {
    const config2 = getConfig();
    if (Array.isArray(propNames)) {
      removeProps(Node, propNames, config2.context).then(resolve);
    } else {
      removeProp(Node, propNames, config2.context).then(resolve);
    }
  });
};
const eventReady = ({ node, directive, classes, resolve }) => {
  const config2 = getConfig();
  removeAttr(node, directive).then(() => addClasses(node, classes)).then(() => {
    resolve();
    const event = new config2.context.CustomEvent("layout:ready");
    node.dispatchEvent(event);
  });
};
const set = (Node, parameters) => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    const arrParams = Object.keys(params);
    if (!arrParams.length) {
      const err = regError("Parameter Missing", "don't exists any parameter to process", Node);
      reject(err);
      return;
    }
    const toBuild = {};
    for (const prop in params) {
      toBuild[prop] = params[prop];
    }
    const classesObj = build(toBuild, true);
    if (classesObj instanceof Error) {
      reject(classesObj);
      return;
    }
    const classes = classesObj;
    const classesNames = Object.keys(classes).map((name) => Object.keys(classes[name])).flat().join(" ");
    eventReady({
      node: Node,
      directive: arrParams,
      classes: classesNames,
      resolve
    });
  });
};
const directiveValues = (Node, directives) => {
  const directiveValues2 = directives.map((item) => Node.getAttribute(item)).filter((item) => item).join(" ");
  return !directiveValues2 ? regError("Empty", 'The value of the directives "' + directives.join(", ") + '" are empty', Node) : directiveValues2;
};
const setFlex = (Node, flexValues) => {
  return new Promise((resolve, reject) => {
    const values = flexValues || directiveValues(Node, ["flex", "fx"]);
    if (!values)
      return reject(values);
    const objStyles = buildFlex(values, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }
    eventReady({
      node: Node,
      directive: "flex",
      classes: Object.keys(objStyles).join(" "),
      resolve
    });
  });
};
const setCols = (Node, columns) => {
  return new Promise((resolve, reject) => {
    const values = columns || directiveValues(Node, ["c", "cols"]);
    if (!values)
      return reject(values);
    const objStyles = buildCols(values, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }
    const classesToAdd = Object.keys(objStyles).join(" ");
    eventReady({
      node: Node,
      directive: "cols",
      classes: classesToAdd,
      resolve
    });
  });
};
const setAttr = (Node, directives, vals) => {
  return new Promise((resolve, reject) => {
    const values = vals || directiveValues(Node, directives);
    if (!values)
      return reject(values);
    const directive = directives[0];
    const objStyles = buildAttr(values, directive, true);
    const classesToAdd = Object.keys(objStyles).join(" ");
    eventReady({
      node: Node,
      directive,
      classes: classesToAdd,
      resolve
    });
  });
};
const setHeight = (Node, values) => {
  return setAttr(Node, ["hgt", "h"], values);
};
const setMarBottom = (Node, values) => {
  return setAttr(Node, ["marb", "mb", "margin-bottom"], values);
};
const setMarLeft = (Node, values) => {
  return setAttr(Node, ["marl", "ml", "margin-left"], values);
};
const setMarRight = (Node, values) => {
  return setAttr(Node, ["marr", "mr", "margin-right"], values);
};
const setMar = (Node, values) => {
  return setAttr(Node, ["mar", "m", "margin"], values);
};
const setMarTop = (Node, values) => {
  return setAttr(Node, ["mart", "mt", "margin-top"], values);
};
const setMaxWidth = (Node, values) => {
  return setAttr(Node, ["mxw", "max-width"], values);
};
const setMinHeight = (Node, values) => {
  return setAttr(Node, ["mih", "min-height"], values);
};
const setMinWidth = (Node, values) => {
  return setAttr(Node, ["miw", "min-width"], values);
};
const setPadBottom = (Node, values) => {
  return setAttr(Node, ["padb", "pb", "padding-bottom"], values);
};
const setPadLeft = (Node, values) => {
  return setAttr(Node, ["padl", "pl", "padding-left"], values);
};
const setPadRight = (Node, values) => {
  return setAttr(Node, ["padr", "pr", "padding-right"], values);
};
const setPad = (Node, values) => {
  return setAttr(Node, ["pad", "p", "padding"], values);
};
const setPadTop = (Node, values) => {
  return setAttr(Node, ["padt", "pt", "padding-top"], values);
};
const setWidth = (Node, values) => {
  return setAttr(Node, ["wdh", "width"], values);
};
const setMaxHeight = (Node, values) => {
  return setAttr(Node, ["mxh", "max-height"], values);
};
const setPosition = (Node, values) => {
  return setAttr(Node, ["pos", "position"], values);
};
const setTop = (Node, values) => {
  return setAttr(Node, ["t", "top"], values);
};
const setRight = (Node, values) => {
  return setAttr(Node, ["r", "right"], values);
};
const setBottom = (Node, values) => {
  return setAttr(Node, ["b", "bottom"], values);
};
const setLeft = (Node, values) => {
  return setAttr(Node, ["l", "left"], values);
};
const setterXY = (data) => {
  return new Promise((resolve, reject) => {
    const values = data.vals || directiveValues(data.Node, data.directives);
    if (!values)
      return reject(values);
    const objStyles = data.builder(values, true);
    const classesToAdd = Object.keys(objStyles).join(" ");
    eventReady({
      node: data.Node,
      directive: data.directives,
      classes: classesToAdd,
      resolve
    });
  });
};
const setPadX = (Node, vals) => {
  return setterXY({
    Node,
    directives: ["padx", "px", "padding-x"],
    builder: buildPadX,
    vals
  });
};
const setPadY = (Node, vals) => {
  return setterXY({
    Node,
    directives: ["pady", "py", "padding-y"],
    builder: buildPadY,
    vals
  });
};
const setMarX = (Node, vals) => {
  return setterXY({
    Node,
    directives: ["marx", "px", "margin-x"],
    builder: buildMarX,
    vals
  });
};
const setMarY = (Node, vals) => {
  return setterXY({
    Node,
    directives: ["mary", "py", "margin-y"],
    builder: buildMarY,
    vals
  });
};
const reset = (Node) => {
  return new Promise((resolve) => {
    const classPrefixes = new Set(Object.keys(processors).map((item) => processors[item].classPrefix));
    const layouterClasses = [...classPrefixes];
    const restClass = Node.className.split(" ").filter((name) => {
      if (!name.includes("-")) {
        return true;
      } else {
        const findClass = layouterClasses.find((item) => {
          const nLength = item.length;
          const namePrefix = name.substring(0, nLength + 1);
          return namePrefix === item + "-";
        });
        return !findClass;
      }
    });
    if (restClass.length) {
      const classesName = restClass.join(" ");
      addClasses(Node, classesName, true).then(() => {
        resolve();
      });
    } else {
      removeAttr(Node, "class").then(() => {
        resolve();
      });
    }
  });
};
const nodesNotAccepted = [
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
];
const searchAndProcess = (layouter2, context) => {
  return new Promise((resolve) => {
    const props = Object.keys(processors);
    const attrs = props.map((prop) => `[${prop}]`).join(", ");
    const nodes = context.querySelectorAll(attrs);
    if (!nodes.length) {
      resolve(layouter2);
      return;
    }
    const setNodes = /* @__PURE__ */ new Set();
    Array.prototype.filter.call(nodes, (itemNode) => !nodesNotAccepted.includes(itemNode.nodeName.toLowerCase())).forEach((item) => setNodes.add(item));
    const promises = [];
    setNodes.forEach((node) => {
      promises.push(layouter2.set(node));
    });
    Promise.all(promises).then(resolve);
  });
};
const mainObserver = (layouter2) => {
  const config2 = getConfig();
  const props = Object.keys(processors);
  const obsBody = new layouter2.context.MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        if (!mutation.addedNodes.length) {
          continue;
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const props2 = layouter2.getParameters(node);
            if (Object.keys(props2).length) {
              layouter2.set(node, props2);
            }
            searchAndProcess(layouter2, node);
          }
        });
      } else if (mutation.type === "attributes") {
        const node = mutation.target;
        if (node instanceof HTMLElement) {
          const props2 = layouter2.getParameters(node);
          if (Object.keys(props2).length) {
            layouter2.set(node, props2);
          }
        }
      }
    }
  });
  const observerOptions = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: props,
    characterData: false
  };
  obsBody.observe(config2.context.document.body, observerOptions);
};
const layouter = (context, userConfig = {}) => {
  const config2 = setConfig(context, userConfig);
  const instance = {
    ...config2,
    getParameters,
    updateConfig,
    insertRules,
    build,
    buildCols,
    buildFlex,
    buildPad,
    buildPadTop,
    buildPadRight,
    buildPadBottom,
    buildPadLeft,
    buildPadX,
    buildPadY,
    buildMar,
    buildMarTop,
    buildMarRight,
    buildMarBottom,
    buildMarLeft,
    buildMarX,
    buildMarY,
    buildMaxWidth,
    buildMaxHeight,
    buildMinWidth,
    buildMinHeight,
    buildHeight,
    buildWidth,
    set,
    setCols,
    setFlex,
    setMar,
    setMarTop,
    setMarRight,
    setMarBottom,
    setMarLeft,
    setMarX,
    setMarY,
    setPad,
    setPadTop,
    setPadRight,
    setPadBottom,
    setPadLeft,
    setPadX,
    setPadY,
    setWidth,
    setMinWidth,
    setMaxWidth,
    setHeight,
    setMinHeight,
    setMaxHeight,
    reset,
    buildPosition,
    buildTop,
    buildRight,
    buildBottom,
    buildLeft,
    setPosition,
    setTop,
    setRight,
    setBottom,
    setLeft
  };
  if (config2.searchOnInit) {
    searchAndProcess(instance, context.document).then(() => {
      if (instance.ready)
        instance.ready(instance);
      if (config2.observer)
        mainObserver(instance);
    });
  } else {
    if (config2.observer)
      mainObserver(instance);
    if (instance.ready)
      instance.ready(instance);
  }
  return instance;
};
if (typeof window !== "undefined" && typeof exports === "undefined") {
  window.layouter = layouter(window);
}
export { layouter as default };
//# sourceMappingURL=layouter.es.js.map
