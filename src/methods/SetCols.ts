import addClasses from '../helpers/addClasses';
import regError from '../helpers/regError';
import buildCols from './buildCols';
import getParameters, { IParams } from './getParameters';

const setCols = (Node: HTMLElement, parameters?: IParams): boolean => {
  const params = parameters || getParameters(Node);
  if (!params.hasOwnProperty('cols')) {
    regError('Parameter Missing', "Don't exists 'cols' determined");
    return false;
  }

  // Creating, inserting, and adding classNames of rules in Node.
  const objStyles = buildCols(params.cols);

  // adding the classes names to the Node
  addClasses(Object.keys(objStyles), Node);

  // removing param
  Node.removeAttribute('cols');

  return true;
};

export default setCols;
