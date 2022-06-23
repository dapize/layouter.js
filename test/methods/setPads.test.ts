import { setConfig } from '../../src/config/main';
import setPads from '../../src/methods/setPad';

describe('Setting pads', () => {
  setConfig();

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pad', '40-0');
    await setPads(myDiv);
    expect(myDiv.classList.contains('pad-40-0')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('pad', '10-1/15 20.5-3/31@sm 30-2/31@md');
    await setPads(myDiv);
    ['pad-10-1/15', 'pad-20_5-3/31@sm', 'pad-30-2/31@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
