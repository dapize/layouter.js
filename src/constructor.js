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

Layouter.version = '1.3.1Beta';