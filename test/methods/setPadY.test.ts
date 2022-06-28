import { setConfig } from '../../src/config/main';
import setPadY from '../../src/methods/setPadY';

describe('Setting padding-left and padding-right in same time (PadY)', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pady', '40');
    await setPadY(myDiv);
    expect(myDiv.classList.contains('pt-40')).toBeTruthy();
    expect(myDiv.classList.contains('pb-40')).toBeTruthy();
  });

  it('simple passing values', async () => {
    const myDiv = document.createElement('div');
    await setPadY(myDiv, '40');
    expect(myDiv.classList.contains('pt-40')).toBeTruthy();
    expect(myDiv.classList.contains('pb-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pady', '10 20.5@sm 30@md');
    await setPadY(myDiv);
    ['pt-10', 'pt-20_5@sm', 'pt-30@md', 'pb-10', 'pb-20_5@sm', 'pb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('simple without directive', () => {
    const myDiv = document.createElement('div');
    setPadY(myDiv).catch( (response) => {
      expect(response).toBeInstanceOf(Error);
    });
  });
});
