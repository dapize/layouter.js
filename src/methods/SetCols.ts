import regError from '../helpers/regError';
import buildCols from './buildCols';
import eventReady from '../helpers/eventReady';

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
    eventReady({
      node: Node,
      directive: 'cols',
      classes: classesToAdd,
      resolve,
    });
  });
};

export default setCols;
