import { TDirectiveName } from '../config/processors';
declare const buildAttr: (values: string, prop: TDirectiveName, insertStyles?: boolean) => import("./createStyles").IStyles;
export default buildAttr;
