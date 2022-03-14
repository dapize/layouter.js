export type TNumProp = 'width' | 'cols';

export interface IBreakpoints {
  [alias: string]: {
    width: number;
    cols: number;
  };
}

export interface IBreakpointObj {
  [alias: string]: number;
}

export interface IBreakpoint {
  alias: string;
  width: number;
}