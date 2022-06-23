import { setConfig } from '../../src/config/main';
import setMarRight from '../../src/methods/setMarRight';

describe('Setting Margin Right', () => {
  setConfig();

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '40');
    await setMarRight(myDiv);
    expect(myDiv.classList.contains('marr-40')).toBeTruthy();
  });

  it('simple with auto', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', 'auto');
    await setMarRight(myDiv);
    expect(myDiv.classList.contains('marr-auto')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '10 20.5@sm 30@md');
    await setMarRight(myDiv);
    ['marr-10', 'marr-20_5@sm', 'marr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
