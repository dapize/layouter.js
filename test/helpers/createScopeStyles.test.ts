import createScopeStyles from '../../src/helpers/createScopeStyles';

describe('Create Scope Styles', () => {
  const myBody = document.body;
  const div = document.createElement('div');
  myBody.appendChild(div);

  it('Before', () => {
    createScopeStyles({
      bridge: true,
      bp: 'xs',
      insertionType: 'before',
      node: div,
    });
    const styleNode = myBody.querySelector('#layouter-xs');
    expect(styleNode).toBeTruthy();
  });

  it('After', () => {
    createScopeStyles({
      bridge: true,
      bp: 'sm',
      insertionType: 'after',
      node: div,
    });
    const styleNode = myBody.querySelector('#layouter-sm');
    expect(styleNode).toBeTruthy();
  });

  it('Bridge false', () => {
    const bridge = createScopeStyles({
      bridge: false,
      bp: 'lg',
      insertionType: 'append',
      node: div,
    });
    bridge.method.insertRule('hello');

    expect(bridge).toHaveProperty('method');
    expect(bridge).toHaveProperty('node');
  });
});
