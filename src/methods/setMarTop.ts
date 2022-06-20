import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMarTop = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'mart', parameters);
};

export default setMarTop;
