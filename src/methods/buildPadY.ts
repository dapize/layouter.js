import buildPadXY from '../helpers/buildPadXY';
import { IStyles } from '../helpers/createStyles';
import buildPadBottom from './buildPadBottom';
import buildPadTop from './buildPadTop';

const buildPadY = (valPadX: string, insertStyles = false): IStyles => {
  return buildPadXY({
    values: valPadX,
    builderA: buildPadTop,
    builderB: buildPadBottom,
    insertStyles
  })
};

export default buildPadY;
