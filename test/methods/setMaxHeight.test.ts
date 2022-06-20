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

describe('Setting max height', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxh', '100');
    await layouter.setMaxHeight(myDiv);
    expect(myDiv.classList.contains('mxh-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mxh', '100 200@sm 300@md');
    await layouter.setMaxHeight(myDiv);
    ['mxh-100', 'mxh-200@sm', 'mxh-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
