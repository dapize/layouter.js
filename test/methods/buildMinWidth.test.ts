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

describe('Buildings Min-width', () => {
  it('simple', () => {
    expect(layouter.buildMinWidth('100')).toEqual({
      'miw-100': '.miw-100{min-width:100px}',
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildMinWidth('100!')).toEqual({
      'miw-100!': '.miw-100\\!{min-width:100px !important}',
    });
  });

  it('simple with units relative', () => {
    expect(layouter.buildMinWidth('40vw')).toEqual({
      'miw-40vw': '.miw-40vw{min-width:40vw}',
    });
  });

  it('With breakpoints and important flag', () => {
    expect(layouter.buildMinWidth('100! 200@sm 300@md!')).toEqual({
      'miw-100!': '.miw-100\\!{min-width:100px !important}',
      'miw-200@sm':
        '@media screen and (min-width: 600px){.miw-200\\@sm{min-width:200px}}',
      'miw-300@md!':
        '@media screen and (min-width: 900px){.miw-300\\@md\\!{min-width:300px !important}}',
    });
  });
});
