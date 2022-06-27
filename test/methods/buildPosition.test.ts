import { setConfig } from '../../src/config/main';
import buildPosition from '../../src/methods/buildPosition';

describe('Buildings Position', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildPosition('st')).toEqual({
      'pos-st': '.pos-st{position:static}',
    });
    expect(buildPosition('re')).toEqual({
      'pos-re': '.pos-re{position:relative}',
    });
    expect(buildPosition('ab')).toEqual({
      'pos-ab': '.pos-ab{position:absolute}',
    });
    expect(buildPosition('fi')).toEqual({
      'pos-fi': '.pos-fi{position:fixed}',
    });
    expect(buildPosition('si')).toEqual({
      'pos-si': '.pos-si{position:sticky}',
    });
    expect(buildPosition('in')).toEqual({
      'pos-in': '.pos-in{position:initial}',
    });
    expect(buildPosition('ih')).toEqual({
      'pos-ih': '.pos-ih{position:inherit}',
    });
    expect(buildPosition('ih@sm')).toEqual({
      'pos-ih@sm': '@media screen and (min-width: 600px){.pos-ih\\@sm{position:inherit}}',
    });
  });

  it('With invalid alias', () => {
    const buildInvalid = buildPosition('test');
    expect(buildInvalid).toBeInstanceOf(Error);
  })

  it('simple with important flag', () => {
    expect(buildPosition('re!')).toEqual({
      'pos-re!': '.pos-re\\!{position:relative !important}',
    });
  });

  it('With breakpoints', () => {
    expect(buildPosition('re ab@sm st@md')).toEqual({
      'pos-re': '.pos-re{position:relative}',
      'pos-ab@sm':
        '@media screen and (min-width: 600px){.pos-ab\\@sm{position:absolute}}',
      'pos-st@md':
        '@media screen and (min-width: 900px){.pos-st\\@md{position:static}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(buildPosition('re! ab@sm! st@md!')).toEqual({
      'pos-re!': '.pos-re\\!{position:relative !important}',
      'pos-ab@sm!':
        '@media screen and (min-width: 600px){.pos-ab\\@sm\\!{position:absolute !important}}',
      'pos-st@md!':
        '@media screen and (min-width: 900px){.pos-st\\@md\\!{position:static !important}}',
    });
  });

});
