import { setConfig } from '../../src/config/main';
import buildDisplay from '../../src/methods/buildDisplay';

describe('Buildings Position', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildDisplay('bl')).toEqual({
      'd-bl': '.d-bl{display:block}',
    });
    expect(buildDisplay('il')).toEqual({
      'd-il': '.d-il{display:inline}',
    });
    expect(buildDisplay('ib')).toEqual({
      'd-ib': '.d-ib{display:inline-block}',
    });
    expect(buildDisplay('fx')).toEqual({
      'd-fx': '.d-fx{display:flex}',
    });
    expect(buildDisplay('if')).toEqual({
      'd-if': '.d-if{display:inline-flex}',
    });
    expect(buildDisplay('no')).toEqual({
      'd-no': '.d-no{display:none}',
    });
    expect(buildDisplay('in')).toEqual({
      'd-in': '.d-in{display:initial}',
    });
    expect(buildDisplay('bl@sm')).toEqual({
      'd-bl@sm': '@media screen and (min-width: 600px){.d-bl\\@sm{display:block}}',
    });
  });

  it('With invalid alias', () => {
    const buildInvalid = buildDisplay('test');
    expect(buildInvalid).toBeInstanceOf(Error);
  })

  it('simple with important flag', () => {
    expect(buildDisplay('bl!')).toEqual({
      'd-bl!': '.d-bl\\!{display:block !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildDisplay('bl il@sm ib@md')).toEqual({
      'd-bl': '.d-bl{display:block}',
      'd-il@sm':
        '@media screen and (min-width: 600px){.d-il\\@sm{display:inline}}',
      'd-ib@md':
        '@media screen and (min-width: 900px){.d-ib\\@md{display:inline-block}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildDisplay('bl! il@sm! ib@md!')).toEqual({
      'd-bl!': '.d-bl\\!{display:block !important}',
      'd-il@sm!':
        '@media screen and (min-width: 600px){.d-il\\@sm\\!{display:inline !important}}',
      'd-ib@md!':
        '@media screen and (min-width: 900px){.d-ib\\@md\\!{display:inline-block !important}}',
    });
  });

});
