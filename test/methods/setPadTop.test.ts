import layouter from '../../src';
window.layouterConfig = {
  breakpoints: {
    xs: {
      width: 320,
      cols: 15
    },
    sm: {
      width: 768,
      cols: 31
    },
    md: {
      width: 1024,
      cols: 31
    }
  }
}

describe('Setting padding top', () => {
  it('simple', async ()  => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '40');
    await layouter.setPadTop(myDiv);
    expect(myDiv.classList.contains('padt-40')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('padt', '10 20.5@sm 30@md');
    await layouter.setPadTop(myDiv);
    ['padt-10', 'padt-20_5@sm', 'padt-30@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
