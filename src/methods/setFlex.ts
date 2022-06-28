import buildFlex from './buildFlex';
import eventReady from '../helpers/eventReady';
import directiveValues from '../helpers/directiveValues';

const setFlex = (
  Node: HTMLElement | Element,
  flexValues?: string
): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const values = flexValues || directiveValues(Node, ['flex', 'fx']);
    if (!values) return reject(values);

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildFlex(values as string, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }

    // removing prop of Node and adding the corresponding classes
    eventReady({
      node: Node,
      directive: 'flex',
      classes: Object.keys(objStyles).join(' '),
      resolve,
    });
  });
};

export default setFlex;
