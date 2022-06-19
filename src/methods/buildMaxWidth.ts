import buildAttr from "../helpers/buildAttr";

const buildMaxWidth = (valMaxWidth: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMaxWidth, 'mxw', insertStyles);
};

export default buildMaxWidth;
