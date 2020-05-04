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

describe('Setting pads', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pad', '40-0');
    Layouter.setPads(myDiv);
    expect(myDiv.classList.contains('pad-40-0')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pad', '10-1/15 20.5-3/31@sm 30-2/31@md');
    Layouter.setPads(myDiv);
    ['pad-10-1/15', 'pad-20_5-3/31@sm', 'pad-30-2/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});