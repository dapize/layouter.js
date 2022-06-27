import { setConfig } from '../../src/config/main';
import setMarLeft from '../../src/methods/setMarLeft';

describe('Setting Margin Right', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marl', '40');
    await setMarLeft(myDiv);
    expect(myDiv.classList.contains('ml-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marl', '10 20.5@sm 30@md');
    await setMarLeft(myDiv);
    ['ml-10', 'ml-20_5@sm', 'ml-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
