/**
 * Procesa todos los atributos de procesamiento que se tenga disponible
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 */
Layouter.prototype.set = function (Node) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Starting the 'set' of the Node:",
    data: Node
  });
  const params = this.getParameters(Node);
  const arrParams = Object.keys(params);
  if (!arrParams.length) return uLayouter.regError('Parameter Missing', "don't exists any parameter to process");
  const toBuild = {};
  for(let prop in params) toBuild[prop] = params[prop].join(' ');
  const classesObj = this.build(toBuild);
  const classesNames = Object.keys(classesObj)
    .map(function (name) {
      return Object.keys(classesObj[name]).join(' ')
    })
    .join(' ');
  Node.className = Node.className ? Node.className + ' ' + classesNames : classesNames;
  arrParams.forEach(function (nameParam) {
    setTimeout(function (name) {
      Node.removeAttribute(name);
    }, 0, nameParam)
  })
};

/**
 * Procesa un objeto de designaciones que representan los atributos de un Nodo
 * @memberof Layouter
 * @param {Object} obj Contenedor de los atributos a procesar.
 */
Layouter.prototype.build = function (obj) {
  if (!Node) return uLayouter.regError('Non-existent Object', "Don't exists the object for processing.");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Starting building the attributes:",
    data: obj
  });
  const rObj = {}, _this = this;
  let propData;
  Object.keys(obj).forEach(function (prop) {
    propData = uLayouter.processors[prop];
    if (propData) rObj[prop] = _this[propData.build](obj[prop])
  });
  return (Object.keys(rObj).length) ? rObj : false;
};

/**
 * Obtiene los parametros disponibles para procesar
 * @memberof Layouter
 * @param {Object} Nodo Nodo de donde obtener los parametros.
 * @returns {Object}
 */
Layouter.prototype.getParameters = function (Node) {
  const params = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(uLayouter.processors);
  Array.prototype.forEach.call(attrs, function (attr) {
    if (paramNames.indexOf(attr.name) !== -1) {
      if (attr.value !== '') params[attr.name] = attr.value.trim().split(' ');
    }
  });
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: 'Getting / Getted parameters of the Node:',
    data: {
      parameters: params,
      node: Node
    }
  });
  return params;
};

/**
 * Remueve las clases de tipo layouter de cualquier nodo pasado
 * @memberof Layouter
 * @param {Object} Nodo Nodo al cual remover las clases
 * @returns {Array} Las clases remover.
 */
Layouter.prototype.reset = function (Node) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  if (!Node.className) {
    uLayouter.debug({
      type: 'i',
      print: this.debug,
      message: "The Node passed haven't any CSS class",
      data: Node
    });
    return classesList
  };
  let nPrex, prex;
  const layouterClasses = Object.keys(uLayouter.processors);
  const restClass = [];
  const classList = Node.className.split(' ')
    .filter(function (name) {
      if (name.length < 4) {
        restClass.push(name);
        return false; 
      }
      nPrex = name.length >= 5 ? 5 : 4;
      prex = name.substring(0, nPrex);
      let lineIndex = prex.split('').indexOf('-');
      if (lineIndex === -1) {
        restClass.push(name);
        return false;
      }
      prex = prex.substring(0, lineIndex);
      if (layouterClasses.indexOf(prex) !== -1) {
        return true;
      } else {
        restClass.push(name);
        return false;
      }
    });
  if (restClass.length) {
    Node.className = restClass.join(' ');
  } else {
    Node.removeAttribute('class');
  }
  return classList;
};

/**
 * Construye las columnas requeridas, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valCols columnas a procesar
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @returns {Object}
 */
Layouter.prototype.buildCols = function (valCols, insertStyles) {
  if (valCols === undefined) return uLayouter.regError('Parameter Missing', "Don't exists 'cols' determined");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Building the 'cols': " + valCols,
  });
  const _this = this;
  let cols, bp, bpCals = {};

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  const bpsObj = this.breakPoints;
  if (!Array.isArray(valCols)) valCols = valCols.split(' ');
  valCols.forEach(function (param) {
    selectorName = param;
    paramPrepared = uLayouter.prepareParam(param, bpsObj);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    if (param.indexOf('/') !== -1) {
      cols = param.split('/');
    } else {
      if (paramPrepared.widthBp) {
        if (bp.indexOf('-') === -1) {
          cols = [param, _this.cols[bp]];
        } else {
          uLayouter.regError('SyntaxError', "You can't determine a 'until breakpoint' when use the explicit columns max");
        }
      } else {
        cols = [param, _this.cols.xs];
      }
    }
    propValue = uLayouter.calPercentage(cols[0], cols[1]);
    if (paramPrepared.important) propValue += ' !important';

    bpCals[bp] = {
      name: selectorName,
      value: propValue
    };
  });

  // Building the classNames and the styles to use.
  return uLayouter.buildCss({
    type: 'cols',
    bps: bpCals,
    instance: this,
    deep: (insertStyles === undefined ? true : insertStyles)
  });
};

