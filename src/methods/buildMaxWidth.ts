import buildAttr from '../helpers/buildAttr';

const buildMaxWidth = (
  valMaxWidth: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valMaxWidth, 'mxw', insertStyles);
};

export default buildMaxWidth;
