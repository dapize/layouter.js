import { setConfig } from '../../src/config/main';
import buildRight from '../../src/methods/buildRight';

describe('Buildings Right', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildRight('40')).toEqual({
      'r-40': '.r-40{right:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildRight('40!')).toEqual({
      'r-40!': '.r-40\\!{right:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildRight('40%')).toEqual({
      'r-0¯40': '.r-0¯40{right:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildRight('10 20.5@sm 30@md')).toEqual({
      'r-10': '.r-10{right:10px}',
      'r-20_5@sm':
        '@media screen and (min-width: 600px){.r-20_5\\@sm{right:20.5px}}',
      'r-30@md':
        '@media screen and (min-width: 900px){.r-30\\@md{right:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildRight('10! 20.5@sm! 30@md!')).toEqual({
      'r-10!': '.r-10\\!{right:10px !important}',
      'r-20_5@sm!':
        '@media screen and (min-width: 600px){.r-20_5\\@sm\\!{right:20.5px !important}}',
      'r-30@md!':
        '@media screen and (min-width: 900px){.r-30\\@md\\!{right:30px !important}}',
    });
  });
});
