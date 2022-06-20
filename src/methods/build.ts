import { processors } from '../config/processors';
import buildCols from './buildCols';
import buildFlex from './buildFlex';
import buildPads from './buildPads';
import buildPadTop from './buildPadTop';
import buildPadRight from './buildPadRight';
import buildPadBottom from './buildPadBottom';
import buildPadLeft from './buildPadLeft';
import buildMars from './buildMars';
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
  buildPads,
  buildPadTop,
  buildPadRight,
  buildPadBottom,
  buildPadLeft,
  buildMars,
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

export interface IBuild {
  [prop: string]: string;
}

const build = (
  obj: Partial<IBuild>,
  insertStyles: boolean = false
): Partial<IBuildResult> | boolean => {
  const rObj: Partial<IBuildResult> = {};
  let propData;
  Object.keys(obj).forEach(prop => {
    propData = processors[prop];
    if (propData) {
      rObj[prop] = builders[propData.build as keyof typeof builders](
        obj[prop] as string,
        insertStyles
      );
    }
  });

  return Object.keys(rObj).length ? rObj : false;
};

export default build;
