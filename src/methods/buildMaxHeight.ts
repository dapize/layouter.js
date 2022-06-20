import buildAttr from '../helpers/buildAttr';

const buildMaxHeight = (
  valMaxHeight: string | string[],
  insertStyles: boolean = false
) => {
  return buildAttr(valMaxHeight, 'mxh', insertStyles);
};

export default buildMaxHeight;
