import { IStyles } from "../helpers/createStyles";
import regError from "../helpers/regError";
import build, { IBuildResult } from "./build";
import getParameters from "./getParameters";

const set = (Node: HTMLElement | Element) => {
  const params = getParameters(Node);
  const arrParams = Object.keys(params);
  if (!arrParams.length) return regError('Parameter Missing', "don't exists any parameter to process");
  const toBuild: { [ prop: string ]: string } = {};

  for(let prop in params) {
    toBuild[prop] = params[prop].join(' ');
  }

  const classesObj = build(toBuild) as Partial<IBuildResult>;
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
  })
};

export default set;
