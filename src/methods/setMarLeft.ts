import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMarLeft = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'marl', parameters);
};

export default setMarLeft;
