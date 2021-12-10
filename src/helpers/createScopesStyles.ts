
const createScopesStyles = config => {
  const arrBps = this.getBpsOrdered(config.breakPoints);
  const scopes = {};
  const _this = this;
  arrBps.forEach(function (bp) {
    scopes[bp] = _this.createScopeStyles(config, bp, 'append', document.body);
  });
  return scopes;
};

export default createScopesStyles;