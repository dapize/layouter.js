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

describe('Setting max width', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxw', '100');
    await layouter.setMaxWidth(myDiv);
    expect(myDiv.classList.contains('mxw-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxw', '100 200@sm 300@md');
    await layouter.setMaxWidth(myDiv);
    ['mxw-100', 'mxw-200@sm', 'mxw-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
