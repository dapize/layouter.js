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

describe('Buildings Max-height', () => {
  it('simple', () => {
    expect(Layouter.buildMaxHeight('100')).toEqual({
      "mxh-100": ".mxh-100{max-height:100px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildMaxHeight('100!')).toEqual({
      "mxh-100!": ".mxh-100\\!{max-height:100px !important}"
    });
  });

  it('simple with units relative', () => {
    expect(Layouter.buildMaxHeight('100vh!')).toEqual({
      "mxh-100vh!": ".mxh-100vh\\!{max-height:100vh !important}"
    });
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildMaxHeight('100! 200@sm 300@md!')).toEqual({
      "mxh-100!": ".mxh-100\\!{max-height:100px !important}",
      "mxh-200@sm": "@media screen and (min-width: 768px){.mxh-200\\@sm{max-height:200px}}",
      "mxh-300@md!": "@media screen and (min-width: 1024px){.mxh-300\\@md\\!{max-height:300px !important}}"
    })
  });
});