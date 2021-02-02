let lib = require('../dist/layouter');
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
    },
    md: {
      width: 1024,
      cols: 31
    }
  }
});

describe('Resetting Node', () => {
  it('with 2 classNames generic', () => {
    const myDiv = document.createElement('div');
    const classList = ['my-div', 'pad-10-1/15', 'pad-20-3/31@sm', 'test', 'pad-30-2/31@md', 'mar-0-0-40'];
    myDiv.className = classList.join(' ');
    Layouter.reset(myDiv);
    expect(myDiv.className).toEqual('my-div test');
  });
});

