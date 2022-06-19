import buildAttr from "../helpers/buildAttr";

const buildMarBottom = (valMarBottom: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMarBottom, 'marb', insertStyles);
};

export default buildMarBottom;
