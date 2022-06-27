import { setConfig } from '../../src/config/main';
import buildMarBottom from '../../src/methods/buildMarBottom';

describe('Buildings margin-bottom', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMarBottom('40')).toEqual({
      'mb-40': '.mb-40{margin-bottom:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarBottom('40!')).toEqual({
      'mb-40!': '.mb-40\\!{margin-bottom:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarBottom('10 20.5@sm 30@md')).toEqual({
      'mb-10': '.mb-10{margin-bottom:10px}',
      'mb-20_5@sm':
        '@media screen and (min-width: 600px){.mb-20_5\\@sm{margin-bottom:20.5px}}',
      'mb-30@md':
        '@media screen and (min-width: 900px){.mb-30\\@md{margin-bottom:30px}}',
    });
  });

  it('With breakpoints and Important Flag', () => {
    expect(buildMarBottom('10! 20.5@sm! 30@md')).toEqual({
      'mb-10!': '.mb-10\\!{margin-bottom:10px !important}',
      'mb-20_5@sm!':
        '@media screen and (min-width: 600px){.mb-20_5\\@sm\\!{margin-bottom:20.5px !important}}',
      'mb-30@md':
        '@media screen and (min-width: 900px){.mb-30\\@md{margin-bottom:30px}}',
    });
  });
});
