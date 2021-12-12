import Layouter from '../src/index';
import processors from '../src/processors';

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

  it('Getting processors', () => {
    const myLayouter = new Layouter();
    expect(myLayouter.processors).toEqual(processors);
  });
});
