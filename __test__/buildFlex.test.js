let lib = require('../dist/layouter');
const Layouter = new lib({
  breakPoints: {
    xs: {
      width: 320,
      cols: 15,
      direct: true
    },
    sm: {
      width: 768,
      cols: 31
    },
    md: {
      width: 1024,
      cols: 31
    }
  }
});

describe('Building Flex', () => {
  it('simple', () => {
    expect(Layouter.buildFlex('jc:ce')).toEqual({
      "flex-jc:ce": ".flex-jc\\:ce{justify-content:center;display: flex;}"
    });
  });

  it('With breakpoints', () => {
    expect(Layouter.buildFlex('jc:ce ai:ce fw:w@sm jc:sb@sm fd:co@md')).toEqual({
      "flex-fd:co@md": "@media screen and (min-width: 1024px){.flex-fd\\:co\\@md{flex-direction:column;display: flex;}}",
      "flex-fw:w-jc:sb@sm": "@media screen and (min-width: 768px){.flex-fw\\:w-jc\\:sb\\@sm{flex-wrap:wrap;justify-content:space-between;display: flex;}}",
      "flex-jc:ce-ai:ce@xs": ".flex-jc\\:ce-ai\\:ce\\@xs{justify-content:center;align-items:center;display: flex;}"
    })
  });
});