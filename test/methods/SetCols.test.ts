import layouter from '../../src';

describe('Setting cols', () => {
  const myLayouter = layouter();

  it('simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/13');
    myLayouter.setCols(myDiv);
    expect(myDiv.classList.contains('cols-3/13')).toBeTruthy();
  });

  it('Without Cols property', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '3/13');
    const resSetCols = myLayouter.setCols(myDiv);
    expect(resSetCols).toBeFalsy();
  });

  it('With breakpoints', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/15 8/31@sm 20.5/31@md');
    myLayouter.setCols(myDiv);
    ['cols-3/15', 'cols-8/31@sm', 'cols-20_5/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    })
    expect(myDiv.classList.contains('cols-1/1')).toBeFalsy();
  });
});
