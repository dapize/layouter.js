import { IStyles } from './createStyles';

export interface IBuildXY {
  values: string;
  builderA: (valPadA: string, insertStyles: boolean) => IStyles;
  builderB: (valPadB: string, insertStyles: boolean) => IStyles;
  insertStyles: boolean;
}

const buildXY = (data: IBuildXY): IStyles => {
  const stylesA = data.builderA(data.values, data.insertStyles);
  const stylesB = data.builderB(data.values, data.insertStyles);
  const allStyles: IStyles = {};
  for (const style in stylesA) {
    allStyles[style] = stylesA[style];
  }
  for (const style in stylesB) {
    allStyles[style] = stylesB[style];
  }
  return allStyles;
};

export default buildXY;
