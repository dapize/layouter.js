const uLayouter = require('../../src/utils');

describe('Preparing the param with and without breakpoint', () => {
  const objBase = {
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
    },
    lg: {
      width: 1280,
      cols: 31
    }
  }

  it("without breakpoint", () => {
    expect(uLayouter.prepareParam('14/15', objBase)).toEqual({
      widthBp: false,
      numbers: '14/15',
      breakPoints: 'xs',
      important: false
    })
  });

  it("with breakpoint", () => {
    expect(uLayouter.prepareParam('14/15@sm', objBase)).toEqual({
      widthBp: true,
      numbers: '14/15',
      breakPoints: 'sm',
      important: false
    })
  });
});