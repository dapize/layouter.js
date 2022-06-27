import { setConfig } from '../../src/config/main';
import setPadLeft from '../../src/methods/setPadLeft';

describe('Setting padding left', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '40');
    await setPadLeft(myDiv);
    expect(myDiv.classList.contains('pl-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '10 20.5@sm 30@md');
    await setPadLeft(myDiv);
    ['pl-10', 'pl-20_5@sm', 'pl-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
