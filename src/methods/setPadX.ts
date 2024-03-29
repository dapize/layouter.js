import buildPadX from './buildPadX';
import setterXY from '../helpers/setterXY';

const setPadX = (
  Node: HTMLElement | Element,
  vals?: string
): Promise<void | Error> => {
  return setterXY({
    Node,
    directives: ['padx', 'px', 'padding-x'],
    builder: buildPadX,
    vals,
  });
};

export default setPadX;
