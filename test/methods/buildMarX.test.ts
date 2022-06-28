import { setConfig } from '../../src/config/main';
import buildMarX from '../../src/methods/buildMarX';

describe('Buildings margin-left and margin-right in same time (MarX)', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMarX('40')).toEqual({
      'ml-40': '.ml-40{margin-left:40px}',
      'mr-40': '.mr-40{margin-right:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarX('40!')).toEqual({
      'ml-40!': '.ml-40\\!{margin-left:40px !important}',
      'mr-40!': '.mr-40\\!{margin-right:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMarX('40%')).toEqual({
      'ml-0¯40': '.ml-0¯40{margin-left:40%}',
      'mr-0¯40': '.mr-0¯40{margin-right:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarX('10 20.5@sm 30@md')).toEqual({
      'ml-10': '.ml-10{margin-left:10px}',
      'mr-10': '.mr-10{margin-right:10px}',
      'ml-20_5@sm': '@media screen and (min-width: 600px){.ml-20_5\\@sm{margin-left:20.5px}}',
      'mr-20_5@sm': '@media screen and (min-width: 600px){.mr-20_5\\@sm{margin-right:20.5px}}',
      'ml-30@md': '@media screen and (min-width: 900px){.ml-30\\@md{margin-left:30px}}',
      'mr-30@md': '@media screen and (min-width: 900px){.mr-30\\@md{margin-right:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMarX('10! 20.5@sm! 30@md!')).toEqual({
      'ml-10!': '.ml-10\\!{margin-left:10px !important}',
      'mr-10!': '.mr-10\\!{margin-right:10px !important}',
      'ml-20_5@sm!': '@media screen and (min-width: 600px){.ml-20_5\\@sm\\!{margin-left:20.5px !important}}',
      'mr-20_5@sm!': '@media screen and (min-width: 600px){.mr-20_5\\@sm\\!{margin-right:20.5px !important}}',
      'ml-30@md!': '@media screen and (min-width: 900px){.ml-30\\@md\\!{margin-left:30px !important}}',
      'mr-30@md!': '@media screen and (min-width: 900px){.mr-30\\@md\\!{margin-right:30px !important}}',
    });
  });
});
