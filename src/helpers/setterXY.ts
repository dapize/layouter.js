import { IStyles } from './createStyles';
import directiveValues from './directiveValues';
import eventReady from './eventReady';

export interface ISetterXY {
  Node: HTMLElement | Element;
  directives: string[];
  builder: (valPadX: string, insertStyles: boolean) => IStyles;
  vals?: string;
}

const setterXY = (data: ISetterXY): Promise<void | Error> => {
  return new Promise((resolve, reject) => {
    const values = data.vals || directiveValues(data.Node, data.directives);
    if (!values) return reject(values);

    // Creating, inserting, and adding classNames of rules in Node.
    const objStyles = data.builder(values as string, true);
    const classesToAdd = Object.keys(objStyles).join(' ');

    // removing prop of Node and adding the corresponding classes
    eventReady({
      node: data.Node,
      directive: data.directives,
      classes: classesToAdd,
      resolve,
    });
  });
};

export default setterXY;
