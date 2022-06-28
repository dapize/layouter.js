import { setConfig } from '../../src/config/main';
import setPadX from '../../src/methods/setPadX';

describe('Setting padding left and right in same time (PadX)', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padx', '40');
    await setPadX(myDiv);
    expect(myDiv.classList.contains('pl-40')).toBeTruthy();
    expect(myDiv.classList.contains('pr-40')).toBeTruthy();
  });

  it('simple passing values', async () => {
    const myDiv = document.createElement('div');
    await setPadX(myDiv, '40');
    expect(myDiv.classList.contains('pl-40')).toBeTruthy();
    expect(myDiv.classList.contains('pr-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padx', '10 20.5@sm 30@md');
    await setPadX(myDiv);
    ['pl-10', 'pl-20_5@sm', 'pl-30@md', 'pr-10', 'pr-20_5@sm', 'pr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('simple without directive', () => {
    const myDiv = document.createElement('div');
    setPadX(myDiv).catch( (response) => {
      expect(response).toBeInstanceOf(Error);
    });
  });
});
