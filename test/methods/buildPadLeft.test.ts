import layouter from '../../src/';
window.layouterConfig = {
  breakpoints: {
    xs: {
      width: 320,
      cols: 15,
    },
    sm: {
      width: 768,
      cols: 31,
    },
    md: {
      width: 1024,
      cols: 31,
    },
  },
};

describe('Buildings Padding-bottom', () => {
  it('simple', () => {
    expect(layouter.buildPadLeft('40')).toEqual({
      'padl-40': '.padl-40{padding-left:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildPadLeft('40!')).toEqual({
      'padl-40!': '.padl-40\\!{padding-left:40px !important}',
    });
  });

  it('With breakpoints', () => {
    expect(layouter.buildPadLeft('10 20.5@sm 30@md')).toEqual({
      'padl-10': '.padl-10{padding-left:10px}',
      'padl-20_5@sm':
        '@media screen and (min-width: 600px){.padl-20_5\\@sm{padding-left:20.5px}}',
      'padl-30@md':
        '@media screen and (min-width: 900px){.padl-30\\@md{padding-left:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(layouter.buildPadLeft('10! 20.5@sm 30@md!')).toEqual({
      'padl-10!': '.padl-10\\!{padding-left:10px !important}',
      'padl-20_5@sm':
        '@media screen and (min-width: 600px){.padl-20_5\\@sm{padding-left:20.5px}}',
      'padl-30@md!':
        '@media screen and (min-width: 900px){.padl-30\\@md\\!{padding-left:30px !important}}',
    });
  });
});
