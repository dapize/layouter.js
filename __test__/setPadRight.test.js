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

describe('Setting padding right', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padr', '40');
    Layouter.setPadRight(myDiv);
    expect(myDiv.classList.contains('padr-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padr', '10 20.5@sm 30@md');
    Layouter.setPadRight(myDiv);
    ['padr-10', 'padr-20_5@sm', 'padr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});