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

describe('Buildings Padding-top', () => {
  it('simple', () => {
    expect(layouter.buildPadTop('40')).toEqual({
      'padt-40': '.padt-40{padding-top:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildPadTop('40!')).toEqual({
      'padt-40!': '.padt-40\\!{padding-top:40px !important}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(layouter.buildPadTop('10! 20.5@sm 30@md!')).toEqual({
      'padt-10!': '.padt-10\\!{padding-top:10px !important}',
      'padt-20_5@sm':
        '@media screen and (min-width: 600px){.padt-20_5\\@sm{padding-top:20.5px}}',
      'padt-30@md!':
        '@media screen and (min-width: 900px){.padt-30\\@md\\!{padding-top:30px !important}}',
    });
  });
});
