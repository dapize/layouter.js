import addClasses from "../helpers/addClasses";
import regError from "../helpers/regError";
import buildFlex from "./buildFlex";
import getParameters, { IParams } from "./getParameters";

const setFlex = (Node: HTMLElement | Element, parameters?: IParams): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    if (!params.hasOwnProperty('flex')) {
      regError('Parameter Missing', "Don't exists 'flex' determinated.");
      reject(false);
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildFlex(params.flex, true);

    // adding the classes names to the Node
    addClasses(Object.keys(objStyles), Node);

    // removing param
    Node.removeAttribute('flex');

    resolve(true)
  })
};

export default setFlex
