import { setConfig } from '../../src/config/main';
import buildMaxWidth from '../../src/methods/buildMaxWidth';

describe('Buildings Max-width', () => {
  setConfig();

  it('simple', () => {
    expect(buildMaxWidth('100')).toEqual({
      'mxw-100': '.mxw-100{max-width:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMaxWidth('100!')).toEqual({
      'mxw-100!': '.mxw-100\\!{max-width:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMaxWidth('40rem')).toEqual({
      'mxw-40rem': '.mxw-40rem{max-width:40rem}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMaxWidth('100! 200@sm 300@md!')).toEqual({
      'mxw-100!': '.mxw-100\\!{max-width:100px !important}',
      'mxw-200@sm':
        '@media screen and (min-width: 600px){.mxw-200\\@sm{max-width:200px}}',
      'mxw-300@md!':
        '@media screen and (min-width: 900px){.mxw-300\\@md\\!{max-width:300px !important}}',
    });
  });
});
