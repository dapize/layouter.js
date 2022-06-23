import buildAttr from '../helpers/buildAttr';

const buildMarBottom = (
  valMarBottom: string,
  insertStyles = false
) => {
  return buildAttr(valMarBottom, 'marb', insertStyles);
};

export default buildMarBottom;
