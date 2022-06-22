window.layouterConfig = {
  prefix: 'dpz'
}
import '../../src/';
import createStyles from '../../src/helpers/createStyles';

describe('createStyles', () => {
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
