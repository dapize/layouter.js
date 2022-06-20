import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMaxHeight = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'mxh', parameters);
};

export default setMaxHeight;
