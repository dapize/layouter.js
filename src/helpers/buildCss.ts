import { IBpCals } from "../methods/buildCols";
import createStyles, { IStyles } from "./createStyles";
import insertRules from "./insertRules";
import nameCleaner from "./nameCleaner";

export type IPropNode = "cols" | "pad" | "padt" | "padr" | "padb" | "padl" | "mar" | "mart" | "marr" | "marb" | "marl" | "flex" | "wdh" | "hgt" | "mxw" | "mxh" | "miw" | "mih";

export interface IBuildCss {
  type: IPropNode;
  bps: IBpCals;
  deep: boolean;
}

const buildCss = (data: IBuildCss): IStyles => {
  // creating the styles
  const objStyles = createStyles( data.type, data.bps );

  // Inserting CSS rules
  if (data.deep) {
    insertRules( objStyles );
  }

  // name classes cleaner
  return nameCleaner(objStyles);
};

export default buildCss
