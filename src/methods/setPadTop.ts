import { IParams } from "./getParameters";
import setAttr from "./setAttr";

const setPadTop = (Node: HTMLElement | Element, parameters?: IParams): Promise<boolean> => {
  return setAttr(Node, 'padt', parameters);
};

export default setPadTop
