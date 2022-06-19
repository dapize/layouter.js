import regError from "../helpers/regError";
import getParameters from "./getParameters";

const set = (Node: HTMLElement | Element) => {
  const params = getParameters(Node);
  const arrParams = Object.keys(params);
  if (!arrParams.length) return regError('Parameter Missing', "don't exists any parameter to process");
  const toBuild = {};

  for(let prop in params) {
    toBuild[prop] = params[prop].join(' ');
  }

  const classesObj = this.build(toBuild);
  const classesNames = Object.keys(classesObj)
    .map(function (name) {
      return Object.keys(classesObj[name]).join(' ')
    })
    .join(' ');
  Node.className = Node.className ? Node.className + ' ' + classesNames : classesNames;
  arrParams.forEach(function (nameParam) {
    setTimeout(function (name) {
      Node.removeAttribute(name);
    }, 0, nameParam)
  })
};

export default set;
