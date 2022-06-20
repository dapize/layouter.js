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

describe('Setting Width', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('wdh', '100');
    await layouter.setWidth(myDiv);
    expect(myDiv.classList.contains('wdh-100')).toBeTruthy();
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('wdh', '100 200@sm 300@md');
    await layouter.setWidth(myDiv);
    ['wdh-100', 'wdh-200@sm', 'wdh-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
