import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMarRight = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<boolean> => {
  return setAttr(Node, 'marr', parameters);
};

export default setMarRight;
