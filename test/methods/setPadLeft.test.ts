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

describe('Setting padding left', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '40');
    await layouter.setPadLeft(myDiv);
    expect(myDiv.classList.contains('padl-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padl', '10 20.5@sm 30@md');
    await layouter.setPadLeft(myDiv);
    ['padl-10', 'padl-20_5@sm', 'padl-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
