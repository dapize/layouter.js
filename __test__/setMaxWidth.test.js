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

describe('Setting max width', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mw', '100');
    Layouter.setMaxWidth(myDiv);
    expect(myDiv.classList.contains('mw-100')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mw', '100 200@sm 300@md');
    Layouter.setMaxWidth(myDiv);
    ['mw-100', 'mw-200@sm', 'mw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});