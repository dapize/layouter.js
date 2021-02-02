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

describe('Buildings Margin Left', () => {
  it('simple', () => {
    expect(Layouter.buildMarLeft('40')).toEqual({
      "marl-40": ".marl-40{margin-left:40px}"
    });
  });

  it('simple with important flag', () => {
    expect(Layouter.buildMarLeft('40!')).toEqual({
      "marl-40!": ".marl-40\\!{margin-left:40px !important}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildMarLeft('10 20.5@sm 30@md')).toEqual({
      "marl-10": ".marl-10{margin-left:10px}",
      "marl-20_5@sm": "@media screen and (min-width: 768px){.marl-20_5\\@sm{margin-left:20.5px}}",
      "marl-30@md": "@media screen and (min-width: 1024px){.marl-30\\@md{margin-left:30px}}"
    })
  });

  it('With breakpoints and Important Flag', () => {
    expect(Layouter.buildMarLeft('10 20.5@sm! 30@md!')).toEqual({
      "marl-10": ".marl-10{margin-left:10px}",
      "marl-20_5@sm!": "@media screen and (min-width: 768px){.marl-20_5\\@sm\\!{margin-left:20.5px !important}}",
      "marl-30@md!": "@media screen and (min-width: 1024px){.marl-30\\@md\\!{margin-left:30px !important}}"
    })
  });
});