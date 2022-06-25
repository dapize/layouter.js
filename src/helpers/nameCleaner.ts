import { IStyles } from './createStyles';

const replaceList = [
  ['/', ''],
  ['\\', '/'],
  ['/:', ':'],
  ['\\:', ':'],
  ['\\@', '@'],
  ['/@', '@'],
];

const nameCleaner = (objStyles: IStyles): IStyles => {
  const obj: IStyles = {};
  for (const name in objStyles) {
    let newName = name;
    replaceList.forEach((reItem) => {
      newName = newName.split(reItem[0]).join(reItem[1]);
    });
    obj[newName] = objStyles[name];
  }
  return obj;
};

export default nameCleaner;
