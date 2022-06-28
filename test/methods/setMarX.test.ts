import { setConfig } from '../../src/config/main';
import setMarX from '../../src/methods/setMarX';

describe('Setting margin left and right in same time (MarX)', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marx', '40');
    await setMarX(myDiv);
    expect(myDiv.classList.contains('ml-40')).toBeTruthy();
    expect(myDiv.classList.contains('mr-40')).toBeTruthy();
  });

  it('simple passing values', async () => {
    const myDiv = document.createElement('div');
    await setMarX(myDiv, '40');
    expect(myDiv.classList.contains('ml-40')).toBeTruthy();
    expect(myDiv.classList.contains('mr-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marx', '10 20.5@sm 30@md');
    await setMarX(myDiv);
    ['ml-10', 'ml-20_5@sm', 'ml-30@md', 'mr-10', 'mr-20_5@sm', 'mr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('simple without directive', () => {
    const myDiv = document.createElement('div');
    setMarX(myDiv).catch( (response) => {
      expect(response).toBeInstanceOf(Error);
    });
  });
});
