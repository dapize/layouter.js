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
    let nProcessed = (n === 'auto') ? 'auto' : n + 'px';
    if (n.indexOf('/') !== -1) {
      nProcessed = n.split('/');
      nProcessed = this.calPercentage(this.stringToNumber(nProcessed[0]), this.stringToNumber(nProcessed[1]))
    };
    return nProcessed;
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
    const prop = uLayouter.processors[type].ruleCss;
    const styles = {};
    let rule, bpSplited, bp1, bp2, direct = false, nameClass, propAndVal;
    Object.keys(bps).forEach(function (bp, index) {
      // preparing the className
      nameClass = prefix + type + '-' + bps[bp].name;
      nameClass = nameClass.replace(/\//g, '\\/').replace(/:/g, '\\:').replace('@', '\\@');

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

      if (!direct) rule += '{.' + nameClass + '{' + propAndVal + '}}';
      direct = false;
      styles[nameClass] = rule;
    });
    return styles;
  },

  /**
   * Crea el scope de la hoja de estilos que se usará para designar los estilos que se crean al vuelo.
   * @memberof uLayouter
   */
  createScopeStyles: function () {
    const stylesScope = document.createElement('style');
    stylesScope.appendChild(document.createTextNode(''));
    document.body.appendChild(stylesScope);
    stylesScope.id = 'layouter'
    return stylesScope.sheet;
  },

  /**
   * Agrega las reglas CSS para darle estilos a los nodos
   * @memberof uLayouter
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
   * @param {Object} Node Nodo a donde agregar las clases
   * @param {Array} classesNames Lista de nombres de las clases
   */
  addClasses: function (classesNames, Node) {
    const _this = this
    classesNames.forEach(function (name) {
      _this.replaceList.forEach(function (reItem) {
        name = name.replace(reItem[0], reItem[1])
      });
      Node.classList.add(name);
    });
  },

  /**
   * Crea e inserta los estilos calculandolos, y tambien adiciona las clases respectivas al nodo
   * @memberof uLayouter
   * @param {Object} data Lista de data para el procesamiento del CSS
   */
  settingCss: function (data) {
    // creating the styles
    const objStyles = this.createStyles(data.type, data.bps, data.instance);

    // Inserting CSS rules
    this.insertRules(objStyles, data.instance);
  
    // Adding classes
    this.addClasses(Object.keys(objStyles), data.node)
  },
  
  /**
   * Setea los paddings y margenes
   * @memberof uLayouter
   * @param {Object} Node Nodo Element HTML
   * @param {String} type Nombre del tipo de atributo a obtener. cols, pad, mar y flex.
   * @param {Object} instance Instancia actual del Layouter
   */
  padsAndMargs: function (Node, type, instance) {
    if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
    const params = instance.getParameters(Node);
    const _this = this;
    if (!params.hasOwnProperty(type)) return uLayouter.regError('Parameter Missing', "Don't exists the param '" + type + "' determined");

    const bpCals = {};
    let paramProcessed, numbersPures, propValue, bps;
    params[type].forEach(function (param) {

      paramProcessed = uLayouter.prepareParam(param);
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
};