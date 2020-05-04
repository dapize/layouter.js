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

describe('Setting padding top', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '40');
    Layouter.setPadTop(myDiv);
    expect(myDiv.classList.contains('padt-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '10 20.5@sm 30@md');
    Layouter.setPadTop(myDiv);
    ['padt-10', 'padt-20_5@sm', 'padt-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});