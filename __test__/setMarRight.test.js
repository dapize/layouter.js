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

describe('Setting Margin Right', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '40');
    Layouter.setMarRight(myDiv);
    expect(myDiv.classList.contains('marr-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '10 20.5@sm 30@md');
    Layouter.setMarRight(myDiv);
    ['marr-10', 'marr-20_5@sm', 'marr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});