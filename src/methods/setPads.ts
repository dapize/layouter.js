import { IParams } from "./getParameters";
import setAttr from "./setAttr";

const setPads = (Node: HTMLElement | Element, parameters?: IParams): Promise<boolean> => {
  return setAttr(Node, 'pad', parameters);
};

export default setPads
