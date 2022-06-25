import { setConfig } from '../../src/config/main';
import setMarBottom from '../../src/methods/setMarBottom';

describe('Setting Margin Right', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marb', '40');
    await setMarBottom(myDiv);
    expect(myDiv.classList.contains('marb-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marb', '10 20.5@sm 30@md');
    await setMarBottom(myDiv);
    ['marb-10', 'marb-20_5@sm', 'marb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
