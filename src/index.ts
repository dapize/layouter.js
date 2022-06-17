import breakpointsNums from '@helpers/breakpointsNums';
import scopesStylesBuilder from '@helpers/scopesStylesBuilder';

import getParameters from '@methods/getParameters';
import buildCols from '@methods/buildCols';

import { config, IConfig, processors } from '@core';

import { ILayouter } from './index.d';


const defaultConfig = config();

class Layouter implements ILayouter {
  prefix: ILayouter['prefix'];
  breakpoints: ILayouter['breakpoints'];
  sizes: ILayouter['sizes'];
  cols: ILayouter['cols'];
  scope: ILayouter['scope'];
  styles: ILayouter['styles'];
  config: ILayouter['config'];
  getParameters?: ILayouter['getParameters'];
  processors?: ILayouter['processors'];
  buildCols?: ILayouter['buildCols'];

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
