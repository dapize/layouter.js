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

describe('Buildings Margin-right', () => {
  it('simple', () => {
    expect(Layouter.buildMarRight('40')).toEqual({
      "marr-40": ".marr-40{margin-right:40px}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildMarRight('10 20.5@sm 30@md')).toEqual({
      "marr-10": ".marr-10{margin-right:10px}",
      "marr-20_5@sm": "@media screen and (min-width: 768px){.marr-20_5\\@sm{margin-right:20.5px}}",
      "marr-30@md": "@media screen and (min-width: 1024px){.marr-30\\@md{margin-right:30px}}"
    })
  });
});