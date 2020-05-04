const uLayouter = require('../../src/utils');

describe('Preparing the param with and without breakpoint', () => {
  it("without breakpoint", () => {
    expect(uLayouter.prepareParam('14/15')).toEqual({
      widthBp: false,
      numbers: '14/15',
      breakPoints: 'xs'
    })
  });

  it("with breakpoint", () => {
    expect(uLayouter.prepareParam('14/15@sm')).toEqual({
      widthBp: true,
      numbers: '14/15',
      breakPoints: 'sm'
    })
  });
});