import { setConfig } from '../../src/config/main';
import buildMarRight from '../../src/methods/buildMarRight';

describe('Buildings Margin-right', () => {
  setConfig(window, {
    breakpoints: {
      xs: {
        width: 320,
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
    debug: false
  });

  it('simple', () => {
    expect(buildMarRight('40')).toEqual({
      'marr-40': '.marr-40{margin-right:40px}',
    });
  });

  it('simple with flag important', () => {
    expect(buildMarRight('40!')).toEqual({
      'marr-40!': '.marr-40\\!{margin-right:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarRight('10 20.5@sm 30@md')).toEqual({
      'marr-10': '.marr-10{margin-right:10px}',
      'marr-20_5@sm':
        '@media screen and (min-width: 768px){.marr-20_5\\@sm{margin-right:20.5px}}',
      'marr-30@md':
        '@media screen and (min-width: 1024px){.marr-30\\@md{margin-right:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMarRight('10! 20.5@sm 30@md!')).toEqual({
      'marr-10!': '.marr-10\\!{margin-right:10px !important}',
      'marr-20_5@sm':
        '@media screen and (min-width: 768px){.marr-20_5\\@sm{margin-right:20.5px}}',
      'marr-30@md!':
        '@media screen and (min-width: 1024px){.marr-30\\@md\\!{margin-right:30px !important}}',
    });
  });
});
