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
  
  createStyles: function (prop, bps, sizes) { // utils.createStyles('width', {});
    const styles = [];
    let rule = '@media screen and ';
    let bpSplited, bp1, bp2 = false;
    Object.keys(bps).forEach(function (bp) {
      if (bp.indexOf('-') === -1) { // no tiene until
        bpSplited = bp.split('-');
        bp1 = bpSplited[0];
        bp2 = bpSplited[1];
      } else { // si tiene until
        bp1 = bp;
      }
      if (sizes[bp1]) {
        rule += '(min-width: ' + sizes[bp1] + 'px)';
        if (bp2) rule += ' and (max-width: ' + (sizes[bp1] - 1) + 'px)';
        rule += '{' + prop + ':' + bps[bp] + '}';
        styles.push(rule);
        rule = '@media screen and ';
      } else {
        styles.push(prop + ':' + bps[bp]);
      }
    });
    console.log(styles);
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
  this.prefix = config.prefix | 'ly';

  // init setterss
  const bps = config.breakPoints;
  this.breakPoints = Object.keys(bps);
  this.sizes = utils.getNums(bps, 'width');
  this.cols = utils.getNums(bps, 'cols');
};

const lProto = Layouter.prototype;


/**
 * Lista de métodos disponibles para procesar.
 */
Object.defineProperty(lProto, 'parameters', {
  get: function () {
    return {
      cols: this.setCols,
      pad: this.setPad,
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
  params.cols.forEach(function (param) {
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
          utils.regError('Syntax error', "You can't determine a 'until breakpoint' when use the explicit columns max");
        }
      } else {
        cols = [param, _this.cols.xs];
      }
    }
    bpCals[bp] = utils.calPercentage(cols[0], cols[1]);
    bpSplited = false;
  });

  // creating the styles
  utils.createStyles(utils.propsCss.cols, bpCals, this.sizes);

  return sucess;
};