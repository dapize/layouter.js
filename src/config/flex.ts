const flexProsAndValsBase = {
  jc: {
    ruleCss: 'justify-content',
    classPrefix: 'jc',
  },
  ai: {
    ruleCss: 'align-items',
    classPrefix: 'ai',
  },
  ce: {
    ruleCss: 'center',
    classPrefix: 'ce',
  },
  fs: {
    ruleCss: 'flex-start',
    classPrefix: 'fs',
  },
  fe: {
    ruleCss: 'flex-end',
    classPrefix: 'fe',
  },
  sb: {
    ruleCss: 'space-between',
    classPrefix: 'sb',
  },
  sa: {
    ruleCss: 'space-around',
    classPrefix: 'sa',
  },
  fw: {
    ruleCss: 'flex-wrap',
    classPrefix: 'fw',
  },
  nw: {
    ruleCss: 'nowrap',
    classPrefix: 'nw',
  },
  w: {
    ruleCss: 'wrap',
    classPrefix: 'w',
  },
  wr: {
    ruleCss: 'wrap-reverse',
    classPrefix: 'wr',
  },
  fd: {
    ruleCss: 'flex-direction',
    classPrefix: 'fd',
  },
  r: {
    ruleCss: 'row',
    classPrefix: 'r',
  },
  rr: {
    ruleCss: 'row-reverse',
    classPrefix: 'rr',
  },
  co: {
    ruleCss: 'column',
    classPrefix: 'co',
  },
  cor: {
    ruleCss: 'column-reverse',
    classPrefix: 'co',
  },
  au: {
    ruleCss: 'auto',
    classPrefix: 'au',
  },
  st: {
    ruleCss: 'stretch',
    classPrefix: 'st',
  },
  bl: {
    ruleCss: 'baseline',
    classPrefix: 'bl',
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

const flexPropsAndValsSelfBase = {
  fg: {
    ruleCss: 'flex-grow',
    classPrefix: 'fg',
  },
  fh: {
    ruleCss: 'flex-shrink',
    classPrefix: 'fh',
  },
  as: {
    ruleCss: 'align-self',
    classPrefix: 'as',
  },
  or: {
    ruleCss: 'order',
    classPrefix: 'or',
  },
};

const flexPropsAndValsSelf = {
  ...flexPropsAndValsSelfBase,
  'flex-grow': flexPropsAndValsSelfBase.fg,
  'flex-shrink': flexPropsAndValsSelfBase.fh,
  'align-self': flexPropsAndValsSelfBase.as,
  order: flexPropsAndValsSelfBase.or,
};

export const flexProsAndVals = {
  ...flexProsAndValsBase,
  ...flexPropsAndValsSelf,
  'justify-content': flexProsAndValsBase.jc,
  'align-items': flexProsAndValsBase.ai,
  center: flexProsAndValsBase.ce,
  'flex-start': flexProsAndValsBase.fs,
  'flex-end': flexProsAndValsBase.fe,
  'space-between': flexProsAndValsBase.sb,
  'space-around': flexProsAndValsBase.fs,
  'flex-wrap': flexProsAndValsBase.fw,
  nowrap: flexProsAndValsBase.nw,
  w: flexProsAndValsBase.w,
  'wrap-reverse': flexProsAndValsBase.wr,
  'flex-direction': flexProsAndValsBase.fd,
  row: flexProsAndValsBase.r,
  'row-reverse': flexProsAndValsBase.rr,
  column: flexProsAndValsBase.co,
  'column-reverse': flexProsAndValsBase.cor,
  auto: flexProsAndValsBase.au,
  stretch: flexProsAndValsBase.st,
  baseline: flexProsAndValsBase.bl,
  initial: flexProsAndValsBase.in,
  inherit: flexProsAndValsBase.ih,
};

export const flexAttrsSelf = Object.keys(flexPropsAndValsSelf);
