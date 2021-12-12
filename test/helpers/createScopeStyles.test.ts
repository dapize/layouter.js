import createScopeStyles from '../../src/helpers/createScopeStyles';
import { init as configInit } from '../../src/config';

const config = {
  ...configInit,
  lg: {
    width: 1600,
    cols: 38
  }
}

describe('Create Scope Styles', () => {
  const myBody = document.body;
  const div = document.createElement('div');
  myBody.appendChild(div);

  it('Before', () => {
    createScopeStyles( config, 'xs', 'before', div );
    const styleNode = myBody.querySelector('#layouter-xs');
    expect( styleNode ).toBeTruthy()
  });

  it('After', () => {
    createScopeStyles( config, 'sm', 'after', div );
    const styleNode = myBody.querySelector('#layouter-sm');
    expect( styleNode ).toBeTruthy();
  });

  it('Append 2', () => {
    div.appendChild(document.createElement('div'));
    createScopeStyles( config, 'md', 'after', div );
    const styleNode2 = myBody.querySelector('#layouter-md');
    expect( styleNode2 ).toBeTruthy();
  });

  it('bridge', () => {
    const bridge = createScopeStyles( { ...config, bridge: false }, 'lg', 'append', div );
    bridge.method.insertRule('hello');

    expect(bridge).toHaveProperty('method');
    expect(bridge).toHaveProperty('node');
  })
})
