let lib = require('../../dist/layouter');
const uLayouter = require('../../src/utils');
describe('Bridge of styles', () => {
  it('Creating the bridge', () => {
    const Layouter = new lib({
      breakPoints: {
        xs: {
          width: 320,
          cols: 15,
          direct: true
        },
        sm: {
          width: 768,
          cols: 31
        }
      }
    });
    expect(uLayouter.createScopeStyles({bridge: true})).toEqual(Layouter.scope);
  });

  it('Using a bridge existing', () => {
    expect(uLayouter.createScopeStyles({})).toHaveProperty('rules', []);
  });
});