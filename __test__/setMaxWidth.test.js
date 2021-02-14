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
    myDiv.setAttribute('mxw', '100');
    Layouter.setMaxWidth(myDiv);
    expect(myDiv.classList.contains('mxw-100')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxw', '100 200@sm 300@md');
    Layouter.setMaxWidth(myDiv);
    ['mxw-100', 'mxw-200@sm', 'mxw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});