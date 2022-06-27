import { setConfig } from '../../src/config/main';
import setPads from '../../src/methods/setPad';

describe('Setting pads', () => {
  setConfig(window);

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pad', '40-0');
    await setPads(myDiv);
    expect(myDiv.classList.contains('p-40-0')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pad', '10-1/15 20.5-3/31@sm 30-2/31@md');
    await setPads(myDiv);
    ['p-10-1/15', 'p-20_5-3/31@sm', 'p-30-2/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
