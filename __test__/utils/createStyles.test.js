let lib = require('../../dist/layouter');
const uLayouter = require('../../src/utils');
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

describe('Creating Styles CSS', () => {
  
  it("Simple styles", () => {
    const styles = uLayouter.createStyles('mar', {
      xs: {
        name: '40-0-0-0',
        value: '40px 0 0 0'
      }
    }, Layouter);
    expect(styles).toEqual({
      'mar-40-0-0-0': '.mar-40-0-0-0{margin:40px 0 0 0}'
    });
  });

  it('With Breakpoints', () => {
    const styles = uLayouter.createStyles('mar', {
      xs: {
        name: '40-1/15',
        value: '40px 6.666666666666667%'
      },
      sm: {
        name:'40-auto-80@sm',
        value: '40px auto 80px'
      }
    }, Layouter);
    expect(styles).toEqual({
      'mar-40-1\\/15': '.mar-40-1\\/15{margin:40px 6.666666666666667%}',
      'mar-40-auto-80\\@sm': '@media screen and (min-width: 768px){.mar-40-auto-80\\@sm{margin:40px auto 80px}}'
    });
  });
});