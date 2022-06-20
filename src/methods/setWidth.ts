import { IParams } from './getParameters';
import setAttr from './setAttr';

const setWidth = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'wdh', parameters);
};

export default setWidth;
