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

describe('Setting mix height', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mih', '100');
    Layouter.setMinHeight(myDiv);
    expect(myDiv.classList.contains('mih-100')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mih', '100 200@sm 300@md');
    Layouter.setMinHeight(myDiv);
    ['mih-100', 'mih-200@sm', 'mih-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});