import { IBreakpoints } from '../index';

export type TNumProp = 'width' | 'cols';

export interface IBreakpointObj {
  [ alias: string ]: number;
}

export interface IBreakpoint {
  alias: string;
  width: number;
}

const getNums = (objBps: IBreakpoints, propName: TNumProp): IBreakpointObj => {
  const sizes: IBreakpointObj = {};

  if ( propName === 'width' ) {
    Object
      .keys( objBps )
      .map( ( bp: string ) => {
        return {
          alias: bp,
          width: objBps[ bp ].width
        }
      })
      .sort(( a: IBreakpoint, b: IBreakpoint ) => ( a.width > b.width ) ? 1 : (( b.width > a.width ) ? -1 : 0 ))
      .forEach( ( bp: IBreakpoint, index: number ) => {
        sizes[ bp.alias ] = !index ? 0 : objBps[ bp.alias ][propName]
      });
  } else {
    Object.keys( objBps ).forEach( ( bp ) => {
      sizes[bp] = objBps[bp][propName];
    });
  }

  return sizes;
};

export default getNums;