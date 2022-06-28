import { IStyles } from "./createStyles";

export interface IBuildPadXY {
  values: string;
  builderA: (valPadA: string, insertStyles: boolean) => IStyles;
  builderB: (valPadB: string, insertStyles: boolean) => IStyles;
  insertStyles: boolean
}

const buildPadXY = (data: IBuildPadXY): IStyles => {
  const padRight = data.builderA(data.values, data.insertStyles);
  const padLeft = data.builderB(data.values, data.insertStyles);
  const styles: IStyles = {}
  for (const style in padRight) {
    styles[style] = padRight[style]
  }
  for (const style in padLeft) {
    styles[style] = padLeft[style]
  }
  return styles;
}

export default buildPadXY;
