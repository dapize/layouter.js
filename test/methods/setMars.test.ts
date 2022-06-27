import { setConfig } from '../../src/config/main';
import setMars from '../../src/methods/setMar';

describe('Setting Mars', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '40-0');
    await setMars(myDiv);
    expect(myDiv.classList.contains('m-40-0')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mar', '10-1/15 20.5-3/31@sm 30-2/31@md');
    await setMars(myDiv);
    ['m-10-1/15', 'm-20_5-3/31@sm', 'm-30-2/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
