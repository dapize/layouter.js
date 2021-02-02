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

describe('Buildings Paddings', () => {
  it('simple', () => {
    expect(Layouter.buildPads('40-0')).toEqual({
      "pad-40-0": ".pad-40-0{padding:40px 0}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildPads('40-0!')).toEqual({
      "pad-40-0!": ".pad-40-0\\!{padding:40px 0 !important}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildPads('10-1/15 20.5-3/31@sm 30-2/31@md')).toEqual({
      "pad-10-1/15": ".pad-10-1\\/15{padding:10px 6.666666666666667%}",
      "pad-20_5-3/31@sm": "@media screen and (min-width: 768px){.pad-20_5-3\\/31\\@sm{padding:20.5px 9.67741935483871%}}",
      "pad-30-2/31@md": "@media screen and (min-width: 1024px){.pad-30-2\\/31\\@md{padding:30px 6.451612903225806%}}"
    })
  });

  it('With breakpoints and important flag', () => {
    expect(Layouter.buildPads('10-1/15! 20.5-3/31@sm! 30-2/31@md')).toEqual({
      "pad-10-1/15!": ".pad-10-1\\/15\\!{padding:10px 6.666666666666667% !important}",
      "pad-20_5-3/31@sm!": "@media screen and (min-width: 768px){.pad-20_5-3\\/31\\@sm\\!{padding:20.5px 9.67741935483871% !important}}",
      "pad-30-2/31@md": "@media screen and (min-width: 1024px){.pad-30-2\\/31\\@md{padding:30px 6.451612903225806%}}"
    })
  });
});