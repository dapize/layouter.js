window.layouterConfig = {
  breakpoints: {
    xs: {
      width: 320,
      cols: 15,
    },
    sm: {
      width: 768,
      cols: 31,
    },
    md: {
      width: 1024,
      cols: 31,
    },
  },
  debug: false
};
import layouter from '../../src';

describe('Setting Flex', () => {
  it('simple', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce');
    await layouter.setFlex(myDiv);
    expect(myDiv.classList.contains('flex-jc:ce')).toBeTruthy();
  });

  it('simple without "flex" prop', () => {
    const myDiv = document.createElement('div');
    layouter.setFlex(myDiv).catch(response => {
      expect(response).toBeFalsy();
    });
  });

  it('With breakpoints', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'jc:ce ai:ce fw:w@sm jc:sb@sm fd:co@md');
    await layouter.setFlex(myDiv);
    ['flex-jc:ce-ai:ce@xs', 'flex-fw:w-jc:sb@sm', 'flex-fd:co@md'].forEach(
      item => {
        expect(myDiv.classList.contains(item)).toBeTruthy();
      }
    );
  });

  it('Attributes for Flex Items', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('flex', 'fg:1 fh:1 as:ce or:1');
    await layouter.setFlex(myDiv);
    expect(
      myDiv.classList.contains('flex-fg:1-fh:1-as:ce-or:1@xs')
    ).toBeTruthy();
  });
});
