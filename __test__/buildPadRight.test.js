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

describe('Buildings Padding-right', () => {
  it('simple', () => {
    expect(Layouter.buildPadRight('40')).toEqual({
      "padr-40": ".padr-40{padding-right:40px}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildPadRight('10 20.5@sm 30@md')).toEqual({
      "padr-10": ".padr-10{padding-right:10px}",
      "padr-20_5@sm": "@media screen and (min-width: 768px){.padr-20_5\\@sm{padding-right:20.5px}}",
      "padr-30@md": "@media screen and (min-width: 1024px){.padr-30\\@md{padding-right:30px}}"
    })
  });
});