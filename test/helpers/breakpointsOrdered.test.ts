import breakpointsNums from '../../src/helpers/breakpointsNums';
import breakpointsOrdered from '../../src/helpers/breakpointsOrdered';

const bpsUnordered = {
  md: {
    width: 1024,
    cols: 31,
  },
  sm: {
    width: 768,
    cols: 25,
  },
  lg: {
    width: 1280,
    cols: 40,
  },
  xs: {
    width: 360,
    cols: 15,
  },
};

describe('Ordering the breakpoints object', () => {
  it('Widths', () => {
    const sizes = breakpointsNums(bpsUnordered, 'width');
    expect(breakpointsOrdered(bpsUnordered, sizes)).toEqual({
      xs: {
        width: 360,
        cols: 15,
      },
      sm: {
        width: 768,
        cols: 25,
      },
      md: {
        width: 1024,
        cols: 31,
      },
      lg: {
        width: 1280,
        cols: 40,
      }
    });
  });
});
