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
  node
}) => {
  let stylesScope = document.getElementById("layouter-" + bp);
  if (!stylesScope) {
    stylesScope = document.createElement("style");
    stylesScope.appendChild(document.createTextNode(""));
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
          stylesScope.appendChild(document.createTextNode(ruleCss));
        },
        rules: []
      },
      node: stylesScope
    };
  }
  return bridge;
};
const scopesStylesBuilder = (breakpoints, bridge, scope) => {
  const scopes = scope || {};
  Object.keys(breakpoints).forEach((bp) => {
    if (!scopes[bp]) {
      scopes[bp] = createScopeStyles({
        bridge,
        bp,
        insertionType: "append",
        node: document.body
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
const version = "1.2.1";
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
  debug: true
};
let config;
const configNums = (bps, bridge, scope) => {
  const sizes = breakpointsNums(bps, "width");
  const finalBps = breakpointsOrdered(bps, sizes);
  return {
    sizes,
    cols: breakpointsNums(bps, "cols"),
    scope: scopesStylesBuilder(finalBps, bridge, scope),
    breakpoints: finalBps
  };
};
const setConfig = (customCfg = {}) => {
  if (typeof window !== "undefined") {
    baseConfig = {
      ...baseConfig,
      ...window.layouterConfig,
      ...customCfg
    };
  } else {
    if (customCfg) {
      baseConfig = {
        ...baseConfig,
        ...customCfg
      };
    }
  }
  config = {
    ...baseConfig,
    ...configNums(baseConfig.breakpoints, baseConfig.bridge),
    styles: {},
    version
  };
  return config;
};
const setStyles = (className, value) => {
  config.styles[className] = value;
};
const getConfig = (reset2 = false) => {
  return reset2 ? setConfig() : config;
};
const updateConfig = (userConfig) => {
  config = {
    ...config,
    ...userConfig
  };
  if (userConfig.breakpoints) {
    config = {
      ...config,
      ...configNums(config.breakpoints, config.bridge, config.scope)
    };
  }
  return config;
};
const processors = {
  cols: {
    set: "setCols",
    build: "buildCols",
    ruleCss: "width"
  },
  pad: {
    set: "setPad",
    build: "buildPad",
    ruleCss: "padding"
  },
  padt: {
    set: "setPadTop",
    build: "buildPadTop",
    ruleCss: "padding-top"
  },
  padr: {
    set: "setPadRight",
    build: "buildPadRight",
    ruleCss: "padding-right"
  },
  padb: {
    set: "setPadBottom",
    build: "buildPadBottom",
    ruleCss: "padding-bottom"
  },
  padl: {
    set: "setPadLeft",
    build: "buildPadLeft",
    ruleCss: "padding-left"
  },
  mar: {
    set: "setMar",
    build: "buildMar",
    ruleCss: "margin"
  },
  mart: {
    set: "setMarTop",
    build: "buildMarTop",
    ruleCss: "margin-top"
  },
  marr: {
    set: "setMarRight",
    build: "buildMarRight",
    ruleCss: "margin-right"
  },
  marb: {
    set: "setMarBottom",
    build: "buildMarBottom",
    ruleCss: "margin-bottom"
  },
  marl: {
    set: "setMarLeft",
    build: "buildMarLeft",
    ruleCss: "margin-left"
  },
  flex: {
    set: "setFlex",
    build: "buildFlex",
    ruleCss: "display: flex"
  },
  mxw: {
    set: "setMaxWidth",
    build: "buildMaxWidth",
    ruleCss: "max-width"
  },
  mxh: {
    set: "setMaxHeight",
    build: "buildMaxHeight",
    ruleCss: "max-height"
  },
  miw: {
    set: "setMinWidth",
    build: "buildMinWidth",
    ruleCss: "min-width"
  },
  mih: {
    set: "setMinHeight",
    build: "buildMinHeight",
    ruleCss: "min-height"
  },
  wdh: {
    set: "setWidth",
    build: "buildWidth",
    ruleCss: "width"
  },
  hgt: {
    set: "setHeight",
    build: "buildHeight",
    ruleCss: "height"
  }
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
      node: scope[bpUntil].node
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
    node: scope[fromBp].node
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
const flexProsAndVals = {
  jc: "justify-content",
  ai: "align-items",
  ce: "center",
  fs: "flex-start",
  fe: "flex-end",
  sb: "space-between",
  sa: "space-around",
  fw: "flex-wrap",
  nw: "nowrap",
  w: "wrap",
  wr: "wrap-reverse",
  fd: "flex-direction",
  r: "row",
  rr: "row-reverse",
  co: "column",
  cor: "column-reverse",
  fg: "flex-grow",
  fh: "flex-shrink",
  as: "align-self",
  or: "order",
  au: "auto",
  st: "stretch",
  bl: "baseline",
  in: "initial",
  ih: "inherit"
};
const flexAttrsSelf = ["fg", "fh", "or"];
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
    nameClass = finalPrefix + directive + "-" + nameClass.replace(/\//g, "\\/").replace(/:/g, "\\:").replace("@", "\\@").split(".").join("_");
    let propAndVal;
    if (directive === "flex") {
      propAndVal = bps[bp].value;
      const flexImportant = shortNameClass.includes("!") ? ";display:flex !important;" : ";display:flex;";
      const attrsFlexSelfs = ["as"].concat(flexAttrsSelf).filter((nameAttrFlex) => shortNameClass.includes(nameAttrFlex + ":"));
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
    let selectorName = param;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const flexSplited = paramPrepared.numbers.split(":");
    const nameProp = flexSplited[0];
    const valProp = flexSplited[1];
    if (!flexAttrsSelf.includes(nameProp)) {
      if (!flexProsAndVals[nameProp]) {
        err = regError("Non-existent Alias", "Don't exists the alias '" + nameProp + "' in Flex vault.");
        break;
      }
      if (!flexProsAndVals[valProp]) {
        err = regError("Non-existent Alias", "Don't exists the alias '" + valProp + "' in Flex vault.");
        break;
      }
      propVal = flexProsAndVals[nameProp] + ":" + flexProsAndVals[valProp];
    } else {
      propVal = flexProsAndVals[nameProp] + ":" + valProp;
    }
    if (paramPrepared.important)
      propVal += " !important";
    if (!bpCals[bpNames]) {
      bpCals[bpNames] = {
        name: selectorName,
        value: propVal
      };
    } else {
      if (selectorName.includes("@"))
        selectorName = selectorName.split("@")[0];
      const sufixBp = bpNames === firstBp ? "" : "@" + bpNames;
      bpCals[bpNames].name = bpCals[bpNames].name.split("@")[0] + "-" + selectorName + sufixBp;
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
const relativeMeasures = ["%", "rem", "em", "ex", "vw", "vh"];
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
const buildAttr = (values, prop, insertStyles = false) => {
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
    type: prop,
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
const builders = {
  buildCols,
  buildFlex,
  buildPad,
  buildPadTop,
  buildPadRight,
  buildPadBottom,
  buildPadLeft,
  buildMar,
  buildMarTop,
  buildMarRight,
  buildMarBottom,
  buildMarLeft,
  buildMaxWidth,
  buildMaxHeight,
  buildMinWidth,
  buildMinHeight,
  buildHeight,
  buildWidth
};
const build = (obj, insertStyles = false) => {
  const rObj = {};
  let err = false;
  for (const prop in obj) {
    const propData = processors[prop];
    const objStyles = builders[propData.build](obj[prop], insertStyles);
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
    const names = classesNames.split(" ");
    let classesToAdd = names;
    if (!overwrite) {
      classesToAdd = names.filter((name) => !Node.classList.contains(name));
      if (!classesToAdd.length) {
        resolve();
        return;
      }
    }
    const obsNode = new MutationObserver((mutations) => {
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
const removeProp = (Node, propName) => {
  return new Promise((resolve) => {
    if (!Node.hasAttribute(propName)) {
      resolve();
      return;
    }
    const obsNode = new MutationObserver(() => {
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
const removeProps = (Node, propNames) => {
  return new Promise((resolve) => {
    const promises = propNames.map((name) => removeProp(Node, name));
    Promise.all(promises).then(() => resolve());
  });
};
const removeAttr = (Node, propNames) => {
  return new Promise((resolve) => {
    if (Array.isArray(propNames)) {
      removeProps(Node, propNames).then(resolve);
    } else {
      removeProp(Node, propNames).then(resolve);
    }
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
    removeAttr(Node, arrParams).then(() => addClasses(Node, classesNames)).then(() => {
      resolve();
      const event = new CustomEvent("layout:ready");
      Node.dispatchEvent(event);
    });
  });
};
const setFlex = (Node, flexValues) => {
  return new Promise((resolve, reject) => {
    const values = flexValues || Node.getAttribute("flex");
    if (!values) {
      const err = regError("Empty", 'The value of the directive "flex" is empty', Node);
      reject(err);
      return;
    }
    const objStyles = buildFlex(values, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }
    const classesToAdd = Object.keys(objStyles).join(" ");
    removeAttr(Node, "flex").then(() => addClasses(Node, classesToAdd)).then(() => {
      resolve();
      const event = new CustomEvent("layout:ready");
      Node.dispatchEvent(event);
    });
  });
};
const setCols = (Node, columns) => {
  return new Promise((resolve, reject) => {
    const values = columns || Node.getAttribute("cols");
    if (!values) {
      const err = regError("Empty", "The value of the directive 'cols' is empty", Node);
      reject(err);
      return;
    }
    const objStyles = buildCols(values, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }
    const classesToAdd = Object.keys(objStyles).join(" ");
    removeAttr(Node, "cols").then(() => addClasses(Node, classesToAdd)).then(() => {
      resolve();
      const event = new CustomEvent("layout:ready");
      Node.dispatchEvent(event);
    });
  });
};
const setAttr = (Node, directive, values) => {
  return new Promise((resolve, reject) => {
    const directiveValues = values || Node.getAttribute(directive);
    if (!directiveValues) {
      const err = regError("Empty", 'The value of the directive "' + directive + '" is empty', Node);
      reject(err);
      return;
    }
    const objStyles = buildAttr(directiveValues, directive, true);
    const classesToAdd = Object.keys(objStyles).join(" ");
    removeAttr(Node, directive).then(() => addClasses(Node, classesToAdd)).then(() => {
      resolve();
      const event = new CustomEvent("layout:ready");
      Node.dispatchEvent(event);
    });
  });
};
const setHeight = (Node, values) => {
  return setAttr(Node, "hgt", values);
};
const setMarBottom = (Node, values) => {
  return setAttr(Node, "marb", values);
};
const setMarLeft = (Node, values) => {
  return setAttr(Node, "marl", values);
};
const setMarRight = (Node, values) => {
  return setAttr(Node, "marr", values);
};
const setMar = (Node, values) => {
  return setAttr(Node, "mar", values);
};
const setMarTop = (Node, values) => {
  return setAttr(Node, "mart", values);
};
const setMaxWidth = (Node, values) => {
  return setAttr(Node, "mxw", values);
};
const setMinHeight = (Node, values) => {
  return setAttr(Node, "mih", values);
};
const setMinWidth = (Node, values) => {
  return setAttr(Node, "miw", values);
};
const setPadBottom = (Node, values) => {
  return setAttr(Node, "padb", values);
};
const setPadLeft = (Node, values) => {
  return setAttr(Node, "padl", values);
};
const setPadRight = (Node, values) => {
  return setAttr(Node, "padr", values);
};
const setPad = (Node, values) => {
  return setAttr(Node, "pad", values);
};
const setPadTop = (Node, values) => {
  return setAttr(Node, "padt", values);
};
const setWidth = (Node, values) => {
  return setAttr(Node, "wdh", values);
};
const setMaxHeight = (Node, values) => {
  return setAttr(Node, "mxh", values);
};
const reset = (Node) => {
  return new Promise((resolve) => {
    const layouterClasses = Object.keys(processors);
    const restClass = [];
    Node.className.split(" ").filter((name) => {
      if (name.length < 4) {
        restClass.push(name);
        return false;
      }
      const nPrex = name.length >= 5 ? 5 : 4;
      let prex = name.substring(0, nPrex);
      const lineIndex = prex.split("").indexOf("-");
      if (lineIndex === -1) {
        restClass.push(name);
        return false;
      }
      prex = prex.substring(0, lineIndex);
      if (layouterClasses.includes(prex)) {
        return true;
      } else {
        restClass.push(name);
        return false;
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
const initAutoProcessor = (layouter2) => {
  return new Promise((resolve) => {
    const props = Object.keys(processors);
    const attrs = props.map((prop) => `[${prop}]`).join(", ");
    const nodes = document.querySelectorAll(attrs);
    const setNodes = /* @__PURE__ */ new Set();
    Array.prototype.forEach.call(nodes, (itemNode) => {
      setNodes.add(itemNode);
    });
    const promises = [];
    setNodes.forEach((node) => {
      promises.push(layouter2.set(node));
    });
    Promise.all(promises).then(resolve);
  });
};
const mainObserver = (layouter2) => {
  const props = Object.keys(processors);
  const obsBody = new MutationObserver((mutations) => {
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
  obsBody.observe(document.body, observerOptions);
};
const layouter = (userConfig = {}) => {
  const config2 = setConfig(userConfig);
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
    buildMar,
    buildMarTop,
    buildMarRight,
    buildMarBottom,
    buildMarLeft,
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
    setPad,
    setPadTop,
    setPadRight,
    setPadBottom,
    setPadLeft,
    setWidth,
    setMinWidth,
    setMaxWidth,
    setHeight,
    setMinHeight,
    setMaxHeight,
    reset
  };
  initAutoProcessor(instance).then(() => {
    if (instance.ready)
      instance.ready(instance);
    mainObserver(instance);
  });
  return instance;
};
if (typeof window !== "undefined" && typeof exports === "undefined") {
  window.layouter = layouter();
}
export { layouter as default };
//# sourceMappingURL=layouter.es.js.map