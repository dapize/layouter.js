import breakpointsNums, { IBreakpointObj } from './helpers/breakpointsNums';
import scopesStylesBuilder, { IScopes } from './helpers/scopesStylesBuilder';

export interface IBreakpoints {
  [ alias: string ]: {
    width: number;
    cols: number;
  }
}

export interface IClassNameObj {
  [ className: string ]: string;
}

export interface ILayouter {
  prefix?: string;
  breakpoints: IBreakpoints;
  bridge?: boolean;
  scope: IScopes;
  styles: IClassNameObj;
}

class Layouter {
  prefix: ILayouter['prefix'];
  breakpoints: ILayouter['breakpoints'];
  sizes: IBreakpointObj;
  cols: IBreakpointObj;
  scope: IScopes;
  styles: IClassNameObj
  
  constructor ( config: ILayouter ) {
    this.prefix = config.prefix ? config.prefix + '-' : '';
    this.breakpoints = config.breakpoints;
    this.sizes = breakpointsNums( config.breakpoints, 'width' );
    this.cols = breakpointsNums( config.breakpoints, 'cols' );
    this.scope = scopesStylesBuilder( { bridge: true, ...config } );
    this.styles = {};
  }
}

export default Layouter;