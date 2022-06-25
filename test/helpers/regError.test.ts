import { setConfig } from '../../src/config/main';
import regError from '../../src/helpers/regError';

describe('regError', () => {
  setConfig(window);

  it('width Node', () => {
    const myDiv = document.createElement('div');
    const err = regError('Err Test', 'This is a error test', myDiv);
    expect(err).toBeInstanceOf(Error);
  })
})
