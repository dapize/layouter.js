import { waitFor } from '@testing-library/dom';
import config, { baseConfig } from '../../src/config/main';
import lib from '../../src/layouter';

describe('Config', () => {
  it('Default config', () => {
    const layouter = lib(window);
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
    lib(window);
    const defaultConfig = config();
    expect(defaultConfig.prefix).toEqual(myConfig.prefix);
    expect(defaultConfig.breakpoints).toEqual(myConfig.breakpoints);
    expect(defaultConfig.bridge).toEqual(myConfig.bridge);
  });

  it('Updating breakpoints', () => {
    const layouter = lib(window);
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
    const readyCb = jest.fn();
    window.layouterConfig = {
      ready: readyCb
    };
    lib(window);
    waitFor(() => {
      expect(readyCb).toBeCalled();
    })
  })
});
