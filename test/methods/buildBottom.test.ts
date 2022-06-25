import { setConfig } from '../../src/config/main';
import buildBottom from '../../src/methods/buildBottom';

describe('Buildings Bottom', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildBottom('40')).toEqual({
      'b-40': '.b-40{bottom:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(buildBottom('40!')).toEqual({
      'b-40!': '.b-40\\!{bottom:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(buildBottom('40%')).toEqual({
      'b-0¯40': '.b-0¯40{bottom:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(buildBottom('10 20.5@sm 30@md')).toEqual({
      'b-10': '.b-10{bottom:10px}',
      'b-20_5@sm':
        '@media screen and (min-width: 600px){.b-20_5\\@sm{bottom:20.5px}}',
      'b-30@md':
        '@media screen and (min-width: 900px){.b-30\\@md{bottom:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildBottom('10! 20.5@sm! 30@md!')).toEqual({
      'b-10!': '.b-10\\!{bottom:10px !important}',
      'b-20_5@sm!':
        '@media screen and (min-width: 600px){.b-20_5\\@sm\\!{bottom:20.5px !important}}',
      'b-30@md!':
        '@media screen and (min-width: 900px){.b-30\\@md\\!{bottom:30px !important}}',
    });
  });
});
