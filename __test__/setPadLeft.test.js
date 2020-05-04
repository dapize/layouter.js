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

describe('Setting padding left', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '40');
    Layouter.setPadLeft(myDiv);
    expect(myDiv.classList.contains('padl-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '10 20.5@sm 30@md');
    Layouter.setPadLeft(myDiv);
    ['padl-10', 'padl-20_5@sm', 'padl-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});