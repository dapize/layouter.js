import { ILayouter } from '../index';
import breakpointsOrdered from './breakpointsOrdered';
import createScopeStyles, { IRCreateScopeStyles } from './createScopeStyles';

export interface IScopes {
  [ name: string ]: IRCreateScopeStyles;
}

const scopesStylesBuilder = ( config: ILayouter ): IScopes => {
  const arrBps = breakpointsOrdered( config.breakpoints );
  const scopes:IScopes = {};
  arrBps.forEach( ( bp: string ) => {
    scopes[bp] = createScopeStyles(config, bp, 'append', document.body);
  });
  return scopes;
};

export default scopesStylesBuilder;