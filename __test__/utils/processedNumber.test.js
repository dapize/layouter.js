const uLayouter = require('../../src/utils');

describe('Procesing number param', () => {
  it('with slash (/)', () => {
    expect(uLayouter.processedNumber('14/15')).toBe('93.33333333333333%')
  });

  it('just "auto"', () => {
    expect(uLayouter.processedNumber('auto')).toBe('auto')
  });

  it('with decimal"', () => {
    expect(uLayouter.processedNumber('20.5')).toBe('20.5')
  });

  it('A number"', () => {
    expect(uLayouter.processedNumber('20')).toBe('20px')
  });

  it('Cero"', () => {
    expect(uLayouter.processedNumber('0')).toBe('0')
  });
});