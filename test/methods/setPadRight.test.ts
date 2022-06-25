import { setConfig } from '../../src/config/main';
import setPadRight from '../../src/methods/setPadRight';

describe('Setting padding right', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padr', '40');
    await setPadRight(myDiv);
    expect(myDiv.classList.contains('padr-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padr', '10 20.5@sm 30@md');
    await setPadRight(myDiv);
    ['padr-10', 'padr-20_5@sm', 'padr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
