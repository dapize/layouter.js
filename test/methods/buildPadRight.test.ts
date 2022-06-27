import { setConfig } from '../../src/config/main';
import buildPadRight from '../../src/methods/buildPadRight';

describe('Buildings Padding-right', () => {
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
    debug:false,
  });

  it('simple', () => {
    expect(buildPadRight('40')).toEqual({
      'pr-40': '.pr-40{padding-right:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadRight('40!')).toEqual({
      'pr-40!': '.pr-40\\!{padding-right:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPadRight('10 20.5@sm 30@md')).toEqual({
      'pr-10': '.pr-10{padding-right:10px}',
      'pr-20_5@sm':
        '@media screen and (min-width: 768px){.pr-20_5\\@sm{padding-right:20.5px}}',
      'pr-30@md':
        '@media screen and (min-width: 1024px){.pr-30\\@md{padding-right:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadRight('10! 20.5@sm! 30@md!')).toEqual({
      'pr-10!': '.pr-10\\!{padding-right:10px !important}',
      'pr-20_5@sm!':
        '@media screen and (min-width: 768px){.pr-20_5\\@sm\\!{padding-right:20.5px !important}}',
      'pr-30@md!':
        '@media screen and (min-width: 1024px){.pr-30\\@md\\!{padding-right:30px !important}}',
    });
  });
});
