import { setConfig } from '../../src/config/main';
import directiveValues from '../../src/helpers/directiveValues';

describe('directiveValues helper', () => {
  setConfig(window);

  it('Simple', () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('cols', '3/13')
    const classes = directiveValues(myDiv, ['c', 'cols']);
    expect(classes).toEqual('3/13');
  })

  it('Simple', () => {
    const myDiv = document.createElement('div');
    const classes = directiveValues(myDiv, ['c', 'cols']);
    expect(classes).toBeInstanceOf(Error);
  })
})
