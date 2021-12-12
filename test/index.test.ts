import Layouter from '../src/index';

describe('Instance Layouter', () => {
  it('Automatic', () => {
    expect(window).toHaveProperty('Layouter');
  });

  it('Instance defined', () => {
    const myReady = jest.fn();
    new Layouter({
      ready: myReady,
    });
    expect(myReady).toHaveBeenCalled();
  });
});
