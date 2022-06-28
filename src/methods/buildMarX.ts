import buildXY from '../helpers/buildXY';
import { IStyles } from '../helpers/createStyles';
import buildMarLeft from './buildMarLeft';
import buildMarRight from './buildMarRight';

const buildMarX = (valMarX: string, insertStyles = false): IStyles => {
  return buildXY({
    values: valMarX,
    builderA: buildMarRight,
    builderB: buildMarLeft,
    insertStyles,
  });
};

export default buildMarX;
