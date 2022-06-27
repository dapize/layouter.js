import { setConfig } from '../../src/config/main';
import setMarTop from '../../src/methods/setMarTop';

describe('Setting Margin Top', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '40');
    await setMarTop(myDiv);
    expect(myDiv.classList.contains('mt-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '10 20.5@sm 30@md');
    await setMarTop(myDiv);
    ['mt-10', 'mt-20_5@sm', 'mt-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
