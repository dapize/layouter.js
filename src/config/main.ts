import { ILayouter } from './../layouter';
import breakpointsNums, { IBreakpoints } from '../helpers/breakpointsNums';
import { IScopes, scopesStylesBuilder } from '../helpers/scopesStylesBuilder';
import breakpointsOrdered from '../helpers/breakpointsOrdered';
import { version } from '../../package.json';

export interface ICols {
  [colAlias: string]: number;
}

export interface IConfigUser {
  prefix: string;
  breakpoints: IBreakpoints;
  bridge: boolean;
  debug?: boolean;
  ready?: (instance: ILayouter) => void;
  searchOnInit: boolean;
  observer: boolean;
}

interface IConfigNumsIn {
  bps: IBreakpoints;
  bridge: boolean;
  scope?: IScopes;
  context: Window & typeof globalThis;
}

interface IConfigNumsOut {
  scope: IScopes;
  cols: ICols;
  sizes: ICols;
  breakpoints: IBreakpoints;
}

export interface IConfig
  extends Omit<IConfigUser, 'breakpoints'>,
    IConfigNumsOut {
  context: Window & typeof globalThis;
  styles: {
    [className: string]: string;
  };
  version: string;
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
    cols: 25,
  },
  md: {
    width: 900,
    cols: 31,
  },
  lg: {
    width: 1200,
    cols: 41,
  },
  xlg: {
    width: 1536,
    cols: 51,
  },
};

export let baseConfig: IConfigUser = {
  prefix: '',
  breakpoints: breakpointsInit,
  bridge: true,
  debug: true,
  searchOnInit: true,
  observer: true,
};

let config: IConfig;

const configNums = ({
  bps,
  bridge,
  scope,
  context,
}: IConfigNumsIn): IConfigNumsOut => {
  const sizes = breakpointsNums(bps, 'width');
  const finalBps = breakpointsOrdered(bps, sizes);
  return {
    sizes,
    cols: breakpointsNums(bps, 'cols'),
    scope: scopesStylesBuilder({
      breakpoints: finalBps,
      bridge,
      scope: scope,
      context,
    }),
    breakpoints: finalBps,
  };
};

export const setConfig = (
  context: Window & typeof globalThis,
  customCfg: Partial<IConfigUser> = {}
): IConfig => {
  const contextConfig = context.layouterConfig || {};

  baseConfig = {
    ...baseConfig,
    ...customCfg,
    ...contextConfig,
  };

  config = {
    context,
    ...baseConfig,
    ...configNums({
      bps: baseConfig.breakpoints,
      bridge: baseConfig.bridge,
      context,
    }),
    styles: {},
    version,
  };

  return config;
};

const getConfig = (): IConfig => {
  return config;
};

export const setStyles = (className: string, value: string) => {
  config.styles[className] = value;
};

export const updateConfig = (userConfig: Partial<IConfigUser>): IConfig => {
  config = {
    ...config,
    ...userConfig,
  };

  if (userConfig.breakpoints) {
    config = {
      ...config,
      ...configNums({
        bps: config.breakpoints,
        bridge: config.bridge,
        scope: config.scope,
        context: config.context,
      }),
    };
  }

  return config;
};

export default getConfig;
