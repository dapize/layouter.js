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

describe('Buildings Padding-bottom', () => {
  it('simple', () => {
    expect(Layouter.buildPadBottom('40')).toEqual({
      "padb-40": ".padb-40{padding-bottom:40px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildPadBottom('40!')).toEqual({
      "padb-40!": ".padb-40\\!{padding-bottom:40px !important}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildPadBottom('10 20.5@sm 30@md')).toEqual({
      "padb-10": ".padb-10{padding-bottom:10px}",
      "padb-20_5@sm": "@media screen and (min-width: 768px){.padb-20_5\\@sm{padding-bottom:20.5px}}",
      "padb-30@md": "@media screen and (min-width: 1024px){.padb-30\\@md{padding-bottom:30px}}"
    })
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildPadBottom('10! 20.5@sm! 30@md')).toEqual({
      "padb-10!": ".padb-10\\!{padding-bottom:10px !important}",
      "padb-20_5@sm!": "@media screen and (min-width: 768px){.padb-20_5\\@sm\\!{padding-bottom:20.5px !important}}",
      "padb-30@md": "@media screen and (min-width: 1024px){.padb-30\\@md{padding-bottom:30px}}"
    })
  });
});