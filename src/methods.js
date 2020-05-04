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
 * Procesa las columnas requeridas, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valCols columnas a procesar
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
  if (!Array.isArray(valCols)) valCols = valCols.split(' ');
  valCols.forEach(function (param) {
    selectorName = param;

    paramPrepared = uLayouter.prepareParam(param);
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
 * Setea los paddings necesarios para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPads = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'pad', parameters, this);
};

/**
 * Setea el padding top necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadTop = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'padt', parameters, this);
};

/**
 * Setea el padding right necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadRight = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'padr', parameters, this);
};

/**
 * Setea el padding bottom necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadBottom = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'padb', parameters, this);
};

/**
 * Setea el padding left necesario para un nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setPadLeft = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'padl', parameters, this);
};

/**
 * Setea los margins necesarios para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMars = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'mar', parameters, this);
};

/**
 * Setea el margin top necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarTop = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'mart', parameters, this);
};

/**
 * Setea el margin right necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarRight = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'marr', parameters, this);
};

/**
 * Setea el margin bottom necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarBottom = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'marb', parameters, this);
};

/**
 * Setea el margin left necesario para un Nodo.
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 * @param {Object} [parameters] Parametros obtenidos del nodo.
 */
Layouter.prototype.setMarLeft = function (Node, parameters) {
  uLayouter.padsAndMargs(Node, 'marl', parameters, this);
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
  let bpNameS, bpCals = {};

  // Getting numbers
  let selectorName, paramPrepared, flexSplited,  propVal, nameProp, valProp;
  params.flex.forEach(function (param) {
    selectorName = param;

    paramPrepared = uLayouter.prepareParam(param);
    bpNameS = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    flexSplited = param.split(':');
    nameProp = flexSplited[0];
    if (uLayouter.flexpv.hasOwnProperty(nameProp)) {
      valProp = flexSplited[1];
      if (uLayouter.flexpv.hasOwnProperty(valProp)) {
        propVal = uLayouter.flexpv[nameProp] + ':' + uLayouter.flexpv[flexSplited[1]]
      } else {
        return uLayouter.regError('Non-existent Alias', "Don't exists the alias '" + valProp + "' in Flex vault.");
      }
    } else {
      return uLayouter.regError('Non-existent Alias', "Don't exists the alias '" + nameProp + "' in Flex vault.");
    }

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

  // Creating Styles, inserting, and adding classNames of rules in Node.
  uLayouter.settingCss({
    type: 'flex',
    bps: bpCals,
    instance: this,
    node: Node
  });

  // removing param
  Node.removeAttribute('flex');
};

/**
 * Procesa todos los atributos de procesamiento que se tenga disponible
 * @memberof Layouter
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 */
Layouter.prototype.build = function (Node) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  uLayouter.debug({
    type: 'i',
    print: this.debug,
    message: "Starting the build of the Node:",
    data: Node
  });
  const params = this.getParameters(Node);
  const proNames = Object.keys(params);
  const _this = this;
  if (proNames.length) {
    proNames.forEach(function (processorName) {
      _this[uLayouter.processors[processorName].method](Node, params);
    });
  } else {
    uLayouter.regError('Parameter Missing', "don't exists any parameter to process")
  }
};