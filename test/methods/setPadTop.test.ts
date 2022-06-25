import { setConfig } from '../../src/config/main';
import setPadTop from '../../src/methods/setPadTop';

describe('Setting padding top', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '40');
    await setPadTop(myDiv);
    expect(myDiv.classList.contains('padt-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '10 20.5@sm 30@md');
    await setPadTop(myDiv);
    ['padt-10', 'padt-20_5@sm', 'padt-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
