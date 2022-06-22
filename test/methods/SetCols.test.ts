window.layouterConfig = {
  debug: false
};
import layouter from '../../src';

describe('Setting cols', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.className = 'test';
    myDiv.setAttribute('cols', '3/13');
    await layouter.setCols(myDiv);
    expect(myDiv.classList.contains('cols-3/13')).toBeTruthy();
  });

  it('Without Cols property', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '3/13');
    layouter.setCols(myDiv).catch(response => {
      expect(response).toBeInstanceOf(Error)
    });
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/15 8/31@sm 20.5/31@md');
    await layouter.setCols(myDiv);
    ['cols-3/15', 'cols-8/31@sm', 'cols-20_5/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
    expect(myDiv.classList.contains('cols-1/1')).toBeFalsy();
  });

  it('Simple with implicit columns and until breakpoint', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3@-md');
    layouter.setCols(myDiv).catch(e => {
      expect(e).toBeInstanceOf(Error);
    });
  });
});
