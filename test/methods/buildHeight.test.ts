import { setConfig } from '../../src/config/main';
import buildHeight from '../../src/methods/buildHeight';

describe('Buildings width', () => {
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
    debug: false,
  });

  it('simple', () => {
    expect(buildHeight('100')).toEqual({
      'h-100': '.h-100{height:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildHeight('100!')).toEqual({
      'h-100!': '.h-100\\!{height:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildHeight('40vw')).toEqual({
      'h-40vw': '.h-40vw{height:40vw}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildHeight('100! 200@sm 300@md!')).toEqual({
      'h-100!': '.h-100\\!{height:100px !important}',
      'h-200@sm':
        '@media screen and (min-width: 768px){.h-200\\@sm{height:200px}}',
      'h-300@md!':
        '@media screen and (min-width: 1024px){.h-300\\@md\\!{height:300px !important}}',
    });
  });
});
