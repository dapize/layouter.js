import addClasses from "../helpers/addClasses";
import buildAttr from "../helpers/buildAttr";
import { IPropNode } from "../helpers/buildCss";
import regError from "../helpers/regError";
import getParameters, { IParams } from "./getParameters";

const setAttr = (Node: HTMLElement | Element, type: IPropNode, parameters?: IParams): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    if (!params.hasOwnProperty(type)) {
      regError('Parameter Missing', "Don't exists the param '" + type + "' determined");
      reject(false);
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildAttr(params[type], type);

    // adding the classes names to the Node
    addClasses(Object.keys(objStyles), Node);

    // removing param
    Node.removeAttribute(type);

    resolve(true)
  })
}

export default setAttr;
