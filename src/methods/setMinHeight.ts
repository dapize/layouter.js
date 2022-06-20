import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMinHeight = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<boolean> => {
  return setAttr(Node, 'mih', parameters);
};

export default setMinHeight;
