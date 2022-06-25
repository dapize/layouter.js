import { setConfig } from '../../src/config/main';
import setPosition from '../../src/methods/setPosition';

describe('Setting Margin Top', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pos', 'st');
    await setPosition(myDiv);
    expect(myDiv.classList.contains('pos-st')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pos', 'st re@sm ab@md');
    await setPosition(myDiv);
    ['pos-st', 'pos-re@sm', 'pos-ab@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
