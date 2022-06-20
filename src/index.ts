import { IConfig, IConfigUser, setConfig, updateConfig } from './config/main';
import getParameters, { IParams } from './methods/getParameters';

import build from './methods/build';
import buildCols from './methods/buildCols';
import buildFlex from './methods/buildFlex';
import buildPads from './methods/buildPads';
import buildPadTop from './methods/buildPadTop';
import buildPadRight from './methods/buildPadRight';
import buildPadBottom from './methods/buildPadBottom';
import buildPadLeft from './methods/buildPadLeft';
import buildMars from './methods/buildMars';
import buildMarTop from './methods/buildMarTop';
import buildMarRight from './methods/buildMarRight';
import buildMarBottom from './methods/buildMarBottom';
import buildMarLeft from './methods/buildMarLeft';
import buildMaxWidth from './methods/buildMaxWidth';
import buildMaxHeight from './methods/buildMaxHeight';
import buildMinWidth from './methods/buildMinWidth';
import buildMinHeight from './methods/buildMinHeight';
import buildHeight from './methods/buildHeight';
import buildWidth from './methods/buildWidth';

import set from './methods/set';
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

import insertRules from './methods/insertRules';

import { IStyles } from './helpers/createStyles';
import { IBuild, IBuildResult } from './methods/build';
import { processors } from './config/processors';

export interface ILayouter extends IConfig {
  getParameters: (Node: HTMLElement | Element) => IParams;
  updateConfig: (userConfig: Partial<Omit<IConfigUser, 'bridge'>>) => IConfig;

  build: (
    obj: Partial<IBuild>,
    insertStyles?: boolean
  ) => Partial<IBuildResult> | boolean;
  buildCols: (
    valCols: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildFlex: (
    valFlex: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;

  buildPads: (
    valPads: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildPadTop: (
    valPadTop: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildPadRight: (
    valPadRight: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildPadBottom: (
    valPadBottom: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildPadLeft: (
    valPadLeft: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMars: (
    valMars: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMarTop: (
    valMarTop: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMarRight: (
    valMarRight: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMarBottom: (
    valMarBottom: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMarLeft: (
    valMarLeft: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMaxWidth: (
    valMaxWidth: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMaxHeight: (
    valMaxHeight: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMinWidth: (
    valMinWidth: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMinHeight: (
    valMinHeight: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildHeight: (
    valHeight: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildWidth: (
    valWidth: string | string[],
    insertStyles?: boolean
  ) => IStyles | boolean;

  set: (Node: HTMLElement | Element, parameters?: IParams) => Promise<void>;
  setCols: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setFlex: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;

  setMars: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMarTop: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMarRight: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMarBottom: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMarLeft: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;

  setPads: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setPadTop: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setPadRight: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setPadBottom: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setPadLeft: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;

  setWidth: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMinWidth: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMaxWidth: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;

  setHeight: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMinHeight: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;
  setMaxHeight: (
    Node: HTMLElement | Element,
    parameters?: IParams
  ) => Promise<void>;

  insertRules: (objStyles: IStyles) => void;
}

const layouter = ((userConfig: Partial<IConfigUser> = {}): ILayouter => {
  const config = setConfig(userConfig);

  return {
    ...config,
    getParameters,
    updateConfig,
    insertRules,
    build,
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
    set,
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

  // Auto init process
  const props = Object.keys(processors).map( prop => `[${prop}]`).join(', ');
  const nodes = document.querySelectorAll(props);
  const setNodes = new Set();
  Array.prototype.forEach.call(nodes, itemNode => {
    setNodes.add(itemNode);
  });
  const promises: Promise<void>[] = [];
  setNodes.forEach( node => {
    promises.push(layouter.set( node as Element | HTMLElement ))
  })
  Promise.all(promises).then( () => {
    if (layouter.ready) layouter.ready( layouter );
  })
}

export default layouter;
