import { setConfig } from '../../src/config/main';
import buildPadBottom from '../../src/methods/buildPadBottom';

describe('Buildings Padding-bottom', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildPadBottom('40')).toEqual({
      'pb-40': '.pb-40{padding-bottom:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadBottom('40!')).toEqual({
      'pb-40!': '.pb-40\\!{padding-bottom:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPadBottom('10 20.5@sm 30@md')).toEqual({
      'pb-10': '.pb-10{padding-bottom:10px}',
      'pb-20_5@sm':
        '@media screen and (min-width: 600px){.pb-20_5\\@sm{padding-bottom:20.5px}}',
      'pb-30@md':
        '@media screen and (min-width: 900px){.pb-30\\@md{padding-bottom:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadBottom('10! 20.5@sm! 30@md')).toEqual({
      'pb-10!': '.pb-10\\!{padding-bottom:10px !important}',
      'pb-20_5@sm!':
        '@media screen and (min-width: 600px){.pb-20_5\\@sm\\!{padding-bottom:20.5px !important}}',
      'pb-30@md':
        '@media screen and (min-width: 900px){.pb-30\\@md{padding-bottom:30px}}',
    });
  });
});
