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
interface IConfigNums {
    scope: IScopes;
    cols: ICols;
    sizes: ICols;
    breakpoints: IBreakpoints;
}
export interface IConfig extends Omit<IConfigUser, 'breakpoints'>, IConfigNums {
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
export declare const setConfig: (customCfg?: Partial<IConfigUser>) => IConfig;
export declare const setStyles: (className: string, value: string) => void;
declare const getConfig: (reset?: boolean) => IConfig;
export declare const updateConfig: (userConfig: Partial<IConfigUser>) => IConfig;
export default getConfig;
