import { setConfig } from '../../src/config/main';
import setMarLeft from '../../src/methods/setMarLeft';

describe('Setting Margin Right', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marl', '40');
    await setMarLeft(myDiv);
    expect(myDiv.classList.contains('marl-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marl', '10 20.5@sm 30@md');
    await setMarLeft(myDiv);
    ['marl-10', 'marl-20_5@sm', 'marl-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
