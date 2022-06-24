import { processors } from '../config/processors';
import addClasses from '../utils/addClasses';
import removeAttr from '../utils/removeAttr';

const reset = (Node: HTMLElement | Element): Promise<void> => {
  return new Promise((resolve) => {
    const layouterClasses = Object.keys(processors);
    const restClass: string[] = [];
    Node.className.split(' ').filter((name) => {
      // the name of a class with minus of 4 letters dont follow the syntax of a class name created by the system, so is a normal class name
      if (name.length < 4) {
        restClass.push(name);
        return false;
      }
      const nPrex = name.length >= 5 ? 5 : 4;
      let prex = name.substring(0, nPrex);
      const lineIndex = prex.split('').indexOf('-');
      // if the class name haven't a line can't be a class name created by the system
      if (lineIndex === -1) {
        restClass.push(name);
        return false;
      }
      prex = prex.substring(0, lineIndex);
      // if the extraction of the prefix of the class name follow the name of a directive is a class name created by the system
      if (layouterClasses.includes(prex)) {
        return true;
      } else {
        // if dont, so is a coincidence, but is not a valid class name created by the system
        restClass.push(name);
        return false;
      }
    });
    if (restClass.length) {
      const classesName = restClass.join(' ');
      addClasses(Node, classesName, true).then(() => {
        resolve();
      });
    } else {
      removeAttr(Node, 'class').then(() => {
        resolve();
      });
    }
  });
};

export default reset;
