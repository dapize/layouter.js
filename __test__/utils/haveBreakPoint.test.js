const uLayouter = require('../../src/utils');

describe('Know if a param have or not breakpoint', () => {
  it("haven't", () => {
    let param1 = '14/15';
    param1 = uLayouter.haveBreakPoint(param1);
    expect(param1).toBeFalsy();
  });

  it('have', () => {
    let param2 = '14/15@sm';
    param2 = uLayouter.haveBreakPoint(param2);
    expect(param2).toBeTruthy();
  })
});