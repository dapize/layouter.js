import { IParams } from "./getParameters";
import setAttr from "./setAttr";

const setMaxWidth = (Node: HTMLElement | Element, parameters?: IParams): Promise<boolean> => {
  return setAttr(Node, 'mxw', parameters);
};

export default setMaxWidth
