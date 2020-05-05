(function (root) {
'use strict';
  /**
 * Utilidades varias
 * @namespace uLayouter
 * @property {Object} processors Lista de procesadores disponibles, junto a su método y regla css
 * @property {Object} flexpv Equivalencias de las propiedades y valores de flexbox.
 * @property {Object} replaceList Lista de caracteres a reemplazar para el nombre de las clases
 */
const uLayouter = {

  /**
   * Obtiene el width y las columnas de los breakpoints.
   * @memberof uLayouter
   * @param {Object} objBps Objeto de los breakPoints
   * @param {String} propName Nombre de la propiedad
   */
  getNums: function (objBps, propName) {
    const sizes = {};
    Object.keys(objBps).forEach(function (bp) {
      sizes[bp] = propName === 'width' && objBps[bp].direct ? 0 : objBps[bp][propName];
    });
    return sizes;
  },

  /**
   * Determina si el parametro tiene o no un breakpoint designado
   * @memberof uLayouter
   * @param {String} param Parametro
   * @returns {Boolean}
   */
  haveBreakPoint: function (param) {
    return param.indexOf('@') !== -1 ? true : false;
  },

  /**
   * Prepara el parametro de un método especificado. (EJM: cols, pad, etc)
   * @memberof uLayouter
   * @param {String} param Parametro de configuración sobre el método.
   */
  prepareParam: function (param) {
    let bp;
    const haveBp = this.haveBreakPoint(param);
    if (haveBp) {
      const bpSplited = param.split('@');
      param = bpSplited[0];
      bp = bpSplited[1];
    } else {
      bp = 'xs';
    }
    return {
      widthBp: haveBp,
      numbers: param,
      breakPoints: bp
    }
  },

  /**
   * Convierte un string a un número
   * @memberof uLayouter
   * @param {String} n El string que se vá a convertir a número
   * @returns {Number}
   */
  stringToNumber: function (n) {
    return typeof n === 'string' ? parseFloat(n) : n;
  },

  /**
   * Calcula el porcentaje de un número
   * @memberof uLayouter
   * @param {Number} n1 Numero de donde se sacará el porcentaje
   * @param {Number} n2 Número de valor máximo
   */
  calPercentage: function (n1, n2) {
    return (n1 * 100) / n2 + '%'
  },

  /**
   * Procesa un número, si es porcentual lo calcula, sino lo devuelve tal cual, al igual que cuando se recibe 'auto'.
   * @memberof uLayouter
   * @param {String} n Número a procesar
   * @returns {String}
   */
  processedNumber: function (n) {
    let nProcessed;
    if (n.indexOf('/') !== -1) {
      nProcessed = n.split('/');
      nProcessed = this.calPercentage(this.stringToNumber(nProcessed[0]), this.stringToNumber(nProcessed[1]))
    } else if (n === 'auto') {
      nProcessed = 'auto'
    } else if (n.indexOf('.') !== -1) {
      nProcessed = n + 'px';
    } else {
      nProcessed = n === '0' ? n : n + 'px';
    }
    return nProcessed;
  },

  /**
   * Registra en consola diferentes tipos de mensaje.
   * @memberof uLayouter
   * @param {Object} obj Contiene tres propiedades: 'type', 'state', 'message' y posiblemente 'data'
   * 
   * @example
   * uLayouter.debug({
   *  type: 'i',
   *  print: true,
   *  message: 'Getting parameters of the Node:',
   *  data: Node
   * });
   */
  debug: function (obj) {
    let printMessage = obj.print || false;
    let cType;
    switch(obj.type || 'l') {
      case 'l':
        cType = 'log';
        break;
      case 'e':
        cType = 'error';
        printMessage = true;
        break;
      case 'w':
        cType = 'warn';
        break;
      case 'i':
        cType = 'info';
        break;
    }
    if (printMessage) {
      let msgObj = Object.create(null);
      msgObj.type = cType;
      if (obj.message) msgObj.message = obj.message;
      if (obj.data) msgObj.data = obj.data;
      console[cType](msgObj);
    } 
  },

  /**
   * Utilidad para retornar errores.
   * @memberof uLayouter
   * @param {String} name Título del Error
   * @param {String} message Descripción del error
   */
  regError: function (name, message) {
    const err = new Error();
    err.name = name;
    err.message = message;
    return this.debug({
      type: 'e',
      message: err
    });
  },

  /**
   * Lista de procesadores disponibles, junto a su método y regla css
   */
  processors: {
    cols: {
      method: 'setCols',
      ruleCss: 'width'
    },
    // Paddings
    pad: {
      method: 'setPads',
      ruleCss: 'padding'
    },
      padt: {
        method: 'setPadTop',
        ruleCss: 'padding-top'
      },
      padr: {
        method: 'setPadRight',
        ruleCss: 'padding-right'
      },
      padb: {
        method: 'setPadBottom',
        ruleCss: 'padding-bottom'
      },
      padl: {
        method: 'setPadLeft',
        ruleCss: 'padding-left'
      },
    // Margin
    mar: {
      method: 'setMars',
      ruleCss: 'margin'
    },
      mart: {
        method: 'setMarTop',
        ruleCss: 'margin-top'
      },
      marr: {
        method: 'setMarRight',
        ruleCss: 'margin-right'
      },
      marb: {
        method: 'setMarBottom',
        ruleCss: 'margin-bottom'
      },
      marl: {
        method: 'setMarLeft',
        ruleCss: 'margin-left'
      },
    flex: {
      method: 'setFlex',
      ruleCss: 'display: flex'
    }
  },

  /**
   * Equivalencias de las propiedades y valores de flexbox
   */
  flexpv: {
    jc: 'justify-content',
    ai: 'align-items',
    ce: 'center',
    fs: 'flex-start',
    fe: 'flex-end',
    sb: 'space-between',
    sa: 'space-around',
    fw: 'flex-wrap',
    nw: 'nowrap',
    w: 'wrap',
    wr: 'wrap-reverse',
    fd: 'flex-direction',
    r: 'row',
    rr: 'row-reverse',
    co: 'column',
    cor: 'column-reverse'
  },
  
  /**
   * Crea una lista de estilos CSS apartir de breakpoints y propiedades.
   * @memberof uLayouter
   * @param {String} type Tipo de estilos a dar: 'cols', 'pad', 'mar' o 'flex'
   * @param {Object} bps Objeto de breakpoints registrados
   * @param {Object} instance La instancia creada, el objeto mismo.
   */
  createStyles: function (type, bps, instance) {
    const sizes = instance.sizes;
    const prefix = instance.prefix;
    const prop = this.processors[type].ruleCss;
    const styles = {};
    let rule, bpSplited, bp1, bp2, direct = false, nameClass, propAndVal;
    Object.keys(bps).forEach(function (bp) {
      // preparing the className
      nameClass = prefix + type + '-' + bps[bp].name;
      nameClass = nameClass.replace(/\//g, '\\/').replace(/:/g, '\\:').replace('@', '\\@').split('.').join('_');

      // Property and value
      if (type === 'flex') {
        propAndVal = bps[bp].value + ';display: flex;';
      } else {
        propAndVal = prop +  ':' + bps[bp].value;
      }

      rule = '@media screen and ';
      if (bp.indexOf('-') === -1) { // no tiene unti
        if (sizes[bp]) {
          rule += '(min-width: ' + sizes[bp] + 'px)';
        } else {
          rule = '.' + nameClass + '{' + propAndVal + '}';
          direct = true;
        }
      } else { 
        bpSplited = bp.split('-');
        bp1 = bpSplited[0];
        if (bp1) rule += '(min-width: ' + sizes[bp1] + 'px) and ';
        bp2 = bpSplited[1];
        rule += '(max-width: ' + (sizes[bp2] - 1) + 'px)';
      }

      if (!direct) rule += '{.' + nameClass + '{' + propAndVal + '}}';
      direct = false;
      styles[nameClass] = rule;
    });
    this.debug({
      type: 'i',
      print: instance.debug,
      message: 'Creating / Created Styles: ',
      data: [bps, styles]
    });
    return styles;
  },

  /**
   * Crea el scope de la hoja de estilos que se usará para designar los estilos que se crean al vuelo.
   * @memberof uLayouter
   * @param {Object} config Configuración determinada.
   */
  createScopeStyles: function (config) {
    let stylesScope = document.getElementById('layouter');
    if (stylesScope === null) {
      stylesScope = document.createElement('style');
      stylesScope.appendChild(document.createTextNode('')); // WebKit hack :(
      document.body.appendChild(stylesScope);
      stylesScope.id = 'layouter'
    };
    this.debug({
      type: 'i',
      print: config.debug,
      message: 'Bridge layouter created and inserted in the DOM',
      data: stylesScope
    });
    const bridge = config.bridge ? stylesScope.sheet : {
      insertRule: function (ruleCss) {
        stylesScope.innerHTML += '\n' + ruleCss;
      },
      rules: []
    };
    return bridge;
  },

  /**
   * Agrega las reglas CSS para darle estilos a los nodos
   * @memberof uLayouter
   * @param {Object} objStyles Objeto de reglas css junto con su nombre de clase.
   * @param {Object} instance Instancia iniciada del layouter.
   */
  insertRules: function (objStyles, instance) {
    const nodeScope = instance.scope;
    const prefix = instance.prefix;
    Object.keys(objStyles).forEach(function (className) {
      if (!instance.styles.hasOwnProperty(prefix + className)) {
        nodeScope.insertRule(objStyles[className], (nodeScope.rules ? nodeScope.rules.length : 0));
        instance.styles[prefix + className] = objStyles[className];
      }
    });
    this.debug({
      type: 'i',
      print: instance.debug,
      message: 'Inserting Styles: ',
      data: objStyles
    });
  },

  /**
   * Lista de caracteres a reemplazar para el nombre de las clases
   */
  replaceList: [
    ['\/', ''],
    ['\\', '/'],
    ['/:', ':'],
    ['\\:', ':'],
    ['\\@', '@'],
    ['/@', '@']
  ],

  /**
   * Asignador de nombre de clases a un nodo.
   * @memberof uLayouter
   * @param {Array} classesNames Lista de nombres de las clases
   * @param {Object} Node Nodo a donde agregar las clases
   * @param {Object} instance Instancia iniciada del layouter.
   */
  addClasses: function (classesNames, Node, instance) {
    const _this = this
    classesNames.forEach(function (name) {
      if (Node.classList.contains(name)) {
        this.debug({
          type: 'w',
          print: instance.debug,
          message: "The class name '" + name + "' already exists in the node and will not be added: ",
          data: Node
        });
      } else {
        // console.log('añadiendo: ' + name);
        Node.classList.add(name);
      }
    });
    this.debug({
      type: 'i',
      print: instance.debug,
      message: 'Adding classes to the Node: ',
      data: {
        classesNames: classesNames,
        node: Node
      }
    });
  },

  /**
   * Limpia los nombres de las clases.
   * @param {Object} obj Contenedor de los nombres de clases y reglas CSS
   * @returns {Object}
   */
  nameCleaner: function (objStyles) {
    const _this = this;
    const obj = {};
    Object.keys(objStyles).forEach(function (name) {
      let newName = name;
      _this.replaceList.forEach(function (reItem) {
        newName = newName.split(reItem[0]).join(reItem[1]);
      });
      obj[newName] = objStyles[name];
    });
    return obj;
  },

  /**
   * Construye el nombre de clase y registra las reglas css.
   * @memberof uLayouter
   * @param {Object} data Lista de data para el procesamiento del CSS
   */
  buildCss: function (data) {
    // creating the styles
    const objStyles = this.createStyles(data.type, data.bps, data.instance);

    // Inserting CSS rules
    if (data.deep) this.insertRules(objStyles, data.instance);
    
    // name classes cleaner
    return this.nameCleaner(objStyles);
  },

  /**
   * Crea e inserta los estilos calculandolos, y tambien adiciona las clases respectivas al nodo
   * @memberof uLayouter
   * @param {Object} data Lista de data para el procesamiento del CSS
   */
  settingCss: function (data) {
    // Building css stuffs
    const objStyles = this.buildCss(Object.assign({deep: true}, data));
  
    // Adding classes
    this.addClasses(Object.keys(objStyles), data.node, data.instance);
  },

  /**
   * Construye los paddings y margenes.
   * @memberof uLayouter
   * @param {Object} Node Nodo Element HTML
   * @param {String} type Nombre del tipo de atributo a obtener. cols, pad, mar y flex.
   * @param {Object} [parameters] Parametros obtenidos del nodo.
   * @param {Object} instance Instancia actual del Layouter
   */
  buildPadsAndMargs: function (value, type, instance, insertStyles) {
    if (value === undefined) return this.regError('Parameter Missing', "Don't exists a value determined");
    this.debug({
      type: 'i',
      print: instance.debug,
      message: "Building the 'pads or margs': " + value,
    });
    const _this = this;
    const bpCals = {};
    let paramProcessed, numbersPures, propValue, bps;
    if (!Array.isArray(value)) value = value.split(' ');
    value.forEach(function (param) {
      paramProcessed = _this.prepareParam(param);
      numbersPures = paramProcessed.numbers;
      bps = paramProcessed.breakPoints;
  
      // processing number values
      propValue = numbersPures
        .split('-')
        .map(function (n) {
          return _this.processedNumber(n);
        })
        .join(' ');
      if (bpCals.hasOwnProperty(bps)) {
        bpCals[bps].value += ';' + propValue
      } else {
        bpCals[bps] = {
          name: param,
          value: propValue
        };
      }
    });

    // Building the classNames and the styles to use.
    return this.buildCss({
      type: type,
      bps: bpCals,
      instance: instance,
      deep: (insertStyles === undefined ? true : insertStyles)
    });
  },
  
  /**
   * Setea los paddings y margenes
   * @memberof uLayouter
   * @param {Object} Node Nodo Element HTML
   * @param {String} type Nombre del tipo de atributo a obtener. cols, pad, mar y flex.
   * @param {Object} [parameters] Parametros obtenidos del nodo.
   * @param {Object} instance Instancia actual del Layouter
   */
  padsAndMargs: function (Node, type, parameters, instance) {
    if (!Node) return this.regError('Non-existent Node', "Don't exists the Node for processing.");
    this.debug({
      type: 'i',
      print: instance.debug,
      message: "Processing the '" + type + "' to the Node:",
      data: Node
    });
    const params = parameters || instance.getParameters(Node);
    if (!params.hasOwnProperty(type)) return this.regError('Parameter Missing', "Don't exists the param '" + type + "' determined");

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = this.buildPadsAndMargs(params[type], type, instance);

    // adding the classes names to the Node
    this.addClasses(Object.keys(objStyles), Node, instance);

    // removing param
    Node.removeAttribute(type);
  }
};

// for test with jest
if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) module.exports = uLayouter;
/**
 * Construtor maestro del sistema.
 * @constructor
 * @property {String} version Muestra la versión actual del sistema
 * @param {Object} config Objecto contenedor de las configuraciones.
 */
function Layouter (config) {
  // validation
  if (!config.hasOwnProperty('breakPoints')) return uLayouter.regError('Configuration Missing', '¡configuration missing! :V');

  // configs
  this.prefix = config.prefix ? config.prefix + '-' : ''

  // init setterss
  const bps = config.breakPoints;
  this.breakPoints = Object.keys(bps);
  this.sizes = uLayouter.getNums(bps, 'width');
  this.cols = uLayouter.getNums(bps, 'cols');
  this.scope = uLayouter.createScopeStyles(Object.assign({bridge: true}, config));
  this.styles = {};
  this.debug = config.debug || false;
};

Layouter.version = '1.6.0Beta';
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
 * Construye los paddings requeridas, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPads Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPads = function (valPads, insertStyles) {
  return uLayouter.buildPadsAndMargs(valPads, 'pad', this, insertStyles);
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
 * Construye el padding superior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadTop = function (valPad, insertStyles) {
  return uLayouter.buildPadsAndMargs(valPad, 'padt', this, insertStyles);
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
 * Construye el padding derecho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadRight = function (valPad, insertStyles) {
  return uLayouter.buildPadsAndMargs(valPad, 'padr', this, insertStyles);
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
 * Construye el padding inferior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadBottom = function (valPad, insertStyles) {
  return uLayouter.buildPadsAndMargs(valPad, 'padb', this, insertStyles);
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
 * Construye el padding izquierdo, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valPad Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildPadLeft = function (valPad, insertStyles) {
  return uLayouter.buildPadsAndMargs(valPad, 'padl', this, insertStyles);
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
 * Construye los margenes, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMars Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMars = function (valMars, insertStyles) {
  return uLayouter.buildPadsAndMargs(valMars, 'mar', this, insertStyles);
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
 * Construye el margen superior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarTop = function (valMar, insertStyles) {
  return uLayouter.buildPadsAndMargs(valMar, 'mart', this, insertStyles);
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
 * Construye el margen derecho, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarRight = function (valMar, insertStyles) {
  return uLayouter.buildPadsAndMargs(valMar, 'marr', this, insertStyles);
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
 * Construye el margen inferior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarBottom = function (valMar, insertStyles) {
  return uLayouter.buildPadsAndMargs(valMar, 'marb', this, insertStyles);
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
 * Construye el margen inferior, devolviendo el nombre de clase y los estilos creados.
 * @memberof Layouter
 * @param {String} valMar Paddings a construir
 * @param {Boolean} [insertStyles] Indica si se vá o no procesar en el navegador la regla css para ser usada.
 * @return {Object}
 */
Layouter.prototype.buildMarLeft = function (valMar, insertStyles) {
  return uLayouter.buildPadsAndMargs(valMar, 'marl', this, insertStyles);
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

  valFlex.forEach(function (param) {
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

  // EXPORTING
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Layouter;
    }
    exports.Layouter = Layouter;
  } else {
    root.Layouter = Layouter;
  }
}(this));
//# sourceMappingURL=layouter.js.map
