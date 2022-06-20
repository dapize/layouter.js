import { IParams } from './getParameters';
import setAttr from './setAttr';

const setPadRight = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<boolean> => {
  return setAttr(Node, 'padr', parameters);
};

export default setPadRight;
