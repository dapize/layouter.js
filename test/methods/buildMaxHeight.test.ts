import { setConfig } from '../../src/config/main';
import buildMaxHeight from '../../src/methods/buildMaxHeight';

describe('Buildings Max-height', () => {
  setConfig();

  it('simple', () => {
    expect(buildMaxHeight('100')).toEqual({
      'mxh-100': '.mxh-100{max-height:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMaxHeight('100!')).toEqual({
      'mxh-100!': '.mxh-100\\!{max-height:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMaxHeight('100vh!')).toEqual({
      'mxh-100vh!': '.mxh-100vh\\!{max-height:100vh !important}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMaxHeight('100! 200@sm 300@md!')).toEqual({
      'mxh-100!': '.mxh-100\\!{max-height:100px !important}',
      'mxh-200@sm':
        '@media screen and (min-width: 600px){.mxh-200\\@sm{max-height:200px}}',
      'mxh-300@md!':
        '@media screen and (min-width: 900px){.mxh-300\\@md\\!{max-height:300px !important}}',
    });
  });
});
