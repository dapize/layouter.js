import { baseConfig } from '../../src/config/main';
import { scopesStylesBuilder } from '../../src/helpers/scopesStylesBuilder';

describe('Scopes Styles Builder', () => {
  it('Simple', () => {
    const scopes = scopesStylesBuilder(baseConfig.breakpoints, false);
    expect(scopes).toHaveProperty('xs');
    expect(scopes).toHaveProperty('sm');
    expect(scopes).toHaveProperty('md');
  });
});
