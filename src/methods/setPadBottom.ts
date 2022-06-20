import { IParams } from "./getParameters";
import setAttr from "./setAttr";

const setPadBottom = (Node: HTMLElement | Element, parameters?: IParams): Promise<boolean> => {
  return setAttr(Node, 'padb', parameters);
};

export default setPadBottom