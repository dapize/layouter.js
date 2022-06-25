import { setConfig } from '../../src/config/main';
import setBottom from '../../src/methods/setBottom';

describe('Setting Bottom', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('b', '40');
    await setBottom(myDiv);
    expect(myDiv.classList.contains('b-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('b', '10 20.5@sm 30@md');
    await setBottom(myDiv);
    ['b-10', 'b-20_5@sm', 'b-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
