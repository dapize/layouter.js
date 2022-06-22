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
  debug: false,
};
import layouter from '../../src';

describe('Setting Height', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('hgt', '100');
    await layouter.setHeight(myDiv);
    expect(myDiv.classList.contains('hgt-100')).toBeTruthy();
  });

  it('simple without directive', async () => {
    try {
      const myDiv = document.createElement('div');
      await layouter.setHeight(myDiv);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('hgt', '100 200@sm 300@md');
    await layouter.setHeight(myDiv);
    ['hgt-100', 'hgt-200@sm', 'hgt-300@md'].forEach(item => {
      expect(myDiv.classList.contains(item)).toBeTruthy();
    });
  });
});
