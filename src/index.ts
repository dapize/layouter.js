import { IConfig, IConfigUser, setConfig, updateConfig } from './config/main';
import getParameters, { IParams } from './methods/getParameters';

import buildCols from './methods/buildCols'
import buildFlex from './methods/buildFlex'
import buildPads from './methods/buildPads'
import buildPadTop from './methods/buildPadTop'
import buildPadRight from './methods/buildPadRight'
import buildPadBottom from './methods/buildPadBottom'
import buildPadLeft from './methods/buildPadLeft'
import buildMars from './methods/buildMars'
import buildMarTop from './methods/buildMarTop'
import buildMarRight from './methods/buildMarRight'
import buildMarBottom from './methods/buildMarBottom'
import buildMarLeft from './methods/buildMarLeft'
import buildMaxWidth from './methods/buildMaxWidth'
import buildMaxHeight from './methods/buildMaxHeight'
import buildMinWidth from './methods/buildMinWidth'
import buildMinHeight from './methods/buildMinHeight'
import buildHeight from './methods/buildHeight'
import buildWidth from './methods/buildWidth'

import setFlex from './methods/setFlex';
import setCols from './methods/SetCols';
import setHeight from './methods/setHeight';
import setMarBottom from './methods/setMarBottom';
import setMarLeft from './methods/setMarLeft';
import setMarRight from './methods/setMarRight';
import setMars from './methods/setMars';
import setMarTop from './methods/setMarTop';
import setMaxWidth from './methods/setMaxWidth';
import setMinHeight from './methods/setMinHeight';
import setMinWidth from './methods/setMinWidth';
import setPadBottom from './methods/setPadBottom';
import setPadLeft from './methods/setPadLeft';
import setPadRight from './methods/setPadRight';
import setPads from './methods/setPads';
import setPadTop from './methods/setPadTop';
import setWidth from './methods/setWidth';
import setMaxHeight from './methods/setMaxHeight';

import { IStyles } from './helpers/createStyles';

export interface ILayouter extends IConfig {
  getParameters: (Node: HTMLElement | Element) => IParams;
  updateConfig: (userConfig: Partial<Omit<IConfigUser, 'bridge'>>) => IConfig;

  buildCols: (valCols: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildFlex: (valFlex: string | string[], insertStyles?: boolean) => IStyles | boolean;

  buildPads: (valPads: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildPadTop: (valPadTop: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildPadRight: (valPadRight: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildPadBottom: (valPadBottom: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildPadLeft: (valPadLeft: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMars: (valMars: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMarTop: (valMarTop: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMarRight: (valMarRight: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMarBottom: (valMarBottom: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMarLeft: (valMarLeft: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMaxWidth: (valMaxWidth: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMaxHeight: (valMaxHeight: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMinWidth: (valMinWidth: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildMinHeight: (valMinHeight: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildHeight: (valHeight: string | string[], insertStyles?: boolean) => IStyles | boolean;
  buildWidth: (valWidth: string | string[], insertStyles?: boolean) => IStyles | boolean;

  setCols: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setFlex: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;

  setMars: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMarTop: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMarRight: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMarBottom: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMarLeft: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;

  setPads: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setPadTop: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setPadRight: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setPadBottom: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setPadLeft: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;

  setWidth: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMinWidth: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMaxWidth: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;

  setHeight: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMinHeight: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
  setMaxHeight: (Node: HTMLElement | Element, parameters?: IParams) => Promise<boolean>;
}

const layouter = ((userConfig: Partial<IConfigUser> = {}): ILayouter => {
  const config = setConfig(userConfig);

  return {
    ...config,
    getParameters,
    updateConfig,
    buildCols,
    buildFlex,
    buildPads,
    buildPadTop,
    buildPadRight,
    buildPadBottom,
    buildPadLeft,
    buildMars,
    buildMarTop,
    buildMarRight,
    buildMarBottom,
    buildMarLeft,
    buildMaxWidth,
    buildMaxHeight,
    buildMinWidth,
    buildMinHeight,
    buildHeight,
    buildWidth,
    setCols,
    setFlex,
    setMars,
    setMarTop,
    setMarRight,
    setMarBottom,
    setMarLeft,
    setPads,
    setPadTop,
    setPadRight,
    setPadBottom,
    setPadLeft,
    setWidth,
    setMinWidth,
    setMaxWidth,
    setHeight,
    setMinHeight,
    setMaxHeight,
  };
})();

declare global {
  interface Window {
    layouter: ILayouter;
  }
}

if (window) {
  window.layouter = layouter;
  // const props = Object.keys(processors).map( prop => `[${prop}]`).join(', ');
  // console.time('todos');
  // document.querySelectorAll(props);
  // console.timeEnd('todos');

  console.time('colsNodes');
  const colsNodes = document.querySelectorAll('[cols]');
  const nodes = Array.prototype.map.call(colsNodes, node => layouter.setCols(node))
  Promise.all(nodes).then(() => {
    console.timeEnd('colsNodes')
  })
}

export default layouter;
