import { setConfig } from '../../src/config/main';
import buildMar from '../../src/methods/buildMar';

describe('Buildings Margins', () => {
  setConfig();

  it('simple', () => {
    expect(buildMar('40-0')).toEqual({
      'mar-40-0': '.mar-40-0{margin:40px 0}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMar('40-0!')).toEqual({
      'mar-40-0!': '.mar-40-0\\!{margin:40px 0 !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMar('40%-0!')).toEqual({
      'mar-0¯40-0!': '.mar-0¯40-0\\!{margin:40% 0 !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMar('10-1/15 20.5-3/31@sm 30-2/31@md')).toEqual({
      'mar-10-1/15': '.mar-10-1\\/15{margin:10px 6.667%}',
      'mar-20_5-3/31@sm':
        '@media screen and (min-width: 600px){.mar-20_5-3\\/31\\@sm{margin:20.5px 9.677%}}',
      'mar-30-2/31@md':
        '@media screen and (min-width: 900px){.mar-30-2\\/31\\@md{margin:30px 6.452%}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMar('10-1/15! 20.5-3/31@sm 30-2/31@md!')).toEqual({
      'mar-10-1/15!': '.mar-10-1\\/15\\!{margin:10px 6.667% !important}',
      'mar-20_5-3/31@sm':
        '@media screen and (min-width: 600px){.mar-20_5-3\\/31\\@sm{margin:20.5px 9.677%}}',
      'mar-30-2/31@md!':
        '@media screen and (min-width: 900px){.mar-30-2\\/31\\@md\\!{margin:30px 6.452% !important}}',
    });
  });
});
