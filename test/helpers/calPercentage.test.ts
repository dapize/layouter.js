import calPercentage from '../../src/helpers/calPercentage';

describe('calPercentage', () => {
  it('Simple', () => {
    const cal = calPercentage(2, 3);
    expect(cal).toEqual('66.667%')
  })
})
