import buildPadX from './buildPadX';
import setterPadsXY from '../helpers/setterPadsXY';

const setPadX = (
  Node: HTMLElement | Element,
  vals?: string
): Promise<void | Error> => {
  return setterPadsXY({
    Node,
    directives: ['padx', 'px'],
    builder: buildPadX,
    vals
  })
};

export default setPadX;
