import addClasses from '../utils/addClasses';
import buildAttr from '../helpers/buildAttr';
import regError from '../helpers/regError';
import removeAttr from '../utils/removeAttr';
import { TDirectiveName } from '../config/processors';

const setAttr = (
  Node: HTMLElement | Element,
  directive: TDirectiveName,
  values?: string
): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const directiveValues = values || Node.getAttribute(directive);
    if (!directiveValues) {
      const err = regError(
        'Empty',
        'The value of the directive "' + directive + '" is empty',
        Node
      );
      reject(err);
      return;
    }

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = buildAttr(directiveValues, directive, true);
    const classesToAdd = Object.keys(objStyles).join(' ');

    // removing prop of Node and adding the corresponding classes
    removeAttr(Node, directive)
      .then(() => addClasses(Node, classesToAdd))
      .then(() => {
        resolve();
        const event = new CustomEvent('layout:ready');
        Node.dispatchEvent(event);
      });
  });
};

export default setAttr;
