const uLayouter = require('../../src/utils');

describe('Parsing a String to a number', () => {
  it('A String', () => {
    expect(uLayouter.stringToNumber('14')).toBe(14);
  });
  it('A number', () => {
    expect(uLayouter.stringToNumber(15)).toBe(15);
  });
});