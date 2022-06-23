export type TNumProp = 'width' | 'cols';

export interface IBreakpoint {
  alias: string;
  width: number;
}

export interface IBreakpoints {
  [alias: string]: {
    width: number;
    cols: number;
  };
}

export interface IBreakpointObj {
  [alias: string]: number;
}

const breakpointsNums = (
  objBps: IBreakpoints,
  propName: TNumProp
): IBreakpointObj => {
  const sizes: IBreakpointObj = {};

  if (propName === 'width') {
    Object.keys(objBps)
      .map((bp: string) => {
        return {
          alias: bp,
          width: objBps[bp].width,
        };
      })
      .sort((a: IBreakpoint, b: IBreakpoint) =>
        a.width > b.width ? 1 : b.width > a.width ? -1 : 0
      )
      .forEach((bp: IBreakpoint, index: number) => {
        sizes[bp.alias] = !index ? 0 : objBps[bp.alias][propName];
      });
  } else {
    Object.keys(objBps).forEach((bp) => {
      sizes[bp] = objBps[bp][propName];
    });
  }

  return sizes;
};

export default breakpointsNums;
