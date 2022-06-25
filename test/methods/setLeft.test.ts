import { setConfig } from '../../src/config/main';
import setLeft from '../../src/methods/setLeft';

describe('Setting Left', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('l', '40');
    await setLeft(myDiv);
    expect(myDiv.classList.contains('l-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('l', '10 20.5@sm 30@md');
    await setLeft(myDiv);
    ['l-10', 'l-20_5@sm', 'l-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
