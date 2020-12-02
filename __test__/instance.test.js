let lib = require('../dist/layouter');

describe('config of the instance', () => {
  it('Ligth', () => {
    /*
      this test get all the variables and methods expected the variable 'scope'
      because the content of the variable 'scope' is creating in the fly.
    */
    const bpsList = {
      xs: {
        width: 320,
        cols: 15,
        direct: true
      },
      sm: {
        width: 768,
        cols: 31
      }
    };
    const Layouter = new lib({
      breakPoints: bpsList
    });
    expect(Layouter).toBeInstanceOf(lib);
    expect(Layouter).toHaveProperty('breakPoints', bpsList);
    expect(Layouter).toHaveProperty('cols', { xs: 15, sm: 31});
    expect(Layouter).toHaveProperty('debug', false);
    expect(Layouter).toHaveProperty('prefix', '');
    expect(Layouter).toHaveProperty('sizes', { xs: 0, sm: 768});
    expect(Layouter).toHaveProperty('styles', {});
  });

  it('Adbance', () => {
    /*
      In this test just get the 'scope.rules' variable of the 'scope' object.
    */
    const bpsList = {
      xs: {
        width: 320,
        cols: 15
      },
      sm: {
        width: 768,
        cols: 31
      },
      md: {
        width: 1024,
        cols: 31
      },
      lg: {
        width: 1280,
        cols: 31
      }
    };
    const Layouter = new lib({
      breakPoints: bpsList,
      debug: true,
      bridge: false
    });
    expect(Layouter).toHaveProperty('breakPoints', bpsList);
    expect(Layouter.debug).toBeTruthy();
    expect(Object.keys(Layouter.breakPoints)).toEqual(['xs', 'sm', 'md', 'lg']);
  })
});
