import buildCols from './buildCols';
import eventReady from '../helpers/eventReady';
import directiveValues from '../helpers/directiveValues';

const setCols = (
  Node: HTMLElement | Element,
  columns?: string
): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const values = columns || directiveValues(Node, ['c', 'cols']);
    if (!values) return reject(values);

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildCols(values as string, true);
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
