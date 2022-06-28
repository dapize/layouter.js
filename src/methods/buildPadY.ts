import buildXY from '../helpers/buildXY';
import { IStyles } from '../helpers/createStyles';
import buildPadBottom from './buildPadBottom';
import buildPadTop from './buildPadTop';

const buildPadY = (valPadX: string, insertStyles = false): IStyles => {
  return buildXY({
    values: valPadX,
    builderA: buildPadTop,
    builderB: buildPadBottom,
    insertStyles,
  });
};

export default buildPadY;
