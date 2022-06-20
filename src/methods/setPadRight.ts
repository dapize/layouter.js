import { IParams } from './getParameters';
import setAttr from './setAttr';

const setPadRight = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'padr', parameters);
};

export default setPadRight;
