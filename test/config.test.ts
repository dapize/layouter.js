import config, { init } from '../src/config';

describe('Config', () => {
  it('Simple', () => {
    const defaultConfig = config();
    expect(defaultConfig).toEqual(init);
  });

  it('Extra', () => {
    const myConfig = {
      prefix: 'my-prefix',
      breakpoints: {
        xs: {
          width: 320,
          cols: 4,
        },
        sm: {
          width: 600,
          cols: 8,
        },
      },
      bridge: false,
    };
    window.layouter = myConfig;
    const defaultConfig = config();
    expect(defaultConfig).toEqual(myConfig);
  });
});
