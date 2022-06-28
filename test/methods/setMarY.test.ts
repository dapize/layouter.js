import { setConfig } from '../../src/config/main';
import setMarY from '../../src/methods/setMarY';

describe('Setting margin top and bottom in same time (MarY)', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mary', '40');
    await setMarY(myDiv);
    expect(myDiv.classList.contains('mt-40')).toBeTruthy();
    expect(myDiv.classList.contains('mb-40')).toBeTruthy();
  });

  it('simple passing values', async () => {
    const myDiv = document.createElement('div');
    await setMarY(myDiv, '40');
    expect(myDiv.classList.contains('mt-40')).toBeTruthy();
    expect(myDiv.classList.contains('mb-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mary', '10 20.5@sm 30@md');
    await setMarY(myDiv);
    ['mt-10', 'mt-20_5@sm', 'mt-30@md', 'mb-10', 'mb-20_5@sm', 'mb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('simple without directive', () => {
    const myDiv = document.createElement('div');
    setMarY(myDiv).catch( (response) => {
      expect(response).toBeInstanceOf(Error);
    });
  });
});
