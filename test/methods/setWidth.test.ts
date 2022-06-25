import { setConfig } from '../../src/config/main';
import setWidth from '../../src/methods/setWidth';

describe('Setting Width', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('wdh', '100');
    await setWidth(myDiv);
    expect(myDiv.classList.contains('wdh-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('wdh', '100 200@sm 300@md');
    await setWidth(myDiv);
    ['wdh-100', 'wdh-200@sm', 'wdh-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
