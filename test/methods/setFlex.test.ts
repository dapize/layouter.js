import { setConfig } from '../../src/config/main';
import setFlex from '../../src/methods/setFlex';

describe('Setting Flex', () => {
  setConfig(window, {
    debug: false
  });

  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce');
    await setFlex(myDiv);
    expect(myDiv.classList.contains('fx-jc:ce')).toBeTruthy();
  });

  it('simple without "flex" prop', () => {
    const myDiv = document.createElement('div');
    setFlex(myDiv).catch(response => {
      expect(response).toBeInstanceOf(Error)
    });
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce fw:w@sm jc:sb@sm fd:co@md');
    await setFlex(myDiv);

    expect(myDiv.className).toEqual('fx-jc:ce-ai:ce fx-fw:w-jc:sb@sm fx-fd:co@md');
  });

  it('With equal breakpoints compound created separately', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce@sm-md');
    await setFlex(myDiv);
    expect(myDiv.className).toEqual('fx-jc:ce@sm-md');

    myDiv.setAttribute('flex', 'ai:ce@sm-md');
    await setFlex(myDiv);
    expect(myDiv.className).toEqual('fx-jc:ce@sm-md fx-ai:ce@sm-md');
  });

  it('With breakpoints compound different created separately', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce@xs-md');
    await setFlex(myDiv);
    expect(myDiv.className).toEqual('fx-jc:ce@xs-md');

    myDiv.setAttribute('flex', 'ai:ce@sm-md');
    await setFlex(myDiv);
    expect(myDiv.className).toEqual('fx-jc:ce@xs-md fx-ai:ce@sm-md');
  });

  it('Attributes for Flex Items', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'fg:1 fh:1 as:ce or:1');
    await setFlex(myDiv);
    expect(
      myDiv.classList.contains('fx-fg:1-fh:1-as:ce-or:1')
    ).toBeTruthy();
  });

  it('Attributes for Flex Items only', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'as:ce jc:ce');
    await setFlex(myDiv);
    expect(
      myDiv.classList.contains('fx-as:ce-jc:ce')
    ).toBeTruthy();
  });

  it('With a invalid alias', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'as:tt');
    setFlex(myDiv).catch( e => {
      expect(e).toBeInstanceOf(Error);
    })
  })

  it('With a invalid alias extended', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'justify-content:tt');
    setFlex(myDiv).catch( e => {
      expect(e).toBeInstanceOf(Error);
    })
  })
});
