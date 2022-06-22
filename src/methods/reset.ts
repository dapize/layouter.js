import { processors } from "../config/processors";
import addClasses from "../utils/addClasses";
import removeAttr from "../utils/removeAttr";

const reset = (Node: HTMLElement | Element ): Promise<string[]> => {
  return new Promise(resolve => {
    let nPrex, prex;
    const layouterClasses = Object.keys(processors);
    const restClass: string[] = [];
    const classList = Node.className.split(' ')
      .filter( name => {
        if (name.length < 4) {
          restClass.push(name);
          return false;
        }
        nPrex = name.length >= 5 ? 5 : 4;
        prex = name.substring(0, nPrex);
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
      addClasses(restClass, Node).then(() => {
        resolve(classList);
      })
    } else {
      removeAttr(Node, 'class').then(() => {
        resolve(classList);
      })
    }
  })
};

export default reset;
