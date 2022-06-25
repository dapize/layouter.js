import buildAttr from '../helpers/buildAttr';

const buildRight = (val: string, insertStyles = false) => {
  return buildAttr(val, 'r', insertStyles);
};

export default buildRight;
