import buildAttr from "../helpers/buildAttr";

const buildMaxHeight = (valMaxHeight: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMaxHeight, 'mxh', insertStyles);
};

export default buildMaxHeight;
