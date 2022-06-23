import buildAttr from '../helpers/buildAttr';

const buildMarTop = (
  valMarTop: string,
  insertStyles = false
) => {
  return buildAttr(valMarTop, 'mart', insertStyles);
};

export default buildMarTop;
