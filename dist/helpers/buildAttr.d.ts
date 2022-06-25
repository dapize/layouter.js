import { TDirectiveName } from '../config/processors';
import { IStyles } from './createStyles';
declare const buildAttr: (values: string, directive: TDirectiveName, insertStyles?: boolean) => IStyles;
export default buildAttr;
