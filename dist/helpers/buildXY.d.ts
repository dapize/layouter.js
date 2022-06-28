import { IStyles } from './createStyles';
export interface IBuildXY {
    values: string;
    builderA: (valPadA: string, insertStyles: boolean) => IStyles;
    builderB: (valPadB: string, insertStyles: boolean) => IStyles;
    insertStyles: boolean;
}
declare const buildXY: (data: IBuildXY) => IStyles;
export default buildXY;
