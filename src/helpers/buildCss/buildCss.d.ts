import { ILayouter } from '@/index.d';
import { IBpCals } from '@methods/buildCols';

export type IPropNode = "cols" | "pad" | "padt" | "padr" | "padb" | "padl" | "mar" | "mart" | "marr" | "marb" | "marl" | "flex" | "wdh" | "hgt" | "mxw" | "mxh" | "miw" | "mih";

export interface IBuildCss {
  type: IPropNode;
  bps: IBpCals;
  instance: ILayouter;
  deep: boolean;
}
