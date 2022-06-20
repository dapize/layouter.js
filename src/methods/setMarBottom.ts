import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMarBottom = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'marb', parameters);
};

export default setMarBottom;
