import { setConfig } from '../../src/config/main';
import setWidth from '../../src/methods/setWidth';

describe('Setting Width', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('wdh', '100');
    await setWidth(myDiv);
    expect(myDiv.classList.contains('w-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('wdh', '100 200@sm 300@md');
    await setWidth(myDiv);
    ['w-100', 'w-200@sm', 'w-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
