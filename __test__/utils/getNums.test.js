const uLayouter = require('../../src/utils');
const bps = {
  xs: {
    width: 320,
    cols: 15,
    direct: true
  },
  sm: {
    width: 768,
    cols: 25
  },
  md: {
    width: 1024,
    cols: 31
  },
  lg: {
    width: 1280,
    cols: 40
  }
};
describe('Getting sizes and cols', () => {
  it('Sizes', () => {
    expect(uLayouter.getNums(bps, 'width')).toEqual({
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280
    });
  });

  it('Cols', () => {
    expect(uLayouter.getNums(bps, 'cols')).toEqual({
      xs: 15,
      sm: 25,
      md: 31,
      lg: 40,
    })
  });
});