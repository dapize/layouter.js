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

describe('Buildings Max-width', () => {
  it('simple', () => {
    expect(Layouter.buildMaxWidth('100')).toEqual({
      "mw-100": ".mw-100{max-width:100px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildMaxWidth('100!')).toEqual({
      "mw-100!": ".mw-100\\!{max-width:100px !important}"
    });
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildMaxWidth('100! 200@sm 300@md!')).toEqual({
      "mw-100!": ".mw-100\\!{max-width:100px !important}",
      "mw-200@sm": "@media screen and (min-width: 768px){.mw-200\\@sm{max-width:200px}}",
      "mw-300@md!": "@media screen and (min-width: 1024px){.mw-300\\@md\\!{max-width:300px !important}}"
    })
  });
});