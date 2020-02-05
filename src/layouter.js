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
   * Calcula el porcentaje de un número :V
   * @param {Number} n1 Numero de donde se sacará el porcentaje
   * @param {Number} n2 Número de valor máximo
   */
  calPercentage: function (n1, n2) {
    return (n1 * 100) / n2 + '%'
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
   * Tabla de propiedades CSS funciladas a los métodos
   */
  propsCss: {
    cols: 'width',
    pad: 'padding',
    padt: 'padding-top',
    padr: 'padding-right',
    padb: 'padding-bottom',
    padl: 'padding-left',
    mar: 'margin',
    mart: 'margin-top',
    marr: 'margin-right',
    marb: 'margin-bottom',
    marl: 'margin-left',
    flex: 'display: flex; justify-content: $jc; align-items: $ai',
    alg: 'text-align'
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
    const prop = utils.propsCss[type];
    const styles = {};
    let rule;
    let bpSplited, bp1, bp2, direct = false, nameClass;
    Object.keys(bps).forEach(function (bp) {
      nameClass = prefix + type + '-' + bps[bp].name;
      rule = '@media screen and ';
      if (bp.indexOf('-') === -1) { // no tiene unti
        if (sizes[bp]) {
          rule += '(min-width: ' + sizes[bp] + 'px)';
        } else {
          rule = '.' + nameClass + '{' + prop + ':' + bps[bp].size + '}';
          direct = true;
        }
      } else { 
        bpSplited = bp.split('-');
        bp1 = bpSplited[0];
        if (bp1) rule += '(min-width: ' + sizes[bp1] + 'px) and ';
        bp2 = bpSplited[1];
        rule += '(max-width: ' + (sizes[bp2] - 1) + 'px)';
      }
      if (!direct) rule += '{.' + nameClass.replace('@', '\\@') + '{' + prop + ':' + bps[bp].size + '}}';
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
    const vaultStyles = instance.styles;
    const prefix = instance.prefix;
    Object.keys(objStyles).forEach(function (className) {
      if (!vaultStyles.hasOwnProperty(prefix + className)) nodeScope.insertRule(objStyles[className], nodeScope.rules.length);
    });
  },

  /**
   * Asignador de nombre de clases a un nodo.
   * @param {Object} Node Nodo a donde agregar las clases
   * @param {Array} classesNames Lista de nombres de las clases
   */
  adClasses: function (classesNames, Node, prefix) {
    classesNames.forEach(function (name) {
      Node.classList.add(prefix + '-' + name);
    });
  }

}

/**
 * Construtor maestro del sistema.
 * @constructor
 * @param {Object} config Objecto contenedor de las configuraciones.
 */
function Layouter (config) {
  // validation
  if (!config.hasOwnProperty('breakPoints')) return console.log('falta configuración');

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


/**
 * Lista de métodos disponibles para procesar.
 */
Object.defineProperty(lProto, 'parameters', {
  get: function () {
    return {
      cols: this.setCols,
      pad: this.setPads,
      padt: this.setPadt,
      padr: this.setPadr,
      padb: this.setPadb,
      padl: this.setPadl,
      mar: this.setMar,
      mart: this.setMart,
      marr: this.setMarr,
      marb: this.setMarb,
      marl: this.setMarl,
      flex: this.setFlex,
      alg: this.setAlg
    }
  }
});

/**
 * Obtiene los parametros disponibles para procesar
 * @param {Object} Nodo Nodo de donde obtener los parametros.
 * @returns {Object}
 */
lProto.getParameters = function (Node) {
  const params = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(this.parameters);
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
  let sucess = false;
  const _this = this;
  const params = this.getParameters(Node);
  if (!params.hasOwnProperty('cols')) return console.log("Don't exists columns determined");
  let cols, bp, bpSplited, bpCals = {};

  // Getting numbers
  let paramPure;
  params.cols.forEach(function (param) {
    paramPure = param;
    if (utils.haveBreakPoint(param)) {
      bpSplited = param.split('@');
      param = bpSplited[0];
      bp = bpSplited[1];
    } else {
      bp = 'xs';
    }
    if (param.indexOf('-') !== -1) {
      cols = param.split('-');
    } else {
      if (bpSplited) {
        if (bp.indexOf('-') === -1) {
          cols = [param, _this.cols[bp]];
        } else {
          sucess = false;
          utils.regError('SyntaxError', "You can't determine a 'until breakpoint' when use the explicit columns max");
        }
      } else {
        cols = [param, _this.cols.xs];
      }
    }
    bpCals[bp] = {
      name: paramPure,
      size: utils.calPercentage(cols[0], cols[1])
    };
    bpSplited = false;
  });

  // creating the styles
  const objStyles = utils.createStyles('cols', bpCals, this);

  // Inserting CSS rules
  utils.insertRules(objStyles, this);

  // Adding classes
  utils.adClasses(params.cols, Node, this.prefix + 'cols')

  return sucess;
};

lProto.setPads = function (Node) {
  const params = this.getParameters(Node);
  if (!params.hasOwnProperty('pad')) return console.log("Don't exists paddings determined");

  
};