import buildPadY from './buildPadY';
import setterXY from '../helpers/setterXY';

const setPadY = (
  Node: HTMLElement | Element,
  vals?: string
): Promise<void | Error> => {
  return setterXY({
    Node,
    directives: ['pady', 'py', 'padding-y'],
    builder: buildPadY,
    vals,
  });
};

export default setPadY;
