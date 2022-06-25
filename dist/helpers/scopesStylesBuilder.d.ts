import { IBreakpoints } from './breakpointsNums';
import { IRCreateScopeStyles } from './createScopeStyles';
export interface IScopes {
    [name: string]: IRCreateScopeStyles;
}
export interface IScopesStylesBuilder {
    breakpoints: IBreakpoints;
    bridge: boolean;
    scope?: IScopes;
    context: Window & typeof globalThis;
}
export declare const scopesStylesBuilder: ({ breakpoints, bridge, scope, context, }: IScopesStylesBuilder) => IScopes;
