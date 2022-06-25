import { ILayouter } from './../layouter';
import { IBreakpoints } from '../helpers/breakpointsNums';
import { IScopes } from '../helpers/scopesStylesBuilder';
export interface ICols {
    [colAlias: string]: number;
}
export interface IConfigUser {
    prefix: string;
    breakpoints: IBreakpoints;
    bridge: boolean;
    debug?: boolean;
    ready?: (instance: ILayouter) => void;
}
interface IConfigNumsOut {
    scope: IScopes;
    cols: ICols;
    sizes: ICols;
    breakpoints: IBreakpoints;
}
export interface IConfig extends Omit<IConfigUser, 'breakpoints'>, IConfigNumsOut {
    context: Window & typeof globalThis;
    styles: {
        [className: string]: string;
    };
    version: string;
}
declare global {
    interface Window {
        layouterConfig: Partial<IConfigUser>;
    }
}
export declare let baseConfig: IConfigUser;
export declare const setConfig: (context: Window & typeof globalThis, customCfg?: Partial<IConfigUser>) => IConfig;
declare const getConfig: () => IConfig;
export declare const setStyles: (className: string, value: string) => void;
export declare const updateConfig: (userConfig: Partial<IConfigUser>) => IConfig;
export default getConfig;
