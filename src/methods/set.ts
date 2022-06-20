import addClasses from '../utils/addClasses';
import { IStyles } from '../helpers/createStyles';
import regError from '../helpers/regError';
import build, { IBuildResult } from './build';
import getParameters, { IParams } from './getParameters';
import removeAttr from '../utils/removeAttr';

const set = (
  Node: HTMLElement | Element,
  parameters?: IParams
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    const arrParams = Object.keys(params);
    if (!arrParams.length) {
      regError('Parameter Missing', "don't exists any parameter to process");
      reject();
    }

    const toBuild: { [prop: string]: string } = {};
    for (let prop in params) {
      toBuild[prop] = params[prop].join(' ');
    }

    // creating classes names and inserting that classes to the core
    const classesObj = build(toBuild, true);
    if (!classesObj) reject();

    // adding classes
    const classes = classesObj as Partial<IBuildResult>;
    const classesNames = Object.keys(classes)
      .map((name: string) => Object.keys(classes[name] as IStyles))
      .flat();

    // removing unnecessary props
    removeAttr(Node, arrParams)
      .then(() => addClasses(classesNames, Node))
      .then(resolve);
  });
};

export default set;
