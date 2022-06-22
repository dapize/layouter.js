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
  debug: false,
};
import layouter from '../../src';

describe('Setting padding bottom', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padb', '40');
    await layouter.setPadBottom(myDiv);
    expect(myDiv.classList.contains('padb-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padb', '10 20.5@sm 30@md');
    await layouter.setPadBottom(myDiv);
    ['padb-10', 'padb-20_5@sm', 'padb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
