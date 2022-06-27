import { setConfig } from '../../src/config/main';
import buildMarLeft from '../../src/methods/buildMarLeft';

describe('Buildings Margin Left', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMarLeft('40')).toEqual({
      'ml-40': '.ml-40{margin-left:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarLeft('40!')).toEqual({
      'ml-40!': '.ml-40\\!{margin-left:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarLeft('10 20.5@sm 30@md')).toEqual({
      'ml-10': '.ml-10{margin-left:10px}',
      'ml-20_5@sm':
        '@media screen and (min-width: 600px){.ml-20_5\\@sm{margin-left:20.5px}}',
      'ml-30@md':
        '@media screen and (min-width: 900px){.ml-30\\@md{margin-left:30px}}',
    });
  });

  it('With breakpoints and Important Flag', () => {
    expect(buildMarLeft('10 20.5@sm! 30@md!')).toEqual({
      'ml-10': '.ml-10{margin-left:10px}',
      'ml-20_5@sm!':
        '@media screen and (min-width: 600px){.ml-20_5\\@sm\\!{margin-left:20.5px !important}}',
      'ml-30@md!':
        '@media screen and (min-width: 900px){.ml-30\\@md\\!{margin-left:30px !important}}',
    });
  });
});
