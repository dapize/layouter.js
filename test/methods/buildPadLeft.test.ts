import { setConfig } from '../../src/config/main';
import buildPadLeft from '../../src/methods/buildPadLeft';

describe('Buildings Padding-bottom', () => {
  setConfig();

  it('simple', () => {
    expect(buildPadLeft('40')).toEqual({
      'padl-40': '.padl-40{padding-left:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadLeft('40!')).toEqual({
      'padl-40!': '.padl-40\\!{padding-left:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPadLeft('10 20.5@sm 30@md')).toEqual({
      'padl-10': '.padl-10{padding-left:10px}',
      'padl-20_5@sm':
        '@media screen and (min-width: 600px){.padl-20_5\\@sm{padding-left:20.5px}}',
      'padl-30@md':
        '@media screen and (min-width: 900px){.padl-30\\@md{padding-left:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadLeft('10! 20.5@sm 30@md!')).toEqual({
      'padl-10!': '.padl-10\\!{padding-left:10px !important}',
      'padl-20_5@sm':
        '@media screen and (min-width: 600px){.padl-20_5\\@sm{padding-left:20.5px}}',
      'padl-30@md!':
        '@media screen and (min-width: 900px){.padl-30\\@md\\!{padding-left:30px !important}}',
    });
  });
});
