(function (root) {
'use strict';
  if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      'use strict';
      if (target === null) throw new TypeError('Cannot convert undefined or null to object');

      let to = Object(target);
      let index;
      const nArguments = arguments.length;
      let nextSource;
      for (index = 1; index < nArguments; index++) {
        nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
};
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
   * Devuelve un array ordenando los Breakpoints de menor a mayor, dependiendo su width
   * @param {Object} bps Objeto breakpoints definidos en la configuración de la instancia.
   * @returns {Array}
   */
  getBpsOrdered: function (bps) {
    const objBps = this.getNums(bps, 'width');
    const arrBps = Object.keys(bps);
    return arrBps
      .map(function (bp) {
        return objBps[bp];
      })
      .sort(function(a, b) {
        return a - b;
      })
      .map(function (width) {
        return arrBps.filter(function (iBp) {
          return objBps[iBp] === width
        })[0]
      })
  },

  /**
   * Determina si el parametro tiene o no un breakpoint designado
   * @memberof uLayouter
   * @param {String} param Parametro
   * @returns {Boolean}
   */
  haveBreakPoint: function (param) {
    return param.indexOf('@') !== -1;
  },

  /**
   * Sirve para obtener el breakpoint declarado con la propiedad 'direct'.
   * @param {Object} objBps Objecto contenedor con los breakpoints pasados en la configuración.
   */
  getDirectBp: function (objBps) {
    const bpDirect = Object.keys(objBps).filter(function (iBp) {
      return objBps[iBp].direct
    });
    return bpDirect.length ? bpDirect[0] : false;
  },

  /**
   * Prepara el parametro de un método especificado. (EJM: cols, pad, etc)
   * @memberof uLayouter
   * @param {String} param Parametro de configuración sobre el método.
   * @param {Object} objBps Objeto de Breakpoints definidos en la configuración base.
   */
  prepareParam: function (param, objBps) {
    let bp;
    let argParam = param;
    let important = false;
    const haveBp = this.haveBreakPoint(argParam);
    if (haveBp) {
      const bpSplited = argParam.split('@');
      argParam = bpSplited[0];
      bp = bpSplited[1];
    } else {
      const directBp = this.getDirectBp(objBps);
      if (directBp) {
        bp = directBp;
      } else {
        return this.regError("without 'direct' breakpoint", "Don't exists a breakpoint with 'direct' designation.");
      }
    };

    if (param.indexOf('!') !== -1) {
      important = true;
      bp = bp.replace(/!/g, '');
      argParam = argParam.replace(/!/g, '');
    };

    return {
      widthBp: haveBp,
      numbers: argParam,
      breakPoints: bp,
      important: important
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
      set: 'setCols',
      build: 'buildCols',
      ruleCss: 'width'
    },
    // Paddings
    pad: {
      set: 'setPads',
      build: 'buildPads',
      ruleCss: 'padding'
    },
      padt: {
        set: 'setPadTop',
        build: 'buildPadTop',
        ruleCss: 'padding-top'
      },
      padr: {
        set: 'setPadRight',
        build: 'buildPadRight',
        ruleCss: 'padding-right'
      },
      padb: {
        set: 'setPadBottom',
        build: 'buildPadBottom',
        ruleCss: 'padding-bottom'
      },
      padl: {
        set: 'setPadLeft',
        build: 'buildPadLeft',
        ruleCss: 'padding-left'
      },
    // Margin
    mar: {
      set: 'setMars',
      build: 'buildMars',
      ruleCss: 'margin'
    },
      mart: {
        set: 'setMarTop',
        build: 'buildMarTop',
        ruleCss: 'margin-top'
      },
      marr: {
        set: 'setMarRight',
        build: 'buildMarRight',
        ruleCss: 'margin-right'
      },
      marb: {
        set: 'setMarBottom',
        build: 'buildMarBottom',
        ruleCss: 'margin-bottom'
      },
      marl: {
        set: 'setMarLeft',
        build: 'buildMarLeft',
        ruleCss: 'margin-left'
      },
    flex: {
      set: 'setFlex',
      build: 'buildFlex',
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
    cor: 'column-reverse',
    fg: 'flex-grow',
    fh: 'flex-shrink',
    as: 'align-self',
    or: 'order',
    au: 'auto',
    st: 'stretch',
    bl: 'baseline',
    in: 'initial',
    ih: 'inherit'
  },

  /**
   * Define los atributos de flex que no dependen del mismo.
   */
  flexAttrsSelf: ['fg', 'fh', 'or'],
  
  /**
   * Crea el scope para un BP determinado.
   * @memberof uLayouter
   * @param {Object} config Configuración determinada.
   * @param {String} bp El Break Point, dependiendo de la definición sería: xs, sm, md, lg u otros.
   * @param {String} insertionType Define el tipo de inserción a realizar.
   * @param {HTMLElement} node El nodo base desde donde se insertará el nuevo nodo de estilos (ya sea antes, despues, o como nuevo hermano).
   * @returns {Object}
   */
  createScopeStyles: function (config, bp, insertionType, node) {
    let stylesScope = document.getElementById('layouter-' + bp);
    if (!stylesScope) {
      stylesScope = document.createElement('style');
      stylesScope.appendChild(document.createTextNode('')); // WebKit hack :(
      switch(insertionType) {
        case 'before':
          node.parentNode.insertBefore(stylesScope, node)
          break;
        case 'after':
          const nodeParent = node.parentNode;
          node.nextSibling ? nodeParent.insertBefore(stylesScope, node.nextSibling) : nodeParent.appendChild(stylesScope);
          break;
        case 'append':
          node.appendChild(stylesScope);
          break;
      }
      stylesScope.id = 'layouter-' + bp;
    };
    this.debug({
      type: 'i',
      print: config.debug,
      message: 'Bridge layouter created and inserted in the DOM',
      data: stylesScope
    });
    let bridge;
    if (config.bridge) {
      bridge = {
        method: stylesScope.sheet,
        node: stylesScope
      }
    } else {
      bridge = {
        method: {
          insertRule: function (ruleCss) {
            stylesScope.appendChild(document.createTextNode(ruleCss))
          },
          rules: [],
        },
        node: stylesScope
      }
    }
    return bridge;
  },

  /**
   * Crea los scopes correspondientes para cada breakpoint definido, de forma ordenada, eso es muy importante.
   * @param {Object} config Objeto base de configuración que se pasa en la instancia.
   */
  createScopesStyles: function (config) {
    const arrBps = this.getBpsOrdered(config.breakPoints);
    const scopes = {};
    const _this = this;
    arrBps.forEach(function (bp) {
      scopes[bp] = _this.createScopeStyles(config, bp, 'append', document.body);
    });
    return scopes;
  },

  /**
   * Obtiene el los métodos del nodo 'style' desde un 'className'. 
   * @param {String} className Nombre de la clase CSS
   * @param {Object} instance Instancia de la librería.
   */
  getScopeByclassName: function (className, instance) {
    const bps = instance.breakPoints;
    const nameClass = className.replace(/!/g, '');
    const atIndex = nameClass.indexOf('@');

    // Haven´t a BP designed
    if (atIndex === -1) {
      const directBp = this.getDirectBp(bps);
      return instance.scope[directBp];  
    };

    // Have a BP designed, a normal BP.
    const bp = nameClass.substring(atIndex + 1);
    if (bp.indexOf('-') === -1) return instance.scope[bp]; // A simple BP, not compound (like this: 13/15@sm-md).

    // For the nexts types insertions
    const smallConfig = {
      bridge: instance.bridge,
      debug: instance.debug
    };

    // A BP until. Example 13/15@-md
    if (bp.substring(0, 1) === '-') {
      if (instance.scope.hasOwnProperty(bp)) return instance.scope[bp]; // exists the Scope.
      const bpUntil = bp.substring(1);
      instance.scope[bp] = this.createScopeStyles(smallConfig, bp, 'before', instance.scope[bpUntil].node);
      return instance.scope[bp]; // returning a new scope created
    }

    // A BP from and until (a BP Compount). Example: Example 13/15@sm-md
    if (instance.scope.hasOwnProperty(bp)) return instance.scope[bp]; // exists the Scope.
    
    const fromBp = bp.split('-')[0];
    instance.scope[bp] = this.createScopeStyles(smallConfig, bp, 'after', instance.scope[fromBp].node);
    return instance.scope[bp]; // returning a new scope compounted created
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
        _this.debug({
          type: 'w',
          print: instance.debug,
          message: "The class name '" + name + "' already exists in the node and will not be added: ",
          data: Node
        });
      } else {
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
    let rule, bpSplited, bp1, bp2, direct = false, nameClass, propAndVal, shortNameClass, pureShortName;
    const _this = this;
    Object.keys(bps).forEach(function (bp) {
      // preparing the className
      shortNameClass = bps[bp].name;
      nameClass = prefix + type + '-' + shortNameClass;
      nameClass = nameClass.replace(/\//g, '\\/').replace(/:/g, '\\:').replace('@', '\\@').split('.').join('_');

      // Property and value
      if (type === 'flex') {
        propAndVal = bps[bp].value;
        pureShortName = shortNameClass.split(':')[0];
        if (_this.flexAttrsSelf.indexOf(pureShortName) === -1 && pureShortName !== 'as') {
          propAndVal += shortNameClass.indexOf('!') !== -1 ? ';display:flex !important;' : ';display:flex;';
        }
      } else {
        propAndVal = prop +  ':' + bps[bp].value;
      }

      rule = '@media screen and ';
      if (bp.indexOf('-') === -1) { // no tiene until
        if (sizes[bp]) {
          rule += '(min-width: ' + sizes[bp] + 'px)';
        } else {
          rule = '.' + nameClass.replace(/!/g, '\\!') + '{' + propAndVal + '}';
          direct = true;
        }
      } else { 
        bpSplited = bp.split('-');
        bp1 = bpSplited[0];
        if (bp1) rule += '(min-width: ' + sizes[bp1] + 'px) and ';
        bp2 = bpSplited[1];
        rule += '(max-width: ' + (sizes[bp2] - 1) + 'px)';
      }

      if (!direct) rule += '{.' + nameClass.replace(/!/g, '\\!') + '{' + propAndVal + '}}';
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
   * Agrega las reglas CSS para darle estilos a los nodos
   * @memberof uLayouter
   * @param {Object} objStyles Objeto de reglas css junto con su nombre de clase.
   * @param {Object} instance Instancia iniciada del layouter.
   */
  insertRules: function (objStyles, instance) {
    const _this = this;
    Object.keys(objStyles).forEach(function (className) {
      if (!instance.styles.hasOwnProperty(className)) {
        let nodeScope = _this.getScopeByclassName(className, instance);
        if (nodeScope !== undefined) {
          nodeScope.method.insertRule(objStyles[className], (nodeScope.method.rules ? nodeScope.method.rules.length : 0));
          instance.styles[className] = objStyles[className]; // saving in styles vault
        } else {
          _this.regError('Dont exists scope', "Don't exists a scope valid for '" + className + "'");
        }
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
      paramProcessed = _this.prepareParam(param, instance.breakPoints);
      numbersPures = paramProcessed.numbers;
      bps = paramProcessed.breakPoints;
  
      // processing number values
      propValue = numbersPures
        .split('-')
        .map(function (n) {
          return _this.processedNumber(n);
        })
        .join(' ');
      if (paramProcessed.important) propValue += ' !important';
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
 * @param {Object} config Objeto contenedor de las configuraciones.
 */
function Layouter (config) {
  // validation
  if (!config.hasOwnProperty('breakPoints')) return uLayouter.regError('Configuration Missing', '¡configuration missing! :V');

  // configs
  this.prefix = config.prefix ? config.prefix + '-' : ''

  // init setterss
  const bps = config.breakPoints;
  this.breakPoints = bps;
  this.sizes = uLayouter.getNums(bps, 'width');
  this.cols = uLayouter.getNums(bps, 'cols');
  this.scope = uLayouter.createScopesStyles(Object.assign({bridge: true}, config));
  this.styles = {};
  this.debug = config.debug || false;
};

Layouter.version = '1.9.1Beta'
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
