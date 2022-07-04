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
import buildPosition from './methods/buildPosition';
import buildTop from './methods/buildTop';
import buildRight from './methods/buildRight';
import buildBottom from './methods/buildBottom';
import buildLeft from './methods/buildLeft';
import buildPadX from './methods/buildPadX';
import buildPadY from './methods/buildPadY';
import buildMarX from './methods/buildMarX';
import buildMarY from './methods/buildMarY';

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
import setPosition from './methods/setPosition';
import setTop from './methods/setTop';
import setRight from './methods/setRight';
import setBottom from './methods/setBottom';
import setLeft from './methods/setLeft';
import setPadX from './methods/setPadX';
import setPadY from './methods/setPadY';
import setMarX from './methods/setMarX';
import setMarY from './methods/setMarY';

import insertRules from './methods/insertRules';
import reset from './methods/reset';

import { IStyles } from './helpers/createStyles';
import { IBuildResult } from './methods/build';
import searchAndProcess from './helpers/searchAndProcess';
import mainObserver from './helpers/mainObserver';
import { TDirectiveName, processors, IProcessor } from './config/processors';

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
  buildPad: (valPads: string, insertStyles?: boolean) => IStyles;
  buildPadTop: (valPadTop: string, insertStyles?: boolean) => IStyles;
  buildPadRight: (valPadRight: string, insertStyles?: boolean) => IStyles;
  buildPadBottom: (valPadBottom: string, insertStyles?: boolean) => IStyles;
  buildPadLeft: (valPadLeft: string, insertStyles?: boolean) => IStyles;
  buildPadX: (valPadX: string, insertStyles?: boolean) => IStyles;
  buildPadY: (valPadX: string, insertStyles?: boolean) => IStyles;
  buildMar: (valMars: string, insertStyles?: boolean) => IStyles;
  buildMarTop: (valMarTop: string, insertStyles?: boolean) => IStyles;
  buildMarRight: (valMarRight: string, insertStyles?: boolean) => IStyles;
  buildMarBottom: (valMarBottom: string, insertStyles?: boolean) => IStyles;
  buildMarLeft: (valMarLeft: string, insertStyles?: boolean) => IStyles;
  buildMarX: (valPadX: string, insertStyles?: boolean) => IStyles;
  buildMarY: (valPadX: string, insertStyles?: boolean) => IStyles;
  buildMaxWidth: (valMaxWidth: string, insertStyles?: boolean) => IStyles;
  buildMaxHeight: (valMaxHeight: string, insertStyles?: boolean) => IStyles;
  buildMinWidth: (valMinWidth: string, insertStyles?: boolean) => IStyles;
  buildMinHeight: (valMinHeight: string, insertStyles?: boolean) => IStyles;
  buildHeight: (valHeight: string, insertStyles?: boolean) => IStyles;
  buildWidth: (valWidth: string, insertStyles?: boolean) => IStyles;
  buildPosition: (
    valPosition: string,
    insertStyles?: boolean
  ) => IStyles | Error;
  buildTop: (valTop: string, insertStyles?: boolean) => IStyles | Error;
  buildRight: (valRight: string, insertStyles?: boolean) => IStyles | Error;
  buildBottom: (valBottom: string, insertStyles?: boolean) => IStyles | Error;
  buildLeft: (valLeft: string, insertStyles?: boolean) => IStyles | Error;

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
  setMarX: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setMarY: (
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
  setPadX: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setPadY: (
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
  setPosition: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;

  setTop: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setRight: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setBottom: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;
  setLeft: (
    Node: HTMLElement | Element,
    values?: string
  ) => Promise<void | Error>;

  processors: Record<TDirectiveName, IProcessor>;

  insertRules: (objStyles: IStyles) => void;
  reset: (Node: HTMLElement | Element) => Promise<void>;
  version: string;
}

declare global {
  interface Window {
    layouter: ILayouter;
  }
}

const layouter = (
  context: Window & typeof globalThis,
  userConfig: Partial<IConfigUser> = {}
): ILayouter => {
  const config = setConfig(context, userConfig);

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
    buildPadX,
    buildPadY,
    buildMar,
    buildMarTop,
    buildMarRight,
    buildMarBottom,
    buildMarLeft,
    buildMarX,
    buildMarY,
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
    setMarX,
    setMarY,
    setPad,
    setPadTop,
    setPadRight,
    setPadBottom,
    setPadLeft,
    setPadX,
    setPadY,
    setWidth,
    setMinWidth,
    setMaxWidth,
    setHeight,
    setMinHeight,
    setMaxHeight,
    buildPosition,
    buildTop,
    buildRight,
    buildBottom,
    buildLeft,
    setPosition,
    setTop,
    setRight,
    setBottom,
    setLeft,
    reset,
    processors,
  };

  // Auto init process
  if (config.searchOnInit) {
    searchAndProcess(instance, context.document).then(() => {
      if (instance.ready) instance.ready(instance);
      if (config.observer) mainObserver(instance);
    });
  } else {
    if (config.observer) mainObserver(instance);
    if (instance.ready) instance.ready(instance);
  }

  return instance;
};

if (typeof window !== 'undefined' && typeof exports === 'undefined') {
  window.layouter = layouter(window);
}

export type { TDirectiveName, IProcessor } from './config/processors';
export type { IConfigUser } from './config/main';
export default layouter;
