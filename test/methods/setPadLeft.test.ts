import { setConfig } from '../../src/config/main';
import setPadLeft from '../../src/methods/setPadLeft';

describe('Setting padding left', () => {
  setConfig();

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '40');
    await setPadLeft(myDiv);
    expect(myDiv.classList.contains('padl-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '10 20.5@sm 30@md');
    await setPadLeft(myDiv);
    ['padl-10', 'padl-20_5@sm', 'padl-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
