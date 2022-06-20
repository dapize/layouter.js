import insertRules from '../methods/insertRules';
import createStyles, { IStyles } from './createStyles';
import nameCleaner from './nameCleaner';

export type IPropNode =
  | 'cols'
  | 'flex'
  | 'pad'
  | 'padt'
  | 'padr'
  | 'padb'
  | 'padl'
  | 'mar'
  | 'mart'
  | 'marr'
  | 'marb'
  | 'marl'
  | 'mxw'
  | 'mxh'
  | 'miw'
  | 'mih'
  | 'hgt'
  | 'wdh';

export interface IRBuildCols {
  name: string;
  value: string;
}

export interface IBpCals {
  [bpName: string]: IRBuildCols;
}

export interface IBuildCss {
  type: IPropNode;
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
