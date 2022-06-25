import { setConfig } from '../../src/config/main';
import buildMinHeight from '../../src/methods/buildMinHeight';

describe('Buildings Min-height', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMinHeight('100')).toEqual({
      'mih-100': '.mih-100{min-height:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMinHeight('100!')).toEqual({
      'mih-100!': '.mih-100\\!{min-height:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMinHeight('100ex')).toEqual({
      'mih-100ex': '.mih-100ex{min-height:100ex}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMinHeight('100! 200@sm 300@md!')).toEqual({
      'mih-100!': '.mih-100\\!{min-height:100px !important}',
      'mih-200@sm':
        '@media screen and (min-width: 600px){.mih-200\\@sm{min-height:200px}}',
      'mih-300@md!':
        '@media screen and (min-width: 900px){.mih-300\\@md\\!{min-height:300px !important}}',
    });
  });
});
