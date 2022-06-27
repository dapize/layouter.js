import buildAttr from '../helpers/buildAttr';
import { IStyles } from '../helpers/createStyles';

const buildBottom = (val: string, insertStyles = false): IStyles => {
  return buildAttr(val, 'b', insertStyles);
};

export default buildBottom;
