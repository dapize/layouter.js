let lib = require('../../dist/layouter');
const uLayouter = require('../../src/utils');
describe('Bridge of styles', () => {
  const objScope = uLayouter.createScopeStyles({bridge: true}, 'xs', 'append', document.body);

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
    expect(objScope).toEqual(Layouter.scope.xs);
  });

  it('Using a bridge existing', () => {
    expect(objScope.method).toHaveProperty('cssRules', []);
  });
});