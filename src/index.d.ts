import { IBuildCols } from '@methods/buildCols';
import { IParams } from '@methods/getParameters';
import { IConfig, IProcessors } from '@config';
import { IBreakpointObj, IBreakpoints } from '@helpers/breakpointsNums';
import { IScopes } from '@helpers/scopesStylesBuilder';

export interface ILayouter {
  prefix: string;
  breakpoints: IBreakpoints;
  sizes: IBreakpointObj;
  cols: IBreakpointObj;
  scope: IScopes;
  styles: {
    [className: string]: string;
  };
  config: IConfig;
  getParameters?: ( Node: HTMLElement ) => IParams;
  processors?: IProcessors;
  buildCols?: ( args: IBuildCols ) => void;
}
