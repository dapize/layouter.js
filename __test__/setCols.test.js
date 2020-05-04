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

describe('Setting cols', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/13');
    Layouter.setCols(myDiv);
    expect(myDiv.classList.contains('cols-3/13')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/15 8/31@sm 20.5/31@md');
    Layouter.setCols(myDiv);
    ['cols-3/15', 'cols-8/31@sm', 'cols-20_5/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    })
    expect(myDiv.classList.contains('cols-1/1')).toBeFalsy();
  });
});