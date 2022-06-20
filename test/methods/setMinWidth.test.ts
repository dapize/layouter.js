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

describe('Setting min width', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('miw', '100');
    await layouter.setMinWidth(myDiv);
    expect(myDiv.classList.contains('miw-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('miw', '100 200@sm 300@md');
    await layouter.setMinWidth(myDiv);
    ['miw-100', 'miw-200@sm', 'miw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
