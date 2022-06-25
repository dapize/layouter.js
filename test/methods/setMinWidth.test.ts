import { setConfig } from '../../src/config/main';
import setMinWidth from '../../src/methods/setMinWidth';

describe('Setting min width', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('miw', '100');
    await setMinWidth(myDiv);
    expect(myDiv.classList.contains('miw-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('miw', '100 200@sm 300@md');
    await setMinWidth(myDiv);
    ['miw-100', 'miw-200@sm', 'miw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
