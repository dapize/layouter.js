import buildAttr from "../helpers/buildAttr";

const buildMarRight = (valMarRight: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMarRight, 'marr', insertStyles);
};

export default buildMarRight;
