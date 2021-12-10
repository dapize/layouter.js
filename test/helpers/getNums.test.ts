import getNums from '../../src/helpers/getNums';

export const bps = {
  xs: {
    width: 360,
    cols: 15
  },
  sm: {
    width: 768,
    cols: 25
  },
  md: {
    width: 1024,
    cols: 31
  },
  lg: {
    width: 1280,
    cols: 40
  }
};

describe('Getting Widths and Cols', () => {
  it('Widths', () => {
    expect( getNums(bps, 'width') ).toEqual({
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280
    });
  });

  it('Cols', () => {
    expect( getNums(bps, 'cols') ).toEqual({
      xs: 15,
      sm: 25,
      md: 31,
      lg: 40,
    })
  });
});