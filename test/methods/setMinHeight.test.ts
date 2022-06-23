import { setConfig } from '../../src/config/main';
import setMinHeight from '../../src/methods/setMinHeight';

describe('Setting mix height', () => {
  setConfig();

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mih', '100');
    await setMinHeight(myDiv);
    expect(myDiv.classList.contains('mih-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mih', '100 200@sm 300@md');
    await setMinHeight(myDiv);
    ['mih-100', 'mih-200@sm', 'mih-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
