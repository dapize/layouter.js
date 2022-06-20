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

describe('Setting Margin Top', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '40');
    await layouter.setMarTop(myDiv);
    expect(myDiv.classList.contains('mart-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '10 20.5@sm 30@md');
    await layouter.setMarTop(myDiv);
    ['mart-10', 'mart-20_5@sm', 'mart-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
