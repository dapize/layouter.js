import addClasses from '../utils/addClasses';
import buildAttr from '../helpers/buildAttr';
import { IPropNode } from '../helpers/buildCss';
import regError from '../helpers/regError';
import removeAttr from '../utils/removeAttr';
import getParameters, { IParams } from './getParameters';

const setAttr = (
  Node: HTMLElement | Element,
  type: IPropNode,
  parameters?: IParams
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    if (!params.hasOwnProperty(type)) {
      regError(
        'Parameter Missing',
        "Don't exists the param '" + type + "' determined",
        Node
      );
      reject();
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildAttr(params[type], type, true);
    const classesToAdd = Object.keys(objStyles);

    // removing prop of Node and adding the corresponding classes
    removeAttr(Node, type)
      .then(() => addClasses(classesToAdd, Node))
      .then(resolve);
  });
};

export default setAttr;
