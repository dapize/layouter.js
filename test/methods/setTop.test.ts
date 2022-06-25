import { setConfig } from '../../src/config/main';
import setTop from '../../src/methods/setTop';

describe('Setting Top', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('t', '40');
    await setTop(myDiv);
    expect(myDiv.classList.contains('t-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('t', '10 20.5@sm 30@md');
    await setTop(myDiv);
    ['t-10', 't-20_5@sm', 't-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
