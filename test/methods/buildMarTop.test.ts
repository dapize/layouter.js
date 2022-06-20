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

describe('Buildings margin-top', () => {
  it('simple', () => {
    expect(layouter.buildMarTop('40')).toEqual({
      'mart-40': '.mart-40{margin-top:40px}',
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildMarTop('40!')).toEqual({
      'mart-40!': '.mart-40\\!{margin-top:40px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(layouter.buildMarTop('40%')).toEqual({
      'mart-0¯40': '.mart-0¯40{margin-top:40%}',
    });
  });

  it('With breakpoints', () => {
    expect(layouter.buildMarTop('10 20.5@sm 30@md')).toEqual({
      'mart-10': '.mart-10{margin-top:10px}',
      'mart-20_5@sm':
        '@media screen and (min-width: 768px){.mart-20_5\\@sm{margin-top:20.5px}}',
      'mart-30@md':
        '@media screen and (min-width: 1024px){.mart-30\\@md{margin-top:30px}}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(layouter.buildMarTop('10! 20.5@sm! 30@md!')).toEqual({
      'mart-10!': '.mart-10\\!{margin-top:10px !important}',
      'mart-20_5@sm!':
        '@media screen and (min-width: 768px){.mart-20_5\\@sm\\!{margin-top:20.5px !important}}',
      'mart-30@md!':
        '@media screen and (min-width: 1024px){.mart-30\\@md\\!{margin-top:30px !important}}',
    });
  });
});
