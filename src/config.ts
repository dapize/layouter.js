import { IBreakpoints } from './index';

export interface IConfig {
  prefix?: string;
  breakpoints: IBreakpoints;
  bridge?: boolean;
  ready?: () => void;
}

declare global {
  interface Window {
    layouter: {
      config: IConfig
    }
  }
}

const init: IConfig = {
  prefix: '',
  breakpoints: {
    xs: {
      width: 360,
      cols: 15
    },
    sm: {
      width: 768,
      cols: 31
    },
    md: {
      width: 1024,
      cols: 31
    }
  },
  bridge: false
};

const config = (): IConfig => {
  let obj = init;
  if ( window && window.layouter ) {
    obj = {
      ...obj,
      ...window.layouter
    }
  }
  return obj
}

export default config;