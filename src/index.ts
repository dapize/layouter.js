import getNums, { IBreakpointObj } from './helpers/getNums';

export interface IBreakpoints {
  [ alias: string ]: {
    width: number;
    cols: number;
  }
}

export interface ILayouter {
  prefix?: string;
  breakpoints: IBreakpoints;
  bridge?: boolean;
}

class Layouter {
  prefix: ILayouter['prefix'];
  breakpoints: ILayouter['breakpoints'];
  sizes: IBreakpointObj;
  cols: IBreakpointObj;
  
  constructor ( config: ILayouter ) {
    this.prefix = config.prefix ? config.prefix + '-' : '';
    this.breakpoints = config.breakpoints;
    this.sizes = getNums( config.breakpoints, 'width' );
    this.cols = getNums( config.breakpoints, 'cols' );
  }
}

export default Layouter;