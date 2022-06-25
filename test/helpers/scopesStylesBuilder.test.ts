import config, { setConfig } from '../../src/config/main';
import { scopesStylesBuilder } from '../../src/helpers/scopesStylesBuilder';

describe('Scopes Styles Builder', () => {
  setConfig(window);
  const { breakpoints } = config();

  it('Simple', () => {
    const scopes = scopesStylesBuilder({
      breakpoints,
      bridge: false,
      context: window
    });
    expect(scopes).toHaveProperty('xs');
    expect(scopes).toHaveProperty('sm');
    expect(scopes).toHaveProperty('md');
    expect(scopes).toHaveProperty('lg');
    expect(scopes).toHaveProperty('xlg');
  });
});
