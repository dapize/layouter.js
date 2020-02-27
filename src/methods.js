/**
 * Obtiene los parametros disponibles para procesar
 * @param {Object} Nodo Nodo de donde obtener los parametros.
 * @returns {Object}
 */
lytProto.getParameters = function (Node) {
  const params = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(uLayouter.processors);
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
lytProto.setCols = function (Node) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  const _this = this;
  const params = this.getParameters(Node);
  if (!params.hasOwnProperty('cols')) return uLayouter.regError('Parameter Missing', "Don't exists 'cols' determined");
  let cols, bp, bpCals = {};

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  params.cols.forEach(function (param) {
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
  // Creating, inserting, and adding classNames of rules in Node.
  uLayouter.settingCss({
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
lytProto.setPads = function (Node) {
  uLayouter.padsAndMargs(Node, 'pad', this);
};

/**
 * Setea los margins necesarios para un Nodo.
 * @param {String} Node Nodo vivo del DOM a asignarle el CSS
 */
lytProto.setMars = function (Node) {
  uLayouter.padsAndMargs(Node, 'mar', this);
};

/**
 * Setea la propiedad Flex y las reglas designadas
 * @param {Object} Node Nodo vivo del DOM a asignarle el CSS
 */
lytProto.setFlex = function (Node) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  const params = this.getParameters(Node);
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
 * @param {Object} Nodo Nodo vivo del DOM a asignarle el CSS
 */
lytProto.build = function (Node) {
  if (!Node) return uLayouter.regError('Non-existent Node', "Don't exists the Node for processing.");
  const params = this.getParameters(Node);
  const proNames = Object.keys(params);
  const _this = this;
  if (proNames.length) {
    proNames.forEach(function (processorName) {
      _this[uLayouter.processors[processorName].method](Node);
    });
  } else {
    uLayouter.regError('Parameter Missing', "don't exists any parameter to process")
  }
};