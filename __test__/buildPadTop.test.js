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

describe('Buildings Padding-top', () => {
  it('simple', () => {
    expect(Layouter.buildPadTop('40')).toEqual({
      "padt-40": ".padt-40{padding-top:40px}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildPadTop('10 20.5@sm 30@md')).toEqual({
      "padt-10": ".padt-10{padding-top:10px}",
      "padt-20_5@sm": "@media screen and (min-width: 768px){.padt-20_5\\@sm{padding-top:20.5px}}",
      "padt-30@md": "@media screen and (min-width: 1024px){.padt-30\\@md{padding-top:30px}}"
    })
  });
});