import { IParams } from './getParameters';
import setAttr from './setAttr';

const setPadTop = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'padt', parameters);
};

export default setPadTop;
