let lib = require('../dist/layouter');
const Layouter = new lib({
  breakPoints: {
    xs: {
      width: 320,
      cols: 15,
      direct: true
    },
    sm: {
      width: 768,
      cols: 31
    },
    md: {
      width: 1024,
      cols: 31
    }
  }
});

describe('Buildings Min-height', () => {
  it('simple', () => {
    expect(Layouter.buildMinHeight('100')).toEqual({
      "mih-100": ".mih-100{min-height:100px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildMinHeight('100!')).toEqual({
      "mih-100!": ".mih-100\\!{min-height:100px !important}"
    });
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildMinHeight('100! 200@sm 300@md!')).toEqual({
      "mih-100!": ".mih-100\\!{min-height:100px !important}",
      "mih-200@sm": "@media screen and (min-width: 768px){.mih-200\\@sm{min-height:200px}}",
      "mih-300@md!": "@media screen and (min-width: 1024px){.mih-300\\@md\\!{min-height:300px !important}}"
    })
  });
});