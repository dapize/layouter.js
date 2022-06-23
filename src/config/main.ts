import { ILayouter } from './../main';
import breakpointsNums, { IBreakpoints } from '../helpers/breakpointsNums';
import { IScopes, scopesStylesBuilder } from '../helpers/scopesStylesBuilder';
import breakpointsOrdered from '../helpers/breakpointsOrdered';

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
}

declare global {
  interface Window {
    layouterConfig: Partial<IConfigUser>;
  }
}

const breakpointsInit: IBreakpoints = {
  xs: {
    width: 360,
    cols: 15,
  },
  sm: {
    width: 600,
    cols: 25
  },
  md: {
    width: 900,
    cols: 31
  },
  lg: {
    width: 1200,
    cols: 41
  },
  xlg: {
    width: 1536,
    cols: 51
  }
};

export let baseConfig: IConfigUser = {
  prefix: '',
  breakpoints: breakpointsInit,
  bridge: true,
  debug: true,
};

let config: IConfig;

const configNums = (
  bps: IBreakpoints,
  bridge: boolean,
  scope?: IScopes
): IConfigNums => {
  const sizes = breakpointsNums(bps, 'width');
  const finalBps = breakpointsOrdered(bps, sizes);
  return {
    sizes,
    cols: breakpointsNums(bps, 'cols'),
    scope: scopesStylesBuilder(finalBps, bridge, scope),
    breakpoints: finalBps,
  };
};

export const setConfig = (customCfg: Partial<IConfigUser> = {}): IConfig => {
  if (window && window.layouterConfig) {
    baseConfig = {
      ...baseConfig,
      ...window.layouterConfig,
      ...customCfg,
    };
  } else {
    if (customCfg) {
      baseConfig = {
        ...baseConfig,
        ...customCfg,
      };
    }
  }

  config = {
    ...baseConfig,
    ...configNums(baseConfig.breakpoints, baseConfig.bridge),
    styles: {},
  };

  return config;
};

export const setStyles = ( className: string, value: string ) => {
  config.styles[ className ] = value;
}

const getConfig = (reset: boolean = false): IConfig => {
  return reset ? setConfig() : config;
};

export const updateConfig = (userConfig: Partial<IConfigUser>): IConfig => {
  config = {
    ...config,
    ...userConfig,
  };

  if (userConfig.breakpoints) {
    config = {
      ...config,
      ...configNums(config.breakpoints, config.bridge, config.scope),
    };
  }

  return config;
};

export default getConfig;
