import layouter from '../../src';

describe('Building all', () => {
  it('Simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    myDiv.setAttribute('cols', '3/13 21/21@sm 27/27@md');
    myDiv.setAttribute('mar', '0-2/13-0-0@-sm 0-0-20-0@sm');
    myDiv.setAttribute('pad', '20-0@sm');
    await layouter.set(myDiv);
    myDiv.classList.add('lol');
    myDiv.classList.add('test1');
    myDiv.classList.add('test2');
    await layouter.reset(myDiv);
    expect(myDiv.className).toEqual('lol test1 test2');
  })

  it('Without any class name', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce');
    await layouter.setFlex(myDiv);
    await layouter.reset(myDiv);
    expect(myDiv.className).toEqual('');
  })

  it('With a class name that following the syntax of one created by the system', async () => {
    const myDiv = document.createElement('div');
    myDiv.className = 'cols-3/13 dpz-'
    await layouter.reset(myDiv);
    expect(myDiv.className).toEqual('dpz-');
  })
})
