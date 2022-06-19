export interface IProcessors {
  [proName: string]: {
    set: string;
    build: string;
    ruleCss: string;
  };
}

export const processors: IProcessors = {
  cols: {
    set: 'setCols',
    build: 'buildCols',
    ruleCss: 'width',
  },

  // Paddings
  pad: {
    set: 'setPads',
    build: 'buildPads',
    ruleCss: 'padding',
  },
  padt: {
    set: 'setPadTop',
    build: 'buildPadTop',
    ruleCss: 'padding-top',
  },
  padr: {
    set: 'setPadRight',
    build: 'buildPadRight',
    ruleCss: 'padding-right',
  },
  padb: {
    set: 'setPadBottom',
    build: 'buildPadBottom',
    ruleCss: 'padding-bottom',
  },
  padl: {
    set: 'setPadLeft',
    build: 'buildPadLeft',
    ruleCss: 'padding-left',
  },

  // Margin
  mar: {
    set: 'setMars',
    build: 'buildMars',
    ruleCss: 'margin',
  },
  mart: {
    set: 'setMarTop',
    build: 'buildMarTop',
    ruleCss: 'margin-top',
  },
  marr: {
    set: 'setMarRight',
    build: 'buildMarRight',
    ruleCss: 'margin-right',
  },
  marb: {
    set: 'setMarBottom',
    build: 'buildMarBottom',
    ruleCss: 'margin-bottom',
  },
  marl: {
    set: 'setMarLeft',
    build: 'buildMarLeft',
    ruleCss: 'margin-left',
  },

  // Flex Box
  flex: {
    set: 'setFlex',
    build: 'buildFlex',
    ruleCss: 'display: flex',
  },

  // Max & Min Width & Height
  mxw: {
    set: 'setMaxWidth',
    build: 'buildMaxWidth',
    ruleCss: 'max-width',
  },

  mxh: {
    set: 'setMaxHeight',
    build: 'buildMaxHeight',
    ruleCss: 'max-height',
  },

  miw: {
    set: 'setMinWidth',
    build: 'buildMinWidth',
    ruleCss: 'min-width',
  },

  mih: {
    set: 'setMinHeight',
    build: 'buildMinHeight',
    ruleCss: 'min-height',
  },

  // Width & Height
  wdh: {
    set: 'setWidth',
    build: 'buildWidth',
    ruleCss: 'width',
  },

  hgt: {
    set: 'setHeight',
    build: 'buildHeight',
    ruleCss: 'height',
  },
};
