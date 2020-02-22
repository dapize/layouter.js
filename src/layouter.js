const utils = {
  /**
   * Obtiene el width y las columnas de los breakpoints.
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
   * @param {String} param Parametro
   */
  haveBreakPoint: function (param) {
    return param.indexOf('@') !== -1 ? true : false;
  },

  /**
   * Prepara el parametro de un método especificado. (EJM: cols, pad, etc)
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
   * @param {String} n El string que se vá a convertir a número
   * @returns {Number}
   */
  stringToNumber: function (n) {
    return typeof n === 'string' ? parseFloat(n) : n;
  },

  /**
   * Calcula el porcentaje de un número :V
   * @param {Number} n1 Numero de donde se sacará el porcentaje
   * @param {Number} n2 Número de valor máximo
   */
  calPercentage: function (n1, n2) {
    return (n1 * 100) / n2 + '%'
  },

  /**
   * Procesa un número, si es porcentual, lo calcula, sino, lo devuelve tal cual
   * @param {String} n Número a procesar
   */
  processedNumber: function (n) {
    let nProcessed;
    if (n.indexOf('/') !== -1) {
      nProcessed = n.split('/');
      nProcessed = this.calPercentage(this.stringToNumber(nProcessed[0]), this.stringToNumber(nProcessed[1]))
    } else {
      nProcessed = n + 'px';
    }
    return nProcessed;
  },

  /**
   * Utilidad para retornar errores.
   * @param {String} type Tipo de error a mostrar
   * @param {String} message Descripció del error
   */
  regError: function (name, message) {
    const err = new Error();
    err.name = name;
    err.message = message;
    console.error(err);
    return err;
  },

  /**
   * Lista de procesadores disponibles, junto a su método y regla css
   */
  processors: {
    cols: {
      method: 'setCols',
      ruleCss: 'width'
    },
    pad: {
      method: 'setPads',
      ruleCss: 'padding'
    },
    mar: {
      method: 'setMars',
      ruleCss: 'margin'
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
    c: 'center',
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
    cr: 'column-reverse'
  },
  
  /**
   * Crea una lista de estilos CSS apartir de breakpoints y propiedades.
   * @param {String} prop Nombre de regla css
   * @param {Object} bps Breakpoints obtenidos
   * @param {Object} sizes Medidas de ancho de los breakpoints
   * @returns {Array} Lista de reglas CSS listas para usar.
   */
  createStyles: function (type, bps, instance) {
    const sizes = instance.sizes;
    const prefix = instance.prefix;
    const prop = utils.processors[type].ruleCss;
    const styles = {};
    let rule, bpSplited, bp1, bp2, direct = false, nameClass, propAndVal;
    Object.keys(bps).forEach(function (bp, index) {
      // preparing the className
      nameClass = prefix + type + '-' + bps[bp].name;
      nameClass = nameClass.replace(/\//g, '\\/').replace(/:/g, '\\:');

      // Property and value
      if (prop.indexOf(':') !== -1) { // cuando se define una propiedad inicial (Ejm: display:flex)
        propAndVal = bps[bp].value;
        if (!index) styles[prefix + type + '-' + type] = '.' + prefix + type + '-' + type + '{' + prop + '}';
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

      if (!direct) rule += '{.' + nameClass.replace('@', '\\@') + '{' + propAndVal + '}}';
      direct = false;
      styles[nameClass] = rule;
    });
    return styles;
  },

  /**
   * Crea el scope de la hoja de estilos que se usará para designar los estilos que se crean al vuelo.
   */
  createScopeStyles: function () {
    const stylesScope = document.createElement('style');
    stylesScope.appendChild(document.createTextNode(''));
    document.body.appendChild(stylesScope);
    stylesScope.id = 'scope-layouter'
    return stylesScope.sheet;
  },

  /**
   * Agrega las reglas CSS para darle estilos a los nodos
   * @param {Array} rules Lista de reglas CSS a agregar
   */
  insertRules: function (objStyles, instance) {
    const nodeScope = instance.scope;
    const prefix = instance.prefix;
    Object.keys(objStyles).forEach(function (className) {
      if (!instance.styles.hasOwnProperty(prefix + className)) {
        nodeScope.insertRule(objStyles[className], nodeScope.rules.length);
        instance.styles[prefix + className] = objStyles[className];
      }
    });
  },

  /**
   * Asignador de nombre de clases a un nodo.
   * @param {Object} Node Nodo a donde agregar las clases
   * @param {Array} classesNames Lista de nombres de las clases
   */
  adClasses: function (classesNames, Node) {
    classesNames.forEach(function (name) {
      Node.classList.add(name.replace('\/', '').replace('\\', '/').replace('/:', ':').replace('\\:', ':'));
    });
  },

  /**
   * Crea e inserta los estilos calculandolos, y tambien adiciona las clases respectivas al nodo
   * @param {Object} data Lista de data para el procesamiento del CSS
   */
  settingCss: function (data) {
    // creating the styles
    const objStyles = this.createStyles(data.type, data.bps, data.instance);

    // Inserting CSS rules
    this.insertRules(objStyles, data.instance);
  
    // Adding classes
    this.adClasses(Object.keys(objStyles), data.node)
  },
  
  /**
   * Setea los paddings y margenes
   */
  padsAndMargs: function (Node, type, instance) {
    const params = instance.getParameters(Node);
    const _this = this;
    if (!params.hasOwnProperty(type)) return utils.regError('Parameter Missing', "Don't exists the param '" + type + "' determined");

    const bpCals = {};
    let paramProcessed, numbersPures, propValue, bps;
    params[type].forEach(function (param) {

      paramProcessed = utils.prepareParam(param);
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

    // Creating, inserting, and adding classNames of rules in Node.
    this.settingCss({
      type: type,
      bps: bpCals,
      instance: instance,
      node: Node
    });

    // removing param
    Node.removeAttribute(type);
  }
}

/**
 * Construtor maestro del sistema.
 * @constructor
 * @param {Object} config Objecto contenedor de las configuraciones.
 */
function Layouter (config) {
  // validation
  if (!config.hasOwnProperty('breakPoints')) return utils.regError('Configuration Missing', '¡configuration missing! :V');

  // configs
  this.prefix = config.prefix ? config.prefix + '-' : ''

  // init setterss
  const bps = config.breakPoints;
  this.breakPoints = Object.keys(bps);
  this.sizes = utils.getNums(bps, 'width');
  this.cols = utils.getNums(bps, 'cols');
  this.scope = utils.createScopeStyles();
  this.styles = {};
};
const lProto = Layouter.prototype;

Layouter.version = '1.0Beta';

/**
 * Obtiene los parametros disponibles para procesar
 * @param {Object} Nodo Nodo de donde obtener los parametros.
 * @returns {Object}
 */
lProto.getParameters = function (Node) {
  const params = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(utils.processors);
  Array.prototype.forEach.call(attrs, function (attr) {
    if (paramNames.indexOf(attr.name) !== -1) {
      if (attr.value !== '') params[attr.name] = attr.value.split(' ');
    }
  });
  return params;
};

/**
 * Asigna los estilos necesarios a un nodo referentes a las columnas determinadas
 * @param {Object} Node Nodo a donde asignar los estilos
 */
lProto.setCols = function (Node) {
  const _this = this;
  const params = this.getParameters(Node);
  if (!params.hasOwnProperty('cols')) return utils.regError('Parameter Missing', "Don't exists 'cols' determined");
  let cols, bp, bpCals = {};

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  params.cols.forEach(function (param) {
    selectorName = param;

    paramPrepared = utils.prepareParam(param);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    if (param.indexOf('/') !== -1) {
      cols = param.split('/');
    } else {
      if (paramPrepared.widthBp) {
        if (bp.indexOf('-') === -1) {
          cols = [param, _this.cols[bp]];
        } else {
          utils.regError('SyntaxError', "You can't determine a 'until breakpoint' when use the explicit columns max");
        }
      } else {
        cols = [param, _this.cols.xs];
      }
    }
    propValue = utils.calPercentage(cols[0], cols[1]);

    bpCals[bp] = {
      name: selectorName,
      value: propValue
    };
  });
  // Creating, inserting, and adding classNames of rules in Node.
  utils.settingCss({
    type: 'cols',
    bps: bpCals,
    instance: this,
    node: Node
  });

  // removing param
  Node.removeAttribute('cols');
};

/**
 * Setea los paddings necesarios para un Nodo.
 * @param {String} Node Nodo vivo del DOM a asignarle el CSS
 */
lProto.setPads = function (Node) {
  utils.padsAndMargs(Node, 'pad', this);
};

/**
 * Setea los margins necesarios para un Nodo.
 * @param {String} Node Nodo vivo del DOM a asignarle el CSS
 */
lProto.setMars = function (Node) {
  utils.padsAndMargs(Node, 'mar', this);
};

/**
 * Setea la propiedad Flex y las reglas designadas
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 */
lProto.setFlex = function (Node) {
  const params = this.getParameters(Node);
  if (!params.hasOwnProperty('flex')) return utils.regError('Parameter Missing', "Don't exists 'flex' determinated.");
  let bpNameS, bpCals = {};

  // Getting numbers
  let selectorName, paramPrepared, flexSplited,  propVal;
  params.flex.forEach(function (param) {
    selectorName = param;

    paramPrepared = utils.prepareParam(param);
    bpNameS = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    flexSplited = param.split(':');
    propVal = utils.flexpv[flexSplited[0]] + ':' + utils.flexpv[flexSplited[1]]

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
  utils.settingCss({
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
 * @param {Object} Nodo Nodo vivo del DOM a asignarle el CSS
 */
lProto.build = function (Node) {
  const params = this.getParameters(Node);
  const proNames = Object.keys(params);
  const _this = this;
  if (proNames.length) {
    proNames.forEach(function (processorName) {
      _this[utils.processors[processorName].method](Node);
    });
  } else {
    utils.regError('Parameter Missing', "don't exists any parameter to process")
  }
};