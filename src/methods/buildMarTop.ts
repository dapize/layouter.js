import buildAttr from "../helpers/buildAttr";

const buildMarTop = (valMarTop: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMarTop, 'mart', insertStyles);
};

export default buildMarTop;
