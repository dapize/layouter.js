import { setConfig } from '../../src/config/main';
import buildMarTop from '../../src/methods/buildMarTop';

describe('Buildings margin-top', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMarTop('40')).toEqual({
      'mt-40': '.mt-40{margin-top:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarTop('40!')).toEqual({
      'mt-40!': '.mt-40\\!{margin-top:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMarTop('40%')).toEqual({
      'mt-0¯40': '.mt-0¯40{margin-top:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarTop('10 20.5@sm 30@md')).toEqual({
      'mt-10': '.mt-10{margin-top:10px}',
      'mt-20_5@sm':
        '@media screen and (min-width: 600px){.mt-20_5\\@sm{margin-top:20.5px}}',
      'mt-30@md':
        '@media screen and (min-width: 900px){.mt-30\\@md{margin-top:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMarTop('10! 20.5@sm! 30@md!')).toEqual({
      'mt-10!': '.mt-10\\!{margin-top:10px !important}',
      'mt-20_5@sm!':
        '@media screen and (min-width: 600px){.mt-20_5\\@sm\\!{margin-top:20.5px !important}}',
      'mt-30@md!':
        '@media screen and (min-width: 900px){.mt-30\\@md\\!{margin-top:30px !important}}',
    });
  });
});
