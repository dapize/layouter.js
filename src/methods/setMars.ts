import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMars = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<boolean> => {
  return setAttr(Node, 'mar', parameters);
};

export default setMars;
