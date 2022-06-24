import { TDirectiveName } from '../config/processors';
import { IStyles } from './createStyles';
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
declare const buildCss: (data: IBuildCss) => IStyles;
export default buildCss;
