export declare type TNumProp = 'width' | 'cols';
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
declare const breakpointsNums: (objBps: IBreakpoints, propName: TNumProp) => IBreakpointObj;
export default breakpointsNums;
