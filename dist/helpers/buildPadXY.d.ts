import { IStyles } from "./createStyles";
export interface IBuildPadXY {
    values: string;
    builderA: (valPadA: string, insertStyles: boolean) => IStyles;
    builderB: (valPadB: string, insertStyles: boolean) => IStyles;
    insertStyles: boolean;
}
declare const buildPadXY: (data: IBuildPadXY) => IStyles;
export default buildPadXY;
