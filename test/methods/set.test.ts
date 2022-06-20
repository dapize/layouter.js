import layouter from '../../src';
window.layouterConfig = {
  breakpoints: {
    xs: {
      width: 320,
      cols: 15,
    },
    sm: {
      width: 768,
      cols: 31,
    },
    md: {
      width: 1024,
      cols: 31,
    },
  },
};

describe('Building all', () => {
  it('All Together', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');
    myDiv.setAttribute('mar', '0-2/13-0-0@-sm 0-0-20-0@sm');
    myDiv.setAttribute('pad', '20-0@sm');
    await layouter.set(myDiv);
    [
      'flex-jc:ce-ai:ce@xs',
      'cols-3/13',
      'cols-21/21@sm',
      'cols-27/27@md',
      'mar-0-2/13-0-0@-sm',
      'mar-0-0-20-0@sm',
      'pad-20-0@sm',
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

    await layouter.set(myDiv);

    [
      'flex-jc:ce-ai:ce@xs',
      'cols-3/13',
      'cols-21/21@sm',
      'cols-27/27@md',
      'padt-10',
      'padt-40_5@sm',
      'padt-30@md',
      'padr-20',
      'padr-50_5@sm',
      'padr-40@md',
      'padb-30',
      'padb-60_5@sm',
      'padb-50@md',
      'padl-40',
      'padl-70_5@sm',
      'padl-60@md',
      'mart-50',
      'mart-30_5@sm',
      'mart-70@md',
      'marr-60',
      'marr-20_5@sm',
      'marr-80@md',
      'marb-70',
      'marb-40_5@sm',
      'marb-90@md',
      'marl-80',
      'marl-5_5@sm',
      'marl-100@md',
    ].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
