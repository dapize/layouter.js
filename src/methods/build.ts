import { processors } from "../config/processors";
import buildCols from './buildCols'
import buildFlex from './buildFlex'
import buildPads from './buildPads'
import buildPadTop from './buildPadTop'
import buildPadRight from './buildPadRight'
import buildPadBottom from './buildPadBottom'
import buildPadLeft from './buildPadLeft'
import buildMars from './buildMars'
import buildMarTop from './buildMarTop'
import buildMarRight from './buildMarRight'
import buildMarBottom from './buildMarBottom'
import buildMarLeft from './buildMarLeft'
import buildMaxWidth from './buildMaxWidth'
import buildMaxHeight from './buildMaxHeight'
import buildMinWidth from './buildMinWidth'
import buildMinHeight from './buildMinHeight'
import buildHeight from './buildHeight'
import buildWidth from './buildWidth'
import { IStyles } from "../helpers/createStyles";

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
}

interface IBuildResult {
  [ propName: string ]: IStyles | boolean;
}

const build = (obj: { [ nameProp: string ]: string }): IBuildResult | boolean => {
  const rObj: IBuildResult = {};
  let propData;
  Object.keys(obj).forEach( prop => {
    propData = processors[prop];
    if (propData) {
      rObj[prop] = builders[propData.build as keyof typeof builders](obj[prop])
    }
  });
  return (Object.keys(rObj).length) ? rObj : false;
};

export default build;
