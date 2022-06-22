import { TDirectiveName } from '../config/processors';
import insertRules from '../methods/insertRules';
import createStyles, { IStyles } from './createStyles';
import nameCleaner from './nameCleaner';

export interface IRBuildStyles {
  name: string;
  value: string;
}

export interface IBpCals {
  [bpName: string]: IRBuildStyles;
}

export interface IBuildCss {
  type: TDirectiveName;
  bps: IBpCals;
  deep: boolean;
}

const buildCss = (data: IBuildCss): IStyles => {
  // creating the styles
  const objStyles = createStyles(data.type, data.bps);

  // Inserting CSS rules
  if (data.deep) {
    insertRules(objStyles);
  }

  // name classes cleaner
  return nameCleaner(objStyles);
};

export default buildCss;
