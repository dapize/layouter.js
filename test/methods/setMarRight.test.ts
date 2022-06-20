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

describe('Setting Margin Right', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '40');
    await layouter.setMarRight(myDiv);
    expect(myDiv.classList.contains('marr-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marr', '10 20.5@sm 30@md');
    await layouter.setMarRight(myDiv);
    ['marr-10', 'marr-20_5@sm', 'marr-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
