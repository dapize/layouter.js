import '../../src';
import regError from '../../src/helpers/regError';

describe('regError', () => {
  it('width Node', () => {
    const myDiv = document.createElement('div');
    const err = regError('Err Test', 'This is a error test', myDiv);
    expect(err).toBeInstanceOf(Error);
  })
})
