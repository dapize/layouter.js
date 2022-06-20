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

describe('Buildings Max-width', () => {
  it('simple', () => {
    expect(layouter.buildMaxWidth('100')).toEqual({
      "mxw-100": ".mxw-100{max-width:100px}"
    });
  });

  it('simple with important flag', () => {
    expect(layouter.buildMaxWidth('100!')).toEqual({
      "mxw-100!": ".mxw-100\\!{max-width:100px !important}"
    });
  });

  it('simple with units relative', () => {
    expect(layouter.buildMaxWidth('40rem')).toEqual({
      "mxw-40rem": ".mxw-40rem{max-width:40rem}"
    });
  });

  it('With breakpoints and important flag', () => {
    expect(layouter.buildMaxWidth('100! 200@sm 300@md!')).toEqual({
      "mxw-100!": ".mxw-100\\!{max-width:100px !important}",
      "mxw-200@sm": "@media screen and (min-width: 768px){.mxw-200\\@sm{max-width:200px}}",
      "mxw-300@md!": "@media screen and (min-width: 1024px){.mxw-300\\@md\\!{max-width:300px !important}}"
    })
  });
});
