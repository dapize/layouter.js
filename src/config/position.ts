const positionProsAndValsBase = {
  st: {
    ruleCss: 'static',
    classPrefix: 'st',
  },
  ab: {
    ruleCss: 'absolute',
    classPrefix: 'ab',
  },
  fi: {
    ruleCss: 'fixed',
    classPrefix: 'fi',
  },
  re: {
    ruleCss: 'relative',
    classPrefix: 're',
  },
  si: {
    ruleCss: 'sticky',
    classPrefix: 'si',
  },
  in: {
    ruleCss: 'initial',
    classPrefix: 'in',
  },
  ih: {
    ruleCss: 'inherit',
    classPrefix: 'ih',
  },
};

export const positionProsAndVals = {
  ...positionProsAndValsBase,
  static: positionProsAndValsBase.st,
  absolute: positionProsAndValsBase.ab,
  fixed: positionProsAndValsBase.fi,
  relative: positionProsAndValsBase.re,
  sticky: positionProsAndValsBase.si,
  initial: positionProsAndValsBase.in,
  inherit: positionProsAndValsBase.ih,
};
