import addClasses from '../utils/addClasses';
import regError from '../helpers/regError';
import buildCols from './buildCols';
import removeAttr from '../utils/removeAttr';

const setCols = (
  Node: HTMLElement | Element,
  columns?: string
): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const values = columns || Node.getAttribute('cols');
    if (!values) {
      const err = regError(
        'Empty',
        "The value of the directive 'cols' is empty",
        Node
      );
      reject(err);
      return;
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildCols(values, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }
    const classesToAdd = Object.keys(objStyles).join(' ');

    // removing prop of Node and adding the corresponding classes
    removeAttr(Node, 'cols')
      .then(() => addClasses(Node, classesToAdd))
      .then(() => {
        resolve();
        const event = new CustomEvent('layout:ready');
        Node.dispatchEvent(event);
      });
  });
};

export default setCols;
