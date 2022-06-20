import { IParams } from './getParameters';
import setAttr from './setAttr';

const setHeight = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'hgt', parameters);
};

export default setHeight;
