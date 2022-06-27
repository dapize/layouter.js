import { setConfig } from '../../src/config/main';
import set from '../../src/methods/set';

describe('Building all', () => {
  setConfig(window, {
    debug: false
  });

  it('All Together', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');
    myDiv.setAttribute('mar', '0-2/13-0-0@-sm 0-0-20-0@sm');
    myDiv.setAttribute('pad', '20-0@sm');
    await set(myDiv);
    [
      'fx-jc:ce-ai:ce',
      'c-3/13',
      'c-21/21@sm',
      'c-27/27@md',
      'm-0-2/13-0-0@-sm',
      'm-0-0-20-0@sm',
      'p-20-0@sm',
    ].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('Separated', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');

    myDiv.setAttribute('padt', '10 40.5@sm 30@md');
    myDiv.setAttribute('padr', '20 50.5@sm 40@md');
    myDiv.setAttribute('padb', '30 60.5@sm 50@md');
    myDiv.setAttribute('padl', '40 70.5@sm 60@md');

    myDiv.setAttribute('mart', '50 30.5@sm 70@md');
    myDiv.setAttribute('marr', '60 20.5@sm 80@md');
    myDiv.setAttribute('marb', '70 40.5@sm 90@md');
    myDiv.setAttribute('marl', '80 5.5@sm 100@md');

    await set(myDiv);

    [
      'fx-jc:ce-ai:ce',
      'c-3/13',
      'c-21/21@sm',
      'c-27/27@md',
      'pt-10',
      'pt-40_5@sm',
      'pt-30@md',
      'pr-20',
      'pr-50_5@sm',
      'pr-40@md',
      'pb-30',
      'pb-60_5@sm',
      'pb-50@md',
      'pl-40',
      'pl-70_5@sm',
      'pl-60@md',
      'mt-50',
      'mt-30_5@sm',
      'mt-70@md',
      'mr-60',
      'mr-20_5@sm',
      'mr-80@md',
      'mb-70',
      'mb-40_5@sm',
      'mb-90@md',
      'ml-80',
      'ml-5_5@sm',
      'ml-100@md',
    ].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });

  it('Without any directive valid', () => {
    const myDiv = document.createElement('div');
    set(myDiv).catch(e => {
      expect(e).toBeInstanceOf(Error)
    });
  })

  it('With a invalid value declarated ', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '20@sm-md');
    set(myDiv).catch(e => {
      expect(e).toBeInstanceOf(Error)
    })
  })
});
