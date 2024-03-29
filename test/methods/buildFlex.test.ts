import { setConfig } from '../../src/config/main';
import buildFlex from '../../src/methods/buildFlex';

describe('Building Flex', () => {
  setConfig(window);

  it('simple', () => {
    expect(buildFlex('jc:ce')).toEqual({
      'fx-jc:ce': '.fx-jc\\:ce{justify-content:center;display:flex;}',
    });
  });

  it('simple with important flag', () => {
    expect(buildFlex('jc:ce!')).toEqual({
      'fx-jc:ce!':
        '.fx-jc\\:ce\\!{justify-content:center !important;display:flex !important;}',
    });
  });

  it('With breakpoints', () => {
    expect(buildFlex('jc:ce ai:ce fw:w@sm jc:sb@sm fd:co@md')).toEqual(
      {
        'fx-fd:co@md':
          '@media screen and (min-width: 900px){.fx-fd\\:co\\@md{flex-direction:column;display:flex;}}',
        'fx-fw:w-jc:sb@sm':
          '@media screen and (min-width: 600px){.fx-fw\\:w-jc\\:sb\\@sm{flex-wrap:wrap;justify-content:space-between;display:flex;}}',
        'fx-jc:ce-ai:ce':
          '.fx-jc\\:ce-ai\\:ce{justify-content:center;align-items:center;display:flex;}',
      }
    );
  });

  it('With breakpoints and important flag', () => {
    expect(
      buildFlex('jc:ce! ai:ce fw:w@sm! jc:sb@sm fd:co@md!')
    ).toEqual({
      'fx-fd:co@md!': '@media screen and (min-width: 900px){.fx-fd\\:co\\@md\\!{flex-direction:column !important;display:flex !important;}}',
      'fx-fw:w!-jc:sb@sm': '@media screen and (min-width: 600px){.fx-fw\\:w\\!-jc\\:sb\\@sm{flex-wrap:wrap !important;justify-content:space-between;display:flex !important;}}',
      'fx-jc:ce!-ai:ce': '.fx-jc\\:ce\\!-ai\\:ce{justify-content:center !important;align-items:center;display:flex !important;}',
    });
  });

  it('With a invalid alias', async () => {
    expect(buildFlex('aa:bb')).toBeInstanceOf(Error);
  })

  it('With a invalid alias extended', async () => {
    expect(buildFlex('justify-content:aa')).toBeInstanceOf(Error);
  })
});
