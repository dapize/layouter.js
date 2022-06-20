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

describe('Setting mix height', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mih', '100');
    await layouter.setMinHeight(myDiv);
    expect(myDiv.classList.contains('mih-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mih', '100 200@sm 300@md');
    await layouter.setMinHeight(myDiv);
    ['mih-100', 'mih-200@sm', 'mih-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
