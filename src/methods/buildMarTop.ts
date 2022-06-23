import buildAttr from '../helpers/buildAttr';

const buildMarTop = (
  valMarTop: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valMarTop, 'mart', insertStyles);
};

export default buildMarTop;
