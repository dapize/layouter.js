import { IBreakpoints } from './breakpointsNums';
import breakpointsOrdered from './breakpointsOrdered';
import createScopeStyles, { IRCreateScopeStyles } from './createScopeStyles';

export interface IScopes {
  [name: string]: IRCreateScopeStyles;
}

export const scopesStylesBuilder = (
  breakpoints: IBreakpoints,
  bridge: boolean,
  scope?: IScopes
): IScopes => {
  const arrBps = breakpointsOrdered(breakpoints);
  const scopes: IScopes = scope || {};
  arrBps.forEach((bp: string) => {
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
