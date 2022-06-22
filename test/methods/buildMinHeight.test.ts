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

describe('Buildings Min-height', () => {
  it('simple', () => {
    expect(layouter.buildMinHeight('100')).toEqual({
      'mih-100': '.mih-100{min-height:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildMinHeight('100!')).toEqual({
      'mih-100!': '.mih-100\\!{min-height:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(layouter.buildMinHeight('100ex')).toEqual({
      'mih-100ex': '.mih-100ex{min-height:100ex}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(layouter.buildMinHeight('100! 200@sm 300@md!')).toEqual({
      'mih-100!': '.mih-100\\!{min-height:100px !important}',
      'mih-200@sm':
        '@media screen and (min-width: 600px){.mih-200\\@sm{min-height:200px}}',
      'mih-300@md!':
        '@media screen and (min-width: 900px){.mih-300\\@md\\!{min-height:300px !important}}',
    });
  });
});
