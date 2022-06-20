import { IParams } from './getParameters';
import setAttr from './setAttr';

const setPadLeft = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'padl', parameters);
};

export default setPadLeft;
