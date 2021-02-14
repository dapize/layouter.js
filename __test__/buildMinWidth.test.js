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

describe('Buildings Min-width', () => {
  it('simple', () => {
    expect(Layouter.buildMinWidth('100')).toEqual({
      "miw-100": ".miw-100{min-width:100px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildMinWidth('100!')).toEqual({
      "miw-100!": ".miw-100\\!{min-width:100px !important}"
    });
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildMinWidth('100! 200@sm 300@md!')).toEqual({
      "miw-100!": ".miw-100\\!{min-width:100px !important}",
      "miw-200@sm": "@media screen and (min-width: 768px){.miw-200\\@sm{min-width:200px}}",
      "miw-300@md!": "@media screen and (min-width: 1024px){.miw-300\\@md\\!{min-width:300px !important}}"
    })
  });
});