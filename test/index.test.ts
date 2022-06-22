const myDiv = document.createElement('div');
myDiv.setAttribute('mart', '40');
document.body.appendChild(myDiv);
import '../src';

describe('Init', () => {
  it('With Nodes already in the DOM', () => {
    expect(myDiv.className).toEqual('mart-40');
  })
})
