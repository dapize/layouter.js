import config, { setConfig } from '../../src/config/main';
import buildAttr from '../../src/helpers/buildAttr';

describe('buildAttr', () => {
  setConfig(window);
  const { styles } = config()

  it('simple without insert the styles', () => {
    buildAttr('500', 'hgt');
    expect(styles).not.toHaveProperty('h-500');
  })

  it('simple and inserting the styles', () => {
    buildAttr('300', 'hgt', true);
    expect(styles).toHaveProperty('h-300');
  })
})
