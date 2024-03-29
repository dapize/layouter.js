import { setConfig } from '../../src/config/main';
import setCols from '../../src/methods/SetCols';

describe('Setting cols', () => {
  setConfig(window, {
    debug: false
  });

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.className = 'test';
    myDiv.setAttribute('cols', '3/13');
    await setCols(myDiv);
    expect(myDiv.classList.contains('c-3/13')).toBeTruthy();
  });

  it('Without Cols property', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '');
    setCols(myDiv).catch(response => {
      expect(response).toBeInstanceOf(Error)
    });
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/15 8/31@sm 20.5/31@md');
    await setCols(myDiv);
    ['c-3/15', 'c-8/31@sm', 'c-20_5/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
    expect(myDiv.classList.contains('c-1/1')).toBeFalsy();
  });

  it('Simple with implicit columns and until breakpoint', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3@-md');
    setCols(myDiv).catch(e => {
      expect(e).toBeInstanceOf(Error);
    });
  });
});
