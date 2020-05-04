const uLayouter = require('../../src/utils');

describe('Calculating the percentaje with 2 numbers', () => {
  it('Without decimal', () => {
    expect(uLayouter.calPercentage(5, 10)).toBe('50%')
  });
  it('With decimal', () => {
    expect(uLayouter.calPercentage(14, 15)).toBe('93.33333333333333%')
  });
});