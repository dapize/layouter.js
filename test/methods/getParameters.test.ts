import layouter from '../../src';

describe('Get Parameters on a Node', () => {
  it('One prop', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-20');
    const parParams = layouter.getParameters(myDiv);
    expect(parParams).toEqual({ mar: ['40-20'] });
  });

  it('just "mar" parameter - with breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-0 20-0@sm 45-20@md');
    const parParams = layouter.getParameters(myDiv);
    expect(parParams).toEqual({ mar: ['40-0', '20-0@sm', '45-20@md'] });
  });

  it('"mar" and "pad" parameters - with breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-0 20-0@sm 45-20@md');
    myDiv.setAttribute('pad', '10-1/15 20-3/31@sm 30-2/31@md');
    const parParams = layouter.getParameters(myDiv);
    expect(parParams).toEqual({
      mar: ['40-0', '20-0@sm', '45-20@md'],
      pad: ['10-1/15', '20-3/31@sm', '30-2/31@md'],
    });
  });

  it('"mar", "pad", "cols" and "flex" parameters - with breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');
    myDiv.setAttribute('mar', '0-2/13-0-0@-sm 0-0-20-0@sm');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('pad', '20-0@sm');
    const parParams = layouter.getParameters(myDiv);
    expect(parParams).toEqual({
      cols: ['3/13', '21/21@sm', '27/27@md'],
      flex: ['jc:ce', 'ai:ce'],
      mar: ['0-2/13-0-0@-sm', '0-0-20-0@sm'],
      pad: ['20-0@sm'],
    });
  });
});
