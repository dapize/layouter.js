import { IStyles } from "../helpers/createStyles";
import regError from "../helpers/regError";
import build, { IBuildResult } from "./build";
import getParameters, { IParams } from "./getParameters";

const set = (Node: HTMLElement | Element, parameters?: IParams): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const params = parameters || getParameters(Node);
    const arrParams = Object.keys(params);
    if (!arrParams.length) {
      regError('Parameter Missing', "don't exists any parameter to process");
      reject(false);
    }
    const toBuild: { [ prop: string ]: string } = {};

    for(let prop in params) {
      toBuild[prop] = params[prop].join(' ');
    }

    const classesObj = build(toBuild, true) as Partial<IBuildResult>;
    const classesNames = Object.keys(classesObj)
      .map( (name: string) => {
        return Object.keys(classesObj[name] as IStyles).join(' ')
      })
      .join(' ');
    Node.className = Node.className ? Node.className + ' ' + classesNames : classesNames;
    arrParams.forEach(nameParam => {
      setTimeout( name => {
        Node.removeAttribute(name);
      }, 0, nameParam)
    });
    resolve(true);
  })
};

export default set;
