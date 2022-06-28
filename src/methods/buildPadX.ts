import buildXY from '../helpers/buildXY';
import { IStyles } from '../helpers/createStyles';
import buildPadLeft from './buildPadLeft';
import buildPadRight from './buildPadRight';

const buildPadX = (valPadX: string, insertStyles = false): IStyles => {
  return buildXY({
    values: valPadX,
    builderA: buildPadRight,
    builderB: buildPadLeft,
    insertStyles,
  });
};

export default buildPadX;
