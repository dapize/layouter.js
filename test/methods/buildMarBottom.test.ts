import layouter from '../../src/';
window.layouterConfig = {
  breakpoints: {
    xs: {
      width: 320,
      cols: 15
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
}

describe('Buildings margin-bottom', () => {
  it('simple', () => {
    expect(layouter.buildMarBottom('40')).toEqual({
      "marb-40": ".marb-40{margin-bottom:40px}"
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildMarBottom('40!')).toEqual({
      "marb-40!": ".marb-40\\!{margin-bottom:40px !important}"
    });
  });

  it('With breakpoints', () => {
    expect(layouter.buildMarBottom('10 20.5@sm 30@md')).toEqual({
      "marb-10": ".marb-10{margin-bottom:10px}",
      "marb-20_5@sm": "@media screen and (min-width: 768px){.marb-20_5\\@sm{margin-bottom:20.5px}}",
      "marb-30@md": "@media screen and (min-width: 1024px){.marb-30\\@md{margin-bottom:30px}}"
    })
  });

  it('With breakpoints and Important Flag', () => {
    expect(layouter.buildMarBottom('10! 20.5@sm! 30@md')).toEqual({
      "marb-10!": ".marb-10\\!{margin-bottom:10px !important}",
      "marb-20_5@sm!": "@media screen and (min-width: 768px){.marb-20_5\\@sm\\!{margin-bottom:20.5px !important}}",
      "marb-30@md": "@media screen and (min-width: 1024px){.marb-30\\@md{margin-bottom:30px}}"
    })
  });
});
