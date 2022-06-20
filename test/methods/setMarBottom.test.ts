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
    myDiv.setAttribute('marb', '40');
    await layouter.setMarBottom(myDiv);
    expect(myDiv.classList.contains('marb-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('marb', '10 20.5@sm 30@md');
    await layouter.setMarBottom(myDiv);
    ['marb-10', 'marb-20_5@sm', 'marb-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
