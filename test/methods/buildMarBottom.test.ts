import { setConfig } from '../../src/config/main';
import buildMarBottom from '../../src/methods/buildMarBottom';

describe('Buildings margin-bottom', () => {
  setConfig();

  it('simple', () => {
    expect(buildMarBottom('40')).toEqual({
      'marb-40': '.marb-40{margin-bottom:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMarBottom('40!')).toEqual({
      'marb-40!': '.marb-40\\!{margin-bottom:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMarBottom('10 20.5@sm 30@md')).toEqual({
      'marb-10': '.marb-10{margin-bottom:10px}',
      'marb-20_5@sm':
        '@media screen and (min-width: 600px){.marb-20_5\\@sm{margin-bottom:20.5px}}',
      'marb-30@md':
        '@media screen and (min-width: 900px){.marb-30\\@md{margin-bottom:30px}}',
    });
  });

  it('With breakpoints and Important Flag', () => {
    expect(buildMarBottom('10! 20.5@sm! 30@md')).toEqual({
      'marb-10!': '.marb-10\\!{margin-bottom:10px !important}',
      'marb-20_5@sm!':
        '@media screen and (min-width: 600px){.marb-20_5\\@sm\\!{margin-bottom:20.5px !important}}',
      'marb-30@md':
        '@media screen and (min-width: 900px){.marb-30\\@md{margin-bottom:30px}}',
    });
  });
});
