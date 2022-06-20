import { IParams } from './getParameters';
import setAttr from './setAttr';

const setMinWidth = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return setAttr(Node, 'miw', parameters);
};

export default setMinWidth;
