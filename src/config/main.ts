import breakpointsNums, { IBreakpoints } from "../helpers/breakpointsNums";
import { IScopes, scopesStylesBuilder } from "../helpers/scopesStylesBuilder";

export interface ICols {
  [ colAlias: string ]: number;
}

export interface IConfigUser {
  prefix: string;
  breakpoints: IBreakpoints;
  bridge: boolean;
}

interface IConfigNums {
  scope: IScopes;
  cols: ICols;
  sizes: ICols;
}

export interface IConfig extends IConfigUser, IConfigNums {
  styles: {
    [className: string]: string;
  };
  ready?: () => void;
}

declare global {
  interface Window {
    layouterConfig: IConfigUser;
  }
}

const breakpointsInit: IBreakpoints = {
  xs: {
    width: 360,
    cols: 15,
  },
  sm: {
    width: 768,
    cols: 31,
  },
  md: {
    width: 1024,
    cols: 31,
  },
};

export let baseConfig: IConfigUser = {
  prefix: '',
  breakpoints: breakpointsInit,
  bridge: true
};

let config: IConfig;

const configNums = (bps: IBreakpoints, bridge: boolean, scope?: IScopes): IConfigNums => {
  return {
    sizes: breakpointsNums(bps, 'width'),
    cols: breakpointsNums(bps, 'cols'),
    scope: scopesStylesBuilder(bps, bridge, scope),
  }
}

export const setConfig = ( customCfg: Partial<IConfigUser> = {} ): IConfig => {
  if (window && window.layouterConfig) {
    baseConfig = {
      ...baseConfig,
      ...window.layouterConfig,
      ...customCfg
    };
  } else {
    if ( customCfg ) {
      baseConfig = {
        ...baseConfig,
        ...customCfg
      }
    }
  }

  config = {
    ...baseConfig,
    ...configNums(baseConfig.breakpoints, baseConfig.bridge),
    styles: {}
  }

  return config
};

const getConfig = (reset: boolean = false): IConfig => {
  return reset ? setConfig() : config
}

export const updateConfig = ( userConfig: Partial<IConfigUser> ): IConfig => {
  config = {
    ...config,
    ...userConfig
  }

  if (userConfig.breakpoints) {
    config = {
      ...config,
      ...configNums(config.breakpoints, config.bridge, config.scope),
    }
  }

  return config;
}

export default getConfig;
