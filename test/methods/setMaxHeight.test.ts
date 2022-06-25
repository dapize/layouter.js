import { setConfig } from '../../src/config/main';
import setMaxHeight from '../../src/methods/setMaxHeight';

describe('Setting max height', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxh', '100');
    await setMaxHeight(myDiv);
    expect(myDiv.classList.contains('mxh-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxh', '100 200@sm 300@md');
    await setMaxHeight(myDiv);
    ['mxh-100', 'mxh-200@sm', 'mxh-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
