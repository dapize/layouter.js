import { setConfig } from '../../src/config/main';
import setPadBottom from '../../src/methods/setPadBottom';

describe('Setting padding bottom', () => {
  setConfig(window,{
    debug: false,
  });

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padb', '40');
    await setPadBottom(myDiv);
    expect(myDiv.classList.contains('padb-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padb', '10 20.5@sm 30@md');
    await setPadBottom(myDiv);
    ['padb-10', 'padb-20_5@sm', 'padb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
