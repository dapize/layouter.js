import { TDirectiveName } from './../config/processors';
import { processors } from '../config/processors';
import addClasses from '../utils/addClasses';
import removeAttr from '../utils/removeAttr';

const reset = (Node: HTMLElement | Element): Promise<void> => {
  return new Promise((resolve) => {
    const classPrefixes = new Set(Object.keys(processors).map( item => processors[item as TDirectiveName].classPrefix));
    const layouterClasses = [ ...classPrefixes];
    const restClass = Node.className.split(' ').filter((name) => {
      if ( !name.includes('-')) {
        return true;
      } else {
        const findClass = layouterClasses.find( item => {
          const nLength = item.length;
          const namePrefix = name.substring(0, nLength + 1);
          return namePrefix === item + '-'
        })
        return !findClass
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
