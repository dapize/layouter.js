import scopesStylesBuilder from '../../src/helpers/scopesStylesBuilder';
import { init as config } from '../../src/config';

describe('Scopes Styles Builder', () => {
  it('Simple', () => {
    const scopes = scopesStylesBuilder(config);
    expect(scopes).toHaveProperty('xs');
    expect(scopes).toHaveProperty('sm');
    expect(scopes).toHaveProperty('md');
  });
});
