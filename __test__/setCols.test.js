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
    },
    lg: {
      width: 1280,
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
    // falta terminar
  });
});