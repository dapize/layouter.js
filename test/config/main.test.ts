import config, { baseConfig } from '../../src/config/main';
import lib from '../../src/main';

const readyCb = jest.fn();
window.layouterConfig = {
  ready: readyCb
};

describe('Config', () => {
  const layouter = lib();

  it('Default config', () => {
    expect(layouter).toMatchObject({
      ...baseConfig,
    });
    expect(layouter).toHaveProperty('scope');
    expect(layouter).toHaveProperty('styles');
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

  it('Updating breakpoints', () => {
    const bps = {
      xs: {
        width: 600,
        cols: 21
      },
      md: {
        width: 1200,
        cols: 31
      }
    }
    layouter.updateConfig({  breakpoints: bps })
    const { breakpoints } = config();
    expect(breakpoints).toEqual(bps)
  })

  it('ready callback', () => {
    expect(readyCb).toBeCalled();
  })
});
