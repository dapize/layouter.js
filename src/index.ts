import breakpointsNums, { IBreakpointObj } from './helpers/breakpointsNums';
import scopesStylesBuilder, { IScopes } from './helpers/scopesStylesBuilder';
import config, { IConfig } from './config';

export interface IBreakpoints {
  [alias: string]: {
    width: number;
    cols: number;
  };
}

export interface IClassNameObj {
  [className: string]: string;
}

export interface ILayouter extends IConfig {
  bridge: boolean;
  scope: IScopes;
  styles: IClassNameObj;
}

const defaultConfig = config();

export class Layouter {
  prefix: ILayouter['prefix'];
  breakpoints: ILayouter['breakpoints'];
  sizes: IBreakpointObj;
  cols: IBreakpointObj;
  scope: IScopes;
  styles: IClassNameObj;
  config: IConfig;

  constructor(configUser?: Partial<IConfig>) {
    const obj = configUser || {};
    const config = { ...defaultConfig, ...obj };
    this.config = config;

    this.prefix = config.prefix;
    this.breakpoints = config.breakpoints;
    this.sizes = breakpointsNums(config.breakpoints, 'width');
    this.cols = breakpointsNums(config.breakpoints, 'cols');
    this.scope = scopesStylesBuilder(config);
    this.styles = {};

    this.ready();
  }

  ready() {
    const ready = this.config.ready;
    if (ready) ready();
  }
}

new Layouter();

declare global {
  interface Window {
    Layouter: typeof Layouter;
  }
}

if (window) window.Layouter = Layouter;

export default Layouter;
