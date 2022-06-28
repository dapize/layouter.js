import { setConfig } from '../../src/config/main';
import buildMarY from '../../src/methods/buildMarY';

describe('Buildings margin-top and margin-bottom in same time (MarY)', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMarY('40')).toEqual({
      'mt-40': '.mt-40{margin-top:40px}',
      'mb-40': '.mb-40{margin-bottom:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarY('40!')).toEqual({
      'mt-40!': '.mt-40\\!{margin-top:40px !important}',
      'mb-40!': '.mb-40\\!{margin-bottom:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMarY('40%')).toEqual({
      'mt-0¯40': '.mt-0¯40{margin-top:40%}',
      'mb-0¯40': '.mb-0¯40{margin-bottom:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarY('10 20.5@sm 30@md')).toEqual({
      'mt-10': '.mt-10{margin-top:10px}',
      'mb-10': '.mb-10{margin-bottom:10px}',
      'mt-20_5@sm': '@media screen and (min-width: 600px){.mt-20_5\\@sm{margin-top:20.5px}}',
      'mb-20_5@sm': '@media screen and (min-width: 600px){.mb-20_5\\@sm{margin-bottom:20.5px}}',
      'mt-30@md': '@media screen and (min-width: 900px){.mt-30\\@md{margin-top:30px}}',
      'mb-30@md': '@media screen and (min-width: 900px){.mb-30\\@md{margin-bottom:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMarY('10! 20.5@sm! 30@md!')).toEqual({
      'mt-10!': '.mt-10\\!{margin-top:10px !important}',
      'mb-10!': '.mb-10\\!{margin-bottom:10px !important}',
      'mt-20_5@sm!': '@media screen and (min-width: 600px){.mt-20_5\\@sm\\!{margin-top:20.5px !important}}',
      'mb-20_5@sm!': '@media screen and (min-width: 600px){.mb-20_5\\@sm\\!{margin-bottom:20.5px !important}}',
      'mt-30@md!': '@media screen and (min-width: 900px){.mt-30\\@md\\!{margin-top:30px !important}}',
      'mb-30@md!': '@media screen and (min-width: 900px){.mb-30\\@md\\!{margin-bottom:30px !important}}',
    });
  });
});
