import buildAttr from '../helpers/buildAttr';

const buildMaxHeight = (
  valMaxHeight: string,
  insertStyles = false
) => {
  return buildAttr(valMaxHeight, 'mxh', insertStyles);
};

export default buildMaxHeight;
