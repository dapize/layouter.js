import { TDirectiveName } from '../config/processors';
import { IBpCals } from './buildCss';
export interface IStyles {
    [name: string]: string;
}
declare const createStyles: (directive: TDirectiveName, bps: IBpCals) => IStyles;
export default createStyles;
