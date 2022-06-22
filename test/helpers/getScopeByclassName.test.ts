import layouter from '../../src/';
import getScopeByclassName from '../../src/helpers/getScopeByclassName';

describe('getScopeByclassName', () => {
  it('Processing two nodes with the same "until" breakpoint', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '40@-sm');
    await layouter.setMarTop(myDiv);
    const firstScope = getScopeByclassName('mart-40@-sm');

    const myDiv2 = document.createElement('div');
    myDiv2.setAttribute('mart', '50@-sm');
    await layouter.setMarTop(myDiv2);
    const secondScope = getScopeByclassName('mart-50@-sm');

    const myDiv3 = document.createElement('div');
    myDiv3.setAttribute('mart', '60@sm');
    await layouter.setMarTop(myDiv3);
    const thirdScope = getScopeByclassName('mart-60@sm');

    expect(firstScope).toEqual(secondScope);
    expect(firstScope).not.toEqual(thirdScope);
  });
});
