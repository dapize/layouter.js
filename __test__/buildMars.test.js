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

describe('Buildings Margins', () => {
  it('simple', () => {
    expect(Layouter.buildMars('40-0')).toEqual({
      "mar-40-0": ".mar-40-0{margin:40px 0}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildMars('10-1/15 20.5-3/31@sm 30-2/31@md')).toEqual({
      "mar-10-1/15": ".mar-10-1\\/15{margin:10px 6.666666666666667%}",
      "mar-20_5-3/31@sm": "@media screen and (min-width: 768px){.mar-20_5-3\\/31\\@sm{margin:20.5px 9.67741935483871%}}",
      "mar-30-2/31@md": "@media screen and (min-width: 1024px){.mar-30-2\\/31\\@md{margin:30px 6.451612903225806%}}"
    })
  });
});