import { IBuildCss } from './buildCss.d';

import createStyles from "@helpers/createStyles";
import insertRules from "@helpers/insertRules";
import nameCleaner from "@helpers/nameCleaner";

export const buildCss = (data: IBuildCss) => {
  // creating the styles
  const objStyles = createStyles(data.type, data.bps, data.instance);

  // Inserting CSS rules
  if (data.deep) insertRules(objStyles, data.instance);

  // name classes cleaner
  return nameCleaner(objStyles);
};
