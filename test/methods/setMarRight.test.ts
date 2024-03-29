import { setConfig } from '../../src/config/main';
import setMarRight from '../../src/methods/setMarRight';

describe('Setting Margin Right', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '40');
    await setMarRight(myDiv);
    expect(myDiv.classList.contains('mr-40')).toBeTruthy();
  });

  it('simple with auto', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', 'auto');
    await setMarRight(myDiv);
    expect(myDiv.classList.contains('mr-auto')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '10 20.5@sm 30@md');
    await setMarRight(myDiv);
    ['mr-10', 'mr-20_5@sm', 'mr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
