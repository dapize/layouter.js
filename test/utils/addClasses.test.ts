import { setConfig } from './../../src/config/main';
import addClasses from '../../src/utils/addClasses';

describe('addClasses', () => {
  it('addClasses a class already existent', async () => {
    setConfig(window);
    let response: boolean;
    try {
      const myDiv = document.createElement('div');
      myDiv.className = 'test';
      await addClasses(myDiv, 'test');
      response = true
    } catch (e) {
      response = false;
    }
    expect(response).toBeTruthy()
  })
})
