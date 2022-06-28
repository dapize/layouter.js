import buildXY from '../helpers/buildXY';
import { IStyles } from '../helpers/createStyles';
import buildMarBottom from './buildMarBottom';
import buildMarTop from './buildMarTop';

const buildMarY = (valMarY: string, insertStyles = false): IStyles => {
  return buildXY({
    values: valMarY,
    builderA: buildMarTop,
    builderB: buildMarBottom,
    insertStyles,
  });
};

export default buildMarY;
