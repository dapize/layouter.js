import buildPadY from './buildPadY';
import setterPadsXY from '../helpers/setterPadsXY';

const setPadY = (
  Node: HTMLElement | Element,
  vals?: string
): Promise<void | Error> => {
  return setterPadsXY({
    Node,
    directives: ['pady', 'py'],
    builder: buildPadY,
    vals
  })
};

export default setPadY;
