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

describe('Setting min width', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('miw', '100');
    Layouter.setMinWidth(myDiv);
    expect(myDiv.classList.contains('miw-100')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('miw', '100 200@sm 300@md');
    Layouter.setMinWidth(myDiv);
    ['miw-100', 'miw-200@sm', 'miw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});