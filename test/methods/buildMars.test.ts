import { setConfig } from '../../src/config/main';
import buildMar from '../../src/methods/buildMar';

describe('Buildings Margins', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildMar('40-0')).toEqual({
      'm-40-0': '.m-40-0{margin:40px 0}',
    });
  });

  it('simple with important flag', () => {
    expect(buildMar('40-0!')).toEqual({
      'm-40-0!': '.m-40-0\\!{margin:40px 0 !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildMar('40%-0!')).toEqual({
      'm-0¯40-0!': '.m-0¯40-0\\!{margin:40% 0 !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildMar('10-1/15 20.5-3/31@sm 30-2/31@md')).toEqual({
      'm-10-1/15': '.m-10-1\\/15{margin:10px 6.667%}',
      'm-20_5-3/31@sm':
        '@media screen and (min-width: 600px){.m-20_5-3\\/31\\@sm{margin:20.5px 9.677%}}',
      'm-30-2/31@md':
        '@media screen and (min-width: 900px){.m-30-2\\/31\\@md{margin:30px 6.452%}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildMar('10-1/15! 20.5-3/31@sm 30-2/31@md!')).toEqual({
      'm-10-1/15!': '.m-10-1\\/15\\!{margin:10px 6.667% !important}',
      'm-20_5-3/31@sm':
        '@media screen and (min-width: 600px){.m-20_5-3\\/31\\@sm{margin:20.5px 9.677%}}',
      'm-30-2/31@md!':
        '@media screen and (min-width: 900px){.m-30-2\\/31\\@md\\!{margin:30px 6.452% !important}}',
    });
  });
});
