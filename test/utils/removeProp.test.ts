import { setConfig } from './../../src/config/main';
import removeAttr from '../../src/utils/removeAttr';

describe('removeProp', () => {
  it('Removing a attribute non-existent', async () => {
    setConfig(window);
    let response: boolean;
    try {
      const myDiv = document.createElement('div');
      await removeAttr(myDiv, 'class');
      response = true
    } catch (e) {
      response = false;
    }
    expect(response).toBeTruthy()
  })
})
