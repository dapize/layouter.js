import { IBreakpoints } from '@helpers/breakpointsNums';

export interface IConfig {
  init: boolean;
  prefix: string;
  breakpoints: IBreakpoints;
  bridge: boolean;
  ready?: () => void;
}

declare global {
  interface Window {
    layouter: IConfig;
  }
}
