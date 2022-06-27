import { setConfig } from '../../src/config/main';
import buildPad from '../../src/methods/buildPad';

describe('Buildings Paddings', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildPad('40-0')).toEqual({
      'p-40-0': '.p-40-0{padding:40px 0}',
    });
  });

  it('simple with important flag', () => {
    expect(buildPad('40-0!')).toEqual({
      'p-40-0!': '.p-40-0\\!{padding:40px 0 !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPad('10-1/15 20.5-3/31@sm 30-2/31@md')).toEqual({
      'p-10-1/15': '.p-10-1\\/15{padding:10px 6.667%}',
      'p-20_5-3/31@sm':
        '@media screen and (min-width: 600px){.p-20_5-3\\/31\\@sm{padding:20.5px 9.677%}}',
      'p-30-2/31@md':
        '@media screen and (min-width: 900px){.p-30-2\\/31\\@md{padding:30px 6.452%}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPad('10-1/15! 20.5-3/31@sm! 30-2/31@md')).toEqual({
      'p-10-1/15!': '.p-10-1\\/15\\!{padding:10px 6.667% !important}',
      'p-20_5-3/31@sm!':
        '@media screen and (min-width: 600px){.p-20_5-3\\/31\\@sm\\!{padding:20.5px 9.677% !important}}',
      'p-30-2/31@md':
        '@media screen and (min-width: 900px){.p-30-2\\/31\\@md{padding:30px 6.452%}}',
    });
  });
});
