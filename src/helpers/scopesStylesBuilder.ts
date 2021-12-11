import breakpointsOrdered from './breakpointsOrdered';
import createScopeStyles, { IRCreateScopeStyles } from './createScopeStyles';
import { IConfig } from '../config';

export interface IScopes {
  [name: string]: IRCreateScopeStyles;
}

const scopesStylesBuilder = (config: IConfig): IScopes => {
  const arrBps = breakpointsOrdered(config.breakpoints);
  const scopes: IScopes = {};
  arrBps.forEach((bp: string) => {
    scopes[bp] = createScopeStyles(config, bp, 'append', document.body);
  });
  return scopes;
};

export default scopesStylesBuilder;
