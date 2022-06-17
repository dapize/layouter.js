import breakpointsOrdered from '@helpers/breakpointsOrdered';
import createScopeStyles from '@helpers/createScopeStyles';
import { IConfig } from '@core';
import { IScopes } from './scopesStylesBuilder.d'


export const scopesStylesBuilder = (config: IConfig): IScopes => {
  const arrBps = breakpointsOrdered(config.breakpoints);
  const scopes: IScopes = {};
  arrBps.forEach((bp: string) => {
    scopes[bp] = createScopeStyles({
      bridge: config.bridge,
      bp,
      insertionType: 'append',
      node: document.body
    });
  });
  return scopes;
};
