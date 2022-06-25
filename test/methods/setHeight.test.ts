import { setConfig } from '../../src/config/main';
import setHeight from '../../src/methods/setHeight';

describe('Setting Height', () => {
  setConfig(window,{
    debug: false,
  });

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('hgt', '100');
    await setHeight(myDiv);
    expect(myDiv.classList.contains('hgt-100')).toBeTruthy();
  });

  it('simple without directive', async () => {
    try {
      const myDiv = document.createElement('div');
      await setHeight(myDiv);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('hgt', '100 200@sm 300@md');
    await setHeight(myDiv);
    ['hgt-100', 'hgt-200@sm', 'hgt-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
