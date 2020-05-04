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

describe('Setting Flex', () => {
  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce');
    Layouter.setFlex(myDiv);
    expect(myDiv.classList.contains('flex-jc:ce')).toBeTruthy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce fw:w@sm jc:sb@sm fd:co@md');
    Layouter.setFlex(myDiv);
    ['flex-jc:ce-ai:ce@xs', 'flex-fw:w-jc:sb@sm', 'flex-fd:co@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});