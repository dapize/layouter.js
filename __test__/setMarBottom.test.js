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
    myDiv.setAttribute('marb', '40');
    Layouter.setMarBottom(myDiv);
    expect(myDiv.classList.contains('marb-40')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marb', '10 20.5@sm 30@md');
    Layouter.setMarBottom(myDiv);
    ['marb-10', 'marb-20_5@sm', 'marb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});