import { setConfig } from '../../src/config/main';
import buildTop from '../../src/methods/buildTop';

describe('Buildings top', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildTop('40')).toEqual({
      't-40': '.t-40{top:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildTop('40!')).toEqual({
      't-40!': '.t-40\\!{top:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildTop('40%')).toEqual({
      't-0¯40': '.t-0¯40{top:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildTop('10 20.5@sm 30@md')).toEqual({
      't-10': '.t-10{top:10px}',
      't-20_5@sm':
        '@media screen and (min-width: 600px){.t-20_5\\@sm{top:20.5px}}',
      't-30@md':
        '@media screen and (min-width: 900px){.t-30\\@md{top:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildTop('10! 20.5@sm! 30@md!')).toEqual({
      't-10!': '.t-10\\!{top:10px !important}',
      't-20_5@sm!':
        '@media screen and (min-width: 600px){.t-20_5\\@sm\\!{top:20.5px !important}}',
      't-30@md!':
        '@media screen and (min-width: 900px){.t-30\\@md\\!{top:30px !important}}',
    });
  });
});
