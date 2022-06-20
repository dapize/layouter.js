import addClasses from '../utils/addClasses';
import regError from '../helpers/regError';
import buildFlex from './buildFlex';
import getParameters, { IParams } from './getParameters';
import removeAttr from '../utils/removeAttr';

const setFlex = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    if (!params.hasOwnProperty('flex')) {
      regError('Parameter Missing', "Don't exists 'flex' determinated.", Node);
      reject();
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildFlex(params.flex, true);
    const classesToAdd = Object.keys(objStyles);

    // removing prop of Node and adding the corresponding classes
    removeAttr(Node, 'flex')
      .then(() => addClasses(classesToAdd, Node))
      .then(resolve);
  });
};

export default setFlex;
