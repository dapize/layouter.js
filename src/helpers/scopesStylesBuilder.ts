import { IBreakpoints } from './breakpointsNums';
import createScopeStyles, { IRCreateScopeStyles } from './createScopeStyles';

export interface IScopes {
  [name: string]: IRCreateScopeStyles;
}

export const scopesStylesBuilder = (
  breakpoints: IBreakpoints,
  bridge: boolean,
  scope?: IScopes
): IScopes => {
  const scopes: IScopes = scope || {};
  Object.keys(breakpoints).forEach((bp: string) => {
    if (!scopes.hasOwnProperty(bp)) {
      scopes[bp] = createScopeStyles({
        bridge,
        bp,
        insertionType: 'append',
        node: document.body,
      });
    }
  });
  return scopes;
};
