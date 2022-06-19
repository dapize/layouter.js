import layouter from '../../src';
import config, { baseConfig } from '../../src/config/main';

describe('Config', () => {
  it('Default config', () => {
    const myLayouter = layouter();
    expect(myLayouter).toMatchObject({
      ...baseConfig,
    });
    expect(myLayouter).toHaveProperty('scope');
    expect(myLayouter).toHaveProperty('styles');
  });

  it('Setting by Window', () => {
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
    window.layouterConfig = myConfig;
    const defaultConfig = config(true);
    expect(defaultConfig.prefix).toEqual(myConfig.prefix);
    expect(defaultConfig.breakpoints).toEqual(myConfig.breakpoints);
    expect(defaultConfig.bridge).toEqual(myConfig.bridge);
  });
});
