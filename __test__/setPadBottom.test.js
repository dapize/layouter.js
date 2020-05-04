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

describe('Setting padding bottom', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padb', '40');
    Layouter.setPadBottom(myDiv);
    expect(myDiv.classList.contains('padb-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padb', '10 20.5@sm 30@md');
    Layouter.setPadBottom(myDiv);
    ['padb-10', 'padb-20_5@sm', 'padb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});