import { setConfig } from '../../src/config/main';
import createStyles from '../../src/helpers/createStyles';

describe('createStyles', () => {
  setConfig(window, {
    prefix: 'dpz'
  });

  it('With DPZ prefix', () => {
    const styles = createStyles('mart', {
      xs: {
        name: '500',
        value: '500px'
      }
    })
    expect(styles).toEqual( { 'dpz-mart-500': '.dpz-mart-500{margin-top:500px}' })
  })
})
