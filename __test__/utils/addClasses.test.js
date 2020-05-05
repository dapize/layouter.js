let lib = require('../../dist/layouter');
const uLayouter = require('../../src/utils');
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
    }
  }
});

describe('Adding classes css to a Node', () => {
  
  it('Simple class name', () => {
    const myDiv = document.createElement('div');
    uLayouter.addClasses(['mar-0-0-40'], myDiv, Layouter);
    console.log(myDiv.className);
    expect(myDiv.classList.contains('mar-0-0-40')).toBeTruthy();
  });

  it('Class Name with breakpoints', () => {
    const myDiv = document.createElement('div');
    uLayouter.addClasses(['cols-21@sm'], myDiv, Layouter);
    expect(myDiv.classList.contains('cols-21@sm')).toBeTruthy();
  });

  it('Class Name Flex', () => {
    const myDiv = document.createElement('div');
    uLayouter.addClasses(['flex-jc:ce-ai:ce@xs'], myDiv, Layouter);
    expect(myDiv.classList.contains('flex-jc:ce-ai:ce@xs')).toBeTruthy();
  });
});