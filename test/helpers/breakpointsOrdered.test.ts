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
    expect(breakpointsOrdered(bpsUnordered)).toEqual(['xs', 'sm', 'md', 'lg']);
  });
});
