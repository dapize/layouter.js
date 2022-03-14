import breakpointsOrdered from '../breakpointsOrdered';
import createScopeStyles from '../createScopeStyles';
import { IConfig } from '../../config';
import { IScopes } from './scopesStylesBuilder.d'


const scopesStylesBuilder = (config: IConfig): IScopes => {
  const arrBps = breakpointsOrdered(config.breakpoints);
  const scopes: IScopes = {};
  arrBps.forEach((bp: string) => {
    scopes[bp] = createScopeStyles(config, bp, 'append', document.body);
  });
  return scopes;
};

export default scopesStylesBuilder;
