import { setConfig } from '../../src/config/main';
import buildPadX from '../../src/methods/buildPadX';

describe('Buildings padding-left and padding-right in same time (PadX)', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildPadX('40')).toEqual({
      'pl-40': '.pl-40{padding-left:40px}',
      'pr-40': '.pr-40{padding-right:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPadX('40!')).toEqual({
      'pl-40!': '.pl-40\\!{padding-left:40px !important}',
      'pr-40!': '.pr-40\\!{padding-right:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildPadX('40%')).toEqual({
      'pl-0¯40': '.pl-0¯40{padding-left:40%}',
      'pr-0¯40': '.pr-0¯40{padding-right:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPadX('10 20.5@sm 30@md')).toEqual({
      'pl-10': '.pl-10{padding-left:10px}',
      'pr-10': '.pr-10{padding-right:10px}',
      'pl-20_5@sm': '@media screen and (min-width: 600px){.pl-20_5\\@sm{padding-left:20.5px}}',
      'pr-20_5@sm': '@media screen and (min-width: 600px){.pr-20_5\\@sm{padding-right:20.5px}}',
      'pl-30@md': '@media screen and (min-width: 900px){.pl-30\\@md{padding-left:30px}}',
      'pr-30@md': '@media screen and (min-width: 900px){.pr-30\\@md{padding-right:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPadX('10! 20.5@sm! 30@md!')).toEqual({
      'pl-10!': '.pl-10\\!{padding-left:10px !important}',
      'pr-10!': '.pr-10\\!{padding-right:10px !important}',
      'pl-20_5@sm!': '@media screen and (min-width: 600px){.pl-20_5\\@sm\\!{padding-left:20.5px !important}}',
      'pr-20_5@sm!': '@media screen and (min-width: 600px){.pr-20_5\\@sm\\!{padding-right:20.5px !important}}',
      'pl-30@md!': '@media screen and (min-width: 900px){.pl-30\\@md\\!{padding-left:30px !important}}',
      'pr-30@md!': '@media screen and (min-width: 900px){.pr-30\\@md\\!{padding-right:30px !important}}',
    });
  });
});
