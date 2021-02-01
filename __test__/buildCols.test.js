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

describe('Buildings cols', () => {
  it('simple', () => {
    expect(Layouter.buildCols('3/13')).toEqual({
      "cols-3/13": ".cols-3\\/13{width:23.076923076923077%}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildCols('3/13!')).toEqual({
      "cols-3/13!": ".cols-3\\/13\\!{width:23.076923076923077% !important}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildCols('3/15 8/31@sm 20.5/31@md')).toEqual({
      "cols-20_5/31@md": "@media screen and (min-width: 1024px){.cols-20_5\\/31\\@md{width:66.12903225806451%}}",
      "cols-3/15": ".cols-3\\/15{width:20%}",
      "cols-8/31@sm": "@media screen and (min-width: 768px){.cols-8\\/31\\@sm{width:25.806451612903224%}}"
    })
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildCols('3/15! 8/31@sm 20.5/31@md!')).toEqual({
      "cols-3/15!": ".cols-3\\/15\\!{width:20% !important}",
      "cols-8/31@sm": "@media screen and (min-width: 768px){.cols-8\\/31\\@sm{width:25.806451612903224%}}",
      "cols-20_5/31@md!": "@media screen and (min-width: 1024px){.cols-20_5\\/31\\@md\\!{width:66.12903225806451% !important}}"
    })
  });
});

