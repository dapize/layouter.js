import { setConfig } from '../../src/config/main';
import buildMarLeft from '../../src/methods/buildMarLeft';

describe('Buildings Margin Left', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMarLeft('40')).toEqual({
      'marl-40': '.marl-40{margin-left:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarLeft('40!')).toEqual({
      'marl-40!': '.marl-40\\!{margin-left:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarLeft('10 20.5@sm 30@md')).toEqual({
      'marl-10': '.marl-10{margin-left:10px}',
      'marl-20_5@sm':
        '@media screen and (min-width: 600px){.marl-20_5\\@sm{margin-left:20.5px}}',
      'marl-30@md':
        '@media screen and (min-width: 900px){.marl-30\\@md{margin-left:30px}}',
    });
  });

  it('With breakpoints and Important Flag', () => {
    expect(buildMarLeft('10 20.5@sm! 30@md!')).toEqual({
      'marl-10': '.marl-10{margin-left:10px}',
      'marl-20_5@sm!':
        '@media screen and (min-width: 600px){.marl-20_5\\@sm\\!{margin-left:20.5px !important}}',
      'marl-30@md!':
        '@media screen and (min-width: 900px){.marl-30\\@md\\!{margin-left:30px !important}}',
    });
  });
});
