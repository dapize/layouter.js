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

describe('Setting Margin Top', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '40');
    Layouter.setMarTop(myDiv);
    expect(myDiv.classList.contains('mart-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '10 20.5@sm 30@md');
    Layouter.setMarTop(myDiv);
    ['mart-10', 'mart-20_5@sm', 'mart-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});