const displayProsAndValsBase = {
  bl: {
    ruleCss: 'block',
    classPrefix: 'bl',
  },
  il: {
    ruleCss: 'inline',
    classPrefix: 'il',
  },
  ib: {
    ruleCss: 'inline-block',
    classPrefix: 'ib',
  },
  fx: {
    ruleCss: 'flex',
    classPrefix: 'fx',
  },
  if: {
    ruleCss: 'inline-flex',
    classPrefix: 'if',
  },
  no: {
    ruleCss: 'none',
    classPrefix: 'no',
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

export const displayProsAndVals = {
  ...displayProsAndValsBase,
  block: displayProsAndValsBase.bl,
  inline: displayProsAndValsBase.il,
  'inline-block': displayProsAndValsBase.ib,
  flex: displayProsAndValsBase.fx,
  'inline-flex': displayProsAndValsBase.if,
  none: displayProsAndValsBase.no,
  initial: displayProsAndValsBase.in,
  inherit: displayProsAndValsBase.ih,
};
