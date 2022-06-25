import { processors, TDirectiveName } from '../config/processors';
import { IStyles } from '../helpers/createStyles';

export interface IBuildResult {
  [prop: string]: IStyles | boolean;
}

const build = (
  obj: Partial<Record<TDirectiveName, string>>,
  insertStyles = false
): Partial<IBuildResult> | Error => {
  const rObj: Partial<IBuildResult> = {};
  let err: Error | boolean = false;
  for (const prop in obj) {
    const propData = processors[prop as TDirectiveName];
    const objStyles: IStyles | Error = propData.build(
      obj[prop as TDirectiveName] as string,
      insertStyles
    );
    if (objStyles instanceof Error) {
      err = objStyles;
      break;
    } else {
      rObj[prop] = objStyles;
    }
  }

  if (err) return err;
  return rObj;
};

export default build;
