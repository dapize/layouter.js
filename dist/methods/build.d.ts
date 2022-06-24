import { TDirectiveName } from '../config/processors';
import { IStyles } from '../helpers/createStyles';
export interface IBuildResult {
    [prop: string]: IStyles | boolean;
}
declare const build: (obj: Partial<Record<TDirectiveName, string>>, insertStyles?: boolean) => Partial<IBuildResult> | Error;
export default build;
