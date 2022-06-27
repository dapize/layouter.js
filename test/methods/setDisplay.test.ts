import { setConfig } from '../../src/config/main';
import setDisplay from '../../src/methods/setDisplay';

describe('Setting Margin Top', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('d', 'bl');
    await setDisplay(myDiv);
    expect(myDiv.classList.contains('d-bl')).toBeTruthy();
  });

  it('simple with important', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('d', 'bl!');
    await setDisplay(myDiv);
    expect(myDiv.classList.contains('d-bl!')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('d', 'bl il@sm ib@md');
    await setDisplay(myDiv);
    ['d-bl', 'd-il@sm', 'd-ib@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('With important and breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('d', 'bl! il@sm! ib@md!');
    await setDisplay(myDiv);
    ['d-bl!', 'd-il@sm!', 'd-ib@md!'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
