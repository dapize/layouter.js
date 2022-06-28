import buildAttr from '../helpers/buildAttr';
import { TDirectiveName } from '../config/processors';
import eventReady from '../helpers/eventReady';
import directiveValues from './directiveValues';

const setAttr = (
  Node: HTMLElement | Element,
  directives: TDirectiveName[],
  vals?: string
): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const values = vals || directiveValues(Node, directives);
    if (!values) return reject(values);

    // Creating, inserting, and adding classNames of rules in Node.
    const directive = directives[0];
    const objStyles = buildAttr(values as string, directive, true);
    const classesToAdd = Object.keys(objStyles).join(' ');

    // removing prop of Node and adding the corresponding classes
    eventReady({
      node: Node,
      directive,
      classes: classesToAdd,
      resolve,
    });
  });
};

export default setAttr;
