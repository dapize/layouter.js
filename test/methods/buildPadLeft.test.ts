import { setConfig } from '../../src/config/main';
import buildPadLeft from '../../src/methods/buildPadLeft';

describe('Buildings Padding-bottom', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildPadLeft('40')).toEqual({
      'pl-40': '.pl-40{padding-left:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadLeft('40!')).toEqual({
      'pl-40!': '.pl-40\\!{padding-left:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPadLeft('10 20.5@sm 30@md')).toEqual({
      'pl-10': '.pl-10{padding-left:10px}',
      'pl-20_5@sm':
        '@media screen and (min-width: 600px){.pl-20_5\\@sm{padding-left:20.5px}}',
      'pl-30@md':
        '@media screen and (min-width: 900px){.pl-30\\@md{padding-left:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadLeft('10! 20.5@sm 30@md!')).toEqual({
      'pl-10!': '.pl-10\\!{padding-left:10px !important}',
      'pl-20_5@sm':
        '@media screen and (min-width: 600px){.pl-20_5\\@sm{padding-left:20.5px}}',
      'pl-30@md!':
        '@media screen and (min-width: 900px){.pl-30\\@md\\!{padding-left:30px !important}}',
    });
  });
});
