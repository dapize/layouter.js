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

describe('Buildings width', () => {
  it('simple', () => {
    expect(Layouter.buildWidth('100')).toEqual({
      "wdh-100": ".wdh-100{width:100px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildWidth('100!')).toEqual({
      "wdh-100!": ".wdh-100\\!{width:100px !important}"
    });
  });

  it('simple with units relative', () => {
    expect(Layouter.buildWidth('40vw')).toEqual({
      "wdh-40vw": ".wdh-40vw{width:40vw}"
    });
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildWidth('100! 200@sm 300@md!')).toEqual({
      "wdh-100!": ".wdh-100\\!{width:100px !important}",
      "wdh-200@sm": "@media screen and (min-width: 768px){.wdh-200\\@sm{width:200px}}",
      "wdh-300@md!": "@media screen and (min-width: 1024px){.wdh-300\\@md\\!{width:300px !important}}"
    })
  });
});