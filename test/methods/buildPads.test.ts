import { setConfig } from '../../src/config/main';
import buildPads from '../../src/methods/buildPads';

describe('Buildings Paddings', () => {
  setConfig();

  it('simple', () => {
    expect(buildPads('40-0')).toEqual({
      'pad-40-0': '.pad-40-0{padding:40px 0}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPads('40-0!')).toEqual({
      'pad-40-0!': '.pad-40-0\\!{padding:40px 0 !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPads('10-1/15 20.5-3/31@sm 30-2/31@md')).toEqual({
      'pad-10-1/15': '.pad-10-1\\/15{padding:10px 6.667%}',
      'pad-20_5-3/31@sm':
        '@media screen and (min-width: 600px){.pad-20_5-3\\/31\\@sm{padding:20.5px 9.677%}}',
      'pad-30-2/31@md':
        '@media screen and (min-width: 900px){.pad-30-2\\/31\\@md{padding:30px 6.452%}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPads('10-1/15! 20.5-3/31@sm! 30-2/31@md')).toEqual({
      'pad-10-1/15!': '.pad-10-1\\/15\\!{padding:10px 6.667% !important}',
      'pad-20_5-3/31@sm!':
        '@media screen and (min-width: 600px){.pad-20_5-3\\/31\\@sm\\!{padding:20.5px 9.677% !important}}',
      'pad-30-2/31@md':
        '@media screen and (min-width: 900px){.pad-30-2\\/31\\@md{padding:30px 6.452%}}',
    });
  });
});
