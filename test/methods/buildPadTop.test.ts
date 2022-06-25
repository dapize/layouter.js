import { setConfig } from '../../src/config/main';
import buildPadTop from '../../src/methods/buildPadTop';

describe('Buildings Padding-top', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildPadTop('40')).toEqual({
      'padt-40': '.padt-40{padding-top:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadTop('40!')).toEqual({
      'padt-40!': '.padt-40\\!{padding-top:40px !important}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadTop('10! 20.5@sm 30@md!')).toEqual({
      'padt-10!': '.padt-10\\!{padding-top:10px !important}',
      'padt-20_5@sm':
        '@media screen and (min-width: 600px){.padt-20_5\\@sm{padding-top:20.5px}}',
      'padt-30@md!':
        '@media screen and (min-width: 900px){.padt-30\\@md\\!{padding-top:30px !important}}',
    });
  });
});
