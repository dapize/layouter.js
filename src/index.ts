import breakpointsNums, { IBreakpointObj } from './helpers/breakpointsNums';
import scopesStylesBuilder, { IScopes } from './helpers/scopesStylesBuilder';
import config, { IConfig } from './config';
import getParameters, { IParams } from './methods/getParameters';
import processors, { IProcessors } from './processors';
import buildCols from './methods/buildCols';

export interface ILayouter {
  getParameters?: (Node: HTMLElement) => IParams;
  processors?: IProcessors;
  buildCols?: (valCols: string | string[], insertStyles?: boolean) => void;
}

const defaultConfig = config();

export class Layouter implements ILayouter {
  prefix: IConfig['prefix'];
  breakpoints: IConfig['breakpoints'];
  sizes: IBreakpointObj;
  cols: IBreakpointObj;
  scope: IScopes;
  styles: {
    [className: string]: string;
  };
  config: IConfig;
  getParameters?: ILayouter['getParameters'];
  processors?: IProcessors;
  buildCols?: (valCols: string | string[], insertStyles?: boolean) => void;

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

// Methods, Getter and Setters
Layouter.prototype.getParameters = getParameters;

Object.defineProperty(Layouter.prototype, 'processors', {
  get: () => {
    return processors;
  },
});

Layouter.prototype.buildCols = buildCols;

// Auto instance
//new Layouter();

// Global Declare
declare global {
  interface Window {
    Layouter: typeof Layouter;
  }
}

// Attaching to window
if (window) window.Layouter = Layouter;

export default Layouter;
