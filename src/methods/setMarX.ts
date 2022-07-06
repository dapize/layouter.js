import buildMarX from './buildMarX';
import setterXY from '../helpers/setterXY';

const setMarX = (
  Node: HTMLElement | Element,
  vals?: string
): Promise<void | Error> => {
  return setterXY({
    Node,
    directives: ['marx', 'mx', 'margin-x'],
    builder: buildMarX,
    vals,
  });
};

export default setMarX;
