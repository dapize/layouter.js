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
    }
  }
});

describe('Getting parameters', () => {

  it('just "mar" parameter - simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-20');
    const parParams = Layouter.getParameters(myDiv);
    expect(parParams).toEqual({mar: ['40-20'] });
  });

  it('just "mar" parameter - with breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-0 20-0@sm 45-20@md');
    const parParams = Layouter.getParameters(myDiv);
    expect(parParams).toEqual({mar: ['40-0', '20-0@sm', '45-20@md'] });
  });

  it('"mar" and "pad" parameters - with breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-0 20-0@sm 45-20@md');
    myDiv.setAttribute('pad', '10-1/15 20-3/31@sm 30-2/31@md');
    const parParams = Layouter.getParameters(myDiv);
    expect(parParams).toEqual({
      mar: ['40-0', '20-0@sm', '45-20@md'],
      pad: ['10-1/15', '20-3/31@sm', '30-2/31@md']
    });
  });

  it('"mar", "pad", "cols" and "flex" parameters - with breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');
    myDiv.setAttribute('mar' ,'0-2/13-0-0@-sm 0-0-20-0@sm');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('pad', '20-0@sm');
    const parParams = Layouter.getParameters(myDiv);
    expect(parParams).toEqual({
      cols: ["3/13", "21/21@sm", "27/27@md"],
      flex: ["jc:ce", "ai:ce"],
      mar: ["0-2/13-0-0@-sm", "0-0-20-0@sm"],
      pad: ["20-0@sm"]
    });
  });
});