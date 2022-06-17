export type TNumProp = 'width' | 'cols';

export interface IBreakpoint {
  alias: string;
  width: number;
}

export interface IBreakpoints {
  [alias: string]: {
    width: number;
    cols: number;
    direct?: boolean;
  };
}

export interface IBreakpointObj {
  [alias: string]: number;
}
