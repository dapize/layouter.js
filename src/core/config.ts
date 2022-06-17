import { IConfig } from './config.d';

export const config = (): IConfig => {
  let obj: IConfig = {
    init: false,
    prefix: '',
    breakpoints: {
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
    },
    bridge: true,
  };
  if (window && window.layouter) {
    obj = {
      ...obj,
      ...window.layouter,
    };
  }
  return obj;
};
