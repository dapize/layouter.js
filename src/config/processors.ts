import buildCols from '../methods/buildCols';
import buildFlex from '../methods/buildFlex';
import buildPad from '../methods/buildPad';
import buildPadTop from '../methods/buildPadTop';
import buildPadRight from '../methods/buildPadRight';
import buildPadBottom from '../methods/buildPadBottom';
import buildPadLeft from '../methods/buildPadLeft';
import buildMar from '../methods/buildMar';
import buildMarTop from '../methods/buildMarTop';
import buildMarRight from '../methods/buildMarRight';
import buildMarBottom from '../methods/buildMarBottom';
import buildMarLeft from '../methods/buildMarLeft';
import buildMaxWidth from '../methods/buildMaxWidth';
import buildMaxHeight from '../methods/buildMaxHeight';
import buildMinWidth from '../methods/buildMinWidth';
import buildMinHeight from '../methods/buildMinHeight';
import buildHeight from '../methods/buildHeight';
import buildWidth from '../methods/buildWidth';
import buildPosition from '../methods/buildPosition';
import buildTop from '../methods/buildTop';
import buildRight from '../methods/buildRight';
import buildBottom from '../methods/buildBottom';
import buildLeft from '../methods/buildLeft';

import { IStyles } from '../helpers/createStyles';

type TDirectiveNameBase =
  | 'cols'
  | 'pad'
  | 'padt'
  | 'padr'
  | 'padb'
  | 'padl'
  | 'mar'
  | 'mart'
  | 'marr'
  | 'marb'
  | 'marl'
  | 'flex'
  | 'mxw'
  | 'mxh'
  | 'miw'
  | 'mih'
  | 'wdh'
  | 'hgt'
  | 'pos'
  | 't'
  | 'r'
  | 'b'
  | 'l';

type TDirectiveNameExtended =
  | 'c'
  | 'fx'
  | 'p'
  | 'padding'
  | 'pt'
  | 'padding-top'
  | 'pr'
  | 'padding-right'
  | 'pb'
  | 'padding-bottom'
  | 'pl'
  | 'padding-left'
  | 'm'
  | 'margin'
  | 'mt'
  | 'margin-top'
  | 'mr'
  | 'margin-right'
  | 'mb'
  | 'margin-bottom'
  | 'ml'
  | 'margin-left'
  | 'w'
  | 'width'
  | 'h'
  | 'height'
  | 'max-width'
  | 'max-height'
  | 'min-width'
  | 'min-height'
  | 'position'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left';

export type TDirectiveName = TDirectiveNameBase | TDirectiveNameExtended;

export interface IProcessor {
  build: (values: string, insertStyles: boolean) => IStyles | Error;
  ruleCss: string;
  classPrefix: string;
}

const processorsBase: Record<TDirectiveNameBase, IProcessor> = {
  cols: {
    build: buildCols,
    ruleCss: 'width',
    classPrefix: 'c'
  },

  // Paddings
  pad: {
    build: buildPad,
    ruleCss: 'padding',
    classPrefix: 'p'
  },
  padt: {
    build: buildPadTop,
    ruleCss: 'padding-top',
    classPrefix: 'pt'
  },
  padr: {
    build: buildPadRight,
    ruleCss: 'padding-right',
    classPrefix: 'pr'
  },
  padb: {
    build: buildPadBottom,
    ruleCss: 'padding-bottom',
    classPrefix: 'pb'
  },
  padl: {
    build: buildPadLeft,
    ruleCss: 'padding-left',
    classPrefix: 'pl'
  },

  // Margin
  mar: {
    build: buildMar,
    ruleCss: 'margin',
    classPrefix: 'm'
  },
  mart: {
    build: buildMarTop,
    ruleCss: 'margin-top',
    classPrefix: 'mt'
  },
  marr: {
    build: buildMarRight,
    ruleCss: 'margin-right',
    classPrefix: 'mr'
  },
  marb: {
    build: buildMarBottom,
    ruleCss: 'margin-bottom',
    classPrefix: 'mb'
  },
  marl: {
    build: buildMarLeft,
    ruleCss: 'margin-left',
    classPrefix: 'ml'
  },

  // Flex Box
  flex: {
    build: buildFlex,
    ruleCss: 'display: flex',
    classPrefix: 'fx'
  },

  // Max & Min Width & Height
  mxw: {
    build: buildMaxWidth,
    ruleCss: 'max-width',
    classPrefix: 'mxw'
  },

  mxh: {
    build: buildMaxHeight,
    ruleCss: 'max-height',
    classPrefix: 'mxh'
  },

  miw: {
    build: buildMinWidth,
    ruleCss: 'min-width',
    classPrefix: 'miw'
  },

  mih: {
    build: buildMinHeight,
    ruleCss: 'min-height',
    classPrefix: 'mih'
  },

  // Width & Height
  wdh: {
    build: buildWidth,
    ruleCss: 'width',
    classPrefix: 'w'
  },

  hgt: {
    build: buildHeight,
    ruleCss: 'height',
    classPrefix: 'h'
  },

  // Position
  pos: {
    build: buildPosition,
    ruleCss: 'position',
    classPrefix: 'pos'
  },
  t: {
    build: buildTop,
    ruleCss: 'top',
    classPrefix: 't'
  },
  r: {
    build: buildRight,
    ruleCss: 'right',
    classPrefix: 'r'
  },
  b: {
    build: buildBottom,
    ruleCss: 'bottom',
    classPrefix: 'b'
  },
  l: {
    build: buildLeft,
    ruleCss: 'left',
    classPrefix: 'l'
  }
};

export const processors: Record<TDirectiveName, IProcessor> = {
  ...processorsBase,
  c: processorsBase.cols,
  fx: processorsBase.flex,
  p: processorsBase.pad,
  padding: processorsBase.pad,
  pt: processorsBase.padt,
  'padding-top': processorsBase.padt,
  pr: processorsBase.padr,
  'padding-right': processorsBase.padr,
  pb: processorsBase.padb,
  'padding-bottom': processorsBase.padb,
  pl: processorsBase.padl,
  'padding-left': processorsBase.padl,
  m: processorsBase.mar,
  margin: processorsBase.mar,
  mt: processorsBase.mart,
  'margin-top': processorsBase.mart,
  mr: processorsBase.marr,
  'margin-right': processorsBase.marr,
  mb: processorsBase.marb,
  'margin-bottom': processorsBase.marb,
  ml: processorsBase.marl,
  'margin-left': processorsBase.marl,
  w: processorsBase.wdh,
  width: processorsBase.wdh,
  h: processorsBase.hgt,
  height: processorsBase.hgt,
  'max-width': processorsBase.mxw,
  'max-height': processorsBase.mxh,
  'min-width': processorsBase.miw,
  'min-height': processorsBase.mih,
  position: processorsBase.pos,
  top: processorsBase.t,
  right: processorsBase.r,
  bottom: processorsBase.b,
  left: processorsBase.l,
};
