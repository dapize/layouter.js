import { IBreakpoints } from './breakpointsNums';
import createScopeStyles, { IRCreateScopeStyles } from './createScopeStyles';

export interface IScopes {
  [name: string]: IRCreateScopeStyles;
}

export interface IScopesStylesBuilder {
  breakpoints: IBreakpoints;
  bridge: boolean;
  scope?: IScopes;
  context: Window & typeof globalThis;
}

export const scopesStylesBuilder = ({
  breakpoints,
  bridge,
  scope,
  context,
}: IScopesStylesBuilder): IScopes => {
  const scopes: IScopes = scope || {};
  Object.keys(breakpoints).forEach((bp: string) => {
    if (!scopes[bp]) {
      scopes[bp] = createScopeStyles({
        bridge: bridge,
        bp,
        insertionType: 'append',
        node: context.document.body,
        context,
      });
    }
  });
  return scopes;
};
