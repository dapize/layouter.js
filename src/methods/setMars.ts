import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMars = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'mar', parameters);
};

export default setMars;
