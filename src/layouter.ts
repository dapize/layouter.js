import { IConfig, IConfigUser, setConfig, updateConfig } from './config/main';
import getParameters from './methods/getParameters';

import build from './methods/build';
import buildCols from './methods/buildCols';
import buildFlex from './methods/buildFlex';
import buildPad from './methods/buildPad';
import buildPadTop from './methods/buildPadTop';
import buildPadRight from './methods/buildPadRight';
import buildPadBottom from './methods/buildPadBottom';
import buildPadLeft from './methods/buildPadLeft';
import buildMar from './methods/buildMar';
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
import setMar from './methods/setMar';
import setMarTop from './methods/setMarTop';
import setMaxWidth from './methods/setMaxWidth';
import setMinHeight from './methods/setMinHeight';
import setMinWidth from './methods/setMinWidth';
import setPadBottom from './methods/setPadBottom';
import setPadLeft from './methods/setPadLeft';
import setPadRight from './methods/setPadRight';
import setPad from './methods/setPad';
import setPadTop from './methods/setPadTop';
import setWidth from './methods/setWidth';
import setMaxHeight from './methods/setMaxHeight';

import insertRules from './methods/insertRules';
import reset from './methods/reset';

import { IStyles } from './helpers/createStyles';
import { IBuildResult } from './methods/build';
import initAutoProcessor from './helpers/initAutoProcessor';
import mainObserver from './helpers/mainObserver';
import { TDirectiveName } from './config/processors';

export interface ILayouter extends IConfig {
  getParameters: (
    Node: HTMLElement | Element
  ) => Partial<Record<TDirectiveName, string>>;
  updateConfig: (userConfig: Partial<Omit<IConfigUser, 'bridge'>>) => IConfig;
  build: (
    obj: Partial<Record<TDirectiveName, string>>,
    insertStyles?: boolean
  ) => Partial<IBuildResult> | Error;
  buildCols: (valCols: string, insertStyles?: boolean) => IStyles | Error;
  buildFlex: (valFlex: string, insertStyles?: boolean) => IStyles | Error;
  buildPad: (valPads: string, insertStyles?: boolean) => IStyles | boolean;
  buildPadTop: (valPadTop: string, insertStyles?: boolean) => IStyles | boolean;
  buildPadRight: (
    valPadRight: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildPadBottom: (
    valPadBottom: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildPadLeft: (
    valPadLeft: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMar: (valMars: string, insertStyles?: boolean) => IStyles | boolean;
  buildMarTop: (valMarTop: string, insertStyles?: boolean) => IStyles | boolean;
  buildMarRight: (
    valMarRight: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMarBottom: (
    valMarBottom: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMarLeft: (
    valMarLeft: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMaxWidth: (
    valMaxWidth: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMaxHeight: (
    valMaxHeight: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMinWidth: (
    valMinWidth: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildMinHeight: (
    valMinHeight: string,
    insertStyles?: boolean
  ) => IStyles | boolean;
  buildHeight: (valHeight: string, insertStyles?: boolean) => IStyles | boolean;
  buildWidth: (valWidth: string, insertStyles?: boolean) => IStyles | boolean;
  set: (
    Node: HTMLElement | Element,
    parameters?: Partial<Record<TDirectiveName, string>>
  ) => Promise<void | Error>;
  setCols: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setFlex: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMar: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMarTop: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMarRight: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMarBottom: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMarLeft: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setPad: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setPadTop: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setPadRight: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setPadBottom: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setPadLeft: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setWidth: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMinWidth: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMaxWidth: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setHeight: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMinHeight: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMaxHeight: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  insertRules: (objStyles: IStyles) => void;
  reset: (Node: HTMLElement | Element) => Promise<void>;
  version: string;
}

declare global {
  interface Window {
    layouter: ILayouter;
  }
}

const layouter = (userConfig: Partial<IConfigUser> = {}): ILayouter => {
  const config = setConfig(userConfig);

  const instance = {
    ...config,
    getParameters,
    updateConfig,
    insertRules,
    build,
    buildCols,
    buildFlex,
    buildPad,
    buildPadTop,
    buildPadRight,
    buildPadBottom,
    buildPadLeft,
    buildMar,
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
    setMar,
    setMarTop,
    setMarRight,
    setMarBottom,
    setMarLeft,
    setPad,
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
    reset,
  };

  // Auto init process
  initAutoProcessor(instance).then(() => {
    if (instance.ready) instance.ready(instance);
    mainObserver(instance);
  });

  return instance;
};

if (window && typeof exports === 'undefined') {
  window.layouter = layouter();
}

export default layouter;
