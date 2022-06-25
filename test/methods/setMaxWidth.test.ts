import { setConfig } from '../../src/config/main';
import setMaxWidth from '../../src/methods/setMaxWidth';

describe('Setting max width', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxw', '100');
    await setMaxWidth(myDiv);
    expect(myDiv.classList.contains('mxw-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxw', '100 200@sm 300@md');
    await setMaxWidth(myDiv);
    ['mxw-100', 'mxw-200@sm', 'mxw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
