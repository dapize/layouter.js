import { setConfig } from '../../src/config/main';
import buildLeft from '../../src/methods/buildLeft';

describe('Buildings Bottom', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildLeft('40')).toEqual({
      'l-40': '.l-40{left:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildLeft('40!')).toEqual({
      'l-40!': '.l-40\\!{left:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildLeft('40%')).toEqual({
      'l-0¯40': '.l-0¯40{left:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildLeft('10 20.5@sm 30@md')).toEqual({
      'l-10': '.l-10{left:10px}',
      'l-20_5@sm':
        '@media screen and (min-width: 600px){.l-20_5\\@sm{left:20.5px}}',
      'l-30@md':
        '@media screen and (min-width: 900px){.l-30\\@md{left:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildLeft('10! 20.5@sm! 30@md!')).toEqual({
      'l-10!': '.l-10\\!{left:10px !important}',
      'l-20_5@sm!':
        '@media screen and (min-width: 600px){.l-20_5\\@sm\\!{left:20.5px !important}}',
      'l-30@md!':
        '@media screen and (min-width: 900px){.l-30\\@md\\!{left:30px !important}}',
    });
  });
});
