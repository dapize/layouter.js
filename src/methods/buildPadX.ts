import buildPadXY from '../helpers/buildPadXY';
import { IStyles } from '../helpers/createStyles';
import buildPadLeft from './buildPadLeft';
import buildPadRight from './buildPadRight';

const buildPadX = (valPadX: string, insertStyles = false): IStyles => {
  return buildPadXY({
    values: valPadX,
    builderA: buildPadRight,
    builderB: buildPadLeft,
    insertStyles
  })
};

export default buildPadX;
