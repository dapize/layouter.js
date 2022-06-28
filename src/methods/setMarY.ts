import buildMarY from './buildMarY';
import setterXY from '../helpers/setterXY';

const setMarY = (
  Node: HTMLElement | Element,
  vals?: string
): Promise<void | Error> => {
  return setterXY({
    Node,
    directives: ['mary', 'py', 'margin-y'],
    builder: buildMarY,
    vals,
  });
};

export default setMarY;
