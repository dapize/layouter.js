import percentageConverter from '../../src/helpers/percentageConverter';

describe('percentageConverter helper', () => {
  test('Simple', () => {
    const result = percentageConverter('20%');
    expect(result).toEqual('0¯20');
  });
});
