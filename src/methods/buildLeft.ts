import buildAttr from '../helpers/buildAttr';

const buildLeft = (val: string, insertStyles = false) => {
  return buildAttr(val, 'l', insertStyles);
};

export default buildLeft;