/**
 * Asigna los estilos necesarios a un nodo referentes a las columnas determinadas
 * @memberof Layouter
 * @param {Object} Node Nodo a donde asignar los estilos
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setCols = function (Node, parameters) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Processing the 'cols' to the Node:",
    data: Node
  });
  const params = parameters || this.getParameters(Node);
  if (!params.hasOwnProperty('cols')) return uLayouter.regError('Parameter Missing', "Don't exists 'cols' determined");

  // Creating, inserting, and adding classNames of rules in Node.
  const objStyles = this.buildCols(params.cols);

  // adding the classes names to the Node
  uLayouter.addClasses(Object.keys(objStyles), Node, this);

  // removing param
  Node.removeAttribute('cols');
};

/**
 * Construye los paddings requeridas, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPads Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPads = function (valPads, insertStyles) {
  return uLayouter.buildAttr(valPads, 'pad', this, insertStyles);
};

/**
 * Setea los paddings necesarios para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPads = function (Node, parameters) {
  uLayouter.setAttr(Node, 'pad', parameters, this);
};

/**
 * Construye el padding superior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadTop = function (valPad, insertStyles) {
  return uLayouter.buildAttr(valPad, 'padt', this, insertStyles);
};

/**
 * Setea el padding top necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadTop = function (Node, parameters) {
  uLayouter.setAttr(Node, 'padt', parameters, this);
};

/**
 * Construye el padding derecho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadRight = function (valPad, insertStyles) {
  return uLayouter.buildAttr(valPad, 'padr', this, insertStyles);
};

/**
 * Setea el padding right necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadRight = function (Node, parameters) {
  uLayouter.setAttr(Node, 'padr', parameters, this);
};

/**
 * Construye el padding inferior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadBottom = function (valPad, insertStyles) {
  return uLayouter.buildAttr(valPad, 'padb', this, insertStyles);
};

/**
 * Setea el padding bottom necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadBottom = function (Node, parameters) {
  uLayouter.setAttr(Node, 'padb', parameters, this);
};

/**
 * Construye el padding izquierdo, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadLeft = function (valPad, insertStyles) {
  return uLayouter.buildAttr(valPad, 'padl', this, insertStyles);
};

/**
 * Setea el padding left necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadLeft = function (Node, parameters) {
  uLayouter.setAttr(Node, 'padl', parameters, this);
};

/**
 * Construye los margenes, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMars Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMars = function (valMars, insertStyles) {
  return uLayouter.buildAttr(valMars, 'mar', this, insertStyles);
};

/**
 * Setea los margins necesarios para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMars = function (Node, parameters) {
  uLayouter.setAttr(Node, 'mar', parameters, this);
};

/**
 * Construye el margen superior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarTop = function (valMar, insertStyles) {
  return uLayouter.buildAttr(valMar, 'mart', this, insertStyles);
};

/**
 * Setea el margin top necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarTop = function (Node, parameters) {
  uLayouter.setAttr(Node, 'mart', parameters, this);
};

/**
 * Construye el margen derecho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarRight = function (valMar, insertStyles) {
  return uLayouter.buildAttr(valMar, 'marr', this, insertStyles);
};

/**
 * Setea el margin right necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarRight = function (Node, parameters) {
  uLayouter.setAttr(Node, 'marr', parameters, this);
};

/**
 * Construye el margen inferior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarBottom = function (valMar, insertStyles) {
  return uLayouter.buildAttr(valMar, 'marb', this, insertStyles);
};

/**
 * Setea el margin bottom necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarBottom = function (Node, parameters) {
  uLayouter.setAttr(Node, 'marb', parameters, this);
};

/**
 * Construye el margen inferior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarLeft = function (valMar, insertStyles) {
  return uLayouter.buildAttr(valMar, 'marl', this, insertStyles);
};

/**
 * Setea el margin left necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarLeft = function (Node, parameters) {
  uLayouter.setAttr(Node, 'marl', parameters, this);
};

/**
 * Construye las reglas CSS y nombre de clases referente al 'flex'.
 * @memberof Layouter
 * @param {String} valFlex columnas a procesar
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @returns {Object}
 */
