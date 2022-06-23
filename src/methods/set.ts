import addClasses from '../utils/addClasses';
import { IStyles } from '../helpers/createStyles';
import regError from '../helpers/regError';
import build, { IBuildResult } from './build';
import getParameters from './getParameters';
import removeAttr from '../utils/removeAttr';
import { TDirectiveName } from '../config/processors';

const set = (
  Node: HTMLElement | Element,
  parameters?: Partial<Record<TDirectiveName, string>>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    const arrParams = Object.keys(params);
    if (!arrParams.length) {
      const err = regError('Parameter Missing', "don't exists any parameter to process", Node);
      reject(err);
      return;
    }

    const toBuild: Partial<Record<TDirectiveName, string>> = {};
    for (let prop in params) {
      toBuild[prop as TDirectiveName] = params[prop as TDirectiveName];
    }

    // creating classes names and inserting that classes to the core
    const classesObj = build(toBuild as Record<TDirectiveName, string>, true);
    if (classesObj instanceof Error) {
      reject(classesObj);
      return;
    }

    // adding classes
    const classes = classesObj as Partial<IBuildResult>;
    const classesNames = Object.keys(classes)
      .map((name: string) => Object.keys(classes[name] as IStyles))
      .flat()
      .join(' ');

    // removing unnecessary props
    removeAttr(Node, arrParams)
      .then(() => addClasses(Node, classesNames))
      .then(resolve);
  });
};

export default set;
