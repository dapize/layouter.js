import { IBreakpoints } from './breakpointsNums';
import { IRCreateScopeStyles } from './createScopeStyles';
export interface IScopes {
    [name: string]: IRCreateScopeStyles;
}
export declare const scopesStylesBuilder: (breakpoints: IBreakpoints, bridge: boolean, scope?: IScopes | undefined) => IScopes;
