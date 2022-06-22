import { processors } from "../config/processors";
import addClasses from "../utils/addClasses";
import removeAttr from "../utils/removeAttr";

const reset = (Node: HTMLElement | Element ): Promise<void> => {
  return new Promise(resolve => {
    const layouterClasses = Object.keys(processors);
    const restClass: string[] = [];
    Node.className
      .split(' ')
      .filter( name => {
        if (name.length < 4) {
          restClass.push(name);
          return false;
        }
        const nPrex = name.length >= 5 ? 5 : 4;
        let prex = name.substring(0, nPrex);
        let lineIndex = prex.split('').indexOf('-');
        if (lineIndex === -1) {
          restClass.push(name);
          return false;
        }
        prex = prex.substring(0, lineIndex);
        if (layouterClasses.includes(prex)) {
          return true;
        } else {
          restClass.push(name);
          return false;
        }
      });
    if (restClass.length) {
      const classesName = restClass.join(' ');
      addClasses(Node, classesName, true).then(() => {
        resolve();
      })
    } else {
      removeAttr(Node, 'class').then(() => {
        resolve();
      })
    }
  })
};

export default reset;
