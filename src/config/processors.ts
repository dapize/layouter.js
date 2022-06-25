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

import { IStyles } from '../helpers/createStyles';
import buildTop from '../methods/buildTop';
import buildRight from '../methods/buildRight';
import buildBottom from '../methods/buildBottom';
import buildLeft from '../methods/buildLeft';

export type TDirectiveName =
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

export interface IProcessor {
  build: (values: string, insertStyles: boolean) => IStyles | Error;
  ruleCss: string;
}

export const processors: Record<TDirectiveName, IProcessor> = {
  cols: {
    build: buildCols,
    ruleCss: 'width',
  },

  // Paddings
  pad: {
    build: buildPad,
    ruleCss: 'padding',
  },
  padt: {
    build: buildPadTop,
    ruleCss: 'padding-top',
  },
  padr: {
    build: buildPadRight,
    ruleCss: 'padding-right',
  },
  padb: {
    build: buildPadBottom,
    ruleCss: 'padding-bottom',
  },
  padl: {
    build: buildPadLeft,
    ruleCss: 'padding-left',
  },

  // Margin
  mar: {
    build: buildMar,
    ruleCss: 'margin',
  },
  mart: {
    build: buildMarTop,
    ruleCss: 'margin-top',
  },
  marr: {
    build: buildMarRight,
    ruleCss: 'margin-right',
  },
  marb: {
    build: buildMarBottom,
    ruleCss: 'margin-bottom',
  },
  marl: {
    build: buildMarLeft,
    ruleCss: 'margin-left',
  },

  // Flex Box
  flex: {
    build: buildFlex,
    ruleCss: 'display: flex',
  },

  // Max & Min Width & Height
  mxw: {
    build: buildMaxWidth,
    ruleCss: 'max-width',
  },

  mxh: {
    build: buildMaxHeight,
    ruleCss: 'max-height',
  },

  miw: {
    build: buildMinWidth,
    ruleCss: 'min-width',
  },

  mih: {
    build: buildMinHeight,
    ruleCss: 'min-height',
  },

  // Width & Height
  wdh: {
    build: buildWidth,
    ruleCss: 'width',
  },

  hgt: {
    build: buildHeight,
    ruleCss: 'height',
  },

  // Position
  pos: {
    build: buildPosition,
    ruleCss: 'position',
  },
  t: {
    build: buildTop,
    ruleCss: 'top',
  },
  r: {
    build: buildRight,
    ruleCss: 'right',
  },
  b: {
    build: buildBottom,
    ruleCss: 'bottom',
  },
  l: {
    build: buildLeft,
    ruleCss: 'left',
  },
};
