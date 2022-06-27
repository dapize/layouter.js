import { setConfig } from '../../src/config/main';
import buildWidth from '../../src/methods/buildWidth';

describe('Buildings width', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildWidth('100')).toEqual({
      'w-100': '.w-100{width:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildWidth('100!')).toEqual({
      'w-100!': '.w-100\\!{width:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildWidth('40vw')).toEqual({
      'w-40vw': '.w-40vw{width:40vw}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildWidth('100! 200@sm 300@md!')).toEqual({
      'w-100!': '.w-100\\!{width:100px !important}',
      'w-200@sm':
        '@media screen and (min-width: 600px){.w-200\\@sm{width:200px}}',
      'w-300@md!':
        '@media screen and (min-width: 900px){.w-300\\@md\\!{width:300px !important}}',
    });
  });
});
