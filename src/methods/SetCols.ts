import addClasses from '../utils/addClasses';
import regError from '../helpers/regError';
import buildCols from './buildCols';
import getParameters, { IParams } from './getParameters';
import removeAttr from '../utils/removeAttr';

const setCols = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    if (!params.hasOwnProperty('cols')) {
      regError('Parameter Missing', "Don't exists 'cols' determined", Node);
      reject();
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildCols(params.cols, true);
    if (!objStyles) reject();
    const classesToAdd = Object.keys(objStyles);

    // removing prop of Node and adding the corresponding classes
    removeAttr(Node, 'cols')
      .then(() => addClasses(classesToAdd, Node))
      .then(resolve);
  });
};

export default setCols;
