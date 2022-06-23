import { processors, TDirectiveName } from '../config/processors';
import buildCols from './buildCols';
import buildFlex from './buildFlex';
import buildPad from './buildPad';
import buildPadTop from './buildPadTop';
import buildPadRight from './buildPadRight';
import buildPadBottom from './buildPadBottom';
import buildPadLeft from './buildPadLeft';
import buildMar from './buildMar';
import buildMarTop from './buildMarTop';
import buildMarRight from './buildMarRight';
import buildMarBottom from './buildMarBottom';
import buildMarLeft from './buildMarLeft';
import buildMaxWidth from './buildMaxWidth';
import buildMaxHeight from './buildMaxHeight';
import buildMinWidth from './buildMinWidth';
import buildMinHeight from './buildMinHeight';
import buildHeight from './buildHeight';
import buildWidth from './buildWidth';
import { IStyles } from '../helpers/createStyles';

const builders = {
  buildCols,
  buildFlex,
  buildPad,
  buildPadTop,
  buildPadRight,
  buildPadBottom,
  buildPadLeft,
  buildMar,
  buildMarTop,
  buildMarRight,
  buildMarBottom,
  buildMarLeft,
  buildMaxWidth,
  buildMaxHeight,
  buildMinWidth,
  buildMinHeight,
  buildHeight,
  buildWidth,
};

export interface IBuildResult {
  [prop: string]: IStyles | boolean;
}

const build = (
  obj: Partial<Record<TDirectiveName, string>>,
  insertStyles: boolean = false
): Partial<IBuildResult> | Error => {
  const rObj: Partial<IBuildResult> = {};
  let err: Error | boolean = false;
  for (const prop in obj) {
    const propData = processors[prop as TDirectiveName];
    const objStyles: IStyles | Error = builders[propData.build as keyof typeof builders](
      obj[prop as TDirectiveName] as string,
      insertStyles
    );
    if ( objStyles instanceof Error ) {
      err = objStyles;
      break;
    } else {
      rObj[prop] = objStyles;
    }
  }
  if ( err ) return err;
  return rObj
};

export default build;
