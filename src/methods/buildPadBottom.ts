import buildAttr from '../helpers/buildAttr';

const buildPadBottom = (
  valPadBottom: string,
  insertStyles = false
) => {
  return buildAttr(valPadBottom, 'padb', insertStyles);
};

export default buildPadBottom;
