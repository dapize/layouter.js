import { setConfig } from '../../src/config/main';
import setRight from '../../src/methods/setRight';

describe('Setting Right', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('r', '40');
    await setRight(myDiv);
    expect(myDiv.classList.contains('r-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('r', '10 20.5@sm 30@md');
    await setRight(myDiv);
    ['r-10', 'r-20_5@sm', 'r-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
