import layouter from '../../src/';
import buildAttr from '../../src/helpers/buildAttr';

describe('buildAttr', () => {
  it('simple without insert the styles', () => {
    buildAttr('500', 'hgt');
    expect(layouter.styles).not.toHaveProperty('hgt-500');
  })

  it('simple and inserting the styles', () => {
    buildAttr('300', 'hgt', true);
    expect(layouter.styles).toHaveProperty('hgt-300');
  })
})