Layouter.prototype.buildFlex = function (valFlex, insertStyles) {
  if (valFlex === undefined) return uLayouter.regError('Parameter Missing', "Don't exists 'flex' determined");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Building the 'flex': " + valFlex,
  });
  let bpNameS, bpCals = {};

  // Getting numbers
  let selectorName, paramPrepared, flexSplited,  propVal, nameProp, valProp;
  if (!Array.isArray(valFlex)) valFlex = valFlex.split(' ');
  const bpsObj = this.breakPoints;
  valFlex.forEach(function (param) {
    selectorName = param;

    paramPrepared = uLayouter.prepareParam(param, bpsObj);
    bpNameS = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    flexSplited = param.split(':');
    nameProp = flexSplited[0];
    valProp = flexSplited[1];
    if (uLayouter.flexAttrsSelf.indexOf(nameProp) === -1) { // ignoring the flex attrs selfs
      if (uLayouter.flexpv.hasOwnProperty(nameProp)) {
        if (uLayouter.flexpv.hasOwnProperty(valProp)) {
          propVal = uLayouter.flexpv[nameProp] + ':' + uLayouter.flexpv[valProp];
        } else {
          return uLayouter.regError('Non-existent Alias', "Don't exists the alias '" + valProp + "' in Flex vault.");
        }
      } else {
        return uLayouter.regError('Non-existent Alias', "Don't exists the alias '" + nameProp + "' in Flex vault.");
      }
    } else {
      propVal = uLayouter.flexpv[nameProp] + ':' + valProp;
    }

    if (paramPrepared.important) propVal += ' !important';

    if (bpCals.hasOwnProperty(bpNameS)) {
      if (selectorName.indexOf('@') !== 1) selectorName = selectorName.split('@')[0];
      bpCals[bpNameS].name = bpCals[bpNameS].name.split('@')[0] + '-' + selectorName + '@' + bpNameS;
      bpCals[bpNameS].value += ';' + propVal;
    } else {
      bpCals[bpNameS] = {
        name: selectorName,
        value: propVal
      };
    }
  });

  // Building the classNames and the styles to use.
  return uLayouter.buildCss({
    type: 'flex',
    bps: bpCals,
    instance: this,
    deep: (insertStyles === undefined ? true : insertStyles)
  });
};

/**
 * Setea la propiedad Flex y las reglas designadas
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setFlex = function (Node, parameters) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Processing the 'flex' parameter to the Node:",
    data: Node
  });
  const params = parameters || this.getParameters(Node);
  if (!params.hasOwnProperty('flex')) return uLayouter.regError('Parameter Missing', "Don't exists 'flex' determinated.");

  // Creating, inserting, and adding classNames of rules in Node.
  const objStyles = this.buildFlex(params.flex);

  // adding the classes names to the Node
  uLayouter.addClasses(Object.keys(objStyles), Node, this);

  // removing param
  Node.removeAttribute('flex');
};

/**
 * Construye el máximo ancho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMxw máximo ancho a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMaxWidth = function (valMxw, insertStyles) {
  return uLayouter.buildAttr(valMxw, 'mxw', this, insertStyles);
};

/**
 * Setea el máximo ancho necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMaxWidth = function (Node, parameters) {
  uLayouter.setAttr(Node, 'mxw', parameters, this);
};

/**
 * Construye el máximo alto, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMxh máximo alto a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMaxHeight = function (valMxh, insertStyles) {
  return uLayouter.buildAttr(valMxh, 'mxh', this, insertStyles);
};

/**
 * Setea el máximo alto necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMaxHeight = function (Node, parameters) {
  uLayouter.setAttr(Node, 'mxh', parameters, this);
};

/**
 * Construye el mínimo ancho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMiw mínimo ancho a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMinWidth = function (valMiw, insertStyles) {
  return uLayouter.buildAttr(valMiw, 'miw', this, insertStyles);
};

/**
 * Setea el mínimo ancho necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMinWidth = function (Node, parameters) {
  uLayouter.setAttr(Node, 'miw', parameters, this);
};

/**
 * Construye el mínimo alto, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMih mínimo alto a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMinHeight = function (valMih, insertStyles) {
  return uLayouter.buildAttr(valMih, 'mih', this, insertStyles);
};

/**
 * Setea el mínimo alto necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMinHeight = function (Node, parameters) {
  uLayouter.setAttr(Node, 'mih', parameters, this);
};

/**
 * Construye el alto, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valRows alto a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildHeight = function (valHeight, insertStyles) {
  return uLayouter.buildAttr(valHeight, 'hgt', this, insertStyles);
};

/**
 * Setea el alto necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setHeight = function (Node, parameters) {
  uLayouter.setAttr(Node, 'hgt', parameters, this);
};

/**
 * Construye el ancho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valRows alto a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildWidth = function (valWidth, insertStyles) {
  return uLayouter.buildAttr(valWidth, 'wdh', this, insertStyles);
};

/**
 * Setea el ancho necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setWidth = function (Node, parameters) {
  uLayouter.setAttr(Node, 'wdh', parameters, this);
};
