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

describe('Building all', () => {
  it('Complete', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');
    myDiv.setAttribute('mar', '0-2/13-0-0@-sm 0-0-20-0@sm');
    myDiv.setAttribute('pad', '20-0@sm');
    Layouter.build(myDiv);
    ['flex-jc:ce-ai:ce@xs', 'cols-3/13', 'cols-21/21@sm', 'cols-27/27@md', 'mar-0-2/13-0-0@-sm', 'mar-0-0-20-0@sm', 'pad-20-0@sm'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});