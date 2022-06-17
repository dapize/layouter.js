import { IStyles } from "@helpers/createStyles";

const replaceList = [
  ['\/', ''],
  ['\\', '/'],
  ['/:', ':'],
  ['\\:', ':'],
  ['\\@', '@'],
  ['/@', '@']
];

const nameCleaner = (objStyles: IStyles) => {
  const obj: IStyles = {};
  Object.keys(objStyles).forEach( (name: string) => {
    let newName = name;
    replaceList.forEach(function (reItem) {
      newName = newName.split(reItem[0]).join(reItem[1]);
    });
    obj[newName] = objStyles[name];
  });
  return obj;
};

export default nameCleaner;
