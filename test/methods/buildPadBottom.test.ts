import { setConfig } from '../../src/config/main';
import buildPadBottom from '../../src/methods/buildPadBottom';

describe('Buildings Padding-bottom', () => {
  setConfig();

  it('simple', () => {
    expect(buildPadBottom('40')).toEqual({
      'padb-40': '.padb-40{padding-bottom:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadBottom('40!')).toEqual({
      'padb-40!': '.padb-40\\!{padding-bottom:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPadBottom('10 20.5@sm 30@md')).toEqual({
      'padb-10': '.padb-10{padding-bottom:10px}',
      'padb-20_5@sm':
        '@media screen and (min-width: 600px){.padb-20_5\\@sm{padding-bottom:20.5px}}',
      'padb-30@md':
        '@media screen and (min-width: 900px){.padb-30\\@md{padding-bottom:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadBottom('10! 20.5@sm! 30@md')).toEqual({
      'padb-10!': '.padb-10\\!{padding-bottom:10px !important}',
      'padb-20_5@sm!':
        '@media screen and (min-width: 600px){.padb-20_5\\@sm\\!{padding-bottom:20.5px !important}}',
      'padb-30@md':
        '@media screen and (min-width: 900px){.padb-30\\@md{padding-bottom:30px}}',
    });
  });
});
