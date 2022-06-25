import regError from '../helpers/regError';
import buildFlex from './buildFlex';
import eventReady from '../helpers/eventReady';

const setFlex = (
  Node: HTMLElement | Element,
  flexValues?: string
): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const values = flexValues || Node.getAttribute('flex');
    if (!values) {
      const err = regError(
        'Empty',
        'The value of the directive "flex" is empty',
        Node
      );
      reject(err);
      return;
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildFlex(values, true);
    if (objStyles instanceof Error) {
      reject(objStyles);
      return;
    }

    const classesToAdd = Object.keys(objStyles).join(' ');

    // removing prop of Node and adding the corresponding classes
    eventReady({
      node: Node,
      directive: 'flex',
      classes: classesToAdd,
      resolve,
    });
  });
};

export default setFlex;
